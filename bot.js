/**
 * ROBOBOT
 */

process.env["NTBA_FIX_350"] = 1;

const ID_FDT = -1001103213994;

const token = 'SUCCHIAMELO';

const TelegramBot = require('node-telegram-bot-api');

const schedule = require('node-schedule');

const DDG = require('duck-duck-scrape');

const bot = new TelegramBot(token, { polling: true });

const fs = require('fs');

const is = require('./iscrizione');

const COMB = require('./COMBATTIMENTO');

var Jimp = require('jimp');

const rule = new schedule.RecurrenceRule();

let foto_qery_ris = '';

let timeCheck = true;

let ID_GENERICO = ['', ''];

let notizie = '';

const delay = 500;

let contatore = 0;

const TMP_IMG = "tmp_pic/a.jpg";

let ID_TMP_FOTO_QUOTA = 0;


/**

*/


bot.on("polling_error", console.log);





//MESSAGGI AUTOMATICI TODO: AGGIUSTARLI
/** 
bot.on('message', (msg) => {

    if (msg.from.first_name == 'f') {
        if (ID_GENERICO[0] == '') {

            ID_GENERICO[0] = msg.chat.id;
        } else {
            ID_GENERICO[1] = msg.chat.id;
        }
    }


    rule.hour = 19;

    const job = schedule.scheduleJob(rule, function () {


        contatore = 0;
        notizie = '';
        bot.sendChatAction(ID_GENERICO[0], "typing")

        if (ID_GENERICO[1] != '') {
            bot.sendChatAction(ID_GENERICO[1], "typing")
        }
        setTimeout(() => {

            const http = require('https');

            const file = fs.createWriteStream("xml/news.xml");

            const request =
                http.get("https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml",
                    function (response) {
                        response.pipe(file);

                        // after download completed close filestream
                        file.on("finish", () => {
                            file.close();
                            console.log("Download Completed");

                            fs.readFile('xml/news.xml', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                var lines = data.split('\n');



                                // var str = data.match(/<title>([^<]*)<\/title>/);
                                console.log(lines.length)
                                for (let step = 0; step < lines.length; step++) {

                                    var str = lines[step].match(/<title><!\[CDATA\[(.*)]]><\/title>/);

                                    if (str != null) {

                                        notizie += ('🗞 - ' + str[1] + '\n');
                                        if (contatore >= 4) {
                                            contatore = 0;
                                            break;
                                        }
                                        contatore++;
                                    }
                                }


                                var tempo = new Date()
                                var print = tempo.getHours() + ' : ' + tempo.getMinutes();



                                bot.sendMessage(ID_GENERICO[0], 'Sono le - ' + print +
                                    ' - notizie dell\'ultima ora!\nGIAMBO SUCA!\n' +
                                    notizie);
                                if (ID_GENERICO[1] != '' && ID_GENERICO[0] != ID_GENERICO[1]) {
                                    bot.sendMessage(ID_GENERICO[1], 'Sono le - ' + print +
                                        ' - notizie dell\'ultima ora!\nGIAMBO SUCA!\n' +
                                        notizie);
                                }


                            });


                        });
                    });


        }, delay);
    });


});

*/
//COMANDI

