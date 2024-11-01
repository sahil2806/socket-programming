import mongoose from "mongoose";


const channelSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    members: [{ 
      type: mongoose.Schema.ObjectId, 
      ref: "User", 
      required: true
    }],
    admin: { 
      type: mongoose.Schema.ObjectId, 
      ref: "User", 
      required: true 
    },
    messages: [{ 
      type: mongoose.Schema.ObjectId, 
      ref: "Message", required: false 
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
});
  
  // Pre-save middleware for updating 'updatedAt'
  channelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Pre-findOneAndUpdate middleware to ensure 'updatedAt' is updated
  channelSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() });
    next();
  });
  
  const ChannelModel = mongoose.model("Channel", channelSchema);
  export default ChannelModel;