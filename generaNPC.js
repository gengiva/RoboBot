function npc(){
    bot.sendChatAction(ID_FDT, "upload_photo")
    setTimeout(() => {
        bot.sendChatAction(ID_FDT, "upload_photo")
        const http = require('https');

        const file = fs.createWriteStream("html/faces.html");

        const request = http.get("$URL$", function (response) {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                console.log("Download Completed");

                fs.readFile('html/faces.html', 'utf8', (err, data) => {

                    if (err) {
                        console.error(err)
                        console.log('errore')

                    }

                    var str = data.match%%??;
                    var url = str[1].match(/(.*?(?:jpg|png|jpeg))|.*/);

                    if (url != null) {

                        URL = %URL%
                    }
                    //NOME E
                    //DA QUI 

                    var nomeNPC = '';

                    fs.readFile('txt/sostantivi.txt', 'utf8', (err, data) => {
                        if (err) {
                            console.error(err);
                            return;
                        }


                        var lines = data.split('\n');


                        //PARTE 1

                        var linea = '';
                        var bnam = false;
                        var _nomeNPC = '';

                        while (linea.length < 12) {
                            linea = lines[Math.floor(Math.random() * lines.length)]
                        }

                        while (nomeNPC === '') {

                            if (!bnam) {

                                var numPART = Math.floor(Math.random() * (linea.length / 2.3));


                                linea = linea.toLocaleLowerCase();

                                if (linea.charAt(numPART) === 'a' ||
                                    linea.charAt(numPART) === 'e' ||
                                    linea.charAt(numPART) === 'i' ||
                                    linea.charAt(numPART) === 'o' ||
                                    linea.charAt(numPART) === 'u' ||
                                    linea.charAt(numPART) === 'y' ||
                                    linea.charAt(numPART) === 'j' ||
                                    linea.charAt(numPART) === 'h') {




                                    _nomeNPC = linea.charAt(0).toUpperCase() + linea.substring(1, numPART + 1)
                                    var tolgoSpazi = ''
                                    for (var i = 0; i < _nomeNPC.length; i++) {
                                        if (_nomeNPC.charAt(i) === ' ') {
                                            tolgoSpazi += ''
                                        } else {
                                            tolgoSpazi += _nomeNPC.charAt(i)
                                        }
                                    }
                                    _nomeNPC = tolgoSpazi;


                                    if (_nomeNPC.charAt(0) === ' ') {
                                        _nomeNPC.charAt(0) = 'H';
                                    }

                                    bnam = true;
                                }
                            }

                            //PARTE 2
                            if (bnam) {
                                var linea = '';


                                while (linea.length < 12) {
                                    linea = lines[Math.floor(Math.random() * lines.length)]
                                }
                                var numPART = 6;

                                linea = linea.toLocaleLowerCase();


                                if (linea.charAt(numPART) != ' ' &&
                                    linea.charAt(numPART) != 'a' &&
                                    linea.charAt(numPART) != 'e' &&
                                    linea.charAt(numPART) != 'i' &&
                                    linea.charAt(numPART) != 'o' &&
                                    linea.charAt(numPART) != 'u' &&
                                    linea.charAt(numPART) != 'y' &&
                                    linea.charAt(numPART) != 'j' &&
                                    linea.charAt(numPART) != 'h') {

                                    var li = linea.charAt(numPART).toUpperCase() + linea.substring(numPART + 1, linea.length)

                                    var tolgoSpazi = ''
                                    for (var i = 0; i < li.length; i++) {
                                        if (li.charAt(i) === ' ') {
                                            tolgoSpazi += ''
                                        } else {
                                            tolgoSpazi += li.charAt(i)
                                        }
                                    }
                                    li = tolgoSpazi;


                                    _nomeNPC += ' ' + li.substring(0, linea.length - linea.length / 2)




                                    nomeNPC = _nomeNPC




                                    //BIOGRAFIA


                                    var bio = '';
                                    var luogo = '';
                                    var professione = '';
                                    var carat = '';
                                    var hob = '';
                                    var contr = '';
                                    let rn = 0.0;

                                    luogo = luoghi[Math.floor(Math.random() * luoghi.length)];

                                    rn = Math.random()
                                    if (rn > 0.3) {
                                        professione = professioni[Math.floor(Math.random() * professioni.length)];
                                    } else {
                                        professione = 'Disoccupato'
                                    }
                                    rn = Math.random()
                                    if (rn > 0.5) {
                                        carat = caratteristiche[Math.floor(Math.random() * caratteristiche.length)];
                                    } else {
                                        carat = 'Non esistono dati sul soggetto'
                                    }
                                    rn = Math.random()
                                    if (rn > 0.5) {
                                        hob = hobby[Math.floor(Math.random() * hobby.length)];
                                    } else {
                                        hob = 'Il soggetto non ha interessi particolari'
                                    }
                                    rn = Math.random()
                                    if (rn > 0.5) {
                                        contr = controversie[Math.floor(Math.random() * controversie.length)];
                                    } else {
                                        contr = '[CENSORED]'
                                    }



                                    bio ='#SOGGETTO - '+ Date.now() + '\n\n' + 
                                        'Nome: ' + nomeNPC + '\n' +
                                        'Provenienza: ' + luogo + '\n' +
                                        'Impiego: ' + professione + '\n' +
                                        'Caratteristiche: ' + carat + '\n' +
                                        'Interessi: ' + hob + '\n' +
                                        'Controversie: ' + contr;

                                  //  console.log(nomeNPC+' cercato da '+msg.from.first_name);

                                    croppaEPosta(bio, ID_FDT, URL, 0, 50, 1024, 900);

                                }
                            }

                        }

                    });




                });


            });

        });


    }, delay);
}
