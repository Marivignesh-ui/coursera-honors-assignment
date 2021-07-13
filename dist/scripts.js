
let apikey="a7d00503dfmsh9725c87cd5dcb63p1bb2e8jsn956e12391d67";
let apihost="imdb8.p.rapidapi.com";
let inter;
let prev="popular";
let poplist=document.getElementById("movielist").innerHTML;
// fetch("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": apikey,
// 		"x-rapidapi-host": apihost
// 	}
// })
// .then(response => {return response.json()})
// .then((data)=>{
	// let counter=0;
	// inter=setInterval(()=>{
	// 	getoverview(counter,data);
	// 	counter+=5;
	// },1000)
//  })
// .catch(err => {
// 	console.error(err);
// });
function getoverview(count,titledata,limit){
	let s="";
	for(let i=count;i<count+4;i++){
		if(!isNaN(limit)){
			s=`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${titledata[i].id.slice(7)}&currentCountry=US`;
		}
		else{
			s=`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${titledata[i].slice(7)}&currentCountry=US`;
		}
		fetch(s, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": apikey,
				"x-rapidapi-host": apihost
			}
		})
		.then(Response => {return Response.json()})
		.then((data)=>{
			console.log(data.title.title);
			console.log(data.title.image.url);
			console.log(data.genres);
			console.log(data.ratings.rating);
			createcard(data.title.title,data.title.image.url,data.genres,data.ratings.rating);
		})
		.catch(err => {
			console.error(err);
		});
	}
	console.log(count);
	if(!isNaN(limit)){
		if(count>8){
			clearInterval(inter);
		}
	}
	if(count>15){
		clearInterval(inter);
	}
}
function createcard(title,url,genre,rating){
	parent=document.getElementById("movielist");
	element=document.createElement("div");
	element.className="card";
	imagelement=document.createElement("IMG");
	imagelement.setAttribute("src",""+url);
	imagelement.setAttribute("class","card-img-top");
	imagelement.setAttribute("alt",`${title}`);
	element1=document.createElement("div");
	element1.className="card-body";
	element1.innerHTML=`<h5><strong>${title}</strong></h5>
						<p class="card-text"> <strong>Genre:</strong> ${genre} <br>
						<a href="#">View more </a> <br>
						<span class="rating">${rating}/10</span> </p>`;	
	element.appendChild(imagelement);
	element.appendChild(element1);
	parent.appendChild(element);
}
function find(){
	let name=document.getElementById("moviename").value;
	console.log(name);
	fetch(`https://imdb8.p.rapidapi.com/title/find?q=${name}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": apikey,
		"x-rapidapi-host": apihost
	}
	})
	.then(Response => {return Response.json()})
	.then((data)=>{
		document.getElementById("movielisttitle").innerText=name[0].toUpperCase+name.slice(1);
		parent=document.getElementById("movielist");
		parent.innerHTML="";
		let counter=0;
		inter=setInterval(()=>{
			getoverview(counter,data.results,10);
			counter+=5;
		},1000)
		//console.log(data);
	})
	.catch(err => {
		console.error(err);
	});
}
function moviesbygenre(genre){
	fetch(`https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F${genre}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "a7d00503dfmsh9725c87cd5dcb63p1bb2e8jsn956e12391d67",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
	})
	.then(Response => {return Response.json()})
	.then((data)=>{
		parent=document.getElementById("movielist");
		parent.innerHTML="";
		let prevlink=document.getElementById(`${prev}`);
		prevlink.setAttribute("class","btn");
		let link=document.getElementById(`${genre}`);
		link.setAttribute("class","btn link-active");
		document.getElementById("movielisttitle").innerText=`${genre[0].toUpperCase()+genre.slice(1)}`;
		let counter=0;
		inter=setInterval(()=>{
			getoverview(counter,data);
			counter+=5;
		},1000)
		prev=genre;
	})
	.catch(err => {
		console.error(err);
	});
}
function defaultfun(){
	document.getElementById("movielisttitle").innerText="Popular";
	let link=document.getElementById("popular");
	link.setAttribute("class","btn link-active");
	parent=document.getElementById("movielist");
	parent.innerHTML=poplist;
	prev="popular"
}


