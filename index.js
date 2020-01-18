// implement your API here
const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.listen(4000, () => {
    console.log("*** listening on port 4000");
});

//--------------------------------------------------
// POST requests
//--------------------------------------------------
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(userInfo.name && userInfo.bio) {
        db.insert(userInfo)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                status(500).json({ errorMessage: "There was an error while saving the user to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    };
});

//--------------------------------------------------
// GET requests
//--------------------------------------------------
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(found => {
            if(found) {
                res.status(200).json({success:true, found});
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        })
})

//--------------------------------------------------
// DELETE requests
//--------------------------------------------------
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user could not be removed" });
        });
})

//--------------------------------------------------
// PUT requests
//--------------------------------------------------
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if(changes.name && changes.bio){
        db.update(id, changes)
            .then(updated => {
                if(updated) {
                    res.status(201).json(updated);
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user information could not be modified." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    
})