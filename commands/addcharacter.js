//^addcharacter <id> <character name>
//Used to add a character to the database using <id> as the id (needs to be unique) and <character name> as character name (not necessarily unique)
function callback(message){

    //connect to the database
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./commands/Database/FantasySmashball', sqlite3.OPEN_READWRITE, (err) => {
    if(err){
        return console.error(err.message);
    }
    });

    message.reply("Yeah this worked I guess, fucking nerd")
    let command = message.substring(1).split(' ');
    //parse id
    var char_id = parseInt(command[1]);
    //parse out the name of the character
    var characterName = "";
    for(i = 2; i < command.length; i++){
        characterName += command[i];
    }
    db.run(`INSERT INTO t_Character(char_id, char_name) VALUES(?)`, [char_id, characterName], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    db.close();
}


module.exports = callback;