import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    movieID: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    season: {
      type: Number,
      required: true,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
