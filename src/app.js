import express from "express";
import cors from "cors";
import authenticateToken from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandlers.js";



const app = express();
app.use(express.json());

app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          const msg = "The CORS policy for this site does not allow access.";
          callback(new Error(msg), false);
        }
      },
    })
  );

  const allowedOrigins = [
    "http://coffee-shop-637368184.ap-south-1.elb.amazonaws.com",
    "http://localhost:3000",
  ]
app.use(express.json({
    limit: "50mb",
}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}))

app.get("/", (_, res) => {
    res.status(200).json({ message: "home" })
})



app.use(authenticateToken)


import userRouter from './routes/users.routes.js';
import coffeeShopRouter from './routes/shops.routes.js';
import productRouter from './routes/products.routes.js';
import reviewRouter from './routes/reviews.routes.js';
import favoriteRouter from './routes/favorites.routes.js';


app.use("/api/v1/user/", userRouter)
app.use("/api/v1/shop/", coffeeShopRouter)
app.use("/api/v1/product/", productRouter)
app.use("/api/v1/review/", reviewRouter)
app.use("/api/v1/favorite/", favoriteRouter)


app.use(errorHandler);

export { app };