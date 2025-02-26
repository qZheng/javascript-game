/**
 * 
 */

document.addEventListener("DOMContentLoaded", function() {
    let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
    document.getElementById('coin-count').textContent = coinCount;
    
    let currentRound = 1;
    let roundScore = 0;
    
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeButton = document.querySelector('.close-button');
    
    helpButton.addEventListener('click', () => {
        helpModal.style.display = 'block';
    });
    
    closeButton.addEventListener('click', () => {
        helpModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Function to initialize the game by setting up the game elements and starting the first round
    function initGame() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer || !gameContainer.querySelector('.choice-container')) {
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = `
                <h2>Which mob drops this?</h2>
                <div id="game-info">
                    <span>Round: <span id="round-count">1</span>/5</span>
                </div>
                <div class="drop-container">
                    <!-- Drop will be pictured here. -->
                </div>
                <div class="choice-container">
                    <!-- The game elements will be added here via JavaScript -->
                </div>
            `;
        }
        
        document.getElementById('round-count').textContent = currentRound;
        
        const container = document.querySelector(".choice-container");
        const dropContainer = document.querySelector(".drop-container");
        container.innerHTML = '';
        dropContainer.innerHTML = '';
        
        const existingResult = document.getElementById('result-message');
        if (existingResult) {
            existingResult.remove();
        }

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
        
        const dropImages = [
            "porkchop.png",      // pig.png  
            "ghast_tear.png",    // ghast.png  
            "feather.png",       // chicken.png  
            "wool.png",          // sheep.png  
            "gunpowder.png",     // creeper.png  
            "ender_pearl.png",   // enderman.png  
            "rotten_flesh.png",  // zombie.png  
            "bones.png",         // skeleton.png  
            "string.png",        // spider.png  
            "slimeball.png",     // slime.png  
            "blaze_rod.png",     // blaze.png  
            "potion.png",        // witch.png  
            "leather.png",       // cow.png  
            "fish_drop.png",     // fish.png  
            "ink_sack.png"       // squid.png  
        ];
        /**
        Function to get random images without duplicates.

        @param {number} num - The number of random images to get.
        @returns {number[]} An array of random indexes.
        */
        function getRandomImages(num) {
            const selectedIndexes = [];
            
            while (selectedIndexes.length < num) {
                const randomIndex = Math.floor(Math.random() * mobImages.length);
                
                if (!selectedIndexes.includes(randomIndex)) {
                    selectedIndexes.push(randomIndex);
                }
            }
            
            return selectedIndexes;
        }

        const randomIndexes = getRandomImages(5);
        
        // Chooses one of the selected mobs to be the correct answer
        const correctAnswerIndex = Math.floor(Math.random() * randomIndexes.length);
        const correctMobIndex = randomIndexes[correctAnswerIndex];
        
        // Gets the corresponding drop image for the correct mob
        const correctDropImage = dropImages[correctMobIndex];
        const correctMobName = mobImages[correctMobIndex].replace('.png', '');
        
        // Display the drop image
        const dropImgElement = document.createElement("img");
        dropImgElement.src = `images/${correctDropImage}`;
        dropImgElement.alt = `Drop item`;
        dropImgElement.classList.add("drop-image");
        dropContainer.appendChild(dropImgElement);

        // Function to handle correct answer by creating a result message and updating the score
        function handleCorrectAnswer() {

            const resultMessage = document.createElement("div");
            resultMessage.id = "result-message";
            resultMessage.textContent = "Correct! +1 Coin";
            resultMessage.classList.add("correct-message");
            
            container.parentNode.insertBefore(resultMessage, container.nextSibling);
            
            coinCount++;
            roundScore++;
            document.getElementById('coin-count').textContent = coinCount;
            localStorage.setItem('coinCount', coinCount);
            
            const allMobs = document.querySelectorAll('.game-animal');
            allMobs.forEach(mob => {
                mob.style.pointerEvents = 'none';
            });
            
            if (currentRound >= 5) {
                setTimeout(() => {
                    showFinalScore();
                }, 1500);
            } else {
                currentRound++;
                setTimeout(() => {
                    initGame();
                }, 1500);
            }
        }
        
        // Function to show final score and play again button
        function showFinalScore() {
            // Clear game container
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '';
            
            // Create final score display
            const finalScoreDiv = document.createElement('div');
            finalScoreDiv.id = 'final-score';
            finalScoreDiv.innerHTML = `
                <h2>Game Over!</h2>
                <p>Your final score: ${roundScore} out of 5</p>
                <p>Total coins: ${coinCount}</p>
                <button id="play-again">Play Again</button>
            `;
            
            gameContainer.appendChild(finalScoreDiv);
            
            // Add event listener to play again button - using a separate step to ensure it's attached
            setTimeout(() => {
                const playAgainButton = document.getElementById('play-again');
                if (playAgainButton) {
                    playAgainButton.addEventListener('click', function() {
                        console.log("Play Again clicked!");
                        currentRound = 1;
                        roundScore = 0;
                        initGame();
                    });
                } else {
                    console.error("Play Again button not found!");
                }
            }, 100); // Small delay to ensure DOM is updated
        }

        // Insert mob images into the container based on the random indexes
        randomIndexes.forEach(index => {

            const containerDiv = document.createElement("div");
            containerDiv.classList.add("game-animal");
            
            const imgElement = document.createElement("img");
            imgElement.src = `images/${mobImages[index]}`;
            imgElement.alt = `Animal ${index + 1}`;  // Alt text for accessibility guidelines
            
            // Adds the mob name as a data attribute for reference
            containerDiv.dataset.mobName = mobImages[index].replace('.png', '');
            
            containerDiv.addEventListener("click", () => {
                console.log(`You clicked on: ${containerDiv.dataset.mobName}`);
                
                // Checks if this is the correct mob for the displayed drop
                if (containerDiv.dataset.mobName === correctMobName) {
                    console.log("Correct answer!");
                    containerDiv.classList.add("correct-answer");
                    handleCorrectAnswer();
                } else {
                    console.log("Wrong answer!");
                    containerDiv.classList.add("wrong-answer");
                    
                    const resultMessage = document.createElement("div");
                    resultMessage.id = "result-message";
                    resultMessage.textContent = "Incorrect!";
                    resultMessage.classList.add("incorrect-message");
                    
                    // Adds result message after the choice container
                    container.parentNode.insertBefore(resultMessage, container.nextSibling);
                    
                    const allMobs = document.querySelectorAll('.game-animal');
                    allMobs.forEach(mob => {
                        mob.style.pointerEvents = 'none';
                    });
                    
                    if (currentRound >= 5) {
                        setTimeout(() => {
                            showFinalScore();
                        }, 1500);
                    } else {
                        currentRound++;
                        setTimeout(() => {
                            initGame();
                        }, 1500);
                    }
                }
            });
            
            containerDiv.appendChild(imgElement);
            container.appendChild(containerDiv);
        });
    }
    
    initGame();
});
