import Client from "./mongodb.js";
import crypto from "node:crypto";

async function ChangePassword(hubID, oldPassword, newPassword) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");
        const hub = await HubsCollection.findOne({ hubID: hubID });

        if (hub) {
            const hashOld = crypto.createHash('sha256')
                .update(oldPassword)
                .digest('hex');

            if (hashOld == hub.password || oldPassword == hub.defaultPassword) {
                const hashNew = crypto.createHash('sha256')
                    .update(newPassword)
                    .digest('hex');

                const result = await HubsCollection.updateOne(
                    { hubID: hubID },
                    { $set: { password: hashNew } }
                );

                return { message: "Done", result: result, auth: true };
            }
            else return { message: "Wrong password", auth: false };
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

export default ChangePassword;