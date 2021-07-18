let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

spaceship.owner = defaultOwner;

defaultOwner = { firstName: "Rebecca", lastName: "Parsons" };

// 1. Define functions to read and write the data
function getDefaultOwner() {
  return defaultOwner;
}

function setDefaultOwner(arg) {
  defaultOwner = arg;
}

// 2. Replace references to defaultOwner to getting function
spaceship.owner = getDefaultOwner();

// 3. Replace assignments with setting function
setDefaultOwner({ firstName: "Rebecca", lastName: "Parsons" });

// 4. Move variable and accessor methods to own file and exporting only accessor methods
// defaultOwner.js
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

export function getDefaultOwner() {
  return defaultOwner;
}

export function setDefaultOwner(arg) {
  defaultOwner = arg;
}

// 5. Rename variable and getter
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };

export function defaultOwner() {
  return defaultOwnerData;
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 6. Encapsulate the value
const owner1 = defaultOwner();

assert.equal("Fowler", owner1.lastName, "when set");

const owner2 = defaultOwner();

owner2.lastName = "Parsons";

assert.equal("Parsons", owner1.lastName, "after change owner2"); // is this ok?

// 7. Modify getting function to return a copy of the data
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };

export function defaultOwner() {
  return Object.assign({}, defaultOwnerData);
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 8. An alternative to prevent changes is to Encapsulate Record
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };

export function defaultOwner() {
  return new Person(defaultOwnerData);
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get firstName() {
    return this._firstName;
  }
  // and so on for other properties
}
