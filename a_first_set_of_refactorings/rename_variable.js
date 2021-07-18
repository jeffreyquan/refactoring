// Example 1
let tpHd = "untitled";

result += `<h1>${tpHd}</h1>`;

tpHd = obj["articleTitle"];

// 1. Encapsulate variable
result += `<h1>${title()}</h1>`;

setTitle(obj["articleTitle"]);

function title() {
  return tpHd;
}

function setTitle(arg) {
  tpHd = arg;
}

// 2. Rename variable
let _title = "untitled";

function title() {
  return _title;
}

function setTitle(arg) {
  _title = arg;
}

// Example 2 - Renaming a Constant (read-only variables)
const cpyNm = "Acme Gooseberries";

// 1. Make a copy
const companyName = "Acme Gooseberries";
const cpyNm = companyName;

// 2. Change references from old name to new name and then remove the copy
