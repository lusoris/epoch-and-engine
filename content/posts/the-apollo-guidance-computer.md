---
title: How the Apollo Guidance Computer Survived Its Own Overload
date: 2026-08-08
summary: Two kilowords of erasable core, thirty-six kilowords woven by hand into copper wire, and a scheduler that could throw away its own work mid-descent — why the 1202 alarms over the Sea of Tranquility were survivable.
tags:
  - apollo-program
  - computing-history
  - software-engineering
sources:
  - Don Eyles, Tales from the Lunar Module Guidance Computer (AAS 04-064) — https://www.doneyles.com/LM/Tales.html
  - NASA, Apollo 11 Lunar Surface Journal — The First Lunar Landing — https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.landing.html
  - NASA Oral History Project, Richard Koos, 24 August 2023 — https://www.nasa.gov/wp-content/uploads/2025/08/koosrh-8-24-23.pdf
  - MIT News, Behind the scenes of the Apollo mission at MIT — https://news.mit.edu/2019/behind-scenes-apollo-mission-0718
  - Donald C. Fraser, NAE Memorial Tribute to J. Halcombe Laning — https://wehackthemoon.com/sites/default/files/2019-05/Laning%20Tribute%20-%20Don%20Fraser.pdf
  - Smithsonian National Air and Space Museum, Computer, Guidance and Navigation, Apollo (Block I) — https://airandspace.si.edu/collection-objects/computer-guidance-and-navigation-apollo/nasm_A19720342000
  - Ken Shirriff, Software woven into wire — core rope and the Apollo Guidance Computer — https://www.righto.com/2019/07/software-woven-into-wire-core-rope-and.html
  - Ken Shirriff, A computer built from NOR gates — inside the Apollo Guidance Computer — https://www.righto.com/2019/09/a-computer-built-from-nor-gates-inside.html
  - NASA, Apollo Era Hero John "Jack" Garman Dies — https://www.nasa.gov/image-article/apollo-era-hero-john-jack-garman-dies/
cover: /images/the-apollo-guidance-computer.jpg
coverAlt: A gold-anodised rectangular Apollo Guidance Computer chassis rests on a pale blue background beside its DSKY unit, which shows a numeric keypad, VERB and NOUN keys, dark register windows and status lamps including RESTART and GIMBAL LOCK.
coverCaption: The Apollo Guidance Computer chassis and its display-and-keyboard unit, the DSKY, whose status panel included a lamp marked simply RESTART.
coverCredit: NASA, via Wikimedia Commons
coverLicense: Public domain
coverSource: https://commons.wikimedia.org/wiki/File:Agc_view.jpg
---

## A Machine You Could Not Patch

Charles Stark Draper's Instrumentation Laboratory at MIT signed the first contract NASA awarded for the Apollo program, in 1961. The Block I Apollo Guidance Computer was built by Raytheon around about 4,000 integrated circuits supplied mainly by Fairchild Semiconductor; it flew on three uncrewed Apollo tests between August 1966 and April 1968. The Block II machine that went to the Moon was a sealed, gold-anodised box about six inches by one foot by two feet, weighing seventy pounds and drawing fifty-five watts, its 2.048 MHz oscillator halved to a 1.024 MHz processor clock.

The memory is what stops people: 2,048 words of erasable magnetic core and 36,864 of fixed memory, each fifteen bits plus a parity bit — about four kilobytes of read-write storage and seventy-two of program. Don Eyles, who wrote much of the landing software, put it in a line: "we landed on the moon with 152 Kbytes of onboard computer memory," counting both spacecraft.

The erasable memory was rationed register by register. The fixed memory imposed something stranger than a size limit: a calendar.

## Thirty-Six Kilowords, Woven by Hand

The AGC's programs lived in core rope, which turned software into textile. A wire threaded through a small ferrite core read as a one; the same wire routed around the outside read as a zero. Nothing was magnetised into the core — the value *was* the geometry of the wiring. The cores were large, about 0.249 inches across, each carrying up to 192 wires through its aperture: twelve sixteen-bit words per core. Five hundred and twelve cores made a six-kiloword module; six modules gave the flight program its 36,864 words, at roughly 1,500 bits per cubic inch.

It was woven at Raytheon's plant in Waltham, Massachusetts, largely by women recruited for manual dexterity from the local textile trade and the Waltham Watch Company. A module took half a mile of wire, eight weeks and $15,000. Engineers called it LOL memory, for "little old ladies" — a nickname that has aged badly and which, as Ken Shirriff notes, erases the women of colour who wove ropes alongside them.

A change to the flight program was not a recompile but a new physical object: code froze months before launch.

## Laning's Bargain

The harder problem was not fitting the program into 36K. It was making a frozen program safe against situations nobody had imagined.

The answer began with J. Halcombe Laning — born in Kansas City, Missouri, in February 1920, an MIT doctorate in 1947, and a career spent entirely at the Instrumentation Laboratory. With Neal Zierler he produced the first algebraic compiler, which he named George, as in "let George do it," and which Donald Fraser dates into operation on MIT's Whirlwind in 1952; IBM sent a team to talk to Laning and used what it learned in developing Fortran. He published almost none of it.

The Apollo Executive was not a time-slicer. It kept a queue of prioritised jobs, always ran the highest-priority one available, and suspended a running job where it stood when a more important one arrived. That, Eyles wrote, "gave the illusion that jobs ran simultaneously" while enhancing "reliability, safety, flexibility of use, and especially ease of development."

Working storage was small: eight "core sets" of twelve fifteen-bit registers for job state, and five "vector accumulator" areas of forty-three registers for interpretive-language jobs. Asked for a core set and having none, the Executive lit the program alarm, stored code 1202, and jumped to a routine named BAILOUT; out of VAC areas gave 1201. The retelling usually inverts this: the computer did not run out of memory. It ran out of *time*, and so out of scheduler slots — the big navigation job could not finish before the next was due, never released its core set, and the free list drained.

