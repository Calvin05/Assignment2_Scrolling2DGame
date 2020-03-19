module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        // private _ocean?: objects.Ocean;
        // private _plane?: objects.Plane;
        // private _island?: objects.Island;
        // private _clouds?: objects.Cloud[];
        // private _cloudNumber: number;
        private _city:objects.City;
        private _supe:objects.Player;
        private _bullets:Array<objects.Image>;
        // private _enemy:objects.Enemy;
        private fire = true;
        private _ememies:objects.Enemy[];
        private _enemybullets: Array<objects.Image>;
        private _live:objects.Live;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._supe = new objects.Player();
            this._city = new objects.City();
            this._bullets = new Array<objects.Image>();
            // this._enemy = new objects.Enemy();
            this._enemybullets = new Array<objects.Image>();
            this._ememies = new Array<objects.Enemy>();
            this._live = new objects.Live();
            this.AddEnemies(5);
            // createjs.Sound.play("m1");
            this.Main();
        }     
        public AddEnemies(number:Number):void{
            console.log("enemy num: " + this._ememies.length);
            let createEnemy = setInterval(()=>{
                if(this._ememies.length < number)
                {
                    let enemy = new objects.Enemy();
                    this._ememies.push(enemy);
                    this.addChild(enemy)
                    console.log("CREATE")
                    this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy)
                }
            }, 1000)
        }   
        
        public Update(): void 
        {
            this._city.Update();
            this._supe.Update();
            this._live.Update();
            // this._bullets.forEach(bullet => {
            //     bullet.x += 10;
            //     bullet.position.x += 10;
            // });
            this.UpdatePlayerFire();
            this.UpdateBullets();
            this.UpdatePosition();

        }
        
        public Main(): void 
        {
            this.addChild(this._city);
            this.addChild(this._supe);
            this.addChild(this._live);
            // this.addChild(this._enemy);
            
        }


        public FireGun(enemy:objects.Enemy, bullArray:Array<objects.Image>):void
        {
                    if(enemy.canShoot()){
                        let fire = setInterval(()=>{
                            if(!enemy.isColliding)
                            {
                                let bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x, enemy.y, true);
                                bullArray.push(bullet);
                                this.addChild(bullet);
                            }
                            else clearInterval(fire)
                        }, 1000)
                    }
            //});
        }//

        public UpdatePlayerFire() {
            if(config.Game.keyboardManager.fire) {
                if(this.fire) {
                createjs.Sound.play("beamsound");
                let bullet = new objects.Image(config.Game.ASSETS.getResult("beam"), this._supe.x + 48,this._supe.y, true);
                this._bullets.push(bullet);
                this.addChild(bullet);
                this.fire = false;
                }
            }
            if(!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
            
        }

        public UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, false);
            })
            this._ememies.forEach(enemy => {
                enemy.addEventListener("tick", ()=>{
                
                    if(enemy.canShoot())
                    {
                        let bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            })
            this._enemybullets.forEach((bullet)=>{
                this.BulletSpeed(bullet, 10, 10, true);
            })
            
        }

        public BulletSpeed(eBullet:objects.Image, eSpeed:number, eMove:number, side:boolean=false):void{
            //enemy direction
            if(side == true)
            {
                eBullet.x -= eSpeed;
                eBullet.position.x -= eMove;
                if(eBullet.x <= 0) {
                    this.removeChild(eBullet);
                } 
            }
            //player direction
            else{
                eBullet.x += eSpeed;
                eBullet.position.x += eMove;
                if(eBullet.y >= 1200) {
                    this.removeChild(eBullet);
                } 
            }
        }

        public UpdatePosition() 
        {
            this._ememies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                // this._enemybullets.forEach((bullet)=>{
                    
                //     managers.Collision.AABBCheck(this._supe, bullet);
                //     if(bullet.isColliding) {

                //         if(managers.Collision.live <= 0) {
                //             this.ExploreAnimation(this._player.x, this._player.y);
                //         } else {
                //             this.ShieldAnimation(this._player.x, this._player.y);
                //         }

                //         bullet.position = new objects.Vector2(-200,-200);
                //         this.removeChild(bullet);
                //     //config.Game.SCENE_STATE = scenes.State.END;
                //     }
                // });
                this._bullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if(bullet.isColliding) {
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.position = new objects.Vector2(-100,-200);
                        // enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200,-200);
                        this.removeChild(bullet);
                        // Play.point += 100;
                    }
                });
            // check collision player and enemies
            // managers.Collision.Check(enemy, this._player);
            // if(this._player.isColliding)
            // {
            //     console.log("debug: Player collision");
            //     //createjs.Sound.play("./Assets/sounds/crash.wav");
            //     //config.Game.SCENE_STATE = scenes.State.END;
            //     //createjs.Sound.stop();//
            // }

            });
            
        }
    }
}