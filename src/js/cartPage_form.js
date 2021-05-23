/* Page 3 - Panier ** Gestion du formulaire */

const textRegex = new RegExp ('^[0-9a-zA-Z]+$'); // Expression régulière pour les champs "text"
const emailRegex = new RegExp ('^[\\w\\-\\.\\+]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z0-9]{2,4}$'); // Expression régulière pour les champs "email"
let formValidated = false; // Résultat de la validation du formulaire
let order; // La confirmation de commande complète
let orderId; // Numéro de commande après validation
document.addEventListener ('DOMContentLoaded', (event) => {
    submitOrder();
});

// CLASSE - Modèle pour le contact à envoyer avec la requête POST
class Contact {
    constructor (firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};

// FONCTION - Soumission des données de formulaire
async function submitOrder () {
    verifyUserInputs();
    document.getElementById("form").addEventListener ('submit', async (event) => {
        event.preventDefault();
        cartIds = JSON.parse(localStorage.getItem("cartIds"));
        // Le panier est vide
        if (cartIds.length == 0) {
            alert("Vous n'avez pas d'article dans votre panier");
        } else {
        // Le panier contient des items
            formValidated = verifyFormData();
        }
        // La vérification est bonne
        if (formValidated) {
            let contact = prepareContactData();
            let products = JSON.parse(localStorage.getItem("cartIds"));
            order = await sendOrder(contact, products);
            orderId = order.orderId;
            localStorage.setItem("orderId", orderId);
            localStorage.setItem("totalPrice", totalPrice);
            localStorage.removeItem("cartIds");
            document.getElementById("form").submit();
        } else {
        // La vérification a échouée
            alert("Vos coordonnées ne sont pas correctes");
        }
    });
};

//FONCTION - Vérifier les valeurs des champs de formulaire au moment de la saisie
function verifyUserInputs () {
    for (let input of document.getElementsByTagName('input')) {        
        input.addEventListener ('blur', () => {            
            if (input.value == "") {
                input.setCustomValidity("Ce champ est obligatoire");
                input.setAttribute("class", "invalid");
            } else {
                if (input.type == "text") {
                    if (!textRegex.test(input.value)) {
                        input.setCustomValidity("Vous ne devez utiliser que des lettres ou des chiffres");
                        input.setAttribute("class", "invalid");
                    } else {
                        input.setAttribute("class", "valid");
                        input.setCustomValidity("");
                    }
                }
                if (input.type == "email") {
                    if (!emailRegex.test(input.value)) {
                        input.setCustomValidity("Votre email doit être du format jean.dupont@mail.com");
                        input.setAttribute("class", "invalid");
                    } else {
                        input.setAttribute("class", "valid");
                        input.setCustomValidity("");
                    } 
                }                 
            } 
            input.reportValidity();   
        })
        
    }
}

// FONCTION - Vérification des données de formulaire avant envoi
function verifyFormData () {    
    let validInputCount = 0;
    for (let input of document.getElementsByTagName('input')) {
        if (input.getAttribute("class") == "valid") {
            validInputCount++;
        }
    }
    if (validInputCount == document.getElementsByTagName('input').length) {
        return true;
    } else {
        return false;
    }
}

// FONCTION - Préparation des données de requête POST
function prepareContactData () {

    let contact1 = new FormData(document.getElementById("form")); // contact1 via FormData
    console.log(...contact1); // ligne test

    let firstName = document.getElementById("firstName").value; 
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let contact2 = new Contact(firstName, lastName, address, city, email); // contact 2 via Classe Contact
    console.log(contact2); // ligne test

    return contact2;
}

// FONCTION - Envoi de la commande et récupération du numéro de commande
function sendOrder (contact, products) {
    order = fetch ((host + "/order"), {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({contact, products})
        })
        .then ((result) => {
            if (result.ok) {
            return result.json(); 
            }        
        })
        .then ((orderId) => {
            return orderId;
        })        
        .catch ((err) => {console.error(err);});
    return order;
}

