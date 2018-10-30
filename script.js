/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert(`Markmið er að svara eins mörgum af ${GAMES_TO_PLAY} dæmum rétt eins hratt og mögulegt er.`)
  do {
    play();
  } while (confirm('Spila annan leik?'));
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  let time = Date.now();
  var cancel = false;
  var correct = 0;
  for (var i = 0; i < GAMES_TO_PLAY; i++) {
    var [corr, ans] = ask();

    if (ans === null) {
      cancel = true;
      alert("Hætt í leik.")
      break;
    }

    if (corr) {
      correct++;
    }
  }

  if (!cancel) {
    time = (Date.now() - time) / 1000;
    var Y = time.toFixed(2);
    var Z = (correct / time).toFixed(2);

    alert(`Þú svaraðir ${correct} af ${GAMES_TO_PLAY} dæmum rétt á ${Y} sekúndum\n` +
      `Meðalrétt svör á sekúndu eru ${Z}`);
  }
}

// List of all operations
function question() {
  switch (randomNumber(1, 4)) {
    case 1: // Addition
      var min = 1;
      var max = 100;
      var numtwo = randomNumber(min, max);
      var numone = randomNumber(min, max);
      var sol = numone + numtwo;
      return [numone, '+', numtwo, sol];
    case 2: // Subtraction
      var min = 1;
      var max = 100;
      var numtwo = randomNumber(min, max);
      var numone = randomNumber(min, max);
      var temp1 = Math.max(numone, numtwo);
      var temp2 = Math.min(numone, numtwo);
      var sol = temp1 - temp2;
      return [temp1, '-', temp2, sol];
    case 3: // Multiplication    
      var min = 1;
      var max = 10;
      var oper = "*";
      var numtwo = randomNumber(min, max);
      var numone = randomNumber(min, max);
      var sol = numone * numtwo;
      return [numone, '*', numtwo, sol];
    case 4: // Division
      var min = 2;
      var max = 10;
      var multiple = randomNumber(min, max);
      var numtwo = randomNumber(min, max);
      var numone = multiple * numtwo;
      var sol = numone / numtwo;
      return [numone, '/', numtwo, sol];
  }
}

function ask() {
  let [numone, oper, numtwo, sol] = question();
  const input = prompt(`Hvað er ${numone}${oper}${numtwo}?`);
  const parsedInput = parseGuess(input);
  if (parsedInput === sol) {
    return [true, parsedInput];
  }
  return [false, parsedInput];
}

function parseGuess(input) {
  const parsed = parseInt(input, 10);
  if (isNaN(parsed)) return null;
  return parsed;
}

/* Skilar tölu af handahófi á bilinu [min, max] */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
