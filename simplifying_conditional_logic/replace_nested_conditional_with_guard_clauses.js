// Use if and else leg if normal behaviour and I'm placing equal weight to the if and else leg. If there is an unusual condition, I check the condition and return if it's true (this is called a guard clause).
// There is no rule that says there must be only one exit point. If a method is clearer with one exit point, use one exit point; otherwise don't.
function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      // logic to compute amount
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).elit();
      sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
  return result;
}

// Nesting the conditionals masks the true meaning of what's going on. Primary purpose of this code applies if these conditions aren't the case
// We can make the code read more clearly with guard clauses

// Begin with topmost condition
function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };

  if (employee.isRetired) {
    result = { amount: 0, reasonCode: "RET" };
  } else {
    // logic to compute amount
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    result = someFinalComputation();
  }

  return result;
}

// Test and move onto next
function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

  // logic to compute amount
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  result = someFinalComputation();

  return result;
}

// Result variable isn't doing anything useful so remove it
function payAmount(employee) {
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

  // logic to compute amount
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  return someFinalComputation();
}

// Example: Reversing the Conditions
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital > 0) {
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentFactor;
    }
  }
  return result;
}

// Start with the topmost condition but I reverse the condition to put the guard clause
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) return result;

  if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
    result =
      (anInstrument.income / anInstrument.duration) *
      anInstrument.adjustmentFactor;
  }

  return result;
}

// Next conditional is a bit more complicated. Add a not
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) return result;

  if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0))
    return result;
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;

  return result;
}

// This is confusing, so I simplify it
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) return result;

  if (anInstrument.interestRate <= 0 && anInstrument.duration <= 0)
    return result;
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;

  return result;
}

// Both of these lines have conditions with the same result, so I apply Consolidate Conditional Expression
function adjustedCapital(anInstrument) {
  let result = 0;
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return result;

  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;

  return result;
}

// The result variable isn't doing anything useful, so I remove it
function adjustedCapital(anInstrument) {
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return 0;

  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );
}
