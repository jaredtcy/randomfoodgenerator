// app.js

// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP74yHtSWFEnlskxUTfczXbYo20zw4ucU",
    authDomain: "fooditem-5b8ae.firebaseapp.com",
    projectId: "fooditem-5b8ae",
    storageBucket: "fooditem-5b8ae.appspot.com",
    messagingSenderId: "134587137502",
    appId: "1:134587137502:web:682f088e661ade80c7314f"
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
        foodList.appendChild(li);
    });
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
