import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectToDb from "./config/dbconfig.js"
dotenv.config()
const app = express()

// routes
import authRouter from "./router/auth.js"
import cartRouter from "./router/cart.js"
import orderRouter from "./router/order.js"
import dishRouter from "./router/dish.js"
import restaurantRouter from "./router/restaurant.js"
// object creation
//configuration middlewares ----------------------
app.use(cors({
  origin: process.env.FRONTEND_URL, // allow requests from this origin
  credentials: true, // allow sending cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // allow these methods
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//router middlewares --------------------

app.use("/api/auth", authRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/dish", dishRouter)


const PORT = process.env.PORT || 3000

connectToDb().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err)=>{ // this catch is not required as such because we are already terminating the process in dbconfig in case of database error
  console.error(`Error connecting to the database: ${err}`)
  process.exit(1)  
})