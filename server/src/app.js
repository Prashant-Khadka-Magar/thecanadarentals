import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();
// Middleware to handle CORS and allow cross-origin requests from specified origins
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

//middleware to make data available with limit of 16kb to prevent DDOS
app.use(express.json({limit: "16kb"}))
// Middleware to parse incoming URL-encoded data from forms with a limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

export { app };
