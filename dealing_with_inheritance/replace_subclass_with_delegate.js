// Popular principle: "Favour object composition over class inheritance" where composition effectively the same as delegation. It might be better said as "Favour a judicious mixture of composition and inheritance over either alone"

class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }
}

// There are quite a few changes that the premium booking make to what it inherits from the superclass
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  // isn't present on the superclass
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

// Inheritance works well for this example.However, inheritance is a tool that can only be used once - so if I have another reason to use inheritance, and I think it will benefit me more than the premium booking subclass, I'll need to handle premium bookings in a different way. Also, I may need to change the default booking to the premium booking dynamically i.e. support a method like aBooking.bePremium()

// When these needs crop up, I need to Replace Subclass with Delegate

// booking client
aBooking = new Booking(show, date);

// premium client
aBooking = new PremiumBooking(show, date, extras);

// Removing subclasses will alter all of this, so I like to encapsulate the constructor calls with Replace Constructor with Factory Function

function createBooking(show, date) {
  return new Booking(show, date);
}

function createPremiumBooking(show, date, extras) {
  return new PremiumBooking(show, date, extras);
}

// booking client
aBooking = createBooking(show, date);

// premium client
aBooking = createPremiumBooking(show, date, extras);

// I now make the new delegate class
// It's constructor parameters are those parameters that are only used in the subclass, together with a back-reference to the booking object. I'll need this because several subclass methods require access to data stored in the superclass.

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
}

// I now connect the new delegate to the booking object. I do this by modifying the factory function to premium bookings.
function createPremiumBooking(show, date, extras) {
  const result = new PremiumBooking(show, date, extras);
  result._bePremium(extras);
  return result;
}

class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }

  // _ indicates it shouldn't be part of the public interface for Booking
  // it can be a public method if a booking is allowed to mutate to premium

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

// Time to start moving behaviour. The first I consider is the override of hasTalkback

// I use Move Function to move the subclass method to the delegate. To make it fit its home, I route any access to superclass data with a call to _host

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkback() {
    return this._premiumDelegate.hasTalkback;
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

// Test to ensure everything is working, then delete the subclass method

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

// I run tests at this point, expecting some to fail.

// I finish the move by adding dispatch logic to the superclass method to use the delegate if it is present

class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

// The nest case I'll look at is the base price
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

// The call to super in the subclass makes things a little tricky. If I move the subclass code to the delegate, I'll need to call the parent case but I can't just call this._host._basePrice without getting an endless recursion.

// I have two options:
// One is to apply Extract Function on the base calculation to allow me to separate the dispatch logic from price calculation (the rest of the move is as before)
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    return this._premiumDelegate
      ? this._premiumDelegate.basePrice
      : this._privateBasePrice;
  }

  get _privateBasePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }

  get basePrice() {
    return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
  }
}

// Alternatively, I can recast the delegate's method as an extension of the base method
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return this._premiumDelegate
      ? this._premiumDelegate.extendBasePrice(result)
      : result;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }

  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee);
  }
}

// Both work reasonably here. I have a slight preference for the latter as it's a bit smaller.

// The last case is a method that only exists on the subclass.
class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }
}

// I move it to the delegate
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }

  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay;
  }
}

// I add a dispatch logic to Booking
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return this._premiumDelegate
      ? this._premiumDelegate.extendBasePrice(result)
      : result;
  }

  // my instinct would be to raise an error but I return undefined
  get hasDinner() {
    return this._premiumDelegate ? this._premiumDelegate.hasDinner : undefined;
  }

  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

// Call is now to Booking and I can remove the PremiumBooking class

function createPremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras);
  result._bePremium(extras);
  return result;
}

// Example: Replacing a Hierarchy
// Previous example showed using Replace Subclass with Delegate on a single subclass but I can do the same thing with an entire hierarchy

function createBird(data) {
  switch (data.type) {
    case "EuropeanSwallow":
      return new EuropeanSwallow(data);
    case "AfricanSwallow":
      return new AfricanSwallow(data);
    case "NorweigianBlueParrot":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._plumage || "beautiful";
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

// The system will shortly be making a big difference between birds tagged in the wild and those tagged in captivity
// That difference could be modeled as two subclasses for Bird: WildBird and CaptiveBird
// I only use inheritance once, so if I want to use subclasses for wild versus captive, I'll have to remove them for the species

// When several subclasses are involved, I'll tackle them one at a time, starting with a simple one. In this case, EuropeanSwallow
// I create an empty delegate class for the delegate

class EuropeanSwallowDelegate {}

// I don't put in any data or back-reference parameters yet

// I need to decide where to handle the initialisation of the delegate field. Here, since I have all the information in the single data argument to the constructor, I decide to do it in the constructor. Since there are several delegates I could add, I make a function to select the correct one based on the type code in the document

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      default:
        return null;
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return null;
  }
}

