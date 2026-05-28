import 'dotenv/config';
import express from "express";
import cors from "cors";
import AppRoute from "./api/routes.js";

const App = express();

App.use(cors());
App.use(express.json());

AppRoute(App);

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
export default App;
