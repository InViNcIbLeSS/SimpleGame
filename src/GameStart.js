var GameStart = cc.Layer.extend({
	//sprite: null,

	ctor:function(){
		this._super();
		var size = cc.winSize;	
		cc.director	.setClearColor(cc.color(153, 204, 255, 0,0));
		var menuItem1 = new cc.MenuItemFont("Play", play);
		var menuItem2 = new cc.MenuItemFont("Settings", settings);
		var menuItem3 = new cc.MenuItemFont("High Scores",highscores);
        var menuItem4 = new cc.MenuItemFont("Exit", exit);

        var menu = new cc.Menu(menuItem1, menuItem2, menuItem3, menuItem4);
        menu.alignItemsVertically();
        this.addChild(menu);

	}
});
var highscores = function(){
	var scene = new HighScoresScene();
	cc.director.runScene(scene);
}
var settings = function(){
	var scene = new SettingsScene();
	cc.director.runScene(scene);
}
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