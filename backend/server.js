import express from "express";
// const { ObjectID } = require('mongodb');
// const { exec } = require('child_process');
import asyncHandler from "express-async-handler";
import { spawn, exec } from 'child_process';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
console.log("hello");
const app = express();
app.use(express.static('public'));
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import ExcelJS from "exceljs";
import { error } from "console";
// import ProjectData from './model.js';

let dataserver = "";
let projectName = "";
let sheetPath = "";
let sheetName = "";
let choice = "";

const workbook = new ExcelJS.Workbook();
let sheetNames = new Set();

const headers = [
  "TestCaseName",
  "DependOnTest",
  "Description",
  "RandomValues",
  "RequestType",
  "BaseURI",
  "BasePath",
  "RequestHeaders",
  "RequestCookies",
  "QueryParameters",
  "PathParameters",
  "RequestBody",
  "RequestParameters",
  "MultiPartData",
  "ResponseCode",
  "ResponseType",
  "ResponseCookiesToBeSaved",
  "ResponseHeadersToBeSaved",
  "ResponseBodyFieldToBeSaved",
  "ResponseCookieValidation",
  "ResponseCookieExpressionValidation",
  "ResponseHeaderValidation",
  "ResponseHeaderExpressionValidation",
  "ResponseBodySchema",
  "ResponseBody",
  "ResponseBodyParameters",
  "ResponseBodyExpressionValidation",
]

