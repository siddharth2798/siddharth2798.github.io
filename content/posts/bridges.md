# Think Before You Prompt: The BRIDGES Handbook

*Seven questions to ask before you build with AI. Written for engineering students.*

> **New here?** Read [Why BRIDGES](#why-bridges), skim [BRIDGES at a glance](#bridges-at-a-glance), then try [the one-page checklist](#the-one-page-checklist) on a project you care about. Every section ends with links to move on or come back to the contents.

---

## Contents

1. [Start here](#start-here)
   - [Why BRIDGES](#why-bridges)
   - [Who this is for](#who-this-is-for)
   - [Pick your route](#pick-your-route)
   - [How to use this handbook](#how-to-use-this-handbook)
   - [The worksheets](#the-worksheets)
2. [BRIDGES at a glance](#bridges-at-a-glance)
3. [Awareness: how AI gets misused](#awareness-how-ai-gets-misused)
4. [The running examples](#the-running-examples)
5. [Phase 1: Before you build](#phase-1-before-you-build)
   - [Step B: Begin with a clear purpose](#step-b-begin-with-a-clear-purpose)
   - [Step R: Rethink whether AI is needed](#step-r-rethink-whether-ai-is-needed)
   - [Step I: Inspect the data](#step-i-inspect-the-data)
   - [Worksheet 1: Mini datasheet](#worksheet-1-mini-datasheet)
6. [Phase 2: While you build](#phase-2-while-you-build)
   - [Step D: Design for failure and misuse](#step-d-design-for-failure-and-misuse)
   - [Worksheet 2: Misuse scan](#worksheet-2-misuse-scan)
   - [Step G: Guard privacy](#step-g-guard-privacy)
   - [Worksheet 3: Privacy by Design check](#worksheet-3-privacy-by-design-check)
   - [Step E: Embed a human decision](#step-e-embed-a-human-decision)
   - [Worksheet 4: Human oversight map](#worksheet-4-human-oversight-map)
7. [Phase 3: Before you ship](#phase-3-before-you-ship)
   - [Step S: Stand accountable](#step-s-stand-accountable)
8. [The verdict](#the-verdict)
9. [The one-page checklist](#the-one-page-checklist)
10. [Common objections](#common-objections)
11. [Questions for discussion](#questions-for-discussion)
12. [Glossary](#glossary)
13. [Sources and acknowledgements](#sources-and-acknowledgements)
14. [About this handbook](#about-this-handbook)

---

## Start here

### Why BRIDGES

A bridge engineer does not start with “Can I build it?” They start with what the bridge is for, who will cross it, how it could fail, and who is responsible if it does. Only then do they pick materials.

AI projects deserve the same discipline. It is easy to open a tool, train a model and get a result. It is much harder, and much more valuable, to know whether you should, and what you owe the people your system touches.

BRIDGES is a seven-question framework. Each letter is a question to answer in writing before you build, while you build, and before you ship. The title of this handbook is a reminder that the most important work on an AI project happens before you open the tool.

BRIDGES is not only for serious projects. Fun projects are welcome: a meme bot, a game, a photo filter. The questions are the same, because a harmless-looking project can still collect people’s data or be misused. The goal is awareness and care, not a mission to fix the world.

### Who this is for

- **Engineering students** in their first to third year, working on assignments, hackathons, club projects or startup ideas that involve AI. You do not need to know machine learning to use it.
- **Faculty, student club leads and workshop facilitators** who want a ready-made session. See [Running a session](#running-a-session).
- **Anyone who builds with AI** and wants a short, repeatable way to think it through.

### Pick your route

| If you want to | Go to |
| --- | --- |
| Understand the idea in five minutes | [Why BRIDGES](#why-bridges) and [BRIDGES at a glance](#bridges-at-a-glance) |
| Check your own project right now | [The one-page checklist](#the-one-page-checklist), then the worksheet for any answer you rate Amber or Red |
| Work through a project properly | [Phase 1](#phase-1-before-you-build), then follow the **Next** link at the end of each step |
| Learn to spot AI misuse | [Awareness: how AI gets misused](#awareness-how-ai-gets-misused) |
| Run a class or workshop | [Running a session](#running-a-session) |
| Look up a term | [Glossary](#glossary) |

### How to use this handbook

- Use it before any project, assignment, hackathon or startup idea that involves AI.
- Answer each question in a sentence or two. If you cannot answer it, that is useful information: you have found something to learn or someone to ask.
- The seven questions take about 15 minutes. The four worksheets add about 30 minutes more.
- Do it with a teammate, because a second person spots what you skip.
- The framework is a set of questions, not rules. Two honest people can answer the same question differently. What matters is that you asked.

### The worksheets

Four steps come with a worksheet, and each worksheet sits right after its step. They are built on established ideas from privacy, data and AI-safety practice, credited in the [sources](#sources-and-acknowledgements) at the end. Use the table below to jump straight to one, and use the same project on every sheet.

**How to use them**

- Write the project name on each sheet.
- Work in pairs, 5 to 10 minutes per sheet.
- Keep answers short. “I don’t know” is a valid answer and becomes a to-do.
- Rate each answer **Green** (fine as it is), **Amber** (fixable, write the fix) or **Red** (stop or redesign).

**Which worksheet goes where**

| Step | Worksheet | Built on | Time |
| --- | --- | --- | --- |
| [I: Inspect the data](#step-i-inspect-the-data) | [Worksheet 1: Mini datasheet](#worksheet-1-mini-datasheet) | Datasheets for Datasets | 7 min |
| [D: Design for failure and misuse](#step-d-design-for-failure-and-misuse) | [Worksheet 2: Misuse scan](#worksheet-2-misuse-scan) | Common AI misuse patterns | 7 min |
| [G: Guard privacy](#step-g-guard-privacy) | [Worksheet 3: Privacy by Design check](#worksheet-3-privacy-by-design-check) | Privacy by Design | 7 min |
| [E: Embed a human decision](#step-e-embed-a-human-decision) | [Worksheet 4: Human oversight map](#worksheet-4-human-oversight-map) | Human oversight in automated systems | 7 min |

[↑ Back to contents](#contents)

---

## BRIDGES at a glance

Seven questions in three phases. Select a letter to read the full step.

| Phase | Step | The question | Worksheet |
| --- | --- | --- | --- |
| Before you build | [**B**: Begin with a clear purpose](#step-b-begin-with-a-clear-purpose) | What is this for (a real need, or just for fun), and who does it affect? | |
| Before you build | [**R**: Rethink whether AI is needed](#step-r-rethink-whether-ai-is-needed) | Would a spreadsheet, a rule or a person do it better, or is AI the whole point? | |
| Before you build | [**I**: Inspect the data](#step-i-inspect-the-data) | Where does the data come from, and who is missing from it? | [Mini datasheet](#worksheet-1-mini-datasheet) |
| While you build | [**D**: Design for failure and misuse](#step-d-design-for-failure-and-misuse) | How does it fail, how could someone misuse it, and what happens when it is wrong 5% of the time? | [Misuse scan](#worksheet-2-misuse-scan) |
| While you build | [**G**: Guard privacy](#step-g-guard-privacy) | What is the minimum data you need, did the people in it agree, and who could be hurt if it leaks? | [Privacy by Design check](#worksheet-3-privacy-by-design-check) |
| While you build | [**E**: Embed a human decision](#step-e-embed-a-human-decision) | Where must a person always make the final call? | [Human oversight map](#worksheet-4-human-oversight-map) |
| Before you ship | [**S**: Stand accountable](#step-s-stand-accountable) | Who is responsible if it harms someone, and who could it quietly leave out? | |

Every run ends with one of three verdicts: build with AI, build without AI, or do not build yet. See [The verdict](#the-verdict).

[↑ Back to contents](#contents)

---

## Awareness: how AI gets misused

Knowing the common ways AI is misused makes you harder to fool and a more careful builder. This section is background for everyone, and the basis for [Worksheet 2: Misuse scan](#worksheet-2-misuse-scan).

**Common patterns**

- **Fake media (deepfakes).** Images, audio and video that look real but are generated. They are used for fake news, harassment and fraud. Making a fake of a real person without their consent can cause serious harm and may be illegal, even as a joke.
- **Voice and identity scams.** A cloned voice or fake profile pretends to be a relative, a teacher or a recruiter and asks for money or personal details.
- **Phishing at scale.** AI makes scam messages polished and personal, so bad spelling is no longer a warning sign.
- **Data harvesting.** Free apps and plug-ins that collect your photos, chats and contacts. If it is free, ask what you are paying with.
- **Scraping and profiling.** Collecting people’s posts and photos without consent to build profiles or train models.
- **Surveillance creep.** Face recognition and tracking that begin as safety tools and slowly expand into watching people.
- **Over-trust and shortcuts.** Believing AI answers without checking, or handing in AI work as your own. It misleads others and weakens your own skills.
- **Bias at scale.** Systems that quietly treat some groups worse, repeated across thousands of decisions.

**Habits that help**

- Pause before sharing or acting on anything that makes you feel urgency, fear or outrage.
- Verify through a second channel: call the person back on a number you already have.
- Check where an image or clip first appeared, and whether trusted sources carry it.
- Do not upload other people’s photos, documents or chats into AI tools without their consent.
- Read the permissions an app asks for. A torch app does not need your contacts.
- Use strong, unique passwords and two-factor authentication, since leaked data is often reused against you.
- If you are targeted, tell a trusted person and report it to the platform. In India you can also report cybercrime at [cybercrime.gov.in](https://cybercrime.gov.in) or by calling **1930**.

**If you are the builder.** Before sharing a project publicly, ask: could someone use this to fool, track or harm a person? If yes, add a safeguard or keep it private.

**Put it to work.** [Worksheet 2: Misuse scan](#worksheet-2-misuse-scan) turns these patterns into a check for your own project. [Worksheet 3: Privacy by Design check](#worksheet-3-privacy-by-design-check) goes deeper on the privacy habits.

[↑ Back to contents](#contents)

---

## The running examples

Two projects run through the whole handbook. Watch how the questions change what a team would build.

**The serious one: food waste in the hostel mess.** A student notices that the hostel mess wastes a lot of cooked food every day. The team wants to fix it.

**The fun one: a chatbot that talks like your batch.** Nothing is at stake except bragging rights. It shows that the same questions still apply.

**Your own project.** Pick one before you start, and use it on every worksheet. It can be serious or just for fun.

Ready? Start with [Phase 1: Before you build](#phase-1-before-you-build).

[↑ Back to contents](#contents)

---

## Phase 1: Before you build

Three questions to answer before you write any code or collect any data: [B](#step-b-begin-with-a-clear-purpose), [R](#step-r-rethink-whether-ai-is-needed) and [I](#step-i-inspect-the-data).

### Step B: Begin with a clear purpose

*Phase 1: Before you build · Step 1 of 7*

**The question:** What is this for (a real need, or just for fun), and who does it affect?

**Why it matters.** Every project has a purpose, and it is fine for that purpose to be learning, curiosity or fun. Trouble starts when the purpose is unclear or hidden: a “fun” project that quietly collects people’s data, or a “helpful” tool nobody asked for. Naming the purpose first tells you who is involved, who could be affected, and how much care the project needs. A game among friends needs less care than a tool that scores strangers, but it never needs none.

**Ask yourself**

- Can I say what this project is for in one sentence, without mentioning AI?
- Is it solving a problem, teaching me something, or simply fun? Am I honest about which?
- Who will use it, and who else will it touch (friends, classmates, strangers whose data it uses)?
- If it works better than expected and spreads widely, what changes?
- If it claims to solve a problem, have I spoken to at least three people who face it?

**In the running example.** The team talks to the mess manager, the cooks and ten students. They learn that waste is highest on days with unpredictable attendance, such as exam weeks, festivals and long weekends. The real problem is not “food is wasted.” It is “the cooks do not know how many will eat.”

**In the fun example.** The team wants a bot that talks like their batch. The purpose is fun and learning, and they say so openly. That honesty leads straight to the next question: whose messages will the bot learn from?

**Red flag:** You can only describe the project in terms of the technology, or its real purpose is hidden from the people it affects. (“The problem is that we don’t have an AI app for the mess.”)

[Contents](#contents) · [Next: R, Rethink whether AI is needed →](#step-r-rethink-whether-ai-is-needed)

### Step R: Rethink whether AI is needed

*Phase 1: Before you build · Step 2 of 7*

**The question:** Would a spreadsheet, a rule or a person do it better, or is AI the whole point?

**Why it matters.** Good engineers choose the simplest tool that works. AI is powerful where patterns are too complex to write down as rules, and where mistakes are tolerable. It is a poor fit where a simple rule, a form or a conversation would do. A simple solution is also easier to explain, fix and trust. If the project is just for fun, using AI because it is fun is a fine reason, as long as you are honest that it is the reason.

**Ask yourself**

- What is the simplest non-AI solution? Could I try it this week?
- Is the problem really about prediction or pattern-finding, or is it about coordination, incentives or information?
- If I use AI, what does it add that the simple solution cannot?
- Can I afford to maintain it after the demo is over?

**In the running example.** A tick-box on the mess app, where students mark whether they will eat dinner, might cut waste in half. Counting last year’s attendance by day of the week in a spreadsheet might cut it further. AI becomes worth considering only if those simple steps still leave a large, predictable gap.

**Red flag:** You skipped this question because the AI version sounds more impressive.

[← Previous: B, Begin with a clear purpose](#step-b-begin-with-a-clear-purpose) · [Contents](#contents) · [Next: I, Inspect the data →](#step-i-inspect-the-data)

### Step I: Inspect the data

*Phase 1: Before you build · Step 3 of 7 · Worksheet: [Mini datasheet](#worksheet-1-mini-datasheet)*

**The question:** Where does the data come from, and who is missing from it?

**Why it matters.** An AI system only knows what its data shows it. If the data was collected from some people and not others, the system will work well for the first group and badly for the second, and nobody will notice until it matters. Data is also never neutral: someone decided what to record, and what to ignore.

**Ask yourself**

- Does the data exist today? Who collects it, and can I legally and ethically use it?
- Who or what is missing? Think about language, gender, income, disability, rural versus urban, and people without smartphones.
- Is the data recent, or does it describe a world that no longer exists?
- Was it recorded by people or machines, and what errors does each introduce?

**In the running example.** Mess attendance data exists only for students who swipe in. Students who eat at the canteen or order outside are missing, and so are guests on festival days. The team needs to know how that gap could skew predictions before they trust any model.

**Red flag:** “We’ll download a dataset from the internet” with no idea who made it or why.

**Try it now.** Fill in [Worksheet 1: Mini datasheet](#worksheet-1-mini-datasheet) for your own project, in pairs, in about 7 minutes.

[← Previous: R, Rethink whether AI is needed](#step-r-rethink-whether-ai-is-needed) · [Contents](#contents) · [Next: Worksheet 1 →](#worksheet-1-mini-datasheet)

### Worksheet 1: Mini datasheet

*Supports [Step I: Inspect the data](#step-i-inspect-the-data) · About 7 minutes · Work in pairs*

*Adapted from Datasheets for Datasets by Timnit Gebru and colleagues. They proposed that every dataset should come with a standard set of answers, the way electronic components come with a datasheet. This is a simplified student version.*

**Project:** ____________________ **Dataset:** ____________________

**Part A. The datasheet**

| Section | Questions | Our answers |
| --- | --- | --- |
| Motivation | Why does this data exist? Who made it, for what purpose, and who paid for it? | |
| Composition | What is in it (text, images, people)? How many items? Does it include personal or sensitive information? | |
| Collection | How was it collected? Did the people in it know and agree? Over what period? Was it people, sensors or scraping? | |
| Cleaning and labelling | Who cleaned or labelled it? Were records removed, and why? Could the labels be biased? | |
| Uses | What is it good for? What should it not be used for? Has it been used in ways that caused harm? | |
| Sharing | Who can access it? Under what licence or terms? Are we allowed to copy or republish it? | |
| Upkeep | Who fixes or updates it? How can someone ask to be removed? When will it be out of date? | |

**Part B. The gap check**

Name three groups who are missing or under-represented in your data (think language, gender, income, disability, region, age, access to phones or internet). For each, say how the project might fail them and how you would find out.

| Group missing | How the project might fail them | How we could find out |
| --- | --- | --- |
| *Example: students who do not chat in groups* | *The bot would not know their slang* | *Ask a few of them to test it* |
| | | |
| | | |
| | | |

**Verdict (circle one):** Green · Amber · Red

**Question we still cannot answer:** ________________________________________

[← Back to Step I](#step-i-inspect-the-data) · [Contents](#contents) · [Next: Phase 2, While you build →](#phase-2-while-you-build)

---

## Phase 2: While you build

Three questions to answer while the project takes shape: [D](#step-d-design-for-failure-and-misuse), [G](#step-g-guard-privacy) and [E](#step-e-embed-a-human-decision). Each comes with a worksheet.

### Step D: Design for failure and misuse

*Phase 2: While you build · Step 4 of 7 · Worksheet: [Misuse scan](#worksheet-2-misuse-scan)*

**The question:** How does it fail, how could someone misuse it, and what happens when it is wrong 5% of the time?

**Why it matters.** Every AI system is wrong sometimes. A bridge is built with safety margins because engineers assume something will go wrong. The question is not whether your system will fail but how, how often, and who pays when it does. A 95% accurate system sounds good until you count the people in the other 5%. The same goes for misuse: any system that can generate faces, voices or text about real people can be used to fool, harass or impersonate them.

**Ask yourself**

- List three ways this could fail. Which is the most harmful, not the most likely?
- What does a wrong answer cost, and who bears that cost?
- Will users be able to tell when the system is unsure?
- What is the fallback if the system is down or clearly wrong?
- How could someone misuse it to fool, harass, track or impersonate others? What simple safeguard would make that harder?
- How will I find out about failures and misuse after launch?

**In the running example.** If the prediction is too low, students go hungry on a festival night. If it is too high, food is wasted again. The first failure is worse, so the design adds a safety margin and a plan for a quick extra batch of rice. A wrong prediction here is recoverable. That is a good sign for using AI.

**Red flag:** Your only measure of success is overall accuracy, or nobody has asked how a bad actor could use it.

**Try it now.** Fill in [Worksheet 2: Misuse scan](#worksheet-2-misuse-scan) for your own project, in pairs, in about 7 minutes.

[← Previous: Worksheet 1](#worksheet-1-mini-datasheet) · [Contents](#contents) · [Next: Worksheet 2 →](#worksheet-2-misuse-scan)

### Worksheet 2: Misuse scan

*Supports [Step D: Design for failure and misuse](#step-d-design-for-failure-and-misuse) · About 7 minutes · Work in pairs*

*Built on the common AI misuse patterns in [Awareness: how AI gets misused](#awareness-how-ai-gets-misused). Spend three minutes as the “bad actor” team asking how your project could be used to cause trouble, then switch roles and design to make that harder.*

**Project:** ____________________ **Team:** ____________________

**Part A. The pattern scan**

| Misuse pattern | Could our project help someone do this? How? | Who could be hurt | A simple safeguard |
| --- | --- | --- | --- |
| Fake media (deepfakes) | | | |
| Voice and identity scams | | | |
| Phishing at scale | | | |
| Data harvesting | | | |
| Scraping and profiling | | | |
| Surveillance creep | | | |
| Over-trust and shortcuts | | | |
| Bias at scale | | | |

**Part B. Score the top risks**

Pick your two most worrying risks. Score how likely each is (1 = unlikely, 3 = likely) and how harmful it would be (1 = minor, 3 = serious). Multiply the two numbers to get a score out of 9, and fix the highest first.

| Risk | Likelihood (1 to 3) | Harm (1 to 3) | Score | Our fix |
| --- | --- | --- | --- | --- |
| *Example: someone uses the bot to imitate a named classmate* | *2* | *2* | *4* | *Block names, add a notice that the bot is AI* |
| | | | | |
| | | | | |

**Part C. The release rule**

If any risk scores **6 or more** and you cannot add a safeguard that lowers it, keep the project private or do not build it. Before sharing publicly, ask once more: could someone use this to fool, track or harm a person?

**Verdict (circle one):** Green · Amber · Red

**The safeguard we will add first:** ________________________________________

[← Back to Step D](#step-d-design-for-failure-and-misuse) · [Contents](#contents) · [Next: G, Guard privacy →](#step-g-guard-privacy)

### Step G: Guard privacy

*Phase 2: While you build · Step 5 of 7 · Worksheet: [Privacy by Design check](#worksheet-3-privacy-by-design-check)*

**The question:** What is the minimum data you need, did the people in it agree, and who could be hurt if it leaks?

**Why it matters.** What you collect is a design decision, not an afterthought. Data you never collect cannot leak, be misused, or be demanded later by someone with power. Privacy cannot be added at the end as a patch. It is far cheaper, and far safer, to build it in.

**Ask yourself**

- What is the smallest amount of data that would still let this work?
- Do I need names or IDs, or would counts and averages do?
- How long do I keep the data, and who can see it?
- Have the people in the data been told, and could they say no?
- If this data leaked tomorrow, who would be harmed and how?

**In the running example.** The model needs how many students ate each day, not who they were or what they ate. The team decides to use only daily totals, so there is no personal record to protect.

**In the fun example.** The batch chatbot would learn from group chat exports, and those chats include people who never agreed to be in a dataset. The safer version asks for consent first, strips names and phone numbers, and keeps the data on the team’s own laptops. Even a joke project makes a privacy decision.

**Red flag:** “Let’s collect everything now, we might need it later.”

**Try it now.** Fill in [Worksheet 3: Privacy by Design check](#worksheet-3-privacy-by-design-check) for your own project, in pairs, in about 7 minutes.

[← Previous: Worksheet 2](#worksheet-2-misuse-scan) · [Contents](#contents) · [Next: Worksheet 3 →](#worksheet-3-privacy-by-design-check)

### Worksheet 3: Privacy by Design check

*Supports [Step G: Guard privacy](#step-g-guard-privacy) · About 7 minutes · Work in pairs*

*Built on the seven foundational principles of Privacy by Design, developed by Ann Cavoukian. The core idea: build privacy in from the start instead of patching it on later.*

**Project:** ____________________ **Team:** ____________________

**Part A. The seven principles**

| Principle | Question to answer | Our answer | Green / Amber / Red |
| --- | --- | --- | --- |
| 1. Proactive, not reactive | What privacy problems could happen, and what are we doing now to prevent them? | | |
| 2. Privacy by default | If a user changes no settings, is the most private option already on? | | |
| 3. Built into the design | Does the design itself protect privacy (for example, not storing names), or is it an add-on? | | |
| 4. Full functionality | Can the project stay useful or fun and protect privacy? Is the trade-off we assumed really needed? | | |
| 5. End-to-end protection | Where is data stored, sent and deleted? Who can reach it at each step? | | |
| 6. Visibility and transparency | Can users see what we collect and why, in plain words and their own language? | | |
| 7. Respect for users | Can users see, correct, download or delete their data, and say no? | | |

**Part B. The minimum-data test**

List every piece of data your project collects or uses. Mark each one **Needed**, **Nice to have** or **Not needed**. Remove everything in the last two groups, or write why you are keeping it.

| Data item | Why we need it | Needed / Nice to have / Not needed | How long we keep it |
| --- | --- | --- | --- |
| *Example: group chat text* | *To learn the batch’s slang* | *Needed* | *Delete after training* |
| | | | |
| | | | |
| | | | |

**Verdict (circle one):** Green · Amber · Red

**First fix we will make:** ________________________________________

[← Back to Step G](#step-g-guard-privacy) · [Contents](#contents) · [Next: E, Embed a human decision →](#step-e-embed-a-human-decision)

### Step E: Embed a human decision

*Phase 2: While you build · Step 6 of 7 · Worksheet: [Human oversight map](#worksheet-4-human-oversight-map)*

**The question:** Where must a person always make the final call?

**Why it matters.** Some decisions can be automated safely. Others change people’s health, freedom, money or opportunities, such as medical diagnosis, hiring, grading, loans and legal outcomes. In these, a person should make the final decision and be able to explain it. Putting a human in the loop only works if that person has the time, information and authority to disagree with the machine. Otherwise they are just a rubber stamp.

**Ask yourself**

- Is this decision reversible? How badly can it hurt if it is wrong?
- Who makes the final call, and can they actually override the system?
- Can the person affected question the decision and get a human answer?
- Will people slowly stop thinking for themselves because the system is usually right?

**In the running example.** The cook, not the model, decides how much to prepare. The system gives a suggestion with a range, and the cook can adjust it based on what they know, such as a cricket match that evening.

**Red flag:** The human is technically “in the loop” but has no time or power to say no.

**Try it now.** Fill in [Worksheet 4: Human oversight map](#worksheet-4-human-oversight-map) for your own project, in pairs, in about 7 minutes.

[← Previous: Worksheet 3](#worksheet-3-privacy-by-design-check) · [Contents](#contents) · [Next: Worksheet 4 →](#worksheet-4-human-oversight-map)

### Worksheet 4: Human oversight map

*Supports [Step E: Embed a human decision](#step-e-embed-a-human-decision) · About 7 minutes · Work in pairs*

*Built on the idea of human oversight in automated systems. Three levels are commonly described. **In the loop:** a person approves each decision. **On the loop:** the system acts, and a person watches and can step in. **Out of the loop:** the system acts alone.*

**Project:** ____________________ **Team:** ____________________

**Part A. Map the decisions**

List every decision your system makes or influences. Rate the stakes (marks, money, health, safety, reputation, or just fun) and whether the decision can be undone.

| Decision | What is at stake | Can it be undone? (Yes / Partly / No) | Oversight level today (in / on / out of the loop) |
| --- | --- | --- | --- |
| *Example: which slang phrase the bot replies with* | *Fun, a little embarrassment* | *Yes* | *Out of the loop* |
| | | | |
| | | | |
| | | | |

**Part B. Choose the right level**

A rule of thumb to argue with, not a law:

- **Low stakes and easy to undo:** out of the loop can be fine, as long as people can report mistakes.
- **Medium stakes:** on the loop. A person monitors and can step in.
- **High stakes or hard to undo** (health, safety, jobs, money, grades, legal matters): in the loop. A person makes the final call.

For each decision above, write the level you now recommend: ________________________________________

**Part C. Test the human**

A person in the loop only helps if they can really act. Tick what is true.

- ☐ They have enough time to check each decision.
- ☐ They see why the system suggested it, not only what it suggested.
- ☐ They have real authority to override it, without being penalised.
- ☐ They know where the system is weak.
- ☐ The affected person can appeal to a human.
- ☐ We check for **automation bias**, the habit of trusting a machine’s answer over your own judgement. How? ____________________

**Verdict (circle one):** Green · Amber · Red

**The one decision a person must always make here:** ________________________________________

[← Back to Step E](#step-e-embed-a-human-decision) · [Contents](#contents) · [Next: Phase 3, Before you ship →](#phase-3-before-you-ship)

---

## Phase 3: Before you ship

One question to answer before anyone else uses what you built: [S](#step-s-stand-accountable).

### Step S: Stand accountable

*Phase 3: Before you ship · Step 7 of 7*

**The question:** Who is responsible if it harms someone, and who could it quietly leave out?

**Why it matters.** When an AI system causes harm, “the algorithm did it” is not an answer. People built it, chose the data, set the thresholds and decided to deploy it. Accountability means a named person or team who answers for the system, a way for users to complain, and a plan to fix or switch it off. It also means checking who the system serves poorly: people who speak other languages, have lower literacy, limited internet access or disabilities.

**Ask yourself**

- If this goes wrong, who answers for it? Is it clear to the users?
- How can someone affected report a problem, and will anyone respond?
- Can I switch it off or roll it back?
- Who might this work badly for? Have I tested with them, not just for them?
- Would I be comfortable explaining this system to the people it affects, in their language?

**In the running example.** The mess committee owns the system, and a student representative reviews the numbers monthly. Hindi and Telugu labels are added to the app, and there is a paper sheet for students without phones. Anyone can report an issue to the committee.

**Red flag:** Nobody can say who is responsible, or the honest answer is “nobody.”

[← Previous: Worksheet 4](#worksheet-4-human-oversight-map) · [Contents](#contents) · [Next: The verdict →](#the-verdict)

---

## The verdict

After running the hostel mess problem through BRIDGES, the team reaches a clear decision: **start with a tick-box and a spreadsheet, and consider a simple prediction model later if waste remains high.** The answer is not “use AI” or “don’t use AI.” It is a reasoned choice based on the real problem, the data available, the cost of failure and the people involved.

Every BRIDGES run should end with one of three verdicts:

- **Build with AI.** The purpose is clear (serious or just for fun), AI adds something real, the data is sound, and the risks of failure, privacy and misuse are manageable.
- **Build without AI.** A simpler tool does the job better.
- **Do not build yet.** The purpose, the data or the risks are not understood well enough. Go learn more first.

A “do not build” verdict is not a failure. It is the most valuable thing a good engineer can say, and often the hardest.

Record your verdict on [the one-page checklist](#the-one-page-checklist).

[↑ Back to contents](#contents)

---

## The one-page checklist

Print this section or copy it into your notes. Answer each item in writing, and finish with a verdict. Each item links to its full step.

**Project:** ____________________ **Team:** ____________________ **Date:** ____________

**Before you build**

- ☐ **[B: Begin with a clear purpose](#step-b-begin-with-a-clear-purpose).** I can say what this is for (a real need or just fun) without mentioning AI, and I know who it affects. Answer: ____________________
- ☐ **[R: Rethink whether AI is needed](#step-r-rethink-whether-ai-is-needed).** I have named the simplest non-AI option and explained what AI adds, or admitted that AI is the fun part. Answer: ____________________
- ☐ **[I: Inspect the data](#step-i-inspect-the-data).** I know where the data comes from and who is missing from it. Use [Worksheet 1](#worksheet-1-mini-datasheet). Answer: ____________________

**While you build**

- ☐ **[D: Design for failure and misuse](#step-d-design-for-failure-and-misuse).** I have listed three ways it can fail, the most harmful one, a fallback, and how someone could misuse it. Use [Worksheet 2](#worksheet-2-misuse-scan). Answer: ____________________
- ☐ **[G: Guard privacy](#step-g-guard-privacy).** I collect only the minimum data, the people in it agreed, I know who could be hurt by a leak, and I have a deletion plan. Use [Worksheet 3](#worksheet-3-privacy-by-design-check). Answer: ____________________
- ☐ **[E: Embed a human decision](#step-e-embed-a-human-decision).** I have named who makes the final call and confirmed they can override the system. Use [Worksheet 4](#worksheet-4-human-oversight-map). Answer: ____________________

**Before you ship**

- ☐ **[S: Stand accountable](#step-s-stand-accountable).** I have named who is responsible, how people can complain, how to switch it off, and who the system might leave out. Answer: ____________________

**Verdict (circle one):** Build with AI · Build without AI · Do not build yet

**Why:** ________________________________________

[↑ Back to contents](#contents)

---

## Common objections

**“It is faster to just use the AI.”** Sometimes true. But speed in building is not the same as value in solving. Ten minutes on [B](#step-b-begin-with-a-clear-purpose) and [R](#step-r-rethink-whether-ai-is-needed) can save weeks on something nobody wants.

**“I am just a student, these questions are for senior engineers.”** Habits formed in the first three years carry into your career. The student who asks “who is missing from this data?” becomes the engineer who catches the problem before it ships.

**“If I follow BRIDGES, my project will be less impressive.”** A project that shows you found a real problem, tested alternatives and thought about failure impresses the people who matter, such as employers, mentors and users.

**“There are no right answers to these questions.”** Correct. The point is to ask them honestly, answer them in writing, and be willing to change your plan.

**“My project is just for fun, so this is overkill.”** Fun projects are welcome. The questions take 15 minutes, and they are what stop a harmless prank from exposing a classmate’s data or fooling someone. A fun project is the best place to practise, because the stakes are low and the lessons are the same.

[↑ Back to contents](#contents)

---

## Questions for discussion

- Think of a decision in your life that you would never want a machine to make for you. Why that one?
- Who benefits most from AI today, and who is least likely to benefit? What would change that?
- If a system built by students at your college harmed someone, who should be held responsible?
- What is one problem near you that AI should not touch, and why?
- Which letter of BRIDGES do you think is most often skipped in real projects, and what does that cost?

[↑ Back to contents](#contents)

---

## Glossary

**Automation bias.** The habit of trusting a machine’s answer over your own judgement. See [Step E](#step-e-embed-a-human-decision).

**Data minimisation.** Collecting only the data you need for a stated purpose, and nothing more. See [Step G](#step-g-guard-privacy).

**Datasheet.** A standard set of answers about a dataset: why it exists, what is in it, how it was collected and how it should be used. See [Worksheet 1](#worksheet-1-mini-datasheet).

**Deepfake.** An image, audio clip or video that looks real but is generated by AI. See [Awareness](#awareness-how-ai-gets-misused).

**Fallback.** What happens when the system is down or clearly wrong, such as a manual process or a safe default. See [Step D](#step-d-design-for-failure-and-misuse).

**Green, Amber, Red.** The rating used on every worksheet. Green is fine as it is, Amber is fixable, Red means stop or redesign. See [The worksheets](#the-worksheets).

**In the loop, on the loop, out of the loop.** Three levels of human oversight. In the loop: a person approves each decision. On the loop: the system acts and a person watches and can step in. Out of the loop: the system acts alone. See [Worksheet 4](#worksheet-4-human-oversight-map).

**Phishing.** A message that pretends to come from someone you trust, to get money or personal details. See [Awareness](#awareness-how-ai-gets-misused).

**Privacy by Design.** Building privacy into a system from the start instead of adding it later. See [Worksheet 3](#worksheet-3-privacy-by-design-check).

**Scraping.** Collecting content such as posts and photos from websites automatically, often without the consent of the people in it. See [Awareness](#awareness-how-ai-gets-misused).

**Surveillance creep.** A tool built for one purpose, such as safety, that slowly expands into watching people. See [Awareness](#awareness-how-ai-gets-misused).

[↑ Back to contents](#contents)

---

## Sources and acknowledgements

The worksheets adapt and simplify existing ideas for students. Any mistakes in the adaptation are ours, so please read the originals.

- **Datasheets for Datasets:** proposed by Timnit Gebru, Jamie Morgenstern, Briana Vecchione, Jennifer Wortman Vaughan, Hanna Wallach, Hal Daumé III and Kate Crawford. First shared as a [preprint in 2018](https://arxiv.org/abs/1803.09010) and published in [Communications of the ACM in 2021](https://doi.org/10.1145/3458723). Used in [Worksheet 1](#worksheet-1-mini-datasheet).
- **Misuse patterns:** drawn from widely reported public cases and general security-awareness guidance, with no single source. Used in [Awareness](#awareness-how-ai-gets-misused) and [Worksheet 2](#worksheet-2-misuse-scan).
- **Privacy by Design:** the [seven foundational principles](https://www.ietf.org/slides/slides-privacyws-privacy-by-design-the-seven-foundational-principles-00.pdf) developed by Ann Cavoukian, formerly Information and Privacy Commissioner of Ontario, Canada. Used in [Worksheet 3](#worksheet-3-privacy-by-design-check).
- **Data minimisation:** a principle found in data-protection law. Examples are Section 6(1) of India’s Digital Personal Data Protection Act, 2023, which limits consent to the data needed for a specified purpose, and Article 5(1)(c) of the EU’s [General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Used in [Worksheet 3, Part B](#worksheet-3-privacy-by-design-check).
- **Human oversight:** the terms “in the loop” and “on the loop” come from automation and AI-governance practice, and automation bias is studied in human-factors research. We rely on the general ideas, not one source. Used in [Worksheet 4](#worksheet-4-human-oversight-map).
- **Cybercrime reporting:** the National Cyber Crime Reporting Portal at [cybercrime.gov.in](https://cybercrime.gov.in) and the 1930 helpline, run by the Government of India.
- **Original topic list and framework brief:** Siddharth Shivkumar.
- **BRIDGES name, examples and wording:** written for this handbook with the help of Claude, an AI assistant made by Anthropic.

[↑ Back to contents](#contents)

---

## About this handbook

**Version:** 1.0, October 2026.

**Licence:** This handbook is shared under the [Creative Commons Attribution-ShareAlike 4.0 International licence (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/). You may copy, adapt and share it, including for commercial use, as long as you credit this handbook and share your adaptation under the same licence. When you adapt it, keep the credits to the original sources listed above.

*Use it, adapt it, argue with it. The goal is not to follow BRIDGES perfectly. It is to build the habit of asking before you build.*

[↑ Back to contents](#contents)
