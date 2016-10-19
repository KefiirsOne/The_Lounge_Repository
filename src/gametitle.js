BasicGame.GameTitle = function(game){
};

BasicGame.GameTitle.prototype = {

	create: function(){
		this.game.add.sprite(0,0,"background_1");

		this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY*0.3, 'logo');
		this.logo.anchor.setTo(0.5);

		this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'start_button', this.startGame, this, 0, 1, 2, 0);
		this.button.anchor.setTo(0.5);
	},

	startGame: function(){
		this.game.state.start("Game");
	}

}