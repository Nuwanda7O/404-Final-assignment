const http = require('http')
const fs = require('fs');
const querystring = require('querystring')

//引入express
const express = require('express')
const app = express()

//定义初始目录，引入ejs
app.use(express.static(__dirname + '/register'));
const ejs = require('ejs')

app.set("public", "./public")
app.use(express.static('public'));

app.set("datavis", "./datavis")
app.use(express.static('datavis'));

//////////////////////////////////////////////////数据库连接函数//////////////////////////////////////////////////////////////////
var mysql = require('mysql');
const { table } = require('console');
const { find } = require('async');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wk020924',
  port: '3306',
  //数据库的名字
  database: 'web'
});
//检查建立链接是否成功
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log("连接成功")
});
/////////////////////////////////////////////////////////////////////////添加///////////////////////////////////////////////
//添加用户管理员的函数
function insertuser(addSql, addSqlParams, callback) {
  //增
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      //报错返回
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    console.log('INSERT ID:', result);
    //正确的话，返回值为 1用作判断
    callback(1)
  });

}

//////////////////////////////////////////////////////////////////////////查询//////////////////////////////////////////////////

function finduser(account, tab, callback) {
  //查看数据库中的数据
  //student为表的名称
  var sql = "SELECT * from  " + tab + " WHERE account= '" + account + "'";
  //查
  connection.query(sql, function (err, result) {
    if (err) {
      //报错返回
      console.log('出现错误- ', err.message);
      return;
    }
    //返回值为0，证明数据库中不存在
    if (result == 0) {
      console.log("数据库中没有这个东西")
      callback(0)
    }
    else {
      var dataString = JSON.stringify(result);
      var data = JSON.parse(dataString);

      console.log('账户名' + result[0].account)
      console.log('密码' + result[0].password)
      //返回查询到的东西
      callback(result)
    }
  });
}
///////////查询tag数目

function findtag(callback) {
  //查看数据库中的数据
  //student为表的名称
  var sql = "SELECT * from  news ";
  //查
  connection.query(sql, function (err, result) {
    if (err) {
      //报错返回
      console.log('出现错误- ', err.message);
      return;
    }
    //返回值为0，证明数据库中不存在
    else {
      //返回查询到的东西
      callback(result.length)
    }

  });
}



function findall(tab, callback) {
  //查看数据库中的数据
  //student为表的名称
  var sql = "SELECT * from  " + tab + "";
  //查
  connection.query(sql, function (err, result) {
    if (err) {
      //报错返回
      console.log('出现错误- ', err.message);
      return;
    }
    //返回值为0，证明数据库中不存在
    else {
      //返回查询到的东西
      callback(result)
    }

  });
}

function findshares(code, callback) {
  //查看数据库中的数据
  //student为表的名称
  var sql = "SELECT * from  shares WHERE scode= '" + code + "'";
  //查
  connection.query(sql, function (err, result) {
    if (err) {
      //报错返回
      console.log('出现错误- ', err.message);
      return;
    }
    //返回值为0，证明数据库中不存在
    else {
      //返回查询到的东西
      callback(result)
    }

  });
}
////数据库文件///////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//一个简单的测试
/* addSql = 'INSERT INTO forum SET ?'
account = 'wk'
tag=1
password = 'wk0000'
addSqlParams = { account: account, tag:tag,opinion: password };
insertuser(addSql, addSqlParams, (docs) => {
  if (docs == 0) {
    console.log("数据库添加失败")
  }
  else {
    console.log("OK 成功")
  }
})  */

//一个简单的测试
/* tab = 'user'
finduser(account, tab, (docs) => {
  if (docs == 0) {
    console.log("数据库没有该用户")
  }
  else {
    console.log("OK 成功")
    //验证用户身份成功，跳转到首页
  }
}); */
//一个简单的测试
/* findtag((docs) => {
  
    console.log("OK 成功")
    console.log(docs)
});
 */
/* findshares('000001',(docs)=> {
  console.log("OK 成功")
  console.log(docs)
}); */
var account = '';
var password = '';
var submit = '';
///
var forum = ''
var doc = {};
var news = {};
var forum = {};
var tab = '';
///
var sname = '';
var scode = '';
var skind = '';
var sdes = '';
var opinion = '';
///
var title = '';
var tag = '';
var content = '';
//
var filename = '';


app.get('/input', (req, res, next) => {
  //首先进行处理，将字符串分段处理
  console.log("进入第一个")
  console.log(req.query.account)
  console.log(req.query.password)
  account = req.query.account;
  password = req.query.password;
  submit = req.query.submit;

  //进入下一步
  next()
})

///////////////////////////////////////////////////////////登录注册模块///////////////////////////////////////////////////////

