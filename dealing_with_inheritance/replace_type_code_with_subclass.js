class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  toString() {
    return `${this._name} (${this._type})`;
  }
}

// My first step is to use Encapsulate Variable to self-encapsulate the type code
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  get type() {
    return this._type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

// I pick one type code, the engineer, to start with and create a subclass of Employee and override the type code getter with the appropriate literal value

class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}

// Use Replace Constructor with Factory Function
function createEmployee(name, type) {
  return new Employee(name, type);
}

// To use the new subclass, I add selector logic into the factory
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
  }

  return new Employee(name, type);
}

// Test to ensure it's working correctly. Also, alter the return value of the engineer's override and test again to ensure the test fails. This ensures that the subclass is being used

// Continue with other cases and test after each one

class Salesman extends Employee {
  get type() {
    return "salesman";
  }
}

class Manager extends Employee {
  get type() {
    return "manager";
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
    case "salesman":
      return Salesman(name, type);
    case "manager":
      return new Manager(name, type);
  }

  return new Employee(name, type);
}

// Once I'm done with them all, I can remove the type code field and the superclass getting method

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

// After testing, I can remove the validation logic since the switch is effectively doing the same thing

class Employee {
  constructor(name, type) {
    this._name = name;
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
    case "salesman":
      return Salesman(name, type);
    case "manager":
      return new Manager(name, type);
    default:
      throw new Error(`Employee cannot be of type ${type}`);
  }
}

// The type argument to the constructor is now useless. I use Change Function Declaration

class Employee {
  constructor(name) {
    this._name = name;
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesman":
      return Salesman(name);
    case "manager":
      return new Manager(name);
    default:
      throw new Error(`Employee cannot be of type ${type}`);
  }
}

// I still have type code accessors on the subclasses (getter). I'll usually want to remove these too, but that may take a bit of time due to other methods that depend on them. I'll use Replace Conditional with Polymorphism and Push Down Method to deal with these. At some point, I'll have no code that uses the type getters, so I can use Remove Dead Code.

// Example: Using Indirect Inheritance
// I have existing subclasses for part-time and full-time employees so I can't subclass from Employee for the type codes

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  get type() {
    return this._type;
  }

  set type(arg) {
    this._type = arg;
  }

  get capitalizedType() {
    return (
      this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase()
    );
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

// This time toString is a bit more complicated

// My first step is to use Replace Primitive with Object on the type code

class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }

  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  get typeString() {
    return this._type.toString();
  }

  get type() {
    return this._type;
  }

  set type(arg) {
    this._type = new EmployeeType(arg);
  }

  get capitalizedType() {
    return (
      this.typeString.charAt(0).toUpperCase() +
      this.typeString.substr(1).toLowerCase()
    );
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

// Use Replace Type Code with Subclasses to the employee type
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }

  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesman"].includes(arg))
      throw new Error(`Employee cannot be of type ${arg}`);
  }

  get typeString() {
    return this._type.toString();
  }

  get type() {
    return this._type;
  }

  set type(arg) {
    this._type = new EmployeeType(arg);
  }

  static createEmployeeType(aString) {
    switch (aString) {
      case "engineer":
        return new Engineer();
      case "manager":
        return new Manager();
      case "salesman":
        return new Salesman();
      default:
        throw new Error(`Employee cannot be of type ${arg}`);
    }
  }

  get capitalizedType() {
    return (
      this.typeString.charAt(0).toUpperCase() +
      this.typeString.substr(1).toLowerCase()
    );
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

class EmployeeType {}

class Engineer extends EmployeeType {
  toString() {
    return "engineer";
  }
}

class Manager extends EmployeeType {
  toString() {
    return "manager";
  }
}

class Salesman extends EmployeeType {
  toString() {
    return "salesman";
  }
}

// If I were leaving it at that, I could remove the empty EmployeeType. But I prefer to leave it there as it makes explicit the relationship between the various subclasses. It's also a handy spot for moving other behaviour there, such as the capitalisation logic I tossed into the example specifically to illustrate this point.

class Employee {
  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }
}

class EmployeeType {
  get capitalizedName() {
    return (
      this.toString().charAt(0).toUpperCase() +
      this.toString().substr(1).toLowerCase()
    );
  }
}
