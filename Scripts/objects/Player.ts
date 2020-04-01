module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _horizontalPosition:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(name:string = "supe1", x:number = 0, y:number= 0, isCentered:boolean = true)
        {
            super(config.Game.TEXTURE_ATLAS, name, x, y, isCentered);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // top boundary
            if(this.position.y <= this.halfHeight)
            {
                // this.position = new Vector2(this.halfWidth, this.position.y);
                this.position = new Vector2(this.position.x, this.halfHeight);
            }

            // bottom boundary

            if(this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight)
            {
                // this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }

             // left boundary 

             if(this.position.x < this.halfWidth)
             {
                 this.position = new Vector2(this.halfWidth, this.y);
             }
        }        

        private _move(): void
        {
            
            if(config.Game.keyboardManager.moveForward){
                this.y -= 7;
            }
            if(config.Game.keyboardManager.moveBackward){
                this.y += 7;
            }
            if(config.Game.keyboardManager.moveLeft){
                this.x -=7;
            }
            if(config.Game.keyboardManager.moveRight){
                this.x +=7;
            }
            
           
            // let newPositionY = util.Mathf.Lerp(this.position.y, this.y, 0.5);
            // this.position = new Vector2(this._horizontalPosition, newPositionY);
           
            // let newPositionY = util.Mathf.Lerp(this.y, this.position.y, 0.05);
            this.position = new Vector2(this.x, this.y);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.name = "supe";
           
            this.x = 120;
            this.y = 300;
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();
            
        }

        public Reset(): void 
        {

        }

        
    }
}