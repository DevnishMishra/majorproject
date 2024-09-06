if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
};

const express=require("express");
const app=express();
const path=require("path")
const mongoose=require("mongoose")
const methodOverride = require('method-override')
const ejsMate=require('ejs-mate')

const ExpressError=require("./utils/ExpressError.js");
const sessions=require("express-session");
const MongoStore=require("connect-mongo")
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy=require("passport-local")
const User=require("./models/user.js");
const userRouter=require("./routes/user.js")
const listingRouter=require("./routes/listing.js");
const reviewRoutes=require("./routes/review.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));//for using style.css
app.use(express.urlencoded({extended:true}));//for getting data from req.body parsing data
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
const dbUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("coonection suucessfull")
}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(dbUrl);
};

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONOGO SESSION STORE",err)
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(sessions(sessionOptions));
app.use(flash());
app.use(passport.initialize());//a middleware that initializes passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//whenwhere user enters in website he goes through localstrategy model for authentication
passport.serializeUser(User.serializeUser());//its used to storethe data from user which he passed in session
passport.deserializeUser(User.deserializeUser());//opposite to deseriallize

//flash middleware
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

app.get('/demouser', async (req, res) => {
    try {
        let fakeuser = new User({
            email: 'de@gmail.com',
            username: 'de',
        });
        let registerUser = await User.register(fakeuser, 'helloworld'); // register saves user info inside schema here 1st argument is user and second is password
        res.send(registerUser);
    } catch (err) {
        if (err.name === 'UserExistsError') {
            res.status(400).send('A user with the given username is already registered');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});
app.get('', (req, res) => {
    res.render('listings/welcome'); // Render the welcome.ejs file
  });
// app.get("/testing",async(req,res)=>{
//     let sampleListing=  new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("list saved");
//     res.send("sucessfull");
// });



app.use("/listings",listingRouter);
app.use('/listings/:id/reviews', reviewRoutes);
app.use("/",userRouter);
//if route not present this will run
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
});


//error handler
app.use((err,req,res,next)=>{
    let{statusCode=500,message="some error occured"}=err;
    console.log(err)
    res.status(statusCode).render("./listings/error.ejs", { err: { statusCode, message } })
});
// app.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Some error occurred" } = err; // Default values if err object doesn't have statusCode or message

//     // If err is an instance of ExpressError, use its properties
//     if (err instanceof ExpressError) {
//         statusCode = err.statusCode;
//         message = err.message;
//     }

//     res.status(statusCode).send(message);
// });

app.listen(8080,()=>{
    console.log("app is listening")
});