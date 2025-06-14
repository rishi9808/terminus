import { client, MODEL } from "../config/openai.js";
import { SYSTEM_PROMPT } from "../config/prompts.js";
import { executeCommand  } from "../tools/index.js";
import { displayMessage } from "../utils/console.js";

// Map of available tools
const TOOLS_MAP = {
  executeCommand: executeCommand,
};

/**
 * Main AI assistant class
 */
export class TerminusAI {
  constructor() {
    this.messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];
  }

  /**
   * Add a user message to the conversation
   * @param {string} content - User message content
   */
  addUserMessage(content) {
    this.messages.push({
      role: "user",
      content: content,
    });
  }

  /**
   * Add an assistant message to the conversation
   * @param {string} content - Assistant message content
   */
  addAssistantMessage(content) {
    this.messages.push({
      role: "assistant",
      content: content,
    });
  }

  /**
   * Process user query and handle AI responses
   * @param {string} userQuery - The user's query
   */
  async processQuery(userQuery) {
    this.addUserMessage(userQuery);

    while (true) {
      const response = await client.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: this.messages,
      });

      const content = response.choices[0].message.content;
      this.addAssistantMessage(content);

      const parsedContent = JSON.parse(content);

      if (parsedContent.step === "THINK") {
        displayMessage("think", parsedContent.content);
        continue;
      }

      if (parsedContent.step === "OUTPUT") {
        displayMessage("output", parsedContent.content);
        break;
      }

      if (parsedContent.step === "ACTION") {
        const tool = parsedContent.tool;
        const input = parsedContent.input;
        
        if (!TOOLS_MAP[tool]) {
          displayMessage("system", `Tool "${tool}" not found`);
          break;
        }

        try {
          const value = await TOOLS_MAP[tool](input);
          displayMessage("tool", `Tool called ${tool} with input ${input}`);

          this.addAssistantMessage(JSON.stringify({
            step: "OBSERVE",
            content: value,
          }));
        } catch (error) {
          displayMessage("system", `Error executing tool ${tool}: ${error}`);
          this.addAssistantMessage(JSON.stringify({
            step: "OBSERVE",
            content: `Error: ${error}`,
          }));
        }
        continue;
      }
    }
  }
}
