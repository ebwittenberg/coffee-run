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
    let emails = Object.keys(emailData);

    storeEmails(emails);
}


function storeEmails(array) {
    // turn array of emails into JSON text format
    const jsonEmails = JSON.stringify(array);
    console.log(`Saving ${array.length} emails`);
    // save json formatted emails in localStorage
    localStorage.setItem('emails', jsonEmails);
}

function loadEmails() {
    let jsonEmails = localStorage.getItem('emails');
    const emails = JSON.parse(jsonEmails);

    
    return emails;
}

function createEmail(address) {
    // points to unordered list in HTML
    const listUl = document.querySelector('[data-list]');
    console.log(listUl);
    // creates list element
    let li = document.createElement('li');
    li.textContent = address;
    console.log(li);
    listUl.append(li);


}


function main() {
    let emails = loadEmails();
    // if the emails are already stored in localStorage
    if (emails) {
        // append the email list into its container on the page
        emails.forEach(function(email) {
            createEmail(email);
        })
    }
    // otherwise get the emails from the API
    else {
        console.log('No emails in local storage yet')
        getEmail(coffeeUrl);
    }


}

main();