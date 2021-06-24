let word = "";
let wordArray = [];

const randomiseWord = () => {
  if(Math.random() * 10 < 5) {
    word = "PIDGEON"
  } else{
    word = "GARDENING";
  }
  return word;
}

wordArray = Array.from(randomiseWord());
const wordObject = [];
let wrongTries = 0;

const initObject = (array) => {
  array.forEach((letter, index) => {
    wordObject.push({
      index: index,
      letter: letter,
      visable: false,
    })
  })
}

initObject(wordArray)


const initGame = () => {
  const hook = document.getElementById("container");
  hook.innerHTML = "";

  const title = document.createElement("h1")
  title.innerText = "Hangman"
  title.className = "container__title"

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

  wordArray.forEach(() => {
    word.innerText += "_ "
  })

  const hangmanImgContainer = document.createElement("div")
  hangmanImgContainer.className = "container__hangman-img-container"
  const hangmanImg = document.createElement("img")
  hangmanImg.className = "hangman-img-container__img"
  hangmanImg.src = "./img/12 lives left.svg"


  // hook.appendChild(title)
  hook.appendChild(hangmanImgContainer)
  hangmanImgContainer.appendChild(hangmanImg)
  hook.appendChild(word)
  hook.appendChild(letterInput)
  hook.appendChild(letterButton)
  hook.appendChild(wordInput)
  hook.appendChild(wordButton)
}

const letterSubmitHandler = () => {
  let input = (<HTMLInputElement>document.querySelector(".container__letterInput"))
  let inputVal = input.value.toUpperCase().trim();

  if(!inputVal || inputVal.length > 1) {
    return alert("Invalid letter!")
  } 
  checkLetter(inputVal);

  (<HTMLInputElement>document.querySelector(".container__letterInput")).value = ''
}

const wordSubmitHandler = () => {
  let input = (<HTMLInputElement>document.querySelector(".container__wordInput"))
  let inputVal = input.value.toUpperCase().trim();

  checkWord(inputVal);

  (<HTMLInputElement>document.querySelector(".container__wordInput")).value = ''
}

const changeHangmanImage = () => {
  const hangManImg = (<HTMLInputElement>document.querySelector(".hangman-img-container__img"))
    
  switch (wrongTries) {
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
  let checkedObjects = []
  wordObject.forEach((object) => {
    if (object.letter === chosenLetter) {
      object.visable = true
    } 
    checkedObjects.push(object)
  })

  const filtered = wordObject.filter((object) => {
    return object.letter === chosenLetter;
  })

  if (filtered.length <= 0) {
    wrongTries++;
    changeHangmanImage()
    addUsedLetter(chosenLetter)
  }

  console.log(filtered)
  winOrLoseCheck(checkedObjects);
  renderProgress(checkedObjects)
}

const addUsedLetter = (chosenLetter) => {
  const hook = document.getElementById("container");

  const usedLetter = document.createElement("p")
  usedLetter.innerText = chosenLetter;
  usedLetter.className = "container__used-letter";

  hook.appendChild(usedLetter)
}

const checkWord = (inputVal) => {
  if(inputVal === word) {
    alert("You win!")
    wordObject.forEach((object) => {
      return object.visable = true;
    })

    renderProgress(wordObject)
  } else {
    wrongTries++
    changeHangmanImage()
  }
}

const winOrLoseCheck = (checkedObjects) => {
  const filtered = checkedObjects.filter((object) => {
    return object.visable;
  })  

  if(filtered.length === wordObject.length) {
    console.log(filtered.length)
    console.log(wordObject.length)
    alert("You win")
  }

  if(wrongTries > 11) {
    alert("You loose!")
  }
}

const renderProgress = (objects) => {
  const word = (<HTMLInputElement>document.querySelector(".container__word"));
  let renderedVersion = "";
  objects.forEach((object) => {
    if(object.visable) {
      renderedVersion += `${object.letter} `
    } else {
      renderedVersion += "_ "
    }
  })
  word.innerText = renderedVersion;
  console.log(renderedVersion)
}

initGame()



const submitLetterButton = document.querySelector(".container__submitLetterButton")
const submitWordButton = document.querySelector(".container__submitWordButton")

submitLetterButton.addEventListener('click', letterSubmitHandler)
submitWordButton.addEventListener('click', wordSubmitHandler)
