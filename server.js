import e from "express";
import { config } from "dotenv";
import cors from "cors";
import logger from "./src/common/utils/logger.js";
import { redisConfig } from "./src/common/config/redis.config.js";
import mongodbConfig from "./src/common/config/mongodb.config.js";
import languageRoutes from "./src/modules/language/language.route.js";
const app = e();

function initializeApp() {
  app.use(e.json());
  app.use(e.urlencoded({ extended: false }));
  app.use(cors("*"));
  config(); // dotenv config
  mongodbConfig(); // connect to db
  redisConfig();
}

function initializeModules(prefix) {
  app.use(prefix + "/language", languageRoutes);
}

function bootstrap() {
  initializeApp();
  initializeModules("/v1/api");

  const port = process.env.PORT ?? 4000;
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  });

  app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });
}
bootstrap();
