/**
 * we have seen  2 kind of modeles : courses and subscribers 
 * Now we want user to create accounts and start sign up. 
 * 
 * Like subscriber modele  the user modele need some basics  information 
 */
 const mongoose=require("mongoose");
 const {Schema}=mongoose;
 const userSchema=new Schema({
     name:{
         first:{
             type:String,
             trim:true
         },
         last:{
             type:String,
             trim:true
         }
     },
     email:{
         type:String,
         reequired:true,
         lowercase:true,
         unique:true
     },
     
     zipCode:{
         type:Number,
         min:[1000,"zip code too short "],
         max:99999,
         unique:true
     },
     password:{
         type:String,
         required:true,
 
     },
     courses:[{
         type:Schema.Types.ObjectID, ref:"Course"
      }],
      subscribeAccount: {type: Schema.Types.ObjectId, resf: "Subscriber"},
 
    },

     {
      timestamps:true,
    }
 
 )
 

 
 userSchema.virtual("fullName")
 .get(function(){
     return `${this.name.first} ${this.name.last}`

 })

 /**
  *   Etape 5:CRUD 
  * whenever a new user is create.  We need to check for an existing user from subscriber 
  * and associate with the same
  * Befor we must import the subscriber  modele module. 
  */

 const Subsriber=require("./subscriber")

 userSchema.pre("save",function(next){
     let user=this;
     if(user.subscribeAccount===undefined){// pas de compt subscriber 
         Subsriber.findOne({
             imail:user.email
         })
         .then(subcriber=> {
             user.subscribeAccount=subcriber;
             next();
         })
         .catch(error=>{
             console.log(`Error in connecting subscriber :${error.message} `);
             next(error);
         });
     }
     else{
         next();
     }
 });


module.exports=mongoose.model("User",userSchema);