import app from './app.js'
import connection from './config/config.js'

const PORT = 5000

connection.connect(error => {
    if (error) throw error;
    console.log("DB connected");
});

app.listen(PORT,() => {
    console.log(`Server is running at port: ${PORT}`)
})