var userCommand = require('./commands')
// Output a prompt
const prompt = '\n prompt > ';
process.stdout.write(prompt);
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim().split(" ");

  var input = cmd.slice(1);
  if(userCommand[cmd[0]]){
    userCommand[cmd[0]](input,done);
  }
  else process.stderr.write("command not found: " + cmd + prompt);
});


function done(output){
  process.stdout.write(output + prompt);
}
