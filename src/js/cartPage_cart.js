/* Page 3 - Panier ** Affichage du panier */

let cartTable = []; // tableau des objets CartProduct du panier
let totalPrice = 0; // Montant total de la commande 
let cartIds = JSON.parse(localStorage.getItem("cartIds")); // Contenu du panier, récupéré depuis le local Storage
document.addEventListener ('DOMContentLoaded', () => {
    printCart();
});

// CLASSE - Modèle pour les items à afficher dans le panier
class CartProduct {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
};

// FONCTION - Afficher le contenu du panier sur la page
async function printCart () {
    // Le panier est vide
    if (cartIds == null || cartIds.length == 0) {
        emptyCart();
    } else {
    // Le panier contient des items
        for (let id in cartIds) {
            let cartItem = await getItemInfos(cartIds[id]);
            cartTable = addToCartTable(cartItem);
        }
        createTable(cartTable);
        addItem();
        removeItem();
    }
};

// FONCTION - Récuperer les informations d'un produit à partir de son id, renvoie un objet CartProduct
function getItemInfos (id) {
    let cartItem = fetch (host + "/" + id)
        .then ((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then ((item) => {
            return new CartProduct(item._id,item.name,item.price,1);             
        })
        .catch ((err) => {console.error(err);});
    return cartItem;    
};

// FONCTION - Ajouter un item au tableau du panier, prend un objet CartProduct, renvoie un tableau cartTable
function addToCartTable (cartItem) {
    // Premier item
    if (cartTable.length == 0) {
        cartTable.push(cartItem);
    } else {
    // Items suivants
        let tourCount = 0;
        for (let i in cartTable) {
            // L'item est déjà présent
            if (cartItem.id == cartTable[i].id) {
                cartTable[i].quantity++;
                break;
            } else {
            // L'item est nouveau
                tourCount ++;
                if (tourCount == cartTable.length) {
                    cartTable.push(cartItem);
                    break;
                }
            }
        }         
    }
    return cartTable;
};

// FONCTION - Construire le tableau du panier
function createTable (cartTable) {
    // Création d'une ligne par item
    for (let i in cartTable) {
        document.getElementById("cartContent").innerHTML += `<tr id="${i}.line">
                                                                <td>${cartTable[i].name}</td>
                                                                <td>${cartTable[i].price} €</td>
                                                                <td class="components_cartQuantity">
                                                                    <button class="components_cartQuantity_signs removeItem" id="${i}.add">-</button>
                                                                    <p id="${i}.quantity">${cartTable[i].quantity}</p>
                                                                    <button class="components_cartQuantity_signs addItem" id="${i}.remove">+</button>
                                                                </td>
                                                                <td id="${i}.itemPrice">${cartTable[i].price * cartTable[i].quantity} €</td>
                                                            </tr>`;
        totalPrice += cartTable[i].price * cartTable[i].quantity;
    }
    // Actualisation du montant total
    document.getElementById("totalPrice").innerText = `${totalPrice} €`;    
};

// FONCTION - Afficher une ligne "panier vide"
function emptyCart() {
    document.getElementById("cartContent").innerHTML += `<tr><td colspan="4">Votre panier est vide</td></tr>`
}

// FONCTION - Ajouter un item au panier
function addItem () {
    for (let element of document.getElementsByClassName("addItem")) {
        element.addEventListener ('click', () => {
            let index = element.getAttribute("id")[0];
            // Mise à jour de la ligne du tableau
            cartTable[index].quantity ++;
            document.getElementById(`${index}.quantity`).innerText = cartTable[index].quantity;
            document.getElementById(`${index}.itemPrice`).innerText = `${cartTable[index].price * cartTable[index].quantity} €`;
            // Mise à jour du prix total
            totalPrice += cartTable[index].price;
            document.getElementById("totalPrice").textContent = `${totalPrice} €`;
            // Mise à jour du panier localStorage
            cartIds.push(cartTable[index].id);
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
        })
    }
};

// FONCTION - Supprimer un item du panier
function removeItem () {
    for (let element of document.getElementsByClassName("removeItem")) {
        element.addEventListener ('click', () => {
            let index = element.getAttribute("id")[0];
            // Mise à jour de la ligne du tableau
            cartTable[index].quantity --;
            if (cartTable[index].quantity == 0) {
                document.getElementById("cartContent").removeChild(document.getElementById(`${index}.line`));                
            } else {
                document.getElementById(`${index}.quantity`).innerText = cartTable[index].quantity;
                document.getElementById(`${index}.itemPrice`).innerText = `${cartTable[index].price * cartTable[index].quantity} €`;
            }              
            // Mise à jour du prix total
            totalPrice -= cartTable[index].price;
            document.getElementById("totalPrice").textContent = `${totalPrice} €`;            
            // Mise à jour du panier localStorage
            let indexIds = cartIds.findIndex(cartId => cartId == cartTable[index].id);
            cartIds.splice(indexIds,1);
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
            // Panier vide
            if (cartIds == null || cartIds.length == 0) {
                emptyCart();
            }
        })
    }
};