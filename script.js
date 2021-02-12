const form = document.querySelector('#memeGeneratorForm');

const saveMeme = document.querySelector('#saveCurrentMeme');

let textToEdit = '';

let bottomTexthandler = function (event) {

  console.log(event.key);
  if (event.key == 'Backspace') {

    let currentText = document.querySelector('#memeBottomText');
    currentText.removeChild(currentText.lastChild);
  } else if (event.code.startsWith('Key') || event.code == 'Space') {
    let currentText = document.querySelector('#memeBottomText');
    currentText.style.visibility = 'visible';
    if (currentText.innerText == 'Click') {
      currentText.innerHTML = ''
    }
    let letter = document.createElement('span');
    letter.innerText = event.key;
    currentText.append(letter);
  }

}

let topTextHandler = function (event) {

  if (event.key == 'Backspace') {

    let currentText = document.querySelector('#memeTopText');
    currentText.removeChild(currentText.lastChild);
  } else if (event.code.startsWith('Key') || event.code == 'Space') {
    let currentText = document.querySelector('#memeTopText');
    currentText.style.visibility = 'visible';
    if (currentText.innerText == 'Click') {
      currentText.innerHTML = ''
    }
    let letter = document.createElement('span');
    letter.innerText = event.key;
    currentText.append(letter);
  }

}

function blinkText(memeText) {
  const off = setInterval(function () {
    memeText.style.visibility = 'hidden';
  }, 1000);
  const on = setInterval(function () {
    memeText.style.visibility = 'visible';
  }, 2000);
}
function clearIntervals() {
  for (let i = 0; i < 999; i++) {
    window.clearInterval(i);
  }
}



let handleDocumentClick = function (event) {

  if (event.target.parentElement == document.querySelector('#memeTopText')) {
    let memeText = document.querySelector('#memeTopText');
    let oppositeText = document.querySelector('#memeBottomText');
    clearIntervals();
    oppositeText.style.visibility = 'visible';
    blinkText(memeText);
    textToEdit = 'top';
  }
  else if (event.target.parentElement == document.querySelector('#memeBottomText')) {
    let memeText = document.querySelector('#memeBottomText');
    let oppositeText = document.querySelector('#memeTopText');
    clearIntervals();
    oppositeText.style.visibility = 'visible';
    blinkText(memeText);
    textToEdit = 'bottom';

  }
}
let handleKeyDown = function (event) {
  if (event.keyCode == 32 && event.target == document.body) {
    event.preventDefault();
  }
  if (textToEdit == 'top') {
    topTextHandler(event);
  } else if (textToEdit == 'bottom') {
    bottomTexthandler(event);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  for (let el of document.querySelectorAll('#currentMeme p')) {
    el.style.visibility = 'visible';
  }
  document.querySelector('#saveCurrentMeme').style.visibility = 'visible';
  const currentMeme = document.querySelector('#currentMeme');
  const memeImage = document.querySelector('#imageInput').value;
  currentMeme.style.backgroundImage = `url(${memeImage})`
})
saveMeme.addEventListener('click', function () {
  const memeTopText = document.querySelector('#memeTopText');

  const memeBottomText = document.querySelector('#memeBottomText');
  clearIntervals();
  document.querySelector('#imageInput').value = '';
  memeTopText.style.visibility = 'visible';
  memeBottomText.style.visibility = 'visible';
  const allMemes = document.querySelector('#allMemes');
  const memeToSave = document.querySelector('#currentMeme');
  const newSavedMeme = document.createElement('div');
  newSavedMeme.style.backgroundImage = memeToSave.style.backgroundImage;
  newSavedMeme.classList.add('meme');
  newSavedMeme.innerHTML = memeToSave.innerHTML;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function (e) {
    e.target.parentElement.remove();
    e.target.remove();
  })
  deleteButton.classList.add('deleteButton');
  newSavedMeme.append(deleteButton);
  allMemes.append(newSavedMeme);
  document.querySelector('#allMemes').style.visibility = 'visible';
})
document.addEventListener('keydown', handleKeyDown, false);
document.addEventListener('click', handleDocumentClick), false;