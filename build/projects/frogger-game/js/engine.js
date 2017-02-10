var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        gameRun = false, //if gameRun = false update and render functions for game entities will halt. gameRun set to true by reset()
        dead = false,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    container.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         * Stop update() and render() if gameRun = false freezing player
         * and enemy position on screen.
         */
        if (gameRun) {
        update(dt);
        render();
        }
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
        
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        main();
        createStars();
        createEnemies();
        render();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        collisionDetectPlayerEnemy();
        collisionDetectPlayerStar();
        collisionDetectPlayerGoal();
        hudInfo();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
            enemy.respawn();
        });
        player.update();
    }

    /*****************************************************
     * 
     * Collision detection. Third param of check collisions is a callback.
     * 
     *****************************************************/
    function collisionDetectPlayerEnemy() {
        allEnemies.forEach(function(enemy){
            checkCollisions(player, enemy, onCollisionPlayerEnemy);                   
        });
    }
    
    function collisionDetectPlayerStar() {
        allStars.forEach(function(star){
            checkCollisions(player, star, onCollisionPlayerStar); 
        });
    }
    
    function collisionDetectPlayerGoal() {
        checkCollisions(player, goal, onCollisionPlayerGoal);
    }
    
    function onCollisionPlayerEnemy() {
        lives -= 1;
        gameRun = false;
        ctx.filter = 'brightness(120%)';
        if (lives > 0) {
            setTimeout(reset, 1500);
        } else {
            setTimeout(gameOver, 1500);
        }
    }
    
    function onCollisionPlayerStar() {
        starCount++;
        allStars = [];
        if (starCount !== starGoal) {
            createStars();
        }    
    }
    
    function onCollisionPlayerGoal() {
        if (starCount == starGoal){
            increaseDifficulty();
            reset();
        }    
    }
    
    // Collision detection function
    function checkCollisions(obj1, obj2, callback){
        if (obj1.x < obj2.x + obj2.width/COLLISION_HITBOX_REDUCE &&
           obj1.x + obj1.width/COLLISION_HITBOX_REDUCE > obj2.x &&
           obj1.y < obj2.y + obj2.height/COLLISION_HITBOX_REDUCE &&
           obj1.height/COLLISION_HITBOX_REDUCE + obj1.y > obj2.y) {
            callback();
        }
    }; 
    
    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        
        if (gameRun) {
            allStars.forEach(function(star) {
                star.render();
            });
        }       
        
        player.render();
        
        if (starCount == starGoal) {
            goal.render();
        }
    }
    
    //gameOver runs when players lives = 0
    function gameOver() {
        dead = true;
        level = 1;
        starCount = 0;
        starGoal = 2;
        lives = 3;
        maxCreatedEnemies = 3;
        baseEnemySpeed = 20;
        allEnemies = [];
        allStars = [];
        player.sprite = 'images/char-empty.png'
        ctx.filter = 'brightness(100%)';
        menu.style.display = 'block';
        player.x = PLAYER_START_POS_X;
        player.y = PLAYER_START_POS_Y;
        render();
    }
    //reset runs after player collides with an enemy
    function reset() {
        gameRun = true;
        ctx.filter = 'brightness(100%)';
        player.x = PLAYER_START_POS_X;
        player.y = PLAYER_START_POS_Y;
    }
    //Menu 'Play' button. If dead = true (player lives = 0) createStars and Enemies again for new game
    startGameBtn.addEventListener('click', function(){
        menu.style.display = 'none';
        if (!dead) {
            reset();
        } else {
            gameRun = true;
            createStars();
            createEnemies();
        }    
    }, false)   
    
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/char-empty.png',
        'images/Star.png',
        'images/Selector.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

    
})(this);
