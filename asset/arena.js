let channelSlug = 'typography-and-interaction-too'


// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!

		let title = document.querySelector('#channel-title')
		title.innerHTML = data.title

		let channelDescription = document.querySelector('#channel-title')
		channelDescription.innerHTML = data.metadata.description
	})