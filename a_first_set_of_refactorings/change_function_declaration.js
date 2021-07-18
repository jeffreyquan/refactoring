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
// Aim is to make it more usable in more context by removing the dependency on the customer
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));

// 1. Extract variable
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 2. Extract function
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return xxNEWinNewEngland(stateCode);
}

function xxNEWinNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 3. Inline variable
function inNewEngland(aCustomer) {
  return xxNEWinNewEngland(aCustomer.address.state);
}

function xxNEWinNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 4. Inline function
const newEnglanders = someCustomers.filter((c) =>
  xxNEWinNewEngland(c.address.state)
);

// 5. Change function declaration to change name of new function to original

function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = someCustomers.filter((c) =>
  inNewEngland(c.address.state)
);
