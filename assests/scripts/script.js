document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const customTip = document.querySelector(".custom-tip");
  const tipButtons = document.querySelectorAll(".tip-button");
  const people = document.getElementById("num-people");
  const errorMessage = document.querySelector(".error-message");

  const tipCalculated = document.getElementById("tip-calculated");
  const totalCalculated = document.getElementById("total-calculated");
  const resetButton = document.querySelector(".reset");

  let selectedTip = 0;
  function validateNumPeople() {
    if (people.value <= 0 || people.value === "") {
      errorMessage.style.display = "block";
      people.style.border = "1px solid crimson";
    } else {
      errorMessage.style.display = "none";
      people.style.border = "none";
    }
  }

  function updateResetButton() {
    const hasInput =
      bill.value || people.value || customTip.value || selectedTip;
    resetButton.classList.toggle("active", hasInput);
  }

  billInput.addEventListener("input", () => {
    calculate();
    validateNumPeople();
    updateResetButton();
  });
  people.addEventListener("input", () => {
    calculate();
    validateNumPeople();
    updateResetButton();
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipButtons.forEach((button) => {
        button.classList.remove("active");
      });
      button.classList.add("active");
      customTip.value = "";
      selectedTip = parseFloat(button.textContent) / 100;
      validateNumPeople();
      updateResetButton();
      calculate();
    });
  });

  customTip.addEventListener("input", () => {
    validateNumPeople();
    updateResetButton();
    selectedTip = parseFloat(customTip.value) / 100;
    calculate();
  });
  customTip.addEventListener("focus", () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
  });

  resetButton.addEventListener("click", () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
    billInput.value = "";
    customTip.value = "";
    people.value = "";
    tipCalculated.textContent = "$0.00";
    totalCalculated.textContent = "$0.00";
    selectedTip = 0;
    updateResetButton();
  });

  function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(document.getElementById("num-people").value) || 0;
    if (bill > 0 && people > 0) {
      const tip = bill * selectedTip;
      const total = bill + tip;
      const tipPerPerson = tip / people;
      const totalPerPerson = total / people;
      tipCalculated.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalCalculated.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
  }
});
