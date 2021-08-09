class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany;
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }

  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

// TrackingInformation is used as part of Shipment class

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}

// I want to inline TrackingInformation class into shipment

// Start by looking at places that invoke methods of TrackingInformation

aShipment.trackingInformation.shippingCompany = request.vendor;

// Move all such functions to Shipment. Start by putting a delegating method into shipment and adjust client to call that

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }

  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
}

aShipment.shippingCompany = request.vendor;

// Do this for all the elements of tracking information that are used by clients. Once I've done that, I can move all the elements of tracking information over into the shipment class

// Apply Inline Function to display

class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }

  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
}

// move the shipping company field
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }

  get shippingCompany() {
    return this.shippingCompany;
  }

  set shippingCompany(arg) {
    this.shippingCompany = arg;
  }
}

// Continue until everything is moved over and delete the tracking information class
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }

  get shippingCompany() {
    return this._shippingCompany;
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
}
