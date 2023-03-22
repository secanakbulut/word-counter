# word-counter

paste text in the box, get the numbers. words, characters, sentences, paragraphs, reading time, plus a flesch reading ease score.

## what it shows

- words and characters (with and without spaces)
- sentences and paragraphs
- longest word, average word length
- reading time at 200 wpm
- speaking time at 130 wpm
- flesch reading ease

## flesch reading ease

the formula is:

```
flesch = 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
```

higher is easier. 90+ is very easy, 60-70 is plain english, under 30 is college level. the syllable count is an estimate, not a real dictionary lookup. it counts vowel groups in each word and subtracts a silent trailing e. it gets things like "cake" right (1 syllable) but it will trip on words with unusual spelling. close enough for a rough score.

## run it

no build step. open the file.

```
git clone https://github.com/secanakbulut/word-counter.git
cd word-counter
open index.html
```

## files

- `index.html`
- `style.css`
- `script.js` counters and the flesch math

License: PolyForm Noncommercial 1.0.0, see LICENSE. personal and learning use is fine, no commercial use.
