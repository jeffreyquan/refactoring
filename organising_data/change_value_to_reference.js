// The biggest difficulty in having physical copies of the same logical data occurs when I need to update the shared data. I then have to find all the copies and update them all. If I miss one, I’ll get a troubling inconsistency in my data. In this case, it’s often worthwhile to change the copied data into a single reference. That way, any change is visible to all the customer’s orders.
// Changing a value to a reference results in only one object being present for an entity, and it usually means I need some kind of repository where I can access these objects. I then only create the object for an entity once, and everywhere else I retrieve it from the repository

class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
    // load other data
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}

// This becomes problematic when I'm working with five orders that refer to the same customer ID. Any change to one, I would have to make to the others with the same data to keep them consistent. This can also lead to confusion, having multiple objects representing the same entity.

// Solution is to use a repository object which allows me to register customer objects with an ID and ensure only one customer with a certain ID is created
let _repositoryData;
export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}

// Change the order's constructor to use this repository. Since the customer's ID is present in the input data stream, I can obtain the correct customer.

class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
    // load other data
  }

  get customer() {
    return this._customer;
  }
}

// For this example, I created a new customer object with the first order that referenced it. Another common approach is to get a list of customers, populate the repository with them, and then link to them as I read the orders. In that case, an order that contains a customer ID not in the repository would indicate an error.
// One problem with this code is that the constructor body is coupled to the global repository. Globals should be treated with care—like a powerful drug, they can be beneficial in small doses but a poison if used too much. If I’m concerned about it, I can pass the repository as a parameter to the constructor.
