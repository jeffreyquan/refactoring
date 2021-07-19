function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippingPerCase;

  const price = basePrice - discount + shippingCost;

  return price;

  const price = applyShipping(basePrice, shippingMethod, quantity, discount);

  return price;
}

// 1. Extract fcuntion
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const price = applyShipping(basePrice, shippingMethod, quantity, discount);

  return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippingPerCase;

  const price = basePrice - discount + shippingCost;

  return price;
}

// 2. Introduce intermediate data structure
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const priceData = {};

  const price = applyShipping(
    priceData,
    basePrice,
    shippingMethod,
    quantity,
    discount
  );

  return price;
}

function applyShipping(
  priceData,
  basePrice,
  shippingMethod,
  quantity,
  discount
) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippingPerCase;

  const price = basePrice - discount + shippingCost;

  return price;
}

// 3. Move parameters to intermediate data structure
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  // leave shippingMethod as it is (don't move it to intermediate data structure) since it's not being used in first phase
  const priceData = { basePrice, discount, quantity };

  const price = applyShipping(priceData, shippingMethod);

  return price;
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippingPerCase;

  const price = priceData.basePrice - priceData.discount + shippingCost;

  return price;
}

// 4. Extract first-phase code into it's own function
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);

  const price = applyShipping(priceData, shippingMethod);

  return price;
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  return { basePrice, discount, quantity };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippingPerCase;

  const price = priceData.basePrice - priceData.discount + shippingCost;

  return price;
}

// 5. Tidy up by using inline variables
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);

  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;

  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  return { basePrice, discount, quantity };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippingPerCase;

  return priceData.basePrice - priceData.discount + shippingCost;
}
