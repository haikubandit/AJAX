console.log("Let's get this party started!");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

async function getGiphy(tag) {
	try {
		const apiKey = 'wIF2Hmxz84gbgdk2MmuJg0uCtVvJeVU4';
		const res = await axios.get('http://api.giphy.com/v1/gifs/random', {
			params: { tag, api_key: apiKey }
		});
		renderGIF(res.data.data.fixed_width_downsampled_url);
	} catch (e) {
		console.log(e);
	}
}

// getGiphy('hilarious');

// http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym

const form = document.querySelector('form');

form.addEventListener('submit', async function(e) {
	e.preventDefault();
	const searchInput = document.querySelector('#search');
	getGiphy(searchInput.value);
	searchInput.value = '';
});

const gifs = document.getElementById('gifs');

const renderGIF = gifLink => {
	const newImg = document.createElement('img');
	newImg.classList.add('border', 'border-dark', 'm-3', 'rounded');
	newImg.src = gifLink;
	gifs.append(newImg);
	console.log(gifLink);
};

const removeGifs = document.getElementById('remove');

removeGifs.addEventListener('click', function(e) {
	e.preventDefault();
	gifs.innerHTML = '';
});
