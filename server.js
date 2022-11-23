const express = require ("express");
const bcrypt = require ("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'face_recognition_database_user',
      database : 'face_recognition_database'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send("it is working") })
app.post("/signin", signin.handleSignin(db, bcrypt))
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
})
