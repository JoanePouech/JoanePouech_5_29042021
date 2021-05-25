/* Page 2 - Produit */

document.addEventListener ('DOMContentLoaded', () => {
    getProductInfos();
    refreshCartCount (); // fichier cartManager.js
    addItemToCart(); // fichier cartManager.js
});

// FONCTION - Récupérer les infos de l'item à afficher (nom, description, image, prix, options de personnalisation)
function getProductInfos () {
    const productId = window.location.search.substring(1);
    fetch (host + "/" + productId)
        .then ((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then ((item) => {
            document.getElementById("productId").setAttribute("id", item._id);
            document.getElementById("productName").innerText = item.name;
            document.getElementById("productDescription").innerText = item.description;
            document.getElementById("productImage").setAttribute("src", item.imageUrl);
            document.getElementById("productPrice").innerText = item.price + " €";
            createVarnishSelector(item.varnish);
        })
        .catch ((err) => {console.error(err);});
}

// FONCTION - Créer le menu déroulant pour les options de personnalisation
function createVarnishSelector (varnishArray) {
    for (let i in varnishArray) {
        let option = document.createElement("option");
        option.innerText = varnishArray[i];
        document.getElementById("productOptions").appendChild(option);
    }
}