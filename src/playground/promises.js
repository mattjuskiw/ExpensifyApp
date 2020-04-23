// 'res' = Resolve, 'rej' = Reject
const promise = new Promise((res, rej) => {
	setTimeout(() => {
		// res('This is my resolved data.');
		rej('Error message.');
	}, 1500);
});

promise.then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
});