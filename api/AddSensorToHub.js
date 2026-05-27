import Client from "./mongodb.js";

async function AddSensorToHub(sensorID, hubID, alias) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");
        const SensorsCollection = await Client.db("main").collection("sensors");

        const sensor = await SensorsCollection.findOne({ sensorID: sensorID });
        const hub = await HubsCollection.findOne({ hubID: hubID });

        if (sensor && hub) {
            if (sensor.hubID != "") return { message: "Sensor has been connected to a hub already!", errCode: 400 }

            const addAtHub = await HubsCollection.updateOne(
                { hubID: hubID },
                { $push: { sensors: { sensorID: sensorID, sensorAlias: alias } } }
            );

            const addAtSensor = await SensorsCollection.updateOne(
                { sensorID: sensorID },
                { $set: { hubID: hubID } }
            );

            return {
                message: "Add done",
                addAtHub: addAtHub,
                addAtSensor: addAtSensor
            };
        }
        else return { message: "Invalid sensor or hub ID", errCode: 404 };
    }
    catch (err) {
        return { error: err };
    }
    finally {
        // Ensures that the client will close when you finish/error
        await Client.close();
    }
}

export default AddSensorToHub;