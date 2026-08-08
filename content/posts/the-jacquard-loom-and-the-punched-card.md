---
title: The Jacquard Loom and the Punched Card
date: 2026-08-08
summary: How a chain of pasteboard cards travelled from the silk looms of Lyon to Babbage's Analytical Engine and Hollerith's census tabulator, and what actually transferred along the way.
tags:
  - jacquard-loom
  - punched-cards
  - charles-babbage
  - ada-lovelace
  - herman-hollerith
  - history-of-computing
sources:
  - Science and Industry Museum, Programming Patterns — https://www.scienceandindustrymuseum.org.uk/objects-and-stories/jacquard-loom
  - Computer History Museum, The Storage Engine — https://www.computerhistory.org/storageengine/punched-cards-control-jacquard-loom/
  - Computer History Museum, Making Sense of the Census — https://www.computerhistory.org/revolution/punched-cards/2/2
  - Wikipedia, Jacquard machine — https://en.wikipedia.org/wiki/Jacquard_machine
  - Wikipedia, Joseph Marie Jacquard — https://en.wikipedia.org/wiki/Joseph_Marie_Jacquard
  - Wikipedia, Basile Bouchon — https://en.wikipedia.org/wiki/Basile_Bouchon
  - Wikipedia, Jacques de Vaucanson — https://en.wikipedia.org/wiki/Jacques_de_Vaucanson
  - Wikipedia, Canut revolts — https://en.wikipedia.org/wiki/Canut_revolts
  - 1911 Encyclopaedia Britannica, Jacquard, Joseph Marie (Wikisource) — https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Jacquard,_Joseph_Marie
  - E. A. Posselt, The Jacquard Machine Analyzed and Explained (Project Gutenberg) — https://www.gutenberg.org/files/54193/54193-h/54193-h.htm
  - Menabrea, Sketch of the Analytical Engine, with Notes by A.A.L. (Fourmilab) — https://www.fourmilab.ch/babbage/sketch.html
  - Babbage, Passages from the Life of a Philosopher, ch. VIII (Standard Ebooks) — https://standardebooks.org/ebooks/charles-babbage/passages-from-the-life-of-a-philosopher/text/chapter-8
  - Babbage, Passages from the Life of a Philosopher, ch. XI (Standard Ebooks) — https://standardebooks.org/ebooks/charles-babbage/passages-from-the-life-of-a-philosopher/text/chapter-11
  - NIST, Ada Lovelace, the World's First Computer Programmer — https://www.nist.gov/blogs/taking-measure/ada-lovelace-worlds-first-computer-programmer-who-predicted-artificial
  - Wikipedia, Note G — https://en.wikipedia.org/wiki/Note_G
  - Ed Thelen, Computing People in History — Herman Hollerith — https://ed-thelen.org/comp-hist/HH-Local.html
  - Douglas W. Jones, Punched Cards: A Brief Illustrated Technical History — https://homepage.divms.uiowa.edu/~jones/cards/history.html
  - MIT Technology Review, Punching In — https://www.technologyreview.com/2020/08/18/1006227/punching-in/
  - Wordorigins.org, sabotage — https://www.wordorigins.org/big-list-entries/sabotage
cover: /images/the-jacquard-loom-and-the-punched-card.jpg
coverAlt: An 1839 silk portrait woven on a Jacquard loom shows Jacquard seated in his workshop holding dividers, with a fan of punched cards and a small loom model on the table beside him.
coverCaption: "\"À la mémoire de J.M. Jacquard\" (Didier, Petit et Cie, Lyon, 1839) is not a print but a portrait woven in silk on a Jacquard loom from roughly 24,000 punched cards, after Claude Bonnefond's painting."
coverCredit: "Woven in silk by Michel-Marie Carquillat (1803–1884) for Didier, Petit et Cie, Lyon, after the painting by Claude Bonnefond (1796–1860). Commons author field reads: \"Bonnefond, Claude, 1796-1860, artist; Carquillat, François Michel-Marie, 1803-1884.\" Woven at the bottom of the object: \"Tissé par M.M. Carquillat.\", via Wikimedia Commons"
coverLicense: Public domain
coverSource: https://commons.wikimedia.org/wiki/File:%C3%80_la_m%C3%A9moire_de_J.M._Jacquard_-_d%27apr%C3%A8s_le_tableau_de_C._Bonnefond_%3B_ex%C3%A9cut%C3%A9_par_Didier_Petit_et_Cie._LCCN2002737214.tif
---

## The boy on top of the loom

Before 1800, weaving a figured silk took two people. The drawloom carried its pattern in a bundle of cords, and a weaver's assistant — the drawboy — sat above the machine and hauled the right cords by hand for every pass of the shuttle. A single misjudged pull put a thread on the wrong side of the weft and spoiled the cloth. The drawboy was slow, costly and fallible, and the whole eighteenth-century French silk trade wanted him replaced.

The replacement took eighty years and four inventors, three of whom failed.

