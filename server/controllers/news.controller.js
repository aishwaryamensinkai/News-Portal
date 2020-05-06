const mongoose = require("mongoose");
const _ = require("lodash");

var ObjectId = require("mongoose").Types.ObjectId;

const News = mongoose.model("News");

module.exports.bregister = (req, res) => {
  var news = new News({
    _id: new mongoose.Types.ObjectId(),
    location: req.body.location,
    nid: req.body.nid,
    headline: req.body.headline,
    des: req.body.des,
    pincode: req.body.pincode,
    category: req.body.category,
    date: req.body.date,
  });

  news.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    // else {
    //   console.log(
    //     "Error in News Save :" + JSON.stringify(err, undefined, 2)
    //   );
    else {
      if (err.code == 11000) res.status(422).send(["Duplicate found."]);
      else return next(err);
    }
  });
};

module.exports.newsProfile = (req, res, next) => {
  News.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving News :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};


module.exports.update = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var news = {
    location: req.body.location,
    nid: req.body.nid,
    headline: req.body.headline,
    des: req.body.des,
    pincode: req.body.pincode,
    category: req.body.category,
  };

  News.findByIdAndUpdate(
    req.params.id,
    { $set: news },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in News Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};

module.exports.deleteNews = (req, res) => {
  if (!ObjectId.isValid(req.params.nid))
    return res.status(400).send(`No record with given id : ${req.params.nid}`);

  News.findByIdAndRemove(req.params.nid, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in News Delete :" + JSON.stringify(err, undefined, 2));
    }
  });
};
