// Code is easier to understand when things are related to each other appear together

// Two decisions involved: what slide I'd like to do and whether I can do it

// I could either want to move declarations of elements close to where I use them or slide code because I want to do another refactoring such as Extract Function

// Look at the code I'm sliding cover and ask if they interfere with each other in a way that would change the observable behaviour of the program
const pricingPlan = retrievePricingPlan();

const order = retreiveOrder();

const baseCharge = pricingPlan.base;

let charge;

const chargePerUnit = pricingPlan.unit;

const units = order.units;

let discount;

charge = baseCharge + units * chargePerUnit;

let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);

discount = discountableUnits * pricingPlan.discountFactor;

if (order.isRepeat) discount += 20;

charge = charge - discount;

chargeOrder(charge);

// Move discount and order but how do we know if order is side effect free? I need to look inside retrieveOrder() to ensure there are no side effects

const pricingPlan = retrievePricingPlan();

const order = retreiveOrder();

const baseCharge = pricingPlan.base;

let charge;

const chargePerUnit = pricingPlan.unit;

const units = order.units;

charge = baseCharge + units * chargePerUnit;

let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);

let discount;
discount = discountableUnits * pricingPlan.discountFactor;

if (order.isRepeat) discount += 20;

charge = charge - discount;

chargeOrder(charge);

// Example: Sliding with Conditionals

// Same statements in both legs of conditional

let result;
if (availableResources.length === 0) {
  result = createResource();
  allocatedResources.push(result);
} else {
  result = availableResources.pop();
  allocatedResources.push(result);
}
return result;

// I can slide these out of the conditional, in which case they turn into a single statement outside of the conditional block.

let result;
if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}
allocatedResources.push(result);
return result;

// In the reverse case, sliding a fragment into a conditional means repeating it in every leg of the conditional.