## Bouchon, Falcon, Vaucanson

Basile Bouchon, working in Lyon, was the son of an organ maker, which matters. The musical automata of the day already stored a tune as a fixed physical sequence — the pins and staples driven into a rotating barrel — so the idea that a machine's behaviour could be an object, made once and mounted, was ordinary in the workshop he grew up in. In 1725 Bouchon carried it sideways into textiles, and traded the pegged barrel for something cheaper to make and far easier to change. He passed the warp cords through the eyes of horizontal needles held in a sliding box and wrapped a perforated paper roll around a cylinder. Where the paper had a hole the needle went through and nothing happened; where it did not, the needle was pushed back and its cord selected for lifting. The ruled grid of the roll was the weaver's own squared design paper, turned into a control medium. That is the whole principle, arrived at in one step and never really improved on.

Bouchon's device controlled too few cords to be useful, and still needed a second operator. In 1728 his assistant Jean-Baptiste Falcon fixed the capacity problem by abandoning the continuous roll: he arranged the holes in rows and used rectangular pasteboard cards laced together into an endless loop. Cards are durable, individually replaceable, and not confined to the width of a tape. Falcon's chain of cards is the object that eventually reaches IBM.

Jacques de Vaucanson, better known for his automata, was made inspector of silk manufactures in 1741 and in 1745 built what is usually called the first fully automated loom, drawing directly on both men. It was a technical success and a commercial disaster. The weavers of Lyon, correctly reading it as a machine for eliminating them, pelted him with stones in the street. His loom went unadopted and passed into the collection that became the Conservatoire des Arts et Métiers in Paris.

## What Jacquard actually built

Joseph Marie Charles Jacquard, born in Lyon on 7 July 1752, exhibited an improved loom at the Paris industrial exhibition of 1801 and took a bronze medal for it. In 1803 he was summoned to Paris and attached to the Conservatoire, where Vaucanson's abandoned machine sat waiting for him. The head he patented in 1804 is a synthesis: Falcon's pasteboard cards and his square card prism, Bouchon's needle-and-hole selection, Vaucanson's general arrangement of the mechanism above the loom, and two changes of Jacquard's own. He perforated all four faces of the prism, doing away with Vaucanson's perforated barrel; and where Vaucanson's mechanism had a double row of needles, Jacquard's had eight rows of needles and uprights. That second change is the difference between a curiosity and a machine that can weave a face.

The head sits above the loom. The chain of cards is carried on a square prism, and the prism swings in to press one card against a board of horizontal needles; each needle connects to a vertical hook, and each hook, through a harness cord and a weight, controls one or more warp threads. Where the card is punched, the needle passes through the hole and its hook stays standing in the path of a rising knife, so that thread lifts. Where the card is solid, the card presses the needle back and shoves its hook clear of the knife, so the thread stays down. The shuttle then carries the weft under every raised thread and over every lowered one. One card equals one pass of the shuttle. A four-hundred-hook head with four threads tied to each hook governs 1,600 warp ends, the figure repeating four times across the width of the cloth.

Adoption was fast, though how fast is disputed. The French state declared the machine public property in 1806 and compensated Jacquard with a pension and a royalty on each loom built. The usual figure is 11,000 looms in France by 1812, a number some historians doubt on the grounds that sales only really accelerated after 1815, once the cards themselves had been made reliable. In Britain the *Manchester Guardian* reported on 14 December 1836 that "from 7,000 to 8,000 Jacquard looms are now in this country." Jacquard died at Oullins on 7 August 1834; Lyon put up a statue six years later.

## The head is not a computer

It is worth being blunt about this, because the loom is routinely described as the first computer and it is nothing of the kind.

The Jacquard head performs no arithmetic. It holds no state that anything can read back. Most importantly, it cannot branch: there is no mechanism by which the presence or absence of a hole changes which card comes next. The chain advances one card per shuttle pass, always forward, always in the same order, and when it reaches the end it starts again. The card is not an encoded procedure but a direct spatial map of the cloth — one hole per hook, one card per weft line, a picture of the fabric rendered in perforations. Calling it binary code flatters it. What the head genuinely accomplishes is narrower and still profound: it separates a machine's *behaviour* from its *structure* and makes the behaviour a physical artefact you can carry, copy, sell, and swap.

## Lyon, and a myth

The canuts of Lyon did not rise against the Jacquard machine. By 1831 the city's silk trade comprised roughly 1,400 manufacturers, 8,000 master weavers and 30,000 apprentices, and the fight was over the *tarif*, a minimum piece rate. On 18 October 1831 the workers asked the prefect to broker terms; a rate was agreed on 26 October; the manufacturers repudiated it on 10 November. The insurrection began on 21 November, and Marshal Soult retook the city on 3 December with an army of 20,000. Around 600 were killed or wounded, roughly two-thirds of them soldiers. The second revolt broke out on 9 April 1834 and was crushed within a week — the *semaine sanglante* — after which some 10,000 captured insurgents were shipped to Paris and tried there in April 1835. These were disputes about wages and the right to combine, not about machinery.

