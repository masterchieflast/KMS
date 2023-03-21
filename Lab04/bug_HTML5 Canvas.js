(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"bug_HTML5 Canvas_atlas_1", frames: [[819,842,92,38],[1002,593,164,273],[519,593,148,256],[0,0,517,439],[669,593,148,256],[0,441,517,439],[819,593,130,247],[0,882,499,424],[1002,868,130,247],[501,882,499,424],[519,374,272,217],[519,0,437,372],[793,374,272,217],[958,0,437,372]]}
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



(lib.CachedBmp_14 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["bug_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.paw = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("ADvAsQAQCBgyBPQgzBPjSB9QjUB+gHitQgIitBHh3QBHh3ATj6QAUj7DQgFQDQgGgtDXQguDXAQCAg");
	this.shape.setTransform(83.8847,50.9051);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AkTGZQgIitBHh3QBHh3ATj6QAUj7DQgFQDQgGgtDXQguDXAQCAQAQCBgyBPQgzBPjSB9QhZA1g1AAQhJAAgEhkg");
	this.shape_1.setTransform(83.8847,50.9051);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(4,1,1).p("AGyhLQgvBVi2AvQi3AwhhCeQhiCfiVh6QiWh6AhiaQAgiZEHhFQEGhFAog/QAng/COB1QCOB0gvBVg");
	this.shape_2.setTransform(44.6188,111.4011);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AlCEsQiWh6AhiaQAgiZEHhFQEGhFAog/QAng/COB1QCOB0gvBVQgvBVi2AvQi3AwhhCeQg3BahIAAQg3AAhBg1g");
	this.shape_3.setTransform(44.6188,111.4011);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:0,x:83.8847,y:50.9051,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:0,x:83.8847,y:50.9051,scaleX:1,scaleY:1}}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-4.7062,x:80.3784,y:49.601,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-4.7062,x:80.3784,y:49.601,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-8.4516,x:77.505,y:48.7733,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-8.4516,x:77.505,y:48.7733,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-12.3923,x:74.4531,y:48.1166,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-12.3923,x:74.4531,y:48.1166,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-16.1241,x:71.5692,y:47.6555,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-16.1241,x:71.5692,y:47.6555,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-12.1446,x:74.7635,y:48.117,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-12.1446,x:74.7635,y:48.117,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-8.1648,x:77.9089,y:48.8235,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-8.1648,x:77.9089,y:48.8235,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:-3.4372,x:81.5817,y:49.9321,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:-3.4372,x:81.5817,y:49.9321,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:0.529,x:84.5571,y:51.1748,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:0.529,x:84.5571,y:51.1748,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{rotation:4.4697,x:87.4067,y:52.5835,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:4.4697,x:87.4067,y:52.5835,scaleX:0.9999,scaleY:0.9999}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-7.5,121.9,156.2);


(lib.bug = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-24.2,-85.6,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(-42.45,-67.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.4,-85.6,82,154.2);


(lib.Пуск = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-12.8,-23.8,0.1508,0.1508);

	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(-39.1,-31.85,0.1508,0.1508);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(-12.8,-23.8,0.1508,0.1508);

	this.instance_3 = new lib.CachedBmp_11();
	this.instance_3.setTransform(-39.1,-31.85,0.1508,0.1508);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.1,-31.8,78,66.2);


(lib.Пауза = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-9.95,-26.7,0.1562,0.1562);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-38.85,-33.1,0.1562,0.1562);

	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-9.95,-26.7,0.1562,0.1562);

	this.instance_3 = new lib.CachedBmp_7();
	this.instance_3.setTransform(-38.85,-33.1,0.1562,0.1562);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.8,-33.1,77.9,66.30000000000001);


(lib.Назад = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-27.5,-25.1,0.1781,0.1781);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(-38.9,-33.1,0.1781,0.1781);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-31.05,-24.8,0.1781,0.1781);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(-42.45,-32.8,0.1781,0.1781);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.4,-33.1,81.3,66.6);


