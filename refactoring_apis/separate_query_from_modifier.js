// A good rule to follow is that any function that returns a value should not have observable side effects
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }

  return "";
}

// Copy the function naming it after the query aspect of the function
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }

  return "";
}

// Remove side effects from this new query
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      return "Don";
    }
    if (p === "John") {
      return "John";
    }
  }

  return "";
}

// Go to each caller and replace it with a call to the query, followed bby a call to the modifier

const found = alertForMiscreant(people);

// becomes

const found = findMiscreant(people);
alertForMiscreant(people);

// Remove the return values from the modifier
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return;
    }
    if (p === "John") {
      setOffAlarms();
      return;
    }
  }

  return;
}

// Now I have a lot of duplication between original modifier and the new query, so I can use Substitute Algorithm so that the modifier uses the query
function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}
