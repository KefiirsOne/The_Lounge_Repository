function adjust() {
	var divgame = document.getElementById("game");
	divgame.style.width = window.innerWidth + "px";
	divgame.style.height = window.innerHeight + "px";
}

window.addEventListener('resize', function() {       adjust();   });


BasicGame.Preload = function(game){
};

BasicGame.Preload.prototype = {

	preload: function(){ 
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//Boot state ielādētā bilde tagad tiek parādīta kā loading bars
		this.preloadBar = this.add.sprite(0, this.game.world.centerY, 'loading_bar');
        this.preloadBar.anchor.setTo(0,0.5);
		this.preloadBar.scale.setTo(1600/50);

		this.load.setPreloadSprite(this.preloadBar);

		this.title = this.add.text(this.game.world.centerX, this.game.world.centerY*0.3, 'Ielādē...', { fontSize: '64px', fill: 'white' });
		this.title.anchor.setTo(0.5);

		//Te jāielādē visi resursi, kas vēlāk būs vajadzīgi 
		this.load.image('logo', 'asset/zaulzilla_logo.png');
		this.load.spritesheet('start_button', 'asset/start_button.png', 286, 73);

		this.load.image('ground', 'asset/platform.png');
		this.load.image('star', 'asset/star.png');
		this.load.image('diamond', 'asset/diamond.png');
		this.load.image('firstaid', 'asset/firstaid.png');

		this.load.image('mustangs', 'asset/mustangs.png');
		this.load.image('astra', 'asset/astra.png');

		this.load.image('background_1', 'asset/japanese_sun.png');
		this.load.image('background_2', 'asset/background_2.png');
		this.load.image('background_3', 'asset/background_3.png');
		this.load.image('background_4', 'asset/background_4.png');
	
		this.load.spritesheet('dude', 'asset/dude.png', 32, 48);
		this.load.spritesheet('baddie', 'asset/baddie.png', 32, 32);


		this.load.audio('rimshot', 'asset/rimshot.wav');
	},

	create: function(){
		//Pēc ielades beigām automātiski tiek sāks nākamais programmas stāvoklis
		this.game.state.start("GameTitle");
	}
}