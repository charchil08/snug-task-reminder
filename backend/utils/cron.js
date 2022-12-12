const pool = require("../config/db");
const cron = require("node-cron")
const nodeMailer = require("nodemailer")

const sendMailToUser = async ({ toUser, title, description, priority, date, time, icon }) => {

    const emailTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Task Reminder</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <style>
      .image img {
        border: 2px silid yellow;
        border-radius: 50%;
      }
      h1 {
        text-align: center;
        color: #007bff;
        text-decoration: underline;
      }
      .desc {
        word-wrap: break-word;
        font-weight: 400;
      }
      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
      }
      .date {
        padding: 16px 0;
        font-size: 1.2rem;
        font-weight: bold;
        border-bottom: 2px solid #007bff;
      }
    </style>
      </head>
      <body class="text-center">
        <div class="image">
          <img
            src="${icon}"
            class="rounded-circle border border-warning p-2"
            alt="logo"
            style="width: 75px; margin: 16px 0"
          />
        </div>
        <h1 class="">${title}</h1>
        <p class="desc">
          ${description}
        </p>
        <div class="">
            <button type="button" class="btn">${priority} priority</button>
        </div>
        <div class="date">
          <p>${date} at ${time}</p>
        </div>
      </body>
    </html>
    `

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        requireTLS: true,
        secure: false,
        auth: {
            user: 'charchilk4@gmail.com',
            pass: 'bryzrahrkqmokvdj'
        }
    })

    const mailOptions = {
        from: 'charchilk4@gmail.com',
        to: toUser,
        subject: `Task alert : ${title}`,
        html: emailTemplate
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(`mail hase been sent to : ${info.response}`)
            console.table(info)
        }
    })
}

const getReminders = async () => {
    const getRemindersQuery = "select t.dueAt,t.title, t.description, t.priority, r.email from task as t inner join reminder as r on t.id=r.task_id"
    const { rows } = await pool.query(getRemindersQuery)
    return rows
}


const setReminderCron = async () => {

    cron.schedule("* * * * *", async () => {
        const reminders = await getReminders()

        let curDate = new Date()
        curDate = new Date(curDate.getTime() + (10 * 60 * 1000))
        let curMin = curDate.getMinutes()
        let curHours = curDate.getHours()
        let curDays = curDate.getDate()
        let curMonths = curDate.getMonth() + 1
        let curYear = curDate.getFullYear()
        console.log("🚀   file: cron.js:54   cron.schedule   curYear", curYear);
        console.log("🚀   file: cron.js:56   cron.schedule   curMonths", curMonths);
        console.log("🚀   file: cron.js:54   cron.schedule   curDays", curDays);
        console.log("🚀   file: cron.js:50   cron.schedule   curMin", curMin);
        console.log("🚀   file: cron.js:52   cron.schedule   curHours", curHours);

        for (let i = 0; i < reminders.length; i++) {
            let date = new Date(reminders[i].dueat)
            // console.log("🚀   file: cron.js:60   cron.schedule   date", date);
            let minutes = date.getMinutes()
            let hours = date.getHours()
            let days = date.getDate()
            let months = date.getMonth() + 1
            let year = date.getFullYear()
            console.log("----------------------------------------------------")
            console.log(reminders[i].title)
            console.log("🚀   file: cron.js:68   cron.schedule   year", year);
            console.log("🚀   file: cron.js:68   cron.schedule   months", months);
            console.log("🚀   file: cron.js:66   cron.schedule   days", days);
            console.log("🚀   file: cron.js:62   cron.schedule   minutes", minutes);
            console.log("🚀   file: cron.js:64   cron.schedule   hours", hours);

            if (curYear === year && curMonths === months && curDays === days && curHours === hours && curMin === minutes) {
                console.log("----------------------------------------------------")
                const mail = {
                    toUser: "jelanshishah9999@gmail.com",
                    title: reminders[i].title,
                    description: reminders[i].description,
                    priority: reminders[i].priority,
                    date: `${days}-${months}-${year}`,
                    time: `${hours}:${minutes}`,
                    icon: "https://th.bing.com/th/id/OIP.-Lex8hyEEnbYxwrrkCdT4QHaHa?pid=ImgDet&rs=1"
                }
                console.log(mail)
                sendMailToUser(mail)
            }
        }
    })
}

module.exports = {
    setReminderCron
}