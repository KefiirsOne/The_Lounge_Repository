BasicGame.GameOver = function(game){
};

BasicGame.GameOver.prototype = {

  	create: function(){

	},

	restartGame: function(){
		this.game.state.start("GameTitle");
	}
	
}