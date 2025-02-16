const container = document.querySelector('.container');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const response = document.getElementById('response');
const fallingEmojis = document.querySelector('.falling-emojis');

let noCount = 0;
const margin = 20;
const noMessages = [
  "pleaseee :(((",
  "por favorrrr",
  "お願いします",
  "aman :<",
  "haya 3adddd",
  "yasmineee :(",
  "bjah rabi",
  "ok 3la 5atry",
  "plsplsplsplsplssssss",
  "PRETTY PLEASEEEE",
  "ok how abt PRETTY PLEASE WITH A CHERRY ON TOP",
  "im not letting you go until I make you happy",
  "You're breaking my heart ;("
];

// Position the "no" button initially next to the "yes" button.
window.addEventListener('load', () => {
  const yesRect = yesButton.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const offsetX = yesRect.right - containerRect.left + 20; // 20px to the right of Yes
  const offsetY = yesRect.top - containerRect.top;
  noButton.style.left = `${offsetX}px`;
  noButton.style.top = `${offsetY}px`;
});

function repositionNoButton() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const noWidth = noButton.offsetWidth;
  const noHeight = noButton.offsetHeight;
  const minX = margin;
  const minY = margin;
  const maxX = containerWidth - noWidth - margin;
  const maxY = containerHeight - noHeight - margin;
  let newX, newY, attempts = 0;

  const containerRect = container.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const yesRel = {
    left: yesRect.left - containerRect.left,
    top: yesRect.top - containerRect.top,
    right: (yesRect.left - containerRect.left) + yesButton.offsetWidth,
    bottom: (yesRect.top - containerRect.top) + yesButton.offsetHeight
  };

  function intersects(x, y) {
    const candidate = { left: x, top: y, right: x + noWidth, bottom: y + noHeight };
    return !(candidate.right < yesRel.left || candidate.left > yesRel.right ||
             candidate.bottom < yesRel.top || candidate.top > yesRel.bottom);
  }

  do {
    newX = minX + Math.random() * (maxX - minX);
    newY = minY + Math.random() * (maxY - minY);
    attempts++;
  } while (intersects(newX, newY) && attempts < 100);

  noButton.style.left = `${newX}px`;
  noButton.style.top = `${newY}px`;
}

noButton.addEventListener('click', () => {
  if (noCount < noMessages.length - 1) {
    response.textContent = noMessages[noCount];
    noCount++;
  } else {
    response.textContent = "please click yes already";
  }
  if (noCount >= 3) {
    repositionNoButton();
  }
});

noButton.addEventListener('mousemove', (e) => {
  if (noCount >= 5) {
    const btnRect = noButton.getBoundingClientRect();
    const centerX = btnRect.left + btnRect.width / 2;
    const centerY = btnRect.top + btnRect.height / 2;
    const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    if (distance < 100) {
      repositionNoButton();
    }
  }
});

yesButton.addEventListener('click', () => {
  response.textContent = "I LOVE YOU BABYYYYYYY THANK YOUUUUU";
  response.style.color = "#ff6f61";
  response.style.fontFamily = "'Roboto', sans-serif"; // Change font to Roboto in JS
  yesButton.classList.add('celebrate');
  noButton.style.display = 'none';
  fallingEmojis.style.display = 'block';
  for (let i = 0; i < 60; i++) {
    createFallingEmoji();
    createFallingHeart();
  }
  setTimeout(() => {
    alert("Yk I can see you lookin all cute like that right? jk jk");
  }, 3000);
});

function createFallingEmoji() {
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  const emojis = ['🌸','💖','🌷','🐾','✨','🎀'];
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + 'vw';
  emoji.style.animationDuration = Math.random() * 2 + 3 + 's';
  fallingEmojis.appendChild(emoji);
  setTimeout(() => emoji.remove(), 5000);
}

function createFallingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  fallingEmojis.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
