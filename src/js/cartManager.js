/* Gestion du panier sur les pages 1-Accueil ou 2-Produit */
/* Fonctions intégrées directement dans les fichiers homePage.js et productPage.js */

// FONCTION - Ajouter un élément au panier (sans l'afficher) depuis le bouton "Ajouter au panier" 
function addItemToCart () {
    for (let element of document.getElementsByClassName("js_cartButton")) {
        element.addEventListener ('click', function(event) {
            let addedItemId = element.parentElement.getAttribute("id");
            let cartIds = localStorage.getItem("cartIds");
            if (cartIds == null) {
                cartIds = [];
            } else {
                cartIds = JSON.parse(cartIds);
            }        
            cartIds.push(addedItemId);
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
            document.getElementById("cartCount").innerText = `${cartIds.length}`;
        })
    }; 
}

// FONCTION - Actualiser le nombre d'items dans le panier au chargement de la page
function refreshCartCount () {
    let cartIds = localStorage.getItem("cartIds");
    if (cartIds == null) {
        document.getElementById("cartCount").innerText = "0";
    } else {
        document.getElementById("cartCount").innerText = JSON.parse(cartIds).length;
    };
}

