# lsbsocket
## lsbsocket作用
1.lsbsocket主要用于服务端与stm32之间的socket通信  
2.可以即时推送信号到stm32并让stm32做出对应操作  
3.通过lsbserver接口在后端已算出预约时间，不需要再去stm32端计算，节省cpu时间。让出更多线程  
4.采用非堵塞模型优化，不会产生堵塞情况
## lsbsocket语法
1.lsbsocket全采用标准nodejs标准进行搭建，同时兼容Chrome v8语法。  
2.lsbsocket采用定时主动推送的方法向stm32端推送消息  