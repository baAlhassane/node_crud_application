const User=require("../modele/user")

module.exports={
    index: (rec,res)=>{
        User.find({})
        .then(users=> {
            res.render("users/index",{
                users:users
            })
        })
        .catch(error=> {
            console.log(`Error fetchin users : ${error.message}`);
            res.redirect("/")
        })
    },

    new:(req,res)=>{
        res.render("users/new");
    },

    create:(req,res,next)=>{
       let userParams={
           name:{
               first:req.body.first,
               last:req.body.last
           },
           email:req.body.email,
           password:req.body.password,
           zipCode:req.body.zipCode
       };
       
       User.create(userParams)
       .then(user=> {
           res.locals.redirect="/users";
           res.locals.user=user;
           next();
       })
       .catch(error=>{console.log(`Error saving : ${error.message}`);
    next(error);
    });



    },

    redirectView:(req,res,next)=>{
        let redirectPath=res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

//now lets add route in the main 

/**
 * Here we add the show.ejs data. to display the user data
 */

show:(req,res,next)=>{
    let userId=req.params.id;
    User.findById(userId)
    .then(user=>{
        res.locals.user=user;
        next();
    })
    .catch(error=>{
        console.log(`Error fetching user by ID : ${error.message}` );
        next(error);
    })
},

showView:(re,res)=>{
    res.render("users/show");
}



}





/**
 * Adding create action 
 */

// the last step is to import this fire in top the main.js
/**
 * in analogie index action is equivalent to the getAllSubscribers methode  
 */

/**
 * Revising the index action 
 * we add the result of the find reques in the res.local object
 * 
 * 
 * 
 */

//  module.exports={
//     index: (rec,res,next)=>{
//         User.find({})
//         .then(users=> {
//             res.locals.users=users;
//             next();
//         })
//         .catch(error=> {
//             console.log(`Error fetchin users : ${error.message}`);
//             next(error);
//         });
//     },
//     indexView:(req,res)=>{
//         res.render("users/index")

//     }

// }