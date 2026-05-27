import Client from "./mongodb.js";

async function GetSensor(sensorID) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const SensorsCollection = await Client.db("main").collection("sensors");

        const sensor = await SensorsCollection.findOne({ sensorID: sensorID });

        if (sensor) return sensor;
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

export default GetSensor;