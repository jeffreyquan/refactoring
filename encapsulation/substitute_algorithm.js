function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }

    if (people[i] === "John") {
      return "John";
    }

    if (people[i] === "Kent") {
      return "Kent";
    }
  }

  return "";
}

// If I can find a clearer way to do something, replace the complicated way with the clearer way
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p) || "");
}

// Sometimes, when I want to change the algorithm to work slightly differently, it’s easier to start by replacing it with something that would make my change more straightforward to make.

// Decompose the method as much as you can. Replacing a large, complex algorithm is very difficult; only by making it simple can I make the substitution tractable.
