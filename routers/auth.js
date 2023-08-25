const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');



router.post('/login', async (req, res) => {
  try {
    const { email, name } = req.body;
    // console.log("res from client:",email,name);

    const user = await User.findOne({ email });
    if (!user) {
       res.send({ auth:false, error: 'Auth failed' });
    }

      const token = jwt.sign({ email,name },'secretKey');
      
      res.cookie("token", token, {
        maxAge: 8600000,
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
      });
      // console.log("tok",token)
      res.status(200).send({auth:true,user:user});
    
  } catch (error) {
    res.status(500).send({auth:false, error: ' error' });
  }
});

router.post('/signup', async (req, res) => {
  try { 
    const { email, name } = req.body;
  //  console.log("req",req.body);
    const user = new User({ email, name });
    // console.log("new user",user);
    await user.save();
    res.status(201).send({auth:true , message: 'User created successfully' });
  } catch (error) {
    console.log(error,"error");
    res.status(500).send({auth:false , error: 'error' });
  }
});

module.exports = router;