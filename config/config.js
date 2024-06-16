import mysql from 'mysql';
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hrishi',
  password : 'Root@#1234@#',
  database : 'task'
});
 


export default connection;