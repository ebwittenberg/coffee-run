let coffeeUrl = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders'

function getEmail(url) {
    // returns a promise
    fetch(url)
        // convert that promise to json
        .then(function(response) {
            return response.json()
        })
        // take that promise, call accumulate emails
        .then(accumulateEmails)
}

// take the emails received from the API, and do something with them
function accumulateEmails(emailData) {
    console.log(emailData);
    // store each email (which is each object's key) in emails
    let coffeeData = emailData;

    storeEmails(coffeeData);
}


function storeEmails(array) {
    // turn array of emails into JSON text format
    const jsonCoffeeData = JSON.stringify(array);
    console.log(`Saving ${array.length} emails`);
    // save json formatted emails in localStorage
    localStorage.setItem('coffee-data', jsonCoffeeData);

    main();
}

function loadCoffeeData() {
    let jsonCoffeeData = localStorage.getItem('coffee-data');
    const emails = JSON.parse(jsonCoffeeData);

    
    return emails;
}

function drawEmail(object) {
    // console.log(object);
    // points to unordered list in HTML
    const listUl = document.querySelector('[data-list]');
    // creates list element
    let li = document.createElement('li');
    // gives li text content of email address value in object
    li.textContent = object.emailAddress;

    li.addEventListener('click', function() {
        drawDetails(object);
    });
    listUl.append(li);


}

function drawDetails(object) {
    console.log(object.emailAddress);
    let detailsDiv = document.querySelector('[data-details]');
    detailsDiv.textContent = '';
    console.log(detailsDiv);
    const emailDiv = document.createElement('div');
    const idDiv = document.createElement('div');
    const coffeeDiv = document.createElement('div');
    const sizeDiv = document.createElement('div');
    const flavorDiv = document.createElement('div');
    const strengthDiv = document.createElement('div');

    emailDiv.textContent = `Email: ${object.emailAddress}`;
    idDiv.textContent = `ID: ${object._id}`;
    coffeeDiv.textContent = `Coffee: ${object.coffee}`;
    sizeDiv.textContent = `Size: ${object.size}`;
    flavorDiv.textContent = `Flavor: ${object.flavor}`;
    strengthDiv.textContent = `Strength: ${object.strength}`;

    detailsDiv.append(emailDiv);
    detailsDiv.append(idDiv);
    detailsDiv.append(coffeeDiv);
    detailsDiv.append(sizeDiv);
    detailsDiv.append(flavorDiv);
    detailsDiv.append(strengthDiv);
    


}


function main() {
    let coffeeData = loadCoffeeData();
    // if the coffee data is already stored in localStorage
    if (coffeeData) {
        const emails = Object.keys(coffeeData);
        // append the email list into its container on the page
        emails.forEach(function(email) {
            drawEmail(coffeeData[email]);
        })
    }
    // otherwise get the emails from the API
    else {
        console.log('No emails in local storage yet')
        getEmail(coffeeUrl);
    }


}

main();