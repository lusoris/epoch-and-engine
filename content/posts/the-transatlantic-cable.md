---
title: The Transatlantic Cable and the Law of Squares
date: 2026-08-08
summary: Between 1857 and 1866, four attempts to wire Ireland to Newfoundland turned an argument about signal retardation into the founding lesson of electrical engineering — and killed a working cable in the process.
tags:
  - telegraphy
  - submarine-cables
  - victorian-engineering
  - lord-kelvin
  - electrical-physics
sources:
  - Bruce J. Hunt, "Lord Cable", Europhysics News 35/6 (2004) — https://www.europhysicsnews.org/articles/epn/pdf/2004/06/epn04602.pdf
  - Linda Hall Library, Scientist of the Day — E.O. Wildman Whitehouse — https://www.lindahall.org/about/news/scientist-of-the-day/e-o-wildman-whitehouse/
  - IEEE Spectrum, "The First Transatlantic Telegraph Cable Was a Bold, Beautiful Failure" — https://spectrum.ieee.org/the-first-transatlantic-telegraph-cable-was-a-bold-beautiful-failure
  - Science Museum, "How perseverance laid the first transatlantic telegraph cable" — https://www.sciencemuseum.org.uk/objects-and-stories/how-perseverance-laid-first-transatlantic-telegraph-cable
  - IET Archives, "The first transatlantic telegraph cable 1858" — https://www.theiet.org/membership/library-and-archives/the-iet-archives/archives-highlights/the-first-transatlantic-telegraph-cable-1858
  - IET Archives, "The Transatlantic Telegraph Cables 1865-1866" — https://www.theiet.org/membership/library-and-archives/the-iet-archives/archives-highlights/the-transatlantic-telegraph-cables-1865-1866
  - Science Museum Group Collection, Mirror galvanometer for the transatlantic telegraph, 1858 — https://collection.sciencemuseumgroup.org.uk/objects/co6228/mirror-galvanometer-for-the-transatlantic-telegraph-1858
  - Science Museum Group Collection, Silver thimble used to pass a current through the 1866 transatlantic cable — https://collection.sciencemuseumgroup.org.uk/objects/co33251/silver-thimble-used-to-pass-a-current-through-the-1866-transatlantic-cable-1860-1866-thimble
  - The Victorian Web, "The Triumph of Brunel's Great Eastern on 27 July 1866" — https://www.victorianweb.org/technology/telecom/telegraph2.html
  - Charles Bright, "The Story of the Atlantic Cable" (Project Gutenberg) — https://www.gutenberg.org/files/46105/46105-h/46105-h.htm
  - MacTutor History of Mathematics, William Thomson (Lord Kelvin) — https://mathshistory.st-andrews.ac.uk/Biographies/Thomson/
  - "Law of squares", Wikipedia — https://en.wikipedia.org/wiki/Law_of_squares
  - "Transatlantic telegraph cable", Wikipedia — https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable
  - "Cyrus West Field", Wikipedia — https://en.wikipedia.org/wiki/Cyrus_West_Field
  - "Daniel Gooch", Wikipedia — https://en.wikipedia.org/wiki/Daniel_Gooch
  - PBS American Experience, "How the Early Cable Was Used" — https://www.pbs.org/wgbh/americanexperience/features/cable-how-early-cable-was-used/
cover: /images/the-transatlantic-cable.jpg
coverAlt: Watercolour of the large iron steamship Great Eastern at sea under a cloudy sky, flags at her masts, smaller escort ships behind her, and a red-jacketed figure in a boat on the green swell.
coverCaption: "The cable fleet at sea in 1865: Robert Dudley's watercolour of the Great Eastern under way with her escorts, painted by the expedition's own official artist aboard the ship."
coverCredit: Robert Charles Dudley (British, 1826–1909), via Wikimedia Commons
coverLicense: CC0 1.0
coverSource: https://commons.wikimedia.org/wiki/File:Telegraph_Cable_Fleet_at_Sea,_1865_MET_DP801239.jpg
---

## A Paper Merchant Buys an Ocean

Cyrus West Field was a New York paper merchant who had retired at thirty-four on a fortune of about $250,000, and in 1856 he became the moving force behind the Atlantic Telegraph Company, registered on 20 October of that year to run a working telegraph wire from Ireland to Newfoundland. The idea was old — Samuel Morse had floated a transatlantic link in 1840 — but the enabling material was new. Gutta-percha, a rubbery latex from a Malayan tree, hardened underwater instead of rotting, and by 1851 it had insulated the first successful submarine cable across the English Channel. Field raised £350,000 in private capital, secured a British subsidy of £14,000 a year and a comparable American commitment, and set about scaling a twenty-five-mile problem up by a factor of sixty.

Scaling was exactly the difficulty, and it was not merely one of length. The first Atlantic cable failed not because the ocean was deep or the weather bad, though both were true, but because two men held incompatible theories about what happens to an electrical signal inside a long insulated wire, and the company backed the wrong one.

