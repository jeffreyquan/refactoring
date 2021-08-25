// If a function isn't too complex and a command object is more trouble than it's worth, then a regular function should be used
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

// Caller

monthCharge = new ChargeCalculator(customer, usage, provider).charge;

// Use Extract Function to wrap the class creation and invocation
monthCharge = charge(customer, usage, provider);

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider).charge;
}

// I have to decide how I deal with supporting functions such as baseCharge. I can use Extract Variable on that value
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge() {
    const baseCharge = this.baseCharge;
    return baseCharge + this._provider.connectionCharge;
  }
}

// Then I use Inline Function on the supporting function
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge() {
    const baseCharge = this._customer.baseRate * this._usage;
    return baseCharge + this._provider.connectionCharge;
  }
}

// I now have all the processing in a single function. Next step is to move the data passed to the constructor to the main method
// First I use Change Function Declaration to add all the constructor parameters to the charge method
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge(customer, usage, provider) {
    const baseCharge = this._customer.baseRate * this._usage;
    return baseCharge + this._provider.connectionCharge;
  }
}

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider).charge(customer, usage, provider);
}

// I can now alter the body of charge to use the passed parameters instead. I can do this one at a time.
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * this._usage;
    return baseCharge + this._provider.connectionCharge;
  }
}

// I don't have to remove the assignment to this._customer in the constructor as it will be ignored. But I prefer to do this since it will make a test fail if I miss changing a use of field to the parameter

// Repeat for other parameters
class ChargeCalculator {
  get charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
  }
}

// I can now inline into the top-level charge function
function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}

// This is a special kind of Inline Function as it is inlining both the constructor and method call together.

// I can use Remove Dead Code on the command class