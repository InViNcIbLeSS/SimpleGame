var HighScores = cc.Layer.extend({



});
var HighScoresScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new HighScores();
		this.addChild(layer);
	}
});