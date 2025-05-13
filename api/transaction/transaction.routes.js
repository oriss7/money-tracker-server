const transactionController = require('./transaction.controller.js');
const { create } = require('./transaction.service.js');

module.exports.connectTransactionRoutes = (app) => {
    const endPoint = 'api/transaction';

    app.post(`/${endPoint}/:id`, transactionController.create)
    app.put(`/${endPoint}/:id`, transactionController.update)
    app.get(`/${endPoint}/query/:id`, transactionController.query)
    app.delete(`/${endPoint}/:id`, transactionController.remove)
    app.get(`/${endPoint}/:id`, transactionController.get)
}