import React, { useState, useEffect, useRef, useMemo } from "react";
import { Dices, Clock, Mic, ArrowLeft, ExternalLink, Save, ChevronRight, X, Flame } from "lucide-react";

/* ---------------------------------------------------------------
   CONTENT BANK — research-constructed, not an official syllabus.
   Built from actual APS408 course outline + established
   correctional / family-therapy / supervision / health-psych /
   grief-counselling / practicum curricula (incl. Kenyan sources
   for APS422).
--------------------------------------------------------------- */
const CONTENT = [
  { unitCode: "APS408", unitName: "Psychotherapy in Africa", topics: [
    { name: "African Psychotherapy vs. Psychotherapy in Africa", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the difference between 'African psychotherapy' and 'psychotherapy in Africa.'" },
      { type: "debate", difficulty: "advanced", prompt: "Is most therapy practiced in Africa today still fundamentally a Western import? Argue a position." } ]},
    { name: "African Worldview and Personhood", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How might African concepts of wellness and personhood differ from Western biomedical models of the self?" },
      { type: "teach", difficulty: "beginner", prompt: "Explain the African concept of communal personhood as though teaching a first-year student." } ]},
    { name: "Family Values and Child Psychology", challenges: [
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between traditional African family values and how child development is understood in this context." },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client raised under strong communal family values struggles with individual decision-making in therapy focused on personal autonomy. How would you conceptualize this tension?" } ]},
    { name: "Conflict Mediation in African Communities", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Describe traditional African approaches to conflict mediation and how they differ from formal Western dispute-resolution models." },
      { type: "compare", difficulty: "advanced", prompt: "Compare community-based conflict mediation with individual talk-therapy approaches to interpersonal conflict." } ]},
    { name: "Rituals and Therapy", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "What role can ritual play in psychotherapy within an African cultural context?" },
      { type: "case", difficulty: "advanced", prompt: "A grieving client wants to perform a cleansing ritual before continuing talk therapy. How would you respond, and why?" } ]},
    { name: "Psychological Adaptation of Modern African Youth", challenges: [
      { type: "research", difficulty: "advanced", prompt: "What does current research suggest about the psychological pressures facing modern African youth caught between traditional and globalized identities?" },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between urbanization and the erosion of traditional communal support systems for young Africans." } ]},
  ]},
  { unitCode: "APS415", unitName: "Correctional Counselling", topics: [
    { name: "Role and Ethics of the Correctional Counsellor", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Describe the core role of a correctional counsellor and the main ethical challenges specific to that setting." },
      { type: "debate", difficulty: "advanced", prompt: "Can punishment and rehabilitation coexist? Discuss from a counselling perspective." } ]},
    { name: "Assessment and Classification of Offenders", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain why risk assessment and classification are foundational to effective correctional treatment planning." },
      { type: "clinical_application", difficulty: "advanced", prompt: "An offender is classified as low-risk but placed in an intensive treatment program regardless. What problems does this create, and how would you argue for reclassification?" } ]},
    { name: "Person-Centred and Family Systems Approaches in Corrections", challenges: [
      { type: "compare", difficulty: "intermediate", prompt: "Compare a person-centred approach with a family-systems approach when counselling an incarcerated client." },
      { type: "case", difficulty: "advanced", prompt: "An incarcerated client's family systematically excludes him from decisions about his children. How might a family-systems lens inform your counselling?" } ]},
    { name: "Substance Use and Co-Occurring Disorders", challenges: [
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between substance-use disorders and recidivism, and why co-occurring disorders complicate correctional treatment." },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client with a co-occurring substance use disorder and untreated depression relapses shortly after release. How would you re-approach treatment planning?" } ]},
    { name: "Anger Management and Domestic Abuse Counselling", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "What core skills does anger management counselling aim to build, and why is it commonly mandated in correctional settings?" },
      { type: "debate", difficulty: "advanced", prompt: "Is court-mandated domestic-abuse counselling genuinely effective, or does mandated attendance undermine therapeutic change? Argue a position." } ]},
    { name: "Recidivism and Evaluating Correctional Interventions", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Why does recidivism matter when evaluating counselling effectiveness in correctional settings?" },
      { type: "research", difficulty: "advanced", prompt: "What does current research suggest about which types of correctional interventions most reliably reduce recidivism?" } ]},
  ]},
  { unitCode: "APS416", unitName: "Introduction to Family Therapy", topics: [
    { name: "Systems Theory and Family Structure", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What does it mean to treat the family as a system rather than treating an individual?" },
      { type: "explain", difficulty: "intermediate", prompt: "Explain how communication patterns within a family can maintain a presenting problem over time." } ]},
    { name: "Bowen Family Systems Theory", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain Bowen's concept of differentiation of self." },
      { type: "clinical_application", difficulty: "advanced", prompt: "A mother consistently confides in her teenage son about marital conflict. Using Bowen's theory, what dynamic is this, and how would you intervene?" } ]},
    { name: "Structural and Strategic Family Therapy", challenges: [
      { type: "compare", difficulty: "intermediate", prompt: "Compare Structural and Strategic Family Therapy in terms of focus and intervention style." },
      { type: "debate", difficulty: "advanced", prompt: "Is it ethical to use paradoxical, symptom-prescribing strategic interventions without fully explaining the rationale to the family? Argue a position." } ]},
    { name: "Virginia Satir's Experiential Approach", challenges: [
      { type: "teach", difficulty: "beginner", prompt: "Explain Virginia Satir's experiential approach to family therapy as though teaching a first-year student." },
      { type: "explain", difficulty: "intermediate", prompt: "What does Satir mean by family 'communication stances,' and how are they used clinically?" } ]},
    { name: "Solution-Focused and Narrative Family Therapy", challenges: [
      { type: "compare", difficulty: "intermediate", prompt: "Compare solution-focused and narrative approaches to family therapy in terms of how each views the 'problem.'" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A family insists their teenager 'is the problem.' How would a narrative therapist reframe this through externalization?" } ]},
    { name: "Cultural Considerations: African vs Western Family Models", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How might African family structures challenge Western family-therapy models built around the nuclear family?" },
      { type: "case", difficulty: "advanced", prompt: "A Western-trained therapist insists on seeing 'just the nuclear family,' but the extended family plays the central decision-making role. How should the therapist adapt?" } ]},
  ]},
  { unitCode: "APS428", unitName: "Counselling Practicum Supervision", topics: [
    { name: "Purpose and Models of Clinical Supervision", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What is the difference between supervision and therapy?" },
      { type: "compare", difficulty: "intermediate", prompt: "Compare a developmental model of supervision with a systems-based model in terms of how each tracks trainee growth." } ]},
    { name: "Bernard's Discrimination Model", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain Bernard's Discrimination Model of supervision and the three roles a supervisor can occupy." },
      { type: "clinical_application", difficulty: "advanced", prompt: "A trainee needs help with a specific technique, not emotional processing. Which role should the supervisor occupy in that moment, per Bernard's model?" } ]},
    { name: "The Supervisory Relationship and Power Dynamics", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain why the power differential in the supervisory relationship requires careful boundary management." },
      { type: "debate", difficulty: "advanced", prompt: "Should supervisors and trainees ever maintain social relationships outside the training context? Argue a position." } ]},
    { name: "Ethics, Confidentiality and Informed Consent in Supervision", challenges: [
      { type: "clinical_application", difficulty: "advanced", prompt: "How should a supervisor respond when a supervisee breaches client confidentiality?" },
      { type: "explain", difficulty: "intermediate", prompt: "What must informed consent cover when a client is being seen by a trainee under supervision?" } ]},
    { name: "Cultural Considerations in Supervision", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Why is culture important in clinical supervision, both for the client's case and the supervisory relationship itself?" },
      { type: "case", difficulty: "advanced", prompt: "A trainee and supervisor come from very different cultural backgrounds and disagree on how to interpret a client's silence. How should this be navigated?" } ]},
    { name: "Managing Difficult Supervisory Situations", challenges: [
      { type: "clinical_application", difficulty: "advanced", prompt: "A trainee consistently under-reports how distressed their clients are, minimizing risk in their notes. As supervisor, how would you address this pattern?" },
      { type: "explain", difficulty: "intermediate", prompt: "What signs indicate a supervisee may be struggling with impairment rather than a normal developmental skill gap?" } ]},
  ]},
  { unitCode: "APS431", unitName: "Psychology of Health, Stress and Coping", topics: [
    { name: "Conceptualisations of Stress", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the three major ways psychologists have conceptualised stress: as a stimulus, a response, and a transaction." },
      { type: "debate", difficulty: "intermediate", prompt: "Is stress always harmful?" } ]},
    { name: "Cognitive Appraisal Theory", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How does cognitive appraisal influence an individual's experience of stress?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client believes their inability to cope with stress means they are weak. Using cognitive appraisal theory, how might you conceptualize this?" } ]},
    { name: "General Adaptation Syndrome", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the General Adaptation Syndrome in one minute." },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between prolonged time in the 'exhaustion' stage of GAS and physical illness." } ]},
    { name: "Problem-Focused and Emotion-Focused Coping", challenges: [
      { type: "compare", difficulty: "beginner", prompt: "What is the difference between problem-focused and emotion-focused coping?" },
      { type: "case", difficulty: "intermediate", prompt: "A client facing a terminal diagnosis relies mainly on emotion-focused coping. Is this maladaptive? Justify your answer." } ]},
    { name: "Resilience and Stress-Related Growth", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Can stress ever improve performance? Explain using the concept of stress-related growth." },
      { type: "debate", difficulty: "intermediate", prompt: "Is resilience primarily an individual trait, or a product of environment and social support? Argue a position." } ]},
    { name: "Health Behaviour and Chronic Stress", challenges: [
      { type: "research", difficulty: "advanced", prompt: "What does current research suggest about the impact of chronic stress on long-term physical and mental health?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client with hypertension knows they should exercise but hasn't acted in over a year. What would you target first, and why?" } ]},
  ]},
  { unitCode: "APS422", unitName: "Loss and Grief Counselling", topics: [
    { name: "Distinguishing Loss, Bereavement, Grief and Mourning", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What is the difference between grief, bereavement and mourning?" },
      { type: "teach", difficulty: "beginner", prompt: "Explain the difference between grief and mourning as though teaching a first-year student." } ]},
    { name: "Types of Grief: Anticipatory, Chronic, Delayed, Masked", challenges: [
      { type: "teach", difficulty: "beginner", prompt: "Explain anticipatory grief as though you were teaching a first-year psychology student." },
      { type: "case", difficulty: "advanced", prompt: "A bereaved client appears emotionally unaffected several months after a death. How might a counsellor understand this presentation — could it be delayed or masked grief?" } ]},
    { name: "Theories of Grief and Bereavement", challenges: [
      { type: "debate", difficulty: "intermediate", prompt: "Can grief become pathological? Where should the clinical line be drawn?" },
      { type: "compare", difficulty: "advanced", prompt: "Compare the Kübler-Ross stage model with the Dual Process Model of bereavement in terms of how each defines 'healthy' grieving." } ]},
    { name: "Funeral Rituals and Culture in the Grieving Process", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How might culture influence the grieving process, including the role of funeral rituals?" },
      { type: "connect", difficulty: "advanced", prompt: "Explain the relationship between Kenyan communal mourning practices and Western individualized grief models, and where tension might arise clinically." } ]},
    { name: "Grief Counselling Goals and Interventions", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "What are the core goals of grief counselling, such as actualising the loss and readjustment?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client wants to plan a personal 'goodbye ritual' before terminating grief counselling. How would you support this therapeutically?" } ]},
    { name: "Counselling Children Experiencing Loss", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How does children's understanding of death and grief differ across developmental stages?" },
      { type: "case", difficulty: "advanced", prompt: "A 6-year-old whose parent died keeps asking when they are 'coming back.' How would you respond given their developmental understanding of death?" } ]},
  ]},
  { unitCode: "APS407", unitName: "Counselling Practicum", topics: [
    { name: "Client Intake and Establishing Rapport", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What are the essential components of a good client intake, and why does rapport-building matter from the first contact?" },
      { type: "clinical_application", difficulty: "intermediate", prompt: "A new client is guarded and gives one-word answers throughout intake. What would you do to build rapport without pushing too hard?" } ]},
    { name: "Assessment and Case Conceptualisation", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain what a biopsychosocial case conceptualization is and why it's more comprehensive than a diagnosis alone." },
      { type: "case", difficulty: "advanced", prompt: "Given a client with chronic pain, low mood, and recent job loss, outline the biological, psychological, and social factors you'd explore." } ]},
    { name: "Record Keeping and Professional Ethics", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Why is accurate, timely record-keeping both a clinical and legal necessity in counselling practice?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client discloses information they explicitly ask you not to write down. How do you ethically navigate documentation obligations here?" } ]},
    { name: "Referral and Multidisciplinary Teamwork", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "How would you distinguish a counselling problem from a situation requiring referral to another professional?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client's symptoms increasingly suggest an undiagnosed medical condition rather than a purely psychological one. Walk through how you'd raise a referral." } ]},
    { name: "Managing Difficult Cases in Session", challenges: [
      { type: "case", difficulty: "advanced", prompt: "A client repeatedly misses sessions. How would you conceptualise and respond to this pattern?" },
      { type: "clinical_application", difficulty: "advanced", prompt: "A client discloses suicidal thoughts during a session. What should a counsellor consider and do immediately?" } ]},
    { name: "Termination and Evaluating Effectiveness", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Why is the termination phase of counselling clinically significant rather than just an administrative endpoint?" },
      { type: "case", difficulty: "advanced", prompt: "A client with a history of abandonment becomes withdrawn as planned termination approaches. How would you address this in the final sessions?" } ]},
  ]},
];

