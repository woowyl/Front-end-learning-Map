var parser = require("./parser");

module.exports = function(source, map) {
    console.log(source);
    console.log(parser.parseHTML(source));
    console.log("my loader is running  ........", this.resourcePath);
    return "";
}