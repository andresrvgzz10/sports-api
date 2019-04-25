
let baseURL = "https://herokuapp.com/sportsAPI";

function displayResults(data){
	$('#listOfSports').empty();

	for(let i = 0; i < data.sports.length; i ++){
		$('#listOfSports').append(`<li> ${data.sports[i].name} </li>`);
	}
}

function fetchSports(){
	let url = '/sports/api/list-sports';
	
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults(responseJSON))
		.catch(err => {
			console.log(err);
		});

}

function createFetchSport(sportName, sportId){
	let url = '/sports/api/post-sport';
	let settings = {
		method : 'POST',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			name : sportName,
			id : sportId
		})
	};

	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			console.log(responseJSON);
			alert("Your sport was added correclty. Hit the CLICK ME BUTTON to load it")
		})
		.catch(err => {
			console.log(err);
		});
}

function watchForm(){
	$('.retrieveSports').on('submit', function(e){
		e.preventDefault();
		fetchSports();
	});

	$('.createSport').on('submit', function(e){
		e.preventDefault();
		let name = $('#sportName').val();
		let id = $('#sportId').val();
		createFetchSport(name, id);
	});
}

$(watchForm);