/* Page 4 - Confirmation de commande */

document.addEventListener ('DOMContentLoaded', () => {
    printOrderInfos();
});

// FONCTION - Actualiser le montant total et le numéro de commande
function printOrderInfos () {
    // Montant total
    let totalPrice = localStorage.getItem("totalPrice");
    document.getElementById("totalPrice").innerText = `${totalPrice} €`;
    // Numéro de commande
    let orderId = localStorage.getItem("orderId");
    document.getElementById("orderId").innerText = orderId;
}