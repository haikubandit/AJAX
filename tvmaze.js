/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
	// TODO: Make an ajax request to the searchShows api.  Remove
	// hard coded data.
	// const showsList = [];
	const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
	// console.log(shows);

	let shows = response.data.map(result => {
		let show = result.show;
		const { id, name, summary } = result.show;
		return {
			id,
			name,
			summary,
			image: show.image ? show.image.original : 'https://tinyurl.com/tv-missing'
		};
	});

	return shows;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	for (let show of shows) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}" alt="${show.name}-image">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `
		);

		$showsList.append($item);
	}
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
	evt.preventDefault();

	let query = $('#search-query').val();
	if (!query) return;

	$('#episodes-area').hide();

	let shows = await searchShows(query);

	populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
	// TODO: get episodes from tvmaze
	//       you can get this by making GET request to
	//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
	// TODO: return array-of-episode-info, as described in docstring above

	const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
	// console.log(shows);
	// const episodes = response.data;
	console.log(response);
	const episodes = response.data.map(result => {
		// let episode = result.show;
		const { id, name, season, number, summary, image } = result;
		return {
			id,
			name,
			season,
			number,
			summary,
			image: result.image ? result.image.original : 'https://tinyurl.com/tv-missing'
		};
	});
	console.log('Episodes ', episodes);
	return episodes;
}

function populateEpisodes(episodes) {
	const $episodesList = $('#episodes-list');
	$episodesList.empty();

	for (const episode in episodes) {
		console.log(episode);
	}

	// console.log(episodes);
	// for (let episode of episodes) {
	// let $item = $(
	// 	`<div class="col-md-6 col-lg-3 Show" data-episode-id="${episode.id}">
	//      <div class="card" data-episode-id="${episode.id}">
	//      <img class="card-img-top" src="${episode.image}" alt="${episode.name}-image">
	//        <div class="card-body">
	//          <h5 class="card-title">${episode.name}</h5>
	//          <p class="card-text">${episode.summary}</p>
	//        </div>
	//      </div>
	//    </div>
	//   `
	// );
	// $episodesList.append($item);
	// }
}
