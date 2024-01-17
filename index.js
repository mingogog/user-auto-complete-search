/**
 * 
 * @param input - string input from searchInput 
 * @return array of names that matched
 */
function filterUserNames(input) {
    return users.filter(userName =>
        // compare user name with input, case-insensitive
        userName.substring(0, input.length).toUpperCase() == input.toUpperCase()
    );
}

/**
 * handle search action
 */
function handleSearch() {
    clearAutoCompleteList() // reset autocomplete list
    currentFocus = -1 // reset currentFocus
    const searchInput = document.getElementById("searchInput"); // get seacrh input element
    const inputText = searchInput.value // get input string
    if (inputText.trim() !== "") { // trim input
        const filteredNames = filterUserNames(inputText); // get matched user name array
        // create autocomplete list wrapper
        const autocompleteList = document.createElement("div");
        autocompleteList.setAttribute("id", "autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");
        // append to dom under autocomplete div
        document.getElementById("autocomplete").appendChild(autocompleteList);
        // loop through matched username, create a dom element and append to autocomplete list
        filteredNames.forEach(name => {
            // create a dom element
            const listItem = document.createElement("DIV");
            // bold the matched prefix
            listItem.innerHTML = "<strong>" + name.substring(0, inputText.length) + "</strong>";
            listItem.innerHTML += name.substring(inputText.length)
            listItem.innerHTML += "<input type='hidden' value='" + name + "'>";      
            // handle mouse click event on the listItem
            listItem.addEventListener("click", function(e) {
                // set searchInput value be the value of the clicked listitem 
                searchInput.value = this.getElementsByTagName("input")[0].value
                clearAutoCompleteList() //reset autocomplete list
            })
            // append listItem element to autocomplete list
            autocompleteList.appendChild(listItem);
        });
    }
}

/**
 * remove autocomplete list
 */
function clearAutoCompleteList() {
    // get element
    const autocompleteList = document.getElementById("autocomplete-list")
    // remove element from dom
    autocompleteList?.remove()
}

/**
 * delaying the execution of a function
 * @param func - callback function
 * @param delay - millisecond
 * @returns 
 */
function debounce(func, delay) {
    let timeoutId;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId) // clear previous timeout
        // execute function after delay millisecond
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * 
 * @param autocompleteList - autocomplete list
 */
function addActive(autocompleteList) {
    if (!autocompleteList || autocompleteList.length === 0) return false;
    removeActive(autocompleteList); // remove active class in each listItem
    // update currentFocus
    if (currentFocus >= autocompleteList.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (autocompleteList.length - 1);
    // add active class to currentFocus listItem
    autocompleteList[currentFocus].classList.add("autocomplete-active");
}

/**
 * 
 * @param autocompleteList - autocomplete list
 */
function removeActive(listItem) {
    for (var i = 0; i < listItem.length; i++) {
        // remove class "autocomplete-active" from listitem
        listItem[i].classList.remove("autocomplete-active");
    }
}

// use debounce for handleSearch, delay for 300 millisecond
// reduce function call
const debouncedSearch = debounce(handleSearch, 300);
document.getElementById("searchInput").addEventListener("input", debouncedSearch)

// handle keydown event in the searchInput element
document.getElementById("searchInput").addEventListener("keydown", function(e) {
    var autocompleteList = document.getElementById("autocomplete-list");
    if (autocompleteList) autocompleteList = autocompleteList.getElementsByTagName("div");
    // update currentFocus by arrowdown and arrowup pressed
    if (e.key == "ArrowDown") {
      currentFocus++;
      addActive(autocompleteList);
    } else if (e.key == "ArrowUp") {
      e.preventDefault(); // prevent input pointer move to the starting point
      currentFocus--;
      addActive(autocompleteList);
    } else if (e.key == "Enter") {
      // handle enter click
      e.preventDefault();
      if (currentFocus > -1) {
        if (autocompleteList) autocompleteList[currentFocus].click();
      }
    }
});
let currentFocus;
const users = [
    "John Doe",
    "Jane Doe",
    "Robert Smith",
    "Alice Johnson",
    "David Brown",
    "Emily Davis",
    "Michael Wilson",
    "Sophia Taylor",
    "Matthew Anderson",
    "Olivia Garcia",
    "Daniel Martinez",
    "Emma Robinson",
    "Christopher Hernandez",
    "Ava White",
    "William Lee",
    "Isabella Hall",
    "Alexander Turner",
    "Ella Harris",
    "Joshua Martin",
    "Mia Thompson",
    "Liam Baker",
    "Sophie Carter",
    "Jackson Reed",
    "Emma Hayes",
    "James Foster",
    "Charlotte Murphy",
    "Logan Bell",
    "Grace Cooper",
    "Caleb Ward",
    "Amelia Evans",
    "Ethan Powell",
    "Lily Price",
    "Daniel Brooks",
    "Madison Simmons",
    "Benjamin Reed",
    "Chloe Martinez",
    "Carter Wright",
    "Zoe Rodriguez",
    "Henry Butler",
    "Aria Miller",
    "Jack Simmons",
    "Scarlett Hill",
    "Samuel Mitchell",
    "Avery Johnson",
    "Layla Ross",
    "Leo Reed",
    "Nora Long",
    "David Adams",
    "Hazel Bennett",
    "Owen Turner",
    "Peyton Murphy",
    "Gabriel Wilson",
    "Stella Robinson",
    "Dylan King",
    "Ellie Price",
    "Christopher Moore",
    "Addison Flores",
    "Andrew Sanders",
    "Aubrey Peterson",
    "Nicholas Hayes",
    "Brooklyn Thomas",
    "Nathan King",
    "Leah Morgan",
    "Brandon Bell",
    "Penelope Perry",
    "Justin Wood",
    "Sofia Cox",
    "Christian Evans",
    "Aaliyah Ward",
    "Isaac Brooks",
    "Madelyn Young",
    "Cameron Martinez",
    "Ariana White",
    "Elijah Davis",
    "Clara Edwards",
    "Gabriel Rogers",
    "Eva Taylor",
    "Julian Harris",
    "Ellie Scott",
    "Colton Hall",
    "Alyssa Mitchell",
    "Tyler Garcia",
    "Lucy Turner",
    "Isaiah Phillips",
    "Anna Allen",
    "Adam Rodriguez",
    "Maria Foster",
    "Xavier Bryant",
    "Luna Powell",
    "Zachary Wright",
    "Maya Cox",
    "Anthony Robinson",
    "Violet Murphy",
    "Joseph Ward",
    "Ruby Lee",
    "Isaiah Collins",
    "Aurora Foster",
    "Luke Richardson",
    "Hannah Murphy",
    "Brandon Evans",
    "Eleanor Bennett",
    "Christopher Perry",
    "Paisley Turner",
    "Matthew Ward",
    "Aria Edwards"
];