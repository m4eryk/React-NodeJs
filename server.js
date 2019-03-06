const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//Exports routers
const userRouter = require('./routes/api/user');
const profileRouter = require('./routes/api/profile');
const newsRouter = require('./routes/api/news');
const galeryRouter = require('./routes/api/galery');
const workRouter = require('./routes/api/work');
const shopRouter = require('./routes/api/shop');

//Export config
const configkeys = require('./config/keys');

//Create server and listen port
const app = express();
const port = process.env.PORT || 5000;

//Cors policy
app.use(cors());

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Create and connect to MongoDB
mongoose.connect(configkeys.mongoDBURL, {useNewUrlParser: true})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));

//Use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Router path
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/news', newsRouter);
app.use('/api/galery', galeryRouter);
app.use('/api/work', workRouter);
app.use('/api/shop', shopRouter)

//Server static assets if in prod
if (process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`Server start on port ${port}`));