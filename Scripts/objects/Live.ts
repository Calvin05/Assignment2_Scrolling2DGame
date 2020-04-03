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
        constructor(name:string = "laser", x:number = 0, y:number= 0, isCentered:boolean = false)
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
            this.position = Vector2.subtract(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this._horizontalSpeed = 5; // 5 px per frame
            this.velocity = new Vector2(this._horizontalSpeed, 0);
            this.Reset();
        }
        public Update(): void {
            this.rotation += 5;
            this._move();
            this._checkBounds();
           
        }
        public Reset(): void {
            let randomX= util.Mathf.RandomRange(config.Game.SCREEN_WIDTH + this.width + 100, config.Game.SCREEN_WIDTH + this.width + 300);
            let randomY = util.Mathf.RandomRange(0 + this.width, config.Game.SCREEN_HEIGHT - this.height);
            
            this.position = new Vector2(randomX, randomY, this);
        }

    }
}