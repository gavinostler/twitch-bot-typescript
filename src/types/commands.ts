import { TMIMessageEvent } from "@/utils/events";
import { Client } from "tmi.js";

export type Command = {
  execute: (client: Client, event: TMIMessageEvent) => Promise<void>;
} & CommandData

export type CommandData = {
  name: string;
};
