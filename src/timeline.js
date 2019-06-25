'use strict'

var DEFAULT_INTERVAL = 1000 / 60

var STATE_INITIAL = 0 // 初始化状态
var STATE_START = 1 // 开始状态
var STATE_STOP = 2 // 停止状态

/**
 * raf
 */
var requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    //所有都不支持，用setTimeout兼容
    function (callback) {
      return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL)) // make interval as precise as possible.
    }
})()

/**
 * cancel raf
 */
var cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id)
    }
})()

/**
 * Timline时间轴类
 * @constructor
 */
function Timeline () {
  this.animationHandler = 0
  this.state = STATE_INITIAL
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {
}

/**
 * 动画开始
 * @param interval 每次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
  if (this.state === STATE_START) {
    return
  }
  this.state = STATE_START
  this.interval = interval || DEFAULT_INTERVAL
  startTimeline(this, +new Date())
}

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {
  if (this.state !== STATE_START) {
    return
  }
  this.state = STATE_STOP

  // 如果动画开始过，则记录动画开始到现在的持续时间
  if (this.startTime) {
    this.dur = +new Date() - this.startTime
  }
  cancelAnimationFrame(this.animationHandler)
}

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function () {
  if (this.state === STATE_STOP) {
    return
  }
  if (!this.dur || !this.interval) {
    return
  }
  // 无缝连接停止动画的状态
  startTimeline(this, +new Date() - this.dur)
}

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴实例
 * @param startTime 动画开始时间戳
 */
function startTimeline (timeline, startTime) {
  timeline.startTime = startTime
  nexTick.interval = timeline.interval

  // 记录
  var lastTick = +new Date()

  /**
   * 定义每一帧执行的函数
   */
  function nexTick () {
    var now = +new Date()
    timeline.animationHandler = requestAnimationFrame(nexTick)
    // 如果当前时间与上一次回调的时间戳大于设置的时间间隔，
    // 表示这一次可以执行回调函数
    if (now - lastTick >= timeline.interval) {
      timeline.onenterframe(now - startTime)
      lastTick = now
    }
  }
}


module.exports = Timeline
