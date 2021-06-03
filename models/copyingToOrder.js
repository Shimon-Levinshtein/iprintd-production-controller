const fs = require("fs-extra");



class copyingToOrder {
    constructor() {

    }

    copyFromPQFilesToProductionFiles(xml, path, section) {
        // console.log('###############################################');
        const PQFlieNum = xml.jobDetails.CPROFNUM[0];
        if (!PQFlieNum) return;
        const source = '//Binaw/data/PQFiles/' + PQFlieNum + '/' + section;
        const destination = path + '/PQFiles';
        fs.copy(source, destination, function (err) {
            if (err) {
                console.log('An error occured while copying the folder.')
                return console.error(err)
            }
            console.log('Copy completed!')
        });
        // console.log('###############################################');
    };


};

module.exports = new copyingToOrder();