app.get('/input', (req, res, next) => {
  console.log("进入第二个")
  if (submit == "注册") {
    //这里面填入数据库的写入
    tab = "user"
    finduser(account, tab, (docs) => {

      if (docs == 0) {
        console.log("数据库中不存在这个用户，可以添加")
        addSql = 'INSERT INTO user SET ?'
        addSqlParams = { account: account, password: password };
        insertuser(addSql, addSqlParams, (docs) => {
          if (docs == 0) {
            console.log("数据库添加失败")
            res.render(__dirname + "/register/index.ejs", { passage: "添加失败" })
          }
          else {
            console.log("OK 成功")
            //跳转回登录页面
            res.render(__dirname + "/register/index.ejs", { passage: "注册成功" })
          }
        })

      }
      else {
        console.log("测试")
        res.render(__dirname + "/register/index.ejs", { passage: "数据库中存在这个用户名，请重新注册" })
      }
    })

  }
  else if (submit == "登录") {
    tab = "user"
    finduser(account, tab, (docs) => {
      if (docs == 0) {
        console.log("数据库没有该用户")
        res.render(__dirname + "/register/index.ejs", { passage: "数据库没有该用户，请先进行注册" })
      }
      else {
        console.log("OK 成功")
        console.log(docs.length)
        //验证用户身份成功，跳转到首页
        res.render(__dirname + "/public/index.ejs",)
      }
    });
  }
  else if (submit == "管理员") {
    tab = "admin"
    finduser(account, tab, (docs) => {
      if (docs == 0) {
        console.log("数据库没有该用户")
        res.render(__dirname + "/register/index.ejs", { passage: "账号密码错误，无管理员权限" })
      }
      else {
        console.log("OK 成功")
        //验证用户身份成功，跳转到首页
        res.render(__dirname + "/admin/add.ejs", { passage: "请开始添加" })
      }
    });
  }
  else {
    //如果不是登录注册管理员，则进行下一个判断
    next()
  }

})

//////////////////////////////////////////////////////////////////论坛模块////////////////////////////////////////////
/* 
app.get('/input', (req, res, next) => {
  forum = req.query.input;
  console.log(forum)


  myfind(a, (docs) => {
    if (docs == 0) {
      console.log("数据库没有有这个东西")
    }
    else {
      console.log(docs[0].name)
      res.render(__dirname + "/public/forum.ejs", { data: docs });
    }
  });
})
 */
/////////////////////////////////////////////管理员添加模块////////////////////////////


app.get('/add', (req, res, next) => {
  console.log(req.query.sname)
  console.log(req.query.scode)
  console.log(req.query.skind)
  console.log(req.query.sdes)
  sname = req.query.sname;
  scode = req.query.scode;
  skind = req.query.skind;
  sdes = req.query.sdes;
  console.log(sname)

  if (sname.length == '') {
    res.render(__dirname + "/admin/add.ejs", { passage: "请添加属性,名称不能为空值" })
  }
  else {
    addSql = 'INSERT INTO shares SET ?'
    addSqlParams = { sname: sname, scode: scode, skind: skind, sdes: sdes };
    insertuser(addSql, addSqlParams, (docs) => {
      if (docs == 0) {
        console.log("数据库添加失败")
        res.render(__dirname + "/admin/add.ejs", { passage: "添加失败，请重试" })
      }
      else {
        console.log("OK 成功")
        res.render(__dirname + "/admin/add.ejs", { passage: "添加成功" })
      }
    })
  }
})

///////////////////////////////////论坛新闻发布模块//////////////////////////////////

//如果点击链接跳转到
app.get('/forum', (req, res, next) => {
  tab = "news"
  //查询数据库中的news
  findall(tab, (news) => {
    //查询数据库中的评论
    tab = "forum"
    findall(tab, (forum) => {
      res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
    })
  })
})


app.get('/addnews', (req, res, next) => {
  console.log(req.query.title)
  console.log(req.query.content)
  title = req.query.title;
  content = req.query.content;
  tab = 'news'
  //输入内容不为空
  if (title.length != 0 && content.length != 0) {

    console.log(title.length)

    findtag((docs) => {
      tag = docs
      console.log(tag)

      addSql = 'INSERT INTO news SET ?'
      addSqlParams = { tag: tag, account: account, title: title, content: content };
      insertuser(addSql, addSqlParams, (docs) => {

        if (docs == 0) {
          console.log("数据库添加失败")
          tab = 'news'
          //查询数据库中的news
          findall(tab, (news) => {
            //查询数据库中的评论
            tab = 'forum'
            findall(tab, (forum) => {
              res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
            })
          })
        }


        else {
          console.log("OK 成功")
          tab = 'news'
          //查询数据库中的news
          findall(tab, (news) => {
            //查询数据库中的评论
            tab = 'forum'
            findall(tab, (forum) => {
              res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
            })
          })
        }
      })

    })


  }
  else {
    tab = "news"
    //查询数据库中的news
    findall(tab, (news) => {
      //查询数据库中的评论
      tab = "forum"
      findall(tab, (forum) => {
        res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
      })
    })
  }

})


