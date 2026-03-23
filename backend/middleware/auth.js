import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

  const headerToken = req.headers.token;
  const cookieToken = req.cookies?.token;

  const token = headerToken ? headerToken : cookieToken;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again"
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId =  decoded.userId || decoded.id;  //userId comes from authController while jwt.sign

    next();

  } catch (error) {

    console.log(error);

    return res.json({
      success: false,
      message: "Invalid Token"
    });

  }
};


export default authUser