class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get department() {
    return this._department;
  }

  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }

  set chargeCode(arg) {
    this._chargeCode = arg;
  }

  get manager() {
    return this._manager;
  }

  set manager(arg) {
    this._manager = arg;
  }
}

// Some client code wants to know the manager, which reveals to the client how the department class works and that the department is responsible for tracking the manager
manager = aPerson.department.manager;

// Reduce this coupling by hiding the department class from the client. Create a simple delegating method on person
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get department() {
    return this._department;
  }

  set department(arg) {
    this._department = arg;
  }

  get manager() {
    return this._department.manager;
  }
}

// Change all clients of person to use the new method
manager = aPerson.manager;
