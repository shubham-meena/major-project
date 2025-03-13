const { spawn } = require('child_process');

// Replace 'python_script.py' with the path to your Python script
const pythonProcess = spawn('python', ['code.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python Output: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python Error: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python script exited with code ${code}`);
});










