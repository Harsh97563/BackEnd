const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://harshgupta20220:Harsh@cluster0.8xhyj4i.mongodb.net/todoApp")

const UserSchema= new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,

})
const TodoSchema= new mongoose.Schema({
    userId:{
        type: String,
        ref: 'user',
        required: true
    },
    todos:[{
        title:{
            type: String,
        },
        priority:{
            type: String,
        }

    }]
})

const User= mongoose.model('users', UserSchema);
const Todo= mongoose.model('todos', TodoSchema);

module.exports={
    User,
    Todo
}