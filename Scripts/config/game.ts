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
    }
}