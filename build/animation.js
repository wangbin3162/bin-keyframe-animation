(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/animation.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar loadImage = __webpack_require__(/*! ./imageloader */ \"./src/imageloader.js\")\nvar Timeline = __webpack_require__(/*! ./timeline */ \"./src/timeline.js\")\n\n//初始化状态\nvar STATE_INITIAL = 0\n//开始状态\nvar STATE_START = 1\n//停止状态\nvar STATE_STOP = 2\n//同步任务\nvar TASK_SYNC = 0\n//异步任务\nvar TASK_ASYNC = 1\n\n/**\n * 简单的函数封装来执行回调函数\n * @param callback\n */\nfunction next (callback) {\n  callback && callback()\n}\n\n/**\n * 帧动画库类\n * @constructor\n */\nfunction Animation () {\n  // 任务队列\n  this.taskQueue = []\n  this.index = 0\n  this.timeline = new Timeline()\n  this.state = STATE_INITIAL\n}\n\n/**\n * 预加载图片，添加同步任务\n * @param imgList 图片数组\n */\nAnimation.prototype.loadImage = function (imgList) {\n  var taskFn = function (next) {\n    loadImage(imgList.slice(), next)\n  }\n  return this._add(taskFn, TASK_SYNC)\n}\n\n/**\n * 添加异步定时任务，通过定时改变图片背景位置实现帧动画\n * @param ele dom对象\n * @param positions 背景位置数组\n * @param imgUrl 图片地址\n */\nAnimation.prototype.changePosition = function (ele, positions, imgUrl) {\n  var len = positions.length\n  var taskFn, type\n  if (len) {\n    var me = this\n    taskFn = function (next, time) {\n      if (imgUrl) {\n        ele.style.backgroundImage = 'url(' + imgUrl + ')'\n      }\n      // 获得当前图片位置索引\n      var index = Math.min(time / me.interval | 0, len - 1)\n      var postion = positions[index].split(' ')\n      // 改变dom对象的背景图片位置\n      ele.style.backgroundPosition = postion[0] + 'px ' + postion[1] + 'px'\n      if (index === len - 1) {\n        next()\n      }\n    }\n    type = TASK_ASYNC\n  } else {\n    taskFn = next\n    type = TASK_SYNC\n  }\n\n  return this._add(taskFn, type)\n}\n\n/**\n * 添加异步定时任务，通过定时改变图片src属性实现帧动画\n * @param ele dom对象\n * @param imgList 图片数组\n */\nAnimation.prototype.changeSrc = function (ele, imgList) {\n  var len = imgList.length\n  var taskFn, type\n  if (len) {\n    var me = this\n    taskFn = function (next, time) {\n      // 获得当前图片位置索引\n      var index = Math.min(time / me.interval | 0, len - 1)\n      // 改变img对象的图片地址\n      ele.src = imgList[index]\n      if (index === len - 1) {\n        next()\n      }\n    }\n    type = TASK_ASYNC\n  } else {\n    taskFn = next\n    type = TASK_SYNC\n  }\n  return this._add(taskFn, type)\n}\n\n/**\n * 高级用法，添加一个异步定时的任务\n * 该任务自定义每帧执行的任务函数\n * @param taskFn\n */\nAnimation.prototype.enterFrame = function (taskFn) {\n  return this._add(taskFn, TASK_ASYNC)\n}\n\n/**\n * 添加一个同步任务，可在上一个任务完成执行回调函数\n * @param callback 回调函数\n */\nAnimation.prototype.then = function (callback) {\n  var taskFn = function (next) {\n    callback()\n    next()\n  }\n  return this._add(taskFn, TASK_SYNC)\n}\n\n/**\n * 开始执行任务\n * @param interval 异步定时任务的间隔\n */\nAnimation.prototype.start = function (interval) {\n  if (this.state === STATE_START) {\n    return this\n  }\n  if (!this.taskQueue.length) {\n    return this\n  }\n  this.state = STATE_START\n  this.interval = interval\n  this._runTask()\n  return this\n}\n\n/**\n * 添加一个异步同步任务，该任务就是回退到上一个任务中，实现重复上一个任务效果，\n * @param times 重复次数\n */\nAnimation.prototype.repeat = function (times) {\n  var me = this\n  var taskFn = function () {\n    if (typeof times === 'undefined') {\n      // 不传值就是无限循环\n      me.index--\n      me._runTask()\n      return\n    }\n    if (times) {\n      times--\n      //回退\n      me.index--\n      me._runTask()\n    } else {\n      // 达到重复次数跳转到喜爱个任务\n      var task = me.taskQueue[me.index]\n      me._next(task)\n    }\n  }\n  return this._add(taskFn, TASK_SYNC)\n}\n/**\n * 添加一个异步同步任务，相当于repeat（），无限循环动画\n */\nAnimation.prototype.repeatForever = function () {\n  return this.repeat()\n}\n\n/**\n * 设置当前任务执行结束后到下一个任务开始前的等待时间\n * @param time 等待时长\n */\nAnimation.prototype.wait = function (time) {\n  if (this.taskQueue && this.taskQueue.length > 0) {\n    this.taskQueue[this.taskQueue.length - 1].wait = time\n  }\n  return this\n}\n\n/**\n * 暂停当前的异步定时任务\n */\nAnimation.prototype.pause = function () {\n  if (this.state === STATE_START) {\n    this.state = STATE_STOP\n    this.timeline.stop()\n    return this\n  }\n  return this\n}\n\n/**\n * 执行暂停的异步任务\n */\nAnimation.prototype.restart = function () {\n  if (this.state === STATE_STOP) {\n    this.state = STATE_START\n    this.timeline.restart()\n    return this\n  }\n  return this\n}\n\n/**\n * 释放资源\n */\nAnimation.prototype.dispose = function () {\n  if (this.state !== STATE_INITIAL) {\n    this.state = STATE_INITIAL\n    this.taskQueue = null\n    this.timeline.stop()\n    this.timeline = null\n    return this\n  }\n  return this\n}\n\n/**\n * 添加一个任务到任务队列中\n * @param taskFn 任务方法\n * @param type 任务类型\n * @returns {Animation}\n * @private\n */\nAnimation.prototype._add = function (taskFn, type) {\n  this.taskQueue.push({\n    taskFn: taskFn,\n    type: type\n  })\n  return this\n}\n\n/**\n * 执行任务\n * @private\n */\nAnimation.prototype._runTask = function () {\n  if (!this.taskQueue || this.state !== STATE_START) {\n    return\n  }\n  // 如果任务链任务执行完则释放资源\n  if (this.index === this.taskQueue.length) {\n    this.dispose()\n    return\n  }\n  // 获得任务链上的一个任务\n  var task = this.taskQueue[this.index]\n  if (task.type === TASK_SYNC) {\n    this._syncTask(task)\n  } else {\n    this._asyncTask(task)\n  }\n}\n\n/**\n * 同步任务\n * @param task 执行任务的函数\n * @private\n */\nAnimation.prototype._syncTask = function (task) {\n  var me = this\n  var next = function () {\n    //切换到下一个任务\n    me._next(task)\n  }\n  var taskFn = task.taskFn\n  taskFn(next)\n}\n\n/**\n * 异步任务\n * @param task 执行异步的函数\n * @private\n */\nAnimation.prototype._asyncTask = function (task) {\n  var me = this\n  // 定义每一帧执行的回调函数\n  var enterframe = function (time) {\n    var taskFn = task.taskFn\n    var next = function () {\n      //停止执行当前任务\n      me.timeline.stop()\n      //执行下一个任务\n      me._next(task)\n    }\n    taskFn(next, time)\n  }\n\n  this.timeline.onenterframe = enterframe\n  this.timeline.start(this.interval)\n}\n\n/**\n * 切换到下一个任务，如果当前任务需要等待，则延时执行\n * @param task 当前任务\n * @private\n */\nAnimation.prototype._next = function (task) {\n  this.index++\n  var me = this\n  task.wait ? setTimeout(function () {\n    me._runTask()\n  }, task.wait) : this._runTask()\n}\n\nmodule.exports = function () {\n  return new Animation()\n}\n\n\n//# sourceURL=webpack://animation/./src/animation.js?");

/***/ }),

