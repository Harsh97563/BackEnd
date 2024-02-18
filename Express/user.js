const express= require('express');
const router= express.Router();
const zod= require('zod');
JWT_SECRET= '123456';
const jwt= require('jsonwebtoken');
const { User, Todo } = require('../MongoDB/db');

const SignUp= zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
const SignIn= zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
})



router.post('/SignUp',async(req, res)=>{
     
    try {
        const zod = SignUp.safeParse(req.body)
        if(!zod.success){
           return res.json({
                msg: 'zod'
            })
        }
        const tempuser= await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        })
        Todo.create({
            userId: tempuser._id,
            todos:[]
        })
        const token= jwt.sign({
            userId: tempuser._id,
            firstName: tempuser.firstName
        }, JWT_SECRET)
        return res.status(200).json({
            token: token,
            msg: "Account Created Successfully!",
        })
    } catch (error) {
       return res.json({
        msg: error
       })
    }

}
)

router.post('/SignIn', async(req, res)=>{
    try {
        const zod=SignIn.safeParse(req.body)
        if(!zod){
            return res.json({
                msg:"Wrong Inputs"
            })
        }
        const tempUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if(!tempUser){
            return res.status(400).json({
                msg: "Wrong email or password."
            })
        }
        const token= jwt.sign({
            userId: tempUser._id,
            firstName: tempUser.firstName
        }, JWT_SECRET)
        return res.status(200).json({
            token: token,
            msg: "Account Created Successfully!",
        })

    } catch (error) {
        res.json({
            error
        })
    }
})






module.exports= router;