//SALUTARE è IL MINIMO
bot.onText(/^ciao rob$/i, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {




        var resp = msg.text

        console.log(resp + '  :  scritto da  :  ' + msg.from.first_name)

        var risposta = 'bella ' + msg.from.first_name

        //array coso, matrice che cosa le cose

        bot.sendMessage(msg.chat.id, risposta, { reply_to_message_id: msg.message_id })




    }, delay);



});
//!WIP! IL PARLASUPER DI GIAMBO, MA MEGLIO
bot.onText(/^!parla$/i, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {



        bot.sendMessage(ID_FDT, 'Passo l\'aspirapolvere, avete sporcato tutta la ciat')




    }, delay);



});
//AGGIUNGI UNA CITAZIONE ALLA LISTA
bot.onText(/^!addquote$/i, (msg, match) => {



    if (msg.reply_to_message != null) {
        bot.sendChatAction(msg.chat.id, "typing")
        setTimeout(() => {

            var tx = '\n' + msg.reply_to_message.text + '  (' + msg.reply_to_message.from.first_name + ')'


            fs.appendFile('txt/log.txt', tx, err => {

                if (err) {
                    console.error(err)
                }

                bot.sendMessage(msg.chat.id, 'Citazione aggiunta!')

            });



        }, delay);

    }
});
//RICHIAMA UNA CITAZIONE CASUALE DALLA LISTA
bot.onText(/^!quota$/i, (msg, match) => {

    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {

        fs.readFile('txt/log.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }


            var lines = data.split('\n');

            var line = lines[Math.floor(Math.random() * lines.length)]

            bot.sendMessage(msg.chat.id, line)


        });

    }, delay);
});
//ISCRIZIONE: TODO: TRASFORMARLO IN COMANDO PER GENERARE SCHEDE NEMICI
bot.onText(/^!iscrivi$/i, (msg, match) => {
    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {
        if (msg.reply_to_message != null) {

            var _file = 'PERSONAGGI/' + msg.reply_to_message.from.id + '.txt'

            var OK = 'PROFILO PERSONAGGIO CREATO!\nMATRICOLA: ' + msg.reply_to_message.from.id +
                '\nNOME: ' + msg.reply_to_message.from.first_name + '\nHai delle stat base a cui si deve ancora pensare\ntu aspetta che questo gioco sia finito'

            var NO = 'PROFILO ESISTENTE, SEI GIA(accento) ISCRITTO\n(oppure è successo qualcosa, spè...)'

            fs.access(_file, fs.constants.F_OK, (err) => {

                console.log('\n> Checking if the file exists');
                if (err) {

                    is.iscrizione(msg.reply_to_message.from.id, msg.reply_to_message.from.first_name)

                    bot.sendMessage(msg.chat.id, OK)
                }
                else {


                    bot.sendMessage(msg.chat.id, NO)
                }
            });


        } else {



            var _file = 'PERSONAGGI/' + msg.from.id + '.txt'

            var OK = 'PROFILO PERSONAGGIO CREATO!\nMATRICOLA: ' + msg.from.id +
                '\nNOME: ' + msg.from.first_name + '\nHai delle stat base a cui si deve ancora pensare\ntu aspetta che questo gioco sia finito'

            var NO = 'PROFILO ESISTENTE, SEI GIA(accento) ISCRITTO\n(oppure è successo qualcosa, spè...)'

            fs.access(_file, fs.constants.F_OK, (err) => {

                console.log('\n> Checking if the file exists');
                if (err) {

                    is.iscrizione(msg.from.id, msg.from.first_name)

                    bot.sendMessage(msg.chat.id, OK)
                }
                else {


                    bot.sendMessage(msg.chat.id, NO)
                }
            });

        }
    }, delay);
});
//!WIP! REGOLE DEL GIUOCO
bot.onText(/^!regole$/i, (msg, match) => {
    /*
        var str = 'Quando ⚔️ ☠️ IlGioco™ ☠️ ⚔️ sarà operativo, qui verranno pubblicate le regole, nel frattempo \nlegenda: \n
    🤬 pg che attacca\n
    😠 pg che viene attaccato\n
    🗡 danni in attacco\n
    🛡 danni in difesa\n
    👨‍🎓 EXP guadagnata\n
    ❤️ PV rimanenti   
    */
    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {
        bot.sendMessage(msg.chat.id, 'Quando ⚔️ ☠️ IlGioco™ ☠️ ⚔️ sarà operativo, qui verranno pubblicate le regole, nel frattempo \nlegenda: \n 🤬 pg che attacca\n😠 pg che viene attaccato\n🗡 danni in attacco\n🛡 danni in difesa\n👨‍🎓 EXP guadagnata\n❤️ PV rimanenti ')




    }, delay);

});
//COMANDO PER ATTACCARE NEL GIUOCO: TODO: TRASFORMARLO INSIEME AGLI ALTRI #RPG
bot.onText(/^!colpisci$/i, (msg, match) => {


    if (msg.reply_to_message != null) {

        bot.sendChatAction(msg.chat.id, "typing")
        setTimeout(() => {



            var _file = 'PERSONAGGI/' + msg.reply_to_message.from.id + '.txt'
            fs.access(_file, fs.constants.F_OK, (err) => {


                if (err) {

                    is.iscrizione(msg.from.id, msg.from.first_name)

                    bot.sendMessage(msg.chat.id, 'SI DEVE ESSERE ISCRITTI PER GIOCARE')
                }
                else {

                    if (msg.from.id != msg.reply_to_message.from.id) {

                        if (msg.reply_to_message.from.id == '6383648928') {

                            if (msg.from.id == '259607683') {

                                bot.sendMessage(msg.chat.id, COMB.colpisci(msg.from.id, msg.reply_to_message.from.id));

                            }
                        }


                        if (msg.reply_to_message.from.id != '6383648928') {

                            bot.sendMessage(msg.chat.id, COMB.colpisci(msg.from.id, msg.reply_to_message.from.id));

                        } else {

                            bot.sendMessage(msg.chat.id, 'VIVO O MORTO TU VERRAI CON ME')

                        }

                    }
                }
            });


        }, delay);


    }










});
//RICHIAMA UNA SCHEDA PERSONAGGIO
bot.onText(/^!pg$/i, (msg, match) => {



    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {


        if (msg.reply_to_message == null) {



            fs.access('PERSONAGGI/' + msg.from.id + '.txt', fs.constants.F_OK, (err) => {



                if (err) {

                    bot.sendMessage(msg.chat.id, 'NON ISCRITTO!')

                }
                else {






                    fs.readFile('PERSONAGGI/' + msg.from.id + '.txt', 'utf8', (err, data1) => {

                        if (err) {

                            bot.sendMessage(msg.chat.id, 'NON ISCRITTO!')
                        }

                        var lines1 = data1.split('\n');

                        var PV1 = lines1[1]
                        var PA1 = lines1[2]
                        var PD1 = lines1[3]
                        var EXP1 = lines1[4]

                        var scheda = 'QUESTA È LA TUA SCHEDA PERSONAGGIO:\n\nMATRICOLA: ' + msg.from.id + '\nNOME: ' + msg.from.first_name +
                            '\nPUNTI VITA: ' + PV1 + '\nPUNTI ATTACCO: ' + PA1 + '\nPUNTI DIFESA: ' + PD1 + '\nESPERIENZA: ' + EXP1

                        bot.sendMessage(msg.chat.id, scheda)

                    });
                }
            });


        } else {


            fs.access('PERSONAGGI/' + msg.reply_to_message.from.id + '.txt', fs.constants.F_OK, (err) => {



                if (err) {

                    bot.sendMessage(msg.chat.id, 'NON ISCRITTO!')

                }
                else {






                    fs.readFile('PERSONAGGI/' + msg.reply_to_message.from.id + '.txt', 'utf8', (err, data1) => {

                        if (err) {

                            bot.sendMessage(msg.chat.id, 'NON ISCRITTO!')
                        }

                        var lines1 = data1.split('\n');

                        var PV1 = lines1[1]
                        var PA1 = lines1[2]
                        var PD1 = lines1[3]
                        var EXP1 = lines1[4]

                        var scheda = 'QUESTA È LA SUA SCHEDA PERSONAGGIO:\n\nMATRICOLA: ' + msg.reply_to_message.from.id + '\nNOME: ' + msg.reply_to_message.from.first_name +
                            '\nPUNTI VITA: ' + PV1 + '\nPUNTI ATTACCO: ' + PA1 + '\nPUNTI DIFESA: ' + PD1 + '\nESPERIENZA: ' + EXP1

                        bot.sendMessage(msg.chat.id, scheda)

                    });
                }
            });



        }


    }, delay);
});
//LE PRIME 5 NOTIZIE NELLA SEZIONE ULTIMA ORA DELL'ANSA
bot.onText(/^!news$/i, (msg, match) => {

    contatore = 0;
    notizie = '';
    bot.sendChatAction(msg.chat.id, "typing")

    setTimeout(() => {

        const http = require('https');

        const file = fs.createWriteStream("xml/news.xml");

        const request = http.get("https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml", function (response) {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                console.log("Download Completed");

                fs.readFile('xml/news.xml', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    var lines = data.split('\n');


                    console.log(lines.length)
                    for (let step = 0; step < lines.length; step++) {

                        var str = lines[step].match(/<title><!\[CDATA\[(.*)]]><\/title>/);

                        if (str != null) {

                            notizie += ('🗞 - ' + str[1] + '\n');
                            if (contatore >= 4) {
                                contatore = 0;
                                break;
                            }
                            contatore++;
                        }
                    }

                    bot.sendMessage(msg.chat.id, notizie)
                    console.log();

                });


            });
        });



    }, delay);


});
//PROVERBIO RANDOM 
bot.onText(/^!proverbio$/i, (msg, match) => {

    bot.sendChatAction(msg.chat.id, "typing")

    setTimeout(() => {


        fs.readFile('txt/proverbi.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }


            var lines = data.split('\n');

            var line = lines[Math.floor(Math.random() * lines.length)]

            bot.sendMessage(msg.chat.id, line)


        });


    }, delay);


});
//LISTA COMANDI BOT TODO: AUTOMATIZZARE
bot.onText(/^!bot$/i, (msg, match) => {

    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {

        bot.sendMessage(msg.chat.id, 'LISTA COMANDI\n' +
            '\n❕ADDQUOTE (aggiungi un messaggio alle citazioni)' +
            '\n❕QUOTA (richiama una citazione casuale)' +
            '\n❕NEWS (le ultime news ANSA)' +
            '\n❕METEO (il meteo di oggi)' +
            '\n❕PROVERBIO (proverbio casuale)' +
            '\n❕FOTO (cerca l\'immagine che vuoi)' +
            '\n❕RAND (immagine casuale)' +
            '\n❕COLPISCI (colpisci un avversario -IlGioco™-)' +
            '\n❕REGOLE (le regole de -IlGioco™-)' +
            '\n❕PG (richiama la tua scheda personaggio o quella di un altro giocatore)' +
            '\n❕BOT (lista comandi RoboBot™)')




    }, delay);

});
//METEO PER CORAGGIOSI
bot.onText(/^!meteo$/i, (msg, match) => {

    bot.sendChatAction(msg.chat.id, "typing")
    setTimeout(() => {


        fs.readFile('txt/meteo.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }


            var lines = data.split('\n');

            var line = lines[Math.floor(Math.random() * lines.length)]

            bot.sendMessage(msg.chat.id, line, { reply_to_message_id: msg.message_id })


        });

    }, delay);

});
//CERCA UNA FOTO SPECIFICA SUL WEB
bot.onText(/^!foto (.*)$/i, (msg, match) => {


    bot.sendChatAction(msg.chat.id, "upload_photo")

    console.log(match[1]);

    if (msg.reply_to_message == null) {

        ID_TMP_FOTO_QUOTA=msg.message_id;
    
        }else{
            ID_TMP_FOTO_QUOTA=msg.reply_to_message.message_id;
        }
    


    cerca(match[1], msg.chat.id);



});
//CERCA UNA FOTO CASUALE SUL WEB
bot.onText(/^!rand$/i, (msg, match) => {

    if (msg.reply_to_message == null) {

    ID_TMP_FOTO_QUOTA=msg.message_id;

    }else{
        ID_TMP_FOTO_QUOTA=msg.reply_to_message.message_id;
    }


    bot.sendChatAction(msg.chat.id, "upload_photo")
    fs.readFile('txt/sostantivi.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }


        var lines = data.split('\n');

        var line = lines[Math.floor(Math.random() * lines.length)]


        cerca(line, msg.chat.id);


    });



});
//TRASFORMA UNA FRASE IN UNA IMMAGINE
bot.onText(/^!pic$/i, (msg, match) => {

    if (msg.reply_to_message.text != null) {
        bot.sendChatAction(msg.chat.id, "upload_photo")

        var frase = msg.reply_to_message.text;
        ID_TMP_FOTO_QUOTA = msg.message_id;
        var ran = Math.random().toFixed(7);
        ran = ran.charAt(3) + ran.charAt(4);
        console.log(ran);
        var url = " unsplash wallpapers " + ran;

        generaPIC(url, msg.chat.id, frase);
    } else { console.log('vuoto') }


});


