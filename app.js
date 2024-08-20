// app.js

// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUb1GlHsZMvwchOrmlPghDVO2gGsZf0u8",
    authDomain: "fooditem-69b01.firebaseapp.com",
    projectId: "fooditem-69b01",
    storageBucket: "fooditem-69b01.appspot.com",
    messagingSenderId: "358842978212",
    appId: "1:358842978212:web:beda2fd08081feeb26bb31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add event listeners for buttons
document.getElementById('addFoodButton').addEventListener('click', addFood);
document.getElementById('generateRandomFoodButton').addEventListener('click', generateRandomFood);

// Add food item to the Firestore database
async function addFood() {
    const foodItem = document.getElementById('foodInput').value.trim();
    if (foodItem) {
        try {
            await addDoc(collection(db, 'foods'), {
                name: foodItem,
                timestamp: serverTimestamp()
            });
            document.getElementById('foodInput').value = '';
            loadFoods();  // Refresh the list of foods
        } catch (error) {
            console.error("Error adding food: ", error);
        }
    }
}

// Load food items from Firestore and display them
async function loadFoods() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, 'foods'));
    querySnapshot.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = doc.data().name;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        // Apply the small-button CSS class
        removeButton.classList.add('small-button');
        removeButton.addEventListener('click', () => removeFood(doc.id));

        li.appendChild(removeButton);
        foodList.appendChild(li);
    });
}

// Remove food item from Firestore
async function removeFood(id) {
    try {
        await deleteDoc(doc(db, 'foods', id));
        loadFoods();  // Refresh the list of foods
    } catch (error) {
        console.error("Error removing food: ", error);
    }
}

// Generate a random food item from the list
async function generateRandomFood() {
    const querySnapshot = await getDocs(collection(db, 'foods'));
    const foods = querySnapshot.docs.map(doc => doc.data().name);
    if (foods.length > 0) {
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        document.getElementById('randomFood').textContent = randomFood;
    } else {
        document.getElementById('randomFood').textContent = 'No food items available.';
    }
}

// Initial load
loadFoods();
