// Situation where I have several functions that have a switch statement on a type code. I can create classes for each case and use polymorphism to bring out the type-specific behaviour.
function plumages(birds) {
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return "average";
    case "AfricanSwallow":
      return bird.numberOfCoconuts > 2 ? "tired" : "average";
    case "NorwegianBlueParrot":
      return bird.voltage > 100 ? "scorched" : "beautiful";
    default:
      return "unknown";
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return 35;
    case "AfricanSwallow":
      return 40 - 2 * bird.numberOfCoconuts;
    case "NorwegianBlueParrot":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

// We have a couple of different operations that vary with the type of bird, so it makes sense to create classes and use polymorphism for any type-specific behaviour

// Being with Combine Functions into Class on airSpeedVelocity and plumage

function plumage(bird) {
  return new Bird(bird).plumage;
}

function speed(bird) {
  return new Bird(bird).airSpeedVelocity;
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      case "EuropeanSwallow":
        return "average";
      case "AfricanSwallow":
        return this.numberOfCoconuts > 2 ? "tired" : "average";
      case "NorwegianBlueParrot":
        return this.voltage > 100 ? "scorched" : "beautiful";
      default:
        return "unknown";
    }
  }

  get airSpeedVelocity() {
    switch (this.type) {
      case "EuropeanSwallow":
        return 35;
      case "AfricanSwallow":
        return 40 - 2 * this.numberOfCoconuts;
      case "NorwegianBlueParrot":
        return this.isNailed ? 0 : 10 + this.voltage / 10;
      default:
        return null;
    }
  }
}

// I now add subclasses for each kind of bird, together with a factory function to instantiate the appropriate subclass
function plumage(bird) {
  return createBird(bird).plumage;
}

function speed(bird) {
  return createBird(bird).airSpeedVelocity;
}

function createBird(bird) {
  switch (bird.type) {
    case "EuropeanSwallow":
      return new EuropeanSwallow(bird);
    case "AfricanSwallow":
      return new AfricanSwallow(bird);
    case "NorwegianBlueParrot":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      case "EuropeanSwallow":
        return "average";
      case "AfricanSwallow":
        return this.numberOfCoconuts > 2 ? "tired" : "average";
      case "NorwegianBlueParrot":
        return this.voltage > 100 ? "scorched" : "beautiful";
      default:
        return "unknown";
    }
  }

  get airSpeedVelocity() {
    switch (this.type) {
      case "EuropeanSwallow":
        return 35;
      case "AfricanSwallow":
        return 40 - 2 * this.numberOfCoconuts;
      case "NorwegianBlueParrot":
        return this.isNailed ? 0 : 10 + this.voltage / 10;
      default:
        return null;
    }
  }
}

class EuropeanSwallow extends Bird {}

class AfricanSwallow extends Bird {}

class NorwegianBlueParrot extends Bird {}

// Now I have the class structure that I need, I begin on the two conditional methods starting with plumage. I take one leg of the switch statement at a time and override it with the appropriate subclass

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return "unknown";
  }

  get airSpeedVelocity() {
    switch (this.type) {
      case "EuropeanSwallow":
        return 35;
      case "AfricanSwallow":
        return 40 - 2 * this.numberOfCoconuts;
      case "NorwegianBlueParrot":
        return this.isNailed ? 0 : 10 + this.voltage / 10;
      default:
        return null;
    }
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "average";
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "tired" : "average";
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this.voltage > 100 ? "scorched" : "beautiful";
  }
}

// Repeat same process for airSpeedVelocity

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return "unknown";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "average";
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "tired" : "average";
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this.voltage > 100 ? "scorched" : "beautiful";
  }

  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

// I also inline the top-level function
function plumages(birds) {
  return new Map(
    birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage])
  );
}

function speeds(birds) {
  return new Map(
    birds
      .map((b) => createBird(b))
      .map((bird) => [bird.name, bird.airSpeedVelocity])
  );
}

