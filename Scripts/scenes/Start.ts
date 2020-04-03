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
            });

            this._introButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INTRO;
            });
            
              
                // this.ShieldAnimation(this._supe.x, this._supe.y);
         

        }

        public FlyAnimation() {
            let chopperImg1 = new Image();
            let chopperImg2 = new Image();
           
           
            chopperImg1.src = "./Assets/images/supe1.png";
            chopperImg2.src = "./Assets/images/supe2.png";
           
            let spriteSheet = new createjs.SpriteSheet({
                images: [ chopperImg1, chopperImg2],
                frames: { width: 200, height:46, count: 2},
                animations: {
                    fly: [0, 1, "fly"]
                }
            });

            let flyAnimation = new createjs.Sprite(spriteSheet);
                flyAnimation.x = 500;
                flyAnimation.y = 300;
                flyAnimation.spriteSheet.getAnimation('fly').speed = 0.1;
                flyAnimation.gotoAndPlay('fly');
                
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