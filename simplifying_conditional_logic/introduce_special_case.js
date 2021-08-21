// A utility company installs its services in sites
class Site {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}
}

// Most of the time, a site has a customer but sometimes there isn't one. In these cases, custom field is filled with a string of 'unknown'. Clients of the site need to be able to handle unknown customer

// Client 1
const aCustomer = site.customer;

let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan =
  aCustomer === "unknown" ? registry.billingPlans.basic : aCustomer.billingPlan;

// Client 3
if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

// Client 4
const weeksDelinquent =
  aCustomer === "unknown"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// Many clients have to deal with an unknown customer. Most do the same thing: use 'occupant' as the name, give them a basic billing plan and class them as zero-weeks delinquent. We can create a Special Case Object

// Add a method to customer to indicate it is unknown
class Customer {
  get isUnknown() {
    return false;
  }
}

// Add an Unknown Customer class
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
}

// Using Extract Function
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg === "unknown"))
    throw new Error(`investigate bad value: <${arg}>`);
  return arg === "unknown";
}

// I can use this function whenever I'm testing for an unknown customer and change these calls one at a time

// Client 1
const aCustomer = site.customer;

let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// Client 3
if (isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// Client 4
const weeksDelinquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// After I've changed all the callers to use isUnknown, I can change the site class to return an unknown customer

class Site {
  get customer() {
    return this._customer === "unknown"
      ? new UnknownCustomer()
      : this._customer;
  }
}

// I cna check I'm no longer using the 'unknown' string by changing isUnknown to use the unknown value
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
    throw new Error(`investigate bad value: <${arg}>`);
  return arg.isUnknown;
}

// Test to ensure it's all working

// Use Combine Functions into Class to take each client's special-case check and see if I can replace it with a commonly expected value. I have various clients using 'occupant' for the name of the unknown customer

// I add a suitable method to the unknown customer
class UnknownCustomer {
  get isUnknown() {
    return true;
  }

  get name() {
    return "occupant";
  }
}

// Now I can make all the conditional code go away

// Client 1
const customerName = aCustomer.name;

// After testing, I can probably use Inline Variable on that variable too

// Next would be billing plan property

// Client 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// Client 3
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// For read behaviour, I do the same thing I did with the name - take the common response and reply with it. With the write behaviour, I let the setter be called but it does nothing
class UnknownCustomer {
  get isUnknown() {
    return true;
  }

  get name() {
    return "occupant";
  }

  get billingPlan() {
    return registry.billingPlans.basic;
  }

  set billingPlan(arg) {
    /* ignore */
  }
}

// Client reader
const plan = aCustomer.billingPlan;

// Client writer
aCustomer.billingPlan = newPlan;

// Special-case objects are value objects and should always be immutable even if the objects they are substituting for are not

// Last case - trickier

// Client
const weeksDelinquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// General rule with special-case object is that if it needs to return related objects, they are usually special case themselves. Here, I need to create a null payment history

class UnknownCustomer {
  get isUnknown() {
    return true;
  }

  get name() {
    return "occupant";
  }

  get billingPlan() {
    return registry.billingPlans.basic;
  }

  set billingPlan(arg) {
    /* ignore */
  }

  get paymentHistory() {
    return new NullPaymentHistory();
  }
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

// Client
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

// There will be some clients that do something different with the special case. For example, I can have a client return 'unknown occupant' instead of 'occupant'

// In this case, I need to retain a special-case check for this client. I will change it to use the method on customer, essentially using Inline Function on isUnknown

const name = aCustomer.isUnknown ? "unknown occupant" : aCustomer.name;

// Example: Using an Object Literal
// If I only read the data structure instead of updating, I can use a literal object instead
// This example has no clients that update the customer

class Site {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}
}

// Client 1

const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan =
  aCustomer === "unknown" ? registry.billingPlans.basic : aCustomer.billingPlan;

// Client 3
const weeksDelinquent =
  aCustomer === "unknown"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// I start by adding an isUnknown property to the customer and creating a special-case object with that field
class Customer {
  get isUnknown() {
    return false;
  }
}

// Top level
function createUnknownCustomer() {
  return {
    isUnknown: true,
  };
}

// Apply Extract Function to the special case condition test
function isUnknown(arg) {
  return arg === "unknown";
}

// Client 1
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// Client 3
const weeksDelinquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// I change the site class and the condition test to work with the special case

class Site {
  get customer() {
    return this._customer === "unknown"
      ? createUnknownCustomer()
      : this._customer;
  }
}

// Top level
function isUnknown(arg) {
  return arg.isUnknown;
}

// Replace each standard response with the appropriate literal value. I start with the name
function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "occupant",
  };
}

// Client 1
const customerName = aCustomer.name;

// Then the billing plan:
function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
  };
}

// Client 2
const plan = aCustomer.billingPlan;

// Similarly, create a nested null payment history with the literal
function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  };
}

// Client 3
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

// Example: Using a Transform
// Same idea can be applied to a record by using a transform step
const record = {
  name: "Acme Boston",
  location: "Malden MA",
  // more site details
  customer: {
    name: "Acme Industries",
    billingPlan: "plan451",
    paymentHistory: {
      weeksDelinquentInLastYear: 7,
      //more
    },
    // more
  },
};

// In some cases, customer isn't known and such cases are marked the same way
const recordTwo = {
  name: "Warehouse Unit 15",
  location: "Malden MA",
  // more site details
  customer: "unknown",
};

// Similar client code that checks for the unknown customer
// Client 1
const site = acquireSiteData();
const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan =
  aCustomer === "unknown" ? registry.billingPlans.basic : aCustomer.billingPlan;

// Client 3
const weeksDelinquent =
  aCustomer === "unknown"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// My first step is to run the site data structure through a transform that, currently, does nothing but a deep copy

// Client 1
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

function enrichSite(inputSite) {
  return _.cloneDeep(inputSite);
}

// Apply Extract Function to test for an unknown customer
function isUnknown(aCustomer) {
  return aCustomer === "unknown";
}

// Client 1
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

// Client 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// Client 3
const weeksDelinquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// I begin the enrichment by adding an isUnknown property to the customer

function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
  };
  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

// I can modify the special-case test to include probing for this new property. I keep the original test as well, so that the test will work on both raw and enriched sites.
function isUnknown(aCustomer) {
  if (aCustomer === "unknown") return true;
  else return aCustomer.isUnknown;
}

// I test to ensure that all is OK, then star applying Combine Functions into Transform on the special case

// Move the choice of name into enrichment function
function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
    name: "occupant",
  };
  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

// Client 1
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... lots of intervening code ...
const customerName = aCustomer.name;

// Test then do the the billing plan
function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
  };
  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

// Client 2
const plan = aCustomer.billingPlan;

// Test again then do the last client
function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  };
  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

// Client 3
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
