/**
 *
 * @author  晴云
 * @create 2020-09-21 9:45
 * @note 事件模型
 **/
class Event {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    if (Array.isArray(event)) {
      for (let ev of event) {
        this.on(ev, fn)
      }
    } else {
      (this.events[event] || (this.events[event] = [])).push(fn);
    }
    return this
  }

  off(event, fn) {
    if (!arguments) {
      this.events = Object.create(null)
      return this
    }
    if (Array.isArray(event), fn) {
      for (let ev of event) {
        this.off(ev, fn)
      }
      return this
    }
    const cbs = this.events[event];
    if (!cbs) return this;
    if (!fn) {
      this.events[event] = null;
      return this
    }
    let i = cbs.length;
    while (i--) {
      let cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return this;
  }

  once(event, fn) {
    const that = this;

    function on() {
      that.off(event, fn);
      fn.call(this, arguments)
    }

    on.fn = fn;
    this.on(event, fn);
    return this;
  }

  emit(event, ...args) {
    let cbs = this.events[event]
    if (cbs) {
      for (let cb of cbs) {
        cb.apply(this, args)
      }
    }
    return this;
  }
}
