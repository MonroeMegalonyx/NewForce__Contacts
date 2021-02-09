console.log("Welcome to the main module")

// This file builds the form to save new contacts, then fetchs and returns all contacts that are saved

// Step 1. Preparation - Get a list of current contacts and then make application to save more
let contacts = []
// Start with an empty array and then fill with the contacts already in the local server. Using function to call it later and refresh our list of contacts. We will use this function later
const getContacts = () => {
    return fetch("http://localhost:8088/contact")
        .then(response => response.json())
        .then(parsedContacts => {
            contacts = parsedContacts
        })
};

// Make a function to save a copy of the contacts and do what we want with the copy instead
const useContacts = () => {
    return contacts.slice();
};

// Step 2. Build the input form
// Save a var that is the DOM element where we will enter notes by form
const contactTarget = document.querySelector(".contact-form")

// Write the input form at that HTML target, this will print on page load wince its set in main.js
contactTarget.innerHTML = `
        <h1>So ya met someone new and want to remember that later huh?</h1>
        <p>New name: <input placeholder="Enter name here" type="text" id="contact-name"></input></p>
        <p>New email: <input placeholder="Enter their email here" type="text" id="contact-email"></input></p>
        <p>New number, who dis?: <input placeholder="Enter their phone number here" type="text" id="contact-number"></input></p>
        <button id="save-contact">Click to save</button>
        <button id="list-contact">Click to show contacts</button>
    `

console.log("The buttons are printing, but you can see that for yourself can't you")

// Step 3. Assign an action to the save button
// Make an event listener for the save button, that will take the inputed text and save to the local server
contactTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save-contact") {
        console.log("You clicked save, but I didn't do anything yet. Pffffffft")
        
        // This is the code that will run after the save button is clicked
        // Save the input text from each form to put in the local array
        let contactName = document.getElementById("contact-name").value;
        let contactEmail = document.getElementById("contact-email").value;
        let contactNumber = document.getElementById("contact-number").value;

        // Save these values in an array together that we will put in the json-server
        const newContact = {
            "name": contactName,
            "email": contactEmail,
            "number": contactNumber
        }
        console.log(newContact)
        
        // Now save the newly created array to the local server
        return fetch('http://localhost:8088/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })

    }
});

// Step 4. Assign an action to the list button
// Make an event listener for the list button, which gets all the contacts in the server and display them

contactTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "list-contact") {
        console.log("You clicked list, but I didn't do anything yet. Pffffffft")
        
        // This is the code that will run after the save button is clicked. First get the list of contacts on the server
        getContacts().then(() => {
            // Then make a copy of those contacts to use
            contacts = useContacts()
            // Now build the HTML string by looping over the contacts array and saving the values between tags
            let contactsAsHTML = "";

            for (let i = 0; i < contacts.length; i++) {
                contactsAsHTML += `<div class="contact-container"><h2>${contacts[i].name}</h2><li>${contacts[i].email}</li><li>${contacts[i].number}</li></div>`   
            }
            // Now print the HTML string to the DOM in the correct HTML target
            document.querySelector(".contact-list").innerHTML = `${contactsAsHTML}`
        })
    }
})
