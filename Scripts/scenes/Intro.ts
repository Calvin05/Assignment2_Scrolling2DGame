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
            this._dLabel = new objects.Label("Cheat: (+5 lives and +10 bullets)", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 75, false);
            this._sImage = new objects.Image("skey", 50, 150, false);
            this._sLabel = new objects.Label("Shield: Remove enemies bullets", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 175, false);
            this._spaceImage = new objects.Image("spacekey", 50, 250, false);
            this._spaceLabel = new objects.Label("Shoot Bullet", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 325, 275, false);
            this._bulletImage = new objects.Image("laser", 55, 365, false);
            this._bulletLabel = new objects.Label("Bullet", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 115, 375, false);
             //instantiate a new Text object
            // buttons
            this._starButton = new objects.Button("start", 600, 530, true);
        

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
            this.addChild(this._dLabel);
            this.addChild(this._dImage);
            this.addChild(this._sImage);
            this.addChild(this._sLabel);
            this.addChild(this._spaceLabel);
            this.addChild(this._spaceImage);
            this.addChild(this._bulletLabel);
            this.addChild(this._bulletImage);
        }

        
    }
}