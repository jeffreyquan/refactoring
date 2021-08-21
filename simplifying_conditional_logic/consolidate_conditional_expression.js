// Example: Using ors
function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;

  // compute the disability amount
}

// Since results are the same for each condition, I should combine them into a single expression

// For this, I use an or operator

function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2 || anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;

  // compute the disability amount
}

// Test then fold the other condition
function disabilityAmount(anEmployee) {
  if (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  )
    return 0;

  // compute the disability amount
}

// Once all the conditions are together, I use Extract function
function disabilityAmount(anEmployee) {
  if (isNotEligableForDisability()) return 0;

  // compute the disability amount
}

function isNotEligableForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}

// Example: Using ands e.g. nested if statements
if (anEmployee.onVacation) {
  if (anEmployee.seniority > 10) return 1;

  return 0.5;
}

// I can combine these using the and operator
if (anEmployee.onVacation && anEmployee.seniority > 10) return 1;
return 0.5;
