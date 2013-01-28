JW Player Chapterdock Plugin
============================

Chapterdock is a JW Player plugin that can be used to display a list of chapters besides the JW Player. The chapters can be clicked individually to navigate through the video. The active chapter will be highlighted.

Quick Start
-----------

1) Download the latest JW Player here: http://www.longtailvideo.com/jw-player/download/.

2) Download jQuery here: http://code.jquery.com/jquery.min.js.

3) Download the JW Player 6 version of the Chapterdock plugin here: https://github.com/skilip/chapterdock/archive/jwplayer-6.zip.

4) Extract the JW Player and the JW Player Chapterdock plugin and place the files in a logical structure.

Example: 
  * /jwplayer.flash.swf
  * /jwplayer.html5.js
  * /jwplayer.js
  * /README.html
  * /chapterdock/chapterdock.css
  * /chapterdock/chapterdock.js
  * /chapterdock/chapterdock.swf
  * /chapterdock/chapters.srt
  * /chapterdock/example.html
  * /chapterdock/README.md
  * /jquery.min.js

5) Create a directory 'uploads' and make sure you have placed a video file and screenshot image in the uploads directory.

Example:
  * /uploads/example.jpg
  * /uploads/example.mp4

6) Open /chapterdock/example.html in your browser.


First Launch
------------

Upon your first launch of Hubble, you will see a screen like below
<img src="https://raw.github.com/jaymedavis/hubble/master/screenshots/empty-dashboard.png" />

Hubble currently supports the following post fields:
* **column** - 0, 1, etc... defines which column the data goes in. (max columns are defined in config.coffee)
* **label**  - the name of the data point to be displayed in the console
* **value**  - the value of the data point
* **high**   - only works with numbers. this is the over-the-threshold amount (the number will display as configured in config.coffee [red])
* **low**    - only works with numbers. this is the below-the-threshold amount (the number will display as configured in config.coffee [also red])

Now it's time to give it some data! Since we configured it to have two columns, lets put some data in each. 

Let's post how many front end and back end servers we have running. If we go under 3, we want it to display the color of the _low_ threshold (red). Let's also post some other random data.

```
curl --data "column=0&label=Server%20Front%20Ends&value=4&low=3" http://localhost:9999/ 
curl --data "column=1&label=Server%20Back%20Ends&value=2&low=3"  http://localhost:9999/

curl --data "column=0&label=Front%20End%20Requests&value=27,617" http://localhost:9999/ 
curl --data "column=1&label=Back%20End%20Requests&value=37,209"  http://localhost:9999/ 

curl --data "column=0&label=Active%20Users&value=176" http://localhost:9999/
curl --data "column=1&label=Active%20Users&value=200" http://localhost:9999/

curl --data "column=0&label=Coolest%20Dashboard&value=Hubble"  http://localhost:9999/
curl --data "column=0&label=Coffee%20Drank%20Today&value=5&high=4" http://localhost:9999/
```
After adding some data, setting some thresholds, the dashboard will now look like below

<img src="https://raw.github.com/jaymedavis/hubble/master/screenshots/somedata-dashboard.png" />
