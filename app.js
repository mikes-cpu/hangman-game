var word = "";
var wordArray = [];
var randomiseWord = function () {
    if (Math.random() * 10 < 5) {
        word = "PIDGEON";
    }
    else {
        word = "GARDENING";
    }
    return word;
};
wordArray = Array.from(randomiseWord());
var wordObject = [];
var wrongTries = 0;
var initObject = function (array) {
    array.forEach(function (letter, index) {
        wordObject.push({
            index: index,
            letter: letter,
            visable: false
        });
    });
};
initObject(wordArray);
var initGame = function () {
    var hook = document.getElementById("container");
    hook.innerHTML = "";
    var title = document.createElement("h1");
    title.innerText = "Hangman";
    title.className = "container__title";
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
    wordArray.forEach(function () {
        word.innerText += "_ ";
    });
    var hangmanImgContainer = document.createElement("div");
    hangmanImgContainer.className = "container__hangman-img-container";
    var hangmanImg = document.createElement("img");
    hangmanImg.className = "hangman-img-container__img";
    hangmanImg.src = "./img/12 lives left.svg";
    // hook.appendChild(title)
    hook.appendChild(hangmanImgContainer);
    hangmanImgContainer.appendChild(hangmanImg);
    hook.appendChild(word);
    hook.appendChild(letterInput);
    hook.appendChild(letterButton);
    hook.appendChild(wordInput);
    hook.appendChild(wordButton);
};
var letterSubmitHandler = function () {
    var input = document.querySelector(".container__letterInput");
    var inputVal = input.value.toUpperCase();
    if (!inputVal || inputVal.length > 1) {
        return alert("Invalid letter!");
    }
    checkLetter(inputVal);
    document.querySelector(".container__letterInput").value = '';
};
var wordSubmitHandler = function () {
    var input = document.querySelector(".container__wordInput");
    var inputVal = input.value.toUpperCase();
    checkWord(inputVal);
    document.querySelector(".container__wordInput").value = '';
};
var changeHangmanImage = function () {
    var hangManImg = document.querySelector(".hangman-img-container__img");
    switch (wrongTries) {
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
var checkLetter = function (chLetter) {
    var checkedObjects = [];
    wordObject.forEach(function (object) {
        if (object.letter === chLetter) {
            object.visable = true;
        }
        checkedObjects.push(object);
    });
    var filtered = wordObject.filter(function (object) {
        return object.letter === chLetter;
    });
    if (filtered.length <= 0) {
        wrongTries++;
        changeHangmanImage();
    }
    console.log(filtered);
    winOrLoseCheck(checkedObjects);
    renderProgress(checkedObjects);
};
var checkWord = function (inputVal) {
    if (inputVal === word) {
        alert("You win!");
        wordObject.forEach(function (object) {
            return object.visable = true;
        });
        renderProgress(wordObject);
    }
    else {
        wrongTries++;
        changeHangmanImage();
    }
};
var winOrLoseCheck = function (checkedObjects) {
    var filtered = checkedObjects.filter(function (object) {
        return object.visable;
    });
    if (filtered.length === wordObject.length) {
        console.log(filtered.length);
        console.log(wordObject.length);
        alert("You win");
    }
    if (wrongTries > 11) {
        alert("You loose!");
    }
};
var renderProgress = function (objects) {
    var word = document.querySelector(".container__word");
    var renderedVersion = "";
    objects.forEach(function (object) {
        if (object.visable) {
            renderedVersion += object.letter + " ";
        }
        else {
            renderedVersion += "_ ";
        }
    });
    word.innerText = renderedVersion;
    console.log(renderedVersion);
};
initGame();
var submitLetterButton = document.querySelector(".container__submitLetterButton");
var submitWordButton = document.querySelector(".container__submitWordButton");
submitLetterButton.addEventListener('click', letterSubmitHandler);
submitWordButton.addEventListener('click', wordSubmitHandler);
