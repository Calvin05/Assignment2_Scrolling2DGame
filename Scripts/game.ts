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

    let textureAtlas: createjs.SpriteSheet;
    let cityAtlas: createjs.SpriteSheet;
    let smokeAtlas: createjs.SpriteSheet;
    let assetManifest = 
    [
        {id:"atlas", src:"./Assets/sprites/atlas.png"},
        {id:"smokeIm", src:"./Assets/sprites/smokeatlas.png"},
    
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"startButton", src:"./Assets/images/start.png"},
        {id:"introButton", src:"./Assets/images/intro.png"},
        {id:"city", src:"./Assets/images/city.jpg"},
       
        {id:"title", src:"./Assets/images/title.png"},
        {id:"beam", src:"./Assets/images/beam.png"},
        {id:"bullet", src:"./Assets/images/bullet.png"},
        {id:"beam2", src:"./Assets/images/beam2.png"},
        {id:"enemy", src:"./Assets/images/alien.png"},
        {id:"m1", src:"./Assets/audio/m1.mp3"},
        {id:"smoke", src:"./Assets/audio/smoke.wav"},
        {id:"beamsound", src:"./Assets/audio/beamsound.wav"}
        
    ];

    let spriteData =
    {

        "images": [
            "atlas.png"
        ],
        
        "framerate": 20,
        "frames": [
            [1, 1, 495, 99, 0, -7, -7],
            [1, 102, 200, 74, 0, 0, 0],
            [1, 178, 200, 74, 0, 0, 0],
            [203, 102, 200, 47, 0, 0, 0],
            [203, 151, 200, 47, 0, 0, 0],
            [405, 102, 140, 71, 0, 0, 0],
            [498, 1, 45, 62, 0, -3, 0],
            [498, 65, 40, 35, 0, 0, 0],
            [203, 200, 50, 50, 0, 0, 0],
            [255, 200, 70, 28, 0, 0, 0],
            [405, 175, 65, 65, 0, 0, 0],
            [472, 175, 40, 40, 0, 0, 0],
            [327, 200, 38, 35, 0, 0, 0],
            [514, 175, 25, 26, 0, 0, 0],
            [472, 217, 31, 14, 0, 0, 0]
        ],
        
        "animations": {
            "title": { "frames": [0] },
            "intro": { "frames": [1] },
            "start": { "frames": [2] },
            "supe1": { "frames": [3,4],
                        "speed": 0.1 },
            "alien": { "frames": [5] },
            "bullet": { "frames": [6] },
            "star": { "frames": [7] },
            "shield": { "frames": [8] },
            "beam3": { "frames": [9] },
            "placeholder": { "frames": [10] },
            "beamLabel": { "frames": [11] },
            "live": { "frames": [12] },
            "beam2": { "frames": [13] },
            "beam": { "frames": [14] }
        },
        
        "texturepacker": [
                "SmartUpdateHash: $TexturePacker:SmartUpdate:953413c90b92a6d3c46efdf594a1cc3c:af6fb2ddb8c373f3d85a3875d972c9b5:cbce6b53f0f49e0bf15173c25c41f876$",
                "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
        
        }
        
        
        
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

    let smokeData = 
    {

        "images": {},
        
        
        "frames": [
            [0, 0, 200, 200, 0, 100, 100],
            [200, 0, 200, 200, 0, 100, 100],
            [400, 0, 200, 200, 0, 100, 100],
            [600, 0, 200, 200, 0, 100, 100],
            [800, 0, 200, 200, 0, 100, 100],
            [0, 200, 200, 200, 0, 100, 100],
            [200, 200, 200, 200, 0, 100, 100],
            [400, 200, 200, 200, 0, 100, 100],
            [600, 200, 200, 200, 0, 100, 100],
            [800, 200, 200, 200, 0, 100, 100],
            [0, 400, 200, 200, 0, 100, 100],
            [200, 400, 200, 200, 0, 100, 100],
            [400, 400, 200, 200, 0, 100, 100],
            [600, 400, 200, 200, 0, 100, 100],
            [800, 400, 200, 200, 0, 100, 100],
            [0, 600, 200, 200, 0, 100, 100],
            [200, 600, 200, 200, 0, 100, 100],
            [400, 600, 200, 200, 0, 100, 100],
            [600, 600, 200, 200, 0, 100, 100],
            [800, 600, 200, 200, 0, 100, 100],
            [0, 800, 200, 200, 0, 100, 100],
            [200, 800, 200, 200, 0, 100, 100],
            [400, 800, 200, 200, 0, 100, 100],
            [600, 800, 200, 200, 0, 100, 100],
            [800, 800, 200, 200, 0, 100, 100],
            [0, 1000, 200, 200, 0, 100, 100],
            [200, 1000, 200, 200, 0, 100, 100],
            [400, 1000, 200, 200, 0, 100, 100],
            [600, 1000, 200, 200, 0, 100, 100],
            [800, 1000, 200, 200, 0, 100, 100],
            [0, 1200, 200, 200, 0, 100, 100]

        ],
        
        "animations": {
            "smoke": { "frames": [0,1,2,3,4,5,6,7,8,9,
                                10,11,12,13,14,15,16,17,
                                18,19,20,21,22,23,24,25,
                                26,27,28,29,30,31],
                        "speed": 0.5,
                        "next": false
                             }
        },
        
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

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        cityData.images = [assets.getResult("city")];
        cityAtlas = new createjs.SpriteSheet(cityData);
        config.Game.CITY_ATLAS = cityAtlas;
        
        smokeData.images = [assets.getResult("smokeIm")];
        smokeAtlas = new createjs.SpriteSheet(smokeData);
        config.Game.SMOKE_ATLAS = smokeAtlas;
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