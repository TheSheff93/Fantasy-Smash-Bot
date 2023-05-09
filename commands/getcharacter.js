//retrieves a character from the databse 
//^getcharacter <id or name>
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
        if(!parseInt(command[1],queryValue)){
            queryValue = message.content.substring(14);
            sql = `SELECT char_id as ID, char_name as name FROM t_Character
            WHERE char_name = ?`
            
               
        }
        else{
            sql = `SELECT char_id as ID, char_name as name FROM t_Character
            WHERE char_id = ?`
            queryValue = parseInt(command[1])
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