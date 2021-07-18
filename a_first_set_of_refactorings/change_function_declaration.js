// Example 1
function circum(radius) {
  // call new function declaration as I am migrating callers from using circum to circumference
  return circumference(radius);
}

// change declaration to something more sensible
function circumference(radius) {
  return 2 * Math.PI * radius;
}

// Example 2 - Adding a Parameter
class Book {
  addReservation(customer) {
    this._reservations.push(customer);
  }
}

// Need to add a priority queue
class Book {
  addReservation(customer) {
    this.zz_addReservation(customer);
  }

  // temporary name
  zz_addReservation(customer) {
    this._reservations.push(customer);
  }
}

// add parameter
class Book {
  addReservation(customer) {
    this.zz_addReservation(customer, false);
  }

  // temporary name
  zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(customer);
  }
}

// replace callers to use zz_addReservation and then rename zz_addReservation to addReservation removing the original

// Example 3
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