const POOL = CONTENT.flatMap((u) =>
  u.topics.flatMap((t) =>
    t.challenges.map((c) => ({
      ...c,
      unitCode: u.unitCode,
      unitName: u.unitName,
      topicName: t.name,
      topicKey: `${u.unitCode}::${t.name}`,
      id: `${u.unitCode}::${t.name}::${c.prompt.slice(0, 24)}`,
    }))
  )
);

/* ---------------------------------------------------------------
   GENERAL PSYCHOLOGY POOL — no coursework required. Built for
   anyone curious about psychology to pick up and explore (fits
   a general/podcast-style audience, not just counselling students).
--------------------------------------------------------------- */
const GENERAL_CONTENT = [
  { unitCode: "COG", unitName: "Cognitive Psychology", topics: [
    { name: "Cognitive Biases", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What is confirmation bias, and how does it quietly shape everyday decisions?" },
      { type: "case", difficulty: "intermediate", prompt: "A friend keeps investing in a failing business because they 'already put so much in.' What cognitive bias explains this, and how would you explain it to them?" } ]},
    { name: "Memory Distortion", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Why are human memories reconstructive rather than exact recordings, and what does that mean for eyewitness testimony?" },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between repeated retelling of a memory and how much that memory can change over time." } ]},
    { name: "Decision-Making Under Uncertainty", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain the availability heuristic and give an everyday example of it leading someone astray." },
      { type: "debate", difficulty: "intermediate", prompt: "Are humans fundamentally rational decision-makers, or is 'rational' the wrong lens entirely? Argue a position." } ]},
  ]},
  { unitCode: "SOC", unitName: "Social Psychology", topics: [
    { name: "Conformity and Obedience", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What did Milgram's obedience experiments reveal about ordinary people's willingness to follow authority?" },
      { type: "case", difficulty: "intermediate", prompt: "A new employee goes along with a workplace practice they privately think is wrong because 'everyone does it.' Explain this using conformity research." } ]},
    { name: "The Bystander Effect", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What is the bystander effect, and why does having more witnesses to an emergency sometimes make help less likely, not more?" },
      { type: "teach", difficulty: "beginner", prompt: "Explain the bystander effect as though teaching someone with no psychology background." } ]},
    { name: "Persuasion and Social Influence", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain one classic principle of persuasion (e.g. reciprocity or social proof) and how advertisers exploit it." },
      { type: "debate", difficulty: "intermediate", prompt: "Is persuasive advertising a form of manipulation, or simply effective communication? Argue a position." } ]},
  ]},
  { unitCode: "DEV", unitName: "Developmental Psychology", topics: [
    { name: "Attachment Styles", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What are the four main attachment styles, and where do they come from?" },
      { type: "case", difficulty: "intermediate", prompt: "Someone notices they push partners away whenever a relationship starts to feel serious. What attachment pattern might explain this, and why?" } ]},
    { name: "Adolescent Identity Formation", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain Erikson's concept of 'identity vs. role confusion' during adolescence." },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between social media use and identity formation in teenagers today." } ]},
    { name: "Nature vs. Nurture", challenges: [
      { type: "debate", difficulty: "beginner", prompt: "Is personality mostly shaped by genetics or by upbringing? Argue a position." },
      { type: "explain", difficulty: "intermediate", prompt: "Explain what twin studies have taught psychologists about the nature-nurture debate." } ]},
  ]},
  { unitCode: "PERS", unitName: "Personality Psychology", topics: [
    { name: "The Big Five Traits", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the Big Five personality traits and why psychologists trust this model more than simpler ones like the four temperaments." },
      { type: "teach", difficulty: "beginner", prompt: "Explain what 'conscientiousness' means as a personality trait, as though teaching a curious teenager." } ]},
    { name: "Narcissism in Everyday Life", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "What's the difference between someone being 'a bit vain' and clinically significant narcissistic traits?" },
      { type: "debate", difficulty: "intermediate", prompt: "Has 'narcissist' become an overused pop-psychology label? Argue a position." } ]},
    { name: "Self-Esteem and Self-Concept", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the difference between self-esteem and self-concept." },
      { type: "case", difficulty: "intermediate", prompt: "Someone performs excellently at work but still feels like a fraud who'll be 'found out.' How would you explain this psychologically?" } ]},
  ]},
  { unitCode: "CLIN", unitName: "Clinical Psychology", topics: [
    { name: "Anxiety in Everyday Life", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What's the psychological difference between normal worry and an anxiety disorder?" },
      { type: "teach", difficulty: "beginner", prompt: "Explain what a panic attack actually is, physiologically, as though teaching someone who has never experienced one." } ]},
    { name: "Habit Formation and Addiction", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain the habit loop of cue, routine and reward, and how it applies to both good habits and addiction." },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between dopamine and why habits are so hard to break once formed." } ]},
    { name: "Imposter Syndrome", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What is imposter syndrome, and why does it often hit high-achievers hardest?" },
      { type: "case", difficulty: "intermediate", prompt: "A top student is convinced their good grades are 'luck' and fears being exposed as not smart enough. How would you explain what's happening?" } ]},
  ]},
  { unitCode: "POS", unitName: "Positive Psychology", topics: [
    { name: "What Makes People Happy", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "According to positive psychology research, what actually predicts long-term happiness — and what commonly doesn't?" },
      { type: "debate", difficulty: "intermediate", prompt: "Can money buy happiness? Argue a position using what research actually shows." } ]},
    { name: "Gratitude and Wellbeing", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "What does research say about how gratitude practices affect mental wellbeing?" },
      { type: "teach", difficulty: "beginner", prompt: "Explain why 'counting your blessings' isn't just a cliché but has real psychological backing, as though teaching a skeptic." } ]},
    { name: "Flow and Peak Performance", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain Csikszentmihalyi's concept of 'flow' and the conditions that tend to produce it." },
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between flow states and long-term motivation to keep pursuing a skill." } ]},
  ]},
  { unitCode: "REL", unitName: "Psychology of Relationships", topics: [
    { name: "Love Languages", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Explain the concept of 'love languages' and the main critique psychologists have of the theory." },
      { type: "case", difficulty: "intermediate", prompt: "One partner shows love through doing chores; the other wants verbal affirmation and feels unloved. How would you explain this mismatch?" } ]},
    { name: "Attachment in Adult Relationships", challenges: [
      { type: "connect", difficulty: "intermediate", prompt: "Explain the relationship between childhood attachment style and how someone tends to handle conflict in adult romantic relationships." },
      { type: "explain", difficulty: "intermediate", prompt: "What does it mean for two people to have an 'anxious-avoidant' relationship dynamic?" } ]},
    { name: "Conflict Styles in Couples", challenges: [
      { type: "explain", difficulty: "intermediate", prompt: "Explain Gottman's concept of the 'Four Horsemen' that predict relationship breakdown." },
      { type: "case", difficulty: "advanced", prompt: "A couple never raises their voices but one partner consistently shuts down and goes silent during disagreements. Is this healthier than open conflict? Explain your reasoning." } ]},
  ]},
  { unitCode: "POP", unitName: "Everyday Psychology", topics: [
    { name: "Social Media and Mental Health", challenges: [
      { type: "research", difficulty: "intermediate", prompt: "What does current research suggest about the relationship between social media use and mental health in young people?" },
      { type: "debate", difficulty: "intermediate", prompt: "Is social media genuinely harmful to mental health, or is it a scapegoat for deeper societal issues? Argue a position." } ]},
    { name: "Procrastination", challenges: [
      { type: "explain", difficulty: "beginner", prompt: "Why do psychologists now see procrastination as an emotion-regulation problem rather than a time-management problem?" },
      { type: "case", difficulty: "intermediate", prompt: "Someone always waits until the night before a deadline, even though it stresses them out every time. What's actually driving this?" } ]},
    { name: "Sleep and Mood", challenges: [
      { type: "connect", difficulty: "beginner", prompt: "Explain the relationship between poor sleep and irritability or low mood the next day." },
      { type: "explain", difficulty: "intermediate", prompt: "Why does sleep deprivation affect emotional regulation more than it affects raw intelligence?" } ]},
  ]},
];

