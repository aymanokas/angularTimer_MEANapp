// Express
let express = require("express");
let app = express();
const path = require("path");
const cors = require("cors");

// Static Folder
//app.use(express.static(__dirname + '/public/dist'));
app.use(cors());

// Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Morgan
let morgan = require("morgan");
app.use(morgan('dev'));

// Mongo Database
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/users', {
    useMongoClient: true,
});

let TeamSchema = new mongoose.Schema({

    teamName: { type: String, require: true, unique: true },
    teamScore: { type: String, require: false },
    scoreChrono: { type: String, require: false }
})
mongoose.model("Team", TeamSchema);
let Team = mongoose.model("Team");

app.post("/teams", (req, res) => {
    console.log(req.body);
    let team = new Team(req.body)
    team.save()
        .then(res => {
            res.json({
                status: "cool"
            })
        })
        .catch(err => {
            res.json(err);
        })
})

// Get Users
app.get("/teams", (req, res) => {
    console.log(req.body);
    Team.find((err, teams) => {
        if (err) {
            console.log(err);
        } else res.json(teams);
    })
})

// Destroy User
app.delete("/teams/:id", (req, res) => {
    console.log("hahouwa" + req.body);
    Team.findByIdAndRemove({ _id: req.params.id }, function(err, item) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    })
})
app.put("/teams/:id", (req, res) => {
        Team.findById({ _id: req.params.id }, (err, team) => {
            if (!team) {
                console.log("makaych");
            } else {
                if (req.body.scoreChrono) {
                    team.scoreChrono = req.body.scoreChrono;
                }
                if (req.body.teamScore) {
                    team.teamScore = req.body.teamScore;
                }
                team.save()
                    .then(res => {
                        res.json({
                            status: "cool"
                        })
                    })
                    .catch(err => {
                        res.json(err);
                    })
            }

        })
    })
    // // Routes
    // Get Users
    // app.get("/Teams", (req, res, next) => {
    //         console.log("Server > GET '/users' ");
    //         Team.find({}, (err, users) => {
    //             return res.json(users);
    //         })
    //     })
    //     // Create User
    // app.post("/users", (req, res, next) => {
    //         console.log("Server > POST '/users' > user ", req.body);
    //         delete req.body._id
    //         User.create(req.body, (err, user) => {
    //             if (err) return res.json(err)
    //             else return res.json(user)
    //         })
    //     })
    //     // Destroy User
    // app.delete("/users/:id", (req, res, next) => {
    //     console.log("Server > DELETE '/users/:id' > id ", req.params.id);
    //     User.deleteOne({ _id: req.params.id }, (err, rawData) => {
    //         if (err) return res.json(err)
    //         else return res.json(true)
    //     })
    // })
    // app.put("/users/:id", (req, res, next) => {
    //     console.log("Server > PUT '/users/:id' > id ", req.params.id);
    //     console.log("Server > PUT '/users/:id' > user ", req.body);
    //     User.update({ _id: req.params.id }, req.body, (err, rawData) => {
    //         if (err) return res.json(err)
    //         else return res.json(true)
    //     })

// })

app.all("*", (req, res, next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})

// Server Listening @ 1337
app.listen(1337, () => console.log("Server running at 1337"));