BAILOUT meant restart, not failure, and the landing software was written to be restartable: the code registered waypoints "such that if processing happened to jump back to the last waypoint, no error would be introduced." After a restart only the newest instance of each job resumed; duplicates were flushed, and non-critical work, never restart-protected, simply vanished.

## The Simulation Nobody Wanted

On 5 July 1969, eleven days before launch, simulation supervisor Dick Koos ran Mission Control's last Apollo 11 landing rehearsal. Convention held that a final sim ended clean. Jack Niebauer, a Grumman engineer with the sim team, had been asking whether the guidance computer could be made to misbehave, and kept being told by the engineering side, in Koos's recollection, "That computer—this is not going to fail." Koos asked, "Are you sure this is not going to cause an abort?" — then let him break the rule.

Guidance officer Steve Bales saw a program alarm he could not identify and called an abort. Gene Kranz was not pleased. In the debrief Koos told him he had thrown away a landing on one indication: "You had two cues, and you didn't use them." Kranz sent Bales back to MIT's Instrumentation Laboratory to work through every program alarm and decide which required an abort; none appeared in the flight rules. Jack Garman, a twenty-five-year-old NASA computer specialist hired out of the University of Michigan in 1966, made the list.

## 102:38:26

At 102 hours, 38 minutes and 26 seconds into the mission, Armstrong said, with the slightest touch of urgency, "Program Alarm." Four seconds later: "It's a 1202." Then, sharper: "Give us a reading on the 1202 Program Alarm." Bales, twenty-six, had Garman in the back room; Garman said go. At 102:38:53 Charlie Duke called up, with urgency of his own, "Roger. We got you... We're Go on that alarm."

A second 1202 followed when Aldrin called his altitude display back up. At 102:42:19 Aldrin reported a 1201, and six seconds later Duke answered: "Roger. 1201 alarm. We're Go. Same type. We're Go." Five program alarms fired in all, three inside forty seconds. At 102:43:08 Armstrong switched the autopilot from AUTO to attitude-hold, then into the semi-manual mode P66, cutting the workload himself. The alarms stopped; he landed two minutes and twenty seconds later.

Koos remembered thinking, "Why that's the same alarm in our simulation!" He also resisted the moral usually drawn from it: "Some, I think, mistakenly, think that the simulation saved the landing from an abort." What it bought was awareness. Armstrong flew on because the spacecraft felt right.

## Not a Switch, and Not a Checklist Error

The popular version — an astronaut left the rendezvous radar switch in the wrong position — is not merely too tidy. It is wrong, and Eyles, who once repeated the "checklist error" formulation himself, retracted it. Procedures called for the radar to be powered up before the descent program was selected and left in SLEW or AUTO throughout. The switch was where it belonged.

The real fault was a documentation error years old. An interface control document between the primary guidance system and Grumman's attitude and translation control assembly required their 28-volt, 800-hertz supplies to be "frequency locked," but never said "phase synchronized" — so as built the phase relationship was constant but arbitrary. The radar's resolvers were excited by one 800-hertz source while the coupling data units interpreting them referenced the other, so the signal matched no known angle, worst near 90 or 270 degrees of phase, which Apollo 11 hit. The units drove the computer's counters almost constantly, at up to 6,400 pulses per second per angle, every pulse costing an 11.7-microsecond memory cycle. It had been found during launch-site testing of LM-3 and never corrected, and it occurred whenever the switch sat in SLEW or AUTO, whether or not the radar was powered.

At full rate that would have taken fifteen per cent of computation time; Eyles's team conservatively assumed thirteen, and Grumman's post-flight testing settled on 13.36 per cent. Powered descent had over fifteen per cent of duty-cycle margin during braking, and ten or less once landing radar data and a monitor display were running. Aldrin spotted the pattern live: "It appears to come up when we have a 1668 up." Nobody diagnosed the cause during the landing; George Silver, an LM guidance expert, worked it out at home in front of his television, reaching MIT's people in Houston an hour before lunar liftoff.

## What Restart Actually Bought

Strip away the mythology and the design bought one thing, not quite the one usually claimed. It is tempting to say priority scheduling protected the guidance and shed the trivia. In fact SERVICER — the job carrying navigation, guidance, throttle, attitude commands and displays — held the *lowest* priority of the active jobs, precisely because it was the longest. What shed load was restart: each BAILOUT flushed the accumulated unfinished copies of SERVICER, rebuilt only the newest from its last waypoint, and killed the unprotected extras, including Aldrin's altitude monitor. A mechanism built against hardware glitches turned out, as Eyles put it, to provide "a means to shed computational load in response to a software logjam."

It had a limit, and Apollo 11 found it. Once the module pitched over into the visibility phase and landing-site redesignation joined the guidance equations, the essential software alone left under ten per cent of margin; the restarts flushed the queue but could no longer shed anything, which is why Armstrong reached for attitude-hold and P66. The machine failed forwards as designed; the human still had to make room.

The principle outlived the hardware. Margaret Hamilton, who directed the Instrumentation Laboratory's Software Engineering Division inside a lab employing some 1,700 people at its Apollo peak, argued throughout her career for these properties — asynchronous execution, priority scheduling, priority displays, a human in the loop — and received the Presidential Medal of Freedom in 2016. Fraser, describing the priority interrupt system that coped with a rendezvous radar demanding attention during a landing, added four words: "This saved the landing." On the DSKY the crew stared at through all of it, among the caution lights for GIMBAL LOCK and NO ATT, sits a small lamp reading simply RESTART. It was not an apology. It was the plan.
