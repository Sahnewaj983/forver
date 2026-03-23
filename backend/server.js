import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import authRouter from './routes/authRoute.js'

//App config

const app = express()
const port = process.env.PORT || 4000
await connectDb()
await connectCloudinary()

// Middlewares

app.use(express.json())
const FRONTEND_URL= process.env.FRONTEND_URL;
app.use(cors({
  origin: [
    "http://localhost:5173",
    FRONTEND_URL || ''
  ],
  credentials: true
}))
app.use(cookieParser())

// API endpoints

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/auth', authRouter)

app.get('/', (req,res) => {
    res.send("API working...")
})

// app.listen(port, () => {
//     console.log('server started on PORT : '+ port)
// })
export default app;