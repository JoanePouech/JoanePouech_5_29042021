/* Page 1 - Accueil */

document.addEventListener ('DOMContentLoaded', () => {
    start();
});

// FONCTION - Lancer l'éxécution et attendre le résultat de createThumbnails() avant de lancer addItemToCart()
async function start () {
    await createThumbnails ();
    refreshCartCount (); // fichier cartManager.js
    addItemToCart (); // fichier cartManager.js
}

// FONCTION - Afficher une vignette pour chaque item avec son id, son nom, son image, son prix
function createThumbnails () {
    let finish = fetch (host)
        .then ((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then ((allItems) => {
            for (let i in allItems) {
                document.getElementById("productsSection__content__list").innerHTML +=  `
                    <div class="productsSection__content__list__thumbnail">                
                        <h3>${allItems[i].name}</h3>
                        <div class="productsSection__content__list__thumbnail__content">
                            <img class="productsSection__content__list__thumbnail__content--image" src="${allItems[i].imageUrl}" alt="meuble ${parseInt(i)+1}">
                            <div class="productsSection__content__list__thumbnail__content--actions" id="${allItems[i]._id}"> 
                                <p>Prix: ${allItems[i].price} €</p>
                                <a class="components_button" href="./product/index.html?${allItems[i]._id}">Détails</a> 
                                <button class="components_button js_cartButton">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>`;     
            }
        })
        .catch ((err) => {console.error(err);});
    return finish;
}
