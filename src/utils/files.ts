import { Client } from "tmi.js";
import * as log from "./log.ts";
import { Command } from "@/types/commands.ts";

export const getCommandsInfo = async (commandsInfo: Array<string>) => {
  const commands: Array<Array<String>> = [];

  for (const cmdPath of commandsInfo) {
    const fileName = cmdPath?.split("/")?.slice(-1)[0];

    //Verify file type
    if (!fileName.endsWith(".ts")) break;

    try {
      //Get command info
      const cmdInfo = await import(`${process.cwd()}/${cmdPath}`);

      //Check for required data
      if (
        !cmdInfo?.info ||
        !cmdInfo?.info.name ||
        !cmdInfo?.info.description ||
        !cmdInfo?.execute
      ) {
        console.log(log.error(`Invalid command: ${fileName}`,``));
        break;
      }

      //Load command info into map
      commands.push(cmdInfo.info);
    } catch (error) {
      console.log(log.error(`Could not get command info: ${fileName}`,``));
      console.log(error);
      break;
    }
  }

  return commands;
};

export const loadCommands = async (map: Map<string, Command>, commandsInfo: Array<string>, logActions: boolean) => {
  for (const cmdPath of commandsInfo) {
    const fileName = cmdPath?.split("/")?.slice(-1)[0];

    try {
      //Get command info
      const cmdInfo = await import(`${process.cwd()}/${cmdPath}`);

      //Check for required data
      if (!cmdInfo?.name || !cmdInfo?.execute) {
        console.log(log.error(`Invalid command: ${fileName}`,``));
        break;
      }

      //Load command info into map
      map.set(cmdInfo.name, cmdInfo);

      if (logActions)
        console.log(log.file(`Loaded command: ${cmdInfo.name}`,``));
    } catch (error) {
      console.log(log.error(`Could not load command: ${fileName}`,``));
      console.log(error);
      break;
    }
  }
};

export const loadEvents = async (eventsInfo: Array<string>, client: Client, logActions: boolean) => {
  for (const eventPath of eventsInfo) {
    const fileName = eventPath?.split("/")?.slice(-1)[0];

    //Verify file type
    if (!eventPath.endsWith(".ts")) continue;

    try {
      //Get event info
      const eventInfo = await import(`${process.cwd()}/${eventPath}`);

      //Check for required data
      if (!eventInfo?.name || !eventInfo?.execute) {
        console.log(log.error(`Invalid event: ${fileName}`,``));
        break;
      }

      //Load event onto client
      if (eventInfo.once)
        client.once(eventInfo.name, (...args: any[]) =>
          eventInfo.execute(client, ...args)
        );
      else
        client.on(eventInfo.name, (...args: any[]) =>
          eventInfo.execute(client, ...args)
        );

      if (logActions) console.log(log.file(`Loaded event: ${eventInfo.name}`,``));
    } catch (error) {
      console.log(log.error(`Could not load event: ${fileName}`,``));
      console.log(error);
      break;
    }
  }
};

