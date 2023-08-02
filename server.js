const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./app/server/models");
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

//simple route
app.get("/", (req, res) => {
    res.json({"message": "Welcome to Tattler API!"});
});

require('./app/server/routes/restaurants.routes.js')(app);

//set port
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});