// The superclass Bird isn't strictly needed. As long as my objects implement the appropriately named methods, everything works fine. Leaving the superclass explains the way the classes are related to the domain

// Example: Using Polymorphism for Variation
// Rating agency computing an investment rating for the voyages of sailing ships
function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return "A";
  else return "B";
}

function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["china", "eastindies"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === "china" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

function hasChina(history) {
  return history.some((v) => "china" === v.zone);
}

function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === "china") result += 1;
  if (voyage.zone === "eastindies") result += 1;
  if (voyage.zone === "china" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}

// Calling code
const voyage = { zone: "westindies", length: 10 };
const history = [
  { zone: "eastindies", profit: 5 },
  { zone: "westindies", profit: 15 },
  { zone: "china", profit: 2 },
  { zone: "westafrica", profit: 7 },
];
const myRating = rating(voyage, history);

// A couple of places use conditional logic to handle the case of voyage to China where the captain has been to China before

// I use inheritance and polymorphism to separate out the logic to handling these cases from the base logic. This is useful if I'm about to introduce more special logic for this case. Logic for these repeat China voyages can make it harder to understand the base case

// Combine Functions into Class

function rating(voyage, history) {
  return new Rating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["china", "eastindies"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "eastindies") result += 1;
    if (this.voyage.zone === "china" && this.hasChinaHistory) {
      result += 3;
      if (this.history.length > 10) result += 1;
      if (this.voyage.length > 12) result += 1;
      if (this.voyage.length > 18) result -= 1;
    } else {
      if (this.history.length > 8) result += 1;
      if (this.voyage.length > 14) result -= 1;
    }
    return result;
  }

  get hasChinaHistory() {
    return this.history.some((v) => "china" === v.zone);
  }
}

// This gives me a class for the base case. I now need an empty subclass for the variant behaviour

class ExperiencedChinaRating extends Rating {}

// Create a factory function to return the variant when needed
function createRating(voyage, history) {
  if (voyage.zone === "china" && history.some((v) => "china" === v.zone)) {
    return new ExperiencedChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}

// Modify callers to use the factory function instead of directly invoking the constructor
function rating(voyage, history) {
  return createRating(voyage, history).value;
}

// Two bits of behaviour I need to move into the subclass beginning with captainHistoryRisk
class ExperiencedChinaRating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
}

class Rating {
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }
}

// Now onto voyageProfitFactor. Use Extract Function on entire conditional block
class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["china", "eastindies"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "eastindies") result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.voyage.zone === "china" && this.hasChinaHistory) {
      result += 3;
      if (this.history.length > 10) result += 1;
      if (this.voyage.length > 12) result += 1;
      if (this.voyage.length > 18) result -= 1;
    } else {
      if (this.history.length > 8) result += 1;
      if (this.voyage.length > 14) result -= 1;
    }
    return result;
  }

  get hasChinaHistory() {
    return this.history.some((v) => "china" === v.zone);
  }
}

// A function with an "And" in it is a pretty bad smell

class Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }
}

class ExperiencedChinaRating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}

// This is formally the end of the refactoring - I've separated the variant behaviour out into the subclass.

// The "And" in the new method suggests there's two separate modifications going on here - so it may be wise to separate them

// I can use Extract Function again
class Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += this.historyLengthFactor;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}

class ExperiencedChinaRating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    result += this.historyLengthFactor;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }
}

// Use Move Statements to Callers
class Rating {
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "eastindies") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    return this.voyage.length > 14 ? 1 : 0;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}

class ExperiencedChinaRating {
  get voyageLengthFactor() {
    let result = 0;
    result += 3;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }
}

// Adding 3 points does not make sense as part of voyage length factor, so I add it to overall result

class ExperiencedChinaRating {
  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }
}

// Final Result - a basic rating class which ignores any complications of the experienced China case
class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["china", "eastindies"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "china") result += 1;
    if (this.voyage.zone === "eastindies") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get voyageLengthFactor() {
    return this.voyage.length > 14 ? 1 : 0;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}

class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result = 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }

  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }
}
