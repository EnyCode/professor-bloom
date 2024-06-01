"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.torielNewUser = void 0;
const index_1 = require("../index");
const sendWelcomeMsg_1 = require("../lib/sendWelcomeMsg");
const sendRawToSlack_1 = require("../util/sendRawToSlack");
async function torielNewUser(req, res) {
    try {
        const body = req.body;
        if (process.env.node_env === "production") {
            await (0, sendRawToSlack_1.sendRawToSlack)(index_1.app.client, body);
            return res.status(200).json({ message: "Request received" });
            // send request.body to slack as a message
        }
        else {
            if (!body.userId || !body.continent || !body.joinReason) {
                return res.status(400).json({
                    error: "Invalid request: Missing Args. Args should be userId, continent, and joinReason",
                });
            }
            else if (typeof body.userId !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid request: userId must be a string" });
            }
            else if (typeof body.continent !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid request: continent must be a string" });
            }
            else if (typeof body.joinReason !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid request: joinReason must be a string" });
            }
            else if (body.continent !== "north_america" &&
                body.continent !== "south_america" &&
                body.continent !== "europe" &&
                body.continent !== "asia" &&
                body.continent !== "africa" &&
                body.continent !== "australia" &&
                body.continent !== "antarctica") {
                return res.status(400).json({
                    error: "Invalid request: continent must be one of north_america, south_america, europe, asia, africa, australia, or antarctica",
                });
            }
            else {
                await (0, sendWelcomeMsg_1.sendWelcomeMsg)(index_1.app.client, body).then(() => {
                    return res.status(200).json({ message: "Request received" });
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.torielNewUser = torielNewUser;
//# sourceMappingURL=toriel.js.map