// call.js
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
// 异步执行
exec('python diaoyong.py',function(error,stdout,stderr){
    if(error) {
        console.info('stderr : '+stderr);
    }
    console.log('exec: ' + stdout);
})