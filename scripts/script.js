const result = document.querySelector("#result");
const bmiStatus = document.querySelector("#status");
const bmiDiff = document.querySelector("#diff");
const form = document.querySelector("#rechner");
const resBmi = document.querySelector("#res");
const backBtn = document.querySelector("#backBTN");
const displayDefault = document.querySelector("#defaultTable");
const displayFemale = document.querySelector("#femaleTable");
const displayMale = document.querySelector("#maleTable");
const button = document.querySelector("#submit");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
let compare;

function getBMI() {
  const resultBMI =
    parseInt(weight.value) / Math.pow(parseInt(height.value) / 100, 2);
  return resultBMI;
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

  change();

  if (!isNaN(compare)) {
    form.style.display = "none";
    backBtn.style.transform = "scale(1)";
    localStorage.setItem("previous", compare);
  } else {
    result.textContent = "";
    bmiStatus.textContent = "Bitte tragen Sie Ihren Gewicht und Größe ein!";
  }

  let age = 0;
  ageValue != "" ? (age += parseInt(ageValue)) : age;

  let gender = "";
  if (male.checked) {
    gender = "male";
  } else if (female.checked) {
    gender = "female";
  }

  let currentTable;
  switch (gender) {
    case "male":
      if (displayDefault.style.transform == "scaleX(1)") {
        displayDefault.style.transform = "scaleX(0)";
      }
      displayMale.style.transform = "scaleX(1)";
      displayMale.style.transition = "transform 0.75s ease-in-out";
      currentTable = displayMale;
      break;
    case "female":
      if (displayDefault.style.transform == "scaleX(1)") {
        displayDefault.style.transform = "scaleX(0)";
      }
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
      (ageRange.length > 1 && age >= ageRange[0] && age <= ageRange[1]) ||
      (ageRange.length == 1 && age >= ageRange[0].substring(2))
    ) {
      ele.parentNode.style.backgroundColor = "skyblue";
      const eleParent = ele.parentNode
        .querySelector(".bmi-range")
        .textContent.split("-");
      if (compare > eleParent[0] && compare <= eleParent[1]) {
        bmiStatus.textContent = "Normalgewicht";
      } else if (compare < parseFloat(eleParent[0])) {
        bmiStatus.textContent = "Untergewicht";
      } else if (
        compare > parseFloat(eleParent[1]) &&
        compare <= parseFloat(eleParent[1]) + 5
      ) {
        bmiStatus.textContent = "Übergewicht";
      } else if (
        compare > parseFloat(eleParent[1]) + 5 &&
        compare <= parseFloat(eleParent[1]) + 10
      ) {
        bmiStatus.textContent = "Starkes Übergewicht";
      } else if (compare > parseFloat(eleParent[1]) + 10) {
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
  backBTN.style.transform = "scaleX(0)";
  bmiDiff.style.transform = "scaleX(0)";
  bmiDiff.textContent = "";
  const range = document.querySelectorAll(".age-range");
  for (ele of range) {
    ele.parentNode.style.backgroundColor = "transparent";
  }
}

backBtn.addEventListener("click", reset);
