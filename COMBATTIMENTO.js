const fs = require('fs');

const ris = require('./bot');

let lvlUP = " ";

let stringa, lines1,lines2,nome1,nome2,PV1,PV2,PA1,PA2,PD1,PD2,EXP1,EXP2,EXP1_c,EXP2_c;

let _PV1, _PV2, _PA1, _PA2, _PD1, _PD2, _EXP1, _EXP2, _EXP1_c, _EXP2_c;
let danno_in_attacco, danno_in_difesa,delta_exp1,delta_exp2;

let rip = ' \n ';



/**IL GIOCO A CUI NESSUNO GIOCA PERCHè SONO DELLE FIGHETTE INVIDIOSE */


 function colpisci(ID_1, ID_2) {

     lvlUP = " ";

     rip = " ";


    try {
        const data1 = fs.readFileSync('PERSONAGGI/' + ID_1 + '.txt', 'utf8');
       

        lines1 = data1.split('\n');
        nome1 = lines1[0];
        PV1 = parseFloat(lines1[1]);
        PA1 = parseFloat(lines1[2]);
        PD1 = parseFloat(lines1[3]);
        EXP1 = parseFloat(lines1[4]);
        EXP1_c = parseFloat(lines1[5]);



    } catch (err) {
        console.error(err);
    }

    try {
        const data2 = fs.readFileSync('PERSONAGGI/' + ID_2 + '.txt', 'utf8');
       

        lines2 = data2.split('\n');
        nome2 = lines2[0]
        PV2 = parseFloat(lines2[1]);
        PA2 = parseFloat(lines2[2]);
        PD2 = parseFloat(lines2[3]);
        EXP2 = parseFloat(lines2[4]);
        EXP2_c = parseFloat(lines2[5]);



    } catch (err) {
        console.error(err);
    }


    if (PV1 > 0 && PV2 > 0) {

        if (PA1 > PD2) {


            PV2 = PV2 - (PA1 - PD2)

            danno_in_difesa = 0;
            danno_in_attacco = PA1 - PD2;

        }


        if (PA1 < PD2) {

            PV1 = PV1 - 0.1
            PV2 = PV2 - 0.1

            danno_in_difesa = 0.1;
            danno_in_attacco = 0.1;

        }


        if (PA1 == PD2) {

            var att = Math.random() * 0.3
            var dif = Math.random() * 0.2

            danno_in_difesa = att;
            danno_in_attacco = dif;

            if (att < dif) {


                PV1 = PV1 - (dif - att)

            }

            if (att > dif) {

                PV2 = PV2 - (att - dif)

            }


            if (att == dif) {



            }


        }



        PV1 = PV1.toFixed(2);
        PV2 = PV2.toFixed(2);
       


        if (PV1 <= 0) {
           
            //sei morto tu funzione respawn
            morte(1)
        }

        if (PV2 <= 0) {
           
            //è morto l'avversario funzione respawn
           
            morte(2);
           
            if (PV1 >= 0) {
               
                //è morto l'avversario e tu sei vivo calcola tua exp

              
                incrementoEXP(1)
                EXP1 = parseFloat(EXP1)
                EXP1+=0.05
                delta_exp1 = parseFloat(delta_exp1)
                delta_exp1 += 0.05
                delta_exp2 = 0;
            }
        }

        if (PV2 > 0) {
           
            //l'avversario è vivo

            if (PV1 > 0){
                //tu sei vivo calcola tua exp e sua exp

                incrementoEXP(1)
                incrementoEXP(2)

               

            }
            if (PV1 <= 0) {
                //tu sei morto calcola sua exp

                incrementoEXP(2)
                EXP2 = parseFloat(EXP2)
                EXP2 += 0.05
                delta_exp2 = parseFloat(delta_exp2)
                delta_exp2 += 0.05
                delta_exp1 = 0;
            }
        }

        

        aggiornaSchedaPG(ID_1, ID_2, nome1, nome2)
  


        return stringa;

        


    } else {

        //uno dei due è già morto e non è repawnato

        console.log('qualcuno è morto e non respawnato');

        } 

    }


