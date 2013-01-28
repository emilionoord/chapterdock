JW Player Chapterdock Plugin
============================

<img src="https://github.com/skilip/chapterdock/blob/master/screenshot.png?raw=true" />

Chapterdock is a JW Player plugin that can be used to display a list of chapters besides the JW Player. The chapters can be clicked individually to navigate through the video. The active chapter will be highlighted.

Requirements
------------

* [**JW Player**](http://www.longtailvideo.com/jw-player/download/) (version 6.0 or later)
* [**jQuery**](http://code.jquery.com/jquery.min.js) (version 1.0 or later)


Quick Start
-----------

1) Download and extract the latest [JW Player](http://www.longtailvideo.com/jw-player/download/).
2) Download [jQuery](http://code.jquery.com/jquery.min.js).
3) Download and extract the JW Player 6 version of the [Chapterdock plugin](https://github.com/skilip/chapterdock/archive/jwplayer-6.zip).
4) Place the files in a logical structure.

**Example:**

    /jwplayer.flash.swf
    /jwplayer.html5.js
    /jwplayer.js
    /README.html
    /chapterdock/chapterdock.css
    /chapterdock/chapterdock.js
    /chapterdock/chapterdock.swf
    /chapterdock/chapters.srt
    /chapterdock/example.html
    /chapterdock/README.md
    /jquery.min.js

5) Create a directory 'uploads' and make sure you have placed a video file and screenshot image in the uploads directory.

**Example:**

    /uploads/example.jpg
    /uploads/example.mp4

6) Open /chapterdock/example.html in your browser.


Configuration
-------------

There are a few configuration options:

  * **file** - The path or URL to the SRT chapterlist.
  * **next_title (<b>Next chapter:</b>)** - The text to display before the next chapter.
  * **current_title (<b>Now playing:</b>)** - The text to display before the currently playing chapter.
  * **position (right)** - The position of the chapterdoch relative to the player (left, right or false).
  * **timeFormat (ChapterDock.timeFormat())** - With this callback you can overwrite the time format of the chapterdock.
  * **onList (ChapterDock.onList())** - This callback is triggered when the JWplayer has been initialized and the chapterlist SRT file has been loaded. It will process the chapters from the SRT file and will create the markup for the chapterdock.
  * **onSelect (ChapterDock.onSelect())** - This callback is triggered when the user clicks a chapter in the chapterdock and is used to update the markup with the current chapter information.
