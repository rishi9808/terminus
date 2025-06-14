# Terminus AI Coding Assistant

Terminus is an intelligent AI-powered coding assistant that helps developers with various coding tasks through natural language interaction. It uses OpenAI's GPT models to understand user queries and execute appropriate actions using a structured thinking process.

## Features

- 🤖 **AI-Powered Assistance**: Leverages OpenAI's GPT models for intelligent code assistance
- 🔧 **Command Execution**: Can execute shell commands to help with development tasks
- 🧠 **Structured Thinking**: Uses a START → THINK → OBSERVE → OUTPUT approach for problem-solving
- 💬 **Interactive Interface**: Clean command-line interface with colored output
- 🎯 **Coding Focus**: Specifically designed for coding-related queries and tasks

## Demo

🎥 **[Watch Demo Video](https://drive.google.com/file/d/1SweUkxMCoLHM6NN5wJoRUo1eBiIqmoRL/view?usp=sharing)** - See Terminus in action!

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd terminus
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Example Interaction
```
🤖: Hello! I am Terminus, your AI coding assistant. How can I help you today?
👤: Create a simple HTML page with a contact form
🧠: The user wants to create an HTML page with a contact form...
🔧: Tool called executeCommand with input mkdir contact-form
💬: I've created a contact form HTML page with proper styling and structure.
```

## Project Structure

```
terminus/
├── src/
│   ├── config/
│   │   ├── openai.js          # OpenAI client configuration
│   │   └── prompts.js         # System prompts and instructions
│   ├── core/
│   │   └── terminus.js        # Main AI assistant class
│   ├── tools/
│   │   └── index.js           # Available tools (executeCommand, etc.)
│   ├── utils/
│   │   └── console.js         # Console utilities and formatting
│   └── index.js               # Application entry point
├── docs/                      # Documentation
├── examples/                  # Usage examples
├── .env                       # Environment variables
├── .gitignore                # Git ignore rules
├── package.json              # Project configuration
└── README.md                 # This file
```

## Available Tools

- **executeCommand**: Executes shell commands and returns output
- More tools can be easily added to the `src/tools/` directory

## How It Works

Terminus follows a structured approach to problem-solving:

1. **START**: User provides a query
2. **THINK**: AI analyzes the query and plans the solution
3. **ACTION**: If needed, executes appropriate tools
4. **OBSERVE**: Reviews the results of actions
5. **OUTPUT**: Provides the final response

## Configuration

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Model Configuration
The default model is `gpt-4.1`, but this can be changed in `src/config/openai.js`.

## Development

### Adding New Tools
1. Create your tool function in `src/tools/index.js`
2. Add it to the `TOOLS_MAP` in `src/core/terminus.js`
3. Update the system prompt in `src/config/prompts.js` to include the new tool

### Project Guidelines
- Follow ES6 module syntax
- Use descriptive function names and comments
- Keep tools focused and single-purpose
- Handle errors gracefully

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
