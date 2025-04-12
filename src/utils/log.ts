//Modules
import chalk from "chalk";

export const info = (message: string, prefix?: string) =>
  chalk.cyan(`[${prefix ? prefix : "Info"}] ${message}`);
export const success = (message: string, prefix?: string) =>
  chalk.green(`[${prefix ? prefix : "Success"}] ${message}`);
export const error = (message: string, prefix?: string) =>
  chalk.red(`[${prefix ? prefix : "Error"}] ${message}`);
export const file = (message: string, prefix?: string) =>
  chalk.cyan(`[${prefix ? prefix : "File"}] ${message}`);
