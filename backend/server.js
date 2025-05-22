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
console.log("Routes being registered:");
console.log("/categories", categoriesRoutes);
console.log("/tools", toolsRoutes);
console.log("/api/contact", contactRoutes);
console.log("/api/cart", cartRoutes);

app.use(cors());
app.use(express.json());


app.use("/categories", categoriesRoutes);
app.use("/tools", toolsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Serve React frontend static files
app.use(express.static(path.join(__dirname, "frontend/dist")));

// For all other routes, send back React's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
