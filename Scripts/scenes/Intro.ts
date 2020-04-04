module scenes
{
    export class Intro extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _starButton: objects.Button;
        private _city:objects.City;
        private _dLabel:objects.Label;
        private _dImage:objects.Image;
        private _sLabel:objects.Label;
        private _sImage:objects.Image;
        private _spaceLabel: objects.Label;
        private _spaceImage: objects.Image;
        private _bulletLabel: objects.Label;
        private _bulletImage: objects.Image;
        private _introLabel: objects.Label;
        private _alienImage:objects.Image;
        private _alienLabel:objects.Label;
        private _bossImage:objects.Image;
        private _bossLabel:objects.Label;
        private _liveImage:objects.Image;
        private _liveLabel:objects.Label;
        private _menuLabel:objects.Label;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
            this._city = new objects.City();
            this._dImage = new objects.Image("dkey", 50, 50, false);
            this._dLabel = new objects.Label("Cheat: +5 lives and +10 bullets", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 75, false);
            this._sImage = new objects.Image("skey", 50, 150, false);
            this._sLabel = new objects.Label("Shield (x3): Remove enemies bullets", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 175, false);
            this._spaceImage = new objects.Image("spacekey", 50, 250, false);
            this._spaceLabel = new objects.Label("Shoot Bullet", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 325, 275, false);
            this._bulletImage = new objects.Image("laser", 55, 365, false);
            this._bulletLabel = new objects.Label("Bullet (x10)", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 115, 375, false);
            this._liveImage = new objects.Image("live", 255, 365, false);
            this._liveLabel = new objects.Label("Live (x3) \n0 live - game over", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 300, 362, false);
            this._introLabel = new objects.Label("Kill All Enemy To Win The Game", "40px", "Impact, Charcoal, sans-serif", "#FF2800", 625, 50, false);
            this._alienImage = new objects.Image("alien", 650, 150, false);
            this._alienLabel = new objects.Label("Alien x7 - (100 points)", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 800, 170, false);
            this._bossImage = new objects.Image("boss2", 625, 250, false);
            this._bossLabel = new objects.Label("Boss x1 - (1000 points) \n\n15 lives - becomes more aggressive \n\nwhen lives below 8", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 800, 270, false);
            this._starButton = new objects.Button("start", 500, 530, true);
            this._menuLabel = new objects.Label("menu", "60px", "Impact, Charcoal, sans-serif", "#FFA07A", 700, 530, true);
            this.Main();
        }        
        
        public Update(): void 
        {
            this._city.Update();
        }
        
        public Main(): void 
        {
           
            this.addChild(this._city);
            this.addChild(this._starButton)
            this._starButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET = 10;
                config.Game.SCORE = 0;
                
            });
            this.addChild(this._menuLabel)
            this._menuLabel.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
                
            });
            this.addChild(this._dLabel);
            this.addChild(this._dImage);
            this.addChild(this._sImage);
            this.addChild(this._sLabel);
            this.addChild(this._spaceLabel);
            this.addChild(this._spaceImage);
            this.addChild(this._bulletLabel);
            this.addChild(this._bulletImage);
            this.addChild(this._introLabel);
            this.addChild(this._alienImage);
            this.addChild(this._alienLabel);
            this.addChild(this._bossLabel);
            this.addChild(this._bossImage);
            this.addChild(this._liveLabel);
            this.addChild(this._liveImage);
        }

        
    }
}