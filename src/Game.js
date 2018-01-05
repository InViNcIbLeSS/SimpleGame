var obj;
var monster;
var projectile;
var player;
var passed = 0;
var score = 0;
var i = 0;

var MainLayer = cc.Layer.extend({

    i: null,
    players: [],
    lives: [],
    monsters: [],
    animationfrmes: [],
    projectiles: [],
    scores: null,
    pass: null,
    ctor:function(){
        this._super();

        var size = cc.winSize;
        cc.director.setClearColor(cc.color(188,191,210,255));

        
        obj = this;
       // cc.audioEngine.playMusic(res.background_mus, true);
        cc.audioEngine.setMusicVolume(0.05);
        passed = 0;
        score = 0;

        player = new cc.Sprite.create(res.player_arr_1);
        player.setPosition(cc.p(player.getContentSize().width / 2, size.height / 2));
       // spritesheet.addChild(player, 25);
        //player.runAction(player_anim);
        //this.addChild(player);


        cc.spriteFrameCache.addSpriteFrames(res.player_list);
        var players = [];
        spritesheet =  cc.textureCache.addImage(res.player_arr);
        //debugger

       // cc.spriteFrameCache.addSpriteFrames(spritesheet, res.player_list);
       // obj.addChild(spritesheet, 16);
        for(var i = 1; i < 18 ; i++){
            str = i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            players.push(frame);
        }
        players.shift();
        cc.log(players.length);

        animation = new cc.Animation(players, 0.1);
        player_anim = new cc.repeatForever(new cc.Animate(animation), 1);
        // player = new cc.Sprite(res.player_arr_1);
        // player.setPosition(cc.p(player.getContentSize().width / 2, size.height / 2));
        
        this.addChild(player);
        player.runAction(player_anim);
        
        

       // this.scheduleOnce(this.addPlayer);        
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

    addPlayer:function(){

        //1800*900
        var size = cc.winSize;
        
    },
    addScores:function(){
        var size = cc.winSize;


        for(var i = 1; i < 6; i++){
            this.lives[i] = new cc.Sprite.create(res.Life_png);
            this.lives[i].setPosition(cc.p((size.width / 2) + i*20 , size.height - this.lives[i].getContentSize().height / 2));
            this.addChild(this.lives[i]);
        } 
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
        //this.addChild(pass);

    },
    update:function(dt){

        // if(i < 15){
        // this.player.setTexture(res.player_arr(players[i++])) ;
        // }
        // else
        //     i = 0;


        for(var i = 0; i < this.projectiles.length; i++){

            var projectile = this.projectiles[i];

            for(var j = 0; j < this.monsters.length; j++){

                var monster = this.monsters[j];
                var monsterRect = monster.getBoundingBox();
                var projectileRect = projectile.getBoundingBox();
                var playerRect = player.getBoundingBox();

                // if(cc.rectIntersectsRect(monsterRect, playerRect) || cc.rectIntersectsRect(monsterRect,projectileRect) ){

                //     cc.log(playerRect);

                //     if(!cc.rectIntersectsRect(monsterRect, playerRect) == null)
                //     cc.log("Player Died");
                //     obj.remove(this.monsters, monster);
                //     monster.removeFromParent();
                // }
                 if(cc.rectIntersectsRect(monsterRect,projectileRect)){
                //    else {
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

        // var minY = size.height / 2;
        // var maxY = size.height - size.height / 2;

        // var range = maxY - minY;

        var actualY = (Math.random() *(size.height - monster.getContentSize().height)) ;

        monster.setPosition(size.width + monster.getContentSize().width / 2 , actualY);
       // cc.log("here");
        this.addChild(monster);
       // cc.log("here2");
        var minTime = 2;
        var maxTime = 4;
        var timeRange = maxTime - minTime;
        var actualTime = (Math.random() * timeRange) + minTime;
        var action = cc.Sequence.create(
            cc.MoveTo.create(actualTime, cc.p(-20, actualY)),
            cc.CallFunc.create(function(monster){
                 obj.remove(this.monsters, monster);
                 monster.removeFromParent();
                 passed++;
                 cc.log("Monster passed:" + passed);
                 pass.setString(" Monsters passed: "+ passed);
                 if(passed < 5){
                 obj.remove(this.lives);
                 this.lives[passed].removeFromParent();
                 }
                 else {
                    exit();
                 }

            }, this)
        )
            ;
        monster.runAction(action);
        this.monsters.push(monster);
    },
    
});
var exit = function(){
        //cc.director.popScene();
        var scene  = new GameOverScene();
        cc.director.runScene(scene);
}
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
var MainLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();       
        this.addChild(layer);
    }
});