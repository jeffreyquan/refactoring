class Person {
  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

// Separate the telephone number behaviour into its own class by defining an empty telephone number class
class TelephoneNumber {}

// Create instance of telephone number when construction person
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

class TelephoneNumber {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg_officeAreaCode;
  }
}

// Use Move Field on one field/method at a time, test and then move onto the next field/method

// officeAreaCode
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

// officeNumber
class TelephoneNumber {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.officeAreaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.officeNumber;
  }

  set officeNumber(arg) {
    this._telephoneNumber.officeNumber = arg;
  }
}

// telephoneNumber
class TelephoneNumber {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }

  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.officeAreaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.officeNumber;
  }

  set officeNumber(arg) {
    this._telephoneNumber.officeNumber = arg;
  }
}

// Tidy up. Having "office" as part of the telephone number code makes so sense, so rename it
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }

  set areaCode(arg) {
    this._areaCode = arg;
  }

  get number() {
    return this._number;
  }

  set number(arg) {
    this._number = arg;
  }

  get telephoneNumber() {
    return `(${this.areaCode}) ${this.number}`;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}

// telephoneNumber method in the TelephoneNumber class doesn't make sense so rename it
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }

  set areaCode(arg) {
    this._areaCode = arg;
  }

  get number() {
    return this._number;
  }

  set number(arg) {
    this._number = arg;
  }

  toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}
