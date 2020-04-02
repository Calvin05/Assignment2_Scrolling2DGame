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
     
        // PUBLIC PROPERTIES
        
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
          
        }
        public Reset(): void {
           
            this.position = new Vector2(1500, 100, this)
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