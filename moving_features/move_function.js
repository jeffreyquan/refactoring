// Example: Moving a Nested Function to TopLevel
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i1], points[i]);
    }
    return result;
  }

  function distance(p1, p2) {
    // haversine formula see http://www.movabletype.
    co.uk / scripts / latlong.html;
    const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) *
        Math.cos(radians(p1.lat)) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  }

  function radians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function calculateTime() {}
}

// I would like to move calculateDistance to top level so that I can calculate distances fo tracks without all the other parts of the summary

// Copy the function to top level

function top_calculateDistance() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i1], points[i]);
  }
  return result;
}

// The new function has two undefined symbols: distance and points. The natural way to deal with points is to pass it in as a parameter
function top_calculateDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i1], points[i]);
  }
  return result;
}

// Can also do the same with distance but it might make sense to move it with calculateDistance. Distance only uses radians and radians doesn't use anything inside its current context, so I will move them too

// Start with nesting them inside calculateDistance
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i1], points[i]);
    }
    return result;

    function distance(p1, p2) {
      // haversine formula see http://www.movabletype.
      co.uk / scripts / latlong.html;
      const EARTH_RADIUS = 3959; // in miles
      const dLat = radians(p2.lat) - radians(p1.lat);
      const dLon = radians(p2.lon) - radians(p1.lon);
      const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(radians(p2.lat)) *
          Math.cos(radians(p1.lat)) *
          Math.pow(Math.sin(dLon / 2), 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return EARTH_RADIUS * c;
    }

    function radians(degrees) {
      return (degrees * Math.PI) / 180;
    }
  }

  function calculateTime() {}
}

// Copy over to top_calculateDistance

function top_calculateDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i1], points[i]);
  }
  return result;

  function distance(p1, p2) {
    // haversine formula see http://www.movabletype.
    co.uk / scripts / latlong.html;
    const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) *
        Math.cos(radians(p1.lat)) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  }

  function radians(degrees) {
    return (degrees * Math.PI) / 180;
  }
}

// The body of the original calculateDistance will now call top_calculateDistance
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateDistance() {
    return top_calculateDistance();
  }

  function calculateTime() {}
}

// Decide whether to keep the original function that's just delegatin or not. There are few callers and the callers are highly localized. So get rid of it.

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = top_calculateDistance(points);
  const pace = totalTime / 60 / totalDistance;
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateTime() {}
}

// Rename top level function to totalDistance. Note there's a variable named totalDistance in trackSummary. We can get rid of it and use Inline Variable

function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace,
  };
}

function totalDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i1], points[i]);
  }
  return result;

  function distance(p1, p2) {
    // haversine formula see http://www.movabletype.
    co.uk / scripts / latlong.html;
    const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) *
        Math.cos(radians(p1.lat)) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  }

  function radians(degrees) {
    return (degrees * Math.PI) / 180;
  }
}

// Since the functions for distance and radians don't depend on anything inside totalDistance, move them to the top level
function trackSummary(points) {}
function totalDistance(points) {}
function distance(p1, p2) {}
function radians(degrees) {}

// ------------------------------------

// Example: Moving between Classes

class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    } else return this.daysOverdrawn * 1.75;
  }
}

// Different accounts can have different algorithms for determining the charge, so move overdraftCharge to account type class

// Look at the overdraftCharge method to see what features it uses. The daysOverdrawn method will remain on the account class because it varies with individual accounts

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (daysOverdrawn - 7) * 0.85;
    } else return daysOverdrawn * 1.75;
  }
}

// Note: this.type.isPremium changes to a this.isPremium. I pass daysOverdrawn instead of the account for now but this could change

// Replace original method body with a delegating call
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

// Decide whether to leave delegation or inline overdraftCharge. Inlining results in:
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0)
      result += this.type.overdraftCharge(this.daysOverdrawn);
    return result;
  }
}

// Earlier, I passed daysOverdrawn as a parameter but if there's a lot of data from account to pass, so I might prefer to pass the account itself

class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() {
    return this.type.overdraftCharge(this);
  }
}

class AccountType {
  overdraftCharge(account) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (account.daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (account.daysOverdrawn - 7) * 0.85;
    } else return account.daysOverdrawn * 1.75;
  }
}