// Now I have the structure set up, I can apply Move Function to the European swallow's air speed velocity

class EuropeanSwallowDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

// I change airSpeedVelocity on the superclass to call a delegate, if present

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      default:
        return null;
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return this._speciesDelegate
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }
}

// I remove the EuropeanSwallow subclass

function createBird(data) {
  switch (data.type) {
    case "AfricanSwallow":
      return new AfricanSwallow(data);
    case "NorweigianBlueParrot":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

// Now I'll tackle the African swallow

class AfricanSwallowDelegate {
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      default:
        return null;
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return this._speciesDelegate
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }
}

// I use Move Function on airSpeedVelocity

class AfricanSwallowDelegate {
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

// I can remove the African swallow subclass

function createBird(data) {
  switch (data.type) {
    case "NorweigianBlueParrot":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

// Now for the Norwegian blue. Creating the class and moving the air speed velocity uses the same steps as before, so I'll just show the result.

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrot(data);
      default:
        return null;
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return this._speciesDelegate
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }
}

class NorwegianBlueParrotDelegate {
  constructor(data) {
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._plumage || "beautiful";
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

// Norwegian blue overrides the plumage property, which I didn't have to deal with the other cases
// The initial Move Function is simple enough, albeit with the need to modify the constructor to put in a back-reference to the bird

class NorwegianBlueParrotDelegate {
  constructor(data, bird) {
    this._bird = bird;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return null;
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._plumage || "average";
  }

  get airSpeedVelocity() {
    return this._speciesDelegate
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }
}

// The tricky step is how to remove the subclass method for plumage

// If I do the following, I'll get a bunch of errors because there is no plumage property on the other species' delegate classes

class Bird {
  get plumage() {
    return this._speciesDelegate
      ? this._speciesDelegate.plumage
      : this._plumage || "average";
  }
}

// I could use a more precise conditional

class Bird {
  get plumage() {
    return this._speciesDelegate instanceof NorwegianBlueParrotDelegate
      ? this._speciesDelegate.plumage
      : this._plumage || "average";
  }
}

// But it's almost never a good idea to use an explicit class check like this

// Another option is to implement the default case on the other delegates

class Bird {
  get plumage() {
    return this._speciesDelegate
      ? this._speciesDelegate.plumage
      : this._plumage || "average";
  }
}

class AfricanSwallowDelegate {
  constructor(data, bird) {
    this._bird = bird;
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }

  get plumage() {
    return this._bird._plumage || "average";
  }
}

class EuropeanSwallowDelegate {
  constructor(bird) {
    this._bird = bird;
  }

  get airSpeedVelocity() {
    return 35;
  }

  get plumage() {
    return this._bird._plumage || "average";
  }
}

// But this duplicates the default method for plumage. I also get some bonus duplication in the constructors to assign the back-reference

// The solution to the duplication is naturally inheritance. I apply Extract Superclass to the species delegates

class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }

  get plumage() {
    return this._bird._plumage || "average";
  }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class EuropeanSwallowDelegate extends SpeciesDelegate {
  constructor(bird) {
    super(data, bird);
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
}

// Now I have a superclass, I can move any default behaviour from Bird to SpeciesDelegate by ensuring there's always something in the speciesDelegate field

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate();
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }

  get plumage() {
    return this._bird._plumage || "average";
  }

  get airSpeedVelocity() {
    return null;
  }
}

// I like this as it simplifies the delegating methods on Bird. I can easily see which behaviour is delegated to the species delegate and which stays behind.

// Final state of those classes

function createBird(data) {
  return new Bird(data);
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "EuropeanSwallow":
        return new EuropeanSwallowDelegate(data, this);
      case "AfricanSwallow":
        return new AfricanSwallowDelegate(data, this);
      case "NorweigianBlueParrot":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
  // rest of bird's code...
}

class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }

  get plumage() {
    return this._bird._plumage || "average";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }

  get plumage() {
    if (this._voltage > 100) return "scorched";
    else return this._bird._plumage || "beautiful";
  }
}

// The species inheritance is now more tightly scoped, covering just the data and functions that vary due to the species. Any code that's the same for all species remains on Bird and it's future subclasses.

// I could apply the same idea of creating a superclass delegate to the booking example earlier.
