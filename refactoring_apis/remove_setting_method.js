// Remove setting methods to indicate that the field will not change after setting in the constructor

class Person {
  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get id() {
    return this._id;
  }

  set id(arg) {
    this._id = arg;
  }
}

// Create a new object looks like this
const martin = new Person();
martin.name = "martin";
martin.id = "1234";

// Name of person may change but ID does not. So remove the setting method for ID and add ID to the constructor through Change Function Declaration

class Person {
  constructor(id) {
    this.id = id;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get id() {
    return this._id;
  }

  set id(arg) {
    this._id = arg;
  }
}

const martin = new Person("1234");
martin.name = "martin";

// Do this in each place I create a person and test after each change

// Apply Inline Function to the setting method
class Person {
  constructor(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get id() {
    return this._id;
  }
}
