﻿var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * Ion.Sound
 * version 2.1.3 Build 47
 * © 2014 Denis Ineshin | IonDen.com
 *
 * Project page:    http://ionden.com/a/plugins/ion.sound/en.html
 * GitHub page:     https://github.com/IonDen/ion.sound
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */

var ion = ion || {};

(function (ion) {

    var warn = function (text) {
        if (text && console) {
            if (console.warn && typeof console.warn === "function") {
                console.warn(text);
            } else if (console.log && typeof console.log === "function") {
                console.log(text);
            }
        }
    };

    if (ion.sound) {
        warn("ion.sound already exists!");
        return;
    }

    if (typeof Audio !== "function" && typeof Audio !== "object") {
        var func = function () {
            warn("HTML5 Audio is not supported in this browser");
        };
        ion.sound = function () {};
        ion.sound.play = func;
        ion.sound.stop = func;
        ion.sound.destroy = func;
        func();
        return;
    }



    var Sound,
        is_iOS = /iPad|iPhone/.test(navigator.appVersion),
        global_sound,
        settings = {},
        sounds = {},
        sounds_num,
        ext,
        i;



    if (is_iOS) {

        Sound = function (options) {
            this.name = options.name;
            this.loop = false;
            this.paused = false;
            this.sound = null;
            this.callback = null;
        };

        Sound.prototype = {
            init: function () {
                this.sound = global_sound;
            },

            play: function (obj) {
                if (!obj) {
                    obj = {};
                }

                if (obj.loop) {
                    if (this.paused) {
                        this._playLoop(this.loop + 1);
                    } else {
                        this._playLoop(obj.loop);
                    }
                } else {
                    this.loop = false;
                    this._play();
                }

                if (obj.onEnded && typeof obj.onEnded === "function") {
                    this.callback = obj.onEnded;
                }
            },

            _play: function () {
                if (this.paused) {
                    this.paused = false;
                } else {
                    try {
                        this.sound.currentTime = 0;
                    } catch (e) {}
                }

                this.sound.removeEventListener("ended");
                this.sound.addEventListener("ended", this._ended.bind(this), false);
                this.sound.src = settings.path + this.name + ext;
                this.sound.load();
                this.sound.play();
            }
        }

    } else {

        Sound = function (options) {
            this.name = options.name;
            this.volume = settings.volume || 0.5;
            this.preload = settings.preload ? "auto" : "none";
            this.loop = false;
            this.paused = false;
            this.sound = null;
            this.callback = null;

            if ("volume" in options) {
                this.volume = +options.volume;
            }

            if ("preload" in options) {
                this.preload = options.preload ? "auto" : "none"
            }
        };

        Sound.prototype = {
            init: function () {
                this.sound = new Audio();
                this.sound.src = settings.path + this.name + ext;
                this.sound.load();
                this.sound.preload = this.preload;
                this.sound.volume = this.volume;

                this.sound.addEventListener("ended", this._ended.bind(this), false);
            },

            play: function (obj) {
                if (!obj) {
                    obj = {};
                }

                if (obj.volume || obj.volume === 0) {
                    this.volume = +obj.volume;
                    this.sound.volume = this.volume;
                }

                if (obj.loop) {
                    if (this.paused) {
                        this._playLoop(this.loop + 1);
                    } else {
                        this._playLoop(obj.loop);
                    }
                } else {
                    this.loop = false;
                    this._play();
                }

                if (obj.onEnded && typeof obj.onEnded === "function") {
                    this.callback = obj.onEnded;
                }
            },

            _play: function () {
                if (this.paused) {
                    this.paused = false;
                } else {
                    try {
                        this.sound.currentTime = 0;
                    } catch (e) {}
                }

                this.sound.play();
            }
        };

    }

    Sound.prototype._playLoop = function (loop) {
        if (typeof loop === "boolean") {
            // FF 3.6 and iOS,
            // sound.loop = true not supported or buggy
            this.loop = 9999999;
            this._play();
        } else if (typeof loop === "number") {
            this.loop = loop - 1;
            this._play();
        }
    };

    Sound.prototype._ended = function () {
        if (this.loop > 0) {
            this.loop -= 1;
            this._play();
        }

        if (this.callback) {
            this.callback(this.name);
        }
    };

    Sound.prototype.pause = function () {
        this.paused = true;
        this.sound.pause();
    };

    Sound.prototype.stop = function () {
        this.loop = false;
        this.sound.pause();

        try {
            this.sound.currentTime = 0;
        } catch (e) {}
    };

    Sound.prototype.destroy = function () {
        this.stop();
        this.sound.removeEventListener("ended", this._ended.bind(this), false);
        this.sound.src = "";
        this.sound = null;
    };



    var checkSupport = function () {
        global_sound = new Audio();

        var can_play_mp3 = global_sound.canPlayType('audio/mpeg'),
            can_play_ogg = global_sound.canPlayType('audio/ogg'),
            can_play_aac = global_sound.canPlayType('audio/mp4; codecs="mp4a.40.2"');

        if (is_iOS) {

            if (can_play_mp3 === "probably") {
                ext = ".mp3";
            } else if (can_play_aac === "probably") {
                ext = ".aac";
            } else if (can_play_mp3 === "maybe") {
                ext = ".mp3";
            } else if (can_play_aac === "maybe") {
                ext = ".aac";
            }

        } else {

            if (can_play_mp3 === "probably") {
                ext = ".mp3";
            } else if (can_play_ogg === "probably") {
                ext = ".ogg";
            } else if (can_play_mp3 === "maybe") {
                ext = ".mp3";
            } else if (can_play_ogg === "maybe") {
                ext = ".ogg";
            } else {
                ext = ".wav";
            }

        }
    };

    var createSound = function (obj) {
        sounds[obj.name] = new Sound(obj);
        sounds[obj.name].init();
    };

    ion.sound = function (options) {
        settings = JSON.parse(JSON.stringify(options));
        settings.path = settings.path || "";
        settings.volume = settings.volume || 0.5;
        settings.preload = settings.preload || false;
        settings.mix = settings.mix || true;

        sounds_num = settings.sounds.length;

        if (!sounds_num) {
            warn("No sound-files provided!");
            return;
        }

        checkSupport();

        for (i = 0; i < sounds_num; i++) {
            createSound(settings.sounds[i]);
        }
    };

    ion.sound.version = "2.1.3";

    ion.sound.play = function (name, options) {
        if (sounds[name]) {
            sounds[name].play(options);
        }
    };

    ion.sound.pause = function (name) {
        if (name && sounds[name]) {
            sounds[name].pause();
        } else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i)) {
                    continue;
                }
                if (sounds[i]) {
                    sounds[i].pause();
                }
            }
        }
    };

    ion.sound.stop = function (name) {
        if (name && sounds[name]) {
            sounds[name].stop();
        } else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i)) {
                    continue;
                }
                if (sounds[i]) {
                    sounds[i].stop();
                }
            }
        }
    };

    ion.sound.destroy = function (name) {
        if (name && sounds[name]) {
            sounds[name].destroy();
            sounds[name] = null;
        } else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i)) {
                    continue;
                }
                if (sounds[i]) {
                    sounds[i].destroy();
                    sounds[i] = null;
                }
            }
        }
    };

} (ion));


}
/*
     FILE ARCHIVED ON 11:39:50 Oct 27, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:12:12 Dec 20, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 74.541
  exclusion.robots: 0.095
  exclusion.robots.policy: 0.082
  cdx.remote: 0.076
  esindex: 0.011
  LoadShardBlock: 41.578 (3)
  PetaboxLoader3.datanode: 55.306 (5)
  load_resource: 151.494 (2)
  PetaboxLoader3.resolve: 71.58 (2)
*/