## What Faraday Found in the Wire

Telegraphers on land had noticed nothing strange. A bare copper wire strung on poles carries a crisp Morse dot; the dot arrives crisp. Submarine cables behaved differently. In the early 1850s operators found that sharply defined signals sent into one end of a long undersea line emerged delayed and badly smeared, so that dots and dashes sent in quick succession blurred together into unreadable mush. They called it retardation; Latimer Clark had run into it on an Anglo-Dutch cable as early as 1853.

Michael Faraday looked into the phenomenon in 1853 and identified the cause: capacitance. A submarine cable is not a wire in air. It is a copper conductor wrapped in a dielectric and immersed in conducting seawater held at ground — which is to say, a coaxial capacitor thousands of miles long. As Bruce Hunt puts it, land lines stored so little charge that the whole process happened almost instantaneously, while submarine cables were "practically long tubular capacitors". Before any current can reach the far end, the near end must first charge the line, and the charge bleeds along it slowly.

William Thomson, Professor of Natural Philosophy at Glasgow since the age of twenty-two, took the problem up mathematically in 1854, with some input from George Gabriel Stokes. He recognised its shape at once, because he had met it in a different physical dress. A cable dominated by resistance and capacitance obeys the same equation Joseph Fourier had written for heat flowing down a metal bar:

```text
∂²v/∂x² = RC · ∂v/∂t
```

That is a diffusion equation, not a wave equation. A voltage step injected at one end does not travel down the line as a pulse; it *spreads*, exactly as heat applied to the end of an iron rod spreads. From this Thomson derived the law of squares: the time at which the current at the far end reaches its maximum goes as the product of total resistance and total capacitance — and since both R and C grow in proportion to length, the delay grows as the *square* of the length. Double the cable and you quadruple the retardation. Across two thousand nautical miles, that set a hard ceiling on how many signals per second the line could carry.

The commercial consequence is the crux of the whole story. Because the diffusion equation is linear, the *shape and timing* of the smeared arrival do not depend on how hard you push. Raise the sending voltage tenfold and you raise the received current tenfold, but the pulse arrives just as late and just as smeared. Voltage buys amplitude; it cannot buy speed. The only ways to make the line faster are to lower R — thicker copper — or lower C — thicker insulation. Both mean a fatter, heavier, far more expensive cable.

## A Fiction of the Schools

Edward Orange Wildman Whitehouse was a Brighton surgeon, a member of the Royal College of Surgeons since 1840, who had turned himself into an electrical experimenter and impressed Field enormously. When Thomson laid the law of squares before the British Association in 1855, Whitehouse challenged him on the spot, insisting that his own tests contradicted it; the following year he pressed the attack in print, in a paper asking whether the law of squares applied to submarine circuits at all. The law, he declared, was "a fiction of the schools", and retardation posed no real obstacle to an Atlantic cable. His prescription followed directly: a thin, cheap conductor, driven by very high voltages.

Why this was attractive is not mysterious. Thomson's physics implied an expensive cable; Whitehouse's implied a cheap one. In October 1856 the Atlantic Telegraph Company made Whitehouse its official electrician with charge of all electrical arrangements. At the end of the same year Glasgow investors elected Thomson to the board, where he sat as an unpaid director and scientific adviser with no operational authority. The company had hired both the theory and its denial, and handed executive power to the denial.

The cable built to Whitehouse's economics had a core of seven number-22 copper wires weighing just 107 pounds per nautical mile, insulated with three coats of gutta-percha out to three-eighths of an inch, then served with tarred hemp and armoured with iron wire to a finished diameter of roughly five-eighths of an inch. Thomson meanwhile worked on the other half of the problem: if the received currents were going to be feeble, he would build an instrument that could see feeble currents. The result was the mirror galvanometer, patented in 1858 and built in Glasgow by James White — a tiny magnet mounted on the back of a small mirror, suspended by a fibre inside the sensing coil, with a lamp beam bounced off the mirror onto a distant scale. The moving mass was almost nothing and the pointer was a weightless beam of light, so a deflection of a fraction of a degree became a visible slide of light across the wall. It was, as the Science Museum's catalogue puts it, the only instrument sensitive enough to detect reliably the first transatlantic telegraph messages.

## Sixteen Hours for Ninety-Eight Words

The 1857 expedition sailed from Valentia on 5 August, and six days later — at a quarter to four on the afternoon of 11 August, with 380 miles laid — the cable snapped when the brake on the paying-out gear at the stern of USS *Niagara* was mishandled. Thomson, who had volunteered for shipboard electrical work when Whitehouse pleaded ill health, went out again in 1858. The ships met at mid-ocean on 25 June; the splices made there parted three times in as many days, the last of them on the night of 29 June, and the squadron turned back for Queenstown. It sailed again on 17 July, the ends were joined on 29 July, and on 4 and 5 August the shore ends came in at Trinity Bay, Newfoundland and Valentia, Ireland. The first official message, sent on 16 August, read: "Europe and America are united by telegraphic communication. Glory to God in the highest, on earth peace, goodwill to men." New York's celebration was enthusiastic enough that City Hall caught fire and nearly burned down.

