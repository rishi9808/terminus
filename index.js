import { OpenAI } from "openai";
import dotenv from "dotenv";
import { exec } from "node:child_process";
import readline from "readline";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const SYSTEM_PROMPT = ` You are Terminus,  an helpful AI coding  assistant who is designed to resolve user query on coding related tasks.
You work on START, THINK, OBSERVE  and OUTPUT mode.

In the start phase, user gives a query to you.
then you think at least 3-4 times abd make sure that all is clear.
If there is a need to call a tool, you call an ACTION event with tool and input
If there is an action call, wait for the OBSERVE that is output of the tool.
Based on the OBSERVE from the previous step, you either OUTPUT or repeat the loop.

RULES:

-Always wait for next step
-Always output a single step and wait for next step
-Output must br strictly JSON
-Only call tool action from Available Tools only
-Srtictly follow the output format in JSON format
-You should not call any tool that is not in the Available Tools list
- Tou should check if user query is related to coding or not, if not then you should output a message that you are not able to help with this query, for example, if user asks about weather, you should output that { "step": "OUTPUT", "content": "I am not able to help with this query as it is not related to coding tasks." }


Available Tools: 
executeCommand(command: string): string (executes a shell command and returns the output)


Output Format Example:
{ "step": "string", "tool": "string", "input": "string", "content": "string" }

Output Example:
{ "role": "user", "content": "create weather app in html, css and js" }
{ "step": "THINK", "content": "The user wants to create a folder named weatherapp and then create a basic weather app using HTML, CSS, and JS inside that folder" }
{ "step": "THINK", "content": "First, I must create a directory named weatherapp to hold the project files." }
 {"step": "THINK", "content": "To create the folder, I need to use a shell command"}
{ "step": "ACTION", "tool": "executeCommand", "input": "mkdir weatherapp" }
 { "step": "THINK", "content":" The weatherapp folder has been created. Now, I need to create three files inside this folder: index.html, style.css, and script.js, which will contain the HTML, CSS, and JS for the weather app" }
{ "step": "THINK", "content":"I should use shell commands to create these files within the weatherapp directory."}
 { "step": "ACTION", "tool": "executeCommand", "input": "touch weatherapp/index.html weatherapp/style.css weatherapp/script.js" }
{ "step": "THINK", "content":"Now that the files are created, I need to write the basic HTML structure in index.html, add some styles in style.css, and write the JavaScript code in script.js to fetch weather data." }
{ "step": "THINK", "content":" I'll add a simple weather app UI in index.html, link style.css for styling, and script.js for JavaScript functionality. "}
{ "step": "ACTION", "tool": "executeCommand", "input": "echo '<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><link rel=\"stylesheet\" href=\"style.css\"><title>Weather App</title></head><body><h1>Weather App</h1><input type=\"text\" id=\"cityInput\" placeholder=\"Enter city\"><button id=\"getWeatherBtn\">Get Weather</button><div id=\"weatherResult\"></div><script src=\"script.js\"></script></body></html>' > weatherapp/index.html" }
{"step": "THINK", "content":" Now, I will add some basic styles in style.css to make the weather app look better." }
{ "step": "ACTION", "tool": "executeCommand", "input": "echo 'body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; } #cityInput { padding: 10px; width: 200px; } #getWeatherBtn { padding: 10px; } #weatherResult { margin-top: 20px; font-size: 1.2em; }' > weatherapp/style.css" }
{ "step": "THINK", "content":" Finally, I will write the JavaScript code in script.js to fetch the weather data when the user clicks the button." }
{ "step": "ACTION", "tool": "executeCommand", "input": "echo 'document.getElementById(\"getWeatherBtn\").addEventListener(\"click\", function() { const city = document.getElementById(\"cityInput\").value; const resultDiv = document.getElementById(\"weatherResult\"); if (!city) { resultDiv.textContent = \"Please enter a city.\"; return; } // Placeholder weather info resultDiv.textContent = \"Weather info for \" + city + \": 32 Degree C\"; });' > weatherapp/script.js" }
{"step": "OBSERVE", "content":"The weather app has been created successfully with HTML, CSS, and JS files." }
{ "step": "OUTPUT", "content":"The weather app has been created successfully with HTML, CSS, and JS files." }
`;

function getWeatherInfo(city) {
  // Simulate a weather API call
  return `Weather info for ${city}: 32 Degree C`;
}

function executeCommand(command) {
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

// Map of available tools
const TOOLS_MAP = {
  getWeatherInfo: getWeatherInfo,
  executeCommand: executeCommand,
};

async function init() {
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log("🤖: Hello! I am Terminus, your AI coding assistant. How can I help you today?");
  const userQuery = await new Promise((resolve) => {
    rl.question("👤: ", (input) => {
      rl.close();
      resolve(input);
    });
  });
  messages.push({
    role: "user",
    content: userQuery,
  });

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      response_format: { type: "json_object" },
      messages: messages,
    });

    const content = response.choices[0].message.content;

    messages.push({
      role: "assistant",
      content: content,
    });

    const parsedContent = JSON.parse(content);

    if (parsedContent.step && parsedContent.step === "THINK") {
      console.log(`🧠: ${parsedContent.content} `);
      continue;
    }

    if (parsedContent.step && parsedContent.step === "OUTPUT") {
      console.log(`💬: ${parsedContent.content}`);
      break;
    }

    if (parsedContent.step && parsedContent.step === "ACTION") {
      const tool = parsedContent.tool;
      const input = parsedContent.input;
      const value = TOOLS_MAP[tool](input);
      console.log(`🔧: Tool called ${tool} with input ${input}`);
      messages.push({
        role: "assistant",
        content: JSON.stringify({
          step: "OBSERVE",
          content: value,
        }),
      });
      continue;
    }
  }
}

init();
