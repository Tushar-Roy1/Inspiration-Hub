import { model,models,Schema } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email Already exists'],
        required:[true,'Emails is Required']
    },
    username:{
        type:String,
        required:[true,'Username is Required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image:{
        type:String
    }
})
const User = models.User || model("User", UserSchema);

export default User;