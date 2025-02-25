document.addEventListener("DOMContentLoaded", function() {
    const gameAnimals = document.querySelectorAll(".game-animal");

    gameAnimals.forEach(animal => {
        animal.addEventListener("click", () => {
            console.log(`You clicked on: ${animal.alt}`);
        });
    });

    const imageFilenames = [
        "pig.png", "ghast.png", "chicken.png", "sheep.png", "image5.jpg", 
        "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg", 
        "image11.jpg", "image12.jpg", "image13.jpg", "image14.jpg", "image15.jpg"
    ];

    function getRandomImages(num) {
        const selectedIndexes = [];
        
        // Keep generating random numbers until we have 5 unique ones
        while (selectedIndexes.length < num) {
            const randomIndex = Math.floor(Math.random() * imageFilenames.length);
            
            // Check if the number is already selected
            if (!selectedIndexes.includes(randomIndex)) {
                selectedIndexes.push(randomIndex);
            }
        }
        
        return selectedIndexes;
    }

    // Select 5 random images without duplicates
    const randomIndexes = getRandomImages(5);

    // Select the container to display images
    const container = document.querySelector(".choice-container");

    // Insert images into the container based on the random indexes
    randomIndexes.forEach(index => {
        const imgElement = document.createElement("img");
        imgElement.src = `images/${imageFilenames[index]}`;  // Image file path
        imgElement.alt = `Animal ${index + 1}`;  // Alt text for accessibility
        imgElement.classList.add("game-animal");  // Add class for styling

        // Append the image to the container
        container.appendChild(imgElement);
    });
});