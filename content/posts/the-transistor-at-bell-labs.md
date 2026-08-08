---
title: Surface States and Gold Foil — The Transistor at Bell Labs
date: 2026-08-08
summary: Bell Labs spent two and a half years failing to build a semiconductor amplifier before a drop of electrolyte and a razor-sliced strip of gold foil produced one in December 1947 — and the thing they built was not the transistor textbooks describe.
tags:
  - semiconductors
  - bell-labs
  - history-of-technology
sources:
  - John Bardeen, Nobel Lecture, 11 December 1956 — https://www.nobelprize.org/uploads/2018/06/bardeen-lecture.pdf
  - Bardeen and Brattain, The Transistor, A Semi-Conductor Triode, Physical Review 74, 230 (1948) — https://web.archive.org/web/20240405033458/http://www.eletrica.ufpr.br/mehl/materiais/documentos/PhysRev.74.230.pdf
  - Computer History Museum, 1947 Invention of the Point-Contact Transistor — https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/
  - Computer History Museum, The Surface State Job — https://computerhistory.org/blog/the-surface-state-job/
  - Computer History Museum, 1948 Conception of the Junction Transistor — https://www.computerhistory.org/siliconengine/conception-of-the-junction-transistor/
  - Computer History Museum, 1960 MOS Transistor Demonstrated — https://www.computerhistory.org/siliconengine/metal-oxide-semiconductor-mos-transistor-demonstrated/
  - IEEE Spectrum, How the First Transistor Worked — https://spectrum.ieee.org/transistor-history
  - Hoddeson and Daitch, True Genius, chapter 8 The Transistor — https://www.nationalacademies.org/read/10372/chapter/9
  - PBS Transistorized!, Shockley's Notebook — https://www.pbs.org/transistor/background1/events/junctinv.html
  - PBS Transistorized!, The Big Announcement — https://www.pbs.org/transistor/background1/events/bigannouncement.html
  - Linda Hall Library, Scientist of the Day — The Transistor — https://www.lindahall.org/about/news/scientist-of-the-day/the-transistor/
  - Wikipedia, Point-contact transistor — https://en.wikipedia.org/wiki/Point-contact_transistor
cover: /images/the-transistor-at-bell-labs.jpg
coverAlt: Black-and-white laboratory photograph of three men in shirtsleeves and neckties at a bench strewn with wiring, one seated at centre behind a small microscope and looking up, two standing and leaning in, a rack of dials at left.
coverCaption: A staged Bell Labs publicity photograph of John Bardeen, William Shockley and Walter Brattain, from the series issued around the 1948 announcement of the transistor.
coverCredit: AT&T, via Wikimedia Commons
coverLicense: Public domain
coverSource: https://commons.wikimedia.org/wiki/File:Bardeen_Shockley_Brattain_1948.JPG
---

In the last spring of the Second World War, William Shockley sketched an amplifier that did not work. The two men he supervised spent the next two and a half years finding that the obstacle in his way was itself the effect they were hunting.

## An Amplifier That Refused to Amplify

Shockley returned to Bell Telephone Laboratories in early 1945 to organise a solid-state group hunting semiconductor replacements for the vacuum tube and the relay. That April he conceived a field-effect amplifier: make a thin slab of silicon one plate of a capacitor, put a control electrode opposite, apply a voltage. The induced charge would be mobile carriers, so the slab's conductance would swing with the control voltage, and his calculations said it would be big enough to amplify.

Bell Labs built it. Tests on evaporated films of germanium and silicon, run by Shockley with J. R. Haynes, H. J. McSkimin, W. A. Yager and R. S. Ohl, "all gave negative results".

The size of that failure is routinely overstated. Bardeen's accounting is careful: "in some cases the predicted effect was more than one thousand times the experimental limit of detection", but "perhaps a factor of 50 to 100" of that gap came from the very low mobility of electrons in evaporated films. The fabrication really was partly to blame. What survived the correction was still a shortfall no excuse covered.

## What Bardeen Found at the Surface

Bardeen started at Murray Hill on 15 October 1945, and a week later Shockley handed him the sketch and asked what was wrong with it. His first answer was that it should have worked. His second, on 19 March 1946, was better: the field was arriving, but almost none of the charge it induced was free to carry current. Electrons were trapped in states localised at the semiconductor's surface — predicted theoretically by Igor Tamm and by Shockley himself, never pinned down experimentally, and dense enough to absorb the induced charge and screen the crystal's interior.

Bardeen published the argument in *Physical Review* in 1947, and it turned the programme toward surfaces: Brattain on contact potential, Gerald Pearson on bulk properties, the physical chemist Robert Gibney on surface chemistry, the circuits man H. R. Moore on measurement.

## A Drop of Electrolyte

On 17 November 1947, Brattain and Gibney tried an electrolyte in the gap between electrode and semiconductor. Its ions piled up at the surface and created a field intense enough to punch through the surface states.

On the morning of Friday 21 November, Bardeen brought Brattain a geometry: a point contact surrounded by, but insulated from, a drop of electrolyte on p-type silicon carrying an n-type inversion layer. A voltage on the probe modulated the current reaching the contact — the first working semiconductor amplifier, with current and power gain but no voltage gain, and only up to about ten cycles per second.

That is the evening of the famous car-pool remark, not the December night it is usually pinned to. "I told my driving group that night, going home, that I felt that I had taken part in the most important experiment I had ever taken part in my life," Brattain recalled; "the next evening I had to swear them to secrecy". Germanium soon gave voltage gain too, but everything stayed too sluggish for speech.

