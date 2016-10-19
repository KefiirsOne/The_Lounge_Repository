(function () {
    //game ir galvenais JS objekts, kas satur pilnīgi visu pārējo programmu,
    //"game" parameters Phaser.Game funkcijā nosaka, kur iekš index.html spēle tiks ievietota
    var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'game');
    console.log("Spēle radīta!");

    //Te tiek pievienoti visi state machine stāvokļi, caur kuriem ies programma
    game.state.add("Boot", BasicGame.Boot);
    game.state.add("Preload", BasicGame.Preload);
    game.state.add("GameTitle", BasicGame.GameTitle);
    game.state.add("Game", BasicGame.Game);
    game.state.add("GameOver", BasicGame.GameOver);

    
    game.state.start('Boot');

})();