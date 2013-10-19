$(document).ready(function() {

var i=0;

   	function randOrd(){
	return (Math.round(Math.random())-0.5);
}

	var flagAreas = [

	[59.333682, 18.015408],
    [59.298544, 17.996718],
    [59.866538, 17.641189],
    [59.894538, 17.651189]

   	];

   		flagAreas.sort(randOrd);
		
		document.write('Random : ' + flagAreas[i] + '<br />');

});