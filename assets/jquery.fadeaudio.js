var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
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

/*
/*
 * jQuery FadeAudio
 *
 * Simplified BSD License (@see License)
 * @author        Keith Collins
 * @copyright     (c) 2012 Keith Collins
 * @version 0.0.1
 * @requires jQuery
 */
(function( $ ){
	var defaults = {
		fade_in_start: 0,
		fade_in_interval: 200,
		fade_out_start: 50,
		fade_out_interval: 200,
		step : 0.02,
	};
		
	var methods = {
    init : function( options ) { 
			// get audio element
			var $audio = this,
				$this = $(this),
				data = $this.data('audioshow');
			// merge settings, options, defaults
			var settings = $.extend(true, {}, defaults);
			if (typeof options === 'object') {
				$.extend(true, settings, options);
			};
			// namespace data into one object literal (data)
			$audio.data('fadeaudio', {
				target : $(this),
				settings : settings,
			});
			// get going
			$audio.fadeaudio('_fadeAudio');					
		},
		
		/* fade audio in or out */
		
		_fadeAudio: function() {
			var $this = this,
				data = this.data('fadeaudio'),
				audioElement = this.get(0);
							
			// this runs every second that the audio is playing
			
			$(audioElement).on('timeupdate', function() {
		    
		    // if time comes to fade_in_start time, do fadeIn 		    
		    
		    console.log(audioElement.volume);
		    
		    if (Math.floor(audioElement.currentTime) == data.settings.fade_in_start) {
		      
		      // set vol to 0 for fadeIn
		      audioElement.volume = 0;
		      var vol = 0;
		      var interval = data.settings.fade_in_interval;
          var intervalID = setInterval(function() {
	        	
	        	// Increase volume by step as long as it is below 1
	        
		        if (vol < 1) {
		            vol += data.settings.step;
		        
		            // limit to 2 decimal places
	              audioElement.volume = vol.toFixed(2);
		        
		        } else {
		            
		            // Stop firing interval when 1 is reached
		            clearInterval(intervalID);
		        
		        }
          }, interval);
		    }
		    
		    // if time comes to fade_out_start time, do fadeOut
		    
		    if (Math.floor(audioElement.currentTime) == data.settings.fade_out_start) {
		      
		      // set vol to 1 for fadeOut
		      audioElement.volume = 1;
		      var vol = 1;
		      var interval = data.settings.fade_out_interval;
          var intervalID = setInterval(function() {
	        	
	        	// Decrease volume by step as long as it is above 0
	        
		        if (vol > 0) {
		            vol -= data.settings.step;
		        
		            // limit to 2 decimal places
	              audioElement.volume = vol.toFixed(2);
		        
		        } else {
		            
		            // Stop firing interval when 0 is reached
		            clearInterval(intervalID);
		        
		        }
          }, interval);
		    }
		    
			});
		},
	};
	$.fn.fadeaudio = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.fadeaudio' );
	    }    	
    };
})( jQuery );

}
/*
     FILE ARCHIVED ON 09:07:47 Oct 27, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:12:13 Dec 20, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 217.21
  exclusion.robots: 0.156
  exclusion.robots.policy: 0.14
  cdx.remote: 0.099
  esindex: 0.014
  LoadShardBlock: 146.97 (3)
  PetaboxLoader3.datanode: 201.802 (5)
  load_resource: 284.503 (2)
  PetaboxLoader3.resolve: 102.376 (2)
*/