/***/ "./src/imageloader.js":
/*!****************************!*\
  !*** ./src/imageloader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __id = 0\n\n/**\n * 动态创建id\n * @returns {number}\n */\nfunction getId () {\n  return ++__id\n}\n\n/**\n * 预加载图片函数\n * @param images 加载的图片数组或对象\n * @param callback 全部图片加载完毕后调用的回调函数\n * @param timeout 加载超时的时长\n */\nfunction loadImage (images, callback, timeout) {\n  //加载完成图片的计数器\n  var count = 0\n  //全部图片成功加载完图片的标志位\n  var success = true\n  //超时timer的id\n  var timeoutId = 0\n  //是否加载超时的标志位\n  var isTimeout = false\n  //对图片数组（或对象）进行遍历\n  for (var key in images) {\n    //过滤掉prototype的属性\n    if (!images.hasOwnProperty(key))\n      continue\n    //获得每个图片元素\n    //期望格式是个object： {src:xxx}\n    var item = images[key]\n\n    // 如果item是个字符串，则构造object\n    if (typeof item === 'string') {\n      item = images[key] = {\n        src: item\n      }\n    }\n\n    //如果格式不满足期望，则丢弃此条数据进行下一次遍历\n    if (!item || !item.src)\n      continue\n\n    //计数+1\n    count++\n    //设置图片元素的id\n    item.id = '__img_' + key + getId()\n    //设置图片元素的img，是一个Image对象\n    item.img = window[item.id] = new Image()\n\n    doLoad(item)\n  }\n\n  //遍历完成如果计数为0，则直接调用\n  if (!count) {\n    callback(success)\n  }\n  //如果设置了加载时长，则设置超时函数计时器\n  else if (timeout) {\n    timeoutId = setTimeout(onTimeout, timeout)\n  }\n\n  /**\n   * 真正进行图片加载的函数\n   * @param item 图片元素对象\n   */\n  function doLoad (item) {\n    item.status = 'loading'\n\n    var img = item.img\n    //定义图片加载成功的回调函数\n    img.onload = function () {\n      //如果每张图片都成功才算成功\n      success = success && true\n      item.status = 'loaded'\n      done()\n    }\n    img.onerror = function () {\n      //若有一张图片加载失败，则为失败\n      success = false\n      item.status = 'error'\n      done()\n    }\n    //发起一个http(s)请求加载图片\n    img.src = item.src\n\n    /**\n     * 每张图片加载完成的回调函数\n     */\n    function done () {\n      //事件清理\n      img.onload = img.onerror = null\n\n      try {\n        //删除window上注册的属性\n        delete window[item.id]\n      } catch (e) {\n\n      }\n      //每张图片加载完成，计数器减一，当所有图片加载完毕且没有超时的情况下，\n      //清除超时计时器，且执行回调函数\n      if (!--count && !isTimeout) {\n        clearTimeout(timeoutId)\n        callback(success)\n      }\n    }\n  }\n\n  /**\n   * 超时函数\n   */\n  function onTimeout () {\n    isTimeout = true\n    callback(false)\n  }\n}\n\nmodule.exports = loadImage\n\n\n//# sourceURL=webpack://animation/./src/imageloader.js?");

/***/ }),

