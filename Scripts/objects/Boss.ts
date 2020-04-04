/* 
    Author: Viet Cuong Nguyen
    ID: 300972502
    Last Modified by: Viet Cuong Nguyen
    Date last Modified: 04/03/2020
    Description: Shooting game 
    Revision History: v1.9
*/
module objects 
{
    export class Boss extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed:number;
        private _horizontalSpeed:number;
        private canFire: boolean = true;
        private _right:boolean = true;
        private _dead : boolean = false;
        private _live : number = 15;
        private _dy: number =0; //speed
        private _dx:number =0;
        private _play = true;
        private _backgroundSound : createjs.AbstractSoundInstance;
     
        // PUBLIC PROPERTIES

        public get BackgroundSound():createjs.AbstractSoundInstance
        {
            return this._backgroundSound;
        }
        
        public set Play(v : boolean) {
            this._play = v;
        }

        public get Play(): boolean{
            return this._play;
        }

        public get live() : number {
            return this._live;
        }
        public set live(v : number) {
            this._live = v;
        }
        
        
        public get Dead() : boolean {
            return this._dead;
        }
        public set Dead(v : boolean) {
            this._dead = v;
        }
        
        // CONSTUCTOR
        constructor(name:string = "boss1", x:number = 0, y:number= 0, isCentered:boolean = true)
        {
            super(config.Game.TEXTURE_ATLAS, name, x, y, isCentered);
            this.isActive = false;
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            if (this.y < 0 + this.halfHeight + 20)
            {
                this.y = 0 + this.halfHeight + 20
            }

            if(this.y > config.Game.SCREEN_HEIGHT - (this.halfHeight + 20))
            {
                this.y = config.Game.SCREEN_HEIGHT - (this.halfHeight + 20);
            }
        } 

        private _move():void 
        {
            if(this.x <= 1050) {
                // let tick = createjs.Ticker.getTicks();
                if((createjs.Ticker.getTicks() % 60) == 0)
                this._dy = Math.random() * (20) - 10;
                this.y += this._dy;
                // this.y += this._dy;
                this.position = new Vector2(1050, this.y);
                // this.position = Vector2.subtract(this.velocity, this.position );
                this.position = Vector2.subtract(this.position, this.velocity );
                } else {
                    this.x -= 10;
            }
            
        }

        // PUBLIC METHODS
        public Start(): void {
            this.name = "enemy";
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
            this.PlayMusic();
        }
        public Reset(): void {
           
            this.position = new Vector2(1500, 100, this)
        }

        public PlayMusic() {
            if(this._play) {
                this._backgroundSound = createjs.Sound.play("backgroundMusic");
                this._backgroundSound.loop = -1; // loop forever
                this._backgroundSound.volume = 0.7; 
                createjs.Sound.play("laugh");
                this._play = false;
            } 
        }
        public canShoot(): boolean
        {
            if(!this.isColliding)
            {
                if(this.canFire){
                    this.canFire = false;
                    return true;
                }
            }
            return false;
        }

    }
}