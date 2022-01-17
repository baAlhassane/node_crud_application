const Subscriber = require("../modele/subscriber")

//Here Subscriber holde the all subcsrribers by queries in database table or collections. 
//here the subscriber contains only the modele declaration and the schme and require to mongoose module. 
//But with mongoose module, we have access always to the database. Then can do some request any time  
//it is the same with courses variables.

exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find({}, (error, subcribers) => {
        if (error) next(error);
        req.data = subcribers;
        next();


    })

}

//display the form view 
exports.getSubscriptionPage = (req, res) => {
    res.render("contacts");

};

// const bodyParser =require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save((error, result) => {
        if (error) res.send(error);
        res.render("thanks");
    })
}




//%%%%%%%%%%%%%%%%%%%%%%%% Using  Promise%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// mongoose is build to work with promise. 
//mongose.Promise=global.Promise neer the top of the mai file.
// look at file subscribersController.js. 
// the queries return a promises that contain data on the weither to resolve by rendring
// a view or reject by logging an error. 
// By using the exec call following find , your're invoking your query to return a promise
// 

/**exports.getAllSubscribers=(req,res)=>{
 * Subscriber.find({})
 * .exec()//return a promise 
 * .then( (subscribers)=>{// the then handle the result to  display it 
 * res.render("subscribers", {subscribers:subscribers})
 * })
 * .catch((error )=> {
 * console.log(error.message);
 * return [] 
 * })
 * .then(()=> {
 * console.log(" promise complete ! ")
 *  });
 * 
 * };
 * 
 * 

**/

/**
 *newSubscriber.save()
 *.then(result=> {
 *    res.render("thanks");
 * })
 * .catch(error)=>{
 * if(error) res.render(error);
 * })
 * 
 */





