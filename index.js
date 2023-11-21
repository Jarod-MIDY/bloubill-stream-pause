(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // (disabled):node_modules/ws/browser.js
  var require_browser = __commonJS({
    "(disabled):node_modules/ws/browser.js"() {
    }
  });

  // (disabled):node_modules/node-fetch/browser.js
  var require_browser2 = __commonJS({
    "(disabled):node_modules/node-fetch/browser.js"() {
    }
  });

  // node_modules/tmi.js/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/tmi.js/lib/utils.js"(exports, module) {
      var actionMessageRegex = /^\u0001ACTION ([^\u0001]+)\u0001$/;
      var justinFanRegex = /^(justinfan)(\d+$)/;
      var unescapeIRCRegex = /\\([sn:r\\])/g;
      var escapeIRCRegex = /([ \n;\r\\])/g;
      var ircEscapedChars = { s: " ", n: "", ":": ";", r: "" };
      var ircUnescapedChars = { " ": "s", "\n": "n", ";": ":", "\r": "r" };
      var urlRegex = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i");
      var regexEmoteRegex = /[|\\^$*+?:#]/;
      var _ = module.exports = {
        // Return the second value if the first value is undefined..
        get: (a, b) => typeof a === "undefined" ? b : a,
        // Indirectly use hasOwnProperty
        hasOwn: (obj, key) => ({}).hasOwnProperty.call(obj, key),
        // Race a promise against a delay..
        promiseDelay: (time) => new Promise((resolve) => setTimeout(resolve, time)),
        // Value is a finite number..
        isFinite: (int) => isFinite(int) && !isNaN(parseFloat(int)),
        // Parse string to number. Returns NaN if string can't be parsed to number..
        toNumber(num, precision) {
          if (num === null) {
            return 0;
          }
          const factor = Math.pow(10, _.isFinite(precision) ? precision : 0);
          return Math.round(num * factor) / factor;
        },
        // Value is an integer..
        isInteger: (int) => !isNaN(_.toNumber(int, 0)),
        // Value is a regex..
        isRegex: (str) => regexEmoteRegex.test(str),
        // Value is a valid url..
        isURL: (str) => urlRegex.test(str),
        // Return a random justinfan username..
        justinfan: () => `justinfan${Math.floor(Math.random() * 8e4 + 1e3)}`,
        // Username is a justinfan username..
        isJustinfan: (username) => justinFanRegex.test(username),
        // Return a valid channel name..
        channel(str) {
          const channel = (str ? str : "").toLowerCase();
          return channel[0] === "#" ? channel : "#" + channel;
        },
        // Return a valid username..
        username(str) {
          const username = (str ? str : "").toLowerCase();
          return username[0] === "#" ? username.slice(1) : username;
        },
        // Return a valid token..
        token: (str) => str ? str.toLowerCase().replace("oauth:", "") : "",
        // Return a valid password..
        password(str) {
          const token = _.token(str);
          return token ? `oauth:${token}` : "";
        },
        actionMessage: (msg) => msg.match(actionMessageRegex),
        // Replace all occurences of a string using an object..
        replaceAll(str, obj) {
          if (str === null || typeof str === "undefined") {
            return null;
          }
          for (const x in obj) {
            str = str.replace(new RegExp(x, "g"), obj[x]);
          }
          return str;
        },
        unescapeHtml: (safe) => safe.replace(/\\&amp\\;/g, "&").replace(/\\&lt\\;/g, "<").replace(/\\&gt\\;/g, ">").replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'"),
        // Escaping values:
        // http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
        unescapeIRC(msg) {
          if (!msg || typeof msg !== "string" || !msg.includes("\\")) {
            return msg;
          }
          return msg.replace(
            unescapeIRCRegex,
            (m, p) => p in ircEscapedChars ? ircEscapedChars[p] : p
          );
        },
        escapeIRC(msg) {
          if (!msg || typeof msg !== "string") {
            return msg;
          }
          return msg.replace(
            escapeIRCRegex,
            (m, p) => p in ircUnescapedChars ? `\\${ircUnescapedChars[p]}` : p
          );
        },
        // Add word to a string..
        addWord: (line, word) => line.length ? line + " " + word : line + word,
        // Split a line but try not to cut a word in half..
        splitLine(input, length) {
          let lastSpace = input.substring(0, length).lastIndexOf(" ");
          if (lastSpace === -1) {
            lastSpace = length - 1;
          }
          return [input.substring(0, lastSpace), input.substring(lastSpace + 1)];
        },
        // Extract a number from a string..
        extractNumber(str) {
          const parts = str.split(" ");
          for (let i = 0; i < parts.length; i++) {
            if (_.isInteger(parts[i])) {
              return ~~parts[i];
            }
          }
          return 0;
        },
        // Format the date..
        formatDate(date) {
          let hours = date.getHours();
          let mins = date.getMinutes();
          hours = (hours < 10 ? "0" : "") + hours;
          mins = (mins < 10 ? "0" : "") + mins;
          return `${hours}:${mins}`;
        },
        // Inherit the prototype methods from one constructor into another..
        inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          const TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        },
        // Return whether inside a Node application or not..
        isNode() {
          try {
            return typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";
          } catch (e) {
          }
          return false;
        }
      };
    }
  });

  // node_modules/tmi.js/lib/api.js
  var require_api = __commonJS({
    "node_modules/tmi.js/lib/api.js"(exports, module) {
      var fetch = require_browser2();
      var _ = require_utils();
      module.exports = function api(options, callback) {
        let url = options.url !== void 0 ? options.url : options.uri;
        if (!_.isURL(url)) {
          url = `https://api.twitch.tv/kraken${url[0] === "/" ? url : `/${url}`}`;
        }
        if (_.isNode()) {
          const opts = Object.assign({ method: "GET", json: true }, options);
          if (opts.qs) {
            const qs = new URLSearchParams(opts.qs);
            url += `?${qs}`;
          }
          const fetchOptions = {};
          if ("fetchAgent" in this.opts.connection) {
            fetchOptions.agent = this.opts.connection.fetchAgent;
          }
          const fetchPromise = fetch(url, {
            ...fetchOptions,
            method: opts.method,
            headers: opts.headers,
            body: opts.body
          });
          let response = {};
          fetchPromise.then((res) => {
            response = { statusCode: res.status, headers: res.headers };
            return opts.json ? res.json() : res.text();
          }).then(
            (data) => callback(null, response, data),
            (err) => callback(err, response, null)
          );
        } else {
          const opts = Object.assign({ method: "GET", headers: {} }, options, { url });
          const xhr = new XMLHttpRequest();
          xhr.open(opts.method, opts.url, true);
          for (const name in opts.headers) {
            xhr.setRequestHeader(name, opts.headers[name]);
          }
          xhr.responseType = "json";
          xhr.addEventListener("load", (_ev) => {
            if (xhr.readyState === 4) {
              if (xhr.status !== 200) {
                callback(xhr.status, null, null);
              } else {
                callback(null, null, xhr.response);
              }
            }
          });
          xhr.send();
        }
      };
    }
  });

  // node_modules/tmi.js/lib/commands.js
  var require_commands = __commonJS({
    "node_modules/tmi.js/lib/commands.js"(exports, module) {
      var _ = require_utils();
      function followersonly(channel, minutes) {
        channel = _.channel(channel);
        minutes = _.get(minutes, 30);
        return this._sendCommand(null, channel, `/followers ${minutes}`, (resolve, reject) => {
          this.once("_promiseFollowers", (err) => {
            if (!err) {
              resolve([channel, ~~minutes]);
            } else {
              reject(err);
            }
          });
        });
      }
      function followersonlyoff(channel) {
        channel = _.channel(channel);
        return this._sendCommand(null, channel, "/followersoff", (resolve, reject) => {
          this.once("_promiseFollowersoff", (err) => {
            if (!err) {
              resolve([channel]);
            } else {
              reject(err);
            }
          });
        });
      }
      function part(channel) {
        channel = _.channel(channel);
        return this._sendCommand(null, null, `PART ${channel}`, (resolve, reject) => {
          this.once("_promisePart", (err) => {
            if (!err) {
              resolve([channel]);
            } else {
              reject(err);
            }
          });
        });
      }
      function r9kbeta(channel) {
        channel = _.channel(channel);
        return this._sendCommand(null, channel, "/r9kbeta", (resolve, reject) => {
          this.once("_promiseR9kbeta", (err) => {
            if (!err) {
              resolve([channel]);
            } else {
              reject(err);
            }
          });
        });
      }
      function r9kbetaoff(channel) {
        channel = _.channel(channel);
        return this._sendCommand(null, channel, "/r9kbetaoff", (resolve, reject) => {
          this.once("_promiseR9kbetaoff", (err) => {
            if (!err) {
              resolve([channel]);
            } else {
              reject(err);
            }
          });
        });
      }
      function slow(channel, seconds) {
        channel = _.channel(channel);
        seconds = _.get(seconds, 300);
        return this._sendCommand(null, channel, `/slow ${seconds}`, (resolve, reject) => {
          this.once("_promiseSlow", (err) => {
            if (!err) {
              resolve([channel, ~~seconds]);
            } else {
              reject(err);
            }
          });
        });
      }
      function slowoff(channel) {
        channel = _.channel(channel);
        return this._sendCommand(null, channel, "/slowoff", (resolve, reject) => {
          this.once("_promiseSlowoff", (err) => {
            if (!err) {
              resolve([channel]);
            } else {
              reject(err);
            }
          });
        });
      }
      module.exports = {
        // Send action message (/me <message>) on a channel..
        action(channel, message) {
          channel = _.channel(channel);
          message = `ACTION ${message}`;
          return this._sendMessage(this._getPromiseDelay(), channel, message, (resolve, _reject) => {
            resolve([channel, message]);
          });
        },
        // Ban username on channel..
        ban(channel, username, reason) {
          channel = _.channel(channel);
          username = _.username(username);
          reason = _.get(reason, "");
          return this._sendCommand(null, channel, `/ban ${username} ${reason}`, (resolve, reject) => {
            this.once("_promiseBan", (err) => {
              if (!err) {
                resolve([channel, username, reason]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Clear all messages on a channel..
        clear(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/clear", (resolve, reject) => {
            this.once("_promiseClear", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Change the color of your username..
        color(channel, newColor) {
          newColor = _.get(newColor, channel);
          return this._sendCommand(null, "#tmijs", `/color ${newColor}`, (resolve, reject) => {
            this.once("_promiseColor", (err) => {
              if (!err) {
                resolve([newColor]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Run commercial on a channel for X seconds..
        commercial(channel, seconds) {
          channel = _.channel(channel);
          seconds = _.get(seconds, 30);
          return this._sendCommand(null, channel, `/commercial ${seconds}`, (resolve, reject) => {
            this.once("_promiseCommercial", (err) => {
              if (!err) {
                resolve([channel, ~~seconds]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Delete a specific message on a channel
        deletemessage(channel, messageUUID) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, `/delete ${messageUUID}`, (resolve, reject) => {
            this.once("_promiseDeletemessage", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Enable emote-only mode on a channel..
        emoteonly(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/emoteonly", (resolve, reject) => {
            this.once("_promiseEmoteonly", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Disable emote-only mode on a channel..
        emoteonlyoff(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/emoteonlyoff", (resolve, reject) => {
            this.once("_promiseEmoteonlyoff", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Enable followers-only mode on a channel..
        followersonly,
        // Alias for followersonly()..
        followersmode: followersonly,
        // Disable followers-only mode on a channel..
        followersonlyoff,
        // Alias for followersonlyoff()..
        followersmodeoff: followersonlyoff,
        // Host a channel..
        host(channel, target) {
          channel = _.channel(channel);
          target = _.username(target);
          return this._sendCommand(2e3, channel, `/host ${target}`, (resolve, reject) => {
            this.once("_promiseHost", (err, remaining) => {
              if (!err) {
                resolve([channel, target, ~~remaining]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Join a channel..
        join(channel) {
          channel = _.channel(channel);
          return this._sendCommand(void 0, null, `JOIN ${channel}`, (resolve, reject) => {
            const eventName = "_promiseJoin";
            let hasFulfilled = false;
            const listener = (err, joinedChannel) => {
              if (channel === _.channel(joinedChannel)) {
                this.removeListener(eventName, listener);
                hasFulfilled = true;
                if (!err) {
                  resolve([channel]);
                } else {
                  reject(err);
                }
              }
            };
            this.on(eventName, listener);
            const delay = this._getPromiseDelay();
            _.promiseDelay(delay).then(() => {
              if (!hasFulfilled) {
                this.emit(eventName, "No response from Twitch.", channel);
              }
            });
          });
        },
        // Mod username on channel..
        mod(channel, username) {
          channel = _.channel(channel);
          username = _.username(username);
          return this._sendCommand(null, channel, `/mod ${username}`, (resolve, reject) => {
            this.once("_promiseMod", (err) => {
              if (!err) {
                resolve([channel, username]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Get list of mods on a channel..
        mods(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/mods", (resolve, reject) => {
            this.once("_promiseMods", (err, mods) => {
              if (!err) {
                mods.forEach((username) => {
                  if (!this.moderators[channel]) {
                    this.moderators[channel] = [];
                  }
                  if (!this.moderators[channel].includes(username)) {
                    this.moderators[channel].push(username);
                  }
                });
                resolve(mods);
              } else {
                reject(err);
              }
            });
          });
        },
        // Leave a channel..
        part,
        // Alias for part()..
        leave: part,
        // Send a ping to the server..
        ping() {
          return this._sendCommand(null, null, "PING", (resolve, _reject) => {
            this.latency = /* @__PURE__ */ new Date();
            this.pingTimeout = setTimeout(() => {
              if (this.ws !== null) {
                this.wasCloseCalled = false;
                this.log.error("Ping timeout.");
                this.ws.close();
                clearInterval(this.pingLoop);
                clearTimeout(this.pingTimeout);
              }
            }, _.get(this.opts.connection.timeout, 9999));
            this.once("_promisePing", (latency) => resolve([parseFloat(latency)]));
          });
        },
        // Enable R9KBeta mode on a channel..
        r9kbeta,
        // Alias for r9kbeta()..
        r9kmode: r9kbeta,
        // Disable R9KBeta mode on a channel..
        r9kbetaoff,
        // Alias for r9kbetaoff()..
        r9kmodeoff: r9kbetaoff,
        // Send a raw message to the server..
        raw(message) {
          return this._sendCommand(null, null, message, (resolve, _reject) => {
            resolve([message]);
          });
        },
        // Send a message on a channel..
        say(channel, message) {
          channel = _.channel(channel);
          if (message.startsWith(".") && !message.startsWith("..") || message.startsWith("/") || message.startsWith("\\")) {
            if (message.substr(1, 3) === "me ") {
              return this.action(channel, message.substr(4));
            } else {
              return this._sendCommand(null, channel, message, (resolve, _reject) => {
                resolve([channel, message]);
              });
            }
          }
          return this._sendMessage(this._getPromiseDelay(), channel, message, (resolve, _reject) => {
            resolve([channel, message]);
          });
        },
        // Enable slow mode on a channel..
        slow,
        // Alias for slow()..
        slowmode: slow,
        // Disable slow mode on a channel..
        slowoff,
        // Alias for slowoff()..
        slowmodeoff: slowoff,
        // Enable subscribers mode on a channel..
        subscribers(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/subscribers", (resolve, reject) => {
            this.once("_promiseSubscribers", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Disable subscribers mode on a channel..
        subscribersoff(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/subscribersoff", (resolve, reject) => {
            this.once("_promiseSubscribersoff", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Timeout username on channel for X seconds..
        timeout(channel, username, seconds, reason) {
          channel = _.channel(channel);
          username = _.username(username);
          if (seconds !== null && !_.isInteger(seconds)) {
            reason = seconds;
            seconds = 300;
          }
          seconds = _.get(seconds, 300);
          reason = _.get(reason, "");
          return this._sendCommand(null, channel, `/timeout ${username} ${seconds} ${reason}`, (resolve, reject) => {
            this.once("_promiseTimeout", (err) => {
              if (!err) {
                resolve([channel, username, ~~seconds, reason]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Unban username on channel..
        unban(channel, username) {
          channel = _.channel(channel);
          username = _.username(username);
          return this._sendCommand(null, channel, `/unban ${username}`, (resolve, reject) => {
            this.once("_promiseUnban", (err) => {
              if (!err) {
                resolve([channel, username]);
              } else {
                reject(err);
              }
            });
          });
        },
        // End the current hosting..
        unhost(channel) {
          channel = _.channel(channel);
          return this._sendCommand(2e3, channel, "/unhost", (resolve, reject) => {
            this.once("_promiseUnhost", (err) => {
              if (!err) {
                resolve([channel]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Unmod username on channel..
        unmod(channel, username) {
          channel = _.channel(channel);
          username = _.username(username);
          return this._sendCommand(null, channel, `/unmod ${username}`, (resolve, reject) => {
            this.once("_promiseUnmod", (err) => {
              if (!err) {
                resolve([channel, username]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Unvip username on channel..
        unvip(channel, username) {
          channel = _.channel(channel);
          username = _.username(username);
          return this._sendCommand(null, channel, `/unvip ${username}`, (resolve, reject) => {
            this.once("_promiseUnvip", (err) => {
              if (!err) {
                resolve([channel, username]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Add username to VIP list on channel..
        vip(channel, username) {
          channel = _.channel(channel);
          username = _.username(username);
          return this._sendCommand(null, channel, `/vip ${username}`, (resolve, reject) => {
            this.once("_promiseVip", (err) => {
              if (!err) {
                resolve([channel, username]);
              } else {
                reject(err);
              }
            });
          });
        },
        // Get list of VIPs on a channel..
        vips(channel) {
          channel = _.channel(channel);
          return this._sendCommand(null, channel, "/vips", (resolve, reject) => {
            this.once("_promiseVips", (err, vips) => {
              if (!err) {
                resolve(vips);
              } else {
                reject(err);
              }
            });
          });
        },
        // Send an whisper message to a user..
        whisper(username, message) {
          username = _.username(username);
          if (username === this.getUsername()) {
            return Promise.reject("Cannot send a whisper to the same account.");
          }
          return this._sendCommand(null, "#tmijs", `/w ${username} ${message}`, (_resolve, reject) => {
            this.once("_promiseWhisper", (err) => {
              if (err) {
                reject(err);
              }
            });
          }).catch((err) => {
            if (err && typeof err === "string" && err.indexOf("No response from Twitch.") !== 0) {
              throw err;
            }
            const from = _.channel(username);
            const userstate = Object.assign({
              "message-type": "whisper",
              "message-id": null,
              "thread-id": null,
              username: this.getUsername()
            }, this.globaluserstate);
            this.emits(["whisper", "message"], [
              [from, userstate, message, true],
              [from, userstate, message, true]
            ]);
            return [username, message];
          });
        }
      };
    }
  });

  // node_modules/tmi.js/lib/events.js
  var require_events = __commonJS({
    "node_modules/tmi.js/lib/events.js"(exports, module) {
      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || void 0;
      }
      module.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._maxListeners = void 0;
      EventEmitter.defaultMaxListeners = 10;
      EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n)) {
          throw TypeError("n must be a positive number");
        }
        this._maxListeners = n;
        return this;
      };
      EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;
        if (!this._events) {
          this._events = {};
        }
        if (type === "error") {
          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er;
            }
            throw TypeError('Uncaught, unspecified "error" event.');
          }
        }
        handler = this._events[type];
        if (isUndefined(handler)) {
          return false;
        }
        if (isFunction(handler)) {
          switch (arguments.length) {
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            default:
              args = Array.prototype.slice.call(arguments, 1);
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          args = Array.prototype.slice.call(arguments, 1);
          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++) {
            listeners[i].apply(this, args);
          }
        }
        return true;
      };
      EventEmitter.prototype.addListener = function(type, listener) {
        var m;
        if (!isFunction(listener)) {
          throw TypeError("listener must be a function");
        }
        if (!this._events) {
          this._events = {};
        }
        if (this._events.newListener) {
          this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
        }
        if (!this._events[type]) {
          this._events[type] = listener;
        } else if (isObject(this._events[type])) {
          this._events[type].push(listener);
        } else {
          this._events[type] = [this._events[type], listener];
        }
        if (isObject(this._events[type]) && !this._events[type].warned) {
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }
          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
            if (typeof console.trace === "function") {
              console.trace();
            }
          }
        }
        return this;
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener)) {
          throw TypeError("listener must be a function");
        }
        var fired = false;
        if (this._events.hasOwnProperty(type) && type.charAt(0) === "_") {
          var count = 1;
          var searchFor = type;
          for (var k in this._events) {
            if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
              count++;
            }
          }
          type = type + count;
        }
        function g() {
          if (type.charAt(0) === "_" && !isNaN(type.substr(type.length - 1))) {
            type = type.substring(0, type.length - 1);
          }
          this.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
      };
      EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;
        if (!isFunction(listener)) {
          throw TypeError("listener must be a function");
        }
        if (!this._events || !this._events[type]) {
          return this;
        }
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || isFunction(list.listener) && list.listener === listener) {
          delete this._events[type];
          if (this._events.hasOwnProperty(type + "2") && type.charAt(0) === "_") {
            var searchFor = type;
            for (var k in this._events) {
              if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
                if (!isNaN(parseInt(k.substr(k.length - 1)))) {
                  this._events[type + parseInt(k.substr(k.length - 1) - 1)] = this._events[k];
                  delete this._events[k];
                }
              }
            }
            this._events[type] = this._events[type + "1"];
            delete this._events[type + "1"];
          }
          if (this._events.removeListener) {
            this.emit("removeListener", type, listener);
          }
        } else if (isObject(list)) {
          for (i = length; i-- > 0; ) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              position = i;
              break;
            }
          }
          if (position < 0) {
            return this;
          }
          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }
          if (this._events.removeListener) {
            this.emit("removeListener", type, listener);
          }
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;
        if (!this._events) {
          return this;
        }
        if (!this._events.removeListener) {
          if (arguments.length === 0) {
            this._events = {};
          } else if (this._events[type]) {
            delete this._events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === "removeListener") {
              continue;
            }
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = {};
          return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else if (listeners) {
          while (listeners.length) {
            this.removeListener(type, listeners[listeners.length - 1]);
          }
        }
        delete this._events[type];
        return this;
      };
      EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type]) {
          ret = [];
        } else if (isFunction(this._events[type])) {
          ret = [this._events[type]];
        } else {
          ret = this._events[type].slice();
        }
        return ret;
      };
      EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
          var evlistener = this._events[type];
          if (isFunction(evlistener)) {
            return 1;
          } else if (evlistener) {
            return evlistener.length;
          }
        }
        return 0;
      };
      EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
      };
      function isFunction(arg) {
        return typeof arg === "function";
      }
      function isNumber(arg) {
        return typeof arg === "number";
      }
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isUndefined(arg) {
        return arg === void 0;
      }
    }
  });

  // node_modules/tmi.js/lib/logger.js
  var require_logger = __commonJS({
    "node_modules/tmi.js/lib/logger.js"(exports, module) {
      var _ = require_utils();
      var currentLevel = "info";
      var levels = { "trace": 0, "debug": 1, "info": 2, "warn": 3, "error": 4, "fatal": 5 };
      function log(level) {
        return function(message) {
          if (levels[level] >= levels[currentLevel]) {
            console.log(`[${_.formatDate(/* @__PURE__ */ new Date())}] ${level}: ${message}`);
          }
        };
      }
      module.exports = {
        // Change the current logging level..
        setLevel(level) {
          currentLevel = level;
        },
        trace: log("trace"),
        debug: log("debug"),
        info: log("info"),
        warn: log("warn"),
        error: log("error"),
        fatal: log("fatal")
      };
    }
  });

  // node_modules/tmi.js/lib/parser.js
  var require_parser = __commonJS({
    "node_modules/tmi.js/lib/parser.js"(exports, module) {
      var _ = require_utils();
      var nonspaceRegex = /\S+/g;
      function parseComplexTag(tags, tagKey, splA = ",", splB = "/", splC) {
        const raw = tags[tagKey];
        if (raw === void 0) {
          return tags;
        }
        const tagIsString = typeof raw === "string";
        tags[tagKey + "-raw"] = tagIsString ? raw : null;
        if (raw === true) {
          tags[tagKey] = null;
          return tags;
        }
        tags[tagKey] = {};
        if (tagIsString) {
          const spl = raw.split(splA);
          for (let i = 0; i < spl.length; i++) {
            const parts = spl[i].split(splB);
            let val = parts[1];
            if (splC !== void 0 && val) {
              val = val.split(splC);
            }
            tags[tagKey][parts[0]] = val || null;
          }
        }
        return tags;
      }
      module.exports = {
        // Parse Twitch badges..
        badges: (tags) => parseComplexTag(tags, "badges"),
        // Parse Twitch badge-info..
        badgeInfo: (tags) => parseComplexTag(tags, "badge-info"),
        // Parse Twitch emotes..
        emotes: (tags) => parseComplexTag(tags, "emotes", "/", ":", ","),
        // Parse regex emotes..
        emoteRegex(msg, code, id, obj) {
          nonspaceRegex.lastIndex = 0;
          const regex = new RegExp("(\\b|^|\\s)" + _.unescapeHtml(code) + "(\\b|$|\\s)");
          let match;
          while ((match = nonspaceRegex.exec(msg)) !== null) {
            if (regex.test(match[0])) {
              obj[id] = obj[id] || [];
              obj[id].push([match.index, nonspaceRegex.lastIndex - 1]);
            }
          }
        },
        // Parse string emotes..
        emoteString(msg, code, id, obj) {
          nonspaceRegex.lastIndex = 0;
          let match;
          while ((match = nonspaceRegex.exec(msg)) !== null) {
            if (match[0] === _.unescapeHtml(code)) {
              obj[id] = obj[id] || [];
              obj[id].push([match.index, nonspaceRegex.lastIndex - 1]);
            }
          }
        },
        // Transform the emotes object to a string with the following format..
        // emote_id:first_index-last_index,another_first-another_last/another_emote_id:first_index-last_index
        transformEmotes(emotes) {
          let transformed = "";
          Object.keys(emotes).forEach((id) => {
            transformed = `${transformed + id}:`;
            emotes[id].forEach(
              (index) => transformed = `${transformed + index.join("-")},`
            );
            transformed = `${transformed.slice(0, -1)}/`;
          });
          return transformed.slice(0, -1);
        },
        formTags(tags) {
          const result = [];
          for (const key in tags) {
            const value = _.escapeIRC(tags[key]);
            result.push(`${key}=${value}`);
          }
          return `@${result.join(";")}`;
        },
        // Parse Twitch messages..
        msg(data) {
          const message = {
            raw: data,
            tags: {},
            prefix: null,
            command: null,
            params: []
          };
          let position = 0;
          let nextspace = 0;
          if (data.charCodeAt(0) === 64) {
            nextspace = data.indexOf(" ");
            if (nextspace === -1) {
              return null;
            }
            const rawTags = data.slice(1, nextspace).split(";");
            for (let i = 0; i < rawTags.length; i++) {
              const tag = rawTags[i];
              const pair = tag.split("=");
              message.tags[pair[0]] = tag.substring(tag.indexOf("=") + 1) || true;
            }
            position = nextspace + 1;
          }
          while (data.charCodeAt(position) === 32) {
            position++;
          }
          if (data.charCodeAt(position) === 58) {
            nextspace = data.indexOf(" ", position);
            if (nextspace === -1) {
              return null;
            }
            message.prefix = data.slice(position + 1, nextspace);
            position = nextspace + 1;
            while (data.charCodeAt(position) === 32) {
              position++;
            }
          }
          nextspace = data.indexOf(" ", position);
          if (nextspace === -1) {
            if (data.length > position) {
              message.command = data.slice(position);
              return message;
            }
            return null;
          }
          message.command = data.slice(position, nextspace);
          position = nextspace + 1;
          while (data.charCodeAt(position) === 32) {
            position++;
          }
          while (position < data.length) {
            nextspace = data.indexOf(" ", position);
            if (data.charCodeAt(position) === 58) {
              message.params.push(data.slice(position + 1));
              break;
            }
            if (nextspace !== -1) {
              message.params.push(data.slice(position, nextspace));
              position = nextspace + 1;
              while (data.charCodeAt(position) === 32) {
                position++;
              }
              continue;
            }
            if (nextspace === -1) {
              message.params.push(data.slice(position));
              break;
            }
          }
          return message;
        }
      };
    }
  });

  // node_modules/tmi.js/lib/timer.js
  var require_timer = __commonJS({
    "node_modules/tmi.js/lib/timer.js"(exports, module) {
      var Queue = class {
        constructor(defaultDelay) {
          this.queue = [];
          this.index = 0;
          this.defaultDelay = defaultDelay === void 0 ? 3e3 : defaultDelay;
        }
        // Add a new function to the queue..
        add(fn, delay) {
          this.queue.push({ fn, delay });
        }
        // Go to the next in queue..
        next() {
          const i = this.index++;
          const at = this.queue[i];
          if (!at) {
            return;
          }
          const next = this.queue[this.index];
          at.fn();
          if (next) {
            const delay = next.delay === void 0 ? this.defaultDelay : next.delay;
            setTimeout(() => this.next(), delay);
          }
        }
      };
      module.exports = Queue;
    }
  });

  // node_modules/tmi.js/lib/client.js
  var require_client = __commonJS({
    "node_modules/tmi.js/lib/client.js"(exports, module) {
      var _global = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
      var _WebSocket = _global.WebSocket || require_browser();
      var _fetch = _global.fetch || require_browser2();
      var api = require_api();
      var commands = require_commands();
      var EventEmitter = require_events().EventEmitter;
      var logger = require_logger();
      var parse = require_parser();
      var Queue = require_timer();
      var _ = require_utils();
      var _apiWarned = false;
      var client = function client2(opts) {
        if (this instanceof client2 === false) {
          return new client2(opts);
        }
        this.opts = _.get(opts, {});
        this.opts.channels = this.opts.channels || [];
        this.opts.connection = this.opts.connection || {};
        this.opts.identity = this.opts.identity || {};
        this.opts.options = this.opts.options || {};
        this.clientId = _.get(this.opts.options.clientId, null);
        this._globalDefaultChannel = _.channel(_.get(this.opts.options.globalDefaultChannel, "#tmijs"));
        this._skipMembership = _.get(this.opts.options.skipMembership, false);
        this._skipUpdatingEmotesets = _.get(this.opts.options.skipUpdatingEmotesets, false);
        this._updateEmotesetsTimer = null;
        this._updateEmotesetsTimerDelay = _.get(this.opts.options.updateEmotesetsTimer, 6e4);
        this.maxReconnectAttempts = _.get(this.opts.connection.maxReconnectAttempts, Infinity);
        this.maxReconnectInterval = _.get(this.opts.connection.maxReconnectInterval, 3e4);
        this.reconnect = _.get(this.opts.connection.reconnect, true);
        this.reconnectDecay = _.get(this.opts.connection.reconnectDecay, 1.5);
        this.reconnectInterval = _.get(this.opts.connection.reconnectInterval, 1e3);
        this.reconnecting = false;
        this.reconnections = 0;
        this.reconnectTimer = this.reconnectInterval;
        this.secure = _.get(
          this.opts.connection.secure,
          !this.opts.connection.server && !this.opts.connection.port
        );
        this.emotes = "";
        this.emotesets = {};
        this.channels = [];
        this.currentLatency = 0;
        this.globaluserstate = {};
        this.lastJoined = "";
        this.latency = /* @__PURE__ */ new Date();
        this.moderators = {};
        this.pingLoop = null;
        this.pingTimeout = null;
        this.reason = "";
        this.username = "";
        this.userstate = {};
        this.wasCloseCalled = false;
        this.ws = null;
        let level = "error";
        if (this.opts.options.debug) {
          level = "info";
        }
        this.log = this.opts.logger || logger;
        try {
          logger.setLevel(level);
        } catch (err) {
        }
        this.opts.channels.forEach(
          (part, index, theArray) => theArray[index] = _.channel(part)
        );
        EventEmitter.call(this);
        this.setMaxListeners(0);
      };
      _.inherits(client, EventEmitter);
      for (const methodName in commands) {
        client.prototype[methodName] = commands[methodName];
      }
      client.prototype.emits = function emits(types, values) {
        for (let i = 0; i < types.length; i++) {
          const val = i < values.length ? values[i] : values[values.length - 1];
          this.emit.apply(this, [types[i]].concat(val));
        }
      };
      client.prototype.api = function(...args) {
        if (!_apiWarned) {
          this.log.warn("Client.prototype.api is deprecated and will be removed for version 2.0.0");
          _apiWarned = true;
        }
        api(...args);
      };
      client.prototype.handleMessage = function handleMessage(message) {
        if (!message) {
          return;
        }
        if (this.listenerCount("raw_message")) {
          this.emit("raw_message", JSON.parse(JSON.stringify(message)), message);
        }
        const channel = _.channel(_.get(message.params[0], null));
        let msg = _.get(message.params[1], null);
        const msgid = _.get(message.tags["msg-id"], null);
        const tags = message.tags = parse.badges(parse.badgeInfo(parse.emotes(message.tags)));
        for (const key in tags) {
          if (key === "emote-sets" || key === "ban-duration" || key === "bits") {
            continue;
          }
          let value = tags[key];
          if (typeof value === "boolean") {
            value = null;
          } else if (value === "1") {
            value = true;
          } else if (value === "0") {
            value = false;
          } else if (typeof value === "string") {
            value = _.unescapeIRC(value);
          }
          tags[key] = value;
        }
        if (message.prefix === null) {
          switch (message.command) {
            case "PING":
              this.emit("ping");
              if (this._isConnected()) {
                this.ws.send("PONG");
              }
              break;
            case "PONG": {
              const currDate = /* @__PURE__ */ new Date();
              this.currentLatency = (currDate.getTime() - this.latency.getTime()) / 1e3;
              this.emits(["pong", "_promisePing"], [[this.currentLatency]]);
              clearTimeout(this.pingTimeout);
              break;
            }
            default:
              this.log.warn(`Could not parse message with no prefix:
${JSON.stringify(message, null, 4)}`);
              break;
          }
        } else if (message.prefix === "tmi.twitch.tv") {
          switch (message.command) {
            case "002":
            case "003":
            case "004":
            case "372":
            case "375":
            case "CAP":
              break;
            case "001":
              this.username = message.params[0];
              break;
            case "376": {
              this.log.info("Connected to server.");
              this.userstate[this._globalDefaultChannel] = {};
              this.emits(["connected", "_promiseConnect"], [[this.server, this.port], [null]]);
              this.reconnections = 0;
              this.reconnectTimer = this.reconnectInterval;
              this.pingLoop = setInterval(() => {
                if (this._isConnected()) {
                  this.ws.send("PING");
                }
                this.latency = /* @__PURE__ */ new Date();
                this.pingTimeout = setTimeout(() => {
                  if (this.ws !== null) {
                    this.wasCloseCalled = false;
                    this.log.error("Ping timeout.");
                    this.ws.close();
                    clearInterval(this.pingLoop);
                    clearTimeout(this.pingTimeout);
                    clearTimeout(this._updateEmotesetsTimer);
                  }
                }, _.get(this.opts.connection.timeout, 9999));
              }, 6e4);
              let joinInterval = _.get(this.opts.options.joinInterval, 2e3);
              if (joinInterval < 300) {
                joinInterval = 300;
              }
              const joinQueue = new Queue(joinInterval);
              const joinChannels = [.../* @__PURE__ */ new Set([...this.opts.channels, ...this.channels])];
              this.channels = [];
              for (let i = 0; i < joinChannels.length; i++) {
                const channel2 = joinChannels[i];
                joinQueue.add(() => {
                  if (this._isConnected()) {
                    this.join(channel2).catch((err) => this.log.error(err));
                  }
                });
              }
              joinQueue.next();
              break;
            }
            case "NOTICE": {
              const nullArr = [null];
              const noticeArr = [channel, msgid, msg];
              const msgidArr = [msgid];
              const channelTrueArr = [channel, true];
              const channelFalseArr = [channel, false];
              const noticeAndNull = [noticeArr, nullArr];
              const noticeAndMsgid = [noticeArr, msgidArr];
              const basicLog = `[${channel}] ${msg}`;
              switch (msgid) {
                case "subs_on":
                  this.log.info(`[${channel}] This room is now in subscribers-only mode.`);
                  this.emits(["subscriber", "subscribers", "_promiseSubscribers"], [channelTrueArr, channelTrueArr, nullArr]);
                  break;
                case "subs_off":
                  this.log.info(`[${channel}] This room is no longer in subscribers-only mode.`);
                  this.emits(["subscriber", "subscribers", "_promiseSubscribersoff"], [channelFalseArr, channelFalseArr, nullArr]);
                  break;
                case "emote_only_on":
                  this.log.info(`[${channel}] This room is now in emote-only mode.`);
                  this.emits(["emoteonly", "_promiseEmoteonly"], [channelTrueArr, nullArr]);
                  break;
                case "emote_only_off":
                  this.log.info(`[${channel}] This room is no longer in emote-only mode.`);
                  this.emits(["emoteonly", "_promiseEmoteonlyoff"], [channelFalseArr, nullArr]);
                  break;
                case "slow_on":
                case "slow_off":
                  break;
                case "followers_on_zero":
                case "followers_on":
                case "followers_off":
                  break;
                case "r9k_on":
                  this.log.info(`[${channel}] This room is now in r9k mode.`);
                  this.emits(["r9kmode", "r9kbeta", "_promiseR9kbeta"], [channelTrueArr, channelTrueArr, nullArr]);
                  break;
                case "r9k_off":
                  this.log.info(`[${channel}] This room is no longer in r9k mode.`);
                  this.emits(["r9kmode", "r9kbeta", "_promiseR9kbetaoff"], [channelFalseArr, channelFalseArr, nullArr]);
                  break;
                case "room_mods": {
                  const listSplit = msg.split(": ");
                  const mods = (listSplit.length > 1 ? listSplit[1] : "").toLowerCase().split(", ").filter((n) => n);
                  this.emits(["_promiseMods", "mods"], [[null, mods], [channel, mods]]);
                  break;
                }
                case "no_mods":
                  this.emits(["_promiseMods", "mods"], [[null, []], [channel, []]]);
                  break;
                case "vips_success": {
                  if (msg.endsWith(".")) {
                    msg = msg.slice(0, -1);
                  }
                  const listSplit = msg.split(": ");
                  const vips = (listSplit.length > 1 ? listSplit[1] : "").toLowerCase().split(", ").filter((n) => n);
                  this.emits(["_promiseVips", "vips"], [[null, vips], [channel, vips]]);
                  break;
                }
                case "no_vips":
                  this.emits(["_promiseVips", "vips"], [[null, []], [channel, []]]);
                  break;
                case "already_banned":
                case "bad_ban_admin":
                case "bad_ban_anon":
                case "bad_ban_broadcaster":
                case "bad_ban_global_mod":
                case "bad_ban_mod":
                case "bad_ban_self":
                case "bad_ban_staff":
                case "usage_ban":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseBan"], noticeAndMsgid);
                  break;
                case "ban_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseBan"], noticeAndNull);
                  break;
                case "usage_clear":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseClear"], noticeAndMsgid);
                  break;
                case "usage_mods":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseMods"], [noticeArr, [msgid, []]]);
                  break;
                case "mod_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseMod"], noticeAndNull);
                  break;
                case "usage_vips":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseVips"], [noticeArr, [msgid, []]]);
                  break;
                case "usage_vip":
                case "bad_vip_grantee_banned":
                case "bad_vip_grantee_already_vip":
                case "bad_vip_max_vips_reached":
                case "bad_vip_achievement_incomplete":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseVip"], [noticeArr, [msgid, []]]);
                  break;
                case "vip_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseVip"], noticeAndNull);
                  break;
                case "usage_mod":
                case "bad_mod_banned":
                case "bad_mod_mod":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseMod"], noticeAndMsgid);
                  break;
                case "unmod_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnmod"], noticeAndNull);
                  break;
                case "unvip_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnvip"], noticeAndNull);
                  break;
                case "usage_unmod":
                case "bad_unmod_mod":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnmod"], noticeAndMsgid);
                  break;
                case "usage_unvip":
                case "bad_unvip_grantee_not_vip":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnvip"], noticeAndMsgid);
                  break;
                case "color_changed":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseColor"], noticeAndNull);
                  break;
                case "usage_color":
                case "turbo_only_color":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseColor"], noticeAndMsgid);
                  break;
                case "commercial_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseCommercial"], noticeAndNull);
                  break;
                case "usage_commercial":
                case "bad_commercial_error":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseCommercial"], noticeAndMsgid);
                  break;
                case "hosts_remaining": {
                  this.log.info(basicLog);
                  const remainingHost = !isNaN(msg[0]) ? parseInt(msg[0]) : 0;
                  this.emits(["notice", "_promiseHost"], [noticeArr, [null, ~~remainingHost]]);
                  break;
                }
                case "bad_host_hosting":
                case "bad_host_rate_exceeded":
                case "bad_host_error":
                case "usage_host":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseHost"], [noticeArr, [msgid, null]]);
                  break;
                case "already_r9k_on":
                case "usage_r9k_on":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseR9kbeta"], noticeAndMsgid);
                  break;
                case "already_r9k_off":
                case "usage_r9k_off":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseR9kbetaoff"], noticeAndMsgid);
                  break;
                case "timeout_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseTimeout"], noticeAndNull);
                  break;
                case "delete_message_success":
                  this.log.info(`[${channel} ${msg}]`);
                  this.emits(["notice", "_promiseDeletemessage"], noticeAndNull);
                  break;
                case "already_subs_off":
                case "usage_subs_off":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseSubscribersoff"], noticeAndMsgid);
                  break;
                case "already_subs_on":
                case "usage_subs_on":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseSubscribers"], noticeAndMsgid);
                  break;
                case "already_emote_only_off":
                case "usage_emote_only_off":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseEmoteonlyoff"], noticeAndMsgid);
                  break;
                case "already_emote_only_on":
                case "usage_emote_only_on":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseEmoteonly"], noticeAndMsgid);
                  break;
                case "usage_slow_on":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseSlow"], noticeAndMsgid);
                  break;
                case "usage_slow_off":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseSlowoff"], noticeAndMsgid);
                  break;
                case "usage_timeout":
                case "bad_timeout_admin":
                case "bad_timeout_anon":
                case "bad_timeout_broadcaster":
                case "bad_timeout_duration":
                case "bad_timeout_global_mod":
                case "bad_timeout_mod":
                case "bad_timeout_self":
                case "bad_timeout_staff":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseTimeout"], noticeAndMsgid);
                  break;
                case "untimeout_success":
                case "unban_success":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnban"], noticeAndNull);
                  break;
                case "usage_unban":
                case "bad_unban_no_ban":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnban"], noticeAndMsgid);
                  break;
                case "usage_delete":
                case "bad_delete_message_error":
                case "bad_delete_message_broadcaster":
                case "bad_delete_message_mod":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseDeletemessage"], noticeAndMsgid);
                  break;
                case "usage_unhost":
                case "not_hosting":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseUnhost"], noticeAndMsgid);
                  break;
                case "whisper_invalid_login":
                case "whisper_invalid_self":
                case "whisper_limit_per_min":
                case "whisper_limit_per_sec":
                case "whisper_restricted":
                case "whisper_restricted_recipient":
                  this.log.info(basicLog);
                  this.emits(["notice", "_promiseWhisper"], noticeAndMsgid);
                  break;
                case "no_permission":
                case "msg_banned":
                case "msg_room_not_found":
                case "msg_channel_suspended":
                case "tos_ban":
                case "invalid_user":
                  this.log.info(basicLog);
                  this.emits([
                    "notice",
                    "_promiseBan",
                    "_promiseClear",
                    "_promiseUnban",
                    "_promiseTimeout",
                    "_promiseDeletemessage",
                    "_promiseMods",
                    "_promiseMod",
                    "_promiseUnmod",
                    "_promiseVips",
                    "_promiseVip",
                    "_promiseUnvip",
                    "_promiseCommercial",
                    "_promiseHost",
                    "_promiseUnhost",
                    "_promiseJoin",
                    "_promisePart",
                    "_promiseR9kbeta",
                    "_promiseR9kbetaoff",
                    "_promiseSlow",
                    "_promiseSlowoff",
                    "_promiseFollowers",
                    "_promiseFollowersoff",
                    "_promiseSubscribers",
                    "_promiseSubscribersoff",
                    "_promiseEmoteonly",
                    "_promiseEmoteonlyoff",
                    "_promiseWhisper"
                  ], [noticeArr, [msgid, channel]]);
                  break;
                case "msg_rejected":
                case "msg_rejected_mandatory":
                  this.log.info(basicLog);
                  this.emit("automod", channel, msgid, msg);
                  break;
                case "unrecognized_cmd":
                  this.log.info(basicLog);
                  this.emit("notice", channel, msgid, msg);
                  break;
                case "cmds_available":
                case "host_target_went_offline":
                case "msg_censored_broadcaster":
                case "msg_duplicate":
                case "msg_emoteonly":
                case "msg_verified_email":
                case "msg_ratelimit":
                case "msg_subsonly":
                case "msg_timedout":
                case "msg_bad_characters":
                case "msg_channel_blocked":
                case "msg_facebook":
                case "msg_followersonly":
                case "msg_followersonly_followed":
                case "msg_followersonly_zero":
                case "msg_slowmode":
                case "msg_suspended":
                case "no_help":
                case "usage_disconnect":
                case "usage_help":
                case "usage_me":
                case "unavailable_command":
                  this.log.info(basicLog);
                  this.emit("notice", channel, msgid, msg);
                  break;
                case "host_on":
                case "host_off":
                  break;
                default:
                  if (msg.includes("Login unsuccessful") || msg.includes("Login authentication failed")) {
                    this.wasCloseCalled = false;
                    this.reconnect = false;
                    this.reason = msg;
                    this.log.error(this.reason);
                    this.ws.close();
                  } else if (msg.includes("Error logging in") || msg.includes("Improperly formatted auth")) {
                    this.wasCloseCalled = false;
                    this.reconnect = false;
                    this.reason = msg;
                    this.log.error(this.reason);
                    this.ws.close();
                  } else if (msg.includes("Invalid NICK")) {
                    this.wasCloseCalled = false;
                    this.reconnect = false;
                    this.reason = "Invalid NICK.";
                    this.log.error(this.reason);
                    this.ws.close();
                  } else {
                    this.log.warn(`Could not parse NOTICE from tmi.twitch.tv:
${JSON.stringify(message, null, 4)}`);
                    this.emit("notice", channel, msgid, msg);
                  }
                  break;
              }
              break;
            }
            case "USERNOTICE": {
              const username = tags["display-name"] || tags["login"];
              const plan = tags["msg-param-sub-plan"] || "";
              const planName = _.unescapeIRC(_.get(tags["msg-param-sub-plan-name"], "")) || null;
              const prime = plan.includes("Prime");
              const methods = { prime, plan, planName };
              const streakMonths = ~~(tags["msg-param-streak-months"] || 0);
              const recipient = tags["msg-param-recipient-display-name"] || tags["msg-param-recipient-user-name"];
              const giftSubCount = ~~tags["msg-param-mass-gift-count"];
              tags["message-type"] = msgid;
              switch (msgid) {
                case "resub":
                  this.emits(["resub", "subanniversary"], [
                    [channel, username, streakMonths, msg, tags, methods]
                  ]);
                  break;
                case "sub":
                  this.emits(["subscription", "sub"], [
                    [channel, username, methods, msg, tags]
                  ]);
                  break;
                case "subgift":
                  this.emit("subgift", channel, username, streakMonths, recipient, methods, tags);
                  break;
                case "anonsubgift":
                  this.emit("anonsubgift", channel, streakMonths, recipient, methods, tags);
                  break;
                case "submysterygift":
                  this.emit("submysterygift", channel, username, giftSubCount, methods, tags);
                  break;
                case "anonsubmysterygift":
                  this.emit("anonsubmysterygift", channel, giftSubCount, methods, tags);
                  break;
                case "primepaidupgrade":
                  this.emit("primepaidupgrade", channel, username, methods, tags);
                  break;
                case "giftpaidupgrade": {
                  const sender = tags["msg-param-sender-name"] || tags["msg-param-sender-login"];
                  this.emit("giftpaidupgrade", channel, username, sender, tags);
                  break;
                }
                case "anongiftpaidupgrade":
                  this.emit("anongiftpaidupgrade", channel, username, tags);
                  break;
                case "raid": {
                  const username2 = tags["msg-param-displayName"] || tags["msg-param-login"];
                  const viewers = +tags["msg-param-viewerCount"];
                  this.emit("raided", channel, username2, viewers, tags);
                  break;
                }
                case "ritual": {
                  const ritualName = tags["msg-param-ritual-name"];
                  switch (ritualName) {
                    case "new_chatter":
                      this.emit("newchatter", channel, username, tags, msg);
                      break;
                    default:
                      this.emit("ritual", ritualName, channel, username, tags, msg);
                      break;
                  }
                  break;
                }
                default:
                  this.emit("usernotice", msgid, channel, tags, msg);
                  break;
              }
              break;
            }
            case "HOSTTARGET": {
              const msgSplit = msg.split(" ");
              const viewers = ~~msgSplit[1] || 0;
              if (msgSplit[0] === "-") {
                this.log.info(`[${channel}] Exited host mode.`);
                this.emits(["unhost", "_promiseUnhost"], [[channel, viewers], [null]]);
              } else {
                this.log.info(`[${channel}] Now hosting ${msgSplit[0]} for ${viewers} viewer(s).`);
                this.emit("hosting", channel, msgSplit[0], viewers);
              }
              break;
            }
            case "CLEARCHAT":
              if (message.params.length > 1) {
                const duration = _.get(message.tags["ban-duration"], null);
                if (duration === null) {
                  this.log.info(`[${channel}] ${msg} has been banned.`);
                  this.emit("ban", channel, msg, null, message.tags);
                } else {
                  this.log.info(`[${channel}] ${msg} has been timed out for ${duration} seconds.`);
                  this.emit("timeout", channel, msg, null, ~~duration, message.tags);
                }
              } else {
                this.log.info(`[${channel}] Chat was cleared by a moderator.`);
                this.emits(["clearchat", "_promiseClear"], [[channel], [null]]);
              }
              break;
            case "CLEARMSG":
              if (message.params.length > 1) {
                const deletedMessage = msg;
                const username = tags["login"];
                tags["message-type"] = "messagedeleted";
                this.log.info(`[${channel}] ${username}'s message has been deleted.`);
                this.emit("messagedeleted", channel, username, deletedMessage, tags);
              }
              break;
            case "RECONNECT":
              this.log.info("Received RECONNECT request from Twitch..");
              this.log.info(`Disconnecting and reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`);
              this.disconnect().catch((err) => this.log.error(err));
              setTimeout(() => this.connect().catch((err) => this.log.error(err)), this.reconnectTimer);
              break;
            case "USERSTATE":
              message.tags.username = this.username;
              if (message.tags["user-type"] === "mod") {
                if (!this.moderators[channel]) {
                  this.moderators[channel] = [];
                }
                if (!this.moderators[channel].includes(this.username)) {
                  this.moderators[channel].push(this.username);
                }
              }
              if (!_.isJustinfan(this.getUsername()) && !this.userstate[channel]) {
                this.userstate[channel] = tags;
                this.lastJoined = channel;
                this.channels.push(channel);
                this.log.info(`Joined ${channel}`);
                this.emit("join", channel, _.username(this.getUsername()), true);
              }
              if (message.tags["emote-sets"] !== this.emotes) {
                this._updateEmoteset(message.tags["emote-sets"]);
              }
              this.userstate[channel] = tags;
              break;
            case "GLOBALUSERSTATE":
              this.globaluserstate = tags;
              this.emit("globaluserstate", tags);
              if (typeof message.tags["emote-sets"] !== "undefined") {
                this._updateEmoteset(message.tags["emote-sets"]);
              }
              break;
            case "ROOMSTATE":
              if (_.channel(this.lastJoined) === channel) {
                this.emit("_promiseJoin", null, channel);
              }
              message.tags.channel = channel;
              this.emit("roomstate", channel, message.tags);
              if (!_.hasOwn(message.tags, "subs-only")) {
                if (_.hasOwn(message.tags, "slow")) {
                  if (typeof message.tags.slow === "boolean" && !message.tags.slow) {
                    const disabled = [channel, false, 0];
                    this.log.info(`[${channel}] This room is no longer in slow mode.`);
                    this.emits(["slow", "slowmode", "_promiseSlowoff"], [disabled, disabled, [null]]);
                  } else {
                    const seconds = ~~message.tags.slow;
                    const enabled = [channel, true, seconds];
                    this.log.info(`[${channel}] This room is now in slow mode.`);
                    this.emits(["slow", "slowmode", "_promiseSlow"], [enabled, enabled, [null]]);
                  }
                }
                if (_.hasOwn(message.tags, "followers-only")) {
                  if (message.tags["followers-only"] === "-1") {
                    const disabled = [channel, false, 0];
                    this.log.info(`[${channel}] This room is no longer in followers-only mode.`);
                    this.emits(["followersonly", "followersmode", "_promiseFollowersoff"], [disabled, disabled, [null]]);
                  } else {
                    const minutes = ~~message.tags["followers-only"];
                    const enabled = [channel, true, minutes];
                    this.log.info(`[${channel}] This room is now in follower-only mode.`);
                    this.emits(["followersonly", "followersmode", "_promiseFollowers"], [enabled, enabled, [null]]);
                  }
                }
              }
              break;
            case "SERVERCHANGE":
              break;
            default:
              this.log.warn(`Could not parse message from tmi.twitch.tv:
${JSON.stringify(message, null, 4)}`);
              break;
          }
        } else if (message.prefix === "jtv") {
          switch (message.command) {
            case "MODE":
              if (msg === "+o") {
                if (!this.moderators[channel]) {
                  this.moderators[channel] = [];
                }
                if (!this.moderators[channel].includes(message.params[2])) {
                  this.moderators[channel].push(message.params[2]);
                }
                this.emit("mod", channel, message.params[2]);
              } else if (msg === "-o") {
                if (!this.moderators[channel]) {
                  this.moderators[channel] = [];
                }
                this.moderators[channel].filter((value) => value !== message.params[2]);
                this.emit("unmod", channel, message.params[2]);
              }
              break;
            default:
              this.log.warn(`Could not parse message from jtv:
${JSON.stringify(message, null, 4)}`);
              break;
          }
        } else {
          switch (message.command) {
            case "353":
              this.emit("names", message.params[2], message.params[3].split(" "));
              break;
            case "366":
              break;
            case "JOIN": {
              const nick = message.prefix.split("!")[0];
              if (_.isJustinfan(this.getUsername()) && this.username === nick) {
                this.lastJoined = channel;
                this.channels.push(channel);
                this.log.info(`Joined ${channel}`);
                this.emit("join", channel, nick, true);
              }
              if (this.username !== nick) {
                this.emit("join", channel, nick, false);
              }
              break;
            }
            case "PART": {
              let isSelf = false;
              const nick = message.prefix.split("!")[0];
              if (this.username === nick) {
                isSelf = true;
                if (this.userstate[channel]) {
                  delete this.userstate[channel];
                }
                let index = this.channels.indexOf(channel);
                if (index !== -1) {
                  this.channels.splice(index, 1);
                }
                index = this.opts.channels.indexOf(channel);
                if (index !== -1) {
                  this.opts.channels.splice(index, 1);
                }
                this.log.info(`Left ${channel}`);
                this.emit("_promisePart", null);
              }
              this.emit("part", channel, nick, isSelf);
              break;
            }
            case "WHISPER": {
              const nick = message.prefix.split("!")[0];
              this.log.info(`[WHISPER] <${nick}>: ${msg}`);
              if (!_.hasOwn(message.tags, "username")) {
                message.tags.username = nick;
              }
              message.tags["message-type"] = "whisper";
              const from = _.channel(message.tags.username);
              this.emits(["whisper", "message"], [
                [from, message.tags, msg, false]
              ]);
              break;
            }
            case "PRIVMSG":
              message.tags.username = message.prefix.split("!")[0];
              if (message.tags.username === "jtv") {
                const name = _.username(msg.split(" ")[0]);
                const autohost = msg.includes("auto");
                if (msg.includes("hosting you for")) {
                  const count = _.extractNumber(msg);
                  this.emit("hosted", channel, name, count, autohost);
                } else if (msg.includes("hosting you")) {
                  this.emit("hosted", channel, name, 0, autohost);
                }
              } else {
                const messagesLogLevel = _.get(this.opts.options.messagesLogLevel, "info");
                const actionMessage = _.actionMessage(msg);
                message.tags["message-type"] = actionMessage ? "action" : "chat";
                msg = actionMessage ? actionMessage[1] : msg;
                if (_.hasOwn(message.tags, "bits")) {
                  this.emit("cheer", channel, message.tags, msg);
                } else {
                  if (_.hasOwn(message.tags, "msg-id")) {
                    if (message.tags["msg-id"] === "highlighted-message") {
                      const rewardtype = message.tags["msg-id"];
                      this.emit("redeem", channel, message.tags.username, rewardtype, message.tags, msg);
                    } else if (message.tags["msg-id"] === "skip-subs-mode-message") {
                      const rewardtype = message.tags["msg-id"];
                      this.emit("redeem", channel, message.tags.username, rewardtype, message.tags, msg);
                    }
                  } else if (_.hasOwn(message.tags, "custom-reward-id")) {
                    const rewardtype = message.tags["custom-reward-id"];
                    this.emit("redeem", channel, message.tags.username, rewardtype, message.tags, msg);
                  }
                  if (actionMessage) {
                    this.log[messagesLogLevel](`[${channel}] *<${message.tags.username}>: ${msg}`);
                    this.emits(["action", "message"], [
                      [channel, message.tags, msg, false]
                    ]);
                  } else {
                    this.log[messagesLogLevel](`[${channel}] <${message.tags.username}>: ${msg}`);
                    this.emits(["chat", "message"], [
                      [channel, message.tags, msg, false]
                    ]);
                  }
                }
              }
              break;
            default:
              this.log.warn(`Could not parse message:
${JSON.stringify(message, null, 4)}`);
              break;
          }
        }
      };
      client.prototype.connect = function connect() {
        return new Promise((resolve, reject) => {
          this.server = _.get(this.opts.connection.server, "irc-ws.chat.twitch.tv");
          this.port = _.get(this.opts.connection.port, 80);
          if (this.secure) {
            this.port = 443;
          }
          if (this.port === 443) {
            this.secure = true;
          }
          this.reconnectTimer = this.reconnectTimer * this.reconnectDecay;
          if (this.reconnectTimer >= this.maxReconnectInterval) {
            this.reconnectTimer = this.maxReconnectInterval;
          }
          this._openConnection();
          this.once("_promiseConnect", (err) => {
            if (!err) {
              resolve([this.server, ~~this.port]);
            } else {
              reject(err);
            }
          });
        });
      };
      client.prototype._openConnection = function _openConnection() {
        const url = `${this.secure ? "wss" : "ws"}://${this.server}:${this.port}/`;
        const connectionOptions = {};
        if ("agent" in this.opts.connection) {
          connectionOptions.agent = this.opts.connection.agent;
        }
        this.ws = new _WebSocket(url, "irc", connectionOptions);
        this.ws.onmessage = this._onMessage.bind(this);
        this.ws.onerror = this._onError.bind(this);
        this.ws.onclose = this._onClose.bind(this);
        this.ws.onopen = this._onOpen.bind(this);
      };
      client.prototype._onOpen = function _onOpen() {
        if (!this._isConnected()) {
          return;
        }
        this.log.info(`Connecting to ${this.server} on port ${this.port}..`);
        this.emit("connecting", this.server, ~~this.port);
        this.username = _.get(this.opts.identity.username, _.justinfan());
        this._getToken().then((token) => {
          const password = _.password(token);
          this.log.info("Sending authentication to server..");
          this.emit("logon");
          let caps = "twitch.tv/tags twitch.tv/commands";
          if (!this._skipMembership) {
            caps += " twitch.tv/membership";
          }
          this.ws.send("CAP REQ :" + caps);
          if (password) {
            this.ws.send(`PASS ${password}`);
          } else if (_.isJustinfan(this.username)) {
            this.ws.send("PASS SCHMOOPIIE");
          }
          this.ws.send(`NICK ${this.username}`);
        }).catch((err) => {
          this.emits(["_promiseConnect", "disconnected"], [[err], ["Could not get a token."]]);
        });
      };
      client.prototype._getToken = function _getToken() {
        const passwordOption = this.opts.identity.password;
        let password;
        if (typeof passwordOption === "function") {
          password = passwordOption();
          if (password instanceof Promise) {
            return password;
          }
          return Promise.resolve(password);
        }
        return Promise.resolve(passwordOption);
      };
      client.prototype._onMessage = function _onMessage(event) {
        const parts = event.data.trim().split("\r\n");
        parts.forEach((str) => {
          const msg = parse.msg(str);
          if (msg) {
            this.handleMessage(msg);
          }
        });
      };
      client.prototype._onError = function _onError() {
        this.moderators = {};
        this.userstate = {};
        this.globaluserstate = {};
        clearInterval(this.pingLoop);
        clearTimeout(this.pingTimeout);
        clearTimeout(this._updateEmotesetsTimer);
        this.reason = this.ws === null ? "Connection closed." : "Unable to connect.";
        this.emits(["_promiseConnect", "disconnected"], [[this.reason]]);
        if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
          this.emit("maxreconnect");
          this.log.error("Maximum reconnection attempts reached.");
        }
        if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
          this.reconnecting = true;
          this.reconnections = this.reconnections + 1;
          this.log.error(`Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`);
          this.emit("reconnect");
          setTimeout(() => {
            this.reconnecting = false;
            this.connect().catch((err) => this.log.error(err));
          }, this.reconnectTimer);
        }
        this.ws = null;
      };
      client.prototype._onClose = function _onClose() {
        this.moderators = {};
        this.userstate = {};
        this.globaluserstate = {};
        clearInterval(this.pingLoop);
        clearTimeout(this.pingTimeout);
        clearTimeout(this._updateEmotesetsTimer);
        if (this.wasCloseCalled) {
          this.wasCloseCalled = false;
          this.reason = "Connection closed.";
          this.log.info(this.reason);
          this.emits(["_promiseConnect", "_promiseDisconnect", "disconnected"], [[this.reason], [null], [this.reason]]);
        } else {
          this.emits(["_promiseConnect", "disconnected"], [[this.reason]]);
          if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
            this.emit("maxreconnect");
            this.log.error("Maximum reconnection attempts reached.");
          }
          if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
            this.reconnecting = true;
            this.reconnections = this.reconnections + 1;
            this.log.error(`Could not connect to server. Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`);
            this.emit("reconnect");
            setTimeout(() => {
              this.reconnecting = false;
              this.connect().catch((err) => this.log.error(err));
            }, this.reconnectTimer);
          }
        }
        this.ws = null;
      };
      client.prototype._getPromiseDelay = function _getPromiseDelay() {
        if (this.currentLatency <= 600) {
          return 600;
        } else {
          return this.currentLatency + 100;
        }
      };
      client.prototype._sendCommand = function _sendCommand(delay, channel, command, fn) {
        return new Promise((resolve, reject) => {
          if (!this._isConnected()) {
            return reject("Not connected to server.");
          } else if (delay === null || typeof delay === "number") {
            if (delay === null) {
              delay = this._getPromiseDelay();
            }
            _.promiseDelay(delay).then(() => reject("No response from Twitch."));
          }
          if (channel !== null) {
            const chan = _.channel(channel);
            this.log.info(`[${chan}] Executing command: ${command}`);
            this.ws.send(`PRIVMSG ${chan} :${command}`);
          } else {
            this.log.info(`Executing command: ${command}`);
            this.ws.send(command);
          }
          if (typeof fn === "function") {
            fn(resolve, reject);
          } else {
            resolve();
          }
        });
      };
      client.prototype._sendMessage = function _sendMessage(delay, channel, message, fn) {
        return new Promise((resolve, reject) => {
          if (!this._isConnected()) {
            return reject("Not connected to server.");
          } else if (_.isJustinfan(this.getUsername())) {
            return reject("Cannot send anonymous messages.");
          }
          const chan = _.channel(channel);
          if (!this.userstate[chan]) {
            this.userstate[chan] = {};
          }
          if (message.length >= 500) {
            const msg = _.splitLine(message, 500);
            message = msg[0];
            setTimeout(() => {
              this._sendMessage(delay, channel, msg[1], () => {
              });
            }, 350);
          }
          this.ws.send(`PRIVMSG ${chan} :${message}`);
          const emotes = {};
          Object.keys(this.emotesets).forEach(
            (id) => this.emotesets[id].forEach((emote) => {
              const emoteFunc = _.isRegex(emote.code) ? parse.emoteRegex : parse.emoteString;
              return emoteFunc(message, emote.code, emote.id, emotes);
            })
          );
          const userstate = Object.assign(
            this.userstate[chan],
            parse.emotes({ emotes: parse.transformEmotes(emotes) || null })
          );
          const messagesLogLevel = _.get(this.opts.options.messagesLogLevel, "info");
          const actionMessage = _.actionMessage(message);
          if (actionMessage) {
            userstate["message-type"] = "action";
            this.log[messagesLogLevel](`[${chan}] *<${this.getUsername()}>: ${actionMessage[1]}`);
            this.emits(["action", "message"], [
              [chan, userstate, actionMessage[1], true]
            ]);
          } else {
            userstate["message-type"] = "chat";
            this.log[messagesLogLevel](`[${chan}] <${this.getUsername()}>: ${message}`);
            this.emits(["chat", "message"], [
              [chan, userstate, message, true]
            ]);
          }
          if (typeof fn === "function") {
            fn(resolve, reject);
          } else {
            resolve();
          }
        });
      };
      client.prototype._updateEmoteset = function _updateEmoteset(sets) {
        let setsChanges = sets !== void 0;
        if (setsChanges) {
          if (sets === this.emotes) {
            setsChanges = false;
          } else {
            this.emotes = sets;
          }
        }
        if (this._skipUpdatingEmotesets) {
          if (setsChanges) {
            this.emit("emotesets", sets, {});
          }
          return;
        }
        const setEmotesetTimer = () => {
          if (this._updateEmotesetsTimerDelay > 0) {
            clearTimeout(this._updateEmotesetsTimer);
            this._updateEmotesetsTimer = setTimeout(() => this._updateEmoteset(sets), this._updateEmotesetsTimerDelay);
          }
        };
        this._getToken().then((token) => {
          const url = `https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=${sets}`;
          const fetchOptions = {};
          if ("fetchAgent" in this.opts.connection) {
            fetchOptions.agent = this.opts.connection.fetchAgent;
          }
          return _fetch(url, {
            ...fetchOptions,
            headers: {
              "Accept": "application/vnd.twitchtv.v5+json",
              "Authorization": `OAuth ${_.token(token)}`,
              "Client-ID": this.clientId
            }
          });
        }).then((res) => res.json()).then((data) => {
          this.emotesets = data.emoticon_sets || {};
          this.emit("emotesets", sets, this.emotesets);
          setEmotesetTimer();
        }).catch(() => setEmotesetTimer());
      };
      client.prototype.getUsername = function getUsername() {
        return this.username;
      };
      client.prototype.getOptions = function getOptions() {
        return this.opts;
      };
      client.prototype.getChannels = function getChannels() {
        return this.channels;
      };
      client.prototype.isMod = function isMod(channel, username) {
        const chan = _.channel(channel);
        if (!this.moderators[chan]) {
          this.moderators[chan] = [];
        }
        return this.moderators[chan].includes(_.username(username));
      };
      client.prototype.readyState = function readyState() {
        if (this.ws === null) {
          return "CLOSED";
        }
        return ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState];
      };
      client.prototype._isConnected = function _isConnected() {
        return this.ws !== null && this.ws.readyState === 1;
      };
      client.prototype.disconnect = function disconnect() {
        return new Promise((resolve, reject) => {
          if (this.ws !== null && this.ws.readyState !== 3) {
            this.wasCloseCalled = true;
            this.log.info("Disconnecting from server..");
            this.ws.close();
            this.once("_promiseDisconnect", () => resolve([this.server, ~~this.port]));
          } else {
            this.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing.");
            reject("Cannot disconnect from server. Socket is not opened or connection is already closing.");
          }
        });
      };
      client.prototype.off = client.prototype.removeListener;
      if (typeof module !== "undefined" && module.exports) {
        module.exports = client;
      }
      if (typeof window !== "undefined") {
        window.tmi = {
          client,
          Client: client
        };
      }
    }
  });

  // node_modules/tmi.js/index.js
  var require_tmi = __commonJS({
    "node_modules/tmi.js/index.js"(exports, module) {
      var client = require_client();
      module.exports = {
        client,
        Client: client
      };
    }
  });

  // scripts/Shared/index.ts
  var tmi = __toESM(require_tmi());

  // scripts/Shared/Message/MessageUI.ts
  var MessageUI = class {
    chatElement;
    templateChatMSG;
    constructor() {
      this.chatElement = document.querySelector("#Chat" /* chat */);
      this.templateChatMSG = document.querySelector("#TemplateChatMSG" /* templateChatMSG */);
    }
    addMessage(message, tags) {
      const msgClone = this.templateChatMSG.content.cloneNode(true);
      let msgText = msgClone.querySelector(".msg-text" /* msgText */);
      let msgUserName = msgClone.querySelector(".msg-username" /* chatUsername */);
      if (tags["emotes"]) {
        msgText.insertAdjacentHTML(
          "beforeend",
          this.formatEmotes(message, tags["emotes"])
        );
      } else {
        msgText.textContent = message;
      }
      msgUserName.textContent = tags["display-name"];
      msgUserName.style.color = tags["color"] ? tags["color"] : "#fff";
      this.chatElement.prepend(msgClone);
    }
    formatEmotes(text, emotes) {
      let splitText = text.split("");
      for (let i in emotes) {
        let emoteid = emotes[i];
        for (let j in emoteid) {
          let emoteName = emoteid[j];
          let splitedName = emoteName.split("-");
          let emotePosition = [parseInt(splitedName[0]), parseInt(splitedName[1])];
          let length = emotePosition[1] - emotePosition[0];
          let empty = Array.apply(null, new Array(length + 1)).map(function() {
            return "";
          });
          splitText = splitText.slice(0, emotePosition[0]).concat(empty).concat(splitText.slice(emotePosition[1] + 1, splitText.length));
          splitText.splice(
            emotePosition[0],
            1,
            '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">'
          );
        }
      }
      return splitText.join("");
    }
  };

  // scripts/Shared/utils.ts
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // scripts/Shared/Game/Grid.ts
  var Grid = class {
    cellWidth = 32;
    gridSize = 25;
    occupiedCells = [];
    constructor(canvas, gridSize, cells = []) {
      this.occupiedCells = cells;
      this.gridSize = gridSize;
      this.cellWidth = Math.min(canvas.width, canvas.height) / this.gridSize;
    }
    fillCell(point) {
      this.occupiedCells.push(point);
    }
    clearCell(point) {
      let pointIndex = this.occupiedCells.indexOf(point);
      if (pointIndex == -1)
        return;
      this.occupiedCells.splice(pointIndex, 1);
    }
    clearCells() {
      this.occupiedCells = [];
    }
    generateRandomPoint() {
      let position = {
        x: getRandomInt(0, this.gridSize - 1),
        y: getRandomInt(0, this.gridSize - 1)
      };
      if (this.isCellOccupied(position)) {
        return this.generateRandomPoint();
      } else {
        this.fillCell(position);
        return position;
      }
    }
    isCellOccupied(position) {
      return this.occupiedCells.some((cell) => cell.x === position.x && cell.y === position.y);
    }
    getCells() {
      return this.occupiedCells;
    }
    getCellWidth() {
      return this.cellWidth;
    }
    getGridSize() {
      return this.gridSize;
    }
  };

  // scripts/Shared/Game/GameTimer.ts
  var GameTimer = class {
    waitingTime;
    now;
    constructor(waitingTime) {
      this.waitingTime = waitingTime;
      this.now = Date.now();
    }
    getTimeElapsed() {
      return Date.now() - this.now;
    }
    stopWating(timeOffset = 0) {
      return this.getTimeElapsed() >= this.waitingTime + timeOffset;
    }
    reset() {
      this.now = Date.now();
    }
  };

  // scripts/Shared/Game/GameLogger.ts
  var GameLogger = class {
    gameUI;
    logList;
    constructor(gameUI, logList) {
      this.gameUI = gameUI;
      this.logList = logList;
    }
    addLog(logName) {
      this.gameUI.addLogEvent(this.logList.getLogText(logName));
    }
  };

  // scripts/Power4/CommandList.ts
  var CommandList = class {
    placeCmd = ["place"];
    leftCmd = ["gauche", "left"];
    rightCmd = ["droite", "right"];
    cmdToExecute = [];
    cheatCommand = ["nope"];
    aliasToCmd(cmd) {
      if (this.placeCmd.includes(cmd)) {
        return "place";
      } else if (this.leftCmd.includes(cmd)) {
        return "left";
      } else if (this.rightCmd.includes(cmd)) {
        return "right";
      }
    }
    addCmdToExecute(cmd) {
      this.cmdToExecute.push(this.aliasToCmd(cmd));
    }
    getCmds() {
      return this.cmdToExecute;
    }
    getAllowedCmds() {
      return [
        ...this.placeCmd,
        ...this.leftCmd,
        ...this.rightCmd
      ].join("|");
    }
  };

  // scripts/Power4/GameLogs.ts
  var GameLogs = class {
    logs = {
      game_over: "Le snake s'est mordu lui m\xEAme ! GAME OVER",
      apple_eaten: "Une pomme de plus pour le serpent !",
      apple_golden_eaten: "Une pomme d'or ! Le serpent grandit de X",
      apple_green_eaten: "Oh non ! Une pomme empoison\xE9e ! Le serpent r\xE9tr\xE9cit de 1",
      speed_change_up: "Le serpent vas plus vite",
      speed_change_down: "Le serpent ralentit",
      snake_teleport: "Oh non ! Un t\xE9l\xE9porteur"
    };
    getLogText(logName) {
      return this.logs[logName];
    }
  };

  // scripts/Shared/Team.ts
  var Team = class {
    name;
    color;
    members;
    points;
    constructor(name, color, points = 0) {
      this.name = name;
      this.color = color;
      this.points = points;
    }
    getName() {
      return this.name;
    }
    addPoint(point) {
      this.points += point;
    }
    getPoints() {
      return this.points;
    }
    resetPoints() {
      this.points = 0;
    }
    addMember(member) {
      this.members.push(member);
    }
    removeMember(member) {
      const index = this.members.indexOf(member);
      if (index > -1) {
        this.members.splice(index, 1);
        return true;
      }
      return false;
    }
    getMembers() {
      return this.members;
    }
  };

  // scripts/Power4/Coin.ts
  var Coin = class {
    position;
    grid;
    context;
    team;
    constructor(position, grid, context, team) {
      this.position = position;
      this.grid = grid;
      this.team = team;
      this.context = context;
      this.grid.fillCell(position);
    }
    setPosition(position) {
      this.grid.clearCell(this.position);
      this.position = position;
      this.grid.fillCell(this.position);
    }
    getPosition() {
      return this.position;
    }
    move(direction) {
      if (direction === "right") {
        this.position.x = (this.position.x + 1) % this.grid.getGridSize();
      } else if (direction === "left") {
        this.position.x = (this.grid.getGridSize() + this.position.x - 1) % this.grid.getGridSize();
      }
    }
    draw() {
      this.context.fillStyle = this.team.color;
      this.context.beginPath();
      this.context.arc(
        (this.position.x + 0.5) * this.grid.getCellWidth(),
        (this.position.y + 0.5) * this.grid.getCellWidth(),
        50,
        0,
        2 * Math.PI
      );
      this.context.fill();
    }
  };

  // scripts/Shared/UI/UIPoint.ts
  var UIPoint = class {
    pointOwner;
    point;
    constructor(pointOwner, point) {
      this.pointOwner = pointOwner;
      this.point = point;
    }
    toString() {
      return this.pointOwner + " : " + this.point.toString();
    }
  };

  // scripts/Shared/Game/GameSave.ts
  var GameSave = class {
    savedAt;
    type;
    game;
    constructor(type, game2) {
      this.savedAt = Date.now();
      this.type = type;
      this.game = game2;
    }
  };

  // scripts/Power4/Game.ts
  var Game = class {
    cheatActivated = false;
    cheatLoopCount = 0;
    canvas;
    context;
    storage;
    gameLogs;
    gameUI;
    timer;
    grid;
    commandList;
    power4Params;
    teams = [];
    playingTeam;
    currentCoin = null;
    placedCoins = [];
    constructor(canvas, gameUI, storage, forceReset = false) {
      this.canvas = canvas;
      this.gameUI = gameUI;
      this.context = canvas.getContext("2d");
      this.storage = storage;
      this.grid = new Grid(this.canvas, 7);
      this.commandList = new CommandList();
      this.gameLogs = new GameLogger(this.gameUI, new GameLogs());
      const lastGame = this.storage.load();
      if (!lastGame) {
        this.teams = [
          new Team("YellowTeam", "#f38d00"),
          new Team("RedTeam", "#cb0000")
        ];
        this.playingTeam = this.teams[0];
      } else {
        this.loadLastGame(lastGame.game);
      }
      this.timer = new GameTimer(100);
      this.setUI();
    }
    setUI() {
      let UIElements = [];
      let wrapper = document.createElement("div");
      this.gameUI.createLeaderboard(true);
      this.teams.forEach((team) => {
        wrapper.appendChild(this.gameUI.newScoreElement("Score : " + team.name + " - ", team.name));
      });
      UIElements.push(wrapper);
      this.gameUI.addToGameUI(UIElements);
      this.context.fillStyle = "pink";
    }
    readMessage(message) {
      this.commandList.addCmdToExecute(message);
    }
    getSpeed() {
      return 0;
    }
    getAllowedMessages() {
      return this.commandList.getAllowedCmds();
    }
    loadLastGame(lastGame) {
      lastGame.teams.forEach((team) => {
        let loadedTeam = new Team(team.name, team.color, team.points);
        this.teams.push(loadedTeam);
        if (team.name === lastGame.playingTeam.name) {
          this.playingTeam = loadedTeam;
        }
      });
      if (lastGame.placedCoins.length > 0) {
        lastGame.placedCoins.forEach((coin) => {
          let team = this.teams.filter((team2) => coin.team.name === team2.getName());
          this.placedCoins.push(new Coin(coin.position, this.grid, this.context, team[0]));
        });
      }
    }
    // vérifie si 4 pieces sont alignées et de la même team (ligne, colonne ou diagonale)
    checkWinner() {
      const directions = [
        { x: 0, y: -1 },
        // haut
        { x: 1, y: -1 },
        // haut droite
        { x: 1, y: 0 },
        // droite
        { x: 1, y: 1 }
        // bas droite
      ];
      let win = false;
      let winnerTeam = null;
      this.placedCoins.forEach((coin) => {
        if (!win) {
          directions.forEach((dir) => {
            let nbCorrects = 1;
            let currentPos = {
              x: coin.position.x + dir.x,
              y: coin.position.y + dir.y
            };
            while (nbCorrects <= 4 && this.placedCoins.some((c) => c.position.x == currentPos.x && c.position.y == currentPos.y && c.team == coin.team)) {
              nbCorrects++;
              currentPos.x += dir.x;
              currentPos.y += dir.y;
            }
            if (nbCorrects >= 4) {
              win = true;
              winnerTeam = coin.team;
              return;
            }
          });
        }
      });
      return winnerTeam;
    }
    loop() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = "#0000d9";
      this.context.fillRect(
        0,
        1 * this.grid.getCellWidth(),
        this.grid.getCellWidth() * this.grid.getGridSize(),
        this.grid.getCellWidth() * this.grid.getGridSize() - 1
      );
      for (let i = this.grid.getGridSize() - 1; i > 0; i--) {
        for (let j = 0; j < this.grid.getGridSize(); j++) {
          this.context.fillStyle = "#bababa";
          this.context.beginPath();
          this.context.arc(
            (j + 0.5) * this.grid.getCellWidth(),
            (i + 0.5) * this.grid.getCellWidth(),
            50,
            0,
            2 * Math.PI
          );
          this.context.fill();
        }
      }
      if (null === this.currentCoin) {
        this.currentCoin = new Coin({ x: 0, y: 0 }, this.grid, this.context, this.playingTeam);
      } else {
        this.currentCoin.draw();
      }
      this.placedCoins.forEach((coin) => {
        coin.draw();
      });
      if (this.timer.stopWating(this.getSpeed())) {
        this.commandList.cmdToExecute.forEach((cmd) => {
          if (this.currentCoin) {
            if (cmd === "place") {
              this.place(this.currentCoin.getPosition());
              this.addPoint(this.checkWinner());
            } else {
              this.currentCoin.move(cmd);
            }
          }
        });
        this.commandList.cmdToExecute = [];
        this.storage.save(new GameSave("P4Game", this));
        this.timer.reset();
      }
    }
    place(position) {
      if (!this.grid.isCellOccupied({ x: position.x, y: position.y + 1 }) && position.y + 1 < 7) {
        for (let index = 6; index > 0; index--) {
          if (!this.grid.isCellOccupied({ x: position.x, y: index })) {
            this.currentCoin.setPosition({ x: position.x, y: index });
            break;
          }
        }
        this.placedCoins.push(this.currentCoin);
        this.currentCoin = null;
        this.setNextTeam();
      }
    }
    setNextTeam() {
      let index = this.teams.indexOf(this.playingTeam);
      this.playingTeam = this.teams[(index + 1) % this.teams.length];
    }
    addPoint(team) {
      if (team === null) {
        return;
      }
      team.addPoint(1);
      this.gameUI.setScore(team.getPoints(), team.name);
      this.setHighScore();
      this.restart(team);
    }
    setHighScore() {
      const winingTeam = this.teams.reduce(function(prev, current) {
        return prev && prev.getPoints() > current.getPoints() ? prev : current;
      });
      this.gameUI.setHighScore(new UIPoint(winingTeam.name, winingTeam.getPoints()));
    }
    restart(team) {
      this.grid.clearCells();
      this.placedCoins = [];
      if (team === this.playingTeam) {
        this.setNextTeam();
      }
    }
    reset() {
      this.grid.clearCells();
      this.storage.clear();
    }
    toggleCheat(bool = false) {
      this.cheatActivated = bool;
    }
    getCheatCommand() {
      return this.commandList.cheatCommand;
    }
  };

  // scripts/Shared/UI/GameUI.ts
  var GameUI = class {
    scoreElements = [];
    highScoreElement;
    gameLogsElement;
    leaderboardElement;
    cmdTextElement;
    gameUIElement;
    constructor() {
      this.leaderboardElement = document.querySelector("#Leaderboard" /* leaderboard */);
      this.cmdTextElement = document.querySelector("#CMDText" /* cmdText */);
      this.gameLogsElement = document.querySelector("#gameLogs" /* gameLogs */);
      this.gameUIElement = document.querySelector("#GameUI" /* gameUI */);
    }
    createLeaderboard(customLeaderboard = false) {
      this.highScoreElement = this.newScoreElement("Highscore : ", "", true);
      this.leaderboardElement.appendChild(this.highScoreElement);
      if (!customLeaderboard) {
        this.newScoreElement("Score  : ", 0);
        this.leaderboardElement.appendChild(this.scoreElements[0]);
      }
    }
    setScore(point, index) {
      index = index ?? 0;
      this.scoreElements[index].querySelector("span").innerHTML = point.toString();
    }
    setHighScore(point) {
      this.highScoreElement.querySelector("span").innerHTML = point.toString();
    }
    newScoreElement(text, index, isHighScore = false) {
      let element = document.createElement("p");
      element.classList.add("score-text");
      element.innerHTML = text;
      let child = document.createElement("span");
      child.innerHTML = "0";
      element.appendChild(child);
      if (!isHighScore) {
        this.scoreElements[index] = element;
      }
      return element;
    }
    addToLeaderboard(elements) {
      elements.forEach((element) => {
        this.leaderboardElement.appendChild(element);
      });
    }
    addToGameUI(elements) {
      elements.forEach((element) => {
        this.gameUIElement.appendChild(element);
      });
    }
    addLogEvent(message) {
      const gameLogMessageTemplate = document.querySelector(
        "#TemplateGameLogMSG" /* templateGameLogsMSG */
      );
      const logClone = gameLogMessageTemplate.content.cloneNode(true);
      let msgText = logClone.querySelector(
        ".msg-text" /* msgText */
      );
      msgText.textContent = message;
      this.gameLogsElement.prepend(logClone);
    }
  };

  // scripts/Shared/Game/GameStorage.ts
  var GameStorage = class {
    localName;
    constructor(localName) {
      this.localName = localName;
    }
    load() {
      let storage = localStorage.getItem(this.localName);
      if (storage) {
        return JSON.parse(storage);
      }
      return null;
    }
    save(save) {
      localStorage.setItem(this.localName, JSON.stringify(save));
    }
    clear() {
      localStorage.removeItem(this.localName);
    }
  };

  // scripts/Shared/RandomGameSelector.ts
  var RandomGameSelector = class {
    allowedGames = { P4Game: Game };
    currentGame;
    canvas;
    urlParams;
    gameUI;
    gameStorage;
    gameType;
    constructor(urlParams2, createNewGame = false) {
      this.canvas = document.querySelector("#GameCanvas" /* canvas */);
      this.gameStorage = new GameStorage("game");
      this.gameUI = new GameUI();
      this.urlParams = urlParams2;
      this.currentGame = createNewGame ? this.selectNewGame() : this.loadGame();
      this.gameStorage.save(new GameSave(this.gameType, this.currentGame));
    }
    getCurrentGame() {
      return this.currentGame;
    }
    loadGame() {
      let loadedGame = this.gameStorage.load();
      if (!loadedGame || !loadedGame.type) {
        return this.selectNewGame();
      } else {
        return new this.allowedGames[loadedGame.type](this.canvas, this.gameUI, this.gameStorage);
      }
    }
    selectNewGame() {
      var selectedGame = Object.keys(this.allowedGames)[Math.floor(Math.random() * Object.keys(this.allowedGames).length)];
      return new this.allowedGames[selectedGame](this.canvas, this.gameUI, this.gameStorage);
    }
  };

  // scripts/Shared/index.ts
  var urlParams = new URLSearchParams(window.location.search);
  var messageUI = new MessageUI();
  var Client2 = new tmi.Client({
    channels: ["bloubill"]
  });
  Client2.connect();
  var gameSelector = new RandomGameSelector(urlParams);
  var game = gameSelector.getCurrentGame();
  function frame() {
    game.loop();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  Client2.on("message", (channel, tags, message, self) => {
    if (self)
      return true;
    if (tags["display-name"] === "Moobot")
      return true;
    const messageCmds = Array.from(
      message.toLowerCase().matchAll(game.getAllowedMessages())
    ).flat();
    if (game.getCheatCommand().every((value, index) => value === messageCmds[index])) {
      game.toggleCheat(true);
    }
    if (messageCmds.length === 0)
      return true;
    messageCmds.forEach((message2) => {
      game.readMessage(message2);
    });
    messageUI.addMessage(message, tags);
  });
})();
