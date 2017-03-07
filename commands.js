var fs = require('fs');
var request = require('request');

function pwd(input,done){
  // console.log(process.argv[1]);
  done(process.cwd());
}

function date(input,done){
  done(Date());
}

function ls(input,done){
  fs.readdir('.', function(err, files) {
    if(err) throw err;
    done(files.join("\n"));
});
}

function echo(input,done){
  // process.stdout.write(input.join(" "));
  var output = input.map(function(arg){
    return arg[0] === "$" ? process.env[arg.slice(1)] : arg;
  }).join(" ");
  done(output);
}

function cat(input,done){
  console.log(input);
  var texts = [];
  var count = 0;
 input.forEach(function(file, i){
   fs.readFile(file, { encoding: "utf8" }, function(err, text){
     if(err) throw err;
     texts[i] = text;
     count ++
     if(count === input.length) done(texts.join(""));
   })
 })
}

function head(input,done) {
  input = input[0];
  fs.readFile(input, {encoding: "utf8"}, function(err,text){
    if(err) throw err;
    done(text.toString().split('\n').slice(0,5).join('\n'));
  })
}

function tail(input,done) {
  input = input[0];
  fs.readFile(input,{encoding: "utf8"}, function(err,text){
    if(err) throw err;
    done(text.toString().split("\n").slice(-5).join("\n"));
  });
}

function sort(input,done) {
  input = input[0];
  fs.readFile(input, {encoding: "utf8"}, function(err,text){
    if(err) throw err;
    done(text.toString().split('\n').sort().join('\n'));
  });
}

function wc(input,done) {
  input = input[0];
  fs.readFile(input, {encoding: "utf8"}, function(err,text){
    if(err) throw err;
    done(text.toString().split('\n').length);
  });
}

function uniq(input,done) {
  input = input[0];
  fs.readFile(input, {encoding: "utf8"}, function(err,text){
    if(err) throw err;
    var lines = text.toString().split('\n');
    for(var i = 0;i < lines.length;i++){
      if(lines[i] === lines[i + 1]){
        lines.splice(i,1);
        i--;
      }
    }
    done(lines.join('\n'));
  });
}

function curl(url,done){
  url = url[0];
  if(url.slice(0,7) !== "http://") url = "http://" + url;
  request(url, function (err, response, body){
    if(err) throw err;
    else if(response && (response.statusCode > 399)) throw new Error(response.statusCode);
    if(body) done(body);
    else done('');
  });
}

module.exports = {
  pwd: pwd,
  date: date,
  ls: ls,
  echo: echo,
  cat: cat,
  head: head,
  tail: tail,
  sort: sort,
  wc: wc,
  uniq: uniq,
  curl: curl
}
