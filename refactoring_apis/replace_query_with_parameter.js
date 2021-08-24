// Opposite of Replace Paramter with Query
// When I see references to something in the function's scope that I'm not happy with e.g. reference to a global variable or an element in the same module I intend to move away
// To resolve this, I replace the internal reference with a parameter
// A function that will always give the same result when called with the same parameter values is called referential transparency

class HeatingPlan {
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max) return this._max;
    else if (thermostat.selectedTemperature < this._min) return this._min_max;
    else return thermostat.selectedTemperature;
  }
}

// Caller
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();

// targetTemperature has a dependency on the global thermostat object

// Use Extract Variable on the parameter I want to have in my function
class HeatingPlan {
  get targetTemperature() {
    const selectedTemperature = thermostat.selectedTemperature;
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min_max;
    else return selectedTemperature;
  }
}

// Apply Extract Function to the entire body of the function except for the bit that figures out the parameter
class HeatingPlan {
  get targetTemperature() {
    const selectedTemperature = thermostat.selectedTemperature;
    return this.xxNEWtargetTemperature(selectedTemperature);
  }

  xxNEWtargetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min_max;
    else return selectedTemperature;
  }
}

// Inline the variable I just extracted which leaves just the function as a simple call
class HeatingPlan {
  get targetTemperature() {
    return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
  }

  xxNEWtargetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min_max;
    else return selectedTemperature;
  }
}

// Use Inline Function on this method
// Caller
if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();

// Rename function by removing the prefix
class HeatingPlan {
  targetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min_max;
    else return selectedTemperature;
  }
}

// Caller
if (
  thePlan.targetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();

// I've made targetTemperature referentially transparent - everytime I call targetTemperature on the same object with the same argument, I get the same result.

// If all the methods of the heating plan have referential transparency, that makes this class much easier to test and reason about.
