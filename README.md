# Message passing
This library is created to simplify communicate between chrome extension popup and the service-worker more intuitively and uses chrome message passing api in underlying layer.

## One way connections
One way connections allows you to make a request to the service worker. Service worker also can send a response to the request just like in HTTP.
To handle requests and to requests import ``message.js``.

### Popup
``` js
message.request('service-worker-1').then((res) => {
	console.log('response received from the service worker-1')
})
```
``message.request`` function optionaly takes a object and send it with the request.
``res`` is the resopnse from the service worker. In this case ``{}`` beacuse service worker dosen't return anything.
``message.onRequest`` function shouldn't be used in the popup.

### Service worker
```js
message.onRequest('service-worker-1', (body) => {
	console.log('service-worker-1')
})
```
Here service worker logs ``service-worker-1``(Request name) when a request is made to ``service-worker-1``. 
``body`` is the request body. You can optionally send a reponse to the request by retuning a value of type object.
``message.request`` function shouldn't be used in the service-worker.

## Long lived connections
Long lived connections allows to send and receive messages to both ends (Service worker and popup).

### Service worker
Import ``service-worker-msg-socket.js`` to use long lived connections in the service worker.
```js
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
```
Here when popup connected to ``socket`` socket port service worker sends a message to popup and then starts listening incoming messages.

### Popup
Import ``content-script-msg-socket.js`` to connect to msgSockets in popup.
```js
ConnectToSocket('socket', (conn) => {
	conn.onReceive((obj) => {
		console.assert(obj.msg != undefined)
		if (obj.msg == 'hello') {
			conn.send({
				msg: 'welcome',
			})
		} else {
			console.log(obj.msg)
		}
	})
})
```
Here popup connects to ``socket`` socket port and starts listning to incoming messages. Popup ``conn`` also has the same methods in service worker conn.
