// create BasicGame Class
BasicGame = {
};

BasicGame.Boot = function (game) {
};
  
BasicGame.Boot.prototype = {

	preload: function(){
		//Pirmajā spēles stāvoklī ielādējam tikai grafiku, ko nepieciešams rādīt, kamēr ielādējas viss pārējais (i.e. loading bar & logo)
		this.load.image('loading_bar', 'asset/loading_bar.png');
	},
	
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}
}