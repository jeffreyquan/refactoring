// Pull Up Constructor Body
class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  // rest of class...
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
  // rest of class...
}

// Common code here is the assignment of name. I use Slide Statements to move the assignment in Employee next to the call to super()

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._name = name;
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // rest of class...
}

// After testing, I move the common code to the superclass. Since that code contains reference to the constructor argument, I pass that in as a parameter.
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // rest of class...
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._staff = staff;
  }
  // rest of class...
}

// Run the tests and I'm done.

// Consider this example:

class Employee {
  constructor(name) {}
  get isPrivileged() {}
  assignCar() {}
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    if (this.isPrivileged) this.assignCar(); // every subclass does this
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}

// An issue we have here comes from the fact that the call to isPrivileged can't be made until after the grade field is assigned, and that can only be done in the subclass.

// First, I do Extract Function on the common code
class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction();
  }

  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}

// Then I  use Pull Up Method to move it to the superclass
class Employee {
  constructor(name) {}
  get isPrivileged() {}
  assignCar() {}

  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}
