import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userCategorySchema = new Schema(
  {
    category: String,
    userEmail: String,
  },
  {
    timestamps: true,
  }
);

const UserCategory =
  mongoose.models.UserCategory ||
  mongoose.model("UserCategory", userCategorySchema);

export default UserCategory;
