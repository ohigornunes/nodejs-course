module.exports = function(application) {
    application.get('/', function(req, res) {
        application.app.controllers.indexController.home(application, req, res)
    })
}