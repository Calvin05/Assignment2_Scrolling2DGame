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
        {id:"electric", src:"./Assets/audio/smoke.wav"},
        {id:"beamsound", src:"./Assets/audio/beamsound.wav"}
        
    ];

    let spriteData =
    {

        "images": {},
        
        "framerate": 20,
        "frames": [
            [1, 1, 495, 99, 0, -7, -7],
            [498, 1, 220, 209, 0, -37, -45],
            [1, 102, 213, 209, 0, -43, -46],
            [216, 102, 217, 205, 0, -42, -47],
            [435, 102, 45, 62, 0, -3, 0],
            [482, 102, 3, 3, 0, 0, 0],
            [435, 166, 50, 50, 0, 0, 0],
            [216, 309, 203, 198, 0, -51, -51],
            [1, 313, 196, 194, 0, -56, -53],
            [421, 309, 202, 198, 0, -53, -53],
            [435, 218, 200, 74, 0, 0, 0],
            [435, 294, 120, 12, 0, 0, 0],
            [625, 294, 209, 208, 0, -48, -46],
            [637, 212, 200, 74, 0, 0, 0],
            [836, 288, 212, 203, 0, -43, -48],
            [836, 493, 31, 14, 0, 0, 0],
            [720, 1, 213, 202, 0, -38, -50],
            [839, 205, 140, 71, 0, 0, 0],
            [935, 1, 194, 188, 0, -55, -56],
            [981, 191, 200, 47, 0, 0, 0],
            [981, 240, 120, 24, 0, 0, 0],
            [1131, 1, 177, 176, 0, -63, -61],
            [1050, 266, 210, 204, 0, -45, -45],
            [1050, 472, 70, 28, 0, 0, 0],
            [1122, 472, 40, 35, 0, 0, 0],
            [1164, 472, 38, 35, 0, 0, 0],
            [1204, 472, 25, 26, 0, 0, 0],
            [1183, 179, 200, 47, 0, 0, 0],
            [1310, 1, 175, 169, 0, -64, -63],
            [1385, 172, 180, 162, 0, 0, 0],
            [1262, 228, 65, 65, 0, 0, 0],
            [1329, 228, 40, 40, 0, 0, 0],
            [1487, 1, 180, 162, 0, 0, 0],
            [1262, 336, 180, 162, 0, 0, 0],
            [1444, 336, 180, 162, 0, 0, 0],
            [1567, 165, 168, 163, 0, -67, -69],
            [1669, 1, 162, 162, 0, -8, 0],
            [1626, 330, 146, 162, 0, -14, 0],
            [1737, 165, 157, 145, 0, -72, -79]
        ],
        
        "animations": {
            "title": { "frames": [0] },
            "e14": { "frames": [1] },
            "e11": { "frames": [2] },
            "e13": { "frames": [3] },
            "bullet": { "frames": [4] },
            "e16": { "frames": [5] },
            "shield": { "frames": [6] },
            "e8": { "frames": [7] },
            "e6": { "frames": [8] },
            "e7": { "frames": [9] },
            "intro": { "frames": [10] },
            "beam5": { "frames": [11] },
            "e10": { "frames": [12] },
            "start": { "frames": [13] },
            "e12": { "frames": [14] },
            "beam": { "frames": [15] },
            "e15": { "frames": [16] },
            "alien": { "frames": [17] },
            "e5": { "frames": [18] },
            "supe1": { "frames": [19, 27], "speed": 0.1 },
            "beam4": { "frames": [20] },
            "e4": { "frames": [21] },
            "e9": { "frames": [22] },
            "beam3": { "frames": [23] },
            "star": { "frames": [24] },
            "live": { "frames": [25] },
            "beam2": { "frames": [26] },
            "e3": { "frames": [28] },
            "placeholder": { "frames": [30] },
            "beamLabel": { "frames": [31] },
            "e2": { "frames": [35] },
            "boss1": { "frames": [37, 36, 29, 32, 33, 34], "speed": 0.1 },
            "e1": { "frames": [38, 35, 28, 21, 18, 8, 9, 7, 22, 12, 2, 14, 3, 1, 16, 5],
                        "speed": 0.5, "next": false }
        }
        

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