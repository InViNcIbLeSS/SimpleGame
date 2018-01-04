var obj;
var monster;
var projectile;
var player;
var passed = 0;
var score = 0;

var MainLayer = cc.Layer.extend({

    sprite:null,
    monsters: [],
    projectiles: [],
    scores: null,
    pass: null,
    ctor:function(){
        this._super();

        var size = cc.winSize;
        cc.director.setClearColor(cc.color(255,255,255,255));




        // var button = new ccui.Button();
        // button.loadTextures(res.HelloWorld_png);
        // button.x = size.width / 2;
        // button.y = size.height / 2;
        // button.addTouchEventListener(this.touchEvent, this);
        // this.addChild(button);

        //var menuItem1 = new cc.MenuItemFont("Play", play);
        //var menuItem2 = new cc.MenuItemFont("Exit", exit);

        player = new cc.Sprite.create(res.Player_png);
        player.setPosition(cc.p(player.getContentSize().width / 2, size.height / 2));
        obj = this;
        cc.audioEngine.playMusic(res.background_mus, true);
        cc.audioEngine.setMusicVolume(0.05);
        this.addChild(player);
        this.scheduleOnce(this.addScores);
        this.schedule(this.addMonster, 3);

        if(cc.sys.capabilities.hasOwnProperty('mouse'))
        {
            var size = cc.winSize;
            var location = cc.p(size.width / 2, size.height / 2);
            cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp:function(event)  
            {
                location = cc.p(event.getLocationX(), event.getLocationY());
                var size = cc.winSize;
                projectile = new cc.Sprite.create(res.Projectile_png);
                projectile.setPosition(cc.p(0, size.height / 2));
                locationTap(location, projectile);
            }
        }, this);
        }
        this.scheduleUpdate();
    },
    // touchEvent:function(type){
    //     switch(type){


    //         case ccui.Widget.TOUCH_BEGAN:
    //             cc.log("touch Began");
    //             break;



    //         case ccui.Widget.TOUCH_ENDED:
    //             cc.log("touch Done");
    //             break;
    //     }

    // },
    addScores:function(){
        var size = cc.winSize;

        scores = new cc.LabelTTF("Score is: 0", "Arial");
        scores.setFontSize(20);
        score.setverticalAlign
        //scores.setPosition(cc.p(scores.getContentSize().width, size.height - (scores.getContentSize().height / 2)));
        scores.setPosition(cc.p(50, 590));
        scores.setColor(cc.color(255,0,0));

        pass = new cc.LabelTTF("Monsters passed: 0", "Arial");
        pass.setFontSize(20);
        pass.setPosition(cc.p(90, 550));
        pass.setColor(cc.color(255,0,0));

        this.addChild(scores);
        this.addChild(pass);

    },
    update:function(dt){

        for(var i = 0; i < this.projectiles.length; i++){

            var projectile = this.projectiles[i];

            for(var j = 0; j < this.monsters.length; j++){

                var monster = this.monsters[j];
                var monsterRect = monster.getBoundingBox();
                var projectileRect = projectile.getBoundingBox();
                var playerRect = player.getBoundingBox();

                // if(cc.rectIntersectsRect(monsterRect, playerRect)){

                //     cc.log("Player Died");
                //     obj.remove(this.monsters, monster);
                //     monster.removeFromParent();
                // }
                if(cc.rectIntersectsRect(monsterRect,projectileRect)){

                    cc.audioEngine.playEffect(res.explosion_mus, false);
                    obj.remove(this.monsters, monster);
                    monster.removeFromParent();
                    obj.remove(this.projectiles, projectile);
                    projectile.removeFromParent();
                    score++;
                    cc.log("Score is:" + score);
                    scores.setString("Score is: " + score);

                }
                

            }
        }        
    },
    remove:function(array , element){

        const index = array.indexOf(element);
        if(index!= -1){
            array.splice(index, 1);
        }
    },
    addMonster:function(dt){

      //  cc.log("hello");

        monster = new cc.Sprite.create(res.Monster_png);
        var size = cc.winSize;    

        var minY = size.height / 2;
        var maxY = size.height - size.height / 2;

        var range = maxY - minY;
        var actualY = (Math.random() *size.height) ;

        monster.setPosition(size.width + monster.getContentSize().width / 2 , actualY);
       // cc.log("here");
        this.addChild(monster);
       // cc.log("here2");
        var minTime = 2;
        var maxTime = 4;
        var timeRange = maxTime - minTime;
        var actualTime = (Math.random() * timeRange) + minTime;
        var action = cc.Sequence.create(
            cc.MoveTo.create(actualTime, cc.p(-size.width / 2, actualY)),
            cc.CallFunc.create(function(monster){
                     obj.remove(this.monsters, monster);
                     monster.removeFromParent();
                     passed++;
                     cc.log("Monster passed:" + passed);
                     pass.setString(" Monsters passed: "+ passed);
                     if(passed > 5){
                        var scene =  new GameOver.scene(true);
                        cc.Director.getInstance().replaceScene(scene);
                        
                     }
                        

            }, this)
        )
            ;
        monster.runAction(action);
        this.monsters.push(monster);
    },
    exit:function(){
        cc.director.Pause
    },
});

var locationTap = function(location,projectile){
        var size = cc.winSize;
        var offset = cc.pSub(location, projectile.getPosition());
        if(location.x <= 0)
            return;
        obj.addChild(projectile);
        var tempx = location.x;
        var tempy = location.y;

        if((tempy - 320 - (tempx / 3)) < 0 && (tempy - 320 + (tempx / 3)) > 0){
            var realX = size.width;
            realY = 320 + ((tempy - 320)*(realX - 0)/(tempx - 0))
            var dest = cc.p(realX,realY);
        }
        else if((tempy - 320 - (tempx / 3)) > 0 ){
            var realY = size.height;
            var realX = ((realY - 320)*(tempx - 0)/(tempy - 320)) + 0 
            var dest = cc.p(realX,realY);
        }
        else if((tempy - 320 + (tempx / 3)) < 0 ){
            var realY = 0;
            var realX = ((realY - 320)*(tempx - 0)/(tempy - 320)) + 0 
            var dest = cc.p(realX,realY);
        }
        var offset = cc.pSub(dest, projectile.getPosition());
        var length = cc.pLength(offset);
        var velocity = 500;
        var duration = length / velocity;

        var action = cc.Sequence.create(
            cc.MoveTo.create(duration, dest),
            cc.CallFunc.create(function(projectile){

                     obj.remove(this.projectiles, projectile);
                     projectile.removeFromParent();
            }, obj)
        );
        projectile.runAction(action);
        obj.projectiles.push(projectile);
        this.cc.audioEngine.playEffect(res.shuriken_mus, false);
        cc.log("_-------------------------------------------_");

}
 var StopMusic = function()
{
    cc.audioEngine.stopMusic();
};
var PauseMusic = function()
{
    cc.audioEngine.pauseMusic();
};
var ResumeMusic = function()
{
    cc.audioEngine.resumeMusic();
};
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();       
        this.addChild(layer);
    }
});