const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "Please Provide a First Name"],
    validate: {
      validator: function (name) {
        return /^[a-zA-Z\. ]*$/.test(name);
      },
      message: "Please Provide a Valid Name",
    },
  },
  LastName: {
    type: String,
    required: [true, "Please Provide a Last Name"],
    validate: {
      validator: function (name) {
        return /^[a-zA-Z\. ]*$/.test(name);
      },
      message: "Please Provide a Valid Last Name",
    },
  },
  Email: {
    type: String,
    required: [true, "Please Provide a Email"],
    validate: {
      validator: function (email) {
        return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(
          email
        );
      },
      message: "Please Provide a Valid Email",
    },
  },
  Phone: {
    type: String,
    required: [true, "Please Provide a Phone"],
    validate: {
      validator: function (Mobile) {
        return /^[6-9]\d{9}$/.test(Mobile);
      },
      message: "Please Provide a Indian Phone No.",
    },
  },
  Password: {
    type: String,
    required: [true, "Please Provide a Password"],
    validate: {
      validator: function (pass) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
          pass
        );
      },
      message:
        "Password should contain 1 special Character and One Alphabets and One Number",
    },
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
