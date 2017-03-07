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
  fs.readdir('.', function(err, files) {
    if(err) throw err;
    process.stdout.write(files.join("\n"));
});
}

function echo(input){
  // process.stdout.write(input.join(" "));
  var output = input.map(function(arg){
    return arg[0] === "$" ? process.env[arg.slice(1)] : arg;
  }).join(" ");
  process.stdout.write(output);
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
  input = input[0];
  fs.readFile(input, {enconding: "utf8"}, function(err,text){
    if(err) throw err;
    process.stdout.write(text.toString().split('\n').slice(0,5).join('\n'));
  })
}

function tail(input) {
  input = input[0];
  fs.readFile(input,{enconding: "utf8"}, function(err,text){
    if(err) throw err;
    process.stdout.write(text.toString().split("\n").slice(-5).join("\n"));
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
