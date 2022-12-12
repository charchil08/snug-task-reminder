const express = require("express")
const { setReminder } = require("../controller/reminder")

const router = express.Router()

router.route("/reminder/:todoId").post(setReminder)

module.exports = router