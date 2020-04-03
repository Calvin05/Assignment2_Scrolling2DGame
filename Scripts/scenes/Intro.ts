module scenes
{
    export class Intro extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _starButton: objects.Button;
        private _city:objects.City;
    

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
                config.Game.BULLET =10;
                config.Game.SCORE = 0;
                
            });
        }

        
    }
}