/* 
    Author: Viet Cuong Nguyen
    ID: 300972502
    Last Modified by: Viet Cuong Nguyen
    Date last Modified: 04/03/2020
    Description: Shooting game 
    Revision History: v1.9
*/
module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
     
        private _startButton: objects.Button;
        private _introButton: objects.Button;
        // private _ocean: objects.Ocean;
        private _city:objects.City;
        private _title:objects.Image;
        public hit = false;
        private _supeAnimation:createjs.Sprite;
        private _backgroundMusic:createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             
            // buttons
             this._startButton = new objects.Button("start", 450, 480, true);
             this._introButton = new objects.Button("intro", 700, 480, true);
            
            //  this._ocean = new objects.Ocean();
            this._city = new objects.City();
            this._title = new objects.Image("title", 600, 130, true);
            
            this._supeAnimation = this.FlyAnimation();
            this._backgroundMusic = createjs.Sound.play("b1");
            this._backgroundMusic.loop = -1; // loop forever
            this._backgroundMusic.volume = 0.5; 
            this.Main();
            
        }        
        
        public Update(): void 
        {
           this._city.Update();
          
           this.titleAniation();
        }
        
        public Main(): void 
        {
            this.addChild(this._city);
            this.addChild(this._startButton);
            this.addChild(this._introButton);
           
            this.addChild(this._title);
            this.addChild(this._supeAnimation);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET =10;
                config.Game.SCORE = 0;
                this._backgroundMusic.stop();
            });

            this._introButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INTRO;
                this._backgroundMusic.stop();
            });
            
              
                // this.ShieldAnimation(this._supe.x, this._supe.y);
         

        }

        public FlyAnimation() {

            let flyAnimation = new createjs.Sprite(config.Game.TEXTURE_ATLAS);
                flyAnimation.x = 500;
                flyAnimation.y = 300;
              
                flyAnimation.gotoAndPlay('supe1');
                
                // this.addChild(flyAnimation);
                return flyAnimation;
        }

        public titleAniation() {
            
            if(this._title.y < 100) {
                this.hit = false;
            } else if ( this._title.y > 200) {
                this.hit = true;
            }
            if(this.hit) {
                this._title.y -= 3;
               
                this._supeAnimation.x -= 3;
            } else {
                this._title.y += 1;
                
                this._supeAnimation.x += 1;
            }
           
               
            
           
        }

       
        
    }
}