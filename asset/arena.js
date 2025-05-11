// someone who already made it online and you can just copy it
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
	let markdownIt = document.createElement('script')
	markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
	document.head.appendChild(markdownIt)


// connecting arena page
	let channelSlug = 'philosophers-cave' 

	// First, let’s lay out some *functions*, starting with our basic metadata:
	// Let = function that allows you to command something or create a new fresh variable
	// Connecting with your html eg. ‘#channel-title’
	let placeChannelInfo = (data) => {
		// Target some elements in your HTML:
		let channelTitle = document.querySelector('#channel-title')
		let channelDescription = document.querySelector('#channel-description')
		let channelCount = document.querySelector('#channel-count')

		// Then set their content/attributes to our data:
		// innerHTML = assigning task or changing the text like i want this to be this (i want channelTitle to be data.title)
		channelTitle.innerHTML = data.title
		// channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
		channelCount.innerHTML = data.length
	}

	// Then our big function for specific-block-type rendering:
	let renderBlock = (block) => {
		// To start, a shared `ul` where we’ll insert all our blocks
		let channelBlocks = document.querySelector('#channel-blocks')
		let imageBlocks = document.querySelector('#image-blocks')
		let textBlocks = document.querySelector('#text-blocks')
		let videoBlocks = document.querySelector('#video-blocks')
	}

		// Images!
		if (block.class == 'Image') { 
			let photoItem = `
				<li class="image-block">
					<picture>
						${ block.image.thumb ? `<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">` : '' }
						${ block.image.large ? `<source media="(max-width: 640px)" srcset="${ block.image.large.url }">` : '' }
						<img src="${ block.image.original.url }" alt="Image from Are.na">
					</picture>
				</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', photoItem);
		}
		
	
		// Text!
		else if (block.class == 'Text') {
			let textItem = 
		`
			<li class="text-block">
				<button class="text-block">
					<blockquote>${block.content}</blockquote>
					<h3 class="block-title">${block.title}</h3>
				</button>
			</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}
	
		// Uploaded (not linked) media…
		else if (block.class == 'Attachment') {
			let attachment = block.attachment.content_type // Save us some repetition
	
			// Uploaded videos!
			if (attachment.includes('video')) {
				// …still up to you, but we’ll give you the `video` element:
				let videoItem =
					`
					<li class="video-block">
						<p><em>Video</em></p>
						<video controls src="${ block.attachment.url }"></video>
					</li>
					`
				channelBlocks.insertAdjacentHTML('beforeend', videoItem)
				// More on video, like the `autoplay` attribute:
				// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
			}
		}
	
			// Uploaded audio!
			else if (attachment.includes('audio')) {
				// …still up to you, but here’s an `audio` element:
				let audioItem =
					`
					<li class="audio-block">
						<p><em>Audio</em></p>
						<audio controls src="${ block.attachment.url }"></audio>
					</li>
					`
				channelBlocks.insertAdjacentHTML('beforeend', audioItem)
				// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
			}
		
	
		// Linked media…
		else if (block.class == 'Media') {
			let embed = block.embed.type
	
			// Linked video!
			if (embed.includes('video')) {
				// …still up to you, but here’s an example `iframe` element:
				let linkedVideoItem =
					`
					<li class="video-block">
						<p><em>Linked Video</em></p>
						${ block.embed.html }
					</li>
					`
				channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
				// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
			}
		}
				
	
	
	// It‘s always good to credit your work:
	let renderUser = (user, container) => { // You can have multiple arguments for a function!
		let userAddress =
			`
			<address>
				<section id="channel-users"><img src="${ user.avatar_image.display }"></section>
				<h3>${ user.first_name }</h3>
				<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
			</address>
			`
		// container.insertAdjacentHTML('beforeend', userAddress)
	}
		
	// API stuff - Now that we have said what we can do, go get the data:
	fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
		.then((response) => response.json()) // Return it as JSON data
		.then((data) => { // Do stuff with the data
			console.log(data) // Always good to check your response!
			placeChannelInfo(data) // Pass the data to the first function
	
			// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
			data.contents.reverse().forEach((block) => {
				// console.log(block) // The data for a single block
				renderBlock(block) // Pass the single block data to the render function
			})
	
			// Also display the owner and collaborators:
			let channelUsers = document.querySelector('#channel-users') // Show them together
			data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
			renderUser(data.user, channelUsers)
		})


// function to filter basically show or hide item based on media type
// if "Show All" is selected, it removes the hide class from all items
// guidance from class/Eric loom video and went through with tutor 
		let channelBlocks = document.querySelector('#channel-blocks');
		let showVideoButton = document.querySelector('#show-video-button');
		let showImageButton = document.querySelector('#show-image-button');
		let showTextButton = document.querySelector('#show-text-button');
		let showAudioButton = document.querySelector('#show-audio-button');
		let showAllButton = document.querySelector('#show-all-button');
		
		function showCategory(categoryClass) {
			// remove all possible filter classes
			channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-audio', 'show-all');
		
			// add the correct category class
			channelBlocks.classList.add(categoryClass);
		
			// get all the list items in the channel blocks
			const allItems = channelBlocks.querySelectorAll('li');
		
			// Show or hide items based on the selected category
			allItems.forEach(item => {
				if (categoryClass === 'show-all') {
					item.classList.remove('hide'); 
				} else {
					if (item.classList.contains(categoryClass.replace('show-', '') + '-block')) {
						item.classList.remove('hide'); 
					} else {
						item.classList.add('hide'); 
					}
				}
			});
		
			// to check if the correct class is applied. it is!
			console.log("Applied class:", channelBlocks.classList);
		}
		
		
		// assigning event listeners
		showVideoButton.onclick = () => showCategory('video');
		showImageButton.onclick = () => showCategory('image');
		showTextButton.onclick = () => showCategory('text');
		showLinkButton.onclick = () => showCategory('link');
		showAudioButton.onclick = () => showCategory('audio');
		
		// showing all button displays everything
		showAllButton.onclick = () => {
			channelBlocks.querySelectorAll('li').forEach(li => {
				li.classList.remove('hide'); // remove or hide class from all items
			});
			console.log("Showing all items");
		};



