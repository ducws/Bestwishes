document.addEventListener("DOMContentLoaded", function() {
    var images = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg", "images/7.jpg"];
    var currentImageIndex = 0;

    function showImage(imageIndex) {
        var imageElement = document.getElementById("image");
        imageElement.src = images[imageIndex];
        imageElement.style.display = "block"; // Show image when button is clicked
    }

    function showNextButton() {
        var nextButton = document.getElementById("nextButton");
        if (nextButton) {
            nextButton.style.display = currentImageIndex < images.length - 1 ? "inline-block" : "none";
        }
    }

    function hidePreviousButton() {
        var previousButton = document.getElementById("previousButton");
        if (previousButton) {
            previousButton.style.display = currentImageIndex > 0 ? "inline-block" : "none";
        }
    }

    for (var i = 0; i < images.length; i++) {
        var button = document.createElement("button");
        button.id = "button_" + i;
        button.textContent = "Click here " + (i === 0 ? "first" : "next");
        button.style.display = i === 0 ? "inline-block" : "none";
        button.addEventListener("click", (function(index) {
            return function() {
                if (index === 0) {
                    var audio = new Audio('mp3/openarm.mp3');
                    audio.loop = true;
                    audio.play();
                    this.style.display = "none"; // Hide the "Click here first" button when clicked
                }
                showImage(index);
                currentImageIndex = index;
                showNextButton();
                hidePreviousButton();
            };
        })(i));
        document.getElementById("buttonContainer").appendChild(button);
    }

    // Create "Show Previous" button
    var previousButton = document.createElement("button");
    previousButton.id = "previousButton";
    previousButton.textContent = "Show Previous";
    previousButton.style.display = "none";
    previousButton.addEventListener("click", function() {
        currentImageIndex = Math.max(0, currentImageIndex - 1);
        showImage(currentImageIndex);
        showNextButton();
        hidePreviousButton();
    });
    document.getElementById("buttonContainer").appendChild(previousButton);

    // Create "Show Next" button
    var nextButton = document.createElement("button");
    nextButton.id = "nextButton";
    nextButton.textContent = "Show Next";
    nextButton.style.display = "none";
    nextButton.addEventListener("click", function() {
        currentImageIndex = Math.min(currentImageIndex + 1, images.length - 1);
        showImage(currentImageIndex);
        showNextButton();
        hidePreviousButton();
    });
    document.getElementById("buttonContainer").appendChild(nextButton);
});
