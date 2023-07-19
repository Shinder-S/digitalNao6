const db = require("../models");
const Model = db.models;

exports.create = (req, res) => {
    //validate request
    if (!req.body.title){
        res.status(400).send({ message: "Content can not be empty!!" });
        return;
    }
    const model = new Model({
        title : req.body.title,
        description: req.body.description,
        checked: req.body.checked ? req.body.checked : false
    });

    model
    .save(model)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error while create a new model"
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Model.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving models."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Model.findById(id)
    .then(data => {
        if (!data)
        res.status(400).send({ message: "Not found model with id " + id});
        else res.send(data);
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving object with that id=" + id});
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
    message : "Data to update can not be empty!"
    });    
}

const id = req.params.id;

    Model.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then((data) => {
        if(!data){
            res.status(404).send({
                message: `Cannot update data with ${id}. Maybe it was deleted!`
            });
        } else res.send({ message: "Model was updated successfully"}); 
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while updating the Model with id=' + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Model.findByIdAndRemove(id)
    .then((data) => {
        if (!data) {
            res.status(400).send({
                message: `Could not delete model with id=${id}`
            });
        } else {
            res.send({
                message: "Model was deleted successfully"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete model with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Model.deleteMany({})
     .then(data => {
        res.send({
            message: `${data.deletedCount} models were deleted`
        });
     })
     .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured'
        });
    });
};

exports.findAllChecked = (req, res) => {
    Model.find({ checked: true })
     .then(data => {
        res.send(data);
     })
     .catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Some error occurred while retrieving data.'
        });
    });
};

