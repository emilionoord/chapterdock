(function($, jwplayer) {

  /**
   * The Chapterdock plugin.
   */
  var ChapterDock = {
  	chapterCurrent: -1,
  	chapters: [],
  	element: null,

  	// These configuration options can be overwritten.
  	config: {
    	onList: null,
    	onSelect: null,
    	timeFormat: null,
    	file: '',
    	current_title: '<b>Now playing:</b>',
    	next_title: '<b>Next chapter:</b>',
    	position: 'right' // 'left', 'right' or false.
  	},

    /**
     * Initializes the plugin.
     */
    init: function(config, jwplayer) {
      this.config = $.extend(this.config, config);

      // Process custom callbacks.
      this.onList = (config.onList || this.onList);
      this.onSelect = (config.onSelect || this.onSelect);
      this.timeFormat = (config.timeFormat || this.timeFormat);

      this.jwplayer = jwplayer;

  	  this.loadStyleSheet();

      SRT.load(this.config.file, this.parsed);
  	},

  	/**
  	 * 
  	 */
  	parsed: function(chapters) {
  		ChapterDock.chapters = chapters;
			ChapterDock.onList(chapters, ChapterDock);
			ChapterDock.theme();
  	},

  	loadStyleSheet: function() {
  	  var stylesheet = this.config.stylesheet;
      if (stylesheet == undefined) {
        $.each(this.jwplayer.config.plugins, function(path, x) {
          if (path.indexOf('chapterdock.js') > -1) {
            stylesheet = path.replace('chapterdock.js', 'chapterdock.css');
          };
        });
      };
      $('<link/>', {rel: 'stylesheet', type: 'text/css', href: stylesheet}).appendTo('head');
  	},

  	/**
  	 * 
  	 */
  	theme: function(chapters) {
      var css = {
        width: this.config.width
      };
      switch (this.config.position) {
        case 'right':
          css.position = 'absolute';
          css.left = this.jwplayer.getWidth() + 'px',
          css.top = 0;
          break;

        case 'left':
          css.position = 'absolute';
          css.left = 0,
          css.top = 0;
          break;

        default:
          break;
      };
      ChapterDock.$chapter_nav.css(css);
  	},

    /**
     * Default timeFormat callback.
     */
    timeFormat: function(time) {
      var minutes = Math.floor(time / 60);
      var seconds = (time - (minutes * 60));
      return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  	},

    /**
     * Default onList callback.
     */
    onList: function(chapters) {
      ChapterDock.$chapter_nav = $('#' + ChapterDock.jwplayer.id + '_chapterdock');

      ChapterDock.$chapter_nav
        .removeAttr('style')
        .addClass('chapterwidget')
        .append($('<div />').addClass('chaptercurrent'))
        .append($('<div />').addClass('chapterdock'));

      var first_chapter;

  		$.each(chapters, function(i, row) {
  			if (row.text != '') {

          // Set the first chapter so we can mark this on init.
          if (!first_chapter) {
            first_chapter = row;
          };

          // Set the chapters title.
          chapters[i].title = ChapterDock.config.current_title;

    			// format text for widget
    			var desc = row.text.split(SRT.linebreak); // Seperate lines again.
    			if (desc.length > 1) {
    			 desc.shift(); // Remove first element if there is more then one line.
    		  };
    			desc = desc.join(' - ').strip_tags(); // Join the lines back to text and strip HTML.

          $('<div />').attr({'class': 'chapterRow', 'data-begin': row.begin})
  		      .append($('<span />').attr('class', 'time').text(ChapterDock.timeFormat(row.begin)))
  		      .append(desc)
            .click(function() {
				      var pos = Math.floor($(this).data('begin'));
              ChapterDock.jwplayer.seek(pos);
            })
            .css('cursor', 'pointer')
            .appendTo('.chapterdock', ChapterDock.$chapter_nav);
        };
  		});

      first_chapter.title = this.config.next_title;
      console.log(first_chapter);
      this.onSelect(first_chapter);
    },

    /**
     * Default onSelect callback.
     */
    onSelect: function(data) {
  		var html = data.text ? data.title + ' ' + data.text : '';
		  $('.chapterRow', ChapterDock.$chapter_nav).removeClass('active').each(function() {
				if(data['begin'] && $(this).data('begin') == data.begin) {
					$(this).addClass('active');
				};
			});
		  $('.chaptercurrent', ChapterDock.$chapter_nav).html(html);
  	},

  	/**
  	 * 
  	 */
  	tick: function(position) {
  		var chapters = ChapterDock.chapters;
  		var found = -1;

  		for (var i = 0; i < chapters.length; i++) {
        if (chapters[i]['text'] == '') continue;
  
        if (chapters[i]['begin'] < position && (i == chapters.length-1 || chapters[i+1]['begin'] > position)) {
          found = i;
          break;
        };
  		};

  		if (found != ChapterDock.chapterCurrent) {
  			ChapterDock.chapterCurrent = found;

  			if (found > -1 ) {
  				ChapterDock.onSelect(chapters[found]);
  			}
  			else {
  				ChapterDock.onSelect({text:''});
  			};
  		};
  	}
  };

  // ===========================================================================

  /**
   * Adapted from JW players captions.srt.js.
   * follows same logic as chapterdock JW plugin
   * added beginSRT and endSRT for original time reference
   */
  var SRT = {
    captions: [],
    linebreak: "\n",

    /**
     *
     */
    load: function(url, success) {
      $.get(url, function(data) {
        SRT.captions = SRT.parse(data);
        success(SRT.captions);
      });		
    },

    /**
     *
     */
    parse: function(data) {
      var captions = [{begin:0, text:''}];

      data = data.replace(/^\s+/, '').replace(/\s+$/, '');
      var list = data.split("\r\n\r\n");

      if (list.length == 1) {
        list = data.split("\n\n");
      };

      for (var i = 0; i < list.length; i++) {
        // Parse each entry
        var entry = SRT.parseLine(list[i]);

        if (entry['text']) {
          captions.push(entry);

          // Insert empty caption at the end.
          if (entry['end']) {
            captions.push({begin:entry['end'],text:''});
            delete entry['end'];
          };
        };
      };
      return captions;
    },

    /**
     *
     */
    parseLine: function(data) {
      var entry = {};
      var array = data.split("\r\n");

      if (array.length == 1) {
        array = data.split("\n");
      };

      try {
        // Second line contains the start and end.
        var index = array[1].indexOf(' --> ');
        if (index > 0) {
          entry['begin'] = SRT.timeFormat(array[1].substr(0,index));
          entry['end'] = SRT.timeFormat(array[1].substr(index+5));
          entry['beginSRT'] = array[1].substr(0,index);
          entry['endSRT'] = array[1].substr(index+5);
        };

        // Third line starts the text.
        if (array[2]) {
          entry['text'] = array[2];

          // Arbitrary number of additional lines.
          for (var i = 3; i < array.length; i++) {
            entry['text'] += SRT.linebreak + array[i];
          };
        };
      }
      catch (error) {}
      return entry;
    },

    /**
     *
     */
    timeFormat: function(string) {
      string = string.replace(',', '.');
      var array = string.split(':');
      var number = 0;

      if (string.substr(-1) == 's') {
        number = Number(string.substr(0, string.length - 1));
      }
      else if (string.substr(-1) == 'm') {
        number = Number(string.substr(0, string.length - 1)) * 60;
      }
      else if (string.substr(-1) == 'h') {
        number = Number(string.substr(0, string.length - 1)) * 3600;
      }
      else if (array.length > 1) {
        number = Number(array[array.length - 1]);
        number += Number(array[array.length - 2]) * 60;

        if (array.length == 3) {
          number += Number(array[array.length - 3]) * 3600;
        };
      }
      else {
        number = Number(string);
      };
      return number;
    }
  };

  /**
   * Register the plugin for JWPlayer.
   */
  var plugin = function(jwplayer, config, div) {

  	/**
  	 * Acts on JW Player's 'onTime' event.
  	 * Executed constantly during video playback.
  	 */
  	function tick(evt) {
  		ChapterDock.tick(evt.position);
  	};

    /**
  	 * Act on JW Player's 'onReady' event.
  	 * Initializes the chapter navigation.
     */
    function setup(evt) {
      if (config.file) {
        ChapterDock.init(config, jwplayer);
      };
    };

    jwplayer.onReady(setup);
    jwplayer.onTime(tick);

    this.resize = function(width, height) {};
  };
  jwplayer().registerPlugin('chapterdock', '6.0', plugin);

})(jQuery, jwplayer);

/**
 *
 */
String.prototype.strip_tags = function(){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = this;
   return tmp.textContent||tmp.innerText;
};