Next they tried a metal electrode on a thin oxide. Gibney anodised a germanium surface — Brattain's notebook records it "anodized to 90 volts, electrolyte washed off in H2O and then had some gold spots evaporated on it" — but germanium's oxide dissolves in water, so the rinse took the insulator with it. They tried anyway. A reverse-biased point set very close to a spot gave an effect of the *opposite* sign: more positive spot, *more* reverse current, because the gold was injecting holes that reached the point. Bardeen called it "the first indication of the transistor effect".

## Gold Foil and a Razor Blade

The 15 December notebook entry is deflating: "When the points were very close together got voltage amp about 2 but not power amp. This voltage amplification was independent of frequency 10 to 10,000 cycles." Bardeen estimated that power gain needed the contacts about 0.005 cm apart, and proposed two closely spaced line contacts.

Brattain's realisation of that on 16 December 1947 was workshop cunning: prewar gold foil wrapped round the apex of a polystyrene wedge, slit at the tip with a razor blade, the cut filled with wax, the wedge sprung onto the germanium. The contacts ended up about 0.004 cm apart. His notebook, still in vacuum-tube language, has one point "used as a grid and the other point as a plate", the grid bias necessarily positive, and records at 1,000 cycles: "power gain 1.3 voltage gain 15 on a plate bias of about 15 volts".

A power gain of 1.3 is barely gain at all, but it was unmistakable and held up across the audio band: "I had an amplifier with the order of magnitude of 100 amplification clear up to the audio range." On 23 December, Brattain and Moore demonstrated it as a speech amplifier with a power gain of 18, and Shockley called it a magnificent Christmas present.

## How the Thing Actually Amplified

Start by discarding the textbook version. Even *The Art of Electronics* has called the junction transistor a "Nobel Prize-winning invention in 1947"; both halves are wrong. December 1947 produced the point-contact transistor, a surface device with different physics; Shockley's junction transistor was a 1948 conception Bell Labs did not announce until 1951.

The device sits on a thumb-sized slab of n-type germanium carrying a very thin p-type surface layer. A large electrode underneath is the base; the two gold contacts on top, 0.005 to 0.025 cm apart, are emitter and collector; the p-type skin over n-type bulk is a diode junction. The emitter, forward-biased by a fraction of a volt, injects holes that spread sideways through the thin layer instead of crossing the barrier. The collector, reverse-biased by 4 to 40 volts, concentrates a field at its point that gathers them; the pile-up lowers the barrier beneath it, and current flows from the base into the collector.

The collector is no passive bystander: its bias was sized "large enough to make the collector current of the same order or greater than the emitter current". And here is the real signature — the hole flow "may alter the normal current flow from the base to the collector in such a way that the change in collector current is larger than the change in emitter current". The common-base current gain exceeded one: between one and two in their published unit, two to three in production parts. No junction transistor manages that. The positive feedback that came with it is why point-contact devices show negative resistance — awkward in an amplifier, useful in a switch.

What is *not* distinctive is the wiring: signal into the emitter, output at the collector, base grounded is ordinary common-base operation, used by junction transistors too. Bardeen quoted a power gain of 20 dB or more. The inventors were partly in the dark too: R. D. Middlebrook could still write in 1957 that "the internal operation is, in fact, not yet completely understood", and Bardeen conceded that if the dominance of minority carriers "had been recognized earlier, the transistor might have come sooner".

## New Year's Eve in Chicago

Shockley's name was left off the point-contact patent entirely. Bell's attorneys had found Julius Lilienfeld's US Patent 1,745,175 — filed 8 October 1926, granted 28 January 1930 — covering a field-effect semiconductor amplifier. Rather than hand an examiner that prior art, they built the application around Bardeen and Brattain's hole injection, leaving the field effect — and Shockley — out. It issued as US Patent 2,524,035 in October 1950.

Shockley spent New Year's at Chicago's Bismarck Hotel, in town for the American Physical Society meeting, filling some thirty pages of notes that did not come together. On 23 January 1948, unable to sleep, he sat at his kitchen table and worked out the rest: a three-layer sandwich, n-p-n or p-n-p, whose thin middle layer would throttle current through the bulk.

It needed proof that injected minority carriers could cross bulk germanium rather than skate along an inversion layer. John Shive supplied it on 16 February 1948, with emitter and collector on *opposite* faces of a slab. Shockley filed that June and received US Patent 2,569,347 on 25 September 1951, months after Bell Labs announced the junction transistor.

## The Announcement Nobody Noticed

Bell Labs balloted its staff over "Semiconductor Triode", "Crystal Triode" and the unlovely "Iotatron". John R. Pierce's entry won; the 28 May 1948 memorandum explained it: "Transistor. This is an abbreviated combination of the words 'transconductance' or 'transfer', and 'varistor'."

On 30 June 1948, at Bell Labs' New York headquarters, research director Ralph Bown unveiled it beside a giant cutaway model, headphones at every seat carrying his transistor-amplified voice. It could, he said, "do just about everything a vacuum tube can do, and some unique things which a vacuum tube cannot do". *The New York Times* buried the story on 1 July in the "News of Radio" column on page 46, below items about radio programming.

Physicists understood at once. Bardeen and Brattain's letter appeared in *Physical Review* on 15 July 1948, and *Electronics* put a photograph of all three men inspecting a crystal triode on its September cover. Point-contact units stayed in production into the 1960s, and the three shared the 1956 Nobel Prize in Physics.

Shockley's 1945 idea was not wrong, only premature, and Bardeen said so in Stockholm: with better semiconductor technology, "it is now possible to make electronic amplifiers with high gain which operate on the field-effect principle." In November 1959 Mohamed Atalla and Dawon Kahng built the proof, using a thermally grown silicon-dioxide layer to tame the surface states. The oxide on Brattain's germanium had dissolved in a water rinse; silicon's does not. The field-effect transistor, the one that failed in 1945, went on to swallow the industry.
