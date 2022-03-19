const express = require("express");
const User= require('../model');
const router = express.Router();

router.get('/',async (req,res) => {
    try {
        const getAllUsers= await User.find();
        res.status(200).json(getAllUsers);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post('/',async (req,res) => {
    const user = new User(req.body);
    try {
        if (user) {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(400).json({message: 'The email is already in use'});
    }
  
});

router.get('/:userId',async (req,res) => {
    try {
        const getUserById = await User.findById(req.params.userId);
        res.status(200).json(getUserById); 
    } catch (error) {
        res.status(400).json({message: `The user doesn't exist`})
    }
});

router.patch('/:userId',async (req,res) => {
    const _id = req.params.userId;
    try {
        const updateUser = await User.findByIdAndUpdate(_id,{...req.body,updatedAt: Date.now()}, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.delete('/:userId',async (req,res) => {
    const _id = req.params.userId;
    try {
        const removeUser = await User.findByIdAndDelete(_id);
        res.status(200).json(removeUser);
    } catch (error) {
        res.status(400).json({message: error})
    }
})

module.exports = router;