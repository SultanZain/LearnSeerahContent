# LearnSeerah — Writing Rules & Curriculum Tracker

## Writing Rules

### Voice & Tone
- Style: Ar-Raheeq Al-Makhtum — dignified, flowing, clear
- Teaching tone, not blog/history-article tone — learner must feel taught, not just informed
- Not oversimplified, not academic — narrative storytelling
- Present tense where it pulls the reader in
- No jargon without explanation
- Cross-reference earlier sections/units by name to reinforce learning ("as we studied in Section 4...")

### Honorifics
- Prophet Muhammad → ﷺ
- Other Prophets → <span className="font-ar">عليه السلام</span>
- Male Companion → <span className="font-ar">رضي الله عنه</span>
- Female Companion → <span className="font-ar">رضي الله عنها</span>
- Two Companions → <span className="font-ar">رضي الله عنهما</span>
- Group of Companions → <span className="font-ar">رضي الله عنهم</span>

### Quran Citations
```mdx
<Quran surah="1" ayah="1" />          // single verse
<Quran surah="33" ayah="56-57" />     // verse range
```

### Hadith Citations
- Include book name + hadith number
- Format: `— Sahih al-Bukhari, 1234`

### MDX Comments (not HTML) — CRITICAL
```mdx
{/* page */}
{/* quiz: q1 */}
```
- NEVER use HTML `<!-- -->` comments
- Double-check no stray `%}` or malformed closing tags before finalizing

### Frontmatter — CRITICAL
- Use YAML but ALWAYS double quotes, never single quotes, around keys/string values
- Format:
```yaml
---
title: "Lesson Title"
summary: "Summary text"
section: "section-slug"
unit: "Unit Name"
unitOrder: 14
order: 53
questions:
  - id: "q1"
    text: "Question text"
    options:
      - { id: "a", text: "Option text" }
    correctOptionId: "b"
    explanation: "Explanation text"
---
```

### Pages & Quizzes
- No fixed quiz-per-page rule — follow content rhythm
- Don't break a topic mid-flow for a quiz
- A checkpoint can have 1, 2, or 3 questions
- Some page runs can have no quiz at all

### Unit Rules
- Min: 3 lessons per unit
- Max: 10 lessons per unit
- If content is heavy, make lessons longer rather than more units, but split further if a unit risks overwhelming learners — prefer more focused lessons over fewer dense ones

### Lesson Titles
- Keep SHORT — under ~5 words where possible (UI space is limited)

### File Naming
- `lesson-N.mdx` sequential across all sections
- English files first, translations later

### Sensitive/Controversial Topics Method (applies to Hind, Uthman, Banu Qurayza, Ghadir Khumm, Saqifah, anti-Sahaba narratives, etc.)
- Name the difficult reality honestly, no whitewashing
- Provide full historical context before any judgment
- If Prophet ﷺ forgave someone, curriculum affirms no believer may curse them
- Clear doubts for the whole Ummah, not framed as anti-Shia polemic, unifying tone not sectarian targeting
- Never highlight grudges; resolve with evidence and move on
- Address doubts chronologically, exactly where the incident occurs

### Other Props
- External references: standard markdown hyperlink `[Text](url)`
- Qisas al-Anbiya reference goes at end of last lesson in Unit 2

---

## Curriculum Checklist

### Section 1 — Foundations of Faith & Prophethood

#### Unit 1 — One Message, Many Messengers
- [x] Lesson 1 — What is a Prophet?
- [x] Lesson 2 — Why Do We Need Prophets?
- [x] Lesson 3 — Why Not Direct Guidance?
- [x] Lesson 4 — One Religion, One Core
- [x] Lesson 5 — Islam: The Primordial Religion

#### Unit 2 — The Prophetic Chain
- [x] Lesson 6 — Adam عليه السلام — The Beginning
- [x] Lesson 7 — Nuh عليه السلام — The Great Flood and the Reset
- [x] Lesson 8 — Ibrahim عليه السلام — The Friend of Allah
- [x] Lesson 9 — Ismail & Ishaq عليه السلام — Two Lines, One Root
- [x] Lesson 10 — Musa عليه السلام — The Lawgiver
- [x] Lesson 11 — Dawud & Sulayman عليه السلام — The Kingdom of Faith
- [x] Lesson 12 — Isa عليه السلام — The Word of Allah

#### Unit 3 — The Seal of Prophethood
- [x] Lesson 13 — What Does "Final Prophet" Mean?
- [x] Lesson 14 — Why Was Muhammad ﷺ the Last?
- [x] Lesson 15 — The Preserved Message
- [x] Lesson 16 — Signs of His Prophethood

---

### Section 2 — The Dawn of Revelation & Ancestry

#### Unit 4 — The Lineage of the Final Prophet
- [x] Lesson 17 — The Chosen Lineage — From Ismail عليه السلام to Quraysh
- [x] Lesson 18 — The House of Hashim — Honour and Leadership
- [x] Lesson 19 — Abdul-Muttalib — The Guardian of the Kaaba
- [x] Lesson 20 — The Vow and the Sacrifice — Abdullah's Story

