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

5) Create a chapters SRT file.

**Example:**
    
    1
    00:00:01,000 --> 00:00:30,000
    <i>Chapter:</i>
    <b>Chapter 1</b>
    Intro
    
    2
    00:00:30,000 --> 00:01:00,000
    <i>Chapter:</i>
    <b>Chapter 2</b>
    Some description

6) Bring it all together &#9774;

**Example:**
See [example.html](https://github.com/skilip/chapterdock/blob/master/example.html) for an example of how to use the plugin.
    

Configuration
-------------

There are a few configuration options:

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>file</strong></td>
      <td></td>
      <td>The path or URL to the SRT chapterlist.</td>
    </tr>
    <tr>
      <td><strong>next_title</strong></td>
      <td>&lt;b&gt;Next chapter:&lt;/b&gt;</td>
      <td>The text to display before the next chapter.</td>
    </tr>
    <tr>
      <td><strong>current_title</strong></td>
      <td>&lt;b&gt;Now playing:&lt;/b&gt;</td>
      <td>The text to display before the currently playing chapter.</td>
    </tr>
    <tr>
      <td><strong>position</strong></td>
      <td>right</td>
      <td>The position of the chapterdoch relative to the player (left, right or false).</td>
    </tr>
    <tr>
      <td><strong>timeFormat</strong></td>
      <td>ChapterDock.timeFormat()</td>
      <td>With this callback you can overwrite the time format of the chapterdock.</td>
    </tr>
    <tr>
      <td><strong>onList</strong></td>
      <td>ChapterDock.onList()</td>
      <td>This callback is triggered when the JWplayer has been initialized and the chapterlist SRT file has been loaded. It will process the chapters from the SRT file and will create the markup for the chapterdock.</td>
    </tr>
    <tr>
      <td><strong>onSelect</strong></td>
      <td>ChapterDock.onSelect()</td>
      <td>This callback is triggered when the user clicks a chapter in the chapterdock and is used to update the markup with the current chapter information.</td>
    </tr>
  </tbody>
</table>
