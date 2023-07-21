'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
const btnElt = document.getElementById('firing-button');
// const btnStopElt = document.getElementById('cancel-button');
const billboardElt = document.querySelector('#billboard span');
const rocketElt = document.getElementById('rocket');
const mainElt = document.querySelector('main');
let countDown = 10;
let intervalID;


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function initiateLaunch() {
    // btn launch
    btnElt.removeEventListener('click', initiateLaunch);
    btnElt.src = 'images/cancel-button.png';
    btnElt.addEventListener('click', reset);

    // start rocket launch
    if (countDown > 0) {
        rocketElt.src = 'images/rocket2.gif';
    }

    //countdown
    billboardElt.textContent = countDown;
    intervalID = setInterval(function() {
        if (countDown > 0) {
            countDown--;
            billboardElt.textContent = countDown;
        }
        else {
            clearInterval(intervalID);
        }

        // rocket launch
        if (countDown === 0) {
            rocketElt.src = 'images/rocket3.gif';
            rocketElt.classList.add('tookOff');
        }

        //btn launch
        if (countDown === 0) {
            btnElt.classList.add('disabled');
            btnElt.removeEventListener('click', reset);
        }
    }, 1000);

}

function reset() {
    clearInterval(intervalID);
    rocketElt.src = 'images/rocket1.png';
    btnElt.src = 'images/firing-button.png';
    countDown = 10;
    billboardElt.textContent = '';
    btnElt.addEventListener('click', initiateLaunch);

}

// Create a div element with class "star" and the specified position
function createStar(top, left, classe) {
    const star = document.createElement('div');
    star.classList.add('star', classe);
    star.style.top = top + 'px';
    star.style.left = left + 'px';
    return star;
}

// Annimation of the stars
function annimationStars() {
    const starsElts = document.querySelectorAll('.star');
    let randomStars = [];
    for (let i = 0; i < 50; i++) {
        let random = Math.floor(Math.random() * 150);
        randomStars.push(random);
    }


    let intervalStarsID = setInterval(function() {
        for (let i = 0; i < 50; i++) {
            if (starsElts[randomStars[i]].classList.contains('big')) {
                starsElts[randomStars[i]].classList.remove('big');
                starsElts[randomStars[i]].classList.add('tiny');
            }
            else if (starsElts[randomStars[i]].classList.contains('tiny')) {
                starsElts[randomStars[i]].classList.remove('tiny');
                starsElts[randomStars[i]].classList.add('normal');
            }
            else if (starsElts[randomStars[i]].classList.contains('normal')) {
                starsElts[randomStars[i]].classList.remove('normal');
                starsElts[randomStars[i]].classList.add('big');
            }
        }
    }, 333);
}



/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

// Append stars to the "main" element
for (let i = 0; i < 150; i++) {
    let top = Math.floor(Math.random() * window.innerHeight);
    let left = Math.floor(Math.random() * window.innerWidth);
    let classe = Math.ceil(Math.random() * 3);
    switch (classe) {
        case 1:
            classe = 'tiny';
            break;
        case 2:
            classe = 'normal';
            break;
        case 3:
            classe = 'big';
            break;
    }

    const star = createStar(top, left, classe);
    mainElt.appendChild(star);
}

annimationStars();

// Start the launch
btnElt.addEventListener('click', initiateLaunch);
