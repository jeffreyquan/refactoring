// Inverse of Pull Up Field

// If a field is only used by one subclass (or a small proportion of subclasses), I move it to those subclasses.

class Employee {
  private String quota;
}

class Engineer extends Employee {

}

class Salesman extends Employee {

}

// Change to since Salesman subclass it the only one using quota
class Employee {
 
}

class Engineer extends Employee {

}

class Salesman extends Employee {
 private String quota;
}