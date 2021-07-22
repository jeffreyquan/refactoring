class Order {
  constructor(data) {
    this.priority = data.priority;
  }
}

// client

highPriorityCount = orders.filter(
  (o) => "high" === o.priority || "rush" === o.priority
).length;

// 1. Encapsulate variable
class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  get priority() {
    return this._priority;
  }

  set priority(aString) {
    this._priority = aString;
  }
}

// 2. Create value class for priority

class Priority {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return this._value;
  }
}

// 3. Modify the accessors to use the new class
class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  get priority() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// 4. Rename function in Order that describes what's being returned

class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// client
highPriorityCount = orders.filter(
  (o) => "high" === o.priorityString || "rush" === o.priorityString
).length;

// 5. Provide direct access to priority object

class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  get priority() {
    return this._priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// client
highPriorityCount = orders.filter(
  (o) => "high" === o.priority.toString() || "rush" === o.priority.toString()
).length;

// As the priority class becomes useful elsewhere, allow clients of the order to use setter with a priority instance

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    this._value = value;
  }

  toString() {
    return this._value;
  }
}

// New priorty class can be useful as a place for new behaviour e.g. adding validation of priority values and comparison logic
class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;

    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`<${value}> is invalid for Priority`);
    }
  }

  toString() {
    return this._value;
  }

  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }

  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }

  equals(other) {
    return this._index === other._indexvalue;
  }

  higherThan(other) {
    return this._index > other._indexvalue;
  }

  lowerThan(other) {
    return this._index < other._indexvalue;
  }
}

//As I do this, I decide that a priority should be a value object, so I provide an equals method and ensure that it is immutable. Now I’ve added that behavior, I can make the client code more meaningful:

highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(new Priority("normal"))
).length;