const GENERAL_POOL = GENERAL_CONTENT.flatMap((u) =>
  u.topics.flatMap((t) =>
    t.challenges.map((c) => ({
      ...c,
      unitCode: u.unitCode,
      unitName: u.unitName,
      topicName: t.name,
      topicKey: `${u.unitCode}::${t.name}`,
      id: `${u.unitCode}::${t.name}::${c.prompt.slice(0, 24)}`,
    }))
  )
);

const TYPE_LABEL = {
  explain: "Explain", research: "Research", clinical_application: "Clinical Application",
  compare: "Compare", debate: "Debate", connect: "Connect", case: "Case", teach: "Teach",
};

const DIFF_COLOR = { beginner: "#2F6F6B", intermediate: "#B8862E", advanced: "#B23A2E" };

const PRESENT_OPTIONS = [60, 180, 300, 600, 900];

function fmt(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function Ring({ total, remaining, color, size = 220 }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, remaining / total));
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2A2F38" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        style={{ transition: "stroke-dashoffset 1s linear" }}
      />
    </svg>
  );
}

function Stamp({ difficulty }) {
  const color = DIFF_COLOR[difficulty];
  return (
    <div style={{
      border: `2px solid ${color}`, color, fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12, letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 3,
      transform: "rotate(-6deg)", display: "inline-block", textTransform: "uppercase",
      opacity: 0.9,
    }}>{difficulty}</div>
  );
}

