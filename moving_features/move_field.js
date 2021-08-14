class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }

  becomePreferred() {
    this._discountRate += 0.03;
    // other nice things
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}

// I want to move the discount rate field from customer to the customer contract

// First thing I need to use is Encapsulate Variable to encapsulate access to the discount rate field

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._setDiscountRate(discountRate);
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }

  _setDiscountRate(aNumber) {
    this._discountRate = aNumber;
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
    // other nice things
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

// I use a method to update the discount rate, rather than a property setter as I don't want to make a public setter for the discount rate

// I add a field and accessors to the customer contract
class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }

  set discountRate(arg) {
    this._discountRate = arg;
  }
}

// Modify the accessors on customer to use the new field

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }

  get discountRate() {
    return this._contract.discountRate;
  }

  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
    // other nice things
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

// Example: Moving to a Shared Object
class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}

class AccountType {
  constructor(nameString) {
    this._name = nameString;
  }
}

// I want to change things so that an account's interest rate is determined from its account type
// The access to the interest rate is already nicely encapsulated, so I'll just create the field and an appropriate accessor on the account type

class AccountType {
  constructor(nameString) {
    this._name = nameString;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}

// Need to make sure that accounts of the same type have the same interest rate. Can Introduce Assertion to the account class

class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    assert(interestRate === this._type.interestRate);
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}

// I might run the system for a while with this assertion in place to see if I get an error or I might log the problem. Once I'm confident that I'm not introducing an observable change, I can change the access and remove the update from the account completely

class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
  }

  get interestRate() {
    return this._type.interestRate;
  }
}
