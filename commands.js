var fs = require("fs");
var readline = require('readline');

function pwd(){
  // console.log(process.argv[1]);
  process.stdout.write(process.cwd());
}

function date(){
  process.stdout.write(Date());
}

function ls(){
  var output = "";
  fs.readdir('.', function(err, files) {
    if(err) throw err;
    process.stdout.write(files.join("\n"));
});
}

function echo(input){
  console.log(input.join(" "));
}

function cat(input){
  console.log(input);
  var texts = [];
  var count = 0;
 input.forEach(function(file, i){
   fs.readFile(file, { encoding: "utf8" }, function(err, text){
     if(err) throw err;
     texts[i] = text;
     count ++
     if(count === input.length) process.stdout.write(texts.join(""))
   })
 })
}

function head(input) {
  var instream = fs.createReadStream(input[0]);
  var rl = readline.createInterface({input: instream, output: process.stdout, terminal: false, historySize: 5});
  var count = 0;
  rl.on('line', function(line){
    if(count <5){
      console.log(line);
      count++
    }
  })
  rl.on("close", function(line){
    process.stdout.write('\nprompt > ');
  })
}

function tail(input) {
  var instream = fs.createReadStream(input[0]);
  var rl = readline.createInterface({input: instream, output: process.stdout, terminal: false, historySize: 5});
  var count = 0;
  // rl.on('line', function(line){
  //   if(count <5){
  //     console.log(line);
  //     count++
  //   }
  // })
  rl.on("close", function(line){
    process.stdout.write('\nprompt > ');
  })
}

module.exports = {
  pwd: pwd,
  date: date,
  ls: ls,
  echo: echo,
  cat: cat,
  head: head,
  tail: tail
}