#### Unit 5 — The Year of the Elephant and the Birth
- [x] Lesson 21 — Arabia Before the Prophet ﷺ
- [x] Lesson 22 — Abraha and the Elephant
- [x] Lesson 23 — The Birth of Muhammad ﷺ

---

### Section 3 — The Crucible of Character & Youth

#### Unit 6 — The School of Solitude

- [x] Lesson 24 — The Wisdom of the Orphan
- [x] Lesson 25 — The Desert Years
- [x] Lesson 26 — The Shepherd and the Soul

#### Unit 7 — The Making of Al-Amin

- [x] Lesson 27 — The Journey to Syria
- [x] Lesson 28 — A Young Man in a Corrupt City
- [x] Lesson 29 — Hilf al-Fudul — The Pact of the Virtuous
- [x] Lesson 30 — Khadijah and the Merchant of Truth

---

### Section 4 — The Makkan Period

#### Unit 8 — The First Light
- [x] Lesson 31 — The Cave of Hira
- [x] Lesson 32 — Iqra — The First Revelation
- [x] Lesson 33 — The Secret Dawah — The First Muslims
- [x] Lesson 34 — Ya Sabahah — The Call on Safa

#### Unit 9 — The Years of Fire
- [x] Lesson 35 — The Persecution Begins
- [x] Lesson 36 — Bilal — Torture and Steadfastness
- [x] Lesson 37 — The Lion and the Eagle — Hamzah's and Umar's Islam
- [x] Lesson 38 — The Two Migrations to Abyssinia
- [x] Lesson 39 — The Boycott — Three Years in the Valley
- [x] Lesson 40 — The Attempted Compromises

#### Unit 10 — The Year of Grief and the Night Journey
- [x] Lesson 41 — The Year of Grief
- [x] Lesson 42 — Ta'if — The Worst Day
- [x] Lesson 43 — The Isra and Mi'raj

#### Unit 11 — The Dawn of Hijrah
- [x] Lesson 44 — The Ansar — How Yathrib Found Islam
- [x] Lesson 45 — The Pledges of Aqabah
- [x] Lesson 46 — Mecca Discovers the Plan

---

### Section 5 — The Migration (Hijrah)

#### Unit 12 — The Journey
- [x] Lesson 47 — The Road to Medina — Cave, Desert, Arrival
- [x] Lesson 48 — Quba — The First Mosque
- [x] Lesson 49 — Entering Medina — A City Receives Its Prophet

#### Unit 13 — Building a Community
- [x] Lesson 50 — The Prophet's Mosque — Where the Camel Stopped
- [x] Lesson 51 — The Brotherhood — Muhajirin and Ansar United
- [x] Lesson 52 — The Constitution of Medina — A New Order

---

### Section 6 — The Madinan Period — IN PROGRESS

#### Unit 14 Arrival to Conflict — DONE (Lessons 53-60)
- [x] 53 The Qiblah Changes
- [x] 54 The Fast of Ramadan Begins
- [x] 55 Zakah, The Pillar of Giving
- [x] 56 The Two Eids
- [x] 57 The Adhan Begins
- [x] 58 The Permission to Fight
- [x] 59 Watching Quraysh's Caravans
- [x] 60 Sariyyas Before Badr

#### Unit 15 Badr, The First Battle — DONE (Lessons 61-66)
- [x] 61 The Council of War
- [x] 62 The Night Before Badr
- [x] 63 The Battle of Badr
- [x] 64 The Angels at Badr
- [x] 65 The Captives and the Ransom
- [x] 66 The Martyrs and the Victory's Cost

#### Unit 16 Internal Threats — DONE (Lessons 67-71)
- [x] 67 The Hypocrites of Medina
- [x] 68 Abdullah ibn Ubayy
- [x] 69 The Ten Promised Paradise (Ashara Mubashshara)
- [x] 70 Banu Qaynuqa
- [x] 71 Ka'b ibn al-Ashraf

#### Unit 17 Uhud — DONE (Lessons 72-80)
- [x] 72 Quraysh Seeks Revenge
- [x] 73 Defend or March Out
- [x] 74 The Munafiqun Withdraw
- [x] 75 The Battle Begins
- [x] 76 The Archers Leave Their Post
- [x] 77 Hamzah's Martyrdom (includes Hind, cruelty named plus later Islam plus Prophet's forgiveness)
- [x] 78 The Prophet Wounded
- [x] 79 After the Battle
- [x] 80 Lessons of Uhud

#### Unit 18 Banu al-Nadir and the Road to the Trench — DONE (Lessons 81-84)
- [x] 81 Banu al-Nadir's Betrayal
- [x] 82 The Expulsion of Banu al-Nadir
- [x] 83 Inheritance Law Revealed
- [x] 84 The Confederates Gather

#### Unit 19 The Battle of the Trench — DONE (Lessons 85-88)
- [x] 85 The Trench Is Dug
- [x] 86 The Siege Begins
- [x] 87 Nuaym's Secret Mission
- [x] 88 The Storm That Scattered Them

