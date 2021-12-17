# Johnston Tones

This repo contains scripts that helps me practice Ben Johnston's music.

## Usage
```bash
node index.js <music.txt>
```

Example:
```bash
node index.js chamber-symphony.txt
```

## Config
Go ahead and edit the constants in index.js. Example:
```Javascript
const RATE = 44100
const UNIT_TIME = 1.5 // seconds
const CONCERT_C4 = 264 // herts
const VOLUME = tone.MAX_16
const OUT_FILE = 'out.wav'
```

## Music Format
The music format is a simple text file. Each line is a tone. Each tone has a pitch, its alterations, and its duration separated by spaces.

Alterations are made according to Johnston's extended just intonation notation:
* #, b: raise/lower by 25/24
* +, -: raise/lower by 81/80
* L, 7: raise/lower by 36/35
* u, d: raise/lower by 33/32 (up/down arrows in notation)
* 13, 31: raise/lower by 65/64 (13 and ƐƖ in notation)

Note: Alterations are done relative to a justly tuned C major scale.
