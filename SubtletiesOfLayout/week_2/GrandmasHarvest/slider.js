function slide () {
    let imagePaths = document.querySelectorAll(".maket#fourth .card img");
    let result = [];

    for (let i = 0; i < imagePaths.length; i++) {
        result[i] = imagePaths[i].getAttribute("src");
    }
    
    let sliderRadio = document.querySelectorAll(".maket#fourth .slider input");
    let checkedSlider;

    for (let i = 0; i < sliderRadio.length; i++) {
        if (sliderRadio[i].checked) {
            checkedSlider = i;
            break;
        }
    }

    result = result.concat(result.splice(0, checkedSlider));
    
    for (let i = 0; i < imagePaths.length; i++) {
        imagePaths[i].setAttribute("src", result[i]);
    }
}