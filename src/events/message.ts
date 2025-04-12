//Modules
import { reply, truncateString } from "@utils/misc.ts";
import * as log from "@utils/log.ts";
import { loadCommands } from "@/utils/files";
import recursive from "recursive-readdir";
import { Command } from "@/types/commands.ts";
import { Client } from "tmi.js";
import { TMIMessageEvent } from "@utils/events.ts"


let commandsList: Map<string, Command> = new Map();

export const getCommands = async () => {
  //Load commands
  if (commandsList.size > 0) {
    return commandsList;
  }

  let commandsInfo = await recursive("./src/commands/");
  commandsInfo?.filter((path: any) => path.endsWith(".ts"));

  await loadCommands(commandsList, commandsInfo, true);
  return commandsList;
};
getCommands();


export const name = "message";

export const execute = async (client: Client, ...args: any) => {

  const event: TMIMessageEvent = new TMIMessageEvent(args[0], args[1], args[2], args[3]);

  //Filter out non-chat events
  if (!event.isChat()) return;

  // filter out self messages
  if (event.isSelf()) return;

  // Check if the message is a command
  if (!event.getCommand()) return;


  //Grab the command data from the client.commands map
  const cmd = commandsList.get(event.getCommand()!);

  //Check if the command does not exist
  if (!cmd)
    return;
    // return await client.say(
    //   event.channel, reply(`Command not found: ${event.getCommand()}`, event.getUsername())
    // );

  //Run the command
  cmd.execute(client, event).catch(async (error) => {
    console.log(log.error("Execution Error"));
    console.log(error);

    //Send embed
    event.channel, reply(`Something went wrong.`, event.getUsername())
  });
};
