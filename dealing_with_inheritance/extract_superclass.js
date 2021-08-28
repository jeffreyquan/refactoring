// If I see two classes doing similar things, I can take advantage of the basic mechanism of inheritance to pull their similarities together into a superclass
// I can use Pull Up Field to move common data into the superclass and Pull Up Method to move the common behaviour

// These two classes share some common functionality - their name and the notions of annual and monthly costs
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get name() {
    return this._name;
  }

  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }

  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}

// I can make the common behaviour more explicit by extracting a common superclass from them

// First, I create an empty superclass and let them both extend from it

class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get name() {
    return this._name;
  }

  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }

  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}

// I'll start with the data, which involves manipulating the constructor. I use Pull Up Field to pull up the name

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

  get monthlyCost() {
    return this._monthlyCost;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get name() {
    return this._name;
  }

  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }

  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}

// As I get data up to the superclass, I can also apply Pull Up Method on associated methods. First, the name:

class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }

  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}

// I have two methods with similar bodies
// The methods use, monthlyCost and totalMonthlyCost, which have different names and different bodies - but do they represent the same intent? If so, use Change Function Declaration to unify their names

class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get monthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

// Now apply Pull Up Method to the annual cost methods

class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get id() {
    return this._id;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get monthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }
}
