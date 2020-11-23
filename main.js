  const net = require('net');
  const request = require('request')
  let clientArr = [];
  const server = net.createServer(); //创建服务器
  let time_start, during
  var options = {
      method: 'get',
      url: 'https://lsbserver.dadiqq.cn/nearly'
  }
  server.on('connection', (person) => { //绑定事件
      clientArr.push(person);
      // 记录链接的进程
      person.id = clientArr.length;
      person.setEncoding('utf8');
      // 客户socket进程绑定事件
      person.on('data', (chunk) => {
          console.log(chunk);
      })
      let i = 0;
      person.on('close', (p1) => {
          clientArr[p1.id] = null;
      })
      person.on('error', (p1) => {
          clientArr[p1.id] = null;
      })
  })
  setInterval(() => {
          request(options, function(err, res, body) {
              body = eval("(" + body + ")")
              console.log(body)
              if (!err && body.result != 0) {
                  let nowtime = Date.parse(new Date()) / 1000; //以s为单位
                  if (body.arrive) {
                      if (body.device_id == 1) {
                          if (nowtime > body.result && nowtime < body.end) {
                              for (x of clientArr) {
                                  x.write("0")
                              }
                          } else {
                              for (x of clientArr) {
                                  x.write("1")
                              }
                          }
                      } else {
                          if (nowtime > body.result && nowtime < body.end) {
                              for (x of clientArr) {
                                  x.write("2")
                              }
                          } else {
                              for (x of clientArr) {
                                  x.write("3")
                              }
                          }
                      }
                  } else {
                      //有车预约但没有到达
                      for (x of clientArr) {
                          x.write("5")
                      }
                  }
              } else {
                  for (x of clientArr) {
                      x.write("9")
                  }
              }
          })
      }, 10 * 1000) //每隔10s做一次监听
  server.listen(30000);