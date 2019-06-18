var mysql = require('mysql')
var dbConfig = require('../db/DBConfig')
var userSQL = require('../db/UserSql')
var postSQL = require('../db/postSql')
var commentSQL = require('../db/commentSql')
var express = require('express')
var router = express.Router()

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool( dbConfig.mysql )
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 用户注册
router.get('/reg', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    var param = req.query || req.params
    var userName = param.uid
    var passWord = param.name
    var _res = res
    connection.query(userSQL.queryAll, function (err, res) {
      var isTrue = false
      // 获取用户列表，循环遍历判断当前用户是否存在
      if (res) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].uid == userName && res[i].userName == passWord) {
            isTrue = true
          }
        }
      }

      var data = {}
      data.isreg = !isTrue
      if (isTrue) {
        data.result = {
          code: 1,
          msg: '用户已存在'
        }
      } else {
        connection.query(userSQL.insert, [userName, passWord], function (err, result) {
          if (result) {
            data.result = {
              code: 200,
              msg: '注册成功'
            }
          } else {
            data.result = {
              code: -1,
              msg: '注册失败'
            }
          }
        })
      }
      if (err) {
        data.err = err
      }
      // 以JSON格式返回操作结果给前台
      setTimeout(() => {
        responseJSON(_res, data)
      }, 300)
      // 释放链接
      connection.release()
    })
  })
})

// 用户登录
router.get('/login', function (req, res, next) {
  //从连接池获取链接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的用户参数
    var param = req.query || req.params
    var userName = param.uid
    var passWord = param.name
    var _res = res
    connection.query(userSQL.queryAll, function (err, res, result) {
      var isTrue = false
      if (res) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].uid == userName && res[i].userName == passWord) {
            isTrue = true
            req.session.user = userName
          }
        }
      }
      var data = {}
      data.isLogin = isTrue
      //如果isTrue布尔值为true则登陆成功 有false则失败
      if (isTrue) {
        data.userInfo = {}
        data.userInfo.uid = userName
        data.userInfo.userName = passWord
      }
      // 登录成功返回用户信息
      if (result) {
        result = {
          code: 200,
          msg: 'succeed'
        }
      }
      if (err) {
        data.err = err
      }
      responseJSON(_res, data)
      connection.release()
    })
  })
})

// 获取帖子
router.get('/getPost', function (req, res, next) {
  //从连接池获取链接
  pool.getConnection(function (err, connection) {
    var _res = res
    connection.query(postSQL.queryAll, function (err, res, result) {
      var data = {}
      data.post = []
      if (res) {
        for (let i = 0; i < res.length; i++) {         
          data.post.push(res[i])
        }
      }
      // 登录成功返回用户信息
      if (result) {
        data.result = {
          code: 200,
          msg: 'succeed'
        }
      }
      if (err) {
        data.err = err
      }
      responseJSON(_res, data)
      connection.release()
    })
  })
})

// 获取评论
router.get('/getComment', function (req, res, next) {
  //从连接池获取链接
  pool.getConnection(function (err, connection) {
    var _res = res
    connection.query(commentSQL.queryAll, function (err, res, result) {
      var data = {}
      data.comment = []
      if (res) {
        for (let i = 0; i < res.length; i++) {         
          data.comment.push(res[i])
        }
      }
      // 登录成功返回用户信息
      if (result) {
        data.result = {
          code: 200,
          msg: 'succeed'
        }
      }
      if (err) {
        data.err = err
      }
      responseJSON(_res, data)
      connection.release()
    })
  })
})

// 发表帖子
router.post('/publishPost', function (req, res, next) {
  //从连接池获取链接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的用户参数
    var param = req.body
    var title = param.title
    var content = param.content
    var user = param.user
    var _res = res
    connection.query(postSQL.queryAll, function (err, res) {
      var postId = []
      var data = {}
      if (res) {
        for (let i = 0; i < res.length; i++) {         
          postId.push(res[i].postId)
        }
      }
      var newPostId = postId[postId.length - 1] + 1
      data.newPostId = newPostId
      connection.query(postSQL.insert, [title, content, user, newPostId],function (err, result) {
        if (result) {
          data.result = {
            code: 200,
            msg: '发表成功'
          }
        } else {
          data.result = {
            code: -1,
            msg: '发表失败'
          }
        }
      })
      if (err) {
        data.err = err
      }
      setTimeout(() => {
        responseJSON(_res, data)
      }, 500)
      connection.release()
    })
  })
})

// 发表评论
router.post('/publishComment', function (req, res, next) {
  //从连接池获取链接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的用户参数
    var param = req.body
    var postId = param.postId
    var content = param.content
    var user = param.user
    var _res = res
    var data = {}
    connection.query(commentSQL.insert, [postId, user, content],function (err, result) {
      if (result) {
        data.result = {
          code: 200,
          msg: '发表成功'
        }
      } else {
        data.result = {
          code: -1,
          msg: '发表失败'
        }
      }
    })
    if (err) {
      data.err = err
    }
    setTimeout(() => {
      responseJSON(_res, data)
    }, 500)
    connection.release()
  })
})

// 获取session登录状态,判断用户是否登陆过
router.get('/getSession', function(req, res, next) {
  if(req.session.user){
    var uid = req.session.user
    var data = {}
    data.userName = uid
    responseJSON(res, data)
  }
});

// 获取session登录状态,判断用户是否登陆过
router.get('/quitLogin', function(req, res, next) {
  delete req.session.user
  var data = {}
  data.result = {
    code: 200,
    msg: '退出登录成功'
  }
  responseJSON(res, data)
});

module.exports = router