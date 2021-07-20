// Example 1 - Shallow Record

const organization = { name: "Acme Gooseberries", country: "GB" };

result += `<h1>${organization.name}</h1>`;

organization.name = newName;

// 1. Encapsulate variable
function getRawDataOfOrganization() {
  return organization;
}

result += `<h1>${getRawDataOfOrganization().name}</h1>`;

getRawDataOfOrganization().name = newName;

// 2. Replace record with class

class Organization {
  constructor(data) {
    this._data = data;
  }
}

const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});

function getRawDataOfOrganization() {
  return organization._data;
}

function getOrganization() {
  return organization;
}

// 3. Replace updates with setters amd replace readers with getters

class Organization {
  constructor(data) {
    this._data = data;
  }

  get name() {
    return this._data.name;
  }

  set name(aString) {
    this._data.name = aString;
  }
}

result += `<h1>${getOrganization().name}</h1>`;

// 4. Rename getter function that returns the data

function getOrganization() {
  return organization;
}

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

// Example 2 - Nested Record
const customerData = {
  1920: {
    name: "martin",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
        // remaining months of the year
      },
      2015: {
        1: 70,
        2: 63,
        // remaining months of the year
      },
    },
  },
};

// more customers in a similar form

// sample update
customerData[customerID].usages[year][month] = amount;

// sample read
function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];

  return {
    laterAmount: later,
    change: later - earlier,
  };
}

// 1. Encapstulate variable
function getRawDataOfCustomers() {
  return customerData;
}
function setRawDataOfCustomers(arg) {
  customerData = arg;
}

// sample update
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

// sample read
function compareUsage(customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
  const earlier =
    getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}

// 2. Make class

class CustomerData {
  constructor(data) {
    this._data = data;
  }
}

function getCustomerData() {
  return customerData;
}

function getRawDataOfCustomers() {
  return customerData._data;
}

function setRawDataOfCustomers(arg) {
  customerData = new CustomerData(arg);
}

// 3. Deal with updates

// sample update
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

// extract function that deals with updates

function setUsage(customerID, year, month, amount) {
  getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}

// move function into c;ass
getCustomerData().setUsage(customerID, year, month, amount);

// class CustomerData

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
}

// check if all updates have been captured by returning a copy of the data

function getCustomerData() {
  return customerData;
}

function getRawDataOfCustomers() {
  return customerData.rawData;
}

function setRawDataOfCustomers(arg) {
  customerData = new CustomerData(arg);
}

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }

  // using lodash
  get rawData() {
    return _.cloneDeep(this._data);
  }
}

// if my test coverage is good, one of the tests should break if I missed a modification

// 4. Deal with readers

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }

  // using lodash
  get rawData() {
    return _.cloneDeep(this._data);
  }

  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
}

function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().usage(customerID, laterYear, month);
  const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
  return { laterAmount: later, change: later - earlier };
}

// Since there's a lot of special cases in which clients can use the data, it's useful to give clients just the data structure to work with but we need to prevent modifying the underlying data. Simplest thing to do is provide a copy

function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().rawData[customerID].usages[laterYear][month];

  const earlier =
    getCustomerData().rawData[customerID].usages[laterYear - 1][month];

  return { laterAmount: later, change: later - earlier };
}
