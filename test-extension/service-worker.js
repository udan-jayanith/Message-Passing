importScripts('../message.js')

message.onRequest('service-worker-1', (body) => {
	console.log('service-worker-1')
})

message.onRequest('service-worker-2', (body) => {
	console.log('service-worker-2')
})

importScripts('../service-worker-msg-socket.js')

msgSocket.onConnect('socket', (conn) => {
	conn.send({
		msg: 'hello',
	})
	conn.onReceive((obj) => {
		console.assert(obj.msg != undefined)
		if (obj.msg == 'welcome') {
			conn.send({msg: 'thanks'})
		} else {
			console.log(obj.msg)
		}
	})
})
