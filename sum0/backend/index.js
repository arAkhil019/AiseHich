import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const days = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'akhil019',
    password: 'Akhil019',
    database: 'akhil019'
})

app.get('/', (req, res) => {
    res.json('Hello this is backend')
})

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM attendance_v1'
    db.query(query, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.get('/schedule', (req, res) => {
    let day = new Date().getDay()
    day = days[day]
    let schedule = {}
    const query = "SELECT ttable FROM ttables WHERE class='csm'"
    db.query(query,(err, result) => {
        if(err) {
            console.log(err)
        } else {
            // res.json("Time Table for today is fetched.")
            schedule = (JSON.parse(result[0].ttable))[day]
            console.log(schedule)
            const q = "SELECT Subject FROM subs WHERE sid IN (?)"
            db.query(q, [schedule], (err, subtdy) => {
                if(err) {
                    console.log(err)
                } else {
                    res.json(subtdy)
                }
        })
        }
    })
})

app.post('/insert', (req, res) => {
    const q = 'INSERT INTO attendance_v1 (Subject,Present,Absent,Total) VALUES (?)'
    const values = [
        req.body.Subject,
        req.body.Present,
        req.body.Absent,
        req.body.Total
    ]
    db.query(q,[values], (err, result) => {""
        if(err) {
            console.log(err)
        } else {
            res.json('Inserted successfully')
        }
    })
})


app.post('/update', (req, res) => {
    const q = 'UPDATE attendance_v1 SET Present = Present+1,Total = Total+1 WHERE Subject = "DS"'
    db.query(q, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json('Updated successfully')
        }
    })
})

app.post('/delete', (req, res) => {
    const q = 'DELETE FROM attendance_v1 WHERE Subject = "DS" and Present = 1'
    db.query(q, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json('Deleted successfully')
        }
    })
})

app.listen(8800, () => {
    console.log('Backend server is running!')
})