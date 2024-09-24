import jwt from "jsonwebtoken"
const checkAuthentication = async(req, res, next) => {
  try{
    const token = req.cookies.token
    console.log(token)
    if(!token){
      res.status(401).json({
        message: 'No token provided, authorization denied'
      })
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

export default checkAuthentication;