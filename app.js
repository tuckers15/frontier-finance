let moneyElement = document.getElementById("money");
let money = parseInt(moneyElement.textContent, 10);
let ranchesOwned = 0; // Track the number of ranches owned
console.log(moneyElement);

const handMessageDelay = 3000;
const standMessageDelay = 2000;

//reset game
const newGameBtn = document.getElementById("reset");
newGameBtn.addEventListener("click", function (e) {
  location.reload();
});

//mesasges
// Function to show fade-away messages
function showMessage(message, delay) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.textContent = message; // Set the message text
  messageContainer.style.display = "block"; // Show the message container

  // Fade out effect
  setTimeout(() => {
    messageContainer.style.opacity = 0; // Start fading out
  }, 500); // Wait 2 seconds before starting to fade out

  // Hide the message after fading out
  setTimeout(() => {
    messageContainer.style.display = "none"; // Hide the message container
    messageContainer.style.opacity = 1; // Reset opacity for the next message
  }, delay); // Total time before hiding (2 seconds fade + 1 second for visibility)
}

// black jack button
const btnBJ = document.getElementById("btnBlackJack");
btnBJ.addEventListener("click", function (e) {
  if (money >= 0.5) {
    btnBJ.disabled = true;
    let randNum = Math.floor(Math.random() * 2);
    if (randNum == 1) {
      showMessage("You Win!", standMessageDelay);
      money += 1;
    } else {
      showMessage("Better Luck Next Time...", standMessageDelay);
      money -= 0.5;
    }
    moneyElement.textContent = money;

    //reenable blackjack
    setTimeout(() => {
      btnBJ.disabled = false;
    }, 2000);
  } else {
    showMessage("You can't afford buy in....", standMessageDelay);
  }
});

//cattle hand
const btnHand = document.getElementById("btnHand");
btnHand.addEventListener("click", function (e) {
  const assetButtons = document.querySelectorAll(".asset button");

  assetButtons.forEach((button) => {
    button.disabled = true;
  });

  //todo: insert loading bar visual

  showMessage("A hard days  work...", handMessageDelay);
  setTimeout(() => {
    assetButtons.forEach((button) => {
      button.disabled = false;
    });
  }, 3000); // 3 second timeout
  money += 5;
  moneyElement.textContent = money;
});

//ranch logic
const btnRanch = document.getElementById("btnRanch");
btnRanch.addEventListener("click", function (e) {
  if (money >= 50) {
    money -= 50;
    moneyElement.textContent = money;
    ranchesOwned += 1;

    startRanchIncome();
    showMessage("Congrats on buying your ranch!", standMessageDelay);
  } else {
    console.log("Not enough money to buy a ranch.", standMessageDelay);
  }
});

let ranchIncomeInterval; // Variable to hold the interval ID

function startRanchIncome() {
  // Only start the interval if it hasn't been started yet
  if (!ranchIncomeInterval) {
    ranchIncomeInterval = setInterval(() => {
      money += ranchesOwned; // Increment money by the number of ranches owned
      moneyElement.textContent = money; // Update the displayed money
    }, 1000); // 1000 milliseconds = 1 second
  }
}
