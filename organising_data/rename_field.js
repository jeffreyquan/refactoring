// Example: Renaming a Field
// Can do these changes in one go if the data structure isn't widely used

const organization = { name: "Acme Gooseberries", country: "GB" };

// I want to change name to title. The object is widely used in the code base and there are updates to the title in the code

// First, Encapsulate Record
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }

  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});

// Need to look at renaming the getting function, the setting function, the constructor and the internal data structure

// Since I copied the input data structure into the internal data structure, I need to separate them so I can work on them independently. I can do this by defining a separate field and adjusting the constructor and accessors to use it
class Organization {
  constructor(data) {
    this._title = data.name;
    this._country = data.country;
  }

  get name() {
    return this._title;
  }

  set name(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

// Add support for using "title" in the constructor, so that callers of the constructor can use either name or title

class Organization {
  constructor(data) {
    this._title = data.title !== undefined ? data.title : data.name;
    this._country = data.country;
  }

  get name() {
    return this._title;
  }

  set name(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

// Go through all constructor callers and change them one-by-one to the new name
const organization = new Organization({
  title: "Acme Gooseberries",
  country: "GB",
});

// Once all of them are done, I can remove support the name
class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }

  get name() {
    return this._title;
  }

  set name(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

// Change accessors by using Rename Function to each one
class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }

  get title() {
    return this._title;
  }

  set title(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
