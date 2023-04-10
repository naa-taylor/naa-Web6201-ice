 import createError, {HttpError} from 'http-errors';
 import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import passportLocal from 'passport-local';
import flash from 'connect-flash'
import indexRouter from '../routes';
import usersRouter from '../routes/users';
 import User from '../models/user';


const app = express();
 const LocalStrategy = passportLocal.Strategy;

//add the database connection information
import  * as DBConfig from './db';
import {remoteURI} from "./db";
mongoose.connect(DBConfig.localURI);
//mongoose.connect(DBConfig.remoteURI);
const db = mongoose.connection;
db.on("error", function (){
  console.error("Connection Error!");
});
db.once("open", function (){
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

 // Configure passport
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Configuire Express Session
 app.use(
     session({
         secret: DBConfig.SessionSecret,
         resave: false,
         saveUninitialized: false,
     }))
 //Initialize Flash and Passport
 app.use(flash())
 app.use(passport.initialize());
 app.use(passport.session());

 //Implement Authentication Strategy
 passport.use(User.createStrategy())
 passport.serializeUser(User.serializeUser())
 passport.deserializeUser(User.deserializeUser())

 app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err :createError.HttpError, req:express.Request, res:express.Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;