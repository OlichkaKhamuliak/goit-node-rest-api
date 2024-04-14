import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    phone: {
      type: String,
      required: true,
      // unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.plugin(uniqueValidator, {
  message: "This {PATH} is already in use.",
});

export const Contact = model("Contact", contactSchema);
