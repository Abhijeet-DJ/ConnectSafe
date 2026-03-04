import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId , io } from "../lib/socket.js";
import Messages from "../models/messages.models.js";
import User from "../models/user.models.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const allUserExceptMe = await User.find({ _id: { $ne: loggedInUser } }).select('-pass');

        res.status(202).json({
            message: "Fetched all user except the logged in one",
            users: allUserExceptMe
        });

    } catch (error) {
        console.log(`ERROR :: Fetching All Users Failed :: Message Controllers :: ${error}`);
        res.status(500).json({
            error
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const currUserId = req.user._id;

        const messages = await Messages.find({
            $or: [
                { senderId: currUserId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: currUserId }
            ]
        });

        res.status(202).json({
            note: "Fetched all messages for you and selected user",
            messages: messages
        });

    } catch (error) {
        console.log(`ERROR :: Fetching All Messages Failed :: Message Controllers :: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const currUserId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new Messages({
            senderId : currUserId,
            recieverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const recieverSocketId = getReciverSocketId(recieverId)

        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json({
            note: "Message saved successfuly",
            message: newMessage
        });

    } catch (error) {
        console.log(`ERROR :: Saving Message Failed :: Message Controllers :: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}