import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.js";
import toolsRoutes from "./routes/tools.js";
import contactRoutes from "./routes/contact.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/tools", toolsRoutes);
app.use("/api/contact", contactRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
