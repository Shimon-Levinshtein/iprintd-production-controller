const modelsSequelize = require('../../../mySql/models_sequelize');


class TeskFunction {
    constructor() { }

    insertInto(tesk) {
        return new Promise(function (res, rej) {
            modelsSequelize.Tesks.create({
                tesk: tesk,
                class: "hot",
            })
                .then(result => {
                    // res(result);
                })
                .catch(function(err) {
                    // print the error details
                    console.log(err);
                });
        });
    }
    selectAllFromTable(database, Table) {
        return new Promise(function (res, rej) {
            let list = ``;
            modelsSequelize.Tesks.findAll()
                .then(result => {
                    result.forEach(element => {
                        let tagTesk = `
                                <li class="liTesk">
                                        <a href="/controlr-fils/delete/?deleteID=${element.id}">🗑️</a>
                                        <a href="/controlr-fils/edit?editId=${element.id}">✎</a>
                                    <p class=" textP ${element.class}">${element.tesk}</p>
                                    <a  href="/controlr-fils/?chekBoxBoutton=${element.id}&oldClass=${element.class}" >✅</a>
                                </li>
                            `
                        list += tagTesk;
                    });
                    res(list)
                });
        });
    }
    update(id, mewClass) {
        return new Promise(function (res, rej) {
            modelsSequelize.Tesks.update({
                class: mewClass
            }, {
                where: { id: id },
                returning: true,
                plain: true
            })
                .then(function (result) {
                    res(result);
                });
        });
    }
    delete(id) {
        return new Promise(function (res, rej) {
            modelsSequelize.Tesks.destroy({
                where: { id: id },
                truncate: false
            })
                .then(result => {
                    res(result);
                });
        });
    }
    edit(id, tesk) {
        return new Promise(function (res, rej) {
            modelsSequelize.Tesks.update({
                tesk: tesk
            }, {
                where: { id: id },
                returning: true,
                plain: true
            })
                .then(function (result) {
                    res(result);
                });
        });
    }
    selectByID(id) {
        return new Promise(function (res, rej) {
            modelsSequelize.Tesks.findAll({ where: { id: id } })
                .then(result => {
                    res(result);
                })
        });
    }
}

const teskFunction = new TeskFunction();

module.exports = teskFunction;


