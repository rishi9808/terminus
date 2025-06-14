import { TerminusAI } from "./src/core/terminus.js";
import { getUserInput, displayMessage } from "./src/utils/console.js";

/**
 * Initialize and start the Terminus AI assistant
 */
async function init() {
  const terminus = new TerminusAI();
  
  displayMessage("system", "Hello! I am Terminus, your AI coding assistant. How can I help you today?");
  
  try {
    const userQuery = await getUserInput();
    await terminus.processQuery(userQuery);
  } catch (error) {
    displayMessage("system", `An error occurred: ${error.message}`);
  }
}

// Start the application
init().catch(console.error);
