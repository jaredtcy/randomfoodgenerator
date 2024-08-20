document.getElementById('generateButton').addEventListener('click', function() {
    // Get the input value
    const foodInput = document.getElementById('foodInput').value;
    
    // Split the input into an array of food options
    const foodOptions = foodInput.split(',').map(item => item.trim()).filter(item => item.length > 0);
    
    // Check if there are any valid options
    if (foodOptions.length > 0) {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * foodOptions.length);
        
        // Display the result
        document.getElementById('result').textContent = `You should eat: ${foodOptions[randomIndex]}`;
    } else {
        // Display an error message if the input is empty or invalid
        document.getElementById('result').textContent = 'Please enter some food options.';
    }
});
