// I have two subclass methods that do the same thing

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}

// Both classes refer to monthlyCost property which isn't defined on the superclass but is present in both subclasses

// The methods have different names, so I Change Function Declaration to make them the same
class Department extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

// I copy the method from one subclass and paste it in the superclass

class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

// First I remove annualCost from Employee, test, and then remove it from Department
class Employee extends Party {}

class Department extends Party {}

// This completes the refactoring. However, it is noted that annualCost calls monthlyCost, but monthlyCost doesn't appear in the Party class. It all works because JavaScript is a dynamic language but there is value in signalling that subclasses of Party should provide an implementation for monthlyCost. A good way to provide this signal is a trap method like this:

class Party {
  get monthlyCost() {
    throw new SubclassResponsibilityError();
  }
}
