import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import 'dotenv/config'
import dbConnection from "./utils/dbConnection";
import adminRouter from "./routes/adminRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/', userRouter);

dbConnection();
app.listen(5000, () => {
  console.log('server listening on port 5000');
});
