const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "20161110 09:10" },
    { temp: 53, time: "20161110 09:20" },
    { temp: 58, time: "20161110 09:30" },
    { temp: 53, time: "20161110 9:40" },
    { temp: 51, time: "20161110 09:50" },
  ],
};

function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

const alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

// 1. Declare a class for the combined data

class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }

  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }
}

// 2. Change function declaration to add new object as a parameter to readingsOutsideRange
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 3. Go to each caller and adjust it to pass in the correct date range
const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling,
  range
);

// 4. Replace the usage of parameters
function readingsOutsideRange(station, min, range) {
  return station.readings.filter((r) => r.temp < min || r.temp > range.max);
}

alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, range);

function readingsOutsideRange(station, range) {
  return station.readings.filter(
    (r) => r.temp < range.min || r.temp > range.max
  );
}

alerts = readingsOutsideRange(station, range);

// 5. Move behaviour into the new class
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }

  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }

  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}
