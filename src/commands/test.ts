import { TMIMessageEvent } from "@/utils/events";
import { Client } from "tmi.js";
import * as log from "@utils/log.ts";

export const name = "test";

export const execute = async (client: Client, event: TMIMessageEvent) => {
    console.log(log.success("Test command executed"));

    client.say(event.channel, `Test command executed by @${event.getUsername()}`);
}