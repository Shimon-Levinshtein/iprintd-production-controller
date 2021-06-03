const modelsSequelize = require('../../../mySql/models_sequelize');

// controlr_buttons

class Control {
    constructor() {

    }
    createAllControl() {
        return new Promise(function (res, rej) {

            modelsSequelize.controlr_buttons.findAll()
                .then(data => {
                    let result = ``;
                    data.forEach(element => {

                        const div = `
                            <div class="div-single-control">
                            <div class="single-control-p">
                                <p>${element.button_name}</p>
                            </div>
                            <div class="single-control-checkbox">
                                    <a href="/management-it-controlr-fils/buttons-controls/?controlButtonID=${element.id}&class=${element.class}" >
                                    <label class="q-switch-control">
                                        <div class="q-input-control ${element.class}" ></div> <!-- q-input-blue chench the button  -->
                                        <span class="q-slider q-round "></span>
                                    </label>
                                    </a>
                                    
                            </div>
                            </div>
                            `
                        result += div;
                    });
                    res(result);
                })
        })
    }
    buttonONOOf(id, button, OffOn) {
        return new Promise(function (res, rej) {
            modelsSequelize.controlr_buttons.update({
                On_Off: OffOn,
                class: button
            }, {
                where: { id: id },
                returning: true,
                plain: true
            })
                .then(function (result) {
                    res(result);
                });
        })
    }
}

module.exports = new Control();








