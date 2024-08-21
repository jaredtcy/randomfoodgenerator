// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
document.getElementById('categoryFilter').addEventListener('change', loadFoods);

// Add food item to the Firestore database
async function addFood() {
    const foodItem = document.getElementById('foodInput').value.trim();
    const category = document.getElementById('categoryDropdown').value;
    if (foodItem && category) {
        try {
            await addDoc(collection(db, 'foods'), {
                name: foodItem,
                category: category,
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
    
    const selectedCategory = document.getElementById('categoryFilter').value;
    let q = collection(db, 'foods');
    
    if (selectedCategory) {
        q = query(collection(db, 'foods'), where("category", "==", selectedCategory));
    }
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = `${doc.data().name} - ${doc.data().category}`;
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
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
    const selectedCategory = document.getElementById('categoryFilter').value;
    let q = collection(db, 'foods');
    
    if (selectedCategory) {
        q = query(collection(db, 'foods'), where("category", "==", selectedCategory));
    }
    
    const querySnapshot = await getDocs(q);
    const foods = querySnapshot.docs.map(doc => doc.data().name);
    if (foods.length > 0) {
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        document.getElementById('randomFood').textContent = randomFood;
    } else {
        document.getElementById('randomFood').textContent = 'No food items available.';
    }
}

// Populate category dropdowns initially and whenever categories are updated
async function populateCategoryDropdowns() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">All</option>';
    
    const querySnapshot = await getDocs(collection(db, 'foods'));
    const categories = new Set();
    
    querySnapshot.forEach((doc) => {
        categories.add(doc.data().category);
    });
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
        
        const filterOption = document.createElement('option');
        filterOption.value = category;
        filterOption.textContent = category;
        categoryFilter.appendChild(filterOption);
    });
}

// Initial load
populateCategoryDropdowns();
loadFoods();