app.get('/config', (req, res) => {
  try {
    const configFileContent = fs.readFileSync('/home/aryangupta/react/Testing/config.json', 'utf8');
    console.log(configFileContent);

    if (!configFileContent || (Object.keys(JSON.parse(configFileContent)).length === 0 && JSON.parse(configFileContent).constructor === Object)) {
      // If the config file is empty, return an empty object
      res.json({});
      return;
    }

    let configData;
    try {
      configData = JSON.parse(configFileContent);
      console.log(configData);
      choice = configData.choice;
      console.log(choice);
      if (choice === "mongodb") {
        dataserver = configData.input1;
        projectName = configData.input2;
        let x = "";
        if (dataserver === "/") {
          dataserver = "mongodb://localhost:27017/";
        }
        if (projectName === "/") {
          projectName = "testing";
        }
        console.log(dataserver);
        console.log(projectName)
        let mongoCall = x.concat(dataserver, projectName);
        console.log(mongoCall);
        mongoose.connect(mongoCall, {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
          .then(() => {
            console.log('Connected to MongoDB');
            // res.sendStatus(200);
            res.json(configData);
          })
          .catch((error) => {
            res.err;
            console.error('Failed to connect to MongoDB', error);
          });
      }
      else {
        sheetPath = configData.input1;
        sheetName = "APITestSuites";
        if (sheetPath === "/") {
          sheetPath = "/home/aryangupta/react/Testing/API_Automation_Suite.xlsx";
        }
        if (sheetName === "/") {
          sheetName = "APITestSuites";
        }
        workbook.xlsx.readFile(sheetPath).then(() => {
          const mainSheet = workbook.getWorksheet(sheetName);
          mainSheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) { // Skip header row
              sheetNames.add(row.getCell(1).value); // Assuming sheet names are in column 1
            }
          });
          console.log("excel connected");
          console.log(sheetNames);

        }).catch((error) => {
          console.error(error);
        })
        // res.sendStatus(200);
        res.json(configData);
      }
    } catch (error) {
      // If the config file contains invalid JSON data, handle the error
      console.error('Error parsing config file:', error);
      res.status(500).json({ error: 'Invalid Config File' });
      return;
    }


  } catch (error) {
    // Handle file read error
    console.error('Error reading config file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/config', asyncHandler(async(req, res) => {
  const configData = req.body;
  try {
    fs.writeFileSync('/home/aryangupta/react/Testing/config.json', JSON.stringify(configData));
    console.log(configData);
    choice = configData.choice;
    console.log(choice);
    if (choice === "mongodb") {
      dataserver = configData.input1;
      projectName = configData.input2;
      let x = "";
      if (dataserver === "/") {
        dataserver = "mongodb://localhost:27017/";
      }
      if (projectName === "/") {
        projectName = "testing";
      }
      console.log(dataserver);
      console.log(projectName)
      let mongoCall = x.concat(dataserver, projectName);
      console.log(mongoCall);
      mongoose.connect(mongoCall, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
        .then(() => {
          console.log('Connected to MongoDB');
          res.sendStatus(200);
        })
        .catch((error) => {
          res.err;
          console.error('Failed to connect to MongoDB', error);
        });
    }
    else {
      sheetPath = configData.input1;
      sheetName = "APITestSuites";
      if (sheetPath === "/") {
        sheetPath = "/home/aryangupta/react/Testing/API_Automation_Suite.xlsx";
      }
      if (sheetName === "/") {
        sheetName = "APITestSuites";
      }
      workbook.xlsx.readFile(sheetPath).then(() => {
        let mainSheet = workbook.getWorksheet(sheetName);

        const headerRow = ['SuiteNames', 'Runables'];
        if(!mainSheet)
        {
          mainSheet = workbook.addWorksheet(sheetName);
          mainSheet.addRow(headerRow);
          console.log("sheetCreated");
        }
        mainSheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) { // Skip header row
            sheetNames.add(row.getCell(1).value); // Assuming sheet names are in column 1
          }
        });
        console.log("excel connected");
        console.log(sheetNames);
        res.sendStatus(200);
        workbook.xlsx.writeFile(sheetPath);

      }).catch((error) => {
        res.sendStatus(400);
        console.error(error);
      })
      
    }
  } catch (error) {
    // Handle file write error
    console.error('Error saving config file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}));


const projectSchema = new mongoose.Schema({
  testSuitName: String,
  isRunable:
  {
    type: String,
    default: "yes",
  },
  api: [
    {
      apiname: String,
      parameters:
      {
        isRunableApi: String,
        DependOnTest: String,
        Description: String,
        RandomValues: String,
        RequestType: String,
        BaseURI: String,
        BasePath: String,
        RequestHeaders: String,
        RequestCookies: String,
        QueryParameters: String,
        PathParameters: String,
        RequestBody: String,
        RequestParameters: String,
        MultiPartData: String,
        ResponseCode: String,
        ResponseType: String,
        ResponseCookiesToBeSaved: String,
        ResponseHeadersToBeSaved: String,
        ResponseBodyFieldToBeSaved: String,
        ResponseCookieValidation: String,
        ResponseCookieExpressionValidation: String,
        ResponseHeaderValidation: String,
        ResponseHeaderExpressionValidation: String,
        ResponseBodySchema: String,
        ResponseBody: String,
        ResponseBodyParameters: String,
        ResponseBodyExpressionValidation: String
      }
    }
  ]
});
projectSchema.index({ testSuitName: 1, 'api.apiname': 1 }, { unique: true });

const ProjectData = mongoose.model('ProjectData', projectSchema);


app.delete("/delete-config", (req, res) => {
  try {
    const emptyConfigData = {};
    fs.writeFileSync('/home/aryangupta/react/Testing/config.json', JSON.stringify(emptyConfigData));
    delete workbook._worksheets;
    delete workbook._worksheetHash;
    res.sendStatus(200);
  } catch (error) {
    // Handle file write error
    console.error('Error deleting data from config file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/new-suite', (req, res) => {
  //   const testSuitName = req.body.testSuitName;
  //   const apiname = req.body.apiname;
  console.log("hey");
  const {
    testSuitName,
    apiname,
    isRunableApi,
    DependOnTest,
    Description,
    RandomValues,
    RequestType,
    BaseURI,
    BasePath,
    RequestHeaders,
    RequestCookies,
    QueryParameters,
    PathParameters,
    RequestBody,
    RequestParameters,
    MultiPartData,
    ResponseCode,
    ResponseType,
    ResponseCookiesToBeSaved,
    ResponseHeadersToBeSaved,
    ResponseBodyFieldToBeSaved,
    ResponseCookieValidation,
    ResponseCookieExpressionValidation,
    ResponseHeaderValidation,
    ResponseHeaderExpressionValidation,
    ResponseBodySchema,
    ResponseBody,
    ResponseBodyParameters,
    ResponseBodyExpressionValidation } = req.body;


  if (choice === "mongodb") {
    const api = {
      isRunableApi,
      DependOnTest,
      Description,
      RandomValues,
      RequestType,
      BaseURI,
      BasePath,
      RequestHeaders,
      RequestCookies,
      QueryParameters,
      PathParameters,
      RequestBody,
      RequestParameters,
      MultiPartData,
      ResponseCode,
      ResponseType,
      ResponseCookiesToBeSaved,
      ResponseHeadersToBeSaved,
      ResponseBodyFieldToBeSaved,
      ResponseCookieValidation,
      ResponseCookieExpressionValidation,
      ResponseHeaderValidation,
      ResponseHeaderExpressionValidation,
      ResponseBodySchema,
      ResponseBody,
      ResponseBodyParameters,
      ResponseBodyExpressionValidation
    }
    console.log(testSuitName)
    check_and_update(testSuitName, apiname, api).then(() => {
      res.status(200).json({
        message: 'Success!'
      });
    }).catch(error => res.status(403).json({ message: error.message }));
  }
  else {
    const values = [
      apiname,
      DependOnTest,
      Description,
      RandomValues,
      RequestType,
      BaseURI,
      BasePath,
      RequestHeaders,
      RequestCookies,
      QueryParameters,
      PathParameters,
      RequestBody,
      RequestParameters,
      MultiPartData,
      ResponseCode,
      ResponseType,
      ResponseCookiesToBeSaved,
      ResponseHeadersToBeSaved,
      ResponseBodyFieldToBeSaved,
      ResponseCookieValidation,
      ResponseCookieExpressionValidation,
      ResponseHeaderValidation,
      ResponseHeaderExpressionValidation,
      ResponseBodySchema,
      ResponseBody,
      ResponseBodyParameters,
      ResponseBodyExpressionValidation
    ]

    addRowOrSheet(testSuitName, values, headers).then(() => {
      res.status(200).json({
        message: 'Success!'
      });
    }).catch(error => res.status(404).json({ message: error.message }));
  }


  // res.redirect('/');
});

app.get('/hey', (req, res) => {
  res.send("bye");
})

app.post('/update-suite', (req, res) => {

  const {
    testSuitName,
    apiname,
    isRunableApi,
    DependOnTest,
    Description,
    RandomValues,
    RequestType,
    BaseURI,
    BasePath,
    RequestHeaders,
    RequestCookies,
    QueryParameters,
    PathParameters,
    RequestBody,
    RequestParameters,
    MultiPartData,
    ResponseCode,
    ResponseType,
    ResponseCookiesToBeSaved,
    ResponseHeadersToBeSaved,
    ResponseBodyFieldToBeSaved,
    ResponseCookieValidation,
    ResponseCookieExpressionValidation,
    ResponseHeaderValidation,
    ResponseHeaderExpressionValidation,
    ResponseBodySchema,
    ResponseBody,
    ResponseBodyParameters,
    ResponseBodyExpressionValidation } = req.body;

  if (choice === "mongodb") {
    const newParameters = {
      isRunableApi,
      DependOnTest,
      Description,
      RandomValues,
      RequestType,
      BaseURI,
      BasePath,
      RequestHeaders,
      RequestCookies,
      QueryParameters,
      PathParameters,
      RequestBody,
      RequestParameters,
      MultiPartData,
      ResponseCode,
      ResponseType,
      ResponseCookiesToBeSaved,
      ResponseHeadersToBeSaved,
      ResponseBodyFieldToBeSaved,
      ResponseCookieValidation,
      ResponseCookieExpressionValidation,
      ResponseHeaderValidation,
      ResponseHeaderExpressionValidation,
      ResponseBodySchema,
      ResponseBody,
      ResponseBodyParameters,
      ResponseBodyExpressionValidation
    };

    updateQuery(testSuitName, apiname, newParameters).then(() => {
      res.status(200).json({
        message: 'Success!'
      });
    }).catch(error => res.status(403).json({ message: error.message }));
  }

  else {
    const values = [
      apiname,
      DependOnTest,
      Description,
      RandomValues,
      RequestType,
      BaseURI,
      BasePath,
      RequestHeaders,
      RequestCookies,
      QueryParameters,
      PathParameters,
      RequestBody,
      RequestParameters,
      MultiPartData,
      ResponseCode,
      ResponseType,
      ResponseCookiesToBeSaved,
      ResponseHeadersToBeSaved,
      ResponseBodyFieldToBeSaved,
      ResponseCookieValidation,
      ResponseCookieExpressionValidation,
      ResponseHeaderValidation,
      ResponseHeaderExpressionValidation,
      ResponseBodySchema,
      ResponseBody,
      ResponseBodyParameters,
      ResponseBodyExpressionValidation
    ]
    findAndUpdateRow(testSuitName, values).then(() => {
      res.status(200).json({
        message: 'Success!'
      });
    }).catch(error => res.status(404).json({ message: error.message }));
  }


});

app.post('/get-query', (req, res) => {

  const testSuitName = req.body.testSuitName;
  const start = req.body.start;
  const end = req.body.end;
  const limit = end - start + 1;
  getApiRangeByTestSuitName(testSuitName, start, end)
    .then(apiRange => {
      res.send(JSON.stringify(apiRange));
    })
    .catch(error => res.status(403).json({ message: error.message }));
});


app.post('/delete', asyncHandler(async(req, res) => {
  const testSuitName = req.body.testSuitName;
  const apiname = req.body.apiname;
  if (choice === "mongodb") {
    deleteApiEntry(testSuitName, apiname).then(() => {
      res.status(200).json({ message: 'Success' });
    }).catch((error) => {
      res.status(500).json({ message: error.message });
    })
  }
  else {
    const worksheet = workbook.getWorksheet(testSuitName);

    if (!worksheet) {
      console.log(`Sheet "${testSuitName}" not found in the workbook.`);
      res.sendStatus(400);
      return;
    }
    const rows=worksheet.rowCount;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber <= 1) return; // skip the header
  
      const cellValue = row.getCell(1).text;
      if (cellValue === apiname) {
        if(rowNumber==rows)
        {
          worksheet.spliceRows(rowNumber, 1, []);
        }
        else
        worksheet.spliceRows(rowNumber, 1);
        console.log(`deleted ${apiname} at row number ${rowNumber}`);
      }
    });

    // worksheet.spliceRows(rowToDelete.number, 1);

    await workbook.xlsx.writeFile(sheetPath);
    res.sendStatus(200);
    console.log(`Deleted row in sheet "${testSuitName}" where value in the first column matches "${apiname}".`);
  }

}))


app.post('/run-command', (req, res) => {
  let arg3 = "";
  let arg2 = "";
  let arg1 = "yes";
  if (choice === "mongodb") {
    arg1 = "No";
    arg2 = dataserver;
    arg3 = projectName;
  }
  else {
    arg1 = "yes";
    arg2 = sheetPath;
    arg3 = sheetName;
  }
  const command = "java -Dlog4j.configuration=file:DataInput/Logger_Property/log4j.properties -jar codeless.jar '" + arg1 + "' '" + arg2 + "' '" + arg3 + "'";
  // const c = req.body.choice;
  // let command = "";
  // if (c === "mongo")
  //   command = 'java -Dlog4j.configuration=file:DataInput\Logger_Property\log4j.properties -jar codeless.jar "no" "/home/aryangupta/react/Testing/API_Automation_Suite.xlsx" "APITestSuites"';
  // else
  //   command = 'java -Dlog4j.configuration=file:DataInput\Logger_Property\log4j.properties -jar codeless.jar "yes" "/home/aryangupta/react/Testing/API_Automation_Suite.xlsx" "APITestSuites"';
  // let command="ls";
  // const command="ls";
  console.log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.send(error.message);
    }
    else if (stderr) {
      console.error(`Command execution failed: ${stderr}`);
      res.send(stderr);
    }
    else {
      console.log('Command output:');
      console.log(stdout.type);
      res.send(stdout);
    }

  })
});


app.post('/test-query', asyncHandler(async (req, res) => {
  // Perform asynchronous operations here
  const testSuitName = req.body.testSuitName;
  const apiname = req.body.apiname;
  if (choice === "mongodb") {
    const result = await ProjectData.findOne({ testSuitName: testSuitName, 'api.apiname': apiname });
    if (result) {
      console.log(result);
      const apiEntry = result.api.find(api => api.apiname === apiname);
      if (apiEntry) {
        console.log("api entry is" + apiEntry);
        res.status(200).json(apiEntry);
      }
    }
    else {
      res.status(403).json({ message: 'Not Found' });
    }
  }
  else {
    const worksheet = workbook.getWorksheet(testSuitName);

    if (!worksheet) {
      throw new Error('No such sheet found');
    }

    let headers = [];
    let parameters = {};

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) { // Read headers row
        row.eachCell(cell => {
          headers.push(cell.value);
        });
      } else if (row.getCell(1).value === apiname) { // Match the testcase name in other rows
        row.eachCell((cell, cellNumber) => {
          // Match each cell with corresponding header and add it to parameters object
          parameters[headers[cellNumber - 1]] = cell.value;
        });
      }
    });
    console.log({ parameters });
    res.send({ parameters });
  }
}));

