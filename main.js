//!! This is a super quick hacky way of transforming transactions row entries into the new receipts-unified flow... as such all decisions were made for speed in implementation and not maintenance

const command = require("./command");
const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const util = require("./util");
const path = require("path");

/**
 * DRY: output cmd line options 
 */
function OutOptions() {
  console.log("--record");
  console.log("--test <file path from root>   //e.g. testFiles/gameplay/ColorBuggies.json");
  // console.log("--testAll <folder path from root>   //e.g. testFiles/gameplay")
  console.log("--save");
  console.log("\n available test directories to access:")
  util.listDir("testFiles", function(file) {console.log("  ", path.join("testFiles", file));});
}

if (argv._.includes("help")) {
  OutOptions();
  return;
}

function main() {

  if (argv.record) {
    command.record();
  } else if (argv.test) {
    command.test(argv.test);
  } // not used testAll command
    // else if (argv.testAll) {
    // command.testAll(argv.testAll);}
  else if (argv.save) {
    command.save();
  } else {
    console.log("invalid command, enter 'help' for commands available");
  }

  return;
}


//-- call after all is present

main();