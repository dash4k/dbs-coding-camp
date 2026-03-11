/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    listItems() {
        return this.items.reduce((acc, item) => {
            const details = item.displayDetails();
            return acc ? `${acc}\n${details}` : details;
        }, '');
    }
}


// Jangan hapus kode di bawah ini!
export default Inventory;
