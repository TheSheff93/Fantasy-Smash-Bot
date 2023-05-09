//retrieves a character from the databse 
//^getcharacter id/name <id/name>
function callback(message){

    //connect to the database
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./commands/Database/FantasySmashball', sqlite3.OPEN_READWRITE, (err) => {
    if(err){
        return console.error(err.message);
    }
    });
    var sql = "";
    var queryValue;
    try{
        let command = message.content.substring(1).split(' ');
        switch(command[1]){
            case "id":
                sql = `SELECT char_id as ID, char_name as name FROM t_Character
                WHERE char_id = ?`
                queryValue = parseInt(command[2])
                break;
            case "name":
                queryValue = "";
                sql = `SELECT char_id as ID, char_name as name FROM t_Character
                WHERE char_name = ?`
                for(i = 2; i < command.length; i++){
                    queryValue += command[i];
                }
                break;
            default:
                message.reply("command variant not recognized")
                return;
        }
    }
    catch(err){
        console.log(err.message)
        message.reply("something went wrong while trying to parse that message")
        db.close();
    }
    db.all(sql, [queryValue], (err, rows) =>{
        if(err){
            console.log(err.message);
            message.reply("ah shit, that went hella wrong fr fr on god no cap")
            return;
        }
        if(rows.length == 1){
            rows.forEach((row) => {
                message.reply("\`\`\`\n"+row.ID + " "+ row.name+"\n\`\`\`")
            })
        }
        else if(rows.length > 1){
            message.reply("oh hell nah, how the fuck did you get 2 rows from that query")
        }
        else{
            message.reply("ah that bitch EMPTY")
        }
    });
}

module.exports = callback;