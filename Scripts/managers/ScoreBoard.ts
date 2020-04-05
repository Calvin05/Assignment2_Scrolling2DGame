module managers
{
    export class ScoreBoard
    {
        //private instance members
        private _lives : number = 0;
        private _score : number = 0;
        private _bullet : number = 10;
        private _livesLabel : objects.Label = new objects.Label;
        private _scoreLabel : objects.Label = new objects.Label;
        private _bulletLabel : objects.Label = new objects.Label;
        private _highScoreLabel : objects.Label = new objects.Label;
        private _highScore : number = 0;
        private _liveImage: objects.Image;
        private _bulletImage : objects.Image;
        
       
        public get BulletImage() : objects.Image {
            return this._bulletImage;
        }
        public set BulletImage(v : objects.Image) {
            this._bulletImage = v;
        }
        
        
        public get LiveImage() : objects.Image 
        {
            return this._liveImage;
        }
        public set LiveImage(v : objects.Image) 
        {
            this._liveImage = v;
        }

        
        private _scoreImage : objects.Image;
        public get ScoreImage() : objects.Image {
            return this._scoreImage;
        }
        public set ScoreImage(v : objects.Image) {
            this._scoreImage = v;
        }
        
        public get HighScore() : number 
        {
            return this._highScore;
        }
        public set HighScore(v : number) 
        {
            this._highScore = v;
            config.Game.HIGH_SCORE = this._highScore;
            this._highScoreLabel.setText("High Score: " + this._highScore);
        }
 
        public get HighScoreLabel() : objects.Label 
        {
            return this._highScoreLabel;
        }

        public get ScoreLabel():objects.Label
        {
            return this._scoreLabel;
        }

        public get LivesLabel() :objects.Label
        {
            return this._livesLabel;
        }
        
        public get Score() : number {
            return this._score;
        }

        public get BulletLabel():objects.Label
        {
            return this._bulletLabel;
        }

        public set Score(v : number) {
            this._score = v;
            config.Game.SCORE = this._score;
            this._scoreLabel.text = " : " + this._score;
        }
        
        public get Lives() : number {
            return this._lives;
        }
        public set Lives(v : number) 
        {
            this._lives = v;
            config.Game.LIVES = this._lives;
            this._livesLabel.text = " : " + this._lives;
        }

        public get Bullet() : number {
            
            return this._bullet;
        }
        public set Bullet(v : number) {
            this._bullet = v;
            config.Game.BULLET = this._bullet;
            this._bulletLabel.text = " : " + this._bullet;
        }
        
        //public properties
        //comstructor
        constructor()
        {
            this._initialize();
        }

        //private method

        // public ScoreLabel:objects.Label;
        // public LivesLabel:objects.Label;

        public _initialize()
        {
            this._livesLabel = new objects.Label("3", "25px", "Impact, Charcoal, sans-serif", "#fff", 50, 30, true);
            this._scoreLabel = new objects.Label("0", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 247, 30, true);
            this._bulletLabel = new objects.Label(" : 10", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 160, 30, true);
            this._highScoreLabel = new objects.Label("0", "70px", "Impact, Charcoal, sans-serif", "#ffffff", 600, 90, true);
            this.Lives = config.Game.LIVES;
            this.Score = config.Game.SCORE;
            this.HighScore = config.Game.HIGH_SCORE;

            this._liveImage = new objects.Image("live", 28, 30, true);
            this._bulletImage = new objects.Image("beamLabel", 122, 30, true);
            this._scoreImage = new objects.Image("star", 225, 30, true);
        }
    }
}