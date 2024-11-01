import mongoose from "mongoose";

import ChannelModel from "../model/ChannelModel.js";
import User from "../model/UserModel.js";

export const createChannel = async (req, res) => {
     
    try {
        const { name, members } = req.body;
        const userId = req.userId;
        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(400).send("Admin not found");
        }
        const validMembers = await User.find({ _id: { $in: members } });
        if (validMembers.length !== members.length) {
            return res.status(400).send("Invalid User Found");
        }

        const newChannel = await ChannelModel.create({
            name,
            members,
            admin: userId,
        });
        return res.status(200).send({ newChannel });
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
export const getUserChannels = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await ChannelModel.find({
            $or: [{ admin: userId }, { members: userId }],
        }).sort({ updatedAt: -1 });
        return res.status(200).json({ channels });
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
export const getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const channel = await ChannelModel.findById(channelId).populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "firstName lastName image color _id email",
            },
        });

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }
        const messages = channel.messages || [];
        // console.log(messages)
        return res.status(200).json({ messages });
    } catch (err) {
        console.error("Error in getChannelMessages:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};  // 