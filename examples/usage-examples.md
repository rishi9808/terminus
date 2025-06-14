# Terminus Usage Examples

## Example 1: Creating a Web Project

**User Query:** "Create a simple weather app with HTML, CSS, and JavaScript"

**Terminus Response:**
```
🧠: The user wants to create a weather app with HTML, CSS, and JavaScript files
🧠: I need to create a project structure with the necessary files
🔧: Tool called executeCommand with input mkdir weather-app
🔧: Tool called executeCommand with input touch weather-app/index.html weather-app/style.css weather-app/script.js
💬: I've created a weather app with HTML structure, CSS styling, and JavaScript functionality
```

## Example 2: Setting up a Node.js Project

**User Query:** "Initialize a new Node.js project with Express"

**Terminus Response:**
```
🧠: The user wants to create a new Node.js project with Express framework
🧠: I need to initialize npm and install Express
🔧: Tool called executeCommand with input npm init -y
🔧: Tool called executeCommand with input npm install express
💬: I've initialized a Node.js project and installed Express. The project is ready for development.
```

## Example 3: Git Operations

**User Query:** "Create a new Git repository and make initial commit"

**Terminus Response:**
```
🧠: The user wants to initialize a Git repository and make an initial commit
🧠: I need to run git init, add files, and commit
🔧: Tool called executeCommand with input git init
🔧: Tool called executeCommand with input git add .
🔧: Tool called executeCommand with input git commit -m "Initial commit"
💬: I've initialized a Git repository and made the initial commit with all current files.
```

## Example 4: Non-Coding Query

**User Query:** "What's the weather like today?"

**Terminus Response:**
```
💬: I am not able to help with this query as it is not related to coding tasks.
```

## Tips for Better Results

1. **Be Specific**: The more specific your request, the better Terminus can help
2. **Coding Focus**: Terminus is designed for coding tasks, so keep queries development-related
3. **Step by Step**: For complex tasks, Terminus will break them down into logical steps
4. **Error Handling**: If a command fails, Terminus will provide error information
