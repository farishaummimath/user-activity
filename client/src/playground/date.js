const moment = require('moment-timezone')
const date =  "Mar 1 2020 11:11AM"
// const myMoment = moment(date, 'YYYY-MM-DD')
const d = "2020-03-01 11:11:00.00Z"
// const  dateobj = new Date(date); 
const myMoment = moment(d, 'YYYY-MM-DD')

// console.log(moment("March 1 2020 2:00PM").tz("America/Los_Angeles").format())
// console.log(Date.parse(date))

// console.log(moment('Mon 30-Mar-2020, 11:00 AM', 'ddd DD-MMM-YYYY, hh:mm A').format());
console.log(moment.tz('Mar 1 2020 11:11AM', 'MMM D YYYY hh:mmA',"America/Los_Angeles").format());
// var b = moment.tz("May 12 2014 8PM", "MMM D YYYY hA", "America/Los_Angeles");
// console.log(b.format())
// console.log(moment.tz("2013-12-01", "America/Los_Angeles").format())