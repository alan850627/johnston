const tone = require('tonegenerator')
const header = require('waveheader')
const fs = require('fs')

const RATE = 44100
const UNIT_TIME = 1.5 // seconds
const CONCERT_C4 = 264 // hertz
const VOLUME = tone.MAX_16
const OUT_FILE = 'out.wav'

function findBaseFrequency(noteName) {
  const pitchClass = noteName.charAt(0)
  const octave = Number(noteName.substring(1))
  const octaveMultiplier = Math.pow(2, octave-4)
  switch (pitchClass) {
    case 'c':
      return CONCERT_C4 * octaveMultiplier
    case 'd':
      return CONCERT_C4 * 9/8 * octaveMultiplier
    case 'e':
      return CONCERT_C4 * 5/4 * octaveMultiplier
    case 'f':
      return CONCERT_C4 * 4/3 * octaveMultiplier
    case 'g':
      return CONCERT_C4 * 3/2 * octaveMultiplier
    case 'a':
      return CONCERT_C4 * 5/3 * octaveMultiplier
    case 'b':
      return CONCERT_C4 * 15/8 * octaveMultiplier
  }
}

function johnstonAlteration(f, alterations) {
  while (alterations.length) {
    const alteration = alterations.charAt(0)

    switch(alteration) {
      case '#':
        f *= 25/24
        break;
      case 'b':
        f *= 24/25
        break;
      case '+':
        f *= 81/80
        break;
      case '-':
        f *= 80/81
        break;
      case 'L':
        f *= 36/35
        break;
      case '7':
        f *= 35/36
        break;
      case 'u':
        f *= 33/32
        break;
      case 'd':
        f *= 32/33
        break;
      case '1':
        f *= 65/64
        break;
      case '3':
        f *= 64/65
        break;
    }

    if (alteration === '1' || alteration === '3') {
      alterations = alterations.substring(2)
    } else {
      alterations = alterations.substring(1)
    }
  }

  return f
}


function readMusic(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const music = raw.split('\n')
  const tones = []
  for (const note of music) {
    const noteData = note.split(' ')
    tones.push(
      tone({
        freq: johnstonAlteration(findBaseFrequency(noteData[0]), noteData[1]),
        lengthInSecs: noteData[2] * UNIT_TIME,
        volume: VOLUME
      })
    )
  }
  const first = tones.shift()

  return first.concat(...tones)
}

function writeWav(filePath, samples) {
  const file = fs.createWriteStream(filePath)

  file.write(header(samples.length/RATE * samples.length, {
    bitDepth: 16
  }))

  var data = Int16Array.from(samples)

  var size = data.length * 2 // 2 bytes per sample
  if (Buffer.allocUnsafe) { // Node 5+
    buffer = Buffer.allocUnsafe(size)
  } else {
    buffer = new Buffer(size)
  }

  data.forEach(function (value, index) {
    buffer.writeInt16LE(value, index * 2)
  })

  file.write(buffer)
  file.end()
}

const samples = readMusic(process.argv[2])
writeWav(OUT_FILE, samples)