#### Unit 20 Banu Qurayza — DONE (Lessons 89-91)
- [x] 89 The Accusation of Treachery
- [x] 90 The Siege and the Judgment
- [x] 91 Understanding the Controversy

#### Unit 21 Marriage and Household Life — IN PROGRESS (Lessons 92-101)
- [x] 92 Why He Married Multiple Wives
- [x] 93 Sawdah and Aisha, After Khadijah
- [x] 94 The Truth About Aisha's Age, Addressing the Claims
- [x] 95 Hafsah, Zaynab bint Khuzaymah, Umm Salamah
- [x] 96 Zaynab bint Jahsh and the Verse of Hijab
- [x] 97 Juwayriyyah, Umm Habibah, Safiyyah, Marriages of Reconciliation
- [x] 98 Maymunah, The Last Marriage
- [x] 99 Life Inside the Prophet's Home
- [x] 100 His Daughters, Fatimah Zaynab Ruqayyah Umm Kulthum
- [x] 101 The Death of Ibrahim, A Father's Grief

#### Unit 22 The Slander (Hadith al-Ifk) — NOT STARTED (Lessons 102-104)
- [x] 102 The Incident of Hadith al-Ifk
- [x] 103 The Revelation That Cleared Her Name
- [x] 104 What the Slander Teaches About Justice and Rumor

#### Unit 23 Hudaybiyyah — NOT STARTED (Lessons 105-110)
- [x] 105 The Dream of Umrah
- [x] 106 Quraysh Blocks the Path
- [x] 107 Uthman's Mission to Mecca (clear fled/traitor claims directly)
- [x] 108 The Pledge of Ridwan
- [x] 109 The Terms of the Treaty, Why a Defeat Was a Victory
- [x] 110 Riba Is Prohibited

#### Unit 24 Letters to the Kings — NOT STARTED (Lessons 111-114)
- [x] 111 Why the Prophet Wrote to Kings
- [x] 112 The Letter to Heraclius
- [x] 113 The Letter to Khusraw
- [x] 114 The Letters to the Negus and Muqawqis

#### Unit 25 Khaybar — NOT STARTED (Lessons 115-118)
- [x] 115 The March to Khaybar
- [x] 116 Ali's Strength at the Gate
- [x] 117 Safiyyah and the Aftermath
- [x] 118 The Poisoned Meat

#### Unit 26 Mu'tah and the Road to Mecca — NOT STARTED (Lessons 119-121)
- [x] 119 The Messenger Who Was Killed
- [x] 120 The Battle of Mu'tah (Ja'far's martyrdom)
- [x] 121 Quraysh Breaks the Treaty

#### Unit 27 The Conquest of Mecca — NOT STARTED (Lessons 122-127)
- [x] 122 The March on Mecca
- [x] 123 Abu Sufyan's Night Visit
- [x] 124 Entering the City Without Bloodshed
- [x] 125 The General Amnesty
- [x] 126 Cleansing the Kaaba
- [x] 127 Bilal's Adhan from the Kaaba

#### Unit 28 Hunayn and Ta'if Revisited — NOT STARTED (Lessons 128-130)
- [x] 128 The Battle of Hunayn
- [x] 129 The Distribution of Spoils
- [x] 130 The Siege of Ta'if Revisited

#### Unit 29 Tabuk and the Year of Delegations — NOT STARTED (Lessons 131-133)
- [ ] 131 The Call to Tabuk
- [ ] 132 Those Who Stayed Behind
- [ ] 133 The Year of Delegations

#### Unit 29b Ghadir Khumm — NOT STARTED (Lesson 134)
- [ ] 134 Ghadir Khumm, What Was Actually Said (evenhanded, cross-school reading)

#### Unit 30 The Legal Architecture of Medina — NOT STARTED (Lessons 135-140)
- [ ] 135 Inheritance Law in Full
- [ ] 136 Hijab and Modesty, Context and Wisdom
- [ ] 137 Riba and Economic Justice
- [ ] 138 Marriage, Divorce, and Family Law
- [ ] 139 Criminal Justice and Hudud
- [ ] 140 The Prophet as Wali, Debt Orphans and the Vulnerable

#### Unit 31 The Farewell Pilgrimage — NOT STARTED (Lessons 141-143)
- [ ] 141 The Final Hajj
- [ ] 142 The Sermon at Arafat
- [ ] 143 The Completion of Religion

#### Unit 32 The Final Illness and Death — NOT STARTED (Lessons 144-147)
- [ ] 144 The Illness Begins
- [ ] 145 Bilal's Final Calls
- [ ] 146 The Last Sermon and Final Days
- [ ] 147 The Night He Returned to His Lord

#### Unit 33 After Him — NOT STARTED (Lessons 148-151)
- [ ] 148 The Shock of His Death
- [ ] 149 Abu Bakr's Steadying Words
- [ ] 150 Saqifah, A Careful Balanced Look
- [ ] 151 Origins of Anti-Sahaba Narratives (Ibn Saba etc), unity focused not sectarian targeted

---

Last updated: Section 6 in progress, through Unit 28 Lesson 130. 130 lessons total written across all sections so far.
