// Get our friend list data
var friendList = require("../data/friends");

// Exports
module.exports = function (app) {

    // User has issued a 'POST' request to the server
    app.post("/api/friends", function (request, response) {

        // Get the data from the body
        var newUser = request.body;

        // Sum up the scores and store in a variable to compare to the others
        var totalNewUserScore = 0;
        for (var i = 0; i < newUser.scores.length; i++) {
            totalNewUserScore += parseInt(newUser.scores[i]);
        }

        // Find the best friend from the list of potential matches
        var userFriendMatchIndex = null;
        var friendScoreDifference = null;
        for (var i = 0; i < friendList.length; i++) {
            var currentUserScore = 0;
            for (var j = 0; j < friendList[i].scores.length; j++) {
                currentUserScore += parseInt(friendList[i].scores[j]);
            }

            // Check for null or if the current score difference is less than current value and set the current best match
            var currentDifference = Math.abs(totalNewUserScore - currentUserScore)
            if (friendScoreDifference === null || currentDifference < friendScoreDifference) {
                friendScoreDifference = currentDifference;
                userFriendMatchIndex = i;
            }
        }

        // Push the new user to the list after we found a match
        friendList.push(newUser);

        // Send the best match back to the user
        response.json(friendList[userFriendMatchIndex]);

    });

    // User has issued a 'GET' API request for the friend list
    app.get("/api/friends", function (request, response) {
        response.json(friendList);
    });

}