app.get('/return-testSuites', asyncHandler(async (req, res) => {
  if (choice === "mongodb") {
    try {
      const testSuitNames = await ProjectData.find({}, 'testSuitName');
      const result = testSuitNames.map((project) => project.testSuitName);
      console.log(result);
      res.send(result);
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  }
  else {
    console.log(sheetNames);
    res.send(Array.from(sheetNames));
  }

}))

app.post('/delete-testSuite',asyncHandler(async(req,res)=>{
  const testSuitName=req.body.testSuitName;
  if(choice==='mongodb')
  {
    try{
      const result= await ProjectData.deleteOne({testSuitName:testSuitName});
      res.status(200).json({message:"deleted"});
    }
    catch(err)
    {
      res.status(400).json({message: err.message});
    }
    
  }
  else{
    try {
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    console.log(`Sheet "${sheetName}" not found in the workbook.`);
    res.sendStatus(400);
    return;
  }
  const rows=worksheet.rowCount;
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber >1){// skip the header

    const cellValue = row.getCell(1).text;
    console.log(testSuitName);
    if (cellValue === testSuitName) {
      if(rowNumber==rows)
      {
        worksheet.spliceRows(rowNumber, 1, []);
      }
      else
      worksheet.spliceRows(rowNumber, 1);
      console.log(`deleted ${testSuitName} at row number ${rowNumber}`);
    }
  }
  });
  const sheet = workbook.getWorksheet(testSuitName);
  if (sheet!==undefined) {
    workbook.removeWorksheet(sheet.id);
    console.log(`Sheet '${testSuitName}' deleted successfully.`);
  } else {
    console.log(`Sheet '${testSuitName}' not found.`);
  }

  // Save the modified workbook
  await workbook.xlsx.writeFile(sheetPath);

      res.sendStatus(200);
      console.log('Workbook saved successfully.');
    } catch (error) {
      console.error('Error occurred while deleting sheet and row:', error);
      res.sendStatus(400);
    }
  
  }
}))

