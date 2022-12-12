const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const todoRoute = require("./routes/todo");
const reminderRoute = require("./routes/reminder")
const errorMiddleware = require("./middleware/error");
const { setReminderCron } = require("./utils/cron");


// UnCaught Error
process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`)
    console.error(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
})

const app = express()
dotenv.config({ path: "./config/config.env" })

app.use(cors())
app.use(express.json())


setReminderCron()
app.use("/api/v1/todos", todoRoute);
app.use("/api/v1/todos", reminderRoute)
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled promise rehection
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`)
    console.error(`Shutting down the server due to Unhandled Promise Rejection`)
    server.close(() => {
        process.exit(1)
    })
})
