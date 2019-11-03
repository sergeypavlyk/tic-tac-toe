// styles for game
document.body.style = "background-image: url(iphone.png); background-repeat: no-repeat; background-size: 500px; background-position: top 10px center; padding-top: 150px";
const gameArea = document.querySelector('#root');
gameArea.style = "width: 309.6px; height: 308px; background-color: blue; box-sizing: border-box; margin: 0 auto; border-radius: 10px; position: relative";
const changeGamerText = document.createElement("h1");
document.body.append(changeGamerText);
const progress = document.createElement("aside");
progress.style = "height: 0%; width: 1%; position: absolute; left: 0; bottom: 0";
document.body.append(progress);
changeGamerText.style = "font-size: 40px; font-weight: 500; text-align: center; color: red; font-family: sans-serif";
const restart = document.createElement("button");
document.body.append(restart);
restart.style = "padding: 20px; border: 3px solid white; margin: 0 auto; color: blue; font-size: 20px; display: block; cursor: pointer; border-radius: 10px";
restart.innerHTML = "Restart Game";
restart.addEventListener('mouseenter', () => restart.style = "padding: 20px; border: 3px solid white; margin: 0 auto; color: white; background-color: blue; font-size: 20px; display: block; cursor: pointer; border-radius: 10px");
restart.addEventListener('mouseleave', () => restart.style = "padding: 20px; border: 3px solid white; margin: 0 auto; color: blue; font-size: 20px; display: block; cursor: pointer; border-radius: 10px");
restart.addEventListener('click', () => restartGame());

const inputClickAreas = () => {
  for (let i = 0; i < 9; i++) {
    const clickArea = document.createElement("div");
    clickArea.style = "width: 100px; height: 100px; border: 2px solid #fff; float: left; cursor: pointer; font-size: 90px; text-align: center; vertical-align: middle";
    gameArea.append(clickArea);
    clickArea.addEventListener('mouseenter', () => clickArea.style = "background-color: red; width: 100px; height: 100px; border: 2px solid #fff; float: left; cursor: pointer; color: black; font-size: 90px; text-align: center; vertical-align: middle");
    clickArea.addEventListener('mouseleave', () => clickArea.style = "width: 100px; height: 100px; border: 2px solid #fff; float: left; cursor: pointer; color: black; font-size: 90px; text-align: center; vertical-align: middle");
    clickArea.setAttribute('class', 'item');
    clickArea.setAttribute('id', `${i}`);
  };
}
inputClickAreas();


//********GAME********//
// combinations
const winCombinations = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['2', '4', '6'],
];
let inputsX = [];
let inputsO = [];

// logic
const clickAreas = document.querySelectorAll('.item');
let gamer = 'X';
let move = 0;
let gamerText = `${gamer}'s move now`;
changeGamerText.innerHTML = gamerText;

let progressPercent = 0;
for (let i = 0; i < clickAreas.length; i++) clickAreas[i].addEventListener('click', e => inputValue(e));

const inputValue = e => {
  let num = e.target.id;
  progressPercent += 11.1111111;
  progress.style = `height: ${progressPercent}%; width: 1%; position: absolute; left: 0; bottom: 0; background-color: rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
  console.log(progress.style)

  if (e.target.innerHTML === '') {
    e.target.innerHTML = gamer;
    move++;
  }

  // push to new arrays
  (e.target.innerHTML === 'X') ? inputsX.push(`${num}`) : inputsO.push(`${num}`);

  // stopping game
  if (
    (inputsX.length > 2 || inputsO.length > 2) &&
    (checkWinner(inputsX, num) || checkWinner(inputsO, num))
  ) {
    progress.style ="height: 100%; width: 1%; position: absolute; left: 0; bottom: 0; background-color: green";
    alert(`${gamer} Win!!!`);
    restartGame();
  }

  // no winner checking
  if (move === 9) {
    alert('no winner!');
    restartGame();
  }
  else if (move % 2 !== 0) {
    gamer = 'O'
  } else gamer = 'X';
  changeText();
}


const changeText = () => {
  gamerText = `${gamer}'s move now`;
  changeGamerText.innerHTML = gamerText;
}

const checkWinner = (arr, num) => {
  for (let w = 0, wLen = winCombinations.length; w < wLen; w++) {
  let count = 0;
  let someWinArr = winCombinations[w];
  if (someWinArr.indexOf(num) !== -1) { 
    for (let k = 0, kLen = someWinArr.length; k < kLen; k++) {
      if (arr.indexOf(someWinArr[k]) !== -1) {
        count++;
        if (count === 3) {
          return true;
        }
      }
    }
    count = 0;
  } 
  }
}


const restartGame = () => {
  progressPercent = 0;
  progress.style = "height: 0%; width: 1%; position: absolute; left: 0; bottom: 0";
  const clickAreas = document.querySelectorAll('.item');
  for (let i = 0; i < clickAreas.length; i++) {
    clickAreas[i].innerHTML = '';
  }
  gamer = 'X';
  move = 0;
  inputsX = [];
  inputsO = [];
  changeText();
}


