import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            console.log("ERROR :: NOT AUTHORIZED :: NO TOKEN");
            res.status(404).json({
                message : "No token provided , Unauthorized access..."
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if (!decoded) {
            console.log("ERROR :: NOT AUTHORIZED :: INVALID TOKEN");
            res.status(404).json({ message : "Invalid token, access denied UNAUTHORIZED" })
        }

        const user = await User.findById(decoded.userId).select('-pass');

        if (!user) {
            console.log("ERROR :: NOT AUTHORIZED :: NO USER FOR THE TOKEN");
            res.status(404).json({ message : "Invalid token, access denied UNAUTHORIZED - no user found" })
        }

        // res.status(200).json({
        //     message : "User found",
        //     user
        // })
        req.user = user

        next()

    } catch (error) {
        console.log("Internal server error...");
        res.status(500).json({ message : "Internal Server Error!" })
    }
}