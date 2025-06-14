import { exec } from "node:child_process";

/**
 * Executes a shell command and returns the output
 * @param {string} command - The shell command to execute
 * @returns {Promise<string>} - The command output
 */
export function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      resolve(
        `Command output: ${stdout.trim()} \nError (if any): ${stderr.trim()}`
      );
    });
  });
}

