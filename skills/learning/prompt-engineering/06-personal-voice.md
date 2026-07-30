---
name: personal-voice
description: >-
  Make all writing output match the user's own voice, calibrated from 5
  real writing samples plus their explicit rules on sentence length,
  rhythm, forbidden phrases, and tone. Has two modes: a one-time
  calibration that builds a voice profile from samples, and an
  application mode where every draft is written and verified against
  that profile. Use this skill whenever the user asks for writing "in my
  voice", "like I'd write it", "sound like me", wants to set up or
  update their voice profile, or whenever drafting anything that will be
  published or sent under the user's name (emails, posts, articles,
  bios) once a profile exists. Do NOT use to imitate the voice of any
  person other than the user, and do not use for content where a house
  style overrides personal style (legal filings, API docs).
---

# Personal Voice

Generic AI writing fails people twice: it doesn't sound like them, and
everyone who knows them can tell. Style rules alone can't fix this
because voice lives in measurable habits nobody thinks to state: how
long sentences run, where the rhythm breaks, which words never appear.
This skill extracts those habits from real samples, merges them with the
rules the user CAN state, and holds every future draft to the result.

One boundary, stated once: this skill models the user's own voice at
their request. Refuse to build a profile of another person from their
writing in order to pass as them.

## Mode selection

Check `references/voice-profile.md` in this skill's folder.

- **Exists** → application mode: read it and write to it.
- **Missing** → calibration mode: build it. Also enter calibration when
  the user asks to recalibrate or update their profile.

## Calibration mode

### 1. Collect the inputs

Ask for **5 samples of the user's real writing**, with this guidance,
because sample quality caps profile quality:

- 150+ words each where possible; short fragments hide rhythm.
- Final writing the user was happy with, not rough drafts, and not text
  heavily edited by someone else (including AI): that would calibrate
  to the editor.
- Ideally matching the contexts they'll generate in. Five LinkedIn
  posts produce a LinkedIn voice; if they want emails too, ask for at
  least one email. If all samples are one genre, say plainly that the
  profile covers that genre and will extrapolate elsewhere.

Then ask for their **explicit rules**: preferred sentence lengths,
rhythm notes, forbidden words and phrases, punctuation bans or loves,
and the tones they want available (e.g., "dry, direct, occasionally
warm; never peppy").

### 2. Analyze the samples

Measure, don't vibe. For each dimension below, extract the pattern AND
its frequency, because voice is a set of rates, not a set of features.
A signature move the user makes once per 500 words, deployed every
paragraph, turns portrait into caricature — the most common failure of
voice mimicry.

- **Sentence mechanics**: average length, range, fragment usage, how
  often a long sentence is followed by a very short one
- **Paragraph shape**: typical length, one-line paragraph usage
- **Punctuation fingerprint**: dashes, semicolons, parentheses,
  ellipses, exclamation points, oxford comma — presence and rate
- **Vocabulary register**: contraction rate, formality level, jargon
  comfort, profanity, favorite intensifiers
- **Signature moves**: how they open cold, how they close, how they
  emphasize (italics? repetition? short sentence?), humor style,
  hedging style
- **Never-list**: words and constructions absent from all samples that
  generic writing would have used (merge with the user's explicit
  forbidden list)

### 3. Reconcile rules vs. reality

Where explicit rules contradict the samples ("keep sentences short" but
samples average 24 words), don't silently pick one. Ask: "Your samples
run longer than your stated rule — match how you actually write, or
shift toward how you want to write?" Aspirational voice is a legitimate
choice; it just has to be a choice. Explicit rules win every tie the
user doesn't resolve.

### 4. Write and install the profile

Fill in `references/profile-template.md` (bundled with this skill) and
show the completed profile for approval. Include 2-3 short quoted
snippets from their samples as touchstones. After approval, save it as
`references/voice-profile.md`, keep the samples in
`references/samples/`, and if a packaging tool is available, produce an
updated `.skill` for the user to re-save so the profile travels to
every future conversation. Without the re-save, calibration dies with
the current chat — make sure the user knows this.

## Application mode

1. **Load the profile** at the start of any writing task. Load the raw
   samples from `references/samples/` only when the profile
   underdetermines something (a genre the profile is thin on, a long
   piece, a tricky tonal call) — the profile is the compression, the
   samples are ground truth.
2. **Draft in the voice from the first word.** Don't draft generically
   and then re-skin; structure and rhythm decisions happen at drafting
   time and can't be patched in afterward.
3. **Flex by register within the voice.** People sound like themselves
   differently in an email vs. an essay. Use the per-context notes in
   the profile; when writing in a context the profile doesn't cover,
   extrapolate conservatively and say you did.
4. **Verify before delivering.** Compare the draft against the profile
   numbers: sentence-length distribution in range? Any never-list word
   present? Signature moves at sample frequency, not caricature
   frequency? The test: would a colleague who reads the user's writing
   weekly pause on any sentence? Fix what fails, then deliver.
5. **Learn from corrections.** When the user edits your output or says
   "I'd never say that", that's calibration data arriving late. Append
   it to the profile's Learned Corrections section and offer to
   re-package. A correction captured once should never need repeating.

## Precedence

When this skill is active alongside generic style guidance (including
other skills), the user's voice wins conflicts. If the user genuinely
writes with em dashes or loves a word that generic advice bans, their
profile overrides the generic rule: the goal is sounding like them, not
sounding like nobody.

## Calibration failure modes

- **Too few or too-short samples**: proceed if the user insists, but
  mark the affected profile fields as low-confidence rather than
  presenting guesses as measurements.
- **Samples that contradict each other**: probably different registers,
  not noise. Profile them as separate contexts instead of averaging
  into a voice the user has never actually used.
- **The user has no samples**: offer rules-only mode — a profile built
  from explicit rules and a short interview. Honest but weaker; say so,
  and invite samples later.