app.post('/get-apis', asyncHandler(async (req, res) => {
  const testSuitName = req.body.testSuitName;
  console.log(req.body);
  if (choice === "mongodb") {
    try {
      const result = await ProjectData.aggregate([
        { $match: { testSuitName } },
        { $project: { _id: 0, 'api.apiname': 1 } }
      ]);
      console.log(result);
      const apiNames = result[0].api.map(api => api.apiname);
      res.send(apiNames);
    } catch (error) {
      res.status(403).json(error.message);
    }
  }
  else {
    const worksheet = workbook.getWorksheet(testSuitName);

    if (!worksheet) {
      throw new Error('No such sheet found');
    }

    let firstColumnValues = [];

    // skip the header row with a condition in the loop
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {  // Skip header row
        firstColumnValues.push(row.getCell(1).value);
      }
    });

    res.send(firstColumnValues);
  }
}))

app.post('/all-data', asyncHandler(async (req, res) => {
  const testSuitName = req.body.testSuitName;
  console.log(req.body);
  if (choice === "mongodb") {
    try {
      const result = await ProjectData.findOne({ testSuitName: testSuitName });
      //  console.log(result);
      res.send(result);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
  else {
    const worksheet = workbook.getWorksheet(testSuitName);

    if (!worksheet) {
      throw new Error('No such sheet found');
    }

    let headers = [];
    let apiData = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) { // Reading Header Row
        row.eachCell((cell, cellNumber) => {
          if (cellNumber !== 1) { // Skipping first column header
            headers.push(cell.value);
          }
        });
      } else {
        let apiObj = {};
        apiObj.apiname = row.getCell(1).value; //first column value as apiname

        let parameters = {};
        row.eachCell((cell, cellNumber) => {
          if (cellNumber !== 1) { // Skipping first column
            parameters[headers[cellNumber - 2]] = cell.value;
          }
        });

        apiObj.parameters = parameters;
        apiData.push(apiObj);
      }
    });

    res.send({ testSuitName: testSuitName, api: apiData });
  }

}))

app.post('/update-runables', asyncHandler(async (req, res) => {
  const projectArray = req.body.projectArray;

  if (choice === "mongodb") {
    try {
      for (let project of projectArray) {
        const { testSuitName, isRunable } = project;
        await ProjectData.findOneAndUpdate(
          { testSuitName: testSuitName },
          { isRunable: isRunable },
          { new: true }
        );
      }
      console.log("updated");
      res.sendStatus(200);
    }
    catch (err) {
      console.error(err);
    }


  }
  else {
    const worksheet = workbook.getWorksheet(sheetName);

    try {
      projectArray.forEach(test => {
        let rowToBeUpdated;
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1 && row.getCell(1).text === test.testSuitName) {
            rowToBeUpdated = row;  // Get the row to be updated
          }
        });
        if (rowToBeUpdated) {
          rowToBeUpdated.getCell(2).value = test.isRunable;  // Update isRunable value
        }
      });

      await workbook.xlsx.writeFile(sheetPath);
      res.sendStatus(200);
    }
    catch (err) {
      res.sendStatus(400).json(err.message);
    }



  }


}))



app.post('/testAndRuns', asyncHandler(async (req, res) => {
  if (choice == "mongodb") {
    try {
      const projects = await ProjectData.find();
      const result = projects.map(project => ({ testSuitName: project.testSuitName, isRunable: project.isRunable, apiLength: project.api.length }));
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.error(err);
      res.status(400).json(err.message);
    }
  }
  else {
    const worksheet = workbook.getWorksheet(sheetName);
    const data = [];

    // Go through each row in the worksheet skipping the header row (i.e., row index 1)
    if(worksheet!== undefined)
    {
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const rowValues = row.values;
        // Push the values into the data array in the desired format
        const sheet = workbook.getWorksheet(rowValues[1]);
        if (sheet) {
          data.push({
            testSuitName: rowValues[1],
            isRunable: rowValues[2],
            apiLength: sheet.rowCount - 1
          });
        }

      }
    });
  }
    res.send(data);
  }

}))

