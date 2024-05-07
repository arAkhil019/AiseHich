const today = new Date();
const day = today.getDay();
const days = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'}

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const dict = JSON.parse(jsonString);

console.log(dict);

console.log(days[day]);