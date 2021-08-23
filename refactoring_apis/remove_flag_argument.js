// A flag argument is a function argument that the caller users to indicate which logic the called function should execute
function bookConcert(aCustomer, isPremium) {
  if (isPremium) {
    // logic for premium booking
  } else {
    // logic for regular booking
  }
}

// To book a premium concert, I issue the call like so:
bookConcert(aCustomer, true);

// Flag arguments can also come as enums
bookConcert(aCustomer, CustomerType.PREMIUM);

// or strings
bookConcert(aCustomer, "premium");

// Flag arguments complement the process of understanding what function calls are available and how to call them. Once I select a function, I have to figure out what values are available for the flag arguments. Boolean flags are even worse since they don't convey their meaning to the reader. It's clearer to provide an explicit function for the task I want to do.
premiumBookConcert(aCustomer);

// Not all arguments are flag arguments.
// To be a flag argument, callers must be setting the boolean value to a literal value and it's not data that's flowing through the program.
// The implementation function must be using the argument to influence its flow control, not as data that it passes to further functions

// Flag arguments can have it's place if there's more than one of them in the function, since otherwise I would need explicit functions for every combination of their values. But this may be a signal that the function is doing too much and I should look for a way to create simpler functions that I can compose for this logic

// Calculate a delivery date for a shipment
aShipment.deliveryDate = deliveryDate(anOrder, true);
aShipment.deliveryDate = deliveryDate(anOrder, false);

// What is the meaning of the boolean value?
function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
    else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else deliveryTime = 3;
    return anOrder.placedOn.plusDays(1 + deliveryTime);
  } else {
    let deliveryTime;
    if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
    else deliveryTime = 4;
    return anOrder.placedOn.plusDays(2 + deliveryTime);
  }
}

// I can use Decompose Conditional
function deliveryDate(anOrder, isRush) {
  if (isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}

function rushDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else deliveryTime = 3;
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
  else deliveryTime = 4;
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}

// The two new functions capture the intent of the call better, so I can replace each call:
aShipment.deliveryDate = deliveryDate(anOrder, true);
// with
aShipment.deliveryDate = rushDeliveryDate(anOrder);

aShipment.deliveryDate = deliveryDate(anOrder, false);

// with
aShipment.deliveryDate = regularDeliveryDate(anOrder);

// When I've replaced all the callers, I remove deliveryDate.

// A flag argument isn't just the presence of a boolean value; it's that the boolean is set with a literal rather than data. If all the callers of deliveryDate were like this:
const isRush = determineIfRush(anOrder);
aShipment.deliveryDate = deliveryDate(anOrder, isRush);

// then I'd have no problem with deliveryDate's signature - although, I would still want to apply Decompose Conditional

// Some callers may use a literal for the flag argument while others set the argument with data. I can still use Remove Flag Argument but not change the data callers and not remove deliveryDate; therefore, supporting both interfaces for different use cases

// Decomposing the conditional is a good way to carry out the refactoring but it only works if the dispatch on the parameter is the outer part of the function (or if it can easily be refactored to make it so). Consider the parameter being used in a more tangled way:
function deliveryDate(anOrder, isRush) {
  let result;
  let deliveryTime;
  if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT")
    deliveryTime = isRush ? 1 : 2;
  else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
    deliveryTime = 2;
    if (anOrder.deliveryState === "NH" && !isRush) deliveryTime = 3;
  } else if (isRush) deliveryTime = 3;
  else if (anOrder.deliveryState === "ME") deliveryTime = 3;
  else deliveryTime = 4;
  result = anOrder.placedOn.plusDays(2 + deliveryTime);
  if (isRush) result = result.minusDays(1);
  return result;
}

// In this case, teasing out isRush into a top-level dispatch conditional is likely more work than I fancy. Instead, I can layer functions over deliveryDate:
function rushDeliveryDate(anOrder) {
  return deliveryDate(anOrder, true);
}

function regularDeliveryDate(anOrder) {
  return deliveryDate(anOrder, false);
}

aShipment.deliveryDate = rushDeliveryDate(anOrder);

aShipment.deliveryDate = regularDeliveryDate(anOrder);

// If there aren't any callers using the parameter as data, I like to restrict it's visibility or rename it to a name that conveys that is shouldn't be used directly (e.g. deliveryDateHelperOnly)
