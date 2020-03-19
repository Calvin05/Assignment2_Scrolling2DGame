module objects 
{
    export class Enemy extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed:number;
        private _horizontalSpeed:number;
        private canFire: boolean = true;
        private _right:boolean = true;
        // PUBLIC PROPERTIES

        // CONSTUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("enemy"), new Vector2(), true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            if (this.position.x < -this.width)
            {
                this.Reset();
            }
        } 

        private _move():void 
        {
            // this.position = Vector2.subtract(this.velocity, this.position );
            this.position = Vector2.subtract(this.position, this.velocity );
        }

        // PUBLIC METHODS
        public Start(): void {
            this.name = "enemy";
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
            this.Animation();
        }
        public Reset(): void {
            // this._verticalSpeed = util.Mathf.RandomRange(5,10);
            // this._horizontalSpeed =  util.Mathf.RandomRange(-2,2);// 5 px per frame
            this._verticalSpeed = util.Mathf.RandomRange(-2,2);
            this._horizontalSpeed =  util.Mathf.RandomRange(5,10);;
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            // let randomX = util.Mathf.RandomRange(0 + this.halfWidth, config.Game.SCREEN_WIDTH - this.width);
            // let randomY = util.Mathf.RandomRange(-this.height * 2, - this.height);
            let randomX = util.Mathf.RandomRange(config.Game.SCREEN_WIDTH + this.width * 2, config.Game.SCREEN_WIDTH );
            let randomY = util.Mathf.RandomRange(0 + this.halfHeight, config.Game.SCREEN_HEIGHT - this.height);
            this.position = new Vector2(randomX, randomY, this)
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

        public Animation() {
            this.addEventListener("tick", () => {
                let tick = createjs.Ticker.getTicks();
                // console.log("debug tick : " + i);
                if(tick % 30 == 0) {
                    if(this._right) {
                        this.rotation += util.Mathf.RandomRange(9.9, 10);
                        this._right = false;
                    } else {
                        this.rotation -= util.Mathf.RandomRange(9.9, 10);
                        this._right = true;
                    }
                }
            })
        }

    }
}