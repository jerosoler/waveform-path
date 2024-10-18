[![npm](https://img.shields.io/npm/v/waveform-path?color=green)](https://www.npmjs.com/package/waveform-path)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/waveform-path)
[![GitHub license](https://img.shields.io/github/license/jerosoler/waveform-path)](https://github.com/jerosoler/waveform-path/blob/master/LICENSE)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fjerosoler)](https://twitter.com/jerosoler)

# waveform-path

![Logo](https://github.com/jerosoler/waveform-path/raw/master/docs/waveform-logo-with-examples.png)

[LIVE DEMO WITH EXAMPLES](https://jerosoler.github.io/waveform-path/)

Simple library to custom waveforms.

# Install 
## NPM
```bash
npm install waveform-path -s
```

## Download 
Download the last realease of repo and copy waveform-path.es.js from dist folder.


# How to use
```javascript
<script type="module">
    import { getAudioData, linearPath, polarPath } from "waveform-path";

    async function AudioPath(file) {
        const audioData = await getAudioData(file);

        const pathLogo = linearPath(audioData,{ samples: 100,  type: 'steps', top: 20 });
        document.querySelector("#logo path").setAttribute('d', pathLogo);

    }
    AudioPath("hello_world.ogg");
</script>
```


## Linear Options
Option | Default | Description
--- | --- | ---
channel | 0 | Channel audio for generate wave
samples | length | Length of the data
height | 100 | Height of path
width | 800	| Width of path
top	| 0 | Top margin from path to svg
left | 0 | Left margin from path to svg
type | 'steps' | 'steps', 'mirror' or 'bars'
paths | [{d:'Q', sx: 0, sy:0, x: 50, y: 100, ex:100, ey:0}] | Array of commands to create the path.
animation | false | To create animations, paths separated by commas
animationframes | 10 | Frames per second of the animation
normalize | true | Normalize audio to adjust waveform


## Linear Path Options
```javascript
// Lineto
{d:'L', sx: 0, sy:0, ex:50, ey:100 }

// Horitzontal
{d:'H', sx:10, y:90, ex:90}

// Vertical
{d:'V', sy:0, x:0, ey:100}

// Cubic Bézier Curve - Not 100%
{d:'C', sx: 0, sy:0, x: 100, y: 100, ex:100, ey:0 },

// Quadratic Bézier Curve
{d:'Q', sx: 0, sy:0, x: 50, y: 100, ex:100, ey:0}

// Arc
{d:'A', sx: 0, sy:100,  ex:100, ey:100, rx:10, ry: 10, angle: 180, arc: 1, sweep: 1}

// Z - Close Path no parameters
{d:'Z'}

sx = start % x position
x = center % x position
ex = end % x position

sy = start % y position
y = center % y position
ey = end % y position

These three extra options can be added:
minshow: 0.2  // Values 0 to 1 - Default 0
maxshow: 1 // Values 0 to 1 - Default 1
normalize: true // Normalize value y to 1. - Default false
Example: 
{d:'H', sx:10, y:90, ex:90, minshow: 0.4, maxshow: 0.6, normalize: true} // Only for y > 0.4 && y < 0.6

For arc view: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
```


## Polar Options
Option | Default | Description
--- | --- | ---
channel | 0 | Channel audio for generate wave
samples | length | Length of the data
distance | 50 | Distance from center
length | 100 | Length of wave
top | 0 | Top margin from path to svg
left | 0 | Left margin from path to svg
type | 'steps' | 'steps', 'mirror' or 'bars'
startdeg | 0 | Where do you start drawing. To make it natural, 0 is equivalent to north.
enddeg | 360 | Where do you end drawing
invertdeg | false | Reverse the direction of the degrees
invertpath | false | Reverse the path vertically
paths | [{d:'Q', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0}] | Array of commands to create the path.
animation | false | To create animations, paths separated by commas
animationframes | 10 | Frames per second of the animation
normalize | true | Normalize audio to adjust waveform


## Polar Path Options
```javascript
// Lineto
{d:'L', sdeg:0, sr:0,  edeg:100, er:100 },

// Cubic Bézier Curve - Not 100%
{d:'C', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0}

// Quadratic Bézier Curve
{d:'Q', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0}

// Arc
{d:'A', sdeg:80, sr:0, edeg: 0, er:0, rx: 100, ry: 100, angle: 100, arc: 0, sweep: 1 },

// Z - Close Path no parameters
{d:'Z'}

sdeg = start % deg position
deg = center % deg position
edeg = end % deg position

sr = start % radius position
r = center % radius position
er = end % radius position

These three extra options can be added:
minshow: 0.2  // Values 0 to 1 - Default 0
maxshow: 1 // Values 0 to 1 - Default 1
normalize: true // Normalize value radius to 1. - Default false
Example: 
{d:'Q', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0, minshow: 0.4, maxshow: 0.6, normalize: true} // Only for y > 0.4 && y < 0.6

For arc view: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
```

