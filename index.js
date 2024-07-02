import { app } from "./src/app.js";
import connectToDatabase from "./src/db/index.js";
import dotenv from "dotenv";


dotenv.config({
    path: "./.env"
})


connectToDatabase()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed!!", err)
})