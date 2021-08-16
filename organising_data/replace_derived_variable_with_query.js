class ProductionPlan {
  get production() {
    return this._production;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// I can calculate production instead of updating it in applyAdjustment
// Introduce Assertion

class ProductionPlan {
  get production() {
    assert(this._production === this.calculatedProduction);
    return this._production;
  }

  get calculatedProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}

// I can run my tests and, if assertion doesn't fail, I can replace returning the field with returning the calculation

class ProductionPlan {
  get production() {
    return this.calculatedProduction;
  }
}

// Inline Function and Remove Dead Code

class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}

// Example: More Than One Source
// Above example only had a single source for the value of production. Sometimes more than one element can combine in the accumulator

class ProductionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }

  get production() {
    return this._production;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// First apply Split Variable
class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }

  get production() {
    return this._initialProduction + this._productionAccumulator;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// Introduce Assertion
class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }

  get production() {
    assert(
      this._productionAccumulator === this.calculatedProductionAccumulator
    );
    return this._initialProduction + this._productionAccumulator;
  }

  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._productionAccumulator += anAdjustment.amount;
  }
}

// Replace returning the field to include the calculation and remove dead code
class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._adjustments = [];
  }

  get production() {
    return this._initialProduction + this.calculatedProductionAccumulator;
  }

  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
