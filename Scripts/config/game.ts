module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 1200;
        public static SCREEN_HEIGHT:number = 600;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM = 5;
        public static keyboardManager: managers.Keyboard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static CITY_ATLAS: createjs.SpriteSheet;
        public static SMOKE_ATLAS: createjs.SpriteSheet;
        public static LIVES:number = 3;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static BULLET: number = 10;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static MESSAGE: string = " ";
    }
}