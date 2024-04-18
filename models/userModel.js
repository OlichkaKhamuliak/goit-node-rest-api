import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { userRoles } from "../constans/userRoles.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

export const User = model("User", userSchema);
