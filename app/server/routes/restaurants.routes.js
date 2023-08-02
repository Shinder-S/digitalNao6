module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Restaurant
    router.post("/", restaurants.create);
  
    // Retrieve all Restaurants
    router.get("/", restaurants.findAll);

    // Retrieve Restaurant by name
    router.get("/name", restaurants.findByName);
    
    // Retrieve Restaurant by cuisine
    router.get("/cuisine", restaurants.findByCuisine);
    
    // Retrieve Restaurant by name and cuisine
    router.get("/cuisine", restaurants.findByNameAndCuisine);
  
    // Retrieve a single Restaurant with id
    router.get("/:id", restaurants.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", restaurants.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", restaurants.delete);
  
    // Create a new Tutorial
    router.delete("/", restaurants.deleteAll);
  
    app.use("/api/restaurants", router);
  };