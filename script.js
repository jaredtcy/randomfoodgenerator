document.addEventListener('DOMContentLoaded', () => {
    // Load the stored food list when the page loads
    loadFoodList();
});

document.getElementById('saveButton').addEventListener('click', function() {
    // Get the input value
    const foodInput = document.getElementById('foodInput').value;
    
    // Split the input into an array of food options
    const foodOptions = foodInput.split(',').map(item => item.trim()).filter(item => item.length > 0);
    
    if (foodOptions.length > 0) {
        // Store the food options in localStorage
        localStorage.setItem('foodList', JSON.stringify(foodOptions));
        document.getElementById('result').textContent = 'Food list saved successfully!';
    } else {
        document.getElementById('result').textContent = 'Please enter some food options.';
    }
});

document.getElementById('generateButton').addEventListener('click', function() {
    // Retrieve the stored food options
    const storedFoodList = localStorage.getItem('foodList');
    
    if (storedFoodList) {
        // Parse the stored food options
        const foodOptions = JSON.parse(storedFoodList);
        
        // Check if there are any valid options
        if (foodOptions.length > 0) {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * foodOptions.length);
            
            // Display the result
            document.getElementById('result').textContent = `You should eat: ${foodOptions[randomIndex]}`;
        } else {
            document.getElementById('result').textContent = 'No food options available.';
        }
    } else {
        document.getElementById('result').textContent = 'No food list found. Please save a food list first.';
    }
});

function loadFoodList() {
    // Retrieve the stored food options
    const storedFoodList = localStorage.getItem('foodList');
    
    if (storedFoodList) {
        // Parse the stored food options
        const foodOptions = JSON.parse(storedFoodList);
        
        if (foodOptions.length > 0) {
            // Optionally, you could display the list or use it as needed
            document.getElementById('result').textContent = 'Food list loaded successfully!';
        }
    }
}
