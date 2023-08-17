
const fs = require('fs');


function iscrizione(ID, nome) {


    var PV = 1.00;
    var PA = 0.10;
    var PD = 0.10;
    var EXP = 0.00;
    var EXP_cache = 0.00;
    var dati = nome + "\n" + PV + "\n" + PA + "\n" + PD + "\n" + EXP + "\n" + EXP_cache;
   

    


    var _file = 'PERSONAGGI/' + ID + '.txt'


    fs.access(_file, fs.constants.F_OK, (err) => {

       

        if (err) {
            console.error('File does not exist');

            fs.writeFile(_file, dati, err => {
                if (err) {
                    console.error(err);
                }
                
            });


            fs.access(_file, fs.constants.F_OK, (err) => {

                if (err)
                    
                 console.error('File does not exist');
              //  bot.sendMessage(msg.chat.id, NO);

               else {

                   // bot.sendMessage(msg.chat.id, OK)
                }
            });
        }
        else {
          //  bot.sendMessage(msg.chat.id, NO)
           
        }
    });

}


module.exports = { iscrizione };