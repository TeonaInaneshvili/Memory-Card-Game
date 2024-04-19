let container = document.querySelector(".container");
let openCards = [];
let score = 0;
let minAttempt = 0;
let scoreCounter = document.getElementById("scoreCounter"); 


let places = [
  "images/ქუთაისი.jpg",
  "images/ქუთაისი.jpg",
  "images/თბილისი.jpg",
  "images/თბილისი.jpg",
  "images/ყაზბეგი.jpg",
  "images/ყაზბეგი.jpg",
  "images/სოხუმი.jpg",
  "images/სოხუმი.jpg",
  "images/სვანეთი.jpg",
  "images/სვანეთი.jpg",
  "images/თელავი.jpg",
  "images/თელავი.jpg",
  "images/თუშეთი.jpg",
  "images/თუშეთი.jpg",
  "images/ვარძია.jpg",
  "images/ვარძია.jpg",
  "images/შატილი.jpg",
  "images/შატილი.jpg",
  "images/ბახმარო.jpg",
  "images/ბახმარო.jpg",
  "images/ბათუმი.jpg",
  "images/ბათუმი.jpg",
  "images/მარტვილი.jpg",
  "images/მარტვილი.jpg"
];
function game(a) {
  container.innerHTML = "";
  if(a === 24) {
    let container = document.querySelector(".container");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(6, 1fr)";
    container.style.gap = "10px";
    container.style.margin = "10px";
    container.style.cursor = "pointer";

  }

  else if(a === 12) {
    container.style.gridTemplateColumns = "repeat(4, 1fr)";
  
  }
  let imgs = places.slice(0, a);

  for (let i = 0; i < a; i++) {
    let card = document.createElement("div");
    let random = Math.floor(Math.random() * imgs.length);

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front"></div>
        <div class="flip-card-back">
          <img src="${imgs[random]}">
        </div>
      </div>
    `;

    card.classList.add("flip-card");

    imgs.splice(random, 1);

    card.querySelector('.flip-card-front').addEventListener("click", function () {
      if (openCards.length < 2 && !openCards.includes(card)) {
        card.querySelector(".flip-card-inner").style.transform = "rotateY(180deg)";
        openCards.push(card);
        score++;
        scoreCounter.textContent = score;

        if (openCards.length === 2) {
          let firstCardImage = openCards[0].querySelector(".flip-card-back img").src;
          let secondCardImage = openCards[1].querySelector(".flip-card-back img").src;

          if (firstCardImage === secondCardImage) {
            openCards = [];
          } else {
            setTimeout(() => {
              openCards.forEach(card => {
                card.querySelector(".flip-card-inner").style.transform = "rotateY(0deg)";
              });
              openCards = [];
            }, 1200);
          }
        }
        if (document.querySelectorAll('.flip-card-inner[style*="rotateY(180deg)"]').length === a) {
          setTimeout(() => {
            displayModal();
          }, 1100);
        }
      }
    }
    );

    container.appendChild(card);
  }

  function displayModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    let closeButton = document.getElementsByClassName("close")[0];
    closeButton.onclick = function () {
      modal.style.display = "none";
    };
    let scoreElement = document.createElement("p");

    if (a === 12) {
      minAttempt = 12;
    } else if (a === 24) {
      minAttempt = 24;
    }

    let faultAttempt = score - minAttempt;
    scoreElement.classList.add("score");
    scoreElement.classList.add("faultAttempt");

    document.querySelector(".givi").innerHTML=` ${score} ცდაში. მხოლოდ ${faultAttempt} ცდა იყო მცდარი`;
  }
}
function resetPage() {
  location.reload(); 
  score = 0;
}


  function resetScore() {
    score = 0;
    scoreCounter.textContent = score;
  }
