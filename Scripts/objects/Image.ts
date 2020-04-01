module objects 
{
    export class Image extends GameObject
    {
        // constructor
        constructor(button_name:string = "beam", x:number = 0, y:number= 0, isCentered:boolean = true)
        {
            super(config.Game.TEXTURE_ATLAS, button_name, x, y, isCentered);
            this.Start();
        }

        protected _checkBounds(): void {
           
        }
        public Start(): void {
           
        }
        public Update(): void {
           
        }
        public Reset(): void {
           
        }
        
    }
}