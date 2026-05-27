import Client from "./mongodb.js";

async function GetHub(hubID) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");

        const hub = await HubsCollection.findOne({ hubID: hubID });

        if (hub) return hub;
        else return { message: "Invalid hub ID", errCode: 404 };
    }
    catch (err) {
        return { error: err };
    }
    finally {
        // Ensures that the client will close when you finish/error
        await Client.close();
    }
}

export default GetHub;