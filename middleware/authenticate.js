const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    
    if(req.cookies.token){
      const token = req.cookies.token;
      // console.log("token", token);

      const decodedToken = jwt.verify(token, 'secretKey');
      res.status(200).send({auth:true,decodedToken});
      return;
    }else{
      next();
    } 
    
  } catch (error) {
    res.status(401).send({ auth: false, error: 'Auth failed' });
  }
};
