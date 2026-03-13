import express from "express"
import router from "./routes/upload.routes.js"

const app = express()

app.use(express.json())

//static folder
app.use("/uploads", express.static("uploads"))

app.use("/api", router)
app.get("/", (req, res) => {
    res.send("Hello...")
})

export default app
