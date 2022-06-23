const result = document.querySelector("#result");
const bmiStatus = document.querySelector("#status");
const bmiDiff = document.querySelector("#diff");
const form = document.querySelector("#rechner");
const resBmi = document.querySelector("#res");
const backBtn = document.querySelector("#backBTN");
const displayDefault = document.querySelector("#defaultTable");
const defaultTable = document.querySelectorAll("#defaultTable .bmi-range");
const displayFemale = document.querySelector("#femaleTable");
const femaleTable = document.querySelectorAll("#femaleTable .bmi-range");
const displayMale = document.querySelector("#maleTable");
const maleTable = document.querySelectorAll("#maleTable .bmi-range");
const button = document.querySelector("#submit");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
let gender = "";
let age = 0;
let compare;

function getBMI() {
  const resultBMI =
    parseInt(weight.value) / Math.pow(parseInt(height.value) / 100, 2);
  return resultBMI;
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

function change() {
  const getPreviousBmi = localStorage.getItem("previous");
  try {
    if (isNaN(compare)) {
      bmiDiff = "";
    } else {
      bmiDiff.style.transform = "scaleX(1)";
      bmiDiff.style.transition = "transform 0.75s ease-in-out";

      if (getPreviousBmi != null && !isNaN(getPreviousBmi)) {
        const diff = compare - getPreviousBmi;

        if (diff > 0) {
          bmiDiff.textContent = `Ihr Körperfettindex ist um ${diff.toFixed(
            2
          )} gestiegen.`;
        } else if (diff < 0) {
          bmiDiff.textContent = `Ihr Körperfettindex ist um ${Math.abs(
            diff.toFixed(2)
          )} gesunken.`;
        } else {
          bmiDiff.textContent = "Ihr Körperfettindex ist gleich geblieben.";
        }
      } else {
        bmiDiff.textContent = "Sie haben keine vorherigen Anfragen!";
      }
    }
  } catch {
    console.error(`Etwas ist schief gegangen :(`);
  }
}

function showScore(event) {
  event.preventDefault();

  const ageValue = document.querySelector("#age").value;
  const male = document.querySelector("#m");
  const female = document.querySelector("#f");

  compare = getBMI();
  resBmi.style.transform = "scale(1)";
  resBmi.style.transition = "transform 0.75s ease-in-out";

  result.textContent = getBMI().toFixed(2);

  if (!isNaN(compare)) {
    form.style.display = "none";
    backBtn.style.transform = "scale(1)";
  } else {
    result.textContent = "";
    bmiStatus.textContent = "Bitte tragen Sie Ihren Gewicht und Größe ein!";
  }

  change();
  if (!isNaN(compare)) {
    localStorage.setItem("previous", compare);
  }

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
      if (displayDefault.style.transform == "scaleX(1)") {
        displayDefault.style.transform = "scaleX(0)";
      }
      displayMale.style.transform = "scaleX(1)";
      displayMale.style.transition = "transform 0.75s ease-in-out";
      checkWeight(maleTable);
      break;
    case "female":
      if (displayDefault.style.transform == "scaleX(1)") {
        displayDefault.style.transform = "scaleX(0)";
      }
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
  bmiDiff.textContent = "";
  const range = document.querySelectorAll(".age-range");
  for (ele of range) {
    ele.parentNode.style.backgroundColor = "transparent";
  }
}

backBtn.addEventListener("click", reset);
