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
