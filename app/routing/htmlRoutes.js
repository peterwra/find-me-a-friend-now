// Require path
var path = require("path");

// Exports
module.exports = function (app) {

    // User has requested the survey
    app.get("/survey", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Anything else requested send home page
    app.get("*", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/home.html"));
    });

}