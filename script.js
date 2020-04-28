window.i = 1;
let stop = false;
var slideTime = document.getElementById('slidesTime');
var slideNum = document.getElementById('slidesNum');

console.log(slideTime);
console.log(slideNum);

var carTime;
var firstSlide = 1;
 window.lastSlide = 4;
var slidertime = 3000;

function carousel() {
    //change pause/start button
    const sbtn = document.getElementById('sbtn');
    !stop ? sbtn.innerText = " || " : sbtn.innerText = " |> ";

    const carImg = document.getElementById('carImg');

    //if you are on the last slide start from the begining, if you are on the first slide amd you are going backword jsut go back to the last slide.
    if (window.i <= 0) { window.i = window.lastSlide; }
    if (window.i > window.lastSlide) { window.i = 1; }

    if ( window.i < window.lastSlide + 1) {
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
        window.i = window.i + 1;

      if( !stop ){
        //increase to the next slide
       
        //set slider timer
        carTime = setTimeout(carousel, slidertime);
      }
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
    perviousSlide();
    console.log('prevpressed', window.i)

});

nbtn.addEventListener('click', () => {
    nextSlide();
    console.log('nextpressd', window.i)

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
   // if (stop == true) { stop = false; }
    window.i = window.i -2;
    // if (window.i < 1) {
    //     window.i = window.lastSlide;
    //     clearTimeout(carTime);
    //     return carousel();
    // }
    console.log('inside prev', window.i)
    clearTimeout(carTime);
    carousel();
}


/**
 * moving forward to the next slide
 */
function nextSlide() {
   // if (stop == true) { stop = false; }
    window.i = window.i;
    // if (window.i > window.lastSlide ) {
    //     window.i = 1;
    //     clearTimeout(carTime);
    //     return carousel();
    // }

    clearTimeout(carTime);
    carousel();
}

slideNum.addEventListener('change', () =>{
    window.lastSlide = parseInt(slideNum.value);
    console.log(window.lastSlide);
    slidertime = slideTime.value * 1000;
    clearTimeout(carTime);
    carousel();
})
slideTime.addEventListener('change', () =>{
    window.lastSlide = parseInt(slideNum.value);
    console.log(window.lastSlide);
    slidertime = slideTime.value * 1000;
    clearTimeout(carTime);
    carousel();
})


window.onload = carousel;