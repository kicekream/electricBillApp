const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: { type: String, unique: true },
  phone: String,
  //plan: [{ type: Schema.Types.ObjectId, ref: Plan }],
  date_of_create: {type: Date, default: Date.now}
},
  {
      toObject: { virtuals: true},
      toJSON: {virtuals: true}
  }
);

//Virtual for Name
userSchema.virtual("name").get(function() {
  return this.first_name + ", " + this.last_name;
});

//Virtual for direct url to fetch user details
userSchema.virtual("url").get(function() {
  return "user/" + this._id;
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    first_name: Joi.string()
      .required()
      .min(3),
    last_name: Joi.string()
      .required()
      .min(3),
    username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .required()
      .min(3)
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
