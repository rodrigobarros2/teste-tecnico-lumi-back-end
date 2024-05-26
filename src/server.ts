import app from "./index";

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server started on ${port}!`);
});
