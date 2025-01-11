import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoute.js"; 
import { setWebhook } from "./controllers/telegramController.js"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


setWebhook(); 


app.use("/api", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
