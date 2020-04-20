const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlNews = require("../controllers/news.controller");
const ctrlFeedback = require("../controllers/feedback.controller");

const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post("/bregister", ctrlNews.bregister);
router.get("/newsProfile", ctrlNews.newsProfile);
router.patch("/update/:id", ctrlNews.update);
router.delete("/deleteNews/:nid", ctrlNews.deleteNews);

router.post("/fregister", ctrlFeedback.fregister);
router.get("/feedbackProfile", ctrlFeedback.feedbackProfile);
module.exports = router;
