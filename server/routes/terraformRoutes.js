const express = require("express");
const router = express.Router();

const {
  deploy,
  analyze,
  getFiles,
  getFile,
  saveFile,
} = require ("../controllers/terraformController");

router.post("/deploy", deploy);
router.post("/analyze", analyze);
router.get("/get-files", getFiles);
router.get("/get-file", getFile);
router.post("/save-file", saveFile);

module.exports = router;