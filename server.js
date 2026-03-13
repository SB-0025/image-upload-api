import 'dotenv/config'
import app from "./src/app.js";
import db_connect from "./src/config/db_connect.js"

//db connect
db_connect()


const PORT = process.env.PORT || 4000



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

