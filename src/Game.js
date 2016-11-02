/* jshint browser:true */

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;

        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;

        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(true, false);

        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);

        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.updateLayout(true);

        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();
	adjust();

    },

    preload: function () {



    },

    create: function () {
        //Pasaules lielums
        this.world.setBounds(0, 0, 3200, 900);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.parallax = new Parallax(this);
        this.parallax.add("background_1",false);
        this.parallax.add("background_2",false, {tile:3});
        this.parallax.add("background_3",true, {tile:3});
        this.parallax.add("background_4",false, {tile:3});


        //  The platforms group contains the ground and the ledges we can jump on
        platforms = this.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        var ground = platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(8, 2);
        ground.body.immovable = true;

        ground = platforms.create(0, this.world.height - 64-32, 'ground');
        ground.scale.setTo(0.1,1);
        ground.body.immovable = true;

        ground = platforms.create(1580, this.world.height - 64-32, 'ground');
        ground.scale.setTo(0.1,1);
        ground.body.immovable = true;

        var ledge = platforms.create(400, 600, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 450, 'ground');
        ledge.body.immovable = true;

        //Mašīnas
        cars = this.add.group();
        cars.enableBody = true;

        car = cars.create(2000,this.world.height - 250,'mustangs');
        car.body.bounce.y = 0.1;
        car.body.gravity.y = 600;

        car = cars.create(2500,this.world.height - 250,'astra');
        car.scale.setTo(0.8);
        car.body.bounce.y = 0.1;
        car.body.gravity.y = 600;


        // The player and its settings
        player = this.add.sprite(100, this.world.height - 250, 'dude');
        player.scale.setTo(2);

        this.camera.follow(player);

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);


        baddie = this.add.sprite(1000, this.world.height - 250, 'baddie');
        baddie.scale.setTo(2);
        this.physics.arcade.enable(baddie);
        baddie.body.bounce.y = 0.2;
        baddie.body.gravity.y = 300;
        baddie.body.collideWorldBounds = true;

        baddie.animations.add('left', [0, 1], 10, true);
        baddie.animations.add('right', [2, 3], 10, true);

        baddie.body.velocity.x = -200;
        baddie.animations.play('left');


        //  Finally some stars to collect
        stars = this.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        spriteNames = ['star','diamond','firstaid'];

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var rand = spriteNames[Math.floor(Math.random() * spriteNames.length)];
            var star = stars.create(i * 70, 0, rand);
            star.scale.setTo(1.5);
            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }


        //  The score
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Punkti: 0', { fontSize: '32px', fill: 'white' });
        this.scoreText.fixedToCamera = true;


        this.rimshot = this.add.audio('rimshot');
        pausebreak = this.input.keyboard.addKey(19);
        pausebreak.onDown.add(this.playRimshot, this);

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
    //	this.input.onDown.addOnce(changeMummy, this);
    },
    
    update: function() {

        //  Collide the player and the stars with the platforms
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);
        this.physics.arcade.collide(player, baddie);
        this.physics.arcade.collide(baddie, stars);
        this.physics.arcade.collide(baddie, platforms);
        this.physics.arcade.collide(cars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function   
        this.physics.arcade.overlap(player, stars, this.collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown || this.input.pointer1.x < 400 && this.input.pointer1.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -200;
            player.animations.play('left');
        }
        else if (cursors.right.isDown || this.input.pointer1.x > 1200 && this.input.pointer1.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 200;
            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if ((cursors.up.isDown || this.input.pointer1.y < 500 && this.input.pointer1.isDown) && player.body.touching.down)
        {
            player.body.velocity.y = -400;
        }

        if (baddie.body.touching.left)
        {
            baddie.body.velocity.x = 250;
            baddie.animations.play('right');
        }

        if (baddie.body.touching.right)
        {
            baddie.body.velocity.x = -250;
            baddie.animations.play('left');
        }


        this.parallax.update();

        //this.game.world.wrap(player, -(this.game.width/2), false, true, false);

    },

    collectStar: function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        this.score += 10;
        this.scoreText.text = 'Punkti: ' + this.score;

    },
    
    playRimshot: function () {
        console.log("Badum-tsss!");
        this.rimshot.play();
    },


    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.
        //var scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);
    	//manager.setUserScale(scale, scale, 0, 0);

    },
  

    gameOver: function(){
        this.game.state.start("GameOver");
    }

};