function morte(pg) {

    if (pg == 1) {

        delta_exp1 = 0;
        _PV1 = 1.00
        _PA1 = 0.10
        _PD1 = 0.10
        _EXP1 = 0
        _EXP1_c = 0

        rip += '\n' +nome1 + ' è morto e verrà respawnato con stats resettate'

    }

    if (pg == 2) {
        delta_exp2 = 0;
        _PV2 = 1.00
        _PA2 = 0.10
        _PD2 = 0.10
        _EXP2 = 0.00
        _EXP2_c = 0.00

        rip += '\n'+nome2 + ' è morto e verrà respawnato con stats resettate'
    }
}

function incrementoEXP(pg){


    if (pg == 1) {

        delta_exp1 = 0.1 + EXP1 + (EXP1 - (EXP1 / 4))

        EXP1 = parseFloat(0.1 + EXP1 + (EXP1 - (EXP1 / 4)))
        

        EXP1 = EXP1.toFixed(2);

       

        if (EXP1 > (EXP1_c+ 3)) {

            EXP1_c = EXP1

            PV1 = parseFloat(PV1 + Math.random() * 0.4);
            PA1 = parseFloat(PA1 + Math.random() * 0.3);
            PD1 = parseFloat(PD1 + Math.random() * 0.3);

            PV1 = PV1.toFixed(2);
           
            lvlUP += nome1 + ' SALE DI LIVELLO - STATISTICHE MIGLIORATE\n';
           
        }
    }




    if (pg == 2) {


        delta_exp2 = 0.1 + EXP2 + (EXP2 - (EXP2 / 4))

        EXP2 = parseFloat(0.1 + EXP2 + (EXP2 - (EXP2 / 4)))

        EXP2 = EXP2.toFixed(2);

       

        if (EXP2 > (EXP2_c + 3)) {

            EXP2_c = EXP2

            PV2 = parseFloat(PV2 + Math.random() * 0.4);
            PA2 = parseFloat(PA2 + Math.random() * 0.3);
            PD2 = parseFloat(PD2 + Math.random() * 0.3);

            PV2 = PV2.toFixed(2);


            lvlUP += nome2 + ' SALE DI LIVELLO - STATISTICHE MIGLIORATE';
          
        }
    }


    danno_in_attacco = parseFloat(danno_in_attacco)
    danno_in_attacco = danno_in_attacco.toFixed(2)

    danno_in_difesa = parseFloat(danno_in_difesa)
    danno_in_difesa = danno_in_difesa.toFixed(2)

    delta_exp1 = parseFloat(delta_exp1)
    delta_exp1 = delta_exp1.toFixed(2)

    delta_exp2 = parseFloat(delta_exp2)
    delta_exp2 = delta_exp2.toFixed(2)

    stringa =


        '• '+nome1 + '   |🤬 ⚔️🤜💀🤛⚔️ 😠| • ' + nome2 + '\n\n' +

        '🤬🗡 ' + danno_in_attacco + '\n' +
        '😠🛡 ' + danno_in_difesa + '\n' +
        '🤬👨‍🎓 ' + delta_exp1 + '\n' +
        '😠👨‍🎓 ' + delta_exp2 + '\n' +
        '🤬❤️ ' + PV1 + '\n' +
        '😠❤️ ' + PV2 + '\n' +

        '\n' + lvlUP + rip


}

function aggiornaSchedaPG(id1,id2,nome1,nome2) {
    var _file1 = 'PERSONAGGI/' + id1 + '.txt'
    var _file2 = 'PERSONAGGI/' + id2 + '.txt'

    if (PV1 > 0) {
        fs.writeFile(_file1, nome1 + "\n" + PV1 + "\n" + PA1 + "\n" + PD1 + "\n" + EXP1 + "\n" + EXP1_c, err => {
            if (err) {
                console.error(err);
            }

        });
    } else {
        fs.writeFile(_file1, nome1 + "\n" + _PV1 + "\n" + _PA1 + "\n" + _PD1 + "\n" + _EXP1 + "\n" + _EXP1_c, err => {
            if (err) {
                console.error(err);
            }

        });
    }

    if (PV2 > 0) {
        fs.writeFile(_file2, nome2 + "\n" + PV2 + "\n" + PA2 + "\n" + PD2 + "\n" + EXP2 + "\n" + EXP2_c, err => {
            if (err) {
                console.error(err);
            }

        });
    } else {
        fs.writeFile(_file2, nome2 + "\n" + _PV2 + "\n" + _PA2 + "\n" + _PD2 + "\n" + _EXP2 + "\n" + _EXP2_c, err => {
            if (err) {
                console.error(err);
            }

        });
    }

}



module.exports = { colpisci };