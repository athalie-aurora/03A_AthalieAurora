// Mendefinisikan daftar barang dengan nama, harga, dan nama gambar
const items = [
    { name: "Alstromeria", price: 100000, image: "alstromeria.jpg" },
    { name: "Bluebell", price: 150000, image: "blubell.jpg" },
    { name: "Chamomile", price: 175000, image: "chamomile.png" }
];

// Mendapatkan referensi elemen-elemen DOM dari HTML
const itemList = document.getElementById("item-list");
const totalPrice = document.getElementById("total-price");
const cartItemList = document.getElementById("cart-item-list");
const calculateButton = document.getElementById("calculate-button");

let cartTotal = 0;
let cartItems = [];

// Fungsi untuk menambahkan item ke keranjang belanja
function addToCart(price, item, quantity) {
    cartTotal += price * quantity;
    cartItems.push({ item, quantity });
    updateTotal();
}

// Fungsi untuk menghapus item dari keranjang belanja
function removeFromCart(price, item, quantity) {
    cartTotal -= price * quantity;
    cartItems = cartItems.filter(cartItem => cartItem.item !== item);
    updateTotal();
}

// Fungsi untuk memperbarui tampilan total harga dan item di keranjang belanja
function updateTotal() {
    totalPrice.textContent = cartTotal.toFixed(2);

    // Menampilkan daftar barang yang telah ditambahkan pada keranjang belanja
    cartItemList.innerHTML = "";
    cartItems.forEach(cartItem => {
        const cartItemElement = document.createElement("li");
        cartItemElement.textContent = `${cartItem.quantity}x ${cartItem.item.name} (Rp ${cartItem.item.price * cartItem.quantity})`;
        cartItemList.appendChild(cartItemElement);
    });
}

// Looping melalui setiap objek item untuk menampilkan di halaman
items.forEach(item => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <img src="images/${item.image}" alt="${item.name}" class="item-image">
        <span>${item.name}</span>
        <span>Rp ${item.price}</span>
        <div class="quantity-input">
            <button class="quantity-button minus">-</button>
            <input type="number" class="quantity" value="0">
            <button class="quantity-button plus">+</button>
        </div>
        <button class="add-cart-button">Tambahkan Barang</button>
    `;
    itemList.appendChild(listItem);

    const quantityInput = listItem.querySelector(".quantity");
    const minusButton = listItem.querySelector(".minus");
    const plusButton = listItem.querySelector(".plus");
    const addCartButton = listItem.querySelector(".add-cart-button");

    let quantity = 0;

    // Menambahkan event listener untuk tombol minus
    minusButton.addEventListener("click", () => {
        if (quantity > 0) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    // Menambahkan event listener untuk tombol plus
    plusButton.addEventListener("click", () => {
        quantity++;
        quantityInput.value = quantity;
    });

    // Menambahkan event listener untuk tombol "Tambahkan Barang"
    addCartButton.addEventListener("click", () => {
        if (quantity > 0) {
            addToCart(item.price, item, quantity);
            updateTotal();
        } else {
            alert("Masukkan jumlah barang terlebih dahulu.");
        }
    });
});

// Menambahkan event listener untuk tombol "Hitung Total"
/*calculateButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Tambahkan barang terlebih dahulu.");
        return;
    }

    alert(`Total harga barang: Rp ${cartTotal.toFixed(2)}`);
});

*/

// Konstanta untuk menghitung persentase PPN
const PPN_PERCENTAGE = 0.11; // 11% PPN

// Menambahkan event listener untuk tombol "Hitung Total"
calculateButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Tambahkan barang terlebih dahulu.");
        return;
    }

    const HargaPPN = cartTotal * PPN_PERCENTAGE;
    const HargaAkhir = cartTotal + HargaPPN;

    alert(`Total harga barang: Rp ${cartTotal.toFixed(2)}
    PPN (11%): Rp ${HargaPPN.toFixed(2)}
    Total harga barang dengan PPN: Rp ${HargaAkhir.toFixed(2)}`);
});

