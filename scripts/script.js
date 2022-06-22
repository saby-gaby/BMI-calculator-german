const result = document.querySelector("#result");
const bmiStatus = document.querySelector("#status");
const form = document.querySelector("#rechner");
const resBmi = document.querySelector("#res");
const backBtn = document.querySelector("#backBTN");
const displayDefault = document.querySelector("#defaultTable");
const defaultTable = document.querySelectorAll("#defaultTable .bmi-range");
const displayFemale = document.querySelector("#femaleTable");
const femaleTable = document.querySelectorAll("#femaleTable .bmi-range");
const displayMale = document.querySelector("#maleTable");
const maleTable = document.querySelectorAll("#maleTable .bmi-range");
const button = document.querySelector("button");

function showScore(event) {
  event.preventDefault()

  form.style.display = "none";
  resBmi.style.transform = "scale(1)";
  resBmi.style.transition = "transform 0.75s ease-in-out";
  backBtn.style.transform = "scale(1)";
  
const weight = document.querySelector("#weight").value;
const height = document.querySelector("#height").value;
const ageValue = document.querySelector("#age").value;
const male = document.querySelector("#m");
const female = document.querySelector("#f");

let gender = "";
let age = 0;

function getBMI() {
  const resultBMI = parseInt(weight) / Math.pow(parseInt(height) / 100, 2);
  return resultBMI;
}
const compare = getBMI();

result.textContent = getBMI().toFixed(2);


  if (ageValue != "") {
    age += parseInt(ageValue);
  } else {
    age;
  }

  if (male.checked) {
    gender = "male";
  } else if (female.checked) {
    gender = "female";
  }

  switch (gender) {
    case "male":
      displayMale.style.transform = "scaleX(1)";
      displayMale.style.transition = "transform 0.75s ease-in-out";
      checkWeight(maleTable);
      break;
    case "female":
      displayFemale.style.transform = "scaleX(1)";
      displayFemale.style.transition = "transform 0.75s ease-in-out";
      checkWeight(femaleTable);
      break;
    default:
      displayDefault.style.transform = "scaleX(1)";
      displayDefault.style.transition = "transform 0.75s ease-in-out";
      checkWeight(defaultTable);
      break;
  }

  const range = document.querySelectorAll(".age-range");
  for (ele of range) {
    const ageRange = ele.textContent.split("-");
    if (
      (ageRange.length > 1 && age >= ageRange[0] && age <= ageRange[1]) ||
      (ageRange.length == 1 && age >= ageRange[0].substring(2))
    ) {
      ele.parentNode.style.backgroundColor = "skyblue";
    }
  }

  function checkWeight(arr) {
    for (ele of arr) {
      const bmiRange = ele.textContent.split("-");
      if (age != "") {
        if (compare > bmiRange[0] && compare <= bmiRange[1]) {
          bmiStatus.textContent = "Normalgewicht";
        } else if (compare < parseFloat(bmiRange[0])) {
          bmiStatus.textContent = "Untergewicht";
        } else if (
          compare > parseFloat(bmiRange[1]) &&
          compare <= parseFloat(bmiRange[1]) + 5
        ) {
          bmiStatus.textContent = "Übergewicht";
        } else if (
          compare > parseFloat(bmiRange[1]) + 5 &&
          compare <= parseFloat(bmiRange[1]) + 10
        ) {
          bmiStatus.textContent = "Starkes Übergewicht";
        } else if (compare > parseFloat(bmiRange[1]) + 10) {
          bmiStatus.textContent = "Adipositas";
        }
      } else {
        if (compare < 18.5) {
          bmiStatus.textContent = "Untergewicht";
        } else if (compare >= 18.5 && compare < 25) {
          bmiStatus.textContent = "Normalgewicht";
        } else if (compare >= 25 && compare < 30) {
          bmiStatus.textContent = "Übergewicht";
        } else if (compare >= 30 && compare < 35) {
          bmiStatus.textContent = "Übergewicht";
        } else if (compare > 35) {
          bmiStatus.textContent = "Adipositas";
        }
      }
    }
  }
}

button.addEventListener("click", showScore);

function reset() {
  form.style.display = "flex";
  resBmi.style.transform = "scale(0)";
  resBmi.style.transition = "transform 0s";
  displayMale.style.transform = "scaleX(0)";
  displayFemale.style.transform = "scaleX(0)";
  displayDefault.style.transform = "scaleX(0)";
  displayMale.style.transition = "transform 0s";
  displayFemale.style.transition = "transform 0s";
  displayDefault.style.transition = "transform 0s";
  const range = document.querySelectorAll(".age-range");
  for (ele of range) {
    ele.parentNode.style.backgroundColor = "transparent";
  }
}

backBtn.addEventListener("click", reset)