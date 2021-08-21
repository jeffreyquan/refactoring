if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

// We have separate rates for summer and winter. I can extract the condition into its won function
if (summer()) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// Then I do the then leg

if (summer()) {
  charge = summerCharge();
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

function summerCharge() {
  return quantity * plan.summerRate;
}

// Then the else leg

if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

// Reformat the conditional using the ternary operator

charge = summer() ? summerCharge() : regularCharge();
