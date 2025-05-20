import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import categoriesRoutes from "./routes/categories.js";
import toolsRoutes from "./routes/tools.js";
import contactRoutes from "./routes/contact.js";
import cartRoutes from "./routes/cart.js";

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/tools", toolsRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/cart', cartRoutes);

// static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
