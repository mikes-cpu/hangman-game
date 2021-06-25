// global variables
let word = "";
let wordLetterArray = [];
const WORDLETTEROBJECT = [];
let wrongTryCount = 0;


// just to give a couple of example words
const randomiseWord = () => {
  if(Math.random() * 10 < 5) {
    word = "PIDGEON"
  } else{
    word = "GARDENING";
  }
  return word;
}
wordLetterArray = Array.from(randomiseWord());


const initWordLetterObject = (array) => {
  array.forEach((letter, index) => {
    WORDLETTEROBJECT.push({
      index: index,
      letter: letter,
      visable: false,
    })
  })
}

initWordLetterObject(wordLetterArray)


const buildDomElements = () => {
  const hook = document.getElementById("container");
  hook.innerHTML = "";

  const letterInput = document.createElement("input")
  letterInput.name = "letter";
  letterInput.placeholder = "'a'"
  letterInput.className = "container__letterInput"
  letterInput.type = "text";

  const letterButton = document.createElement("button");
  letterButton.innerText = "Try!"
  letterButton.className = "container__submitLetterButton"

  const word = document.createElement("p")
  word.className = "container__word"

  const wordInput = document.createElement("input")
  wordInput.name = "word";
  wordInput.placeholder = "'Hippo'"
  wordInput.className = "container__wordInput"
  wordInput.type = "text";

  const wordButton = document.createElement("button");
  wordButton.innerText = "Submit"
  wordButton.className = "container__submitWordButton"

  const guessContainer = document.createElement("div")
  guessContainer.className = "container__guess-container"

  const guessHeader = document.createElement("h2")
  guessHeader.className = "container__guess-header"

  wordLetterArray.forEach(() => {
    word.innerText += "_ "
  })

  const hangmanImgContainer = document.createElement("div")
  hangmanImgContainer.className = "container__hangman-img-container"
  const hangmanImg = document.createElement("img")
  hangmanImg.className = "hangman-img-container__img"
  hangmanImg.src = "./img/12 lives left.svg"

  hook.appendChild(hangmanImgContainer)
  hangmanImgContainer.appendChild(hangmanImg)
  hook.appendChild(word)
  hook.appendChild(letterInput)
  hook.appendChild(letterButton)
  hook.appendChild(wordInput)
  hook.appendChild(wordButton)
  hook.appendChild(guessHeader)
  hook.appendChild(guessContainer)
}


const letterInputHandler = () => {
  let input = (<HTMLInputElement>document.querySelector(".container__letterInput"))
  let inputVal = input.value.toUpperCase().trim();

  if(!inputVal || inputVal.length > 1) {
    return alert("Invalid letter!")
  } 
  checkLetter(inputVal);

  (<HTMLInputElement>document.querySelector(".container__letterInput")).value = ''
}


const wordInputHandler = () => {
  let input = (<HTMLInputElement>document.querySelector(".container__wordInput"))
  let inputVal = input.value.toUpperCase().trim();

  if(!inputVal) {
    return alert("Invalid word!")
  } 
  checkWord(inputVal);

  (<HTMLInputElement>document.querySelector(".container__wordInput")).value = ''
}


const hangmanImageChange = () => {
  const hangManImg = (<HTMLInputElement>document.querySelector(".hangman-img-container__img"))
    
  switch (wrongTryCount) {
    case 1: 
      hangManImg.src = "./img/11 lives left.svg"
      break;
    case 2: 
      hangManImg.src = "./img/10 lives left.svg"
      break;
    case 3: 
      hangManImg.src = "./img/9 lives left.svg"
      break;
    case 4: 
      hangManImg.src = "./img/8 lives left.svg"
      break;
    case 5: 
      hangManImg.src = "./img/7 lives left.svg"
      break;
    case 6: 
      hangManImg.src = "./img/6 lives left.svg"
      break;
    case 7: 
      hangManImg.src = "./img/5 lives left.svg"
      break;
    case 8: 
      hangManImg.src = "./img/4 lives left.svg"
      break;
    case 9: 
      hangManImg.src = "./img/3 lives left.svg"
      break;
    case 10: 
      hangManImg.src = "./img/2 lives left.svg"
      break;
    case 11: 
      hangManImg.src = "./img/1 life left.svg"
      break;
    case 12: 
      hangManImg.src = "./img/0 lives left.svg"
      break;
    default:
      break;
  }
}

const checkLetter = (chosenLetter) => {
  let checkedWordLetterObject = []

  WORDLETTEROBJECT.forEach((object) => {
    if (object.letter === chosenLetter) {
      object.visable = true
    } 
    checkedWordLetterObject.push(object)
  })

  const filtered = WORDLETTEROBJECT.filter((object) => {
    return object.letter === chosenLetter;
  })

  // if no matches after checking users number
  if (filtered.length <= 0) {
    wrongTryCount++;
    hangmanImageChange()
    addGuessToDom(chosenLetter)
  }

  // checks if user has won or lost on that guess
  winOrLoseCheck(checkedWordLetterObject);

  // if user guessed right the dom gets updated
  renderProgress(checkedWordLetterObject);
}


const checkWord = (inputVal) => {
  if(inputVal === word) {
    alert("You win!")
    WORDLETTEROBJECT.forEach((object) => {
      return object.visable = true;
    })
    renderProgress(WORDLETTEROBJECT)
  } else {
    wrongTryCount++
    hangmanImageChange()
    addGuessToDom(inputVal)
  }
}

const addGuessToDom = (guess) => {
  const guessContainer = (<HTMLInputElement>document.querySelector(".container__guess-container"))

  const guessHeader = (<HTMLInputElement>document.querySelector(".container__guess-header"))
  guessHeader.innerText = "Guesses"

  const aGuess = document.createElement("p")
  aGuess.innerText = guess;
  aGuess.className = "guess-container-guess";

  guessContainer.appendChild(aGuess)
}


const winOrLoseCheck = (checkedWordLetterObject) => {
  const filtered = checkedWordLetterObject.filter((object) => {
    return object.visable;
  })  

  if(filtered.length === WORDLETTEROBJECT.length) {
    alert("You win")
  }

  if(wrongTryCount > 11) {
    alert("You loose!")
  }
}


const renderProgress = (objects) => {
  const word = (<HTMLInputElement>document.querySelector(".container__word"));
  let renderedWord = "";
  objects.forEach((object) => {
    if(object.visable) {
      renderedWord += `${object.letter} `
    } else {
      renderedWord += "_ "
    }
  })
  word.innerText = renderedWord;
  console.log(renderedWord)
}


buildDomElements()


const submitLetterButton = document.querySelector(".container__submitLetterButton")
const submitWordButton = document.querySelector(".container__submitWordButton")

submitLetterButton.addEventListener('click', letterInputHandler)
submitWordButton.addEventListener('click', wordInputHandler)
