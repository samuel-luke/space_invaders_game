Final.pages['page-controls'] = (function(screens, input) {

	function initialize() {
		input.initialize();

		document.getElementById('id-controls-moveLeft').addEventListener(
			'click',
			function() {
				$(document).keydown(function(event){
					localStorage.setItem('leftControl', event.key);
					Final.leftControl = event.key; 
					document.getElementById('id-controls-moveLeft').innerHTML = ("Move Left: " + event.code);
					$(document).unbind("keydown");
				});
			}
		);

		document.getElementById('id-controls-moveRight').addEventListener(
			'click',
			function() {
				$(document).keydown(function(event){
                    localStorage.setItem('rightControl', event.key);
					Final.rightControl = event.key; 
					document.getElementById('id-controls-moveRight').innerHTML = ("Move Right: " + event.code);
					$(document).unbind("keydown");
				});
			}
		);
		
		document.getElementById('id-controls-fire').addEventListener(
			'click',
			function() {
				$(document).keydown(function(event){
					localStorage.setItem('fireControl', event.key);
					Final.fireControl = event.key;
					document.getElementById('id-controls-fire').innerHTML = ("Fire: " + event.code);
					$(document).unbind("keydown");
				});
			}
		);

		document.getElementById('id-controls-back').addEventListener(
			'click',
			function() { screens.showScreen('page-mainmenu'); }
		);
	}

	function run() {
		initialize();

		document.getElementById('id-controls-moveLeft').innerHTML = ("Move Left: " + Final.leftControl);
		document.getElementById('id-controls-moveRight').innerHTML = ("Move Right: " + Final.rightControl);
		document.getElementById('id-controls-fire').innerHTML = ("Fire: " + Final.fireControl);
	}

	return {
		initialize : initialize,
		run : run
	};
}(Final.screens, Final.input));
