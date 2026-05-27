import Client from "./mongodb.js";

async function UpdateSensor(sensorID, temperature, timeStamp, batteryLevel) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const SensorsCollection = await Client.db("main").collection("sensors");

        const newMeasure = {
            timeStamp: timeStamp,
            temperature: parseFloat(temperature)
        };

        const result = await SensorsCollection.updateOne(
            { sensorID: sensorID },
            { $set: { batteryLevel: parseFloat(batteryLevel) }, $push: { measure: newMeasure } }
        );

        return { result: result };

        /*
        "result": {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
        */
    }
    catch (err) {
        return { error: err };
    }
    finally {
        // Ensures that the client will close when you finish/error
        await Client.close();
    }
}

export default UpdateSensor;