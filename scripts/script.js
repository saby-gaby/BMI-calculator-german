const result = document.querySelector("#result");
const bmiStatus = document.querySelector("#status");
const firstChild = document.querySelector("#firstChild");
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
let currentBmi;

function getBMI() {
  const resultBMI =
    parseFloat(weight.value) / Math.pow(parseInt(height.value) / 100, 2);
  return resultBMI;
}

function change() {
  const previousBmi = localStorage.getItem("previous");
  const getPreviousHeight = localStorage.getItem("height");

  try {
    if (!currentBmi) {
      bmiDiff = "";
    } else {
      bmiDiff.style.transform = "scaleX(1)";
      bmiDiff.style.transition = "transform 0.75s ease-in-out";

      if (previousBmi && getPreviousHeight == height.value) {
        const diff = currentBmi.toFixed(2) - previousBmi;

        if (diff != 0) {
          bmiDiff.textContent = `Ihr Körperfettindex ist um ${Math.abs(
            diff.toFixed(2)
          )} ${diff > 0 ? "gestiegen" : "gesunken"}.`;
        } else {
          bmiDiff.textContent = "Ihr Körperfettindex ist gleich geblieben.";
        }
      } else {
        bmiDiff.textContent = "Sie haben keine vorherigen Anfragen!";
      }
    }
  } catch {
    console.error(`Etwas ist schief gelaufen :(`);
  }
}

function showScore(event) {
  event.preventDefault();

  const ageValue = document.querySelector("#age").value;
  const male = document.querySelector("#m");
  const female = document.querySelector("#f");

  currentBmi = getBMI();
  resBmi.style.transform = "scale(1)";
  resBmi.style.transition = "transform 0.75s ease-in-out";

  result.textContent = getBMI().toFixed(2);

  change();

  if (currentBmi) {
    form.style.display = "none";
    backBtn.style.transform = "scale(1)";
    firstChild.textContent = "Dein BMI ist:";
    localStorage.setItem("previous", currentBmi.toFixed(2));
    localStorage.setItem("height", height.value);
    bmiStatus.textContent = "";
  } else {
    result.textContent = "";
    bmiStatus.textContent = "Bitte tragen Sie Ihren Gewicht und Größe ein!";
    firstChild.textContent = "";
    localStorage.clear();
  }

  let age = 0;
  ageValue ? (age += parseInt(ageValue)) : age;

  let gender = "";
  if (male.checked) {
    gender = "male";
  } else if (female.checked) {
    gender = "female";
  }

  if (gender && gender != localStorage.getItem("gender")) {
    bmiDiff.textContent = "Sie haben keine vorherigen Anfragen!";
    localStorage.setItem("gender", gender);
  } else if (gender && !localStorage.getItem("gender")) {
    localStorage.setItem("gender", gender);
  } else if (!gender) {
    localStorage.removeItem("gender");
    bmiDiff.textContent = "Sie haben keine vorherigen Anfragen!";
  }

  let currentTable;
  switch (gender) {
    case "male":
      displayDefault.style.transform = "scaleX(0)";
      displayMale.style.transform = "scaleX(1)";
      displayMale.style.transition = "transform 0.75s ease-in-out";
      currentTable = displayMale;
      break;
    case "female":
      displayDefault.style.transform = "scaleX(0)";
      displayFemale.style.transform = "scaleX(1)";
      displayFemale.style.transition = "transform 0.75s ease-in-out";
      currentTable = displayFemale;
      break;
    default:
      displayDefault.style.transform = "scaleX(1)";
      displayDefault.style.transition = "transform 0.75s ease-in-out";
      currentTable = displayDefault;
      break;
  }

  const range = currentTable.querySelectorAll(".age-range");
  for (ele of range) {
    const ageRange = ele.textContent.split("-");

    if (
      (ageRange.length > 1 && age >= ageRange[0] && age < ageRange[1]) ||
      (ageRange.length == 1 && age >= ageRange[0].substring(2))
    ) {
      ele.parentNode.style.backgroundColor = "skyblue";
      const eleParent = ele.parentNode
        .querySelector(".bmi-range")
        .textContent.split("-");
      if (
        currentBmi > parseFloat(eleParent[0]) &&
        currentBmi < parseFloat(eleParent[1])
      ) {
        bmiStatus.textContent = "Normalgewicht";
      } else if (currentBmi < parseFloat(eleParent[0])) {
        bmiStatus.textContent = "Untergewicht";
      } else if (currentBmi > parseFloat(eleParent[1])) {
        bmiStatus.textContent = "Übergewicht";
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
  backBtn.style.transform = "scaleX(0)";
  bmiDiff.style.transform = "scaleX(0)";
  backBtn.style.transition = "transform 0s";
  bmiDiff.style.transition = "transform 0s";
  bmiDiff.textContent = "";
  const range = document.querySelectorAll(".age-range");
  for (ele of range) {
    ele.parentNode.style.backgroundColor = "transparent";
  }
}

backBtn.addEventListener("click", reset);

document.querySelector("footer > span").textContent = new Date().getFullYear();
