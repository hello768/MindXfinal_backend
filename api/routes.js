import GetSensor from "./GetSensor.js";
import GetHub from "./GetHub.js";
import UpdateSensor from "./UpdateSensor.js";
import RemoveSensorFromHub from "./RemoveSensorFromHub.js";
import AddSensorToHub from "./AddSensorToHub.js";
import SetHubAlias from "./SetHubAlias.js";
import SignIn from "./SignIn.js";
import ChangePassword from "./ChangePassword.js";

function AppRoute(app) {
    app.route("/")
        .get((req, res) => {
            res.send({ message: "API is running" })
        })

    // Get sensor information
    app.route("/sensor/:sensorID")
        .get(async function (req, res) {
            res.send(await GetSensor(req.params.sensorID))
        })

    // Get hub information
    app.route("/hub/:hubID")
        .get(async function (req, res) {
            res.send(await GetHub(req.params.hubID))
        })

    // Update sensor: set battery level, add measured values
    app.route("/set_sensor/:sensorID/:temperature/:timeStamp/:batteryLevel")
        .get(async function (req, res) {
            res.send(await UpdateSensor(req.params.sensorID, req.params.temperature, req.params.timeStamp, req.params.batteryLevel))
        })

    // Remove sensor from hub
    app.route("/remove_sensor/:sensorID")
        .get(async function (req, res) {
            res.send(await RemoveSensorFromHub(req.params.sensorID))
        })

    // Add sensor to hub
    app.route("/add_sensor/:sensorID/:hubID/:alias")
        .get(async function (req, res) {
            res.send(await AddSensorToHub(req.params.sensorID, req.params.hubID, req.params.alias))
        })

    // Set hub alias
    app.route("/hub_alias/:hubID/:alias")
        .get(async function (req, res) {
            res.send(await SetHubAlias(req.params.hubID, req.params.alias))
        })

    // Sign In
    app.route("/sign_in/:hubID/:password")
        .get(async function (req, res) {
            res.send(await SignIn(req.params.hubID, req.params.password))
        })

    // Change password
    app.route("/change_password/:hubID/:oldPassword/:newPassword")
        .get(async function (req, res) {
            res.send(await ChangePassword(req.params.hubID, req.params.oldPassword, req.params.newPassword))
        })

    // 404 not found
    /*
    app.all('*', (req, res) => {
        res.status(404).send('This page does not exist.');
    });
    */
}

export default AppRoute;