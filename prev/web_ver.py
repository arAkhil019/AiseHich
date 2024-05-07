import mysql.connector as conn
import json

mydb = conn.connect(
    host="localhost",
    user="akhil019",
    password="Akhil019",
    database="akhil019"
)
mycursor = mydb.cursor()

tSubs = {1: 'DS', 2: 'CAMP', 3: 'ADE', 4: 'DM', 5: 'DT', 6: 'DBMS'}
lSubs = {7: 'DS LAB', 8: 'DT LAB', 9: 'DBMS LAB'}
total = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}
timetable = {'Mon': [1, 3, 6, 5, 4], 'Tue': [9, 4, 5, 2], 'Wed': [7, 6, 3, 1], 'Thu': [9, 3, 2, 6, 1],
             'Fri': [4, 5, 2], 'Sat': [7,8,9], 'Sun': []}
subs = list(tSubs.values())+list(lSubs.values())
i=0
# print(2 if "DS LAB" in lSubs.values() else 1)
for sub in subs: #to add subjects
    i=i+1
    print(sub,i)
    query = "INSERT INTO subs(sid, Subject, Duration) VALUES (%s, %s, %s)"
    mycursor.executemany(query, [(i, sub, 2 if sub in lSubs.values() else 1)])

query = "INSERT INTO ttables(sno, class, ttable) VALUES (DEFAULT,%s,%s)"

stndby = json.dumps({"Mon": [1, 3, 6, 5, 4], "Tue": [9, 4, 5, 2], "Wed": [7, 6, 3, 1], "Thu": [9, 3, 2, 6, 1], "Fri": [4, 5, 2], "Sat": [7, 8, 9], "Sun": []})
# print(str(stndby))
data = [("csm32", str(stndby))]
# mycursor.executemany(query, data)  #to add time table
mycursor.execute("SELECT * FROM ttables")
res=mycursor.fetchall()
print(res)
mydb.commit()
mycursor.close()
mydb.close()
