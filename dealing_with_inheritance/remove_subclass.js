// Subclasses can lose their value as the variations they support are moved to other places or removed altogether
//Sometimes, subclasses are added in anticipation of features that never end up being built, or end up being built in a way that doesn’t need the subclasses

class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}

// If that's all the subclass does, it's not worth having. Before removing these subclasses, check if there's any subclass-dependent behaviour in the clients that should be moved there. In this case, I don't find anything worth keeping the subclasses for.

// Client

const numberOfMales = people.filter((p) => p instanceof Male).length;

// To minimise impact on any client code, I try to encapsulate the current representation
// When it comes to creating subclasses, the way to encapsulate is to use Replace Constructor with Factory Function
// There's a couple of ways I could make the factory

// Most direct way is to create a factory method for each constructor
function createPerson(name) {
  return new Person(name);
}

function createMale(name) {
  return new Male(name);
}

function createFemale(name) {
  return new Female(name);
}

// Although that's the direct choice, objects like this are often loaded from a source that uses the gender codes directly
function loadFromInput(data) {
  const result = [];

  data.forEach((aRecord) => {
    let p;
    switch (aRecord.gender) {
      case "M":
        p = new Male(aRecord.name);
        break;
      case "F":
        p = new Female(aRecord.name);
        break;
      default:
        p = new Person(aRecord.name);
    }
    result.push(p);
  });

  return result;
}

// In that case, I find it better to use Extract Function on the selection logic for which class to create and make the factory function

function createPerson(aRecord) {
  let p;
  switch (aRecord.gender) {
    case "M":
      p = new Male(aRecord.name);
      break;
    case "F":
      p = new Female(aRecord.name);
      break;
    default:
      p = new Person(aRecord.name);
  }
  return p;
}

function loadFromInput(data) {
  const result = [];
  data.forEach((aRecord) => {
    result.push(createPerson(aRecord));
  });
  return result;
}

// I'll clean up the two functions. I'll use Inline Variable on createPerson

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Male(aRecord.name);
    case "F":
      return new Female(aRecord.name);
    default:
      return new Person(aRecord.name);
  }
}

// Use Replace Loop with Pipeline on loadFromInput

function loadFromInput(data) {
  return data.map((aRecord) => createPerson(aRecord));
}

// The factory encapsulates the creation of the subclasses, but there is also the use of instanceof which never smells good. I use Extract Function on the type check

const numberOfMales = people.filter((p) => isMale(p)).length;

function isMale(aPerson) {
  return aPerson instanceof Male;
}

// Use Move Function to move it into Person

class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return "X";
  }

  get isMale() {
    return this instanceof Male;
  }
}

const numberOfMales = people.filter((p) => p.isMale).length;

// With that refactoring done, all knowledge of the subclasses is now safely encased with the superclass and the factory function

// Add a field to represent the difference between the subclasses
// Since I'm using a code loaded from elsewhere, I might as well just use that

class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || "X";
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return this._genderCode;
  }

  get isMale() {
    return this instanceof Male;
  }
}

// When initializing it, I set it to the default case

// I take the male case and fold its logic into the superclass. This involves modifying the factory and return a Person and modifying any instanceof tests to use the gender code field

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Person(aRecord.name, "M");
    case "F":
      return new Female(aRecord.name);
    default:
      return new Person(aRecord.name);
  }
}

class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || "X";
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return this._genderCode;
  }

  get isMale() {
    return this._genderCode === "M";
  }
}

// Test, remove the male subclass, test again and repeat the female subclass

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Person(aRecord.name, "M");
    case "F":
      return new Person(aRecord.name, "F");
    default:
      return new Person(aRecord.name);
  }
}

// I prefer to change the code to make it symmetrical if I can do it without introducing any other complexity

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Person(aRecord.name, "M");
    case "F":
      return new Person(aRecord.name, "F");
    default:
      return new Person(aRecord.name, "X");
  }
}

class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return this._genderCode;
  }

  get isMale() {
    return this._genderCode === "M";
  }
}
