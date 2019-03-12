let coffeeUrl = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders'

// let emailsArray = [];

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
    let emails = localStorage.getItem('emails');
    
    return emails;
}

// getEmail(coffeeUrl);


function main() {
    let emails = loadEmails();
    // if the emails are already stored in localStorage
    if (emails) {
        console.log(emails);
    }
    // otherwise get the emails from the API
    else {
        console.log('No emails in local storage yet')
        getEmail(coffeeUrl);
    }


}

main();