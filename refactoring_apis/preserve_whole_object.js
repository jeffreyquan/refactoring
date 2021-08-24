const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
  alerts.push("room temperature went outside range");

class HeadingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }
}

// Instead of unpacking the range information when I pass it in, I can pass in the whole range object.

// Start by stating the interface I want as an empty function. Since I intend to replace the existing withinRange, I rename it the same but with an easily replaceable prefix.
class HeadingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }

  xxNEWwithinRange(aNumberRange) {
    return this.withinRange(aNumberRange.low, aNumberRange.high);
  }
}

// Take existing function calls and have them call the new function
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.xxxNEWwithinRange(aRoom.daysTempRange))
  alerts.push("room temperature went outside range");

// After changing the calls, I can see some of the earlier code isn't needed anymore so I Remove Dead Code
if (!aPlan.xxxNEWwithinRange(aRoom.daysTempRange))
  alerts.push("room temperature went outside range");

// Use Inline Function on the original function
class HeadingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }

  xxNEWwithinRange(aNumberRange) {
    return (
      aNumberRange.low >= this._temperatureRange.low &&
      aNumberRange.high <= this._temperatureRange.high
    );
  }
}

// Finally remove the ugly prefix from the new function and all its callers. The prefix makes it a simple global replace

class HeadingPlan {
  withinRange(aNumberRange) {
    return (
      aNumberRange.low >= this._temperatureRange.low &&
      aNumberRange.high <= this._temperatureRange.high
    );
  }
}

// Caller
if (!aPlan.withinRange(aRoom.daysTempRange))
  alerts.push("room temperature went outside range");

// Example: A Variation to Create the New Function
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
  alerts.push("room temperature went outside range");

// I want to rearrange the code so that I can create the new function by using Extract Function on some existing code
// The caller code isn't quite there yet, but I can get there by using Extract Variable a few times
// First, disentangle the call to the old function from the conditional
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange) alerts.push("room temperature went outside range");

// Extract the input parameter
const tempRange = aRoom.daysTempRange;
const low = tempRange.low;
const high = tempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange) alerts.push("room temperature went outside range");

// Use Extract Function to create the new function
const tempRange = aRoom.daysTempRange;
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange) alerts.push("room temperature went outside range");

function xxNEWwithinRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}

// Since the original function is in a different context (the HeatingPlan class), I need to use Move Function
const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan.xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange) alerts.push("room temperature went outside range");

class HeatingPlan {
  xxNEWwithinRange(tempRange) {
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = this.withinRange(low, high);
    return isWithinRange;
  }
}

// Continue as before, replacing other callers and inlining the old function into the new one
// I would also inline the variables I extracted to provide the clean separation for extracting the new function
