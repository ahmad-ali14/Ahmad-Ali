window.i = 1;
let stop = false;
var carTime;
var firstSlide = 1;
var lastSlide = 4;
var slidertime = 5000;

function carousel() {
    //change pause/start button
    const sbtn = document.getElementById('sbtn');
    !stop ? sbtn.innerText = "||" : sbtn.innerText = "|>";

    const carImg = document.getElementById('carImg');

    //if you are on the last slide start from the begining, if you are on the first slide amd you are going backword jsut go back to the last slide.
    if (window.i <= 0) { window.i = lastSlide; }
    if (window.i > lastSlide) { window.i = 1; }

    if (!stop && window.i < lastSlide + 1) {
        /**
         * adapt slider if the image is jpg, jpeg or png
         */
        let file1 = doesFileExist(`/imgs/${window.i}.png`);
        if (file1) { carImg.setAttribute('src', '/imgs/' + window.i + '.png'); }
        else {
            let file2 = doesFileExist(`/imgs/${window.i}.jpeg`);
            let file3 = doesFileExist(`/imgs/${window.i}.jpg`);

            if (file2) { carImg.setAttribute('src', '/imgs/' + window.i + '.jpeg'); }
            if (file3) { carImg.setAttribute('src', '/imgs/' + window.i + '.jpg'); }

        }

        //increase to the next slide
        window.i = window.i + 1;

        //set slider timer
        carTime = setTimeout(carousel, slidertime);
    }
}


/**
 * 
 * @param string  urlToFile  - the path to the slider image
 * @return boolean if there is afile with this name or not.
 */
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}


/**
 * buttons functionality
 */

const pbtn = document.getElementById('pbtn');
const nbtn = document.getElementById('nbtn');
const sbtn = document.getElementById('sbtn');


pbtn.addEventListener('click', () => {
    nextSlide();
});

nbtn.addEventListener('click', () => {
   perviousSlide();
});

sbtn.addEventListener('click', () => {
    stopSlider();
});


/**
 * keys functionality
 */

window.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key == 'ArrowRight') {
        nextSlide();
    }

    if (key == 'ArrowLeft') {
        perviousSlide();
    }


    if (key == " ") {
        stopSlider();
    }
})


/**
 * stoping the slider  
 */

function stopSlider() {
    stop = !stop;
    clearTimeout(carTime);
    carousel();

}

/**
 * moving backword to the previous slide
 */

function perviousSlide() {
    if (stop == true) { stop = false; }
    window.i = window.i - 2;
    if (window.i < 1) {
        window.i = lastSlide;
        clearTimeout(carTime);
        return carousel();
    }
    clearTimeout(carTime);
    carousel();
}


/**
 * moving forward to the next slide
 */
function nextSlide() {
    if (stop == true) { stop = false; }
    // window.i= window.i + 1;
    if (window.i == lastSlide + 1) {
        window.i = 1;
        clearTimeout(carTime);
        return carousel();
    }

    clearTimeout(carTime);
    carousel();
}



window.onload = carousel;