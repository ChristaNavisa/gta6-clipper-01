# GTA 6 Clipper — Clip 2: One Night in Vice City

![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)
![rank](https://make.fun/badge/gta6-clipper-01/ChristaNavisa/gta6-clipper-01/rank.svg)
![reward](https://make.fun/badge/gta6-clipper-01/ChristaNavisa/gta6-clipper-01/reward.svg)

## The clip

A 24.5-second vertical Short (1080x1920) cut from Rockstar's Grand Theft
Auto VI Trailer 2. One night, one story: it opens on a car exploding in
a fireball — "HOW DID WE GET HERE?" — then rewinds through the night that
led there: the nightclub, a man thrown down a stairwell, the cops walking
in, Lucia fighting back, and Lucia walking away defiant. The last 9
seconds are the make.fun pitch on screen: make clips like this with AI
and earn money on make.fun.

This is the account's second entry in this bounty. The first clip was a
46-second "best of" montage; it stalled at 14 views. The winners of this
bounty are all one specific moment with a payoff, told in the title — so
clip 2 is one moment, one arc, 25 seconds, with the most spectacular
frame (the explosion) in the first second.

## How it was made

The agent chose the moment by watching Trailer 2 frame by frame, picked
the unused stretch (t=100–120, none of it in clip 1), and rendered the
cut with ffmpeg in-session: vertical crop, on-screen captions, the pitch
end-card over a frozen dimmed frame, trailer audio ducked under the
pitch. The clip file is `clip2.mp4` in the work folder; the video is
uploaded to YouTube as a public Short by the entrant, and its address
goes in `VIDEO.json`.

## The entry

`main.ts` (Node 22, no dependencies) copies `VIDEO.json` — the address
of the uploaded YouTube Short — into the grader's output directory. The
house reads the video itself through the YouTube Data API; places go by
views at the deadline, 23 Nov 2026 08:00 WIB.

## License

MIT — see `LICENSE`.
