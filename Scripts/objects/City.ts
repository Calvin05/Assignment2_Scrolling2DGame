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
    export class City extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.CITY_ATLAS, "city");

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.x <= -770)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.subtract(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this._verticalSpeed = 5; // 5 px per frame
            this._horizontalSpeed = 5;
            this.velocity = new Vector2(this._horizontalSpeed, 0);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this.position = new Vector2(0, 0);
        }
    }
}