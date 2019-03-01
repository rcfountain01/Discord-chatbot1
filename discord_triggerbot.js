// Discord chat bot that looks for trigger words (contained within a file)
// and responds with a random quote from a responses file
// NOTE: This bot requires two files for proper operation
//    1) Trigger file - a text file containing a list of words that will trigger a response on the part of the boy
//    2) Response file - a text file containing a list of possible response sentences

// Initialize Discord Client
const Discord = require('discord.js');
const client = new Discord.Client

var random_index;     // Index value will be random based on number of elements in response_Array

var user_input;       // Will contain raw contents of user chat message
var parsed_input;     // Will contain upper case version of user_input
var parsed_input2;    // Will contains an array of values based on parsed_input
var trigger_counter;  // Counter variable for scanning the contents of trigger_Array
var input_counter;    // Counter variable for scanning the contents of parsed_input2

var response_flag = 1;    // Binary flag to enable (1) or disable (0) responses.

var JFile=require('jfile'); // Load file system modele

// Read response text ile and place contents into an array
var responseFile=new JFile("path/response_file.txt");
response_Array = responseFile.lines;

// Read trigger phrase text file and place contents into an array
var triggerFile=new JFile("path/trigger_phrases.txt");
trigger_Array = triggerFile.lines;

// Echo to console when successfully logged into Discord
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

// Upon receiving an IM, do the following...
client.on('message', msg => {
 // Detect different types of greeting words
 user_input = msg.content;
 parsed_input = user_input.toUpperCase();
 parsed_input2 = parsed_input.split(" ");
 for (input_counter = 0;input_counter <= parsed_input2.length - 1;input_counter++)
  {
    // Trigger & response enable/disable routine
    if (parsed_input == "!TRIGGER_ENABLE")
      {
        response_flag = 1;
        msg.reply("Triggers enabled");
        break;
      }
    if (parsed_input == "!TRIGGER_DISABLE")
      {
        response_flag = 0;
        msg.reply("Triggers disabled");
        break;
      }
    // <END> Trigger & response enable/disable routine
    for (trigger_counter = 0;trigger_counter <= trigger_Array.length - 1;trigger_counter++)
    {
      if (parsed_input2[input_counter] !== "" && (parsed_input2[input_counter] === trigger_Array[trigger_counter]) && response_flag === 1) // Only respond if flag is set to 1
      {
        // Generate a random number based on number of indices in response_Array
        random_index = Math.floor((Math.random() * 15) + 1);
        // Send reply IM
        msg.reply(response_Array[random_index]);
      }
    } // if (parsed_input2[i] == trigger_Array[trigger_counter])
  } // for (i = 0;i <= parsed_input2.length - 1;i++)
 });

// Log into Discord as the desired bot. NOTE: This line is always the last line in any Discord script.
client.login('<Bot's Client ID>');
