const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var newsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: {
    type: String,
    required: "Location Cant Be Empty.",
  },
  nid:{
    type:String,
    required:"News Id Cant be Empty.",
  },
  headline: {
    type: String,
    required: "HeadLine Cant Be Empty.",
  },
  des: {
    type: String,
    required: "Description Cant Be Empty.",
  },
  pincode: {
    type: String,
    required: "Pinecode is required.",
    minlength: 6,
  },
  category: {
    type: String,
    required: "Please Select the category",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  saltSecret: String,
});

// Events
newsSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
newsSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

newsSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("News", newsSchema);