//FUNZIONI ASINCRONE


async function cerca(testo, id) {

    
    var risultato = 0;
    var trovato = false;
    if (testo != '') {

        const searchResults = await DDG.searchImages(testo, {
            safeSearch: DDG.SafeSearchType.STRICT
        });


        while (!trovato) {
            bot.sendChatAction(id, "upload_photo")

            const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
            await Jimp.read(searchResults.results[risultato].image)
                .then((image) => {

                    // image.print(font, 10, 10, 'immagine generata da')
                    //image.print(font, 10, 100, 'Il bot di Gengiva')
                    image.print(font, 10, 200, testo)
                    console.log('cercato ' + testo)
                    image.write(TMP_IMG)
                    trovato = true;
                })
                .catch((err) => {
                    risultato++
                    trovato = false;
                    console.log('questo no - ne provo altri')
                });
        }

        InviaFotoDelay(id, TMP_IMG)



    }


}

async function generaPIC(testo, id, frase) {


   

    var risultato = 0;
    var trovato = false;
    if (testo != '') {

        const searchResults = await DDG.searchImages(testo, {
            safeSearch: DDG.SafeSearchType.STRICT
        });


        while (!trovato) {
            bot.sendChatAction(id, "upload_photo")
            const font = await Jimp.loadFont('fonts/zp100.fnt');
            await Jimp.read(searchResults.results[risultato].image)
                .then((image) => {

                    //  image.print(font, 10, 10, 'immagine generata da')
                    // image.print(font, 10, 100, 'Il bot di Gengiva')
                    image.print(font, 10, 200, frase)
                    //console.log('cercato ' + frase)
                    image.write(TMP_IMG)
                    trovato = true;
                })
                .catch((err) => {
                    risultato++
                    trovato = false;
                    console.log('aaaa')
                });
        }

        InviaFotoDelay(id, TMP_IMG)



    }


}

async function InviaFotoDelay(id, file) {
    

    bot.sendChatAction(id, "upload_photo")

    //inizia ad aspettare
    await sleep(delay);
    //esegue da qui in giu

    bot.sendPhoto(id, TMP_IMG, { reply_to_message_id: ID_TMP_FOTO_QUOTA })


}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/* 
bot.on('message', (msg) => {



    console.log(msg.from.id)

    

    console.log(msg.from.first_name + '  CHAT_ID:    ' + msg.chat.id)


});
**/
