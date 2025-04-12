//Modules
import recursive from "recursive-readdir";
import "dotenv/config";
import * as conf from "./config.ts"
require('module-alias/register')
import * as log from "@utils/log.ts";
import { Client } from "tmi.js";

//Check for required variables
if (!process.env.PASSWORD) {
  console.log(
    log.error('No token was found in ".env". Please enter one and try again.')
  );
}

//Create client
const client = new Client({
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
    channels: conf.channels,
})

import { loadEvents } from "@/utils/files.ts";

//Load events

recursive("./src/events/").then((eventsInfo) => {
  eventsInfo?.filter((path) => path.endsWith(".ts"));
  loadEvents(eventsInfo, client, true);
})

console.log(
    log.info("trying to login..."))

client.connect().catch(console.error);
