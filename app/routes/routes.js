module.exports = app => {
    const models = require("../controllers/controller.js");

    let router = require("express").Router();

    //Create a new Model
    router.post("/", models.create);
    
    //Retrieve all Models
    router.get("/all",models.findAll);

    //Retrieve all checked Models
    router.get('/checked', models.findCheckedModels);

    //Retrieve a single model with id
    router.get("/:id", models.findOneById);

    //Update a model with id
    router.put("/:id", models.update);

    //Delete a model with id
    router.delete("/:id", models.destroy);

    //Delete all models
    router.delete('/', models.removeAll);

    app.use('/api/models', router);
};