import express from "express";
// const { ObjectID } = require('mongodb');
// const { exec } = require('child_process');
import asyncHandler from "express-async-handler";
import { spawn , exec} from 'child_process';
import mongoose from 'mongoose';
import path from 'path';
console.log("hello");
const app = express();
app.use(express.static('public'));
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// import ProjectData from './model.js';

let dataserver = "";
let projectName = "";
let sheetPath="";
let sheetName="";
let choice="";

app.post('/get-server', (req, res) => {
  choice=req.body.choice;
  console.log(choice);
  if(choice==="mongodb")
  {
    dataserver = req.body.input1;
  projectName = req.body.input2;
  let x = "";
  if(dataserver==="/")
  {
    dataserver="mongodb://localhost:27017/";
  }
  if(projectName==="/")
  {
    projectName="testing";
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
  else{
    sheetPath=req.body.input1;
    sheetName=req.body.input2;
    res.sendStatus(200);
  }
  
});

const projectSchema = new mongoose.Schema({
  testSuitName: String,
  isRunable: 
  {
    type:String,
    default: "yes",
  },
  api: [
    {
      apiname:String,
      parameters:
      {
        isRunableApi:String,
        DependOnTest:String,
        Description:String,
        RandomValues:String,
        RequestType:String,
        BaseURI:String,
        BasePath:String,
        RequestHeaders:String,
        RequestCookies:String,
        QueryParameters:String,
        PathParameters:String,     
        RequestBody:String,
        RequestParameters:String,
        MultiPartData:String,
        ResponseCode:String,
        ResponseType:String,
        ResponseCookiesToBeSaved:String,
        ResponseHeadersToBeSaved:String,
        ResponseBodyFieldToBeSaved:String,
        ResponseCookieValidation:String,
        ResponseCookieExpressionValidation:String,
        ResponseHeaderValidation:String,
        ResponseHeaderExpressionValidation:String,   
        ResponseBodySchema:String,
        ResponseBody:String,
        ResponseBodyParameters:String,
        ResponseBodyExpressionValidation:String
      }
    }
  ]
});
projectSchema.index({ testSuitName: 1, 'api.apiname': 1 }, { unique: true });

const ProjectData = mongoose.model('ProjectData', projectSchema);


app.post('/new-suite', (req, res) => {
//   const testSuitName = req.body.testSuitName;
//   const apiname = req.body.apiname;
  console.log("hey");
  const{
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
    ResponseBodyExpressionValidation}=req.body;

    const api={
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
        ResponseBodyExpressionValidation}
  console.log(testSuitName)
  check_and_update(testSuitName, apiname,api).then(()=>{
    res.status(200).json({
      message: 'Success!'
    });
  }).catch(error =>res.status(403).json({message:error.message}));
  
  // res.redirect('/');
});

app.get('/hey',(req,res)=>{
  res.send("bye");
})

app.post('/update-suite',(req,res)=>{

    const{
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
        ResponseBodyExpressionValidation}=req.body;

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

  updateQuery(testSuitName,apiname,newParameters).then(()=>{
    res.status(200).json({
      message: 'Success!'
    });
  }).catch(error =>res.status(403).json({message:error.message}));
});

app.post('/get-query',(req,res)=>{

    const testSuitName=req.body.testSuitName;
    const start=req.body.start;
    const end=req.body.end;
    const limit=end-start+1;
  getApiRangeByTestSuitName(testSuitName, start, end)
  .then(apiRange => {
    res.send(JSON.stringify(apiRange));
  })
  .catch(error =>res.status(403).json({message:error.message}));
});


app.post('/delete',(req,res)=>{
  const testSuitName=req.body.testSuitName;
  const apiname=req.body.apiname;
  deleteApiEntry(testSuitName,apiname).then(()=>{
    res.status(200).json({ message: 'Success' });
  }).catch((error)=>{
    res.status(500).json({message:error.message});
  })
})


app.post('/run-command',(req,res)=>{
  // let arg3="";
  // let arg2="";
  // let arg1="yes";
  // if(choice==="mongodb")
  // {
  //   arg1="No";
  // }
  // else{
  //   arg1="yes";
  //   arg2=sheetPath;
  //   arg3=sheetName;
  // }
  // const command="java -Dlog4j.configuration=file:DataInput\Logger_Property\log4j.properties -jar codeless.jar '"+arg1+"' '"+arg2+"' '"+arg3+"'";
  let command='java -Dlog4j.configuration=file:DataInput\Logger_Property\log4j.properties -jar codeless.jar "no" "/home/aryangupta/CodelessAPIAutomation/API_Automation_Suite.xlsx" "APITestSuites"';
  // let command="ls";
  console.log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command execution failed: ${stderr}`);
      return;
    }
  
    console.log('Command output:');
    console.log(stdout);
})
// Usage example
runCommandInNewTerminal('echo "Hello, World!"');
});


app.post('/test-query', asyncHandler(async (req, res) => {
  // Perform asynchronous operations here
  const testSuitName=req.body.testSuitName;
  const apiname=req.body.apiname;
  const result = await ProjectData.findOne({ testSuitName: testSuitName , 'api.apiname': apiname});
  if(result)
  {
    console.log(result);
    const apiEntry = result.api.find(api => api.apiname === apiname);
      if (apiEntry) {
        console.log(apiEntry);
        res.status(200).json(apiEntry);
      }
  }
  else{
    res.status(403).json({message: 'Not Found'});
  }
}));

app.get('/return-testSuites',asyncHandler(async(req,res)=>{
  try {
    const testSuitNames = await ProjectData.find({}, 'testSuitName');
    const result = testSuitNames.map((project) => project.testSuitName);
    res.send(result);
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}))
app.post('/get-apis',asyncHandler(async(req,res)=>{
  const testSuitName=req.body.testSuitName;
  console.log(req.body);
  try {
    const result = await ProjectData.aggregate([
      { $match: { testSuitName } },
      { $project: { _id: 0, 'api.apiname': 1 } }
    ]);
    const apiNames = result[0].api.map(api => api.apiname);
    res.send(apiNames);
  } catch (error) {
    res.status(403).json(error.message);
  }
}))

app.post('/all-data',asyncHandler(async(req,res)=>{
  const testSuitName=req.body.testSuitName;
  console.log(req.body);
  try{
    const result=await ProjectData.findOne({testSuitName:testSuitName});
    //  console.log(result);
     res.send(result);
  }
  catch(error){
    console.log(error);
    throw error;
  }
}))

app.post('/update-runable',asyncHandler(async(req,res)=>{
  const testSuitName=req.body.testSuitName;
  const runable=req.body.isRunable;

  ProjectData.findOne({ testSuitName }, (err, doc) => {

    if (err) {
      console.error(err);
      res.status(400).json(err.message);
      return;
    }
    doc.isRunable=runable;
    // Save the updated document
    doc.save((err, updatedDoc) => {
      if (err) {
        console.error(err);
        res.status(400).json(err.message);
        return;
      }
      console.log("updated");
      res.status(200).json({message:"updated successfully"});
    });
  });
  
}))





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





async function deleteApiEntry(testSuitName,apiname)
{
  const res = await ProjectData.findOne({ testSuitName: testSuitName , 'api.apiname': apiname});
  console.log(res);
  if(res)
  {
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
  else{
    throw new Error("No such entry present");
  }

  
}


async function updateQuery(testSuitName,apiname,newParameters)
{
  const result = await ProjectData.findOne({ testSuitName: testSuitName , 'api.apiname': apiname});
  if(result)
  {

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
  else{
    throw new Error("Invalid Input");
  }
}

async function check_and_update(name,apiname, newapi) {
  const result = await ProjectData.findOne({ testSuitName: name });
  if (result) {
    const result2=await ProjectData.findOne({ testSuitName: name, 'api.apiname': apiname}); 
    console.log(result2);
    if(!result2)
    {
      ProjectData.updateOne(
        { testSuitName: name },
        { $addToSet: { api: {
          apiname,
          parameters:newapi
        } } }
      ).then(()=>
      {
        console.log("added");
      })
      .catch((err)=>
      {
        throw new Error(err.message);
      });
      console.log('API added to existing test suite');
    }
    else{
      throw new Error("API name already exixts");
    }
    
  }
  else {
    const data2 = new ProjectData({ testSuitName: name, 
      api: [{
      apiname: apiname,
      parameters:newapi
    }] });
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
    const apiRange = project.api.slice(skip,limit);
    return apiRange;
  } catch (error) {
    console.error('Error retrieving API range:', error);
    throw error;
  }
}
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


