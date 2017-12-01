import foreach from '../helpers/foreach';

/**
 * Event object that will be passed to callbacks
 * @param instance {Macy} - Macy instance
 * @param data {Object}
 * @returns {Event}
 * @constructor
 */
const Event = function (instance, data = {}) {
  this.instance = instance;
  this.data = data;

  return this;
};

/**
 * Event manager
 * @param instance {Function/boolean}
 * @constructor
 */
const EventManager = function (instance = false) {
  this.events = {};
  this.once = {};
  this.instance = instance;
};

/**
 * Event listener for macy events
 * @param key {String/boolean} - Event name to listen to
 * @param func {Function/boolean} - Function to be called when event happens
 */
EventManager.prototype.on = function (key = false, func = false) {
  if (!key || !func) {
    return false;
  }

  if (!Array.isArray(this.events[key])) {
    this.events[key] = [];
  }

  return this.events[key].push(func);
};

/**
 * Event listener for macy events
 * @param key {String/boolean} - Event name to listen to
 * @param func {Function/boolean} - Function to be called when event happens
 */
EventManager.prototype.off = function (key = false, func = false) {
  if (!key || !func) {
    return false;
  }

  if (!Array.isArray(this.events[key])) {
    this.events[key] = [];
  }
  
  var listeners = this.events[key];
  if (listeners !== undefined) {
    var foundAt = -1;
    for (var i = 0, len = listeners.length; i < len && foundAt === -1; i++) {
      if (listeners[i] === func) {
        foundAt = i;
      }
    }

    if (foundAt >= 0) {
      listeners.splice(foundAt, 1);
    }
  }

};

/**
 * Event listener for macy events
 * @param key {String/boolean} - Event name to listen to
 * @param func {Function/boolean} - Function to be called when event happens
 */
EventManager.prototype.once = function (key = false, func = false) {
  if (!key || !func) {
    return false;
  }

  if (!Array.isArray(this.once[key])) {
    this.once[key] = [];
  }

  return this.once[key].push(func);
};


/**
 * Emit an event to macy.
 * @param key {String/boolean} - Event name to listen to
 * @param data {Object} - Extra data to be passed to the event object that is passed to the event listener.
 */
EventManager.prototype.emit = function (key = false, data = {}) {
  if (!key || !Array.isArray(this.events[key])) {
    return false;
  }

  const evt = new Event(this.instance, data);
  foreach(this.events[key], (fn) => fn(evt));
  foreach(this.once[key], (fn) => fn(evt));
  this.once[key] = [];
};

export default EventManager;
