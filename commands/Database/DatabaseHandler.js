const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./commands/Databse/FantasySmashball', (err) => {
    if(err){
        return console.error(err.message);
    }
});



db.close();