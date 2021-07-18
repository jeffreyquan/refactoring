function circum(radius) {
  // call new function declaration as I am migrating callers from using circum to circumference
  return circumference(radius);
}

// change declaration to something more sensible
function circumference(radius) {
  return 2 * Math.PI * radius;
}
