Version 1 (2026.1.18 22:50)
1) Core entities & data model

Implement these tables:

User (guest allowed via local storage; optional auth later)

Course (IGCSE / IB / IELTS / TOEFL / GRE)

WordEntry (lemma, POS optional, phonetics optional)

WordSense (language, short definition, example sentence optional)

CourseWord (course_id, word_id, difficulty_rank, tags)

UserWordState (user_id, word_id, course_id, status: unseen/seen/interacted/learned, mastery_score 0-100, last_seen_at)

ReadingPassage (course_id, title, source_label, license_label, text, difficulty_rank)

BasketItem (user_id, word_id, created_at)

PracticeItem (user_id, word_id, type: mcq/spelling, prompt, options, answer, created_at)

PracticeResult (user_id, practice_item_id, is_correct, time_spent)

2) App IA (pages & routing)

Home page has 3 main modules (rename for clarity):

“Flashcard Drill”

“Guided Reading”

“Practice Tests”
Also show: current course, today progress, estimated vocab size.

Pages:

/onboarding: choose course + initial placement test (optional MVP-lite)

/flashcards

/reading

/practice

/notes (saved words)

/mistakes (words answered wrong)

/settings (definition language, words-per-session)

3) Flashcards requirements

Default session: 5 words; user can set 5–20.

Flip animation: front=word, back=definition (EN default) + optional ZH toggle.

Buttons per card: “I know this” and “I don’t know this”.

If “I know this”: mark state=learned for this session and skip forward.

If “I don’t know this”: keep in rotation; do not skip.

Must support “Previous” to return to earlier words and undo skip decisions.

A word becomes “interacted” when flipped; becomes “learned” when user explicitly chooses “I know this” OR finishes session with correct practice later (MVP choose one rule and document it).

4) Guided Reading requirements

Show a passage matched to user ability and selected course.

Passage must display source_label + license_label.

Each word should be selectable; also support drag-to-basket.

Basket fixed at bottom; user can click:

Translate (EN / ZH / both)

Add to Notes

Add to Mistakes

A word becomes “interacted” when user translates it from basket.

5) Practice Tests (MCQ + Spelling)

Generate questions from words tagged as interacted/learned.

MCQ: 4 options definition-based (avoid duplicates, include plausible distractors).

Spelling: show definition, user types the word; allow minor typos? (MVP: exact match, case-insensitive).

Record results; wrong answers add to Mistakes automatically.

6) Dynamic level analysis (MVP algorithm)

Maintain user ability_rank per course (0–1000).

Word difficulty_rank also 0–1000 (seed from frequency bands or imported list).

Selection rules:

Flashcards: pick unseen/interacted words near ability_rank ± 80.

Reading: pick passage difficulty_rank near ability_rank ± 120.

Practice: 70% from recent words (last 7 days), 30% from older words.

Update ability_rank after each practice session:

ability_rank = 0.8ability_rank + 0.2(avg difficulty of correctly answered items)

Display “Estimated vocabulary size” as a simple mapping from ability_rank (document assumptions).

7) UI/UX style

Forest theme: muted greens, warm neutrals, high contrast for text, accessible.

Smooth animations: card flip, module transitions, basket interactions.

Emphasize the 3 core modules visually; keep navigation minimal.

8) Seed data & content policy

Provide sample word lists and passages using redistributable sources only.

If exam-specific official content is not redistributable, DO NOT include it. Instead:

include “sample passages” with open licenses and tag them by difficulty/course.

9) Acceptance criteria

npm install && npm run dev runs with seeded data.

User can complete one full loop in one course:
flashcards → reading → practice, and see progress + ability update.

Learned/interacted words persist across sessions.

Notes and Mistakes pages show correct words.

Return the full project structure, key files, and README instructions.

Version 2(2026.1.18 23:00)
Some errors found during the using the webiste, if these errors indeed exist due to lack of specific function, add new functions. if some functions are there but I didn't found it, tell me where to found/use it.
1. cannot choose courses, the default is IGCSE and cannot choose others. Include IELTS, GRE, IB, and TOEFL as well, make it selectable.
2. NO ending session for flash cards, once all words are learnt, there are no way to exit the flash cards mode, and there is no posive feed back(e.g. congragulations). User need to exit and get positive feed back
3. Not every single word in the paragraph can be dragged, only the learnt word, and the paragraph does not have a clear source, the paragraph does not necesarily include the learnt words. And match the source of paragraph with the course the user is learning (e.g. if he is learning IELTS, find a paragrpah from past year papers)
4. After adding the words into basket, the translator does not work, no meaning shows up.
5. No feedback after finishing one MCQ/Spelling practise, and no ending and positive feed back after finishing all, add some
6. The UI is too simple, and animation is not attractive and fluent enough.

Version 3 (2026.1.18 23:30)
Updates based on Version 2 feedback:
1. Added course selector in the header and in Settings so you can switch between IGCSE/IELTS/GRE/IB/TOEFL.
2. Flashcards now show a completion screen with congratulations, plus “Start new session” and “Exit to Home”.
3. Reading: all word tokens are clickable/draggable; passages are provided per course with open-license labels.
   - Official past-year papers are not included to respect redistribution limits.
4. Basket translation now displays meanings; for unseeded words it shows a fallback “Definition not seeded yet.”
5. Practice now gives per-question feedback and a final score summary with exit option.
6. Added smoother animations and hover transitions for cards/modules/basket/buttons.