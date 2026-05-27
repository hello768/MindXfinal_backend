import Client from "./mongodb.js";

async function RemoveSensorFromHub(sensorID) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");
        const SensorsCollection = await Client.db("main").collection("sensors");

        const sensor = await SensorsCollection.findOne({ sensorID: sensorID });

        if (sensor) {
            if (sensor.hubID == "") return { message: "Sensor not connected to any hub!", errCode: 400 }

            const hubID = sensor.hubID;

            const removeAtHub = await HubsCollection.updateOne(
                { hubID: hubID },
                { $pull: { sensors: { sensorID: sensorID } } }
            );

            const removeAtSensor = await SensorsCollection.updateOne(
                { sensorID: sensorID },
                { $set: { hubID: "" } }
            );

            return {
                message: "Remove done",
                removeAtHub: removeAtHub,
                removeAtSensor: removeAtSensor
            };
        }
        else return { message: "Invalid sensor ID", errCode: 404 };
    }
    catch (err) {
        return { error: err };
    }
    finally {
        // Ensures that the client will close when you finish/error
        await Client.close();
    }
}

export default RemoveSensorFromHub;