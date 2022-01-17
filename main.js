const express = require("express")
const app = express()
const mongoose = require("mongoose");


const port = 3000;


app.get("/", (req, res) => {
    res.send(" <h1> Welcome </h1>  ")
    // console.log(req)
})

///var url="mongodb://localhost:3000/mydb"

//Import the mongoose module
//var mongoose = require('mongoose');

//Set up default mongoose connection
// var mongoDB= "mongodb://localhost:3000/mydb";
//var mongoDB="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
var mongoDB = "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


// new Promise((resolve, reject) => {
//     reject('error');
//   });
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;



db.once("open", () => { console.log("Successfully connectes to MongoDB using Mongoose !") })

//%%%%%% Etape 1 de l'application 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% This code is move in controllers modele %%%%%%%%%%%%% 
// const subscriberSchema=mongoose.Schema({
//     name:String,
//     email:String,
//     zipCode:Number
// });
// const Subscriber=mongoose.model("Subscriber",subscriberSchema);
// Subscriber.create({
//     name:"John Wexler",
//     email:"Jon@jonwexler.com"
// }, 
// function(error,savedDocument){
//     if(error) console.log(error);
//     console.log(savedDocument);
// }

//code for queries to the modele table
// );
// const Subscriber=require("./modele/subscriber")
// var myquery=Subscriber.findOne({
//     name:"Jon Wexler"
// }
// );

//console.log(myquery)
//for display the result of the query
// by using query, the exec call following the find, 
//you're invoking your query to return a promise
//
// myquery.exec((error,data)=>{
//     if(!data) {console.log(" no data !! ");}
//     else{  console.log(data);
//     }

// })


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% This last code is move in controllers modele %%%%%%%%%%%%% 
// controller is the glue between modele and view. this step we implement the corollers fold and 
//its folder. In the controller we require ("../modele/subscriber").And we don't to touch
//the modele forder or file. It's the controllers module we exporte in the  applacation main.
//


//%%%%%% Etape 2 . construcetion du models de l'etape 1.  de l'application 
//then it's the controlloers who make the request for gettint all the contents of the modele collections





//Etape 3. Crate a roueter whiche use the subcriberconller.js. ie which get all subcribers
//Us  we use the controllers we must use the views.ie we must set the views parameters
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const subscriberController = require("./controllers/subscribersController")
//Here the subcriberconller.getAllSubscribers method has a next() callbacks. 
// We need then this method donts display the views. 
app.get("/subscribers", subscriberController.getAllSubscribers, (req, res, next) => {
    console.log(req.data);
    //res.send(req.data)
    res.render("subscribers", { subscribers: req.data })

});




//Etape 3 Form submit. We've alreaady implemente the render page of the form 
// and the render pge after submission call thanks.ejs.
//now we must turn the route for the form filling 
//const subcribercontroller=require("./controllers/subscribersController")
// we have it already befor.. 
// we don't forget to install and require body-perser. 
//to easily parse the body of a request, you need the help of express.json(), 
//and express.urlencoded middleware function. these module acts as middleware 
//between your request and being received and processd fully with express.js . 

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/contacts", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);




//%%%%%%%%%%%%%%%%%%%%%%%% Using  Promise%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// mongoose is build to work with promise. 
//mongose.Promise=global.Promise neer the top of the mai file.
// look at file subscribersController.js. 


////%%%% end About Promise 



/**
 * Etape 4 :CRUD 
 *  ceration of index.ejs, usercontroller.js 
 */
const usersController=require("./controllers/usersController");
app.get("/users",usersController.index);
/**
 * if wwe use res.locals.users=users in the usercotroler we must call the next()
 * after .catch(error) ; next(err) to reach the indexView we must write the app.get(users )
 * like this : 
 * app.get("/users",usersController.index,usersController.indexView);
 * */


/**
 *s
 *  Creating and reading index pages 
 * construction of model form 
 * the view is in new.ejs as CRUD term
 */

const router=express.Router();


app.use("/", router)// tell to the application to use router like a systeme of middleware and routing 

router.get("/users/new",usersController.new);
router.post("/users/create",usersController.create,usersController.redirectView);
router.get("/users/:id",usersController.show,usersController.showView);

app.listen(port, (req, res) => {

    console.log("connection to server on port : " + port);

})

//mongoose.connect("mongodb://")