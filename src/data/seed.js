export const courses = [
  { id: "igcse", name: "IGCSE" },
  { id: "ib", name: "IB" },
  { id: "ielts", name: "IELTS" },
  { id: "toefl", name: "TOEFL" },
  { id: "gre", name: "GRE" }
];

export const words = [
  {
    id: "w1",
    lemma: "sustain",
    pos: "verb",
    phonetics: "/suh-STEYN/",
    difficulty: 360,
    senses: {
      en: "to keep something going over time",
      zh: "维持，保持"
    },
    example: "Solar panels can sustain power for the entire cabin."
  },
  {
    id: "w2",
    lemma: "allocate",
    pos: "verb",
    phonetics: "/AL-uh-kayt/",
    difficulty: 520,
    senses: {
      en: "to distribute resources for a purpose",
      zh: "分配"
    },
    example: "The team allocated extra time for revision."
  },
  {
    id: "w3",
    lemma: "adjacent",
    pos: "adj",
    phonetics: "/uh-JAY-sent/",
    difficulty: 280,
    senses: {
      en: "next to something else",
      zh: "相邻的"
    },
    example: "The library sits adjacent to the science lab."
  },
  {
    id: "w4",
    lemma: "meticulous",
    pos: "adj",
    phonetics: "/muh-TIK-yuh-lus/",
    difficulty: 640,
    senses: {
      en: "very careful and precise",
      zh: "一丝不苟的"
    },
    example: "Her meticulous notes helped the study group."
  },
  {
    id: "w5",
    lemma: "inference",
    pos: "noun",
    phonetics: "/IN-fer-ens/",
    difficulty: 430,
    senses: {
      en: "a conclusion based on evidence",
      zh: "推论"
    },
    example: "The inference was drawn from the data trends."
  },
  {
    id: "w6",
    lemma: "coherent",
    pos: "adj",
    phonetics: "/koh-HEER-uhnt/",
    difficulty: 470,
    senses: {
      en: "logical and consistent",
      zh: "连贯的"
    },
    example: "The essay remained coherent throughout."
  },
  {
    id: "w7",
    lemma: "mitigate",
    pos: "verb",
    phonetics: "/MIT-ih-gayt/",
    difficulty: 610,
    senses: {
      en: "to reduce severity",
      zh: "缓解"
    },
    example: "Planting trees can mitigate heat in cities."
  },
  {
    id: "w8",
    lemma: "abundant",
    pos: "adj",
    phonetics: "/uh-BUHN-duhnt/",
    difficulty: 310,
    senses: {
      en: "more than enough",
      zh: "丰富的"
    },
    example: "The region has abundant rainfall."
  },
  {
    id: "w9",
    lemma: "transition",
    pos: "noun",
    phonetics: "/tran-ZISH-uhn/",
    difficulty: 390,
    senses: {
      en: "a change from one state to another",
      zh: "过渡"
    },
    example: "The transition to the new syllabus was smooth."
  },
  {
    id: "w10",
    lemma: "precise",
    pos: "adj",
    phonetics: "/pri-SAHYS/",
    difficulty: 250,
    senses: {
      en: "exact and accurate",
      zh: "精确的"
    },
    example: "Use precise measurements in the experiment."
  },
  {
    id: "w11",
    lemma: "evaluate",
    pos: "verb",
    phonetics: "/ih-VAL-yoo-ayt/",
    difficulty: 450,
    senses: {
      en: "to judge or assess",
      zh: "评估"
    },
    example: "Students evaluate their progress weekly."
  },
  {
    id: "w12",
    lemma: "constraint",
    pos: "noun",
    phonetics: "/kuhn-STRAHNT/",
    difficulty: 560,
    senses: {
      en: "a limit or restriction",
      zh: "限制"
    },
    example: "Budget constraints affected the plan."
  },
  {
    id: "w13",
    lemma: "derive",
    pos: "verb",
    phonetics: "/dih-RAHYV/",
    difficulty: 500,
    senses: {
      en: "to obtain from a source",
      zh: "获得，推导"
    },
    example: "We derive meaning from context."
  },
  {
    id: "w14",
    lemma: "clarity",
    pos: "noun",
    phonetics: "/KLAIR-uh-tee/",
    difficulty: 300,
    senses: {
      en: "the quality of being clear",
      zh: "清晰"
    },
    example: "Clarity matters in instructions."
  },
  {
    id: "w15",
    lemma: "persistent",
    pos: "adj",
    phonetics: "/per-SIS-tuhnt/",
    difficulty: 580,
    senses: {
      en: "continuing firmly",
      zh: "坚持不懈的"
    },
    example: "Persistent practice improves results."
  }
];

export const passages = [
  {
    id: "p1",
    courseId: "igcse",
    title: "A Forest Classroom",
    sourceLabel: "Open sample passage (IGCSE-style)",
    licenseLabel: "CC0",
    difficulty: 320,
    text:
      "Students met in a forest clearing to study ecology. The guide explained how shade helps sustain cool temperatures and how insects migrate across adjacent habitats. The group recorded precise notes and evaluated the evidence together."
  },
  {
    id: "p2",
    courseId: "ielts",
    title: "City Air and Trees",
    sourceLabel: "Open sample passage (IELTS-style)",
    licenseLabel: "CC0",
    difficulty: 520,
    text:
      "Urban planners allocate space for trees to mitigate heat. The transition to greener streets depends on persistent care, but abundant shade often improves comfort for residents."
  },
  {
    id: "p3",
    courseId: "gre",
    title: "Data and Decisions",
    sourceLabel: "Open sample passage (GRE-style)",
    licenseLabel: "CC0",
    difficulty: 640,
    text:
      "Researchers derive coherent explanations from complex data. Their meticulous approach reduces constraint-related errors and strengthens inference about long-term change."
  },
  {
    id: "p4",
    courseId: "ib",
    title: "Systems and Choices",
    sourceLabel: "Open sample passage (IB-style)",
    licenseLabel: "CC0",
    difficulty: 460,
    text:
      "Students evaluate how communities allocate resources. They derive clarity from coherent arguments and make inferences about long-term transition planning."
  },
  {
    id: "p5",
    courseId: "toefl",
    title: "Habitats and Climate",
    sourceLabel: "Open sample passage (TOEFL-style)",
    licenseLabel: "CC0",
    difficulty: 440,
    text:
      "Animals in adjacent habitats adjust to climate constraints. Scientists evaluate changes and record precise observations to support coherent reports."
  }
];

export const courseWordMap = {
  igcse: ["w1", "w3", "w8", "w10", "w14", "w9"],
  ib: ["w1", "w2", "w5", "w6", "w9", "w11"],
  ielts: ["w2", "w7", "w8", "w9", "w10", "w15"],
  toefl: ["w3", "w5", "w6", "w11", "w12", "w14"],
  gre: ["w4", "w7", "w12", "w13", "w15", "w5"]
};
