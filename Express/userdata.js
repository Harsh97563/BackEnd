const express= require('express');
const { Todo, User } = require('../MongoDB/db');
const { log } = require('console');
const router= express.Router();
const ObjectId= require('mongodb')
const authmiddleware= require('../JWT/authmiddleware')

router.post("/addtodo",authmiddleware, (req, res)=>{
    Todo.updateOne(
        {userId: req.userId},
        {$push: {todos: {title: req.body.title}}}
    )
    .then(result => {
        res.json({
            msg:"Todo Added!"
        })
    })
    .catch(error => {
        console.log('Error updating todo:', error);
    });
})
router.get("/gettodos",authmiddleware, (req, res)=>{
    Todo.findOne({userId: req.userId})
    .then((todos)=>{
        return res.json({
            todos,
            firstName: req.firstName,
        })
        
    }).catch((error)=>{
        res.status(400).json({
            error
        })
    })
})

router.post("/delete",authmiddleware,(req, res)=>{
    Todo.updateOne({
        userId: req.userId
    },
    {$pull: {todos: { _id: req.body.todoId}}})
    .then(()=>{
        return res.json({
            msg: "Todo Deleted!"
        })
    })
    .catch((error)=>{
        res.status(400).json({
            error
        })
    })
})

router.post("/update", authmiddleware, (req, res)=>{
    Todo.updateOne({
        userId: req.userId,
        "todos._id": req.body.todoId
    },
    {$set: {"todos.$.title": req.body.updatedTitle}})
    .then(()=>{
        return res.json({
            msg: "Todo Updated!"
        })
    })
    .catch((error)=>{
        res.status(400).json({
            error
        })
    })
})

module.exports= router;