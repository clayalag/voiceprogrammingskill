'use strict';
var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "programStorage",
    Key: {
        "programId": "0",
        "codeId": "enum = 43"
    }
    
};


var variableToDisplay = "variable not set";

exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error(err);
        }
      
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        variableToDisplay = obj.Item.codeId;
        
        callback(null, {"valueId":variableToDisplay});
    });
};
 /*
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const scanningPrams={
      TableName: "programStorage",
      Limit:10
     }
body = await dynamoDB.scan(scanningPrams).promise();

var mydocumentClient = new AWS.DynamoDB.DocumentClient();

exports.getmybooks = function(event, context, callback) {
    var params = {
        TableName : process.env.TABLE_
    };
    mydocumentClient.scan(params, function(err, data){
        if(err) {
            callback(err, null);
        }else{
            callback(null, data.Items);
        }
    });
};
*/
