// Using a constructor has more limitations than a factory function

class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesman" };
  }
}

// Callers
candidate = new Employee(document.name, document.empType);
const leadEngineer = new Employee(document.leadEngineer, "E");

// First step is to create a factory function. Its body is a simple delegation to the constructor
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}

// Change callers of constructor to use the factory function instead
candidate = createEmployee(document.name, document.empType);
const leadEngineer = createEmployee(document.leadEngineer, "E");

// I don't like using the type code here - it's generally a bad smell to pass a code as a literal string
// I prefer to create a new factory function that embeds this kind of employee I want into its name

const leadEngineer = createEngineer(document.leadEngineer, "E");

function createEngineer(name) {
  return new Employee(name, "E");
}
