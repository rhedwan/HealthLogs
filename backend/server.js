const app = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 🔥 Shutting down.....");
  server.close(() => {
    process.exit(1);
  });
});
