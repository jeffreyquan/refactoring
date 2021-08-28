// When I'm refactoring  a class hierarchy, I'm often pulling and pushing features around
// As the hierarchy evolves, I sometimes find that a class and its parents are no longer different enough to be worth keeping separate. At this point, I'll merge them together

// Choose which one to remove. I choose based on which name makes sense in the future. If neither name is best, I'll pick one arbitrarily.

// Use Pull Up Field, Push Down Field, Pull Up Method and Push Down Method to move all the elements into a single class.

// Adjust any references to the victim to change them to the class that will stay.

// Remove the empty class.

// Test

class Employee {}

class Salesman extends Employee {}

// Merge to become:

class Employee {}