The tempting story that weavers threw their wooden shoes into the looms, giving us the word *sabotage*, is likewise false. The word surfaces in English only in July 1906, and the semantic path runs through *saboter*, to botch or bungle, not through shoes in gears.

## Babbage buys a portrait

In 1839 a Lyon workshop wove a silk portrait of Jacquard that required 24,000 punched cards. Charles Babbage owned one and hung it in his drawing room. It was, he wrote, "a sheet of woven silk, framed and glazed, but looking so perfectly like an engraving, that it had been mistaken for such by two members of the Royal Academy." When Prince Albert came to see the Difference Engine in 1842, Babbage asked leave to show him the portrait first, "as it would greatly assist in explaining the nature of Calculating Machines." The Duke of Wellington took it for an engraving; Albert corrected him.

Babbage's grasp of the loom was exact. "It is known as a fact," he wrote, "that the Jacquard loom is capable of weaving any design which the imagination of man may conceive" — and he saw that the cards fix the *form* while the threads supply the colour. He specified the Analytical Engine's input in the same medium, but split into functionally distinct kinds: operation cards, setting the machine to add, subtract, multiply or divide; variable cards, naming the columns to be operated on; and number cards, carrying constants. This is the real transfer. Jacquard's chain says *do this next*; Babbage's split says *do this operation, to these operands*. Instruction and address come apart, and a set of cards for a formula becomes reusable property — "thus the Analytical Engine will possess a library of its own."

## Lovelace, backing the cards, and Note G

Luigi Menabrea published a French account of Babbage's engine in the *Bibliothèque Universelle de Genève* in October 1842. Ada Lovelace translated it and appended notes labelled A to G; the whole ran to sixty-six pages in the third volume of *Taylor's Scientific Memoirs* in 1843, pages 666 to 731, of which pages 691 to 731 — forty-one of them — are hers, signed only "A.A.L."

Two things in the notes matter here. The first is the loop. Menabrea had already observed that a card could be *retained* rather than advanced, so one multiplication card could serve four multiplications. Lovelace went further, describing in Note C "what was technically designated *backing* the cards," in which the prism carrying the chain is made "to revolve *backwards* instead of *forwards*, at pleasure," bringing any card or group of cards back into use "any number of times successively." A Jacquard chain that can run in reverse under the machine's own control is no longer a Jacquard chain. That is iteration, and it is where the medium stops being a picture of cloth.

The second is the metaphor, which is hers, in Note A: "The Analytical Engine *weaves algebraical patterns* just as the Jacquard-loom weaves flowers and leaves." Note G then works through the engine's computation of the Bernoulli numbers, the most elaborate program written for a machine that never existed — and carries a transposition in operation 4, two variables swapped, which would have yielded −25621/630 instead of −1/30. It also holds her warning: "The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform."

## Hollerith, who tried the loom and rejected it

The usual line runs Jacquard to Babbage to Herman Hollerith. The first link is real; the second is not, and Hollerith's own history says so. Teaching at MIT in 1882 he experimented with adapting the Jacquard process to census work and concluded that the loom was not applicable to data storage and retrieval. He was right: a loom chain is a fixed sequence, and a census is an unordered heap of records that has to be counted, cross-tabulated and re-sorted.

The prompt had come from John Shaw Billings of the Census Office, at his tea table: "There ought to be a machine for doing the purely mechanical work of tabulating population and similar statistics." Hollerith's first attempt used punched paper tape and failed, because the tape had to halt for the reading pin. The fix came from a railway ticket, on which the conductor punched out a rough description of the passenger — a "punch photograph" — to stop the ticket being passed on. Cards could be punched independently, fed fast, and physically sorted.

His machine, patented from his application of September 1884, worked electrically: a spring-loaded press dropped pins through the holes into cups of mercury, each closed circuit advancing a dial and tripping a relay that opened the right door on a sorting cabinet. Some 60 million cards were punched for the 1890 census, an operator handling about 7,000 a day, at least ten times the manual rate. The population came back as 62,622,250 in about three months, where the 1880 count of 50 million had taken more than seven years. The card measured 3¼ by 7⅜ inches, near enough to the American banknotes of the day — US currency did not shrink until 1929 — that boxes and bins made for the Treasury could hold them.

Hollerith incorporated the Tabulating Machine Company in 1896 and sold out in 1911 to Charles Flint, who folded it into the Computing-Tabulating-Recording Company. Renamed International Business Machines in 1924, it introduced the 80-column rectangular-hole card in 1928 and kept it in service for half a century.

So what crossed from Lyon? Not computation, and not a computer. A durable physical medium for machine-readable information; a mechanical reader for it; a trade of people who could punch, verify and lace cards; and the idea that what a machine does can be handed to it on a stack of pasteboard. Babbage supplied the branching, Lovelace the iteration and the program, Hollerith the sorting and counting. Jacquard supplied the card.
