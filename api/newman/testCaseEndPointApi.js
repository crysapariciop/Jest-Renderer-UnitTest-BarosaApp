/***********************************************************************************
 * Program to run the PostMan collection and write the required output to CSV file
 * Start set up with 'npm install'
 * Run the script with 'node ./testCaseEndPointApi.js.js'
 **********************************************************************************/
const { Console } = require('console');
const fs  = require('fs');
const Papa = require('papaparse')
const newman = require('newman');
const postmanCollcetionFileName = './TestNewman.postman_collection.json'
const environmentFileName = './Sandbox.postman_environment.json'
environmentVariables = [];
environmentVariables.push(
  {
    "key": "runRecoveryTests",
	"value": "true",
	"type": "default",
	"enabled": true
  }
);
//Configuring newman library for execution
newman.run({
	environment: environmentFileName,
	envVar: environmentVariables,
    collection: require(postmanCollcetionFileName),
    reporters: ["cli","htmlextra"],
},(error)=>{
    if(error){
        throw error;
    }
console.log('Collection Execution completed.');
}).on('beforeRequest',(error,data,args) => {
    if(error){
        throw error;
    }else {
        // Capture the request details here if needed
        //console.log(args.request.body.raw);
    }
});