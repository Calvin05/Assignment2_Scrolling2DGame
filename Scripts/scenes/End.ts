module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _endLabel: objects.Label;
        private _backButton: objects.Button;
        private _scoreboard: managers.ScoreBoard;
        private _city:objects.City;
        private _highScoreImage:objects.Image;
        private _playerScore: objects.Label;
        private _playerScoreImage: objects.Image;

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
            this._highScoreImage = new objects.Image("highscore", 600, 190, true);
            this._playerScore =  new objects.Label("Your Score: " + config.Game.SCORE, "40px", "Impact, Charcoal, sans-serif", "#ffffff",430, 390, false);
            this._playerScoreImage = new objects.Image("playerscore", 735, 400, true);
             //instantiate a new Text object
            // buttons
            this._backButton = new objects.Button("start", 600, 530, true);
            this._scoreboard = new managers.ScoreBoard();

            this.Main();
        }        
        
        public Update(): void 
        {
            this._city.Update();
        }
        
        public Main(): void 
        {
           
            this.addChild(this._city);
            this.addChild(this._endLabel);
            this.addChild(this._backButton);
            this.addChild(this._scoreboard.HighScoreLabel);
            this._backButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET =10;
                config.Game.SCORE = 0;
                
            });
            this.addChild(this._highScoreImage);
            this.addChild(this._playerScore);
            this.addChild(this._playerScoreImage);

        }

        
    }
}