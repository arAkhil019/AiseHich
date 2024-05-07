const DateTime = require('datetime');
const mysql = require('mysql');
const plt = require('matplotlib.pyplot');

const tSubs = {1: 'DS', 2: 'CAMP', 3: 'ADE', 4: 'DM', 5: 'DT', 6: 'DBMS'};
const lSubs = {7: 'DS LAB', 8: 'DT LAB', 9: 'DBMS LAB'};
const total = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
const timetable = {'Mon': [1, 3, 6, 5, 4], 'Tue': [9, 4, 5, 2], 'Wed': [7, 6, 3, 1], 'Thu': [9, 3, 2, 6, 1],
             'Fri': [4, 5, 2], 'Sat': [], 'Sun': []};
const graph = {};

const mydb = mysql.createConnection({
    host: "localhost",
    user: "akhil019",
    password: "Akhil019",
    database: "akhil019"
});

mydb.connect();

const query = "CREATE TABLE IF NOT EXISTS attendance_v1(Subject VARCHAR(255),Present VARCHAR(255),Absent VARCHAR(255),Total VARCHAR(255))";
mydb.query(query);

const subs = [...Object.values(tSubs), ...Object.values(lSubs)];

function insertSubs(subject) {
    console.log(subject);
    const query = "INSERT INTO attendance_v1(Subject, Present , Absent , Total ) VALUES (?,?,?,?)";
    mydb.query(query, [subject, 0, 0, 0]);
}

function updateAttendance(subject, status) {
    if (status === 1) {
        if (subject in tSubs) {
            const query = "UPDATE attendance_v1 SET Present = Present +1,Total = Total+1 WHERE Subject = ?";
            mydb.query(query, [subject]);
        } else {
            const query = "UPDATE attendance_v1 SET Present = Present +2,Total = Total+2 WHERE Subject = ?";
            mydb.query(query, [subject]);
        }
    } else {
        if (subject in lSubs) {
            const query = "UPDATE attendance_v1 SET Absent = Absent +2,Total = Total+2 WHERE Subject = ?";
            mydb.query(query, [subject]);
        } else {
            const query = "UPDATE attendance_v1 SET Absent = Absent +2,Total = Total+2 WHERE Subject = ?";
            mydb.query(query, [subject]);
        }
    }
    mydb.commit();
}

class Tracker {
    constructor() {
        console.log('in constructor');
        const Today = new DateTime();
        this.day = Today.aDay();
    }
    update() {
        console.log("Today's TimeTable is:");
        for (let i of timetable[this.day]) {
            if (i > 6) {
                console.log(lSubs[i] + '->');
            } else {
                console.log(tSubs[i] + '->');
            }
        }
        console.log('END\nEnter a list(coma separated) for Attendance as(Present:1/Absent:0):');
        const attend = prompt().split(',').map(Number);
        for (let i of timetable[this.day]) {
            if (i > 6) {
                updateAttendance(lSubs[i], attend[0]);
            } else {
                updateAttendance(tSubs[i], attend[0]);
            }
            attend.shift();
        }
    }
    display() {
        for (let i of subs) {
            const query = "SELECT (Present/Total)*100 AS Percentage FROM Attendance_v1 WHERE Subject = ?";
            mydb.query(query, [i], (err, result) => {
                if (err) throw err;
                for (let j of result) {
                    for (let k of j) {
                        graph[i] = parseFloat(k);
                    }
                }
            });
        }
        console.log(graph);
        const fig = plt.figure();
        const ax = fig.add_subplot(111);
        const bars = ax.bar(Object.keys(graph), Object.values(graph), {width: 0.5});
        plt.title("Attendance vs Subject");
        plt.xlabel("Subjects");
        plt.ylabel("Percentage");
        plt.yticks([0,10,20,30,40,50,60,70,80,90,100]);
        for (let bar of bars) {
            plt.text(bar.get_x(), bar.get_height() + 0.2, String(parseInt(bar.get_height())) + '%');
        }
        plt.grid({linewidth: 0.5, linestyle: '--', alpha: 0.6, color: 'grey'});

        plt.show();
    }
}

const s1 = new Tracker();
// s1.update();
s1.display();
mydb.commit();
mydb.close();
