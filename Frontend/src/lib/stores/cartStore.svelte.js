let cartItems = $state([]);

export const cartStore = {
  get items() {
    return cartItems;
  },
  get count() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },
  addItem(item) {
    const existingItem = cartItems.find(i => i.cursineName === item.cursineName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
  },
  removeItem(cursineName) {
    cartItems = cartItems.filter(item => item.cursineName !== cursineName);
  },
  updateQuantity(cursineName, quantity) {
    const item = cartItems.find(i => i.cursineName === cursineName);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(cursineName);
      }
    }
  },
  clearCart() {
    cartItems = [];
  },
  get total() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
};