/***/ "./src/timeline.js":
/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar DEFAULT_INTERVAL = 1000 / 60\n\nvar STATE_INITIAL = 0 // 初始化状态\nvar STATE_START = 1 // 开始状态\nvar STATE_STOP = 2 // 停止状态\n\n/**\n * raf\n */\nvar requestAnimationFrame = (function () {\n  return window.requestAnimationFrame ||\n    window.webkitRequestAnimationFrame ||\n    window.mozRequestAnimationFrame ||\n    window.oRequestAnimationFrame ||\n    //所有都不支持，用setTimeout兼容\n    function (callback) {\n      return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL)) // make interval as precise as possible.\n    }\n})()\n\n/**\n * cancel raf\n */\nvar cancelAnimationFrame = (function () {\n  return window.cancelAnimationFrame ||\n    window.webkitCancelAnimationFrame ||\n    window.mozCancelAnimationFrame ||\n    window.oCancelAnimationFrame ||\n    function (id) {\n      window.clearTimeout(id)\n    }\n})()\n\n/**\n * Timline时间轴类\n * @constructor\n */\nfunction Timeline () {\n  this.animationHandler = 0\n  this.state = STATE_INITIAL\n}\n\n/**\n * 时间轴上每一次回调执行的函数\n * @param time 从动画开始到当前执行的时间\n */\nTimeline.prototype.onenterframe = function (time) {\n}\n\n/**\n * 动画开始\n * @param interval 每次回调的间隔时间\n */\nTimeline.prototype.start = function (interval) {\n  if (this.state === STATE_START) {\n    return\n  }\n  this.state = STATE_START\n  this.interval = interval || DEFAULT_INTERVAL\n  startTimeline(this, +new Date())\n}\n\n/**\n * 动画停止\n */\nTimeline.prototype.stop = function () {\n  if (this.state !== STATE_START) {\n    return\n  }\n  this.state = STATE_STOP\n\n  // 如果动画开始过，则记录动画开始到现在的持续时间\n  if (this.startTime) {\n    this.dur = +new Date() - this.startTime\n  }\n  cancelAnimationFrame(this.animationHandler)\n}\n\n/**\n * 重新开始动画\n */\nTimeline.prototype.restart = function () {\n  if (this.state === STATE_STOP) {\n    return\n  }\n  if (!this.dur || !this.interval) {\n    return\n  }\n  // 无缝连接停止动画的状态\n  startTimeline(this, +new Date() - this.dur)\n}\n\n/**\n * 时间轴动画启动函数\n * @param timeline 时间轴实例\n * @param startTime 动画开始时间戳\n */\nfunction startTimeline (timeline, startTime) {\n  timeline.startTime = startTime\n  nexTick.interval = timeline.interval\n\n  // 记录\n  var lastTick = +new Date()\n\n  /**\n   * 定义每一帧执行的函数\n   */\n  function nexTick () {\n    var now = +new Date()\n    timeline.animationHandler = requestAnimationFrame(nexTick)\n    // 如果当前时间与上一次回调的时间戳大于设置的时间间隔，\n    // 表示这一次可以执行回调函数\n    if (now - lastTick >= timeline.interval) {\n      timeline.onenterframe(now - startTime)\n      lastTick = now\n    }\n  }\n}\n\n\nmodule.exports = Timeline\n\n\n//# sourceURL=webpack://animation/./src/timeline.js?");

/***/ })

/******/ });
});