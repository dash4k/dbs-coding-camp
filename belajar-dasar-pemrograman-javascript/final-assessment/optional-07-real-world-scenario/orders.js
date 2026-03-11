// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let orders;
orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  const id = generateUniqueId();
  const totalPrice = items.reduce((acc, item) => (acc + item.price), 0);
  const status = "Menunggu";

  orders.push({
    id,
    customerName,
    items,
    totalPrice,
    status,
  });
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  orders[orderIndex].status = status;
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  const finishedOrders = orders.filter((item) => item.status === "Selesai");
  return finishedOrders.reduce((acc, order) => (acc + order.totalPrice), 0);
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  orders = orders.filter((item) => item.id !== id);
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
