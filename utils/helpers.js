const Handlebars = require('../server');

function getSessionUser(sessionUserID){
    return sessionStorage.getItem('userID')
    
    }

    function setSessionStorage(email) {
        // sessionStorage.setItem('login', '{email}');  
        
    };

    module.exports = setSessionStorage;
   