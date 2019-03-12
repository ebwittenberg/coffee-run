let coffeeUrl = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders'


function getEmail(url) {
    // returns a promise
    fetch(url)
        // convert that promise to json
        .then(function(response) {
            return response.json()
        })
        // take that promise, console log the data
        .then(function(emails) {
            // store emails in email array
            console.log(emails);
        })
}