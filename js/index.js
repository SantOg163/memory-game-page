/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const levels = Array.from(document.getElementsByClassName("level"));
levels.forEach((level) => {
  level.addEventListener("click", () => {
    addCard(getCount(level.getAttribute("data")));
  });
});
const menu = document.getElementById("menu");
const content = document.getElementById("content");
let time;
let active = [];
const info = document.getElementById("info");
function addCard(count) {
  switch (count) {
    case 6:
      time = 4;
      break;
    case 9:
      time = 3;
      break;
    case 12:
      time = 2;
      break;
  }
  while (active.length < 3) {
    let random = randomCard(count);
    if (!active.includes(random)) {
      active.push(random);
    }
  }
  menu.style.display = "none";
  info.style.display = "none";
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    if (active.includes(i)) {
      card.classList.add("active");
    } else {
      card.classList.add("non-active");
    }
    card.setAttribute("data-index", `${i}`);
    content.appendChild(card);
  }
  const cards = document.querySelectorAll(".card");
  setTimeout(() => {
    cards.forEach((card) => {
      card.style.backgroundColor = "blueviolet";
      card.addEventListener("click", () => {
        if (card.classList.contains("active")) {
          card.style.backgroundColor = "white";
          card.classList.remove("active");
          active.splice(active.indexOf(card.getAttribute("data-index")), 1);
          if (active.length === 0) {
            end("You Win!");
          }
        } else {
          end("You Lose!");
        }
      });
    });
  }, time * 1000);
}
function end(text) {
  info.innerText = text;
  info.style.display = "flex";
  menu.style.display = "flex";
  content.innerHTML = "";
}
function getCount(data) {
  if (data === "data-easy-level") return 6;
  if (data === "data-medium-level") return 9;
  if (data === "data-hard-level") return 12;
}
function randomCard(count) {
  return Math.floor(Math.random() * count);
}
