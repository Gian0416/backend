import express from "express";
import bookRoutes from "./routes/bookRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

let corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/book", bookRoutes);
app.use("/student", studentRoutes);
app.use("/user", userRoute);

try {
  const port = 3000;
  app.listen(port, () => {
    console.log(`listening to port ${port}...`);
  });
} catch (e) {
  console.log(e);
}
