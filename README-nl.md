JW Player Chapterdock Plugin
============================

<img src="https://raw.github.com/skilip/chapterdock/jwplayer-6/screenshot.png" />

Chapterdock is een JW Player plugin die gebruikt kan worden om een lijst met hoofdstukken weer te geven naast de JW Player. De hoofdstukken kunnen afzonderlijk aangeklikt worden om tussen de video’s te navigeren. Het actieve hoofdstuk wordt dan uitgelicht weergegeven.

Minimale eisen
--------------

* [**JW Player**](http://www.longtailvideo.com/jw-player/download/) (versie 6.0 of later)
* [**jQuery**](http://code.jquery.com/jquery.min.js) (versie 1.0 of later)


Snel beginnen
-------------

1. Download en extraheer de laaste versie van [JW Player](http://www.longtailvideo.com/jw-player/download/).
2. Download [jQuery](http://code.jquery.com/jquery.min.js).
3. Download en extraheer de JW Player 6 versie van de [Chapterdock plugin](https://github.com/tweedekamer/chapterdock/archive/jwplayer-6.zip).
4. Plaats de bestanden in een logische structuur.

    **Voorbeeld:**

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

5. Maak een SRT hofdstukken bestand en noem het 'chapters.srt'.

    **Voorbeeld:**

        1
        00:00:01,000 --> 00:00:30,000
        <i>Hoofdstuk:</i>
        <b>Hoofdstuk 1</b>
        Inleiding
        
        2
        00:00:30,000 --> 00:01:00,000
        <i>Hoofdstuk:</i>
        <b>Hoofdstuk 2</b>
        Een beschrijving

6. Breng alles samen.

    **Voorbeeld:**
    
        jwplayer("myElement").setup({
      	  file: "http://content.bitsontherun.com/videos/lWMJeVvV-364767.mp4",
          image: "http://www.longtailvideo.com/content/images/jw-player/lWMJeVvV-876.jpg",
          primary: 'html5',
          plugins: {
            'chapterdock.js': {
              file: 'chapters.srt',
              position: 'left',
              next_title: '<i>Next in line...</i>',
              timeFormat: function(time) {
                // Your logic here...
              },
            }
          }
        });

Configuratie
-------------

Er zijn een aantal configuratie opties:

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
      <td><strong>file (required)</strong></td>
      <td></td>
      <td>Het pad of de URL naar de SRT hoofdstukkenlijst.</td>
    </tr>
    <tr>
      <td><strong>next_title</strong></td>
      <td>&lt;b&gt;Next chapter:&lt;/b&gt;</td>
      <td>De tekst die weergegeven moet worden voor het nieuwe hoofdstuk.</td>
    </tr>
    <tr>
      <td><strong>current_title</strong></td>
      <td>&lt;b&gt;Now playing:&lt;/b&gt;</td>
      <td>De tekst die weergegeven moet worden voor het hoofdstuk dat nu afgespeeld wordt.</td>
    </tr>
    <tr>
      <td><strong>position</strong></td>
      <td>right</td>
      <td>De positie van de chapterdock ten opzichte van de speler ('left', 'right' of false).</td>
    </tr>
    <tr>
      <td><strong>timeFormat</strong></td>
      <td>ChapterDock.timeFormat()</td>
      <td>Met deze functie kun je het datumformaat van de chapterdock overschrijven.</td>
    </tr>
    <tr>
      <td><strong>onList</strong></td>
      <td>ChapterDock.onList()</td>
      <td>Deze functie wordt aangeroepen op het moment wanneer de JW Player geladen is en het SRT bestand van de JW Player geladen is. Het verwerkt de hoofdstukken van het SRT bestand en genereert de HTML voor de chapterdock.</td>
    </tr>
    <tr>
      <td><strong>onSelect</strong></td>
      <td>ChapterDock.onSelect()</td>
      <td>Deze functie wordt aangeroepen wanneer de gebruiker een hoofdstuk in de chapterdock aanklikt en wordt gebruikt om de HTML bij te werken met informatie over het huidige hoofdstuk.</td>
    </tr>
  </tbody>
</table>