app.get('/api/projectData', async (req, res) => {
  try {
    const projectData = await ProjectData.find();
    res.json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/api/projectData/:id', async (req, res) => {
  const { id } = req.params;
  const { testSuitName } = req.body;

  try {
    const updatedProjectData = await ProjectData.findByIdAndUpdate(
      id,
      { $set: { testSuitName } },
      { new: true }
    );
    res.json(updatedProjectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






function runCommandInNewTerminal(command) {
  const isWindows = process.platform === 'win32';
  const isLinux = process.platform === 'linux';

  let terminalCommand;
  let args;

  if (isWindows) {
    terminalCommand = 'cmd.exe';
    args = ['/c', 'start', 'cmd.exe', '/c', command];
  } else if (isLinux) {
    terminalCommand = 'gnome-terminal';
    args = ['--', 'bash', '-c', command];
  } else {
    terminalCommand = 'xterm';
    args = ['-e', command];
  }

  const childProcess = spawn(terminalCommand, args, { stdio: 'pipe' });

  // Capture the output of the command
  let output = '';
  childProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Log the output when the command completes
  childProcess.on('close', (code) => {
    console.log(`Command execution completed with code ${code}`);
    console.log('Output:', output);
  });
}





async function deleteApiEntry(testSuitName, apiname) {
  const res = await ProjectData.findOne({ testSuitName: testSuitName, 'api.apiname': apiname });
  console.log(res);
  if (res) {
    try {
      const result = await ProjectData.findOneAndUpdate(
        { testSuitName }, // Filter by testSuitName
        { $pull: { api: { apiname } } }, // Remove the entry with matching apiname
        { new: true } // Return the updated document
      );
      console.log('Project updated successfully:');
      // console.log(result);
    } catch (error) {
      throw error;
    }
  }
  else {
    throw new Error("No such entry present");
  }
}
async function updateQuery(testSuitName, apiname, newParameters) {
  const result = await ProjectData.findOne({ testSuitName: testSuitName, 'api.apiname': apiname });
  if (result) {

    ProjectData.findOne({ testSuitName }, (err, doc) => {

      if (err) {
        console.error(err);
        return;
      }
      // Find the index of the object with the given apiname in the api array
      const index = doc.api.findIndex(item => item.apiname === apiname);

      if (index === -1) {
        console.error(`No object found with apiname '${apiname}'`);
        return;
      }
      // Update the parameters of the found object
      doc.api[index].parameters = newParameters;

      // Save the updated document
      doc.save((err, updatedDoc) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Parameters updated for testSuitName '${testSuitName}' and apiname '${apiname}'`);
      });
    });
  }
  else {
    throw new Error("Invalid Input");
  }
}

async function check_and_update(name, apiname, newapi) {
  const result = await ProjectData.findOne({ testSuitName: name });
  if (result) {
    const result2 = await ProjectData.findOne({ testSuitName: name, 'api.apiname': apiname });
    console.log(result2);
    if (!result2) {
      ProjectData.updateOne(
        { testSuitName: name },
        {
          $addToSet: {
            api: {
              apiname,
              parameters: newapi
            }
          }
        }
      ).then(() => {
        console.log("added");
      })
        .catch((err) => {
          throw new Error(err.message);
        });
      console.log('API added to existing test suite');
    }
    else {
      throw new Error("API name already exixts");
    }

  }
  else {
    const data2 = new ProjectData({
      testSuitName: name,
      api: [{
        apiname: apiname,
        parameters: newapi
      }]
    });
    data2.save().then(() => {
      console.log("data saved");
    })
      .catch((error) => {
        console.log(error);
      });
  }
}

async function getApiRangeByTestSuitName(testSuitName, skip, limit) {
  try {
    const project = await ProjectData.findOne({ testSuitName });
    if (!project) {
      throw new Error('Project not found');
    }
    const apiRange = project.api.slice(skip, limit);
    return apiRange;
  } catch (error) {
    console.error('Error retrieving API range:', error);
    throw error;
  }
}


async function addRowOrSheet(sheetNamee, values, headers) {
  if (values.length !== 27 || headers.length !== 27) {
    throw new Error('values and headers arrays should contain exactly 27 items');
  }

  let sheet = workbook.getWorksheet(sheetNamee);

  if (sheet) {

    let flag=0;
    sheet.eachRow((row, rowNumber) => {
      if (row.getCell(1).value === values[0]) {
          flag=1;
      }
    });
    
    if(flag==0)
    {
      sheet.addRow(values);
    }
    else{
      throw new Error("Test Case Already exists");
    }

    

  } else {
    // Add the new sheet name to the main sheet and the sheetNames array
    const mainSheet = workbook.getWorksheet(sheetName);
    console.log(sheetName); // Enter your main sheet name here
    mainSheet.addRow([sheetNamee, "yes"]);
    sheetNames.add(sheetNamee);

    // Create a new sheet with this name, add the headers and the values
    sheet = workbook.addWorksheet(sheetNamee);
    sheet.addRow(headers);
    sheet.addRow(values);
  }

  await workbook.xlsx.writeFile(sheetPath); // Enter your file path here
}


async function findAndUpdateRow(sheetName, values) {
  if (values.length !== 27) {
    throw new Error('values array should contain exactly 27 items');
  }


  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(sheetPath); // Replace with your file path

  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error('No such sheet found');
  }

  let isFound = false;

  worksheet.eachRow((row, rowNumber) => {
    if (row.getCell(1).value === values[0]) {
      row.values = values;
      isFound = true;
    }
  });

  if (!isFound) {
    throw new Error('No such entry present');
  } else {
    await workbook.xlsx.writeFile(sheetPath); // Replace with your file path
    console.log('Row updated successfully');
  }
}




const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});



