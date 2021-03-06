const modelsOrdersCount = require('../mySql/models_orders_count');
const allOrders = require('../mySql/all_orders');

class ChackXML {
    constructor() {

    }

    chackXMLfile(XMLFile ,path){

        modelsOrdersCount.OrdersCount.create({
        numbrOrder: XMLFile.jobDetails.JobNo[0],
        numbrOrderAndIitem: XMLFile.jobDetails.uniqueItemID[0],
        itemID: XMLFile.jobDetails.itemID[0],
        product: XMLFile.jobDetails.Product[0],
        cprofNum: XMLFile.jobDetails.CPROFNUM[0],
        doerName: XMLFile.jobDetails.DOERNAME[0],
        salesAgent: XMLFile.jobDetails.XMLProducer[0]
        })
        .then(function(user) {
            // you can now access the newly created user
            // console.log('success', user.toJSON());
        })
        .catch(function(err) {
            // print the error details
            console.log(err);
        });
        
    }
    insertOrderToDataBase(XMLFile ,path){
        
        allOrders.AllOrders.create({
        numbrOrder: XMLFile.jobDetails.JobNo[0],
        numbrOrderAndIitem: XMLFile.jobDetails.uniqueItemID[0],
        itemID: XMLFile.jobDetails.itemID[0],
        product: XMLFile.jobDetails.Product[0],
        cprofNum: XMLFile.jobDetails.CPROFNUM[0],
        doerName: XMLFile.jobDetails.DOERNAME[0],
        salesAgent: XMLFile.jobDetails.XMLProducer[0],
        arrWitTheProperties: JSON.stringify(XMLFile.jobDetails),
        orderDate: XMLFile.jobDetails.orderDate[0],
        })
        .then(function(user) {
            // you can now access the newly created user
            // console.log('success', user.toJSON());
        })
        .catch(function(err) {
            // print the error details
            console.log(err);
        });
        
    }
}

module.exports = new ChackXML();
