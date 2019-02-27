const swagger = require('./swagger.json');
document.addEventListener('DOMContentLoaded', function () {
    console.log(swagger.info.title);
    document.title = swagger.info.title;
}, false);