(lib.bugfull = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.bug("synched",0);
	this.instance.setTransform(0.75,1.55,1,1,0,0,0,-1.4,-8.5);

	this.instance_1 = new lib.paw("synched",3);
	this.instance_1.setTransform(58.4,20.6,0.2691,0.5013,0,149.9981,-30.0052,59,69.8);

	this.instance_2 = new lib.paw("synched",3);
	this.instance_2.setTransform(-50.25,18.2,0.2691,0.5013,-149.9981,0,0,59,69.8);

	this.instance_3 = new lib.paw("synched",6);
	this.instance_3.setTransform(41.25,77.7,0.2691,0.5014,0,180,0,58.9,70.1);

	this.instance_4 = new lib.paw("synched",6);
	this.instance_4.setTransform(-39.8,77.7,0.2691,0.5014,180,0,0,58.9,70.1);

	this.instance_5 = new lib.paw("synched",0);
	this.instance_5.setTransform(51.4,-56.5,0.2691,0.3827,0,0,0,58.9,70.5);

	this.instance_6 = new lib.paw("synched",0);
	this.instance_6.setTransform(-47.3,-56.5,0.2691,0.3827,0,0,180,58.9,70.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.9,-86.6,168,203.2);


// stage content:
(lib.bug_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,39];
	this.streamSoundSymbolsList[0] = [{id:"nasekomyiezvonkiirezkiiblizkii",startFrame:0,endFrame:117,loop:2,offset:0}];
	this.streamSoundSymbolsList[39] = [{id:"estprobitiewav",startFrame:39,endFrame:120,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("nasekomyiezvonkiirezkiiblizkii",1);
		this.InsertIntoSoundStreamData(soundInstance,0,117,2);
		this.stop();
		this.playbttn.addEventListener("click",f1.bind(this));
		function f1(args){this.play();}
		
		this.stopbttn.addEventListener("click",f2.bind(this));
		function f2(args){this.stop();}
		
		this.backbttn.addEventListener("click",f3.bind(this));
		function f3(args){this.gotoAndStop(0);}
		/* stop();
		
		playbttn.addEventListener(MouseEvent.CLICK,f1);
		
		function f1(event:MouseEvent):void
		{
			play();
		}
		
		stopbttn.addEventListener(MouseEvent.CLICK,f2);
		
		function f2(event:MouseEvent):void
		{
			stop();
		}
		
		backbttn.addEventListener(MouseEvent.CLICK,f3);
		
		function f3(event:MouseEvent):void
		{
			gotoAndStop(0);
		}*/
	}
	this.frame_39 = function() {
		var soundInstance = playSound("estprobitiewav",0);
		this.InsertIntoSoundStreamData(soundInstance,39,120,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(39).call(this.frame_39).wait(81));

	// жук2
	this.instance = new lib.bugfull();
	this.instance.setTransform(30.5,21.3,0.5839,0.7991,120,0,0,4,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:4.1,regY:15.6,scaleY:0.799,rotation:120.0013,guide:{path:[30.6,21.4,68,43.7,140.3,97.7,160.8,113,204.3,145.8,243.8,175.4,272.7,196.1,354,254.6,417.4,290.6,497.7,336.4,563.9,355.3,607.3,367.6,638.9,382.4,664.1,394.1,689.9,411.7,705.1,422,736.8,445,767.9,466.6,799.9,484.1,815,492.4,879.4,539.8,911.4,563.4,940.9,585.2]}},59).to({regY:15.5,scaleX:0.5838,rotation:255.0017,guide:{path:[940.9,585.3,940.9,585.3,940.9,585.3,943.1,585.3,973.9,569.3,1013.5,548.8,1053.3,523.8,1086.3,503.1,1115.5,481.8]}},10).to({regX:4.2,scaleY:0.7989,rotation:408.0021,guide:{path:[1115.6,481.8,1187.2,429.7,1236.8,374.3]}},10).to({regX:4.1,regY:15.7,scaleX:0.5839,scaleY:0.7991,rotation:435.0018,guide:{path:[1236.8,374.3,1243.8,366.3,1250.5,358.4,1297.6,301.5,1322.5,274.9,1344.7,251.2,1360,240.5,1366.2,236.2,1374.1,231.8,1378.8,229.2,1389.5,223.6,1411.9,211.4,1437.3,192.9,1487.7,156.1,1523.1,136,1556.1,117.3,1587.7,106.8,1610.9,99.1,1653,90.1,1715.7,76.7,1740.7,70.6,1740.7,70.6,1740.7,70.6]}},40).wait(1));

	// жук
	this.instance_1 = new lib.bugfull();
	this.instance_1.setTransform(48.8,658.75,1,1,83.2137,0,0,4.1,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:4.2,guide:{path:[48.9,658.8,73.4,657,125.7,654.3,179.2,651.6,208.5,649.4,311.7,641.8,401.5,622.3,448.8,612,501.3,608.7,536.4,606.5,590.9,606.8,652,607.3,672.4,606.6,715.6,604.8,747.7,597.5,1207.5,597.5,1667.2,597.5,1713.1,588.8,1790.4,574.7,1817.9,569.6,1842,565.1]}},119,cjs.Ease.none).wait(1));

	// button
	this.playbttn = new lib.Пуск();
	this.playbttn.name = "playbttn";
	this.playbttn.setTransform(1213.65,929.8,3.3166,2.7539);
	new cjs.ButtonHelper(this.playbttn, 0, 1, 1);

	this.stopbttn = new lib.Пауза();
	this.stopbttn.name = "stopbttn";
	this.stopbttn.setTransform(931.5,932.95,3.2003,2.2009);
	new cjs.ButtonHelper(this.stopbttn, 0, 1, 1);

	this.backbttn = new lib.Назад();
	this.backbttn.name = "backbttn";
	this.backbttn.setTransform(678,939.55,2.8074,2.571,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.backbttn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.backbttn},{t:this.stopbttn},{t:this.playbttn}]}).wait(120));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(903,492.9,1045.5,532.4);
// library properties:
lib.properties = {
	id: '7C19A999AD5B244AB101364C8C6FBA58',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/bug_HTML5 Canvas_atlas_1.png?1677856473214", id:"bug_HTML5 Canvas_atlas_1"},
		{src:"sounds/estprobitiewav.mp3?1677856473235", id:"estprobitiewav"},
		{src:"sounds/nasekomyiezvonkiirezkiiblizkii.mp3?1677856473235", id:"nasekomyiezvonkiirezkiiblizkii"}
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
an.compositions['7C19A999AD5B244AB101364C8C6FBA58'] = {
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