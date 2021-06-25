// global variables
var word = "";
var wordLetterArray = [];
var WORDLETTEROBJECT = [];
var wrongTryCount = 0;
// just to give a couple of example words
var randomiseWord = function () {
    if (Math.random() * 10 < 5) {
        word = "PIDGEON";
    }
    else {
        word = "GARDENING";
    }
    return word;
};
wordLetterArray = Array.from(randomiseWord());
var initWordLetterObject = function (array) {
    array.forEach(function (letter, index) {
        WORDLETTEROBJECT.push({
            index: index,
            letter: letter,
            visable: false
        });
    });
};
initWordLetterObject(wordLetterArray);
var buildDomElements = function () {
    var hook = document.getElementById("container");
    hook.innerHTML = "";
    var letterInput = document.createElement("input");
    letterInput.name = "letter";
    letterInput.placeholder = "'a'";
    letterInput.className = "container__letterInput";
    letterInput.type = "text";
    var letterButton = document.createElement("button");
    letterButton.innerText = "Try!";
    letterButton.className = "container__submitLetterButton";
    var word = document.createElement("p");
    word.className = "container__word";
    var wordInput = document.createElement("input");
    wordInput.name = "word";
    wordInput.placeholder = "'Hippo'";
    wordInput.className = "container__wordInput";
    wordInput.type = "text";
    var wordButton = document.createElement("button");
    wordButton.innerText = "Submit";
    wordButton.className = "container__submitWordButton";
    var guessContainer = document.createElement("div");
    guessContainer.className = "container__guess-container";
    var guessHeader = document.createElement("h2");
    guessHeader.className = "container__guess-header";
    wordLetterArray.forEach(function () {
        word.innerText += "_ ";
    });
    var hangmanImgContainer = document.createElement("div");
    hangmanImgContainer.className = "container__hangman-img-container";
    var hangmanImg = document.createElement("img");
    hangmanImg.className = "hangman-img-container__img";
    hangmanImg.src = "./img/12 lives left.svg";
    hook.appendChild(hangmanImgContainer);
    hangmanImgContainer.appendChild(hangmanImg);
    hook.appendChild(word);
    hook.appendChild(letterInput);
    hook.appendChild(letterButton);
    hook.appendChild(wordInput);
    hook.appendChild(wordButton);
    hook.appendChild(guessHeader);
    hook.appendChild(guessContainer);
};
var letterInputHandler = function () {
    var input = document.querySelector(".container__letterInput");
    var inputVal = input.value.toUpperCase().trim();
    if (!inputVal || inputVal.length > 1) {
        return alert("Invalid letter!");
    }
    checkLetter(inputVal);
    document.querySelector(".container__letterInput").value = '';
};
var wordInputHandler = function () {
    var input = document.querySelector(".container__wordInput");
    var inputVal = input.value.toUpperCase().trim();
    if (!inputVal) {
        return alert("Invalid word!");
    }
    checkWord(inputVal);
    document.querySelector(".container__wordInput").value = '';
};
var hangmanImageChange = function () {
    var hangManImg = document.querySelector(".hangman-img-container__img");
    switch (wrongTryCount) {
        case 1:
            hangManImg.src = "./img/11 lives left.svg";
            break;
        case 2:
            hangManImg.src = "./img/10 lives left.svg";
            break;
        case 3:
            hangManImg.src = "./img/9 lives left.svg";
            break;
        case 4:
            hangManImg.src = "./img/8 lives left.svg";
            break;
        case 5:
            hangManImg.src = "./img/7 lives left.svg";
            break;
        case 6:
            hangManImg.src = "./img/6 lives left.svg";
            break;
        case 7:
            hangManImg.src = "./img/5 lives left.svg";
            break;
        case 8:
            hangManImg.src = "./img/4 lives left.svg";
            break;
        case 9:
            hangManImg.src = "./img/3 lives left.svg";
            break;
        case 10:
            hangManImg.src = "./img/2 lives left.svg";
            break;
        case 11:
            hangManImg.src = "./img/1 life left.svg";
            break;
        case 12:
            hangManImg.src = "./img/0 lives left.svg";
            break;
        default:
            break;
    }
};
var checkLetter = function (chosenLetter) {
    var checkedWordLetterObject = [];
    WORDLETTEROBJECT.forEach(function (object) {
        if (object.letter === chosenLetter) {
            object.visable = true;
        }
        checkedWordLetterObject.push(object);
    });
    var filtered = WORDLETTEROBJECT.filter(function (object) {
        return object.letter === chosenLetter;
    });
    // if no matches after checking users number
    if (filtered.length <= 0) {
        wrongTryCount++;
        hangmanImageChange();
        addGuessToDom(chosenLetter);
    }
    // checks if user has won or lost on that guess
    winOrLoseCheck(checkedWordLetterObject);
    // if user guessed right the dom gets updated
    renderProgress(checkedWordLetterObject);
};
var checkWord = function (inputVal) {
    if (inputVal === word) {
        alert("You win!");
        WORDLETTEROBJECT.forEach(function (object) {
            return object.visable = true;
        });
        renderProgress(WORDLETTEROBJECT);
    }
    else {
        wrongTryCount++;
        hangmanImageChange();
        addGuessToDom(inputVal);
    }
};
var addGuessToDom = function (guess) {
    var hook = document.getElementById("container");
    var guessContainer = document.querySelector(".container__guess-container");
    var guessHeader = document.querySelector(".container__guess-header");
    guessHeader.innerText = "Guesses";
    var aGuess = document.createElement("p");
    aGuess.innerText = guess;
    aGuess.className = "guess-container-guess";
    guessContainer.appendChild(aGuess);
};
var winOrLoseCheck = function (checkedWordLetterObject) {
    var filtered = checkedWordLetterObject.filter(function (object) {
        return object.visable;
    });
    if (filtered.length === WORDLETTEROBJECT.length) {
        alert("You win");
    }
    if (wrongTryCount > 11) {
        alert("You loose!");
    }
};
var renderProgress = function (objects) {
    var word = document.querySelector(".container__word");
    var renderedWord = "";
    objects.forEach(function (object) {
        if (object.visable) {
            renderedWord += object.letter + " ";
        }
        else {
            renderedWord += "_ ";
        }
    });
    word.innerText = renderedWord;
    console.log(renderedWord);
};
buildDomElements();
var submitLetterButton = document.querySelector(".container__submitLetterButton");
var submitWordButton = document.querySelector(".container__submitWordButton");
submitLetterButton.addEventListener('click', letterInputHandler);
submitWordButton.addEventListener('click', wordInputHandler);
