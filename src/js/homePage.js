/* Page 1 - Accueil */

document.addEventListener ('DOMContentLoaded', (event) => {
    createThumbnails();
});

// FONCTION - Afficher une vignette pour chaque item avec son id, son nom, son image, son prix
function createThumbnails () {
    fetch (host)
        .then (function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then (function (allItems) {
            for (let i in allItems) {
                document.getElementById("productsSection__content__list").innerHTML +=  `
                    <div class="productsSection__content__list__thumbnail">                
                        <h3>${allItems[i].name}</h3>
                        <div class="productsSection__content__list__thumbnail__content">
                            <img class="productsSection__content__list__thumbnail__content--image" src="${allItems[i].imageUrl}" alt="meuble 1">
                            <div class="productsSection__content__list__thumbnail__content--actions" id="${allItems[i]._id}"> 
                                <p>Prix: ${allItems[i].price} €</p>
                                <a href="./product/index.html?${allItems[i]._id}"><button class="components_button">Détails</button></a> 
                                <button class="components_button">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>`;     
            }
        })
        .catch (function(err) {
            console.error(err);
        });
}
