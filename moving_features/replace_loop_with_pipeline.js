// Language environments provide better constructs than using loops to iterate over a collection of objects i.e. the collection pipeline.
// map, filter

// office, country, telephone
// Chicago, USA, +1 312 373 1000
// Beijing, China, +86 4008 900 505
// Bangalore, India, +91 80 4064 9570
// Porto Alegre, Brazil, +55 51 3079 3550
// Chennai, India, +91 44 660 44766

function acquireData(input) {
  const lines = input.split("\n");
  let firstLine = true;
  const result = [];

  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }

    if (line.trim() === "") continue;

    const record = line.split(",");

    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}

// Create a separate variable for the loop to work over

function acquireData(input) {
  const lines = input.split("\n");
  let firstLine = true;
  const result = [];

  const loopItems = lines;

  for (const line of loopItems) {
    if (firstLine) {
      firstLine = false;
      continue;
    }

    if (line.trim() === "") continue;

    const record = line.split(",");

    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}

// First part of loop is all about skipping the first line of the CSV. This calls for using slice to remove that first section

function acquireData(input) {
  const lines = input.split("\n");
  const result = [];

  const loopItems = lines.slice(1);

  for (const line of loopItems) {
    if (line.trim() === "") continue;

    const record = line.split(",");

    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}

// Remove blank lines. Replace with a filter operation.

function acquireData(input) {
  const lines = input.split("\n");
  const result = [];

  const loopItems = lines.slice(1).filter((line) => line.trim() !== "");

  for (const line of loopItems) {
    const record = line.split(",");

    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}

// Use the map operation to turn lines into array of strings

function acquireData(input) {
  const lines = input.split("\n");
  const result = [];

  const loopItems = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","));

  for (const line of loopItems) {
    const record = line;

    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}

// Use filter again to get the India record

function acquireData(input) {
  const lines = input.split("\n");
  const result = [];

  const loopItems = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","))
    .filter((record) => record[1].trim() === "India");

  for (const line of loopItems) {
    const record = line;
    result.push({ city: record[0].trim(), phone: record[2].trim() });
  }

  return result;
}

// Use map to output the record

function acquireData(input) {
  const lines = input.split("\n");
  const result = [];

  const loopItems = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","))
    .filter((record) => record[1].trim() === "India")
    .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

  for (const line of loopItems) {
    const record = line;
    result.push(record);
  }

  return result;
}

// All the loop does is assign values to the accumulator so remove it and assign the result of the pipeline to the accumulator

function acquireData(input) {
  const lines = input.split("\n");
  const result = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","))
    .filter((record) => record[1].trim() === "India")
    .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

  return result;
}

// That's the core of the refactoring

// But I can also inline the result and rename some lambda variables

function acquireData(input) {
  const lines = input.split("\n");
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","))
    .filter((fields) => fields[1].trim() === "India")
    .map((fields) => ({ city: fields[0].trim(), phone: fields[2].trim() }));
}

// We could inline lines too but leaving it there explains what is happening
