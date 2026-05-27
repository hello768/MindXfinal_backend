import Client from "./mongodb.js";

async function SetHubAlias(hubID, alias) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");
        const hub = await HubsCollection.findOne({ hubID: hubID });

        if (hub) {
            const result = await HubsCollection.updateOne(
                { hubID: hubID },
                { $set: { hubAlias: alias } }
            );

            return {
                message: "Done",
                result: result
            };
        }
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

export default SetHubAlias;