import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import routerUploads from "./middlewares/upload.js";
import { resolvers } from "./resolvers/index.js";
import { createContext } from "./context.js";
import { expressMiddleware } from "@apollo/server/express4";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // ✅ fixed

app.use("/uploads", routerUploads);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use((req, res, next) => {
  if (!req.body && process.env.NODE_ENG !== "production") {
    req.body = {};
  }
  next();
});

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => await createContext({ req, res }),
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});