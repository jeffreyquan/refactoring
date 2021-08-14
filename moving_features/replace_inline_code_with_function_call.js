let appliesToMass = false;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}

// Replace with

const appliesToMass = states.includes("MA");

// If I see inline code that's doing the same thing that I have in an existing function, I'll usually want to replace that inline code with a function call
// e.g. calls to library functions
