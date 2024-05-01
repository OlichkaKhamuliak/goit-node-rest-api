import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { userSubscription } from "../constans/userSubscription.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscription),
      default: userSubscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware, яке динамічно змінює валідацію verificationToken
userSchema.pre("validate", function (next) {
  if (this.verify) {
    // Якщо користувач верифікований, зніміть вимогу до verificationToken
    this.constructor.schema.path("verificationToken").required(false);
  } else {
    // Якщо користувач не верифікований, залиште verificationToken як обов'язкове поле
    this.constructor.schema.path("verificationToken").required(true);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=identicon`;
  }

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

export const User = model("User", userSchema);
