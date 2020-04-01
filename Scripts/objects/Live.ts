module objects 
{
    export class Live extends GameObject
    {
              
       
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed:number;
        private _horizontalSpeed:number;
        private _right:boolean = true;
        // PUBLIC PROPERTIES

        // CONSTUCTOR
        constructor(name:string = "bullet", x:number = 0, y:number= 0, isCentered:boolean = false)
        {
            super(config.Game.TEXTURE_ATLAS, name, x, y, isCentered);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            if (this.position.x < 0 - this.width)
            {
                this.Reset();
            }
        } 

        private _move():void 
        {
            // this.position = Vector2.add(this.position, this.velocity);
            this.position = Vector2.subtract(this.position, this.velocity );
        }

        // PUBLIC METHODS
        public Start(): void {
            this._horizontalSpeed = 5; // 5 px per frame
            this.velocity = new Vector2(this._horizontalSpeed, 0);
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
            this.Animation();
        }
        public Reset(): void {
            // let randomX= util.Mathf.RandomRange(0 + this.halfWidth, config.Game.SCREEN_WIDTH - this.width);
            let randomY = util.Mathf.RandomRange(0 + this.width, config.Game.SCREEN_HEIGHT - this.height);
            this.position = new Vector2(config.Game.SCREEN_WIDTH + this.width + 100, randomY, this);
        }

        public Animation() {
            this.addEventListener("tick", () => {
                let tick = createjs.Ticker.getTicks();
                // console.log("debug tick : " + i);
                if(tick % 10 == 0) {
                    if(this._right) {
                        this.rotation += 10;
                        this._right = false;
                    } else {
                        this.rotation -= 10;
                        this._right = true;
                    }
                }
            })
        }

    }
}