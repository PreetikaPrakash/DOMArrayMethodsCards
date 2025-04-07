const adduser = document.getElementById("add-user");
const doublemoney = document.getElementById("double-money");
const millionaires = document.getElementById("millionaires");
const richest = document.getElementById("richest");
const calculatewealth = document.getElementById("calculate-wealth");
const user = document.querySelector(".user");

// Event Listner
adduser.addEventListener("click", funcAdduser);
doublemoney.addEventListener("click", funcDoublemoney);
millionaires.addEventListener("click", funcMillionaries);
richest.addEventListener("click", funcRichest);
calculatewealth.addEventListener("click", funcCalculateWealth);

// functions
// Fetch random users data from the API below
async function getRandomuser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const myuser = data.results[0];
  const newUser = {
    name: `${myuser.name.first}` + ` ${myuser.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  return newUser; // returns a promise
}

async function funcAdduser() {
  const resto = await getRandomuser();
  const element = document.createElement("div");
  element.classList.add("inputs");
  element.innerHTML = `<strong>${resto.name}</strong> ${formatMoney(
    resto.money
  )}`;
  user.appendChild(element);
  addData(resto);
}
// format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
// Add new user to arrdata array
let data = [];
function addData(obj) {
  data.push(obj);
}
// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  user.innerHTML = "";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("inputs");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    user.appendChild(element);
  });
}

function funcDoublemoney() {
  // using map - built in array method
  data = data.map((n) => {
    return { ...n, money: n.money * 2 };
  });
  updateDOM();
}

function funcMillionaries() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
function funcRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function funcCalculateWealth() {
  const total = data.reduce((acc, num) => acc + num.money, 0);
  const totalelement = document.createElement("div");
  totalelement.classList.add("inputs-two");
  totalelement.innerHTML = `<strong>Total Wealth :</strong> ${formatMoney(
    total
  )}`;
  user.appendChild(totalelement);
}
