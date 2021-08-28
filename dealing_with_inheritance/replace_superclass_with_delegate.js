// Apply inheritance when every method on the supertype applies to the subtype and every instance of the subtype is an instance of the supertype
// Replace Superclass with Delegate if the situation changes and inheritance is no longer the best option

// A library of ancient scrolls keeps details of their scrolls in a catalog. Each scroll has an ID number and records its title and list of tags.

class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

// Ancient scrolls need regular cleaning. The code for that uses the catalog item and extends it with the data it needs for cleaning

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// This is an example of a common modeling error. There is a difference between the physical scroll and the catalog item. The scroll describing the treatment for the greyscale disease may have several copies, but be just on item in the catalogue.

// Using catalog item as a superclass to scroll is likely to confuse programmers in the future, and is thus a poor model to work with.

// I begin by creating a property in Scroll that refers to the catalog initializing it with a new stance.

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// I create forwarding methods for each element of the superclass that I use on the subclass.

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._catalogItem.id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// Remove inheritance link to Catalogue

class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._catalogItem.id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// This finishes the basic Replace Supperclass with Delegate refactoring, but there is something more I need to do in this case.

// In this situation a better model is to link the greyscale catalog item to the six scrolls in the library that are copies of that writing. Doing this is essentially Change Value to Reference.

// The scroll uses the catalog item's ID field to store its ID. But if I treat the catalog item as a reference, it needs to use the ID of the catalog item ID rather than the scroll ID. This means I need to create an ID field on scroll and use that instead of one in catalog item

class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._id = id;
    this._catalogItem = new CatalogItem(null, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// Creating a catalog item with a null ID is just temporary

// Scrolls are loaded as part of a load routine

const scrolls = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      record.catalogData.title,
      record.catalogData.tags,
      LocalDate.parse(record.lastCleaned)
    )
);

// The first step in Change Value to Reference is finding or creating a repository. I find there's a repository that I can easily import into the load routine. The repository supplies catalog items indexed by an ID. The input data has the catalog ID I can use the constructor of the scroll

const scrolls = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      record.catalogData.title,
      record.catalogData.tags,
      LocalDate.parse(record.lastCleaned),
      record.catalogData.id,
      catalog
    )
);

class Scroll {
  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = new CatalogItem(null, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// I can now modify the constructor to use the catalog ID to look up the catalog item and use it instead of creating a new one

class Scroll {
  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// I no longer need the title and tags passed into the constructor, so I use Change Function Declaration to remove them

const scrolls = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      LocalDate.parse(record.lastCleaned),
      record.catalogData.id,
      catalog
    )
);

class Scroll {
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
