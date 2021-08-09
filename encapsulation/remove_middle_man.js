// client
manager = aPerson.manager;

class Person {
  get manager() {
    return this._department.manager;
  }
}

class Department {
  get manager() {
    return this._manager;
  }
}

// If lots of method are doing this, I end up with too many of these delegations on the person. That's when it is good to remove the middle man

// First, make an accessor for the delegate
class Person {
  get department() {
    return this._department;
  }
}

// Go to each client one at a time and modify them to use department directly

manager = aPerson.department.manager;

// Once I've done this with all the clients, I can remove the manager method from Person. I can repeat this process for any other simple delegations on Person

// With automated refactorings, I can use Encapsulate Variable on department and change manager getting to use the public department getter
class Person {
  get manager() {
    return this.department.manager;
  }

  get department() {
    return this._department;
  }
}

// The change is rather too subtle in JavaScript, but by removing the underscore from department I’m using the new getter rather than accessing the field directly.
