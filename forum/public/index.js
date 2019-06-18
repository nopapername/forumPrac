
var isLoginPage = false

$(document).ready(function () {

  // 获取登录状态
  axios.get('/users/getSession')
    .then((res) => {
      if (res.data) {
        $(".userLogin").empty()
        $(".userLogin").append(`<h3>用户名：</h3><h3 class="yonghuming">${res.data.userName}</h3>`)
        $(".userLogin").append('<a class="tuichudenglu" onclick="tuichu()">退出</a>')
        isLoginPage = true
      }
    })
    .catch(function (error) {
        console.log(error)
      })
  //登录框部分
  var isLoginView = true
  
  $(".close").click(function () {
    $(".box_bg").fadeOut(100);
    $(".box_lg").hide(100);
    $('.LoginView').show()
    $('.regView').hide()
    isLoginView = true
  })
  $("#lijizhuce").click(function () {
    isLoginView = false
    if (!isLoginView) {
      $('.LoginView').hide()
      $('.regView').show()
    }
  })
  $("#login_btn").click(function () {
    var uid = $(".iptUid").val()
    var pwd = $(".iptName").val()
    console.log(uid)
    axios.get('/users/login', {
      params: {
        uid: uid,
        name: pwd
      }
    })
      .then(function (response) {
        console.log(response.data)
        if (response.data.isLogin) {
          alert("登陆成功")
          $(".box_bg").fadeOut(100);
          $(".box_lg").hide(100);
          $(".userLogin").empty()
          $(".userLogin").append(`<h3>用户名：</h3><h3 class="yonghuming">${response.data.userInfo.uid}</h3>`)
          $(".userLogin").append('<a class="tuichudenglu" onclick="tuichu()">退出</a>')
          isLoginPage = true
        } else {
          alert("用户名密码错误")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  })
  $("#reg_btn").click(function () {
    var uid = $("#riptUid").val()
    var pwd = $("#riptName").val()
    if (pwd && uid) {
      axios.get('/users/reg', {
        params: {
          uid: uid,
          name: pwd
        }
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.isreg) {
            alert('注册成功')
            $('.LoginView').show()
            $('.regView').hide()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      alert("请输入帐号和密码")
    }
  })

  // 获取帖子的数据
  var post = []
  var comment = []
  axios.get('/users/getPost')
    .then(function (response) {
      post = [...response.data.post]
      for (let i = 0; i < post.length; i++) {
        var midContentHtml = `
        <div class="post-container" id="postId${post[i].postId}">
        <div class="post-title">标题：${post[i].title}</div>
        <div class="post-content">内容：${post[i].content}</div>
        <div class="post-user">用户：${post[i].user}</div>
        <div class="post-comment">
          <div class="comment-title">
            <h3>评论内容：</h3>
            <a href="javascript:void(0)"  onclick="fabiaopinglun(${post[i].postId})" id="commentPostId${post[i].postId}">发表评论</a>
          </div>
          <div class="comment-content">
          </div>
        </div>
      </div>`
        $(".mid-content").append(midContentHtml)
      }
      axios.get('/users/getComment')
        .then(function (response) {
          comment = [...response.data.comment]
          for (let i = 0; i < post.length; i++) {
            for (let j = 0; j < comment.length; j++) {
              if (post[i].postId == comment[j].postId) {
                console.log(comment)
                $(`#postId${comment[j].postId} .comment-content`).append(`<div>用户${comment[j].user}评论：${comment[j].content}</div>`)
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    })
    .catch(function (error) {
      console.log(error)
    })

  // 发帖部分
  $(".fatie").click(function () {
    if (isLoginPage) {
      $(".box_bg").fadeIn(100);
      $(".box_post").slideDown(200);
    } else {
      alert('请登录后发帖！')
    }
  })
  $(".close_boxPost").click(function () {
    $(".box_bg").fadeOut(100);
    $(".box_post").hide(100);
  })
  $(".btn_publishPost").click(function () {
    var postTitle = $(".ipt_post").val()
    var neiRong = $(".post_neirong").val()
    var user = $(".yonghuming").text()
    console.log(postTitle)
    if (neiRong && postTitle) {
      axios.post('/users/publishPost', {
        title: postTitle,
        content: neiRong,
        user: user
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.result.code == 200) {
            alert('发表成功')
            let post = []
            let comment = []
            axios.get('/users/getPost')
              .then(function (response) {
                post = [...response.data.post]
                $(".mid-content").empty()
                for (let i = 0; i < post.length; i++) {
                  var midContentHtml = `
                    <div class="post-container" id="postId${post[i].postId}">
                    <div class="post-title">标题：${post[i].title}</div>
                    <div class="post-content">内容：${post[i].content}</div>
                    <div class="post-user">用户：${post[i].user}</div>
                    <div class="post-comment">
                      <div class="comment-title">
                        <h3>评论内容：</h3>
                        <a href="javascript:void(0)" onclick="fabiaopinglun(${post[i].postId})" id="commentPostId${post[i].postId}">发表评论</a>
                      </div>
                      <div class="comment-content">
                      </div>
                    </div>
                  </div>`
                  $(".mid-content").append(midContentHtml)
                }
                axios.get('/users/getComment')
                  .then(function (response) {
                    comment = [...response.data.comment]
                    for (let i = 0; i < post.length; i++) {
                      for (let j = 0; j < comment.length; j++) {
                        if (post[i].postId == comment[j].postId) {
                          console.log(comment)
                          $(`#postId${comment[j].postId} .comment-content`).append(`<div>用户${comment[j].user}评论：${comment[j].content}</div>`)
                        }
                      }
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })

                $(".box_bg").fadeOut(100);
                $(".box_post").hide(100);
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      alert("请输入标题或内容")
    }
  })

})

function btnLogin() {
  $(".box_bg").fadeIn(100);
  $(".box_lg").slideDown(200);
}

function tuichu() {
  $(".userLogin").empty()
  $(".userLogin").append('<a href="javascript:void(0)" id="login_click" onclick="btnLogin()">登录</a>')
  isLoginPage = false
  axios.get('/users/quitLogin')
    .then((res) => {
      console.log(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

 // 发帖评论
 function fabiaopinglun(postId) {
  if (isLoginPage) {
    $(".box_bg").fadeIn(100);
    $(".box_comment").slideDown(200);
    $(".close_boxComment").click(function () {
      $(".box_bg").fadeOut(100);
      $(".box_comment").hide(100);
    })
    $(".btn_publishComment").click(function () {
      var commentNeiRong = $(".comment_neirong").val()
      var cur_postId = postId
      var cur_user = $(".yonghuming").text()
      if (commentNeiRong) {
        axios.post('/users/publishComment', {
          postId: cur_postId,
          content: commentNeiRong,
          user: cur_user
        })
          .then(function (response) {
            if (response.data.result.code == 200) {
              alert('评论发表成功')
              let post = []
              let comment = []
              axios.get('/users/getPost')
                .then(function (response) {
                  post = [...response.data.post]
                  axios.get('/users/getComment')
                    .then(function (response) {
                      comment = [...response.data.comment]
                      $('.comment-content').empty()
                      for (let i = 0; i < post.length; i++) {
                        for (let j = 0; j < comment.length; j++) {
                          if (post[i].postId == comment[j].postId) {
                            $(`#postId${comment[j].postId} .comment-content`).append(`<div>用户${comment[j].user}评论：${comment[j].content}</div>`)
                          }
                        }
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
  
                  $(".box_bg").fadeOut(100);
                  $(".box_comment").hide(100);
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        alert("请输入标题或内容")
      }
    })
  } else {
    alert('请登录后发表评论！')
  }
}
