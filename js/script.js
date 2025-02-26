document.addEventListener("DOMContentLoaded", function() {
    const gameAnimals = document.querySelectorAll(".game-animal");

    gameAnimals.forEach(animal => {
        animal.addEventListener("click", () => {
            console.log(`You clicked on: ${animal.alt}`);
        });
    });

    const mobImages = [
        "pig.png",        // Porkchop  
        "ghast.png",      // Ghast Tear  
        "chicken.png",    // Feather  
        "sheep.png",      // Wool  
        "creeper.png",    // Gunpowder  
        "enderman.png",   // Ender Pearl  
        "zombie.png",     // Rotten Flesh  
        "skeleton.png",   // Bones  
        "spider.png",     // String  
        "slime.png",      // Slimeball  
        "blaze.png",      // Blaze Rod  
        "witch.png",      // Random Potions  
        "cow.png",        // Leather 
        "fish.png",       // Fish
        "squid.png"       // Ink sack
    ];
    

    function getRandomImages(num) {
        const selectedIndexes = [];
        
        // Keep generating random numbers until we have 5 unique ones
        while (selectedIndexes.length < num) {
            const randomIndex = Math.floor(Math.random() * mobImages.length);
            
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
        imgElement.src = `images/${mobImages[index]}`;  // Image file path
        imgElement.alt = `Animal ${index + 1}`;  // Alt text for accessibility
        imgElement.classList.add("game-animal");  // Add class for styling

        // Append the image to the container
        container.appendChild(imgElement);
    });
});