// Make assumption explicit by writing an assertion
// An assertion is a conditional statement that is assumed to always be true
// They are useful for communication - they tell the reader something about the assume d state of the program at this point of execution
// Removing an assertion should not affect functionality of the program

class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber(this.discountRate * aNumber) : aNumber;
  }
}

// There's an assumption that the discount rate is a positive number. I can make that assumption explicit by using an assertion
// I can't easily place an assertion into a ternary expression, so first I'll reformulate it as an if-then statement

class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) {
      return aNumber;
    } else {
      assert(this.discountRate >= 0);
      return aNumber - this.discountRate * aNumber;
    }
  }
}

// In this case, I would rather put this assertion into the setting method. If the assertion fails in applyDiscount, my first puzzle is how it go into the field in the first place

class Customer {
  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }
}

// Only use assertions to check things that need to be true. Only use for things that are programmer errors. Any value checking when reading data from an external source should be part of the program, not an assertion. Assertions are a last resort to help track bugs
