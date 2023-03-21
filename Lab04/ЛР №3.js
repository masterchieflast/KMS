(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ЛР №3_atlas_1", frames: [[0,0,1101,746]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Растровоеизображение2 = function() {
	this.initialize(ss["ЛР №3_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_70cd38f1302496c");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AJFkBQAABCguAvQgvAvhDAAQhCAAgvgvQgvgvAAhCQAAhDAvgvQAvguBCAAQBDAAAvAuQAuAvAABDgAS/AAQAAGllkEpQlkEpn3AAQn3AAlkkpQljkpAAmlQAAmkFjkpQFkkpH3AAQH3AAFkEpQFkEpAAGkgAn6lKQAAA9grAsQgsArg9AAQg+AAgrgrQgsgsAAg9QAAg+AsgrQArgsA+AAQA9AAAsAsQArArAAA+gAsoCRQInM/NopY");
	this.shape.setTransform(4.65,-3.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF3333").s().p("AGjCQQgvgvAAhCQAAhCAvgvQAvguBCAAQBDAAAvAuQAuAvABBCQgBBCguAvQgvAvhDAAQhCAAgvgvgAqIA/QgrgsAAg8QAAg+ArgrQArgsA+AAQA9AAAsAsQAsArAAA+QAAA8gsAsQgsArg9AAQg+AAgrgrg");
	this.shape_1.setTransform(-6.45,-31.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF6699").s().p("APXQWQgGgHAFgJIADgDQAEgDAFABIAAgCQAJACADAJQADAJgIAFQgDADgDAAIgCABQgGAAgEgGgAxoKpQlkkpAAmkQAAmkFkkqQFkkpH3AAQH3AAFjEpQFkEqAAGkQAAGklkEpQljEpn3AAQn3AAlkkpgAlJJPQE1AAFtj8QltD8k1AAIgBAAIAAAAQmpAAk+nbIgBgDIgDgEIADAEIABADQE+HbGpAAIAAAAIABAAgAAmmXQgtAvAABCQAABDAtAuQAvAvBDAAQBCAAAvgvQAvguAAhDQAAhCgvgvQgvgvhCAAQhDAAgvAvgAwFnYQgrAsAAA9QAAA+ArArQAsAsA9AAQA+AAArgsQAsgrAAg+QAAg9gsgsQgrgrg+AAQg9AAgsArgANkKaQg8gFgegRQgWgLgNgUQgOgVABgXQABgJAFgGQAFgHAHABQAHACADAJIACASQACAPALAMQAKAMAPAIQAVAKAnADQAgACAuAAIBNgBQBdAAAXgBQBBgEAugUQAegNASgVQAVgZgDgbQgBgKgFgHQgGgJgJgCQgHgCgJADIgQAGQgbALgdgCQgegCgZgPQgTgLgHgPQgEgJABgKQABgKAHgGQAJgHAVgBQBDgBA8AbQAYgngQg4QgHgUgMgYIgZgrQgHgKgBgLQgBgMAJgEQAFgCAOAFQAyAUA2gEQAkgDAVgPQAegXAFg1QACgngLgkQgMgmgZgdQgJgLgBgFQgBgEABgFQACgFAEgCQAKgEALANQAgAkAPAwQAOAwgGAxQgGArgWAZQgfAkhAADQgrADgpgMIAYAvQAMAbAFAXQANA8geApQAaAPAFAiQAGAhgRAcQgbAvhKAUQgoAMg0AEQghACg9ABIgqAAQhPAAgsgDgASEHdQAFADARADQAvAGAbgLQACgCgDgDQgDgCgDAAIgXgFIgagFQgSgCgkAAQACAMAMAGg");
	this.shape_2.setTransform(31.6256,0.5567);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AJGkBQAABCgvAvQgvAvhCAAQhDAAgvgvQgugvAAhCQAAhDAugvQAvguBDAAQBCAAAvAuQAvAvAABDgAS/AAQAAGllkEpQljEpn4AAQn2AAllkpQljkpAAmlQAAmkFjkpQFlkpH2AAQH4AAFjEpQFkEpAAGkgAn6lKQAAA9grAsQgsArg9AAQg9AAgsgrQgsgsAAg9QAAg+AsgrQAsgsA9AAQA9AAAsAsQArArAAA+gAsoCSQInM9NopX");
	this.shape_3.setTransform(3.55,-13.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF3333").s().p("AGjCQQgvgvAAhCQAAhCAvgvQAvguBDAAQBCAAAuAuQAwAvAABCQAABCgwAvQguAvhCAAQhDAAgvgvgAqIA/QgrgsAAg8QAAg+ArgrQArgsA+AAQA9AAAsAsQAsArAAA+QAAA8gsAsQgsArg9AAQg+AAgrgrg");
	this.shape_4.setTransform(-7.55,-42.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF6699").s().p("AtbLNQljkpAAmkQAAmkFjkpQFlkpH2AAQH4AAFjEpQFkEpAAGkQAAGklkEpQljEqn4AAQn2AAllkqgAg7JzQEyAAFsj4IAEgEIgEAEQlsD4kyAAIgBAAIAAAAQmoAAk9nYIgEgFIgDgEIADAEIAEAFQE9HYGoAAIAAAAIABAAgAE0lzQgvAwAABCQAABCAvAvQAvAvBDAAQBCAAAugvQAwgvAAhCQAAhCgwgwQguguhCAAQhDAAgvAugAr3mzQgrAsAAA9QAAA+ArArQArArA+AAQA9AAAsgrQAsgrAAg+QAAg9gsgsQgsgsg9AAQg+AAgrAsg");
	this.shape_5.setTransform(3.55,-13.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,1).p("AJFkBQAABCguAvQgvAvhDAAQhCAAgvgvQgvgvAAhCQAAhDAvgvQAvguBCAAQBDAAAvAuQAuAvAABDgAS/AAQAAGllkEpQlkEpn3AAQn3AAlkkpQljkpAAmlQAAmkFjkpQFkkpH3AAQH3AAFkEpQFkEpAAGkgAn6lKQAAA9grAsQgsArg9AAQg+AAgrgrQgsgsAAg9QAAg+AsgrQArgsA+AAQA9AAAsAsQArArAAA+gAsoCRQNenxIxLY");
	this.shape_6.setTransform(4.65,-3.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCFF00").s().p("AGjCQQgvgvAAhCQAAhCAvgvQAvguBCAAQBDAAAvAuQAuAvABBCQgBBCguAvQgvAvhDAAQhCAAgvgvgAqIA/QgrgsAAg8QAAg+ArgrQArgsA+AAQA9AAAsAsQAsArAAA+QAAA8gsAsQgsArg9AAQg+AAgrgrg");
	this.shape_7.setTransform(-6.45,-31.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AtaLOQlkkpAAmlQAAmkFkkpQFjkpH3AAQH4AAFjEpQFkEpAAGkQAAGllkEpQljEpn4AAQn3AAljkpgAJnF4IgEgGQlMmqmzAAIgBAAIAAAAQknAAlXDCIgEADIAAAAIAAAAIgJAEIAJgEIAAAAIAAAAIAEgDQFXjCEnAAIAAAAIABAAQGzAAFMGqIAEAGgAE0lyQgvAuAABDQAABDAvAuQAvAvBCAAQBDAAAvgvQAuguABhDQgBhDguguQgvgvhDAAQhCAAgvAvgAr3mzQgrArAAA+QAAA9ArAsQArAsA+AAQA9AAAsgsQAsgsAAg9QAAg+gsgrQgsgrg9AAQg+AAgrArg");
	this.shape_8.setTransform(4.65,-3.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AtaLNQlkkpAAmkQAAmkFkkpQFjkpH3AAQH4AAFjEpQFkEpAAGkQAAGklkEpQljEqn4AAQn3AAljkqgAJnF3IgDgDQlMmsm0AAIgBAAIAAAAQkpAAlaDFIgEACIgEADIAEgDIAEgCQFajFEpAAIAAAAIABAAQG0AAFMGsIADADgAE0lzQguAwgBBCQABBCAuAvQAvAvBCAAQBDAAAvgvQAugvABhCQgBhCgugwQgvguhDAAQhCAAgvAugAr3mzQgsAsAAA9QAAA+AsArQAsArA9AAQA9AAAsgrQArgrAAg+QAAg9grgsQgsgsg9AAQg9AAgsAsg");
	this.shape_9.setTransform(5.65,7.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF3333").s().p("AGjCQQgugvgBhCQABhCAugvQAvguBCAAQBDAAAvAuQAuAvABBCQgBBCguAvQgvAvhDAAQhCAAgvgvgAqIA/QgsgsAAg8QAAg+AsgrQAsgsA9AAQA9AAAsAsQArArAAA+QAAA8grAsQgsArg9AAQg9AAgsgrg");
	this.shape_10.setTransform(-5.45,-21.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{x:4.65,y:-3.1}}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_6,p:{x:5.65,y:7.65}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.9,-116,299,226.2);


(lib._4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_4wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A29qxMAt7AAAIAAVjMgt7AAAg");
	this.shape.setTransform(-28,15.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("A29KyIAA1jMAt7AAAIAAVjg");
	this.shape_1.setTransform(-28,15.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176,-54.9,296,140);


(lib._3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_3wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A3gtRMAvBAAAIAAajMgvBAAAg");
	this.shape.setTransform(21.5,-3.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("A3gNSIAA6jMAvBAAAIAAajg");
	this.shape_1.setTransform(21.5,-3.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130,-89.9,303,172);


(lib._2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_2wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AzXnpMAmvAAAIAAPTMgmvAAAg");
	this.shape.setTransform(2,8.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AzXHqIAAvTMAmvAAAIAAPTg");
	this.shape_1.setTransform(2,8.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123,-41.9,250,100);


(lib.Невидимаякнопка = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_1wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Axan9MAi1AAAIAAP7Mgi1AAAg");
	this.shape.setTransform(-3.5,2.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AxaH+IAAv7MAi1AAAIAAP7g");
	this.shape_1.setTransform(-3.5,2.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-116,-49.9,225,104);


// stage content:
(lib.ЛР3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"_3wav",startFrame:0,endFrame:1,loop:1,offset:0}];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("_3wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		playSound("_3wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Слой_1
	this.instance = new lib.button();
	this.instance.setTransform(247.35,167.5);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button(), 3);

	this.instance_1 = new lib._4();
	this.instance_1.setTransform(497.5,172.95,0.3163,0.1507);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib._4(), 3);

	this.instance_2 = new lib._3();
	this.instance_2.setTransform(93,345.6,0.3857,0.2053);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib._3(), 3);

	this.instance_3 = new lib._2();
	this.instance_3.setTransform(55.05,174.4,0.341,0.2344);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 2, false, new lib._2(), 3);

	this.instance_4 = new lib.Невидимаякнопка();
	this.instance_4.setTransform(90.45,23.3,0.5464,0.1819,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 2, false, new lib.Невидимаякнопка(), 3);

	this.instance_5 = new lib.Растровоеизображение2();
	this.instance_5.setTransform(-4,-4,0.5075,0.541);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(271,196,283.79999999999995,203.60000000000002);
// library properties:
lib.properties = {
	id: '884167EB5B90BE468D8DE349797B44EC',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/ЛР №3_atlas_1.png?1677837433574", id:"ЛР №3_atlas_1"},
		{src:"sounds/_1wav.mp3?1677837433591", id:"_1wav"},
		{src:"sounds/_2wav.mp3?1677837433591", id:"_2wav"},
		{src:"sounds/_3wav.mp3?1677837433591", id:"_3wav"},
		{src:"sounds/_4wav.mp3?1677837433591", id:"_4wav"},
		{src:"sounds/_70cd38f1302496c.mp3?1677837433591", id:"_70cd38f1302496c"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['884167EB5B90BE468D8DE349797B44EC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;