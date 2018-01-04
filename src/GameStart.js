

var GameStart = cc.Layer.extend({
	sprite: null,

	ctor:function(){
		this._super();
		var size = cc.winSize;	
		cc.director	.setClearColor(cc.color(255,0,0,0,0));
		var menuItem1 = new cc.MenuItemFont("Play", play);
        var menuItem2 = new cc.MenuItemFont("Exit", exit);

        var menu = new cc.Menu(menuItem1, menuItem2);
        menu.alignItemsVertically();
        this.addChild(menu);



	}
});
var play = function(){
	var scene = new MainLayerScene();
	cc.director.runScene(scene);
}
var exit = function(){

	var scene = new GameOverScene();
	cc.director.runScene(scene);
	
}
var GameStartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameStart();       
        this.addChild(layer);
    }
});