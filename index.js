///* eslint-disable no-undef */
const app = require("./src/app");
const mongodbConnection = require("./src/config/mongodb");
//

async function bootstrap() {
  //
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
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
