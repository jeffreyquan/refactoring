// Splitting a loop makes it easier to use. Sometimes we see loops that are doing two different things because they can do that with one pass through a loop.
// Many programmers are uncomfortable with this refactoring because it forces you to execute the loop more than once.
// Separate refactoring from optimization
// Once I have my code clear, I can optimize it
// Consider Extract Function on each loop
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;

// Copy the loop
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;

// Remove duplication that would give wrong results
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  totalSalary += p.salary;
}

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
}

return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;

// That's the end of Split Loop but I can look to Extract Function

// Use Slide Statements to reorganize the code

let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

let youngest = people[0] ? people[0].age : Infinity;
for (const p of people) {
  if (p.age < youngest) youngest = p.age;
}

return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;

// Extract Function
function totalSalary() {
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary;
  }
  return totalSalary;
}

function youngestAge() {
  let youngest = people[0] ? people[0].age : Infinity;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }
  return youngest;
}

return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

// Replace Loop with Pipeline for total salary and Substitute Algorithm with youngest age
function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}

function youngestAge() {
  return Math.min(...people.map((p) => p.age));
}

return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;
