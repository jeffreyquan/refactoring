class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor = 0.03;
    return basePrice * discountFactor;
  }
}

// Want to replace temps basePrice and discountFactor

// 1. Make basePrice a const to see if I have missed a reassignment

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor = 0.03;
    return basePrice * discountFactor;
  }
}

// 2. Extract right-hand side of assignment to a getting method

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const basePrice = basePrice();
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor = 0.03;
    return basePrice * discountFactor;
  }

  get basePrice() {
    return this._quantity * this._item.price;
  }
}

// 3. Apply inline variable

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor = 0.03;
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this._quantity * this._item.price;
  }
}

// 4. Repeat steps with discountFactor
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    return this.basePrice * this.discountFactor;
  }

  get discountFactor() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor = 0.03;
    return discountFactor;
  }

  get basePrice() {
    return this._quantity * this._item.price;
  }
}
