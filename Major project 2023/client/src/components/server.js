const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3001;

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.post('/run-python-script', (req, res) => {
  const { script } = req.body;

  const pythonProcess = spawn('python', [script]);

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    chunk = data.toString();
    // chunk.partition('\n')[0]
    // chunk.split('\n', 1)[0]

    console.log(`data1:${chunk}`);

    if(chunk == "benign" || chunk == "malignant")
      console.log(`data2:${chunk}`);
    
    // console.log(`Python Output: ${chunk}`);
    
      outputData += chunk;
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    res.json({ output: outputData }); // Send all accumulated output as the response
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