///////////////////////////////////发表评论界面///////////////////////////////////

app.get('/addforum', (req, res, next) => {
  console.log(req.query.opinion)
  console.log(req.query.submit)
  opinion = req.query.opinion;
  tag = req.query.submit;
  tab = 'news'
  //输入内容不为空
  if (opinion.length != 0) {

    console.log(opinion.length)

    addSql = 'INSERT INTO forum SET ?'
    addSqlParams = { account: account, tag: tag, opinion: opinion };
    insertuser(addSql, addSqlParams, (docs) => {

      if (docs == 0) {

        console.log("数据库添加失败")
        tab = 'news'
        //查询数据库中的news
        findall(tab, (news) => {
          //查询数据库中的评论
          tab = 'forum'
          findall(tab, (forum) => {
            res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
          })

        })
      }

      else {
        console.log("OK 成功")
        tab = 'news'
        //查询数据库中的news
        findall(tab, (news) => {
          //查询数据库中的评论
          tab = 'forum'
          findall(tab, (forum) => {
            res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
          })
        })
      }

    })

  }



  else {
    tab = "news"
    //查询数据库中的news
    findall(tab, (news) => {
      //查询数据库中的评论
      tab = "forum"
      findall(tab, (forum) => {
        res.render(__dirname + "/public/forum.ejs", { news: news, forum: forum })
      })
    })
  }

})

///////////////////////////////////////////////////////////信息展示////////////////
app.get('/Informationdisplay', (req, res, next) => {
  //res.render(__dirname + "/public/Informationdisplay.ejs",)
  tab = "shares"
  findall(tab, (shares) => {
    res.render(__dirname + "/public/Informationdisplay.ejs", { shares: shares })
  })

})

/////////////////////////////////数据可视化//////////////////////////////

app.get('/datavis', (req, res, next) => {
  console.log(req.query.scode)
  filename = req.query.scode
  code = req.query.scode
  console.log(code)
  filename = filename + ".csv"
  filename = "data/" + filename
  console.log(filename)

  //创业板sz科创板sh 30sz 60sh
  if (code >= 299999 && code <= 400000) {
    var a = "http://hq.sinajs.cn/list=sz"
    a = a + code
  }
  else {
    var a = "http://hq.sinajs.cn/list=sh"
    a = a + code
  }
  console.log(a)
  //res.render(__dirname + "/public/Informationdisplay.ejs",)
  res.render(__dirname + "/datavis/layout.ejs", { filename: filename, a: a, code: code })

})











var std = {}
var st = {}
var sd = {}

// 使用异步的方式调用python脚本
const exec = require('child_process').exec;
app.get('/Intelligent', (req, res, next) => {

  // 异步执行
  //stdout输出stderr报错
  //python py_test.py arg0 arg1...可以向Python传入参数
  exec('python diaoyong.py', function (error, stdout, stderr) {
    var rate = new Array();
    var code = new Array();
    var share = new Array();
    var kind = new Array();
    if (error) {
      console.info('stderr : ' + stderr);
    }
    //对Python运行完成传入的参数进行处理
    std = stdout.toString().split('[')
    st = std[0]
    sd = std[1]

    st = st.toString().split("\n")

    sd = sd.toString().split(']')
    sd = sd[0].toString().split('\n')
    sd = sd.toString().split(' ')
    sd = sd.toString().split(',')
    //清除空字符
    for (var a = 0; a < st.length; a++) {
      if (st[a] != '') {
        rate.push(st[a])
      }
    }
    for (var b = 0; b < sd.length; b++) {
      if (sd[b] != '') {
        if (sd[b] < 10) {
          for (var i = 0; i < 5; i++) {
            sd[b] = 0 + sd[b]
          }
        }
        else if (sd[b] < 100) {
          for (var i = 0; i < 4; i++) {
            sd[b] = 0 + sd[b]
          }
        }
        code.push(sd[b].toString())
      }

    }
    //通过股票代码信息查询股票信息
    for (var c = 0; c < code.length; c++) {
      findshares(code[c].toString(), (docs) => {
        share.push(docs[0].sname)
        kind.push(docs[0].skind)

        if (share.length == rate.length) {
          console.log(share)
          console.log(rate)
          console.log(code)
          console.log(kind)
          //处理完成，传入智能推荐
          res.render(__dirname + "/public/Intelligent Recommendation.ejs", { share: share, rate: rate, code: code, kind: kind })
        }
      });
    }

  })


})


////////////////////////////////////////////////////////////////////////////
//链接端口
app.listen(3000)



