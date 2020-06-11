const fs = require("fs");
const util = require("./util");
const path = require("path");

//folders' directory
const testFilesDirectory = path.join(__dirname, "testFiles");

commandSent = false, command = "", messageReceived = "";

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

//setting events for websocket client
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "'");
            messageReceived = message.utf8Data;
        }
        return;
    });
    
    // sends message once
    function sendCommand() {
        if (connection.connected && !commandSent) {
            connection.sendUTF(JSON.stringify(command));
            commandSent = true;
        }
    }
    sendCommand();
    return;
});

module.exports = {

    test : function(fileName) {
        testFilePath = path.join(testFilesDirectory, fileName);
        command = fs.readFileSync(testFilePath, {encoding:'utf8', flag:'r'}, (err)=>{ if (err) throw err});
        console.log(typeof command);
        client.connect('ws://localhost:8080/', 'echo-protocol');

        return;

    },
    //not used
    testAll : function(folderPath) {
        files = [];
        util.deepListDir(folderPath, function(file){files.push(file)});
        files.array.forEach(element => {
            //test each file in folder
        });
    },
    
    record : function() {

        command = "record";
        client.connect('ws://localhost:8080/', 'echo-protocol');
        return;
    
    },
    
    save : function() {

        const sanitize = require("sanitize-filename");
        const prompt = require("prompt");

        //testing file using testSave.json
        var input = fs.readFileSync('./testSave.json', (err)=>{ if (err) throw err});

        var macroJSON = JSON.parse(input);

        var validation = [{name: 'title',
             pattern: /^[\w\-. ]+$/, 
             message: "invalid file name",
             required: true},

            {name: 'description',
             required: true,},

            {name: 'context',
             conform: function(value) {
                var exist = false;
                util.listDirSync("testFiles", function(file){exist = exist || value === file});
                return exist;},
             required: true,
             message: "folder doesn't exist"
            }]

        //prompt user input for title and description
        prompt.get(validation, function (err, result) {
            if (err) { 
                console.log(err)
            };

            console.log('  title: ' + result.title);
            console.log('  description: ' + result.description);
            console.log('  context  ' + result.context);
            
            outputFile = path.join(testFilesDirectory, result.context, result.title + ".json");
            
            macroJSON.title = result.title;
            macroJSON.description = result.description;
            macroJSON.context = result.context;
        
            var output = JSON.stringify(macroJSON);

            console.log(`Writing ${output.length} characters to ${outputFile}`);

            fs.writeFileSync(outputFile, output, (err)=>{ if (err) throw err});

            console.log(`Done.`);
            
        });
        
    }
    
}