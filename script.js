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
    if (window.i <= 0) { window.i = lastSlide; }
    if (window.i > lastSlide) { window.i = 1; }

    if (!stop && window.i < lastSlide + 1) {
        /**
         * adapt slider if the image is jpg, jpeg or png
         */
        // let i = window.i;
        let file1 = doesFileExist(`/imgs/${window.i}.png`);

        // console.log("file 1", file1)
        // console.log("file 2", file2)

        if (file1) { carImg.setAttribute('src', '/imgs/' + window.i + '.png'); }
        else {
            let file2 = doesFileExist(`/imgs/${window.i}.jpeg`);
            let file3 = doesFileExist(`/imgs/${window.i}.jpg`);

            if (file2) { carImg.setAttribute('src', '/imgs/' + window.i + '.jpeg'); }
            if (file3) { carImg.setAttribute('src', '/imgs/' + window.i + '.jpg'); }

        }

        window.i = window.i + 1;
        console.log('i++', i);
        carTime = setTimeout(carousel, slidertime);
    }



}



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


function stopSlider() {
    stop = !stop;
    clearTimeout(carTime);
    carousel();

}

function perviousSlide() {
    if (stop == true) { stop = false; }
    // console.log('stio changed to   ', stop);
    window.i = window.i - 2;
    // console.log('before if' , window.i )
    if (window.i < 1) {
        window.i = lastSlide;
        // console.log('inside if' , window.i )
        clearTimeout(carTime);
        return carousel();
    }
    //window.i= window.i - 2;
    // console.log('out if' , window.i )
    clearTimeout(carTime);
    carousel();
}

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