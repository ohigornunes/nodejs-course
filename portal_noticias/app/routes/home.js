module.exports = function(application, req , res) {
  application.get("/", function(req, res) {
    application.app.controllers.home.index(application, req, res);
  });
}
