import { genToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import cloudinary  from '../lib/cloudinary.js'

export const signup = async (req, res) => {
    const { fullName, email, pass, profileImg } = req.body;
    try {
        if (pass.legth < 6) {
            res.status(400).json({
                message: "Password length must be eqaul to or greater than 8 characters"
            });
            return
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                message: `User with email : ${email} already exists.`
            })
            return
        }

        const salt = await bcrypt.genSalt(16);
        const hashedPass = await bcrypt.hash(pass, salt);

        const newUser = new User({
            email,
            pass: hashedPass,
            profileImg,
            fullName
        })

        if (newUser) {
            genToken(newUser._id, res)
            await newUser.save()
        }


        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profileImg: newUser.profileImg
        })
    } catch (error) {
        console.log("Error :: SignUp Controller ::", error.message);
        res.status(500).json({ message: "Internal Server Error while creating user --> check console for more details." })
    }
}

export const login = async (req, res) => {
    const { email, pass } = req.body

    const user = await User.findOne({ email })

    try {
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPassWordRi8 = await bcrypt.compare(pass, user.pass)

        if (!isPassWordRi8) {
            return res.status(404).json({ message: "User not found" })
        }

        genToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImg: user.profileImg
        })
    } catch (error) {
        console.log(`ERROR :: CREDENTIAL MISMATCH :: ${err}`);
        res.send(502).json({ message: "Internal Service Error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
        })
        res.status(200).json({ message: "logged out" });
    } catch (error) {
        console.log(`Error :: LogOut Controller :: ${error}`);
        res.status(500).json({ message:"Internal Server Error" })
    }
}


export const updateProfile = async (req,res) => {
    try {
        const { profilePic } =  req.body;
        const userId = req.user._id;

        if(!profilePic){
            res.status(404).json({ message : "Please upload your profile Image" })
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId , { profileImg : uploadRes.secure_url } , { new : true })

        res.status(202).json({
            message : 'User Updated',
            user : updatedUser
        })
    } catch (error) {
        console.log("Internal server error! :: updateProfileImg - controller ::",error);
        res.status(500).json({ message : "Failed to update user!" })
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(201).json(req.user)
    } catch (error) {
       console.log("ERROR :: CHECK AUTH CONTROLLER FAILED :: ", error);
       res.status(500).json({ message : "Internal server error" });
    }
}