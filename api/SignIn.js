import Client from "./mongodb.js";
import crypto from "node:crypto";

async function SignIn(hubID, password) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await Client.connect();

        const HubsCollection = await Client.db("main").collection("hubs");
        const hub = await HubsCollection.findOne({ hubID: hubID });

        if (hub) {
            const hashPassword = crypto.createHash('sha256')
                   .update(password)
                   .digest('hex');

            if (hashPassword == hub.password || password == hub.defaultPassword)
                return {message: "Sign in success", auth: true};
            else return {message: "Wrong password", auth: false};
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

export default SignIn;