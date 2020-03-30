//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;
    let keyboardManager: managers.Keyboard;

    let assets: createjs.LoadQueue;

    let cityAtlas:createjs.SpriteSheet;
    let assetManifest = 
    [
        {id:"button", src:"./Assets/images/button.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"startButton", src:"./Assets/images/start.png"},
        {id:"introButton", src:"./Assets/images/intro.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"backButton", src:"./Assets/images/backButton.png"},
        {id:"city", src:"./Assets/images/city.jpg"},
        {id:"supe", src:"./Assets/images/sp1.png"},
        {id:"supe2", src:"./Assets/images/sp2.png"},
        {id:"supe3", src:"./Assets/images/s3.png"},
        {id:"supe4", src:"./Assets/images/s4.png"},
        {id:"title", src:"./Assets/images/title.png"},
        {id:"beam", src:"./Assets/images/beam.png"},
        {id:"bullet", src:"./Assets/images/bullet.png"},
        {id:"beam2", src:"./Assets/images/beam2.png"},
        {id:"enemy", src:"./Assets/images/alien.png"},
        {id:"m1", src:"./Assets/audio/m1.mp3"},
        {id:"smoke", src:"./Assets/audio/smoke.wav"},
        {id:"beamsound", src:"./Assets/audio/beamsound.wav"}
        
    ];

    let cityData = 
    {
        "images": {},
        "frames": [
            [0, 0, 2311, 600],
        ],
        "animations": {
            "city": { "frames": [0] },
        }
    }

    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
        keyboardManager = new managers.Keyboard();
        config.Game.keyboardManager = keyboardManager;

        cityData.images = [assets.getResult("ocean")];
        cityAtlas = new createjs.SpriteSheet(cityData);
        config.Game.CITY_ATLAS = cityAtlas;
        
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();