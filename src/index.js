


///* eslint-disable no-undef */
const app = require("./app");
const mongodbConnection = require("./config/mongodb");
// 

async function bootstrap() {
      const server = app.listen(process.env.PORT, async () => {
            console.log(`Server running on port ${process.env.PORT}`);
            await mongodbConnection();
      });

      const exitHandler = () => {
            if (server) {
                  server.close(() => {
                        console.log("Server closed");
                  });
            }
            process.exit(1);
      };

      const unexpectedErrorHandler = (error) => {
            console.log(error);
            exitHandler();
      };

      process.on("uncaughtException", unexpectedErrorHandler);
      process.on("unhandledRejection", unexpectedErrorHandler);
}

bootstrap();