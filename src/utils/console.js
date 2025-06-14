import readline from "readline";

/**
 * Creates a readline interface for user input
 * @returns {Promise<string>} - User input
 */
export async function getUserInput(prompt = "👤: ") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

/**
 * Display colored console output
 * @param {string} type - The type of message (think, output, tool, user)
 * @param {string} message - The message to display
 */
export function displayMessage(type, message) {
  const icons = {
    think: "🧠",
    output: "💬",
    tool: "🔧",
    user: "👤",
    system: "🤖"
  };

  const icon = icons[type] || "ℹ️";
  console.log(`${icon}: ${message}`);
}
