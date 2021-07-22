class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this._courses;
  }

  set courses(aList) {
    this._courses = aList;
  }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }

  get name() {
    return this._name;
  }

  get isAdvanced() {
    return this._isAdvanced;
  }
}

numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;

// not properly encapsulated as client can update the sources through the setter or directly

const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

for (const name of readBasicCourseNames(filename)) {
  aPerson.courses.push(new Course(name, false));
}

// 1. Add methods to person class that allow a client to add and remove individual courses
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this._courses;
  }

  set courses(aList) {
    this._courses = aList;
  }

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }

  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === 1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}

// 2. Change code that calls modifiers directly to use new methods

for (const name of readBasicCourseNames(filename)) {
  aPerson.addCourse(new Course(name, false));
}

// 3. For setters, if needed, put a copy of the collection in fhe field. For getters, return a copy

class Person {
  // some code above

  set courses(aList) {
    this._courses = aList.slice();
  }

  get courses() {
    return this._courses.slice();
  }
}