export default function PsychSprint() {
  const [screen, setScreen] = useState("dashboard");
  const [mode, setMode] = useState("coursework"); // "coursework" | "general"
  const [sessions, setSessions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [challenge, setChallenge] = useState(null);

  const [prepTotal] = useState(900);
  const [prepLeft, setPrepLeft] = useState(900);
  const [prepRunning, setPrepRunning] = useState(false);
  const prepRef = useRef(null);

  const [presentTotal, setPresentTotal] = useState(60);
  const [presentLeft, setPresentLeft] = useState(60);
  const [presentRunning, setPresentRunning] = useState(false);
  const presentRef = useRef(null);

  const [notes, setNotes] = useState({ concept: "", evidence: "", theory: "", example: "", argument: "" });
  const [ratings, setRatings] = useState({ understanding: 3, confidence: 3, clarity: 3, structure: 3, evidence: 3 });
  const [reflection, setReflection] = useState({ struggle: "", research: "", learned: "" });
  const [saveError, setSaveError] = useState(false);

  // load history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psychsprint_sessions");
      if (raw) setSessions(JSON.parse(raw));
    } catch (e) { /* no history yet, or storage unavailable */ }
    setLoaded(true);
  }, []);

  // prep timer
  useEffect(() => {
    if (!prepRunning) return;
    prepRef.current = setInterval(() => {
      setPrepLeft((s) => {
        if (s <= 1) { clearInterval(prepRef.current); setPrepRunning(false); setScreen("present-intro"); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(prepRef.current);
  }, [prepRunning]);

  // present timer
  useEffect(() => {
    if (!presentRunning) return;
    presentRef.current = setInterval(() => {
      setPresentLeft((s) => {
        if (s <= 1) { clearInterval(presentRef.current); setPresentRunning(false); setScreen("eval"); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(presentRef.current);
  }, [presentRunning]);

  const stats = useMemo(() => {
    const count = sessions.length;
    const dates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
    let streak = 0;
    if (dates.length) {
      const today = new Date(); today.setHours(0,0,0,0);
      let cursor = new Date(today);
      for (let i = 0; i < dates.length; i++) {
        const dStr = cursor.toISOString().slice(0, 10);
        if (dates.includes(dStr)) { streak++; cursor.setDate(cursor.getDate() - 1); }
        else if (i === 0 && dates[0] !== today.toISOString().slice(0,10)) {
          const yesterday = new Date(today); yesterday.setDate(today.getDate()-1);
          if (dates[0] === yesterday.toISOString().slice(0,10)) { cursor = yesterday; continue; }
          break;
        } else break;
      }
    }
    return { count, streak };
  }, [sessions]);

  const weakAreas = useMemo(() => {
    const byTopic = {};
    sessions.filter((s) => s.mode !== "general").forEach((s) => {
      const avg = (s.ratings.understanding + s.ratings.confidence + s.ratings.clarity + s.ratings.structure + s.ratings.evidence) / 5;
      if (!byTopic[s.topicKey]) byTopic[s.topicKey] = { topicName: s.topicName, unitCode: s.unitCode, total: 0, n: 0 };
      byTopic[s.topicKey].total += avg; byTopic[s.topicKey].n += 1;
    });
    return Object.values(byTopic)
      .map((t) => ({ ...t, avg: t.total / t.n }))
      .filter((t) => t.avg < 3.5)
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 6);
  }, [sessions]);

  function newChallenge(fromWeak) {
    let candidates = mode === "general" ? GENERAL_POOL : POOL;
    if (mode !== "general" && fromWeak && weakAreas.length) {
      const keys = new Set(weakAreas.map((w) => `${w.unitCode}::${w.topicName}`));
      candidates = POOL.filter((c) => keys.has(c.topicKey));
      if (!candidates.length) candidates = POOL;
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    setChallenge(pick);
    setNotes({ concept: "", evidence: "", theory: "", example: "", argument: "" });
    setRatings({ understanding: 3, confidence: 3, clarity: 3, structure: 3, evidence: 3 });
    setReflection({ struggle: "", research: "", learned: "" });
    setFlipped(false);
    setScreen("challenge");
    setTimeout(() => setFlipped(true), 120);
  }

  function startPrep() {
    setPrepLeft(prepTotal); setPrepRunning(true); setScreen("prep");
  }

  function finishPrepEarly() {
    setPrepRunning(false); clearInterval(prepRef.current); setScreen("present-intro");
  }

  function startPresent() {
    setPresentLeft(presentTotal); setPresentRunning(true); setScreen("present");
  }

  function finishPresentEarly() {
    setPresentRunning(false); clearInterval(presentRef.current); setScreen("eval");
  }

  async function saveSession() {
    const session = {
      id: `sess_${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      mode,
      unitCode: challenge.unitCode, unitName: challenge.unitName,
      topicName: challenge.topicName, topicKey: challenge.topicKey,
      type: challenge.type, difficulty: challenge.difficulty, prompt: challenge.prompt,
      ratings, reflection,
    };
    const next = [session, ...sessions];
    setSessions(next);
    try {
      localStorage.setItem("psychsprint_sessions", JSON.stringify(next));
      setSaveError(false);
    } catch (e) { setSaveError(true); }
    setScreen("dashboard");
  }

  const openScholar = () => {
    const q = encodeURIComponent(`${challenge.topicName} ${challenge.unitName}`);
    window.open(`https://scholar.google.com/scholar?q=${q}`, "_blank");
  };

  const wrap = {
    minHeight: "100%", background: "var(--ink)", color: "var(--text)",
    fontFamily: "'IBM Plex Sans', sans-serif", padding: "28px 20px 60px",
    display: "flex", flexDirection: "column", alignItems: "center",
  };

  return (
    <div style={wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root {
          --ink: #14171B; --surface: #1C2129; --surface2: #232A33;
          --manila: #E7DEC7; --text: #E8E6E0; --muted: #8B93A0;
          --teal: #2F6F6B; --red: #B23A2E; --amber: #B8862E;
        }
        * { box-sizing: border-box; }
        button { cursor: pointer; font-family: inherit; }
        button:focus-visible, textarea:focus-visible, input:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
        .ss-display { font-family: 'IBM Plex Serif', serif; }
        .ss-mono { font-family: 'IBM Plex Mono', monospace; }
        .ss-card { background: var(--surface); border: 1px solid #2A303A; border-radius: 10px; }
        .ss-btn-primary { background: var(--teal); color: #F4F1E6; border: none; border-radius: 8px; padding: 14px 26px; font-size: 15px; font-weight: 600; letter-spacing: 0.02em; }
        .ss-btn-primary:hover { filter: brightness(1.1); }
        .ss-btn-secondary { background: transparent; color: var(--text); border: 1px solid #3A4150; border-radius: 8px; padding: 12px 22px; font-size: 14px; }
        .ss-btn-secondary:hover { background: var(--surface2); }
        .ss-link { background: none; border: none; color: var(--muted); font-size: 13px; padding: 6px 0; text-align: left; }
        .ss-link:hover { color: var(--text); }
        textarea, input[type=range] { font-family: inherit; }
        .ss-textarea { width: 100%; background: var(--surface2); border: 1px solid #333A45; border-radius: 6px; color: var(--text); padding: 10px 12px; font-size: 13px; resize: vertical; min-height: 56px; }
        .ss-textarea::placeholder { color: #5A6272; }
      `}</style>

      {screen === "dashboard" && (
        <Dashboard stats={stats} weakAreas={weakAreas} mode={mode} setMode={setMode}
          onChallenge={() => newChallenge(false)}
          onWeak={() => setScreen("weak")} onHistory={() => setScreen("history")} />
      )}

      {screen === "challenge" && challenge && (
        <ChallengeScreen challenge={challenge} flipped={flipped}
          onBack={() => setScreen("dashboard")} onStart={startPrep} onShuffle={() => newChallenge(false)} />
      )}

      {screen === "prep" && challenge && (
        <PrepScreen challenge={challenge} left={prepLeft} total={prepTotal} running={prepRunning}
          notes={notes} setNotes={setNotes} onScholar={openScholar}
          onPause={() => setPrepRunning(false)} onResume={() => setPrepRunning(true)}
          onFinish={finishPrepEarly} />
      )}

      {screen === "present-intro" && challenge && (
        <PresentIntro challenge={challenge} duration={presentTotal} setDuration={setPresentTotal} onGo={startPresent} />
      )}

      {screen === "present" && challenge && (
        <PresentScreen challenge={challenge} left={presentLeft} total={presentTotal} onFinish={finishPresentEarly} />
      )}

      {screen === "eval" && challenge && (
        <EvalScreen challenge={challenge} ratings={ratings} setRatings={setRatings}
          reflection={reflection} setReflection={setReflection} onSave={saveSession} saveError={saveError} />
      )}

      {screen === "history" && (
        <HistoryScreen sessions={sessions} loaded={loaded} onBack={() => setScreen("dashboard")} />
      )}

      {screen === "weak" && (
        <WeakScreen weakAreas={weakAreas} onBack={() => setScreen("dashboard")}
          onTrain={() => newChallenge(true)} />
      )}

      <a href="https://www.instagram.com/psychologistkiariidavis/" target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 7, marginTop: 44,
          background: "var(--surface)", border: "1px solid #2A303A", borderRadius: 999,
          padding: "7px 14px 7px 12px", textDecoration: "none", color: "var(--muted)", fontSize: 12.5,
        }}>
        made by
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5, background: "var(--surface2)",
          borderRadius: 999, padding: "4px 10px 4px 6px", color: "var(--text)", fontWeight: 500,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          @psychologistkiariidavis
        </span>
      </a>
    </div>
  );
}

/* ---------------- Screens ---------------- */

function Dashboard({ stats, weakAreas, mode, setMode, onChallenge, onWeak, onHistory }) {
  const isGeneral = mode === "general";
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32 }}>
      <div className="ss-mono" style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.2em", marginBottom: 18 }}>PSYCHSPRINT</div>

      <div style={{ display: "flex", background: "var(--surface)", border: "1px solid #2A303A", borderRadius: 999, padding: 4, marginBottom: 26 }}>
        <button onClick={() => setMode("coursework")}
          style={{
            border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 600,
            background: !isGeneral ? "var(--teal)" : "transparent", color: !isGeneral ? "#F4F1E6" : "var(--muted)",
          }}>My Coursework</button>
        <button onClick={() => setMode("general")}
          style={{
            border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 600,
            background: isGeneral ? "var(--teal)" : "transparent", color: isGeneral ? "#F4F1E6" : "var(--muted)",
          }}>Explore Psychology</button>
      </div>

      <div className="ss-display" style={{ fontSize: 28, fontWeight: 600, textAlign: "center", lineHeight: 1.25, marginBottom: 6 }}>
        {isGeneral ? <>Curious about the mind?<br />Pick a topic. Explain it.</> : <>You studied it.<br />Now prove you can explain it.</>}
      </div>
      <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 36, textAlign: "center" }}>
        {isGeneral ? "No coursework needed — just curiosity" : "15 minutes to research → 1 minute to speak"}
      </div>

      <button className="ss-btn-primary" onClick={onChallenge}
        style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 17, padding: "18px 34px", marginBottom: 34, boxShadow: "0 8px 24px rgba(47,111,107,0.25)" }}>
        <Dices size={20} /> {isGeneral ? "SURPRISE ME" : "GIVE ME A CHALLENGE"}
      </button>

      <div style={{ display: "flex", gap: 14, marginBottom: 36, width: "100%" }}>
        <div className="ss-card" style={{ flex: 1, padding: "16px 14px", textAlign: "center" }}>
          <div className="ss-display" style={{ fontSize: 24, fontWeight: 600 }}>{stats.count}</div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>challenges completed</div>
        </div>
        <div className="ss-card" style={{ flex: 1, padding: "16px 14px", textAlign: "center" }}>
          <div className="ss-display" style={{ fontSize: 24, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Flame size={18} color="var(--amber)" /> {stats.streak}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>day streak</div>
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {!isGeneral && (
          <button className="ss-link" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={onWeak}>
            Weak Areas {weakAreas.length ? `(${weakAreas.length})` : ""} <ChevronRight size={14} />
          </button>
        )}
        <button className="ss-link" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={onHistory}>
          History <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function ChallengeScreen({ challenge, flipped, onBack, onStart, onShuffle }) {
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
      <TopBar onBack={onBack} label="your challenge" />
      <div style={{ perspective: 1200, width: "100%", marginTop: 30, marginBottom: 30 }}>
        <div style={{
          transform: flipped ? "rotateY(0deg)" : "rotateY(90deg)",
          transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
          background: "var(--manila)", borderRadius: 6, padding: "26px 24px 22px",
          boxShadow: "0 14px 34px rgba(0,0,0,0.4)", position: "relative", color: "#2A2416",
        }}>
          <div style={{
            position: "absolute", top: -14, left: 22, background: "#D8CDA9", color: "#2A2416",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
            padding: "4px 12px", borderRadius: "4px 4px 0 0", border: "1px solid #C4B78E", borderBottom: "none",
          }}>{challenge.unitCode}</div>
          <div style={{ fontSize: 12, color: "#6B5E3F", marginBottom: 12, marginTop: 4 }}>{challenge.unitName} — {challenge.topicName}</div>
          <div className="ss-display" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.4, marginBottom: 18 }}>
            {challenge.prompt}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="ss-mono" style={{ fontSize: 11, color: "#6B5E3F", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {TYPE_LABEL[challenge.type]}
            </div>
            <Stamp difficulty={challenge.difficulty} />
          </div>
        </div>
      </div>

      <button className="ss-btn-primary" onClick={onStart} style={{ width: "100%", display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <Clock size={17} /> START 15-MIN PREP
      </button>
      <button className="ss-btn-secondary" onClick={onShuffle} style={{ width: "100%" }}>Shuffle — give me another</button>
    </div>
  );
}

function PrepScreen({ challenge, left, total, running, notes, setNotes, onScholar, onPause, onResume, onFinish }) {
  const fields = [
    ["concept", "Key concept"], ["evidence", "Important evidence"], ["theory", "Theory"],
    ["example", "Example"], ["argument", "My argument"],
  ];
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10 }}>
      <div className="ss-mono" style={{ color: "var(--muted)", fontSize: 11, letterSpacing: "0.15em", marginBottom: 14 }}>RESEARCH. THINK. BUILD YOUR CASE.</div>
      <div style={{ position: "relative", marginBottom: 6 }}>
        <Ring total={total} remaining={left} color="var(--teal)" />
        <div className="ss-display" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 40, fontWeight: 600,
        }}>{fmt(left)}</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 22, textAlign: "center", maxWidth: 320 }}>{challenge.topicName}</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {running ? (
          <button className="ss-btn-secondary" onClick={onPause}>Pause</button>
        ) : (
          <button className="ss-btn-secondary" onClick={onResume}>Resume</button>
        )}
        <button className="ss-btn-secondary" onClick={onScholar} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ExternalLink size={14} /> Open Google Scholar
        </button>
      </div>

      <div className="ss-card" style={{ width: "100%", padding: 16, marginBottom: 18 }}>
        {fields.map(([key, label]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
            <textarea className="ss-textarea" value={notes[key]}
              onChange={(e) => setNotes((n) => ({ ...n, [key]: e.target.value }))}
              placeholder="…" />
          </div>
        ))}
      </div>

      <button className="ss-btn-primary" onClick={onFinish} style={{ width: "100%" }}>Finish Early → Present</button>
    </div>
  );
}

function PresentIntro({ challenge, duration, setDuration, onGo }) {
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, textAlign: "center" }}>
      <Mic size={30} color="var(--red)" style={{ marginBottom: 18 }} />
      <div className="ss-display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Explain your answer.</div>
      <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
        No reading. No restarting.<br />Make your argument.
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
        {PRESENT_OPTIONS.map((s) => (
          <button key={s} onClick={() => setDuration(s)}
            className="ss-btn-secondary"
            style={{ borderColor: duration === s ? "var(--red)" : "#3A4150", color: duration === s ? "var(--red)" : "var(--text)", padding: "8px 14px", fontSize: 13 }}>
            {s < 60 ? `${s}s` : `${s / 60} min`}
          </button>
        ))}
      </div>

      <button className="ss-btn-primary" onClick={onGo} style={{ background: "var(--red)", width: "100%", fontSize: 17 }}>GO</button>
    </div>
  );
}

function PresentScreen({ challenge, left, total, onFinish }) {
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <Ring total={total} remaining={left} color="var(--red)" />
        <div className="ss-display" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 42, fontWeight: 600,
        }}>{fmt(left)}</div>
      </div>
      <div className="ss-display" style={{ fontSize: 17, fontWeight: 600, textAlign: "center", maxWidth: 340, marginBottom: 30, lineHeight: 1.4 }}>
        {challenge.prompt}
      </div>
      <button className="ss-btn-secondary" onClick={onFinish}>Done — go to reflection</button>
    </div>
  );
}

function Slider({ label, value, onChange, low, high }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>
        <span>{label}</span><span className="ss-mono">{value}/5</span>
      </div>
      <input type="range" min={1} max={5} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--teal)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#5A6272" }}>
        <span>{low}</span><span>{high}</span>
      </div>
    </div>
  );
}

function EvalScreen({ challenge, ratings, setRatings, reflection, setReflection, onSave, saveError }) {
  const set = (k) => (v) => setRatings((r) => ({ ...r, [k]: v }));
  return (
    <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", paddingTop: 10 }}>
      <div className="ss-display" style={{ fontSize: 21, fontWeight: 600, marginBottom: 18, textAlign: "center" }}>How did you do?</div>

      <div className="ss-card" style={{ padding: 18, marginBottom: 16 }}>
        <Slider label="Understanding" value={ratings.understanding} onChange={set("understanding")} low="Didn't understand" high="Could teach it" />
        <Slider label="Confidence" value={ratings.confidence} onChange={set("confidence")} low="Shaky" high="Confident" />
        <Slider label="Clarity" value={ratings.clarity} onChange={set("clarity")} low="Muddled" high="Clear" />
        <Slider label="Structure" value={ratings.structure} onChange={set("structure")} low="No structure" high="Well-organized" />
        <Slider label="Evidence" value={ratings.evidence} onChange={set("evidence")} low="None cited" high="Well-supported" />
      </div>

      <div className="ss-card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>What did I struggle to explain?</div>
          <textarea className="ss-textarea" value={reflection.struggle} onChange={(e) => setReflection((r) => ({ ...r, struggle: e.target.value }))} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>What do I need to research further?</div>
          <textarea className="ss-textarea" value={reflection.research} onChange={(e) => setReflection((r) => ({ ...r, research: e.target.value }))} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>What did I learn?</div>
          <textarea className="ss-textarea" value={reflection.learned} onChange={(e) => setReflection((r) => ({ ...r, learned: e.target.value }))} />
        </div>
      </div>

      {saveError && <div style={{ fontSize: 12, color: "var(--red)", marginBottom: 10 }}>Couldn't save — try again.</div>}
      <button className="ss-btn-primary" onClick={onSave} style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <Save size={16} /> SAVE SESSION
      </button>
    </div>
  );
}

function HistoryScreen({ sessions, loaded, onBack }) {
  return (
    <div style={{ width: "100%", maxWidth: 440, paddingTop: 10 }}>
      <TopBar onBack={onBack} label="history" />
      {!loaded && <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 20 }}>Loading…</div>}
      {loaded && sessions.length === 0 && (
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 30, textAlign: "center" }}>No sessions yet. Run your first challenge.</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {sessions.map((s) => {
          const avg = ((s.ratings.understanding + s.ratings.confidence + s.ratings.clarity + s.ratings.structure + s.ratings.evidence) / 5).toFixed(1);
          return (
            <div key={s.id} className="ss-card" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span className="ss-mono" style={{ fontSize: 11, color: "var(--muted)" }}>{s.unitCode} · {s.date}</span>
                <span className="ss-mono" style={{ fontSize: 11, color: DIFF_COLOR[s.difficulty] }}>{avg}/5</span>
              </div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>{s.topicName}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
                <span>{TYPE_LABEL[s.type]} · {s.difficulty}</span>
                {s.mode === "general" && <span style={{ color: "var(--amber)" }}>general</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeakScreen({ weakAreas, onBack, onTrain }) {
  return (
    <div style={{ width: "100%", maxWidth: 440, paddingTop: 10 }}>
      <TopBar onBack={onBack} label="weak areas" />
      {weakAreas.length === 0 ? (
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 30, textAlign: "center" }}>
          No weak areas flagged yet — keep training and this will populate.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16, marginBottom: 20 }}>
            {weakAreas.map((w) => (
              <div key={w.topicName} className="ss-card" style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13 }}>{w.topicName}</span>
                  <span className="ss-mono" style={{ fontSize: 12, color: "var(--red)" }}>{w.avg.toFixed(1)}/5</span>
                </div>
                <div className="ss-mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{w.unitCode}</div>
              </div>
            ))}
          </div>
          <button className="ss-btn-primary" onClick={onTrain} style={{ width: "100%" }}>Train a weak area</button>
        </>
      )}
    </div>
  );
}

function TopBar({ onBack, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", marginBottom: 4 }}>
      <button onClick={onBack} className="ss-link" style={{ padding: "6px 8px 6px 0", display: "flex", alignItems: "center" }}>
        <ArrowLeft size={16} />
      </button>
      <span className="ss-mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}