Then the line had to work, and the physics arrived on schedule. Queen Victoria's message to President Buchanan, which followed the directors' greeting on that same 16 August, ran to ninety-eight words and took about sixteen and a half hours to get through — on the order of ten minutes per word. Whitehouse, stationed at the Irish end, responded the only way his theory allowed. He set aside Thomson's galvanometer and hit the cable with his own apparatus, including an induction coil five feet long. Estimates of the resulting stress vary: the Linda Hall Library puts it at perhaps 2,000 volts, other accounts at several times that. Either figure was far beyond what the gutta-percha could survive. The insulated core measured only three-eighths of an inch across in total, leaving something like a seventh of an inch of insulation over the conductor, and it had already been roughly handled in manufacture, storage and laying.

The insulation broke down. Whitehouse, meanwhile, was quietly using Thomson's mirror galvanometer to read incoming signals while publicly maintaining that his own detector was adequate. The company removed him in mid-August and handed the line to Thomson, who got useful traffic through on ordinary battery currents — the usual tally, given by *IEEE Spectrum* among others, is 732 messages in all. It was not enough. On 20 October 1858 the cable went dead. A committee of inquiry in 1861 concluded that Whitehouse should bear the greater part of the blame; he mounted an increasingly desperate public defence and never worked on an Atlantic cable again.

The failure had one constructive legacy. Thomson pushed for cable specifications that could be written down and enforced, which required agreed electrical units to write them in. Largely at his urging the British Association formed its Committee on Electrical Units in 1861, and that committee produced essentially the system of ohms, amps and volts still in use.

## The Great Eastern and the Lost End

The 1865 attempt was a different undertaking. Samuel Canning was the engineer in charge for the contractors; Daniel Gooch — chairman of the Great Western Railway and of the company that held the *Great Eastern* — sailed with the expedition on the ship's behalf, and when fresh money was wanted for the following year he pledged £20,000 towards the Anglo-American Telegraph Company formed to raise it. The whole cable — heavier core, better made, tested to specification — went aboard a single ship, Brunel's monstrous *Great Eastern*, the only hull afloat large enough to carry 2,300 nautical miles of it. She left Valentia on 23 July. Faults appeared and were hauled back and cut out, and on 2 August, with about a third of the crossing left, the cable parted during one of those recovery hauls and went over the side. By then 1,186 nautical miles of cable had gone out, some 600 miles of the crossing still to run, and the end lay in roughly two thousand fathoms. Canning grappled for days, hooked it more than once and lost it each time as the ropes failed, then ran out of rope altogether. He marked the position and went home.

The 1866 expedition sailed from Sheerness on 30 June and from Ireland on 13 July with fresh cable and far stronger picking-up gear. This time nothing went wrong: the *Great Eastern* landed the cable at Heart's Content on 27 July 1866. Then she turned around, steamed back to the marked position, and did the thing that had never been done — fished a lost cable end off the sea floor two miles down, spliced a new length onto it and completed that line into Newfoundland as well. By 8 September the Atlantic carried two working telegraph circuits.

## A Thimbleful of Current

The vindication was quantitative. The 1858 line had needed something like two minutes to pass a single character, a rate of about a tenth of a word a minute; the 1866 cable opened at about eight words a minute — some eighty times faster — and climbed to fifteen and even seventeen once condensers were brought in. Nothing about that improvement came from higher voltages. It came from more copper and more gutta-percha — lower R, lower C, lower RC — read out by a detector sensitive enough that the sender never needed to shout.

The most elegant demonstration came on 12 September 1866. The engineer Josiah Latimer Clark, testing at the Valentia station, had the two Atlantic cables joined to each other at the Newfoundland end, making a single circuit of roughly 3,700 miles of wire running out to Heart's Content and back. For a battery he used a silver thimble borrowed from Miss Emily FitzGerald, charged with a few drops of sulphuric acid and a fragment of zinc weighing a grain or two, and read the returning signals on Thomson's mirror galvanometer. They came back through twice the breadth of the Atlantic in little more than a second, the spot of light travelling a foot or more across the scale. That experiment settled the argument in one gesture. Retardation was real and unavoidable and it obeyed the law of squares; but the current that survived the crossing, however small, was perfectly sufficient if you built an instrument worthy of it.

Thomson was knighted in 1866 for the cable work, went on to invent the siphon recorder — a pivoted glass tube that inked a wavy trace of the incoming signal onto moving paper tape — and by the 1870s was earning several thousand pounds a year in fees and patent royalties at a time when a few hundred was a good professorial salary. He became Baron Kelvin in 1892. The deeper legacy is less personal. The Atlantic cable is the moment when a commercial enterprise learned, expensively and in public, that a differential equation is not a fiction of the schools, and that the correct response to a signal you cannot read is a better receiver rather than a bigger battery.
