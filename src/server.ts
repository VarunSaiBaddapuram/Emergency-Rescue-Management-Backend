import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
