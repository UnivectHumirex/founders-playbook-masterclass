// @ts-nocheck
// The masterclass was originally authored as a Claude.ai artifact where the
// runtime is permissive about argument arity and prop-destructuring defaults.
// The curriculum data helpers (r/q/sort) and inline UI components are
// intentionally JS-shaped — typing them strictly would require rewriting
// hundreds of curriculum entries. If a future maintainer wants real types,
// see docs/ARCHITECTURE.md for the data shapes and migrate helper-by-helper.
import { useState, useEffect, useRef } from "react";
import {
  Compass, Lightbulb, Hammer, Rocket, TrendingUp, Code2, MessageSquare,
  Layers, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Lock, Zap, Sparkles,
  ChevronRight, RotateCcw, Crown, FlaskConical, Search, ShieldCheck, Target,
  AlertTriangle, Trophy, Star, BookOpen, Dumbbell, GraduationCap, Quote, ListChecks
} from "lucide-react";

/* ============================== THEME ============================== */
const C = {
  bg: "#161310", card: "#211d19", card2: "#2a2521", line: "#3a332d",
  text: "#ece4da", mut: "#a59c92", dim: "#7a726a",
  accent: "#df8a5f", accentDeep: "#cf6f47", gold: "#e0b15f",
  good: "#7fae7a", bad: "#cf7468",
};
const CH_HUE = ["#c98d6b", "#e0a94e", "#df7d57", "#b288d6", "#57a99e"];

/* ============================== CURRICULUM DATA ============================== */
const r = (tag, title, body, bullets, note, kind) =>
  ({ t: "read", tag, title, body: Array.isArray(body) ? body : [body], bullets, note, kind });
const q = (qq, o, a, why) => ({ t: "q", q: qq, o, a, why });
const sort = (qq, cats, items, why) => ({ t: "sort", q: qq, cats, items, why });

const CURRICULUM = [
  /* ---------- CHAPTER 0 ---------- */
  {
    id: "reboot", n: 0, icon: Compass, title: "The Reboot",
    sub: "What it means to be a founder in 2026",
    intro: "Before the four stages, you need the new operating model. AI hasn't just sped startups up — it changed who can build one and what a founder actually does all day.",
    blocks: [
      r("THE SHIFT", "The lifecycle, rebooted",
        ["AI is reshaping how startups are built. In 2026 it can write production code, conduct market research, synthesize competitive landscapes, draft investor materials, and automate operational workflows.",
         "The deepest change isn't speed — it's access. AI erased the steep learning curves around tools and systems, leveling the playing field around who can launch a startup at all."],
        null, { label: "Key idea", text: "A good idea now gets a founder further than ever. Agentic coding compresses what used to take a team of engineers into work one founder can ship alone." }),
      r("OLD VS NEW", "The arc that no longer holds",
        ["The traditional growth arc assumed a fixed path: validate then raise then hire then build then raise again then grow then hire more, and repeat.",
         "AI erased the expectation baked into that arc — that every new phase requires a bigger team, a different skill set, and a fresh funding round. The 'lean 10-person unicorn' went from scrappy underdog story to a deliberate plan of action."]),
      q("What did AI actually change about the startup lifecycle?",
        ["It made fundraising completely unnecessary",
         "It removed the assumption that each new stage needs a bigger team, new skills, and a new round",
         "It eliminated the need for a compelling idea",
         "It guarantees product-market fit if you ship fast"],
        1, "The traditional arc tied every stage to more headcount and more capital. AI broke that linkage — a lean team can move through stages that used to require scaling up."),
      r("THE MAP", "Four stages, remapped",
        ["This playbook remaps the four core stages for an AI-native world. Each one has a distinct goal, a distinct exit condition, and distinct ways AI fails you if misused."],
        ["Idea — assemble evidence that a real problem exists before you build",
         "MVP — turn a validated problem into a working product with genuine PMF",
         "Launch — turn early traction into a repeatable, sustainable growth engine",
         "Scale — mature the company into a durable, defensible business"]),
      r("THE ROLE", "From individual contributor to orchestrator",
        ["Founders used to be defined by what they could do: technical founders wrote code; non-technical founders ran ops and closed deals. AI dissolved the wall between 'people who can build' and 'people with ideas worth building.'",
         "Historically founders lived in execution mode. In an AI-native startup the founder becomes far less an individual contributor and far more an orchestrator of agents."],
        null, { label: "Definition", text: "An agent is a specialized AI assistant that can read files, run commands, execute code, and browse the web. The founder's attention shifts up the stack — to generating ideas and directing the systems that carry them out." }, "big"),
      r("THE UNLOCK", "The most revolutionary result",
        ["The single most revolutionary effect of AI as core infrastructure is to unblock non-technical founders who hold deep subject-matter expertise.",
         "When the founding pool expands beyond people with engineering backgrounds, you get startups built by people with radically different lived experiences — solving real problems the traditional tech-founder pipeline never prioritized or even noticed."]),
      q("According to the playbook, the most revolutionary result of AI as central infrastructure is:",
        ["Cheaper cloud hosting for early-stage startups",
         "Faster fundraising cycles",
         "Unblocking non-technical founders who have deep domain expertise",
         "Replacing the need for customer interviews"],
        2, "Technical founders gain GTM and finance superpowers — but the structural change is that domain experts who can't code can now build production software, expanding who gets to be a founder."),
      r("CAPABILITIES", "Three superpowers of a lean startup",
        ["AI lets a tiny team function like a much larger org in three specific areas. Learn these as a trio — every later stage leans on them."],
        ["Conversational intelligence and research — an on-call expert for every domain: deep research, document drafting, and a strategic thinking partner for devil's-advocate analysis, pre-mortems, and scenario planning.",
         "Agentic coding — the engineer who is always available and never blocked: describe what you want in plain language; AI generates, tests, debugs, and refactors a production-grade codebase.",
         "Workflow automation — an on-demand ops team: recurring operational tasks like CRM updates, weekly reports, documentation, and compliance tracking run automatically across your connected tools."]),
      sort("Match each task to the AI superpower it belongs to.",
        [{ id: "res", label: "Research" }, { id: "code", label: "Agentic Coding" }, { id: "auto", label: "Workflow Automation" }],
        [{ x: "Synthesize a competitive landscape from a dozen vendor sites", c: "res" },
         { x: "Refactor the authentication module across the codebase", c: "code" },
         { x: "Auto-update the CRM whenever a deal changes stage", c: "auto" },
         { x: "Run a pre-mortem on next quarter's roadmap", c: "res" },
         { x: "Compile a weekly KPI brief on a schedule into a shared folder", c: "auto" },
         { x: "Generate, test, and debug a new feature", c: "code" }],
        "Research is thinking and synthesis. Agentic coding is building software. Workflow automation is recurring operational plumbing that runs without you."),
      r("THE SURFACES", "Chat, Claude Cowork, Claude Code",
        ["AI helps you ship faster — but the surface you reach for matters. All three share the same Claude underneath; what changes is the workspace around it.",
         "Chat — quick exchanges without leaving the app you're in: pull the one-sentence takeaway from a dense memo, sanity-check a claim before a board meeting, make sense of a long Slack thread.",
         "Claude Cowork — knowledge work that takes real time: pull from many sources, make sense of it, and produce something finished. It has folder access, connectors, skills, and scheduled runs.",
         "Claude Code — the agentic coding environment for engineers: direct codebase access, Plan Mode, git integration, and local, IDE, or sandboxed cloud environments."]),
      q("A finished competitive-landscape document built from your own files and a dozen vendor sites is best produced in:",
        ["Chat", "Claude Cowork", "Claude Code", "A spreadsheet template"],
        1, "Cowork is for knowledge work that pulls from many sources and produces a finished artifact — with folder access, connectors, and scheduled runs."),
      sort("Pick the right surface for each task.",
        [{ id: "chat", label: "Chat" }, { id: "cow", label: "Cowork" }, { id: "code", label: "Claude Code" }],
        [{ x: "Rewrite one awkward sentence in an email", c: "chat" },
         { x: "Ship a new feature across a growing codebase with git", c: "code" },
         { x: "Turn a folder of call transcripts into a themed findings doc", c: "cow" },
         { x: "Quick brainstorm of names for a feature", c: "chat" },
         { x: "A standing Monday task that compiles a KPI brief", c: "cow" },
         { x: "Migrate legacy code from the MVP days", c: "code" }],
        "Chat is fast and conversational with no setup. Cowork handles research and finished documents from your systems. Code writes, tests, and ships software."),
      r("THE PRINCIPLE", "Timing and orchestration are everything",
        ["A founder who harnesses research, automation, and agentic coding builds a startup with far more leverage than its headcount suggests — and gets to spend their bandwidth on the work that actually matters.",
         "But none of this happens on autopilot. The founder orchestrating these tools must know how — and when — to apply each one."],
        null, { label: "Remember", text: "The intelligence in the system is yours. AI executes your direction with equal enthusiasm whether you point it at a great idea or a flawed one." }, "big"),
    ],
    check: [
      q("The traditional startup arc assumed every new stage required:",
        ["A pivot", "A bigger team, new skills, and a fresh funding round", "A new co-founder", "A rebrand"], 1,
        "AI erased exactly that assumption — letting a lean team progress without scaling up at every step."),
      q("In an AI-native startup, the founder's role shifts toward being:",
        ["A full-time individual contributor", "An orchestrator of agents and systems", "A passive investor", "A pure salesperson"], 1,
        "The founder's attention moves up the stack — generating ideas and directing the agents and tools that execute them."),
      q("Which task best fits Claude Cowork?",
        ["Debugging a failing test", "Rewriting one sentence", "Building a competitive landscape from a dozen vendor sites before a fundraise", "Asking a quick factual question"], 2,
        "Cowork handles time-consuming knowledge work that pulls from many sources into a finished artifact."),
      q("Pulling the one-sentence takeaway from a dense investor memo is a job for:",
        ["Claude Code", "Chat", "A consultant", "Claude Cowork"], 1,
        "Chat is built for quick exchanges without leaving the app you're already in."),
      q("The single most revolutionary effect of AI as infrastructure is:",
        ["Cheaper compute", "Faster legal review", "Unblocking non-technical domain experts to build production software", "Automatic product-market fit"], 2,
        "It expands who can be a founder — domain experts can now build, surfacing problems the tech-founder pipeline ignored."),
      q("Why does the playbook say 'the intelligence in the system is yours'?",
        ["AI cannot generate code", "AI executes your direction faithfully — toward good ideas and flawed ones alike", "Founders should never use AI for strategy", "AI is smarter than any founder"], 1,
        "AI follows your direction. If you don't ask hard questions, it will build confidently on a bad premise."),
    ],
  },
  /* ---------- CHAPTER 1 ---------- */
  {
    id: "idea", n: 1, icon: Lightbulb, title: "Idea Stage",
    sub: "Earn the right to build",
    intro: "Every founder starts from a problem they can't stop thinking about. This stage is where idea meets reality — and where the most consequential mistakes are made.",
    blocks: [
      r("THE GOAL", "Research-oriented validation",
        ["The Idea stage goal is not building — it is assembling solid evidence that a real problem exists, and that your proposed solution actually addresses it, before committing resources.",
         "Success in 2026 requires the discipline of not building until the evidence justifies it. The work is research, customer discovery, competitive analysis, and the honest evaluation of disconfirming evidence."]),
      r("THE QUESTIONS", "Four questions, in order",
        ["The Idea stage is a sequence of questions answered in roughly this order:"],
        ["Is this problem real, specific, and frequent enough to build around?",
         "Who exactly has it — and is that a market?",
         "Is anyone else solving it, and if so, how well?",
         "What would a solution actually need to do, and does my idea do that?"],
        { label: "They add up to one thing", text: "Every answer feeds a single ultimate question: Is this worth building?" }),
      r("DISCIPLINE", "Get specific before you get moving",
        ["'People struggle with expense reporting' is an observation. It feels true but it cannot be tested.",
         "'Finance managers at mid-market companies spend four-plus hours a week reconciling submissions because their current tools don't integrate with their accounting software' is a testable hypothesis — it names who, how often, how severely, and why."]),
      q("Which of these is a genuinely testable problem hypothesis?",
        ["Contract review takes too long",
         "Lawyers wish they had better tools",
         "In-house legal teams at mid-market companies spend 3+ days per contract cycle because redlines live in email threads rather than one version-controlled document",
         "The legal industry is ready for disruption"],
        2, "A testable hypothesis specifies who experiences the problem, how often and how severely, and the mechanism causing it. The others are vague observations."),
      r("EXIT CRITERIA", "Problem-solution fit: three yeses",
        ["You may leave the Idea stage only when you can answer yes to all three:"],
        ["Is the problem real and specific? You can name exactly who has it, how often, how severely, and what they currently do about it.",
         "Does your solution address the actual problem — the one validation revealed, not the one you originally assumed?",
         "Do you have enough signal to justify building? Never certainty, but enough qualitative evidence that committing to an MVP is a reasoned decision, not an act of faith."],
        { label: "Note", text: "Waiting for certainty is itself a failure mode. The evidence is primarily qualitative — it comes from real human conversations." }),
      r("CHALLENGE 1", "Mistaking building for validating",
        ["Even before agentic coding, 42% of startups failed because they built something nobody wanted. Now that the distance from 'I have an idea' to 'I have a product' has collapsed, that failure rate is only going to climb.",
         "The dangerous anti-pattern: have an idea, immediately build a prototype, and treat the prototype's existence as validation. The prototype becomes a reason to believe the hypothesis was right — without ever testing whether it's true."],
        null, { label: "Reframe", text: "A prototype is not evidence. It is a pressure-testing prop for conversations with potential users. The conversations are the real evidence." }, "big"),
      r("CHALLENGE 2", "Premature scaling",
        ["Premature scaling means committing to a product path before you've genuinely validated it's worth committing to.",
         "Agentic coding makes this trap invisible. It will generate, test, debug, and refactor a codebase around a fundamentally flawed premise with exactly the same enthusiasm it brings to a great idea. You can scale execution far ahead of validation without ever consciously deciding to."],
        null, { label: "Prime directive", text: "Keep your sense-making ahead of your building — especially when building is quick and feels effortless." }),
      r("CHALLENGE 3", "Loss of objectivity",
        ["Confirmation bias has always been an occupational hazard for founders. Now it comes with a research engine.",
         "Ask AI to validate your idea and it will find supporting evidence. Ask it to size your market and it will find the number that makes your TAM look fundable. A founder who isn't asking hard questions can construct an elaborate, well-researched-looking case for a bad idea — while feeling fully confident they're doing due diligence."],
        null, { label: "The antidote", text: "The same tool, pointed in the opposite direction. AI will pressure-test an idea as thoroughly as it validates one. When adversarial analysis surfaces evidence your idea needs revision, that is the signal to pivot." }),
      q("A founder spends two weeks directing Claude Code to build a polished prototype, then tells investors 'the product proves the demand.' Which trap is this?",
        ["Loss of objectivity", "Mistaking building for validating", "Premature scaling", "Scope creep"],
        1, "The prototype's existence is being treated as evidence of demand. It is only a prop for conversations — the conversations are the evidence."),
      r("METHOD", "Use Claude as a structured devil's advocate",
        ["Your domain expertise produced a hypothesis. The first job is to sharpen it until it is genuinely testable — forcing specificity on who, how often, how severely, and what they currently do.",
         "Then ask Claude to argue against your idea and to actively hunt for disconfirming evidence: negative market signals, failed competitors, customer behavior patterns, and structural obstacles a supportive synthesis would quietly bury."],
        null, { label: "Core use case", text: "Using Claude as a structured devil's advocate is a core practice at every stage of the AI-native startup lifecycle — not just the Idea stage." }),
      r("COMPETITION", "Map the landscape — and beat competitor neglect",
        ["Competitor neglect is the tendency to focus so intensely on your own vision that you systematically underweight what others are doing.",
         "The antidote: ask Claude to make the most compelling argument for why a competitor would succeed while you fail. Then map the landscape by tier and stress-test each one."],
        ["Direct competitors — solving the same problem the same way",
         "Indirect competitors — solving the same problem differently",
         "Potential acquirers — large players who could absorb the space",
         "Adjacent players — companies that could move into your space",
         "Build TAM/SAM/SOM models from public data and pressure-test the assumptions behind them.",
         "Run trend analysis — identify regulatory, technological, or demographic shifts and label each a tailwind or a headwind."]),
      q("Which group belongs in your competitive map even though they don't sell a competing product today?",
        ["Only direct competitors matter", "Potential acquirers and adjacent players who could move into your space",
         "Your own early users", "Companies in unrelated industries"],
        1, "A complete map has four tiers: direct, indirect, potential acquirers, and adjacent players. Adjacent players and acquirers are real future threats."),
      r("DISCOVERY", "Customer discovery: who, and what to ask",
        ["What you learn from talking to potential users depends on the quality of your questions and on whether you're asking the right people. A precise target profile beats a long contact list.",
         "The rookie mistake is asking a generic, future-facing question — 'would you use something like this?' — instead of querying the relevant past: 'tell me about the last time you dealt with this problem.' Future questions invite socially desirable fiction; past questions surface what people actually do."]),
      q("Which interview question will produce the most reliable signal?",
        ["'Would you pay for a tool that fixed this?'",
         "'Do you think this is a big problem?'",
         "'Walk me through the last time you ran into this problem — what did you do?'",
         "'Would you use something like this if it existed?'"],
        2, "Past-oriented questions surface real behavior. Future-oriented questions invite optimistic, socially desirable answers that aren't evidence."),
      r("SYNTHESIS", "Debrief honestly after every batch",
        ["After each conversation, debrief: what confirmed your hypothesis, what challenged it, what was genuinely surprising. After every five interviews, run the full set through Cowork to surface recurring themes and the strongest signals in both directions.",
         "Then take that synthesis back to Claude and ask it to flag where your own read of the data is pattern-matching to what you hoped to find."],
        null, { label: "The asymmetry test", text: "Produce two lists: evidence that supports your hypothesis and evidence that challenges it. If the supporting list is much longer, ask whether that reflects the data — or your hopes." }),
      r("SOLUTION", "Design — and challenge — your solution concept",
        ["The problem is real, you know who has it, and the evidence supports a solution concept. Now use Claude to challenge that concept from every angle: What are the gaps? What alternatives exist? What must be true for this to work at scale?",
         "Critical reality checkpoint: does your design address the problem the validation process revealed — not the problem you originally assumed?"],
        null, { label: "Exercise", text: "Ask Claude to name the three assumptions your design depends on most heavily — then what would have to be true for each to hold, and what happens if any one doesn't." }),
      r("PROTOTYPE", "Build a lightweight prototype — at last",
        ["Now Claude Code enters the picture. You generate an official lightweight prototype: the minimum surface area needed to put your idea in front of a real human and get a genuine reaction.",
         "This is not a real product. It's a functional sample for customer and investor conversations. Define the single core interaction your solution depends on, build only that, and put it in front of five people from your validated target profile."],
        null, { label: "The verdict", text: "What you learn in those five conversations determines whether you keep building — or go back to the drawing board." }, "big"),
    ],
    check: [
      q("The exit condition for the Idea stage is:",
        ["A working prototype", "A signed term sheet", "Problem-solution fit", "A hired engineering team"], 2,
        "You leave the Idea stage when you've found problem-solution fit — qualitative evidence you're solving a real problem for real people."),
      q("Why is a prototype NOT validation evidence?",
        ["Prototypes are always buggy", "It only proves the idea can be built, not that anyone needs it", "Investors ignore prototypes", "Prototypes take too long"], 1,
        "A prototype proves the thing can be built. Whether the market needs it is established by the conversations the prototype enables."),
      q("'Loss of objectivity' is dangerous now specifically because:",
        ["Founders no longer talk to users", "Confirmation bias is paired with a research engine that finds supporting evidence on demand", "AI refuses to criticize ideas", "Markets change too fast"], 1,
        "AI follows your direction — ask it to support a belief and it will. The fix is to point the same tool at disconfirmation."),
      q("The strongest customer-discovery questions ask about:",
        ["The respondent's predicted future behavior", "The respondent's actual past behavior", "The respondent's opinion of your idea", "Industry trends"], 1,
        "Past behavior is real evidence. 'Would you use this?' invites socially desirable fiction."),
      q("A complete competitive map includes which four tiers?",
        ["Big, medium, small, and startups", "Direct, indirect, potential acquirers, and adjacent players", "Local, national, global, and online", "Cheap, premium, free, and enterprise"], 1,
        "Direct, indirect, potential acquirers, and adjacent players — competitor neglect happens when you only watch the direct tier."),
      q("How many people should react to your lightweight prototype before you decide whether to keep building?",
        ["One investor", "Five people from your validated target profile", "Fifty random users", "Your co-founder only"], 1,
        "Define the single core interaction, build only that, and test it with five people from your validated target profile."),
      q("After every five interviews you should produce:",
        ["A pitch deck", "Two lists — evidence supporting and evidence challenging your hypothesis", "A new prototype", "A funding ask"], 1,
        "The two-list synthesis exposes asymmetry — if support vastly outweighs challenge, you may be hearing what you hoped to hear."),
    ],
  },
  /* ---------- CHAPTER 2 ---------- */
  {
    id: "mvp", n: 2, icon: Hammer, title: "MVP Stage",
    sub: "Build evidence, not completeness",
    intro: "Many founders treat the MVP stage as pure construction. It isn't. It is still an evidence-gathering exercise — now about the solution instead of the problem.",
    blocks: [
      r("THE GOAL", "A working product that gathers real evidence",
        ["Your job is to translate a validated problem into a working product real users actually use. Not the full roadmap — the smallest, most focused iteration that puts a real solution in front of real users.",
         "The evidence you're now gathering is about the solution: does a specific, identifiable group find it valuable enough to use it, return to it, pay for it, or tell others about it?"]),
      r("TWO MORE GOALS", "How you build now decides what's possible later",
        ["Speed alone isn't the goal. The MVP stage has two more goals that are just as important:"],
        ["Move fast without accruing technical debt that compounds — the kind that haunts you the moment real users arrive in numbers.",
         "Invest in persistent context from day one. Your codebase is something you collaborate with AI on, session after session, so legibility is foundational. Skip specs and context files and every session re-explains the codebase while AI changes drift from your vision."]),
      r("EXIT CRITERIA", "Genuine evidence of product-market fit",
        ["The MVP stage exit condition is genuine evidence of PMF: proof that a specific, identifiable group of users has found the product valuable enough to do one of three things."],
        ["Retention — they return to it",
         "Revenue — they pay for it",
         "Referral — they tell others about it"]),
      r("CHALLENGE 1", "Agentic technical debt",
        ["AI removes nearly every bottleneck that once controlled what reaches production, so speed is guaranteed. When speed is the only variable a founder optimizes, debt piles up.",
         "Ordinary technical debt builds gradually and can be cleared in a dedicated sprint. AI technical debt compounds. Without specs and architectural constraints written down where the AI can read them, every session re-derives foundational decisions — and those decisions drift."],
        null, { label: "The result", text: "A codebase with no coherent mental model behind it — not because any single piece is bad, but because the pieces were never designed to fit together. It surfaces late." }),
      r("CHALLENGE 2", "Falling for false product-market fit",
        ["Early momentum is one of the most psychologically powerful experiences a founder can have. After months of validation, shipping feels like confirmation you were right.",
         "But launch energy comes from ephemeral forces — your friends, prospective buyers at your investor's other portfolio companies, a Hacker News headline that drives a spike. None of these reliably predicts what happens at week six or week twelve when the boost fades."]),
      r("CHALLENGE 3", "Zero-friction scope creep",
        ["The traditional forcing function against scope creep — the real cost of engineering time — no longer exists. Adding a feature takes an afternoon, not a sprint.",
         "Every individual addition is defensible: of course the product should handle that edge case. None feels like scope creep in the moment. But as the product sprawls past its boundaries, you lose direction and momentum."],
        null, { label: "The antidote", text: "A written scope definition created before building: what the product does, what it deliberately does not do, and the specific user evidence that would justify adding something new." }),
      r("CHALLENGE 4", "Insecure by inexperience",
        ["Agentic coding tools generate code that works — not code that is inherently secure. Functional code is easy to verify: the feature works or it doesn't. Security vulnerabilities are invisible until they're exploited, so there's no natural feedback loop to warn a first-time founder.",
         "Shipping a live MVP means real data, real exposure, and real consequences."],
        null, { label: "Minimum threshold", text: "A security review before any user touches your app is the minimum responsible bar for releasing an MVP into the world." }),
      q("A founder adds a fifth integration this week — each one 'obviously useful,' each built in an afternoon. The roadmap is now blurry. Which trap is this?",
        ["Agentic technical debt", "False product-market fit", "Zero-friction scope creep", "Insecure by inexperience"],
        2, "Each addition is individually defensible and nearly free to build — which is exactly what makes zero-friction scope creep so easy to fall into."),
      r("METHOD", "Define your architecture before you build",
        ["Before Claude Code writes a line of production code, use Claude to define and document the architectural decisions that will govern this stage: the patterns to follow, the dependencies to avoid, the tradeoffs you're consciously accepting and why.",
         "Save this as a CLAUDE.md file. It is the first artifact of your build and the one every subsequent session depends on."],
        null, { label: "What CLAUDE.md is", text: "Project-level instructions automatically read by the Agent SDK when it runs in a directory — functionally, persistent memory for your project. Without it, every session re-infers its own structural assumptions and the codebase drifts toward incoherence." }, "big"),
      r("METHOD", "Define and enforce your MVP scope",
        ["Just as you documented your architecture, document your scope before a single feature is built. The scope document states what the MVP does, what it deliberately does not do, and the feature-amendment criteria — what specific evidence from real users would justify adding something.",
         "When new feature ideas surface — and they will — use Claude to pressure-test whether it's genuine user signal or founder enthusiasm dressed up as product thinking."]),
      r("METHOD", "Build with session discipline",
        ["Claude Code becomes your primary build tool — but treat each session as the execution of decisions you've already made, not an invitation to make new ones.",
         "Start every session by revisiting your scope document and providing the CLAUDE.md context. End every session by updating CLAUDE.md with any decisions that surfaced. Five minutes of documentation per session is cheap insurance against architectural drift."],
        null, { label: "The goal", text: "A codebase whose structure you can explain — not just a codebase that runs." }),
      r("METHOD", "Security review before any user touches it",
        ["Run your core application code through Claude with a specific brief: review authentication and session handling, data exposure in API responses, input validation and injection risks, and dependencies with known vulnerabilities.",
         "Claude gives a useful first-pass review and Claude Code Security scans codebases and suggests patches. Neither replaces security tooling or — at higher stakes — a human reviewer for anything touching authentication, secrets, or data handling."]),
      r("METHOD", "Build your measurement framework BEFORE launch",
        ["Founders who mistake early traction for PMF are usually the ones who started tracking data after launch — choosing metrics to show what was working rather than to surface what wasn't.",
         "Set your retention benchmarks, activation criteria, and Day 7 and Day 30 targets before the first user shows up. Then define what a false positive looks like for your product."],
        null, { label: "Examples of false positives", text: "Signups without activation. Revenue without retention. Initial enthusiasm without repeat usage. When the data arrives, ask Claude to make the adversarial case against your own traction." }),
      q("Which data pattern is most likely a false positive rather than genuine product-market fit?",
        ["Users return weekly for three months unprompted",
         "A Hacker News spike of signups with almost no Day-30 activation",
         "Several users describe how they'd be disappointed to lose the product",
         "Customers refer colleagues without being asked"],
        1, "A traffic spike with no activation or retention is ephemeral launch energy — flattering noise. Repeat unprompted usage and referral are real signals."),
      r("DECISION", "Litmus tests for product-market fit",
        ["No single data point confirms PMF — it's a pattern that must hold across multiple iteration cycles. But two litmus tests help:"],
        ["The Sean Ellis test — ask active users: 'How would you feel if you could no longer use this product?' If more than 40% answer 'very disappointed,' that's a meaningful PMF indicator.",
         "The effort test — pre-PMF, retention takes constant intervention: outreach, incentives, heroic founder energy. Post-PMF, the product does that work itself. When things start pulling instead of pushing, something real has changed."]),
      r("DECISION", "Pivot when the evidence demands it",
        ["If three or more iteration cycles produce no movement toward your PMF benchmarks, that's not failure — it's the system working, surfacing the truth before you over-invest.",
         "Run a diagnostic with Claude: feed it your retention data, user feedback, and original hypothesis, and ask three questions."],
        ["Is there a segment in this data responding differently than the rest?",
         "Is the gap between designed value and experienced value a positioning problem or a product problem?",
         "What would have to be true for the current product to find genuine PMF — and is that scenario realistic?"]),
    ],
    check: [
      q("The MVP stage is fundamentally:",
        ["A pure construction phase", "An evidence-gathering exercise about the solution", "A fundraising sprint", "A hiring phase"], 1,
        "It still gathers evidence — now about whether the solution is valuable, not whether the problem is real."),
      q("Why does AI technical debt behave worse than ordinary technical debt?",
        ["It is illegal", "It compounds — without written specs every session re-derives and drifts foundational decisions", "It cannot be fixed", "It only affects the frontend"], 1,
        "Ordinary debt builds gradually and clears in a sprint. AI debt compounds as each session re-derives architecture without shared context."),
      q("A CLAUDE.md file functions as:",
        ["A marketing one-pager", "Persistent project memory and project-level instructions read by the Agent SDK", "A pitch deck", "A user manual"], 1,
        "It documents architecture, patterns, and tradeoffs — automatically read so every session starts from shared understanding."),
      q("The Sean Ellis test indicates meaningful PMF when more than 40% of active users say they would be:",
        ["'Somewhat interested'", "'Very disappointed' to lose the product", "Willing to pay double", "Likely to switch"], 1,
        "Over 40% answering 'very disappointed' to losing the product is a recognized PMF signal."),
      q("The 'effort test' for PMF observes that post-PMF:",
        ["Founders work harder", "The product starts pulling users on its own instead of being pushed", "Marketing spend rises", "Churn becomes irrelevant"], 1,
        "Pre-PMF retention needs heroic founder energy; post-PMF the product retains users itself — the shift from pushing to pulling."),
      q("The antidote to zero-friction scope creep is:",
        ["Hiring more engineers", "A written scope document defining what the product does NOT do and the user evidence required to add anything", "Shipping faster", "Removing all integrations"], 1,
        "A pre-written scope document moves the decision from 'should we build this?' to 'have users proven they can't get value without it?'"),
      q("Three iteration cycles with no movement toward PMF benchmarks should trigger:",
        ["An immediate fundraise", "A diagnostic — segment analysis, positioning-vs-product, and a realistic path-to-PMF question", "Firing the team", "Ignoring the data"], 1,
        "It's the system working. Run the three-question diagnostic before deciding to adjust, pivot, or return to the Idea stage."),
    ],
  },
  /* ---------- CHAPTER 3 ---------- */
  {
    id: "launch", n: 3, icon: Rocket, title: "Launch Stage",
    sub: "Prove the business deserves to grow",
    intro: "If the MVP stage proved your product deserves to exist, the Launch stage proves your business deserves to grow. Companies with real product traction still fall apart here if the organization can't keep up.",
    blocks: [
      r("THE GOAL", "Turn traction into a growth engine — and a company",
        ["In the Launch stage you turn early traction into a repeatable, sustainable growth engine. Beyond making the product production-ready, you harden the infrastructure beneath it and build an actual company around it.",
         "The Idea and MVP stages were naturally founder-centric — you needed full situational awareness and tight feedback loops. Now a founder who still holds every thread becomes the bottleneck."],
        null, { label: "The shift", text: "The goal isn't to remove yourself from the company. It's to build operational systems that free your attention for the decisions only a founder can make." }),
      r("EXIT CRITERIA", "Three conditions to leave the Launch stage",
        ["The Launch stage exit condition has three distinct elements — all required."],
        ["Growth is repeatable and channel-driven — you acquire users predictably through specific channels, and CAC, LTV, and payback period are numbers you know and can defend.",
         "The product can handle production workloads — infrastructure is hardened, security and compliance are in order, and reliability holds under real conditions, not just the ones you tested.",
         "Operations run without founder bottlenecks — processes and automation exist; you're no longer personally handling support, triage, sprint planning, or reporting."]),
      r("CHALLENGE 1", "Technical debt comes due",
        ["The MVP codebase built for speed proved the product worked. Now production traffic, new features, and growing complexity expose the shortcuts. The debt starts accruing interest, and the longer it goes unaddressed, the more expensive it is to fix.",
         "The solution: a systematic architectural audit to find structural weaknesses, targeted refactoring of the worst of them, and a meaningful expansion of test coverage so the next round of features doesn't reintroduce the same problems."]),
      r("CHALLENGE 2", "The founder becomes the bottleneck",
        ["At MVP, the founder being in every loop was an asset. At Launch — as support volume grows and decisions stack up — that same instinct becomes the constraint. There is rarely a clear moment when it happens, so the risk is to miss it entirely and stay in builder mode while the organization stalls."],
        ["Decisions that should take an hour now take a week to get to",
         "Support requests pile up because only you know the answers",
         "Operational tasks happen only when you personally remember them"],
        { label: "The remedy", text: "An all-out audit of everything you're personally handling — to identify what can be systematized, what can be delegated, and what genuinely still merits founder time." }),
      r("CHALLENGE 3", "Security and compliance are no longer deferrable",
        ["At MVP, with a handful of beta users and no sensitive data, security vulnerabilities were theoretical. The moment your product enters production with real users depending on it, the hypothetical becomes real exposure.",
         "Compliance requirements that never applied to a prototype apply the instant you handle customer data, process payments, or sell into regulated industries."],
        null, { label: "The remedy", text: "A systematic security and compliance review before production scale arrives — and treat everything it surfaces as required remediation, not a suggestion." }),
      r("CHALLENGE 4", "Expansion before you're ready",
        ["New markets and funding opportunities look like growth. They can also be where product-market fit goes to die.",
         "Your initial traction is real but specific to your early audience. Expanding too early into a meaningfully different market introduces new user behaviors, compliance requirements, payment infrastructure, and baseline expectations — suddenly too many new variables, and you lose the ability to read your own data. You also risk neglecting the original user base."]),
      q("A founder's hour-long decisions now take a week, and support tickets only get answered when they personally remember. This is:",
        ["Technical debt coming due", "The founder becoming the bottleneck", "Premature expansion", "False PMF"],
        1, "These are the textbook telltale signs that the founder has become the organizational constraint."),
      r("METHOD", "Remediate technical debt before it compounds",
        ["Direct Claude Code to run a full architectural audit: where the codebase is brittle, which shortcuts will become expensive, and where test coverage is thin enough that new feature work will reintroduce old problems.",
         "Feed the audit findings back to Claude to triage and sequence the remediation: what must be fixed before the next release, what can wait a sprint, what is acceptable ongoing debt. This is also the moment to document MVP-era architectural decisions into CLAUDE.md."]),
      r("METHOD", "Build the systems that replace founder attention",
        ["Use Claude Cowork to run a structured audit of your operational load — every recurring task, every decision that lands on your desk, every workflow that only happens because you remember it.",
         "Then categorize the inventory into three buckets, and design the workflow logic for the automation candidates: what triggers each workflow, what the decision rules are, what the output looks like, and where it goes."],
        ["Can be automated entirely",
         "Needs a human — but not necessarily you",
         "Genuinely requires founder judgment"]),
      sort("Triage these founder tasks the way a Launch-stage operational audit would.",
        [{ id: "auto", label: "Automate" }, { id: "deleg", label: "Human, not you" }, { id: "keep", label: "Founder judgment" }],
        [{ x: "Compiling the weekly metrics report from connected data sources", c: "auto" },
         { x: "Deciding the product narrative for the next fundraise", c: "keep" },
         { x: "Routing incoming bug reports to the right place", c: "auto" },
         { x: "Answering routine 'how do I' support tickets", c: "deleg" },
         { x: "A founder-to-founder relationship-building conversation", c: "keep" },
         { x: "Updating the CRM when a deal changes stage", c: "auto" }],
        "Recurring rules-based work automates. Judgment-light human work delegates. Narrative, relationships, and high-stakes strategy stay with the founder."),
      r("METHOD", "Make security and compliance a product workstream",
        ["Use Claude Code to surface code-level issues that recur in SOC 2, GDPR, and HIPAA audits, plus whatever standards your target market requires. This surfaces both vulnerabilities and compliance gaps.",
         "Feed the findings to Claude to prioritize remediation and design the controls, audit logging, and access management enterprise buyers ask for before they sign. Build compliance into your development cycle rather than running it as a one-time project — it needs continual maintenance."]),
      r("METHOD", "Stand up the product-management OS you've been skipping",
        ["The Launch stage needs lightweight, repeatable processes that run without founder intervention to trigger them. Use Claude to design a product-management operating system, then Claude Cowork to run its recurring elements."],
        ["A defined sprint cadence and work-cycle structure",
         "A minimum spec template — what a spec must contain before Claude Code touches a feature",
         "A bug-triage decision tree for how reports get routed",
         "A weekly metrics brief that pulls from your real data sources"]),
      r("THE PRINCIPLE", "All three surfaces compound",
        ["At Launch, all three forms of Claude are in full use and they feed each other — each tool's output becomes another's input.",
         "Claude Code builds the product, Claude Cowork builds the company around it, and Claude operationalizes the knowledge. A small team running all three together gets the operational posture of a company many times its size."],
        null, { label: "Why it matters", text: "This compounding is exactly what makes the ultra-lean startup model structurally possible." }, "big"),
    ],
    check: [
      q("The Launch stage proves:",
        ["That your product deserves to exist", "That your business deserves to grow", "That you can raise a round", "That you can hire fast"], 1,
        "MVP proved the product should exist; Launch proves the business should grow."),
      q("Which is part of the three-element Launch exit condition?",
        ["A viral marketing campaign", "Repeatable channel-driven growth with defensible CAC, LTV, and payback", "A second product line", "An international office"], 1,
        "The three elements: channel-driven growth with known unit economics, production-ready infrastructure, and founder-free operations."),
      q("At Launch, the founder being in every loop becomes:",
        ["An advantage, as it was at MVP", "The organizational constraint", "Irrelevant", "A compliance requirement"], 1,
        "What was an asset at MVP becomes the bottleneck at Launch — the hardest shift is moving from doing the work to designing the systems."),
      q("Security and compliance at Launch should be treated as:",
        ["Optional suggestions", "Required remediation, reviewed before production scale arrives", "A one-time project after launch", "The investors' responsibility"], 1,
        "A systematic review before scale — and everything it surfaces is required remediation, built into the dev cycle."),
      q("In the operational audit, a recurring rules-based task like routing bug reports belongs in which bucket?",
        ["Founder judgment", "Automate entirely", "Cannot be handled", "Delegate to investors"], 1,
        "Recurring, rule-driven workflows are prime automation candidates; only judgment-heavy work stays with the founder."),
      q("Why is expanding into a new market too early dangerous?",
        ["It always fails legally", "It introduces too many new variables, so you lose the ability to read your own data — and may neglect your original users", "New markets never have demand", "It requires a new product name"], 1,
        "A meaningfully different market changes user behavior, compliance, and expectations all at once — and your validated traction was specific to the original audience."),
    ],
  },
  /* ---------- CHAPTER 4 ---------- */
  {
    id: "scale", n: 4, icon: TrendingUp, title: "Scale Stage",
    sub: "From a bet to a business",
    intro: "At Scale, the founder's role re-centers from builder to public-facing executive. The goal: systematic, auditable growth and a moat that a well-funded incumbent couldn't copy.",
    blocks: [
      r("THE ROLE", "Builder becomes executive",
        ["During the Scale phase the founder's day-to-day work becomes increasingly about the company itself — analyst briefings, IPO roadshows, board relationships — even as you fight to keep the lean, AI-centered structural advantage.",
         "You're going from thousands of users to millions, and from one market to many. Growth can no longer be felt your way through; it must be systematic, sustained by mature organizational operations."]),
      r("THE GOAL", "Build a moat through accumulated depth",
        ["For an AI-native startup, the goal is a defensible moat built from accumulated depth. It has three sources:"],
        ["The expertise you've encoded into your product",
         "Your product's depth of integration with the other tools and platforms your users rely on",
         "The proprietary system data and workflows you've accumulated",
         "Founders who've built consistently in one direction, on consistent infrastructure, now have something genuinely hard to replicate."]),
      r("EXIT CRITERIA", "A threshold, not a milestone",
        ["The Scale exit condition is no longer a single milestone but a threshold event: the company is sustainable even as the founder is increasingly not running day-to-day operations. In practice it takes one of three forms."],
        ["Sustainable profitability at a scale that no longer requires external capital",
         "IPO-readiness",
         "Acquisition",
         "All three require systematic and auditable growth, a product moat that holds under scrutiny, and an operationally mature organization."]),
      r("THE TEST", "The incumbent-copy question",
        ["At Scale, public investors, analysts, regulators, enterprise procurement teams, and acquirers apply far greater pressure — and skepticism. Your product and organization must withstand external scrutiny of governance, compliance, financial controls, and strategic narrative.",
         "One question cuts to the core of whether you've built a moat:"],
        null, { label: "Ask yourself", text: "'If a well-funded incumbent copied your product today, would your users stay?' A confident yes means the moat is real. When that's true, your startup has gone from being a bet to being a business." }, "big"),
      r("CHALLENGE 1", "Delegating the operational layer",
        ["Scale-stage systems must run reliably without being babysat. For a founder hands-on since day one, that transition is as much psychological as structural.",
         "Hand off too much too fast — especially to AI-automated systems — and critical decisions get made without context only the founder has. Hold on too long and you're the bottleneck again."],
        null, { label: "The real challenge", text: "Identify the institutional knowledge that lives only in your head or in undocumented workflows — and codify it into systems that are documented, auditable, and transferable." }),
      r("CHALLENGE 2", "Scaling technical operations",
        ["Customers no longer evaluate only your product — they want to know your organization can be a dependable infrastructure partner.",
         "The technical challenge is no longer the codebase itself but everything built around it: support infrastructure, documentation, and reliability guarantees. Institutional buyers signing multi-year contracts want these before they sign — and will hold you to them after."]),
      r("CHALLENGE 3", "Scaling organizational functions",
        ["A Scale-stage company needs real organizational infrastructure regardless of headcount — hiring, payroll, accounting, legal operations.",
         "At Launch, systematizing meant automating the workflows consuming founder attention. Scale needs a broader and more consequential array: financial reporting, compliance monitoring, contract management, customer support."]),
      r("CHALLENGE 4", "Building a GTM function",
        ["Organic growth has a ceiling, and most Scale-stage founders hit it before they've ever built a real go-to-market function. Idea-, MVP-, and Launch-stage growth often came from founder-led selling — a Product Hunt post, personal relationships."],
        ["Flattening user-growth curves",
         "Rising customer acquisition costs",
         "A pipeline that only moves when the founder is personally involved"],
        { label: "What's required", text: "A dedicated growth engine — new systems and processes, plus a brand voice and story. It doesn't have to be large to be effective, and the same AI infrastructure that built the product can bootstrap it." }),
      q("A founder sees user growth flattening, CAC rising, and a pipeline that stalls whenever they step away. The Scale-stage challenge is:",
        ["Delegating the operational layer", "Hitting the organic-growth ceiling — no real GTM function", "Technical debt", "False PMF"],
        1, "Flattening curves, rising CAC, and a founder-dependent pipeline are the classic signs of hitting the limit of founder-led, organic growth."),
      r("METHOD", "Hand day-to-day tasks to Claude Cowork",
        ["Start with a clear-eyed view of where to invest your attention. Have Claude build the list of things only you should be doing — product-narrative decisions, board relationships, enterprise deals, founder-to-founder conversations. Anything not on that list is a delegation or automation candidate."],
        null, { label: "The bottleneck map", text: "Ask Claude to map every workflow, decision, and approval routed through you — then extrapolate what happens to each if you're unavailable for a week. The workflows that stall are exactly where handoff criteria and escalation paths still need tightening." }),
      r("METHOD", "Scale into enterprise-grade infrastructure",
        ["Convert institutional knowledge into a system that scales. Claude drafts and maintains the written infrastructure enterprise procurement expects: product documentation, support playbooks, SLAs.",
         "Claude Code audits and hardens the codebase to the standards enterprise contracts require and builds the technical support infrastructure — logging, monitoring, incident response, the observability layer that makes SLAs actually enforceable. Claude Cowork then runs the operational layer: ticket routing, escalation workflows, renewal tracking, reporting cadences."]),
      r("METHOD", "Build a real GTM function",
        ["Founder hustle got you here; scaling requires an actual go-to-market strategy. Claude builds the foundations — market segmentation, messaging architecture, analyst-relations strategy, sales playbooks, and the investor-facing metrics narratives that matter once you're talking to public investors and Wall Street analysts.",
         "Claude Cowork becomes the tactical execution layer for content pipelines, outbound, PR cadences, and CRM hygiene, and Claude Code builds the product-marketing infrastructure: interactive demo environments, sandbox tenants, API references."],
        null, { label: "Why it compounds", text: "A well-built demo environment closes deals while you're in board meetings — GTM that runs asynchronously." }),
      r("THE MOAT", "Domain expertise becomes AI context",
        ["Many ultra-lean founders build highly specific tools for a problem they know first-hand. Using Claude to capture, organize, and refine that knowledge puts your expertise somewhere the product can reach — industry jargon, regulatory gotchas, edge cases, why the obvious answers fail.",
         "Skills then codify recurring workflows into reusable routines Claude runs the same way every time. Over months this becomes a proprietary knowledge substrate no generalist AI can match."],
        null, { label: "Example", text: "A generalist AI medical-billing tool breaks on 340B drug-program claims; yours has specific logic for them. Identify one edge case a generic competitor would get wrong, build a dedicated test case for it — your test suite becomes a map of your moat." }),
      r("THE MOAT", "The compounding data flywheel",
        ["As users interact with your product they generate behavioral signals — which outputs they accept and which they reject. Each improvement makes the product more useful, which drives more usage, which creates more feedback, which drives more improvement.",
         "This data is time-locked and context-specific. A copycat simply can't buy the behavioral fingerprint of thousands of users who've refined their workflows inside your product. The standard test: a well-resourced competitor starting today couldn't replicate your flywheel in under two years."]),
      r("THE MOAT", "Workflow lock-in",
        ["Compounding data makes your product hard to replicate; workflow lock-in makes it hard to leave. The longer users run your product inside their daily operations, the more deeply it embeds — they've built automations on top of it, trained people, connected data sources.",
         "At that point switching stops being a product decision and becomes a full-scale operational project. Claude Code helps you ship native integrations and the APIs, webhooks, and SDKs that let customers build on top of your product — the deepest form of lock-in."]),
      q("Why is an accumulated user-data flywheel a genuine moat?",
        ["It is patented", "It is time-locked and context-specific — a competitor cannot buy thousands of users' refined behavioral history",
         "It makes the product cheaper", "It eliminates the need for engineers"],
        1, "The flywheel produces a behavioral fingerprint that can't be purchased or shortcut — a competitor starting today couldn't replicate it in under two years."),
      r("THE CLOSE", "Same job, new rules",
        ["The founder's job hasn't changed: find a real problem, build something that solves it, scale it into a company that matters. What changed is the path. AI compresses quarters into weeks — validation cycles that took months now take afternoons.",
         "The constraint has moved."],
        null, { label: "The final principle", text: "The bottlenecks are no longer what you can build — but what you choose to build." }, "big"),
    ],
    check: [
      q("At Scale, the founder's role re-centers toward being:",
        ["A hands-on engineer", "A public-facing executive", "A part-time advisor", "A customer-support lead"], 1,
        "The day-to-day shifts to analyst briefings, board relationships, and roadshows — while preserving the lean, AI-centered advantage."),
      q("The Scale-stage exit threshold typically takes which three forms?",
        ["Series A, B, and C", "Sustainable profitability, IPO-readiness, or acquisition", "More users, more revenue, more staff", "A pivot, a merger, or a shutdown"], 1,
        "All three require systematic, auditable growth, a defensible moat, and an operationally mature organization."),
      q("The three sources of an AI-native moat are:",
        ["Funding, headcount, and office space", "Encoded expertise, integration depth, and proprietary data/workflows", "Marketing, PR, and ads", "Patents, trademarks, and copyrights"], 1,
        "Accumulated depth: expertise built into the product, deep integration with users' tools, and proprietary system data and workflows."),
      q("'If a well-funded incumbent copied your product today, would your users stay?' is the test for:",
        ["Whether to fundraise", "Whether your moat is real", "Whether to hire", "Whether to expand internationally"], 1,
        "A confident yes signals a genuine moat — the marker that the startup has become a business."),
      q("Skills, in the Scale-stage moat, are used to:",
        ["Replace the founder", "Codify recurring workflows into reusable routines Claude runs the same way every time", "Generate marketing copy", "Manage payroll"], 1,
        "Skills turn domain workflows into repeatable routines — part of building a proprietary knowledge substrate."),
      q("Workflow lock-in makes a product hard to leave because:",
        ["It is encrypted", "Users build automations, train people, and connect data sources around it — switching becomes a full operational project", "It is free", "It has no competitors"], 1,
        "Deep embedding turns switching from a product decision into a full-scale operational project."),
      q("The closing principle of the playbook is that the bottleneck is now:",
        ["What you can afford", "What you can build", "What you choose to build", "How fast you can hire"], 2,
        "AI removed 'what you can build' as the constraint — the remaining constraint is choosing what to build."),
    ],
  },
];

/* ============================== DRILLS ============================== */
const DRILLS = [
  {
    id: "surface", title: "Pick the Right Claude", icon: Layers, hue: "#c98d6b",
    blurb: "Chat, Cowork, or Code — sharpen your instinct for the right surface.",
    items: [
      q("Sanity-check a single claim two minutes before a board meeting.", ["Chat", "Cowork", "Code"], 0, "Quick, conversational, no setup — that's Chat."),
      q("Turn a folder of 30 customer-call transcripts into a themed findings doc.", ["Chat", "Cowork", "Code"], 1, "Multi-source knowledge work producing a finished artifact — Cowork."),
      q("Ship a new feature across a growing codebase with git integration.", ["Chat", "Cowork", "Code"], 2, "Codebase access, diffs, dev environments — Claude Code."),
      q("A standing Monday task that compiles a weekly KPI brief into a shared folder.", ["Chat", "Cowork", "Code"], 1, "Scheduled runs against connected tools is a Cowork strength."),
      q("Rewrite one clunky sentence in an email.", ["Chat", "Cowork", "Code"], 0, "A quick rewrite with no setup — Chat."),
      q("Migrate legacy code written during the MVP days.", ["Chat", "Cowork", "Code"], 2, "Codebase migration belongs in Claude Code."),
      q("Build a competitive landscape from a dozen vendor sites before a fundraise.", ["Chat", "Cowork", "Code"], 1, "Synthesizing many sources into a finished deliverable — Cowork."),
      q("Make sense of a long, messy Slack thread you just scrolled past.", ["Chat", "Cowork", "Code"], 0, "Quick comprehension without leaving the app — Chat."),
      q("Run a security scan and propose patches across your codebase.", ["Chat", "Cowork", "Code"], 2, "Code-level scanning and patching is Claude Code's domain."),
      q("Schedule user interviews and keep a tracking sheet updated via Gmail and Calendar.", ["Chat", "Cowork", "Code"], 1, "Connector-driven, recurring operational work — Cowork."),
    ],
  },
  {
    id: "trap", title: "Spot the Trap", icon: AlertTriangle, hue: "#df7d57",
    blurb: "Read the scenario. Name the failure mode the founder has stumbled into.",
    items: [
      q("Week one of the idea: the founder skips interviews entirely and asks Claude Code to build a full prototype.",
        ["Premature scaling", "Mistaking building for validating", "Scope creep"], 1,
        "The build is happening in place of validation — the prototype is being used to skip the evidence-gathering work."),
      q("The founder asks Claude to 'find data that proves this market is huge,' and uses the result as due diligence.",
        ["Loss of objectivity", "Technical debt", "Founder bottleneck"], 0,
        "Confirmation bias with a research engine — directing AI to confirm rather than to pressure-test."),
      q("Each session, Claude Code re-derives the architecture because nothing is written down. The codebase no longer has a coherent mental model.",
        ["False PMF", "Agentic technical debt", "Premature expansion"], 1,
        "Compounding AI technical debt — the absence of specs and CLAUDE.md context causes drift every session."),
      q("A Hacker News spike drives 4,000 signups. The founder declares product-market fit and starts hiring.",
        ["Falling for false product-market fit", "Scope creep", "Founder bottleneck"], 0,
        "Launch energy from an ephemeral source mistaken for durable PMF — week-twelve retention will tell the truth."),
      q("Five 'obviously useful' features were added this week, each in an afternoon. The roadmap is now unclear.",
        ["Zero-friction scope creep", "Technical debt comes due", "Loss of objectivity"], 0,
        "When building is nearly free, individually defensible additions accumulate into directionless sprawl."),
      q("The MVP ships to real users with no review of authentication, data exposure, or dependency vulnerabilities.",
        ["Insecure by inexperience", "Premature scaling", "Founder bottleneck"], 0,
        "AI generates code that works, not code that's secure — shipping without a security review is the trap."),
      q("Hour-long decisions take a week; tickets pile up because only the founder knows the answers.",
        ["The founder becomes the bottleneck", "False PMF", "Agentic technical debt"], 0,
        "The classic Launch-stage telltale signs of the founder being the organizational constraint."),
      q("With strong traction in one niche, the founder launches into a very different market and can no longer read their own data.",
        ["Expansion before you're ready", "Loss of objectivity", "Insecure by inexperience"], 0,
        "Too many new variables at once — validated traction was specific to the original audience."),
      q("Scale-stage systems exist but the founder still personally approves every workflow, refusing to trust them.",
        ["Failure to delegate the operational layer", "Building a GTM function", "Technical debt"], 0,
        "At Scale the work is maturing systems until trustworthy — and then actually trusting them."),
      q("User growth is flattening, CAC is climbing, and the pipeline stalls whenever the founder steps away.",
        ["Hitting the organic-growth ceiling with no GTM function", "Scope creep", "False PMF"], 0,
        "Founder-led selling has hit its limit — Scale-stage growth needs a dedicated GTM engine."),
    ],
  },
  {
    id: "hypothesis", title: "Hypothesis Lab", icon: FlaskConical, hue: "#e0a94e",
    blurb: "Vague observation, or testable hypothesis? Train the most important Idea-stage muscle.",
    items: [
      q("'People hate doing their taxes.'", ["Testable hypothesis", "Vague observation"], 1, "No who, no frequency, no severity, no mechanism — an observation, not a hypothesis."),
      q("'Freelance designers in the US miss an average of 2 invoices per quarter because they track them in spreadsheets with no reminders.'", ["Testable hypothesis", "Vague observation"], 0, "Names who, how often, how severely, and the mechanism — fully testable."),
      q("'The healthcare industry is ripe for disruption.'", ["Testable hypothesis", "Vague observation"], 1, "A slogan, not a claim you could go check against reality."),
      q("'Solo accountants at firms under 10 people spend 5+ hours each tax season re-entering client data because their software doesn't sync with bank feeds.'", ["Testable hypothesis", "Vague observation"], 0, "Specific population, frequency, magnitude, and cause — testable."),
      q("'Onboarding is confusing for our users.'", ["Testable hypothesis", "Vague observation"], 1, "Which users, at which step, how often? Without that, it can't be validated."),
      q("'Customer-support managers at mid-market SaaS companies escalate 30% of tickets unnecessarily because no system flags which past tickets resolved fastest.'", ["Testable hypothesis", "Vague observation"], 0, "Quantified, scoped, and mechanism-explained — a testable hypothesis."),
      q("'Everyone wants a better way to schedule meetings.'", ["Testable hypothesis", "Vague observation"], 1, "'Everyone' and 'better' are unfalsifiable — no specificity to test."),
      q("'Warehouse shift supervisors redo the weekly staffing plan 3-4 times because last-minute call-outs aren't visible until the morning of.'", ["Testable hypothesis", "Vague observation"], 0, "Specific role, frequency, and the structural cause — testable."),
      q("'Contract review takes too long.'", ["Testable hypothesis", "Vague observation"], 1, "The playbook's own example of a non-testable statement — no who, no number, no mechanism."),
      q("'Indie game studios lose roughly a week per release reconciling localization files across 6 disconnected tools.'", ["Testable hypothesis", "Vague observation"], 0, "Population, magnitude, and the disconnected-tools mechanism — testable."),
    ],
  },
  {
    id: "signal", title: "Signal vs. Noise", icon: Target, hue: "#57a99e",
    blurb: "Real product-market fit, or flattering noise? Decide before the data fools you.",
    items: [
      q("48% of active users say they'd be 'very disappointed' if they could no longer use the product.", ["Real PMF signal", "Flattering noise"], 0, "Above the 40% Sean Ellis threshold — a meaningful PMF indicator."),
      q("A product launch on a popular forum drives a one-day spike of signups.", ["Real PMF signal", "Flattering noise"], 1, "Ephemeral launch energy — it says nothing about week-six or week-twelve retention."),
      q("Users in a defined segment have returned weekly, unprompted, for three straight months.", ["Real PMF signal", "Flattering noise"], 0, "Sustained, unprompted retention across cycles is a genuine signal."),
      q("Revenue is up, but almost none of the paying users came back after their first week.", ["Real PMF signal", "Flattering noise"], 1, "Revenue without retention is a textbook false positive."),
      q("Customers refer colleagues without being asked or incentivized.", ["Real PMF signal", "Flattering noise"], 0, "Unprompted referral is one of the three core evidences of PMF."),
      q("Signups are climbing fast, but activation — users reaching first value — stays near zero.", ["Real PMF signal", "Flattering noise"], 1, "Signups without activation is flattering noise, not fit."),
      q("Retention only holds while the founder personally sends weekly check-in emails and incentives.", ["Real PMF signal", "Flattering noise"], 1, "That's the product being pushed, not pulling — pre-PMF behavior by the effort test."),
      q("Prospective buyers at your investor's other portfolio companies all try the product early on.", ["Real PMF signal", "Flattering noise"], 1, "An ephemeral force — a warm-intro audience, not evidence the market needs it."),
      q("Without any founder intervention, the product retains its users on its own across multiple iteration cycles.", ["Real PMF signal", "Flattering noise"], 0, "The effort test passing — the product pulls instead of being pushed."),
    ],
  },
  {
    id: "interview", title: "Interview Auditor", icon: Search, hue: "#b288d6",
    blurb: "Audit customer-discovery questions. Ship the good ones, flag the leading ones.",
    items: [
      q("'Walk me through the last time you ran into this problem.'", ["Ship it", "Flag it"], 0, "Past-oriented and open — it surfaces real behavior."),
      q("'Would you use a tool that solved this?'", ["Ship it", "Flag it"], 1, "Future-facing and leading — it invites optimistic, socially desirable answers."),
      q("'What did you do the last time, and how long did it take?'", ["Ship it", "Flag it"], 0, "Concrete, past-oriented, and specific — strong signal."),
      q("'Don't you think this is a huge problem?'", ["Ship it", "Flag it"], 1, "Leading — it tells the respondent the answer you want."),
      q("'How do you currently handle this, start to finish?'", ["Ship it", "Flag it"], 0, "Open and process-focused — it reveals actual workflow."),
      q("'How much would you pay for something like this?'", ["Ship it", "Flag it"], 1, "Future-facing hypothetical pricing — produces noise, not signal."),
      q("'What was the most frustrating part of dealing with it last time?'", ["Ship it", "Flag it"], 0, "Anchored to a real past event — surfaces genuine pain."),
      q("'You'd love a faster way to do this, right?'", ["Ship it", "Flag it"], 1, "Leading and closed — it scripts the answer."),
      q("'Tell me about the tools you tried before and why you stopped.'", ["Ship it", "Flag it"], 0, "Past behavior plus the reasons behind it — high-value signal."),
    ],
  },
];

/* ============================== EXAM ============================== */
const EXAM = [
  q("The traditional startup arc assumed every new stage required a bigger team, new skills, and a new round. AI's core change was to:",
    ["Make all startups profitable", "Erase that linkage so a lean team can progress without scaling up each time", "Remove the need for customer discovery", "Replace founders entirely"], 1,
    "AI broke the assumption that each phase demands more headcount and capital."),
  q("In an AI-native startup, the founder is best described as:",
    ["A full-time coder", "An orchestrator of agents and systems whose attention moves up the stack", "A passive observer", "A pure fundraiser"], 1,
    "The role shifts from individual contributor to orchestrating the AI agents and tools that execute the work."),
  q("The single most revolutionary effect of AI as infrastructure is:",
    ["Cheaper servers", "Faster legal review", "Unblocking non-technical domain experts to build production software", "Automatic PMF"], 2,
    "It expands who can found a startup — domain experts can now build."),
  q("Which surface is built for finished, multi-source knowledge work with connectors and scheduled runs?",
    ["Chat", "Claude Cowork", "Claude Code", "A spreadsheet"], 1,
    "Cowork handles research and analysis built from your files and systems into a finished deliverable."),
  q("The exit condition for the Idea stage is:",
    ["A working prototype", "Problem-solution fit backed by qualitative evidence", "A funding round", "A hired team"], 1,
    "Idea stage ends at problem-solution fit — evidence you're solving a real problem for real people."),
  q("A prototype is best understood as:",
    ["Proof the market needs your product", "A pressure-testing prop for conversations with potential users", "A reason to start scaling", "Validation in itself"], 1,
    "The prototype enables conversations; the conversations are the real evidence."),
  q("Which is a genuinely testable problem hypothesis?",
    ["'People dislike paperwork'", "'The market is ready'", "'Mid-market finance managers spend 4+ hrs/week reconciling submissions because their tools don't integrate with their accounting software'", "'Users want simplicity'"], 2,
    "It names who, how often, how severely, and the mechanism."),
  q("'Loss of objectivity' is uniquely dangerous in 2026 because:",
    ["Founders don't do research", "Confirmation bias is now paired with a research engine that finds supporting evidence on demand", "AI won't criticize ideas", "Investors demand it"], 1,
    "The fix is the same tool pointed at disconfirmation."),
  q("The strongest customer-discovery questions ask about:",
    ["Predicted future behavior", "Actual past behavior", "Opinions of your idea", "Pricing willingness"], 1,
    "Past behavior is evidence; 'would you...' invites fiction."),
  q("A complete competitive map has which four tiers?",
    ["Big, medium, small, startup", "Direct, indirect, potential acquirers, adjacent players", "Free, cheap, premium, enterprise", "Local, national, global, online"], 1,
    "Competitor neglect happens when you watch only the direct tier."),
  q("The MVP stage is fundamentally:",
    ["Pure construction", "An evidence-gathering exercise about the solution", "A marketing push", "A hiring sprint"], 1,
    "It gathers evidence about whether the solution is valuable enough to use, return to, pay for, or refer."),
  q("AI technical debt is worse than ordinary technical debt because it:",
    ["Is permanent", "Compounds — without written specs each session re-derives and drifts foundational decisions", "Only affects design", "Cannot be measured"], 1,
    "The absence of persistent context causes architectural drift every session."),
  q("A CLAUDE.md file is:",
    ["A pitch deck", "Persistent project memory — project-level instructions read automatically by the Agent SDK", "A user guide", "An invoice"], 1,
    "It encodes architecture and tradeoffs so every session starts from shared understanding."),
  q("The MVP exit condition — genuine PMF — is evidenced by which trio?",
    ["Press, awards, hiring", "Retention, revenue, referral", "Funding, valuation, headcount", "Features, speed, polish"], 1,
    "A specific group returns to it, pays for it, or tells others about it."),
  q("The Sean Ellis test signals meaningful PMF when over 40% of active users would feel ___ to lose the product.",
    ["'Mildly annoyed'", "'Very disappointed'", "'Indifferent'", "'Curious'"], 1,
    "Over 40% answering 'very disappointed' is the recognized threshold."),
  q("Zero-friction scope creep is best countered by:",
    ["Hiring engineers", "A written scope document defining what the product does NOT do and what user evidence justifies additions", "Faster shipping", "More funding"], 1,
    "It reframes the decision from 'should we build this?' to 'have users proven they need it?'"),
  q("The Launch stage proves:",
    ["The product deserves to exist", "The business deserves to grow", "The founder can code", "The team can scale"], 1,
    "MVP proves the product; Launch proves the business."),
  q("Which is one of the three Launch-stage exit conditions?",
    ["A viral campaign", "Repeatable channel-driven growth with defensible CAC, LTV, and payback period", "An international office", "A second product"], 1,
    "Plus production-ready infrastructure and founder-free operations."),
  q("At Launch, the founder being in every loop becomes:",
    ["A growing advantage", "The organizational constraint", "Legally required", "Irrelevant"], 1,
    "What was an MVP-stage asset becomes the Launch-stage bottleneck."),
  q("Security and compliance at Launch should be:",
    ["Deferred until profitable", "Treated as required remediation, reviewed before production scale arrives, and built into the dev cycle", "Handled only by investors", "Ignored unless audited"], 1,
    "A systematic review before scale, with findings treated as required, not optional."),
  q("At Scale, the founder's role re-centers toward:",
    ["Hands-on engineering", "A public-facing executive role — analyst briefings, board, roadshows", "Customer support", "Bookkeeping"], 1,
    "While preserving the lean, AI-centered structural advantage."),
  q("An AI-native moat is built from accumulated depth in three areas:",
    ["Funding, staff, offices", "Encoded expertise, integration depth, and proprietary data/workflows", "Ads, PR, events", "Patents, trademarks, copyrights"], 1,
    "Expertise in the product, deep integration with users' tools, and proprietary system data."),
  q("The Scale-stage exit threshold typically takes one of these three forms:",
    ["Seed, Series A, Series B", "Sustainable profitability, IPO-readiness, or acquisition", "Pivot, merger, or shutdown", "More users, revenue, or staff"], 1,
    "All three require systematic auditable growth, a real moat, and operational maturity."),
  q("The closing principle of the playbook is that the bottleneck is now:",
    ["What you can afford to build", "What you can build", "What you choose to build", "How fast you hire"], 2,
    "AI removed 'what you can build' as the constraint; choosing what to build is what remains."),
];

/* ============================== FIELD GUIDE ============================== */
const GUIDE = {
  stages: [
    { name: "Idea", hue: CH_HUE[1], goal: "Assemble qualitative evidence that a real problem exists before committing to build.", exit: "Problem-solution fit — three yeses: the problem is real and specific, your solution addresses the actual problem, and you have enough signal to justify building.", traps: "Mistaking building for validating · Premature scaling · Loss of objectivity" },
    { name: "MVP", hue: CH_HUE[2], goal: "Turn a validated problem into the smallest working product that gathers real evidence about the solution.", exit: "Genuine product-market fit — a specific group shows retention, revenue, or referral.", traps: "Agentic technical debt · False PMF · Zero-friction scope creep · Insecure by inexperience" },
    { name: "Launch", hue: CH_HUE[3], goal: "Turn early traction into a repeatable growth engine and build a real company around the product.", exit: "Repeatable channel-driven growth (CAC/LTV/payback) · production-ready infrastructure · operations without founder bottlenecks.", traps: "Technical debt comes due · Founder becomes the bottleneck · Deferred security and compliance · Premature expansion" },
    { name: "Scale", hue: CH_HUE[4], goal: "Build systematic growth and a defensible moat; mature into a durable business.", exit: "A threshold event — sustainable profitability, IPO-readiness, or acquisition.", traps: "Failure to delegate the operational layer · Scaling technical and org functions · Hitting the organic-growth ceiling" },
  ],
  surfaces: [
    { name: "Chat", use: "A question, a rewrite, a quick brainstorm", why: "Fast, conversational, no setup" },
    { name: "Claude Cowork", use: "Research, analysis, or a finished document built from your files and systems", why: "Folder access, connectors, skills, scheduled runs" },
    { name: "Claude Code", use: "Writing, testing, or shipping software", why: "Codebase access, diffs, git, dev environments" },
  ],
  principles: [
    "Keep your sense-making ahead of your building — especially when building feels effortless.",
    "The intelligence in the system is yours; AI executes your direction toward good ideas and bad ones alike.",
    "A prototype is a pressure-testing prop, not validation. The conversations are the evidence.",
    "Use Claude as a structured devil's advocate at every stage — not just the Idea stage.",
    "Invest in persistent context (CLAUDE.md) from day one or your codebase drifts into incoherence.",
    "Iterate toward evidence, not toward completeness.",
    "Build your measurement framework before the first user arrives.",
    "The bottleneck is no longer what you can build — it's what you choose to build.",
  ],
  stories: [
    "Carta Healthcare — processes 22,000 surgical cases a year and cut data-abstraction time by 66%.",
    "Anything — has helped 1.5M users turn ideas into working software without writing code.",
    "GC AI — domain experts built a Claude-powered legal platform around how in-house teams actually work.",
    "Airtree — runs operations on Claude Cowork; one person's workflow automation becomes everyone's.",
    "Three YC startups — HumanLayer, Ambral, and Vulcan Technologies built and scaled with Claude Code.",
    "Duvo, Zingage, Cogent, Kindora, Wordsmith — agents and platforms built on Claude across procurement, homecare, security, nonprofit funding, and legal.",
  ],
};

/* ============================== LEVELS ============================== */
const LEVELS = [
  { min: 0, title: "Aspiring Founder" },
  { min: 120, title: "Idea-Stage Thinker" },
  { min: 280, title: "Solution Validator" },
  { min: 470, title: "MVP Builder" },
  { min: 670, title: "Launch Operator" },
  { min: 870, title: "Scaling Executive" },
  { min: 1050, title: "AI-Native Master" },
];
const MAX_XP = 1100;

/* ============================== STORAGE ============================== */
const SKEY = "founders-playbook-v1";
async function loadProgress() {
  try { const x = await window.storage.get(SKEY); return x ? JSON.parse(x.value) : null; }
  catch (e) { return null; }
}
async function saveProgress(p) {
  try { await window.storage.set(SKEY, JSON.stringify(p)); } catch (e) {}
}
function blankProgress() { return { chapters: {}, drills: {}, exam: 0 }; }
function computeXP(p) {
  let xp = 0;
  CURRICULUM.forEach((ch) => { const c = p.chapters[ch.id]; if (c) { if (c.done) xp += 70; xp += Math.round((c.check || 0) / 100 * 60); } });
  DRILLS.forEach((d) => { xp += Math.round((p.drills[d.id] || 0) / 100 * 40); });
  xp += Math.round((p.exam || 0) / 100 * 250);
  return xp;
}
function levelFor(xp) {
  let lvl = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) lvl = i;
  return lvl;
}

/* ============================== UI PRIMITIVES ============================== */
function Btn({ children, onClick, kind = "primary", disabled, full, small }) {
  const pad = small ? "px-3.5 py-2 text-[13px]" : "px-5 py-3 text-sm";
  const map = {
    primary: { background: C.accent, color: "#1a120c", border: "1px solid " + C.accent },
    gold: { background: C.gold, color: "#1a120c", border: "1px solid " + C.gold },
    soft: { background: C.card2, color: C.text, border: "1px solid " + C.line },
    ghost: { background: "transparent", color: C.mut, border: "1px solid " + C.line },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={"inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all " + pad + (full ? " w-full" : "")}
      style={{ ...map[kind], opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
    </button>
  );
}

function Bar({ value, hue = C.accent, h = 8 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: h, background: "#000" }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: Math.max(0, Math.min(100, value)) + "%", background: hue }} />
    </div>
  );
}

function Question({ data, chosen, onChoose, reveal }) {
  const answered = chosen != null;
  return (
    <div>
      <p className="text-[15px] sm:text-base font-semibold mb-4 leading-snug" style={{ color: C.text }}>{data.q}</p>
      <div className="space-y-2.5">
        {data.o.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === data.a;
          let bg = C.card2, bd = C.line, fg = C.text, mark = null;
          if (reveal && answered) {
            if (isCorrect) { bg = "rgba(127,174,122,0.16)"; bd = C.good; mark = <CheckCircle2 size={18} style={{ color: C.good }} />; }
            else if (isChosen) { bg = "rgba(207,116,104,0.14)"; bd = C.bad; mark = <XCircle size={18} style={{ color: C.bad }} />; }
            else { fg = C.mut; }
          } else if (isChosen) { bg = "rgba(223,138,95,0.16)"; bd = C.accent; }
          return (
            <button
              key={i}
              onClick={() => { if (!(reveal && answered)) onChoose(i); }}
              disabled={reveal && answered}
              className="w-full text-left rounded-xl px-4 py-3 flex items-start gap-3 transition-all"
              style={{ background: bg, border: "1.5px solid " + bd, cursor: reveal && answered ? "default" : "pointer" }}
            >
              <span className="mt-0.5 text-[13px] font-bold flex-shrink-0 w-5" style={{ color: bd === C.line ? C.dim : bd }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[14px] leading-snug flex-1" style={{ color: fg }}>{opt}</span>
              {mark}
            </button>
          );
        })}
      </div>
      {reveal && answered && (
        <div className="mt-4 rounded-xl p-4" style={{ background: C.card2, border: "1px solid " + C.line }}>
          <p className="text-[13px] font-bold mb-1" style={{ color: chosen === data.a ? C.good : C.bad }}>
            {chosen === data.a ? "Correct" : "Not quite"}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: C.mut }}>{data.why}</p>
        </div>
      )}
    </div>
  );
}

function SortBlock({ data, response, setResponse }) {
  const assign = (response && response.assign) || {};
  const checked = (response && response.checked) || false;
  const allAssigned = data.items.every((_, i) => assign[i] != null);
  const catLabel = (id) => { const c = data.cats.find((x) => x.id === id); return c ? c.label : ""; };
  function pick(i, catId) { if (checked) return; setResponse({ assign: { ...assign, [i]: catId }, checked: false }); }
  const numCorrect = data.items.filter((it, i) => assign[i] === it.c).length;
  return (
    <div>
      <p className="text-[15px] sm:text-base font-semibold mb-4 leading-snug" style={{ color: C.text }}>{data.q}</p>
      <div className="space-y-2.5">
        {data.items.map((it, i) => {
          const ok = assign[i] === it.c;
          let bd = C.line;
          if (checked) bd = ok ? C.good : C.bad;
          return (
            <div key={i} className="rounded-xl p-3.5" style={{ background: C.card2, border: "1.5px solid " + bd }}>
              <div className="flex items-start gap-2 mb-2.5">
                <span className="text-[14px] leading-snug flex-1" style={{ color: C.text }}>{it.x}</span>
                {checked && (ok
                  ? <CheckCircle2 size={17} style={{ color: C.good, flexShrink: 0 }} />
                  : <XCircle size={17} style={{ color: C.bad, flexShrink: 0 }} />)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.cats.map((cat) => {
                  const sel = assign[i] === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => pick(i, cat.id)}
                      className="px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                      style={{
                        background: sel ? C.accent : "transparent",
                        color: sel ? "#1a120c" : C.mut,
                        border: "1.5px solid " + (sel ? C.accent : C.line),
                        cursor: checked ? "default" : "pointer",
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
              {checked && !ok && (
                <p className="text-[12px] mt-2" style={{ color: C.bad }}>Correct: {catLabel(it.c)}</p>
              )}
            </div>
          );
        })}
      </div>
      {!checked && (
        <div className="mt-4">
          <Btn full disabled={!allAssigned} onClick={() => setResponse({ assign, checked: true })}>
            <ListChecks size={16} /> Check answers
          </Btn>
        </div>
      )}
      {checked && (
        <div className="mt-4 rounded-xl p-4" style={{ background: C.card2, border: "1px solid " + C.line }}>
          <p className="text-[13px] font-bold mb-1" style={{ color: numCorrect === data.items.length ? C.good : C.gold }}>
            {numCorrect} of {data.items.length} correct
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: C.mut }}>{data.why}</p>
        </div>
      )}
    </div>
  );
}

function ReadBlock({ b }) {
  const big = b.kind === "big";
  return (
    <div>
      {b.tag && (
        <span className="inline-block text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md mb-3"
          style={{ background: "rgba(223,138,95,0.14)", color: C.accent }}>
          {b.tag}
        </span>
      )}
      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight" style={{ color: C.text }}>{b.title}</h3>
      <div className="space-y-3">
        {b.body.map((p, i) => (
          <p key={i} className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: C.mut }}>{p}</p>
        ))}
      </div>
      {b.bullets && (
        <ul className="mt-4 space-y-2.5">
          {b.bullets.map((bl, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.accent }} />
              <span className="text-[14px] leading-relaxed" style={{ color: C.text }}>{bl}</span>
            </li>
          ))}
        </ul>
      )}
      {b.note && (
        <div className="mt-5 rounded-xl p-4"
          style={{ background: big ? "rgba(223,138,95,0.10)" : C.card2, border: "1px solid " + (big ? C.accentDeep : C.line) }}>
          <div className="flex items-center gap-2 mb-1.5">
            {big ? <Sparkles size={15} style={{ color: C.accent }} /> : <Quote size={15} style={{ color: C.accent }} />}
            <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color: C.accent }}>{b.note.label}</span>
          </div>
          <p className="text-[14px] leading-relaxed font-medium" style={{ color: C.text }}>{b.note.text}</p>
        </div>
      )}
    </div>
  );
}

/* ============================== CHAPTER PLAYER ============================== */
function ChapterPlayer({ chapter, hue, onExit, onComplete }) {
  const [phase, setPhase] = useState("content");
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState({});
  const [cIdx, setCIdx] = useState(0);
  const [cAns, setCAns] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [idx, phase, cIdx]);

  const total = chapter.blocks.length;
  const checkScore = () => {
    let correct = 0;
    chapter.check.forEach((qq, i) => { if (cAns[i] === qq.a) correct++; });
    return Math.round((correct / chapter.check.length) * 100);
  };

  useEffect(() => {
    if (phase === "results") onComplete(chapter.id, checkScore());
  }, [phase]);

  /* ---- RESULTS ---- */
  if (phase === "results") {
    const sc = checkScore();
    const pass = sc >= 70;
    return (
      <div className="max-w-xl mx-auto px-5 py-10 text-center">
        <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{ background: pass ? "rgba(127,174,122,0.16)" : "rgba(224,177,95,0.14)", border: "1.5px solid " + (pass ? C.good : C.gold) }}>
          {pass ? <Trophy size={40} style={{ color: C.good }} /> : <RotateCcw size={36} style={{ color: C.gold }} />}
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: C.text }}>
          {pass ? "Mastery Check Passed" : "Almost There"}
        </h2>
        <p className="text-sm mb-6" style={{ color: C.mut }}>
          {chapter.title} — you scored {sc}% ({chapter.check.length} questions)
        </p>
        <div className="rounded-2xl p-5 mb-6" style={{ background: C.card, border: "1px solid " + C.line }}>
          <Bar value={sc} hue={pass ? C.good : C.gold} h={12} />
          <p className="text-[13px] mt-3" style={{ color: C.mut }}>
            {pass
              ? "Strong work. This chapter's mastery badge is yours, and the next stage is unlocked."
              : "70% earns the mastery badge. Review the chapter or retake the check — your best score is what counts."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn full kind="soft" onClick={() => { setCIdx(0); setCAns({}); setPhase("check"); }}>
            <RotateCcw size={16} /> Retake check
          </Btn>
          <Btn full onClick={onExit}>
            Back to journey <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    );
  }

  /* ---- CHECK INTRO ---- */
  if (phase === "checkIntro") {
    return (
      <div className="max-w-xl mx-auto px-5 py-12 text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{ background: "rgba(223,138,95,0.14)", border: "1.5px solid " + hue }}>
          <GraduationCap size={32} style={{ color: hue }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Mastery Check</h2>
        <p className="text-sm mb-7 leading-relaxed" style={{ color: C.mut }}>
          You've finished the lessons for <span style={{ color: C.text }}>{chapter.title}</span>.
          Answer {chapter.check.length} questions to lock in what you learned. Score 70% or higher to earn the mastery badge.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn full kind="soft" onClick={() => { setPhase("content"); setIdx(total - 1); }}>
            <ArrowLeft size={16} /> Review lessons
          </Btn>
          <Btn full onClick={() => { setCIdx(0); setCAns({}); setPhase("check"); }}>
            Begin check <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    );
  }

  /* ---- CHECK ---- */
  if (phase === "check") {
    const cq = chapter.check[cIdx];
    const answered = cAns[cIdx] != null;
    return (
      <div className="flex flex-col h-full">
        <div className="px-5 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold tracking-wide" style={{ color: hue }}>
              MASTERY CHECK · {cIdx + 1}/{chapter.check.length}
            </span>
          </div>
          <Bar value={((cIdx + (answered ? 1 : 0)) / chapter.check.length) * 100} hue={hue} h={5} />
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
          <div className="max-w-xl mx-auto">
            <Question data={cq} chosen={cAns[cIdx] != null ? cAns[cIdx] : null} reveal
              onChoose={(i) => setCAns({ ...cAns, [cIdx]: i })} />
          </div>
        </div>
        <div className="px-5 py-4 border-t" style={{ borderColor: C.line }}>
          <div className="max-w-xl mx-auto">
            <Btn full disabled={!answered}
              onClick={() => { if (cIdx < chapter.check.length - 1) setCIdx(cIdx + 1); else setPhase("results"); }}>
              {cIdx < chapter.check.length - 1 ? "Next question" : "See results"} <ArrowRight size={16} />
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  /* ---- CONTENT ---- */
  const block = chapter.blocks[idx];
  const blockResp = resp[idx];
  let satisfied = true;
  if (block.t === "q") satisfied = blockResp != null && blockResp.chosen != null;
  if (block.t === "sort") satisfied = blockResp != null && blockResp.checked;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold tracking-wide" style={{ color: hue }}>
            {chapter.title.toUpperCase()} · {idx + 1}/{total}
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded"
            style={{ background: C.card2, color: C.dim }}>
            {block.t === "q" ? "QUIZ" : block.t === "sort" ? "SORT" : "LESSON"}
          </span>
        </div>
        <Bar value={((idx + 1) / total) * 100} hue={hue} h={5} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-xl mx-auto">
          {block.t === "read" && <ReadBlock b={block} />}
          {block.t === "q" && (
            <Question data={block} reveal
              chosen={blockResp != null && blockResp.chosen != null ? blockResp.chosen : null}
              onChoose={(i) => setResp({ ...resp, [idx]: { chosen: i } })} />
          )}
          {block.t === "sort" && (
            <SortBlock data={block} response={blockResp}
              setResponse={(v) => setResp({ ...resp, [idx]: v })} />
          )}
        </div>
      </div>
      <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: C.line }}>
        <div className="max-w-xl mx-auto w-full flex gap-3">
          <Btn kind="ghost" onClick={() => { if (idx > 0) setIdx(idx - 1); else onExit(); }}>
            <ArrowLeft size={16} /> {idx > 0 ? "Back" : "Exit"}
          </Btn>
          <Btn full disabled={!satisfied}
            onClick={() => { if (idx < total - 1) setIdx(idx + 1); else setPhase("checkIntro"); }}>
            {idx < total - 1 ? "Continue" : "Finish lessons"} <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================== DRILL PLAYER ============================== */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function DrillPlayer({ drill, onExit, onComplete }) {
  const [items] = useState(() => shuffle(drill.items));
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [i]);

  const item = items[i];
  const answered = chosen != null;

  if (done) {
    const pct = Math.round((correct / items.length) * 100);
    const ace = pct === 100;
    return (
      <div className="max-w-lg mx-auto px-5 py-10 text-center">
        <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{ background: drill.hue + "26", border: "1.5px solid " + drill.hue }}>
          {ace ? <Star size={38} style={{ color: drill.hue }} /> : <drill.icon size={36} style={{ color: drill.hue }} />}
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: C.text }}>{pct}%</h2>
        <p className="text-sm mb-6" style={{ color: C.mut }}>
          {correct} of {items.length} correct on {drill.title}
          {ace ? " — flawless run." : pct >= 80 ? " — sharp." : " — keep drilling."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn full kind="soft" onClick={() => { setI(0); setChosen(null); setCorrect(0); setDone(false); }}>
            <RotateCcw size={16} /> Run again
          </Btn>
          <Btn full onClick={onExit}>Back to drills <ArrowRight size={16} /></Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold tracking-wide" style={{ color: drill.hue }}>
            {drill.title.toUpperCase()} · {i + 1}/{items.length}
          </span>
          <span className="text-[12px] font-semibold" style={{ color: C.mut }}>Score {correct}</span>
        </div>
        <Bar value={((i + (answered ? 1 : 0)) / items.length) * 100} hue={drill.hue} h={5} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-xl mx-auto">
          <Question data={item} chosen={chosen} reveal
            onChoose={(idx) => { setChosen(idx); if (idx === item.a) setCorrect((c) => c + 1); }} />
        </div>
      </div>
      <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: C.line }}>
        <div className="max-w-xl mx-auto w-full flex gap-3">
          <Btn kind="ghost" onClick={onExit}><ArrowLeft size={16} /> Exit</Btn>
          <Btn full disabled={!answered}
            onClick={() => {
              if (i < items.length - 1) { setI(i + 1); setChosen(null); }
              else { onComplete(drill.id, Math.round((correct / items.length) * 100)); setDone(true); }
            }}>
            {i < items.length - 1 ? "Next" : "Finish drill"} <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================== EXAM PLAYER ============================== */
function ExamPlayer({ onExit, onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [i, setI] = useState(0);
  const [ans, setAns] = useState({});
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [i, phase]);

  const answeredCount = Object.keys(ans).length;
  const score = () => {
    let c = 0;
    EXAM.forEach((qq, k) => { if (ans[k] === qq.a) c++; });
    return Math.round((c / EXAM.length) * 100);
  };

  if (phase === "intro") {
    return (
      <div className="max-w-xl mx-auto px-5 py-12 text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{ background: "rgba(224,177,95,0.14)", border: "1.5px solid " + C.gold }}>
          <Crown size={32} style={{ color: C.gold }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.text }}>The Founder's Certification Exam</h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: C.mut }}>
          {EXAM.length} questions spanning every stage — the Reboot, Idea, MVP, Launch, and Scale.
          No feedback until you submit. Score 80% or higher to earn the AI-Native Founder certificate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn full kind="soft" onClick={onExit}><ArrowLeft size={16} /> Not yet</Btn>
          <Btn full kind="gold" onClick={() => { setI(0); setAns({}); setPhase("exam"); }}>
            Start exam <ArrowRight size={16} />
          </Btn>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const sc = score();
    const pass = sc >= 80;
    return (
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-7">
              <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ background: pass ? "rgba(224,177,95,0.16)" : "rgba(207,116,104,0.12)", border: "1.5px solid " + (pass ? C.gold : C.bad) }}>
                {pass ? <Crown size={40} style={{ color: C.gold }} /> : <RotateCcw size={36} style={{ color: C.bad }} />}
              </div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: C.text }}>{sc}%</h2>
              <p className="text-sm" style={{ color: C.mut }}>
                {pass ? "Certified — AI-Native Founder" : "Below the 80% certification bar"}
              </p>
            </div>
            {pass && (
              <div className="rounded-2xl p-6 mb-6 text-center"
                style={{ background: "linear-gradient(135deg,rgba(224,177,95,0.14),rgba(223,138,95,0.10))", border: "1.5px solid " + C.gold }}>
                <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.gold }}>CERTIFICATE OF MASTERY</p>
                <p className="text-lg font-bold mb-1" style={{ color: C.text }}>The Founder's Playbook</p>
                <p className="text-[13px]" style={{ color: C.mut }}>
                  Building an AI-Native Startup — completed with distinction.
                </p>
              </div>
            )}
            <p className="text-[12px] font-bold tracking-wide mb-3" style={{ color: C.mut }}>REVIEW ALL ANSWERS</p>
            <div className="space-y-3">
              {EXAM.map((qq, k) => {
                const right = ans[k] === qq.a;
                return (
                  <div key={k} className="rounded-xl p-4" style={{ background: C.card, border: "1px solid " + (right ? C.line : C.bad) }}>
                    <div className="flex items-start gap-2 mb-2">
                      {right ? <CheckCircle2 size={16} style={{ color: C.good, flexShrink: 0, marginTop: 2 }} />
                             : <XCircle size={16} style={{ color: C.bad, flexShrink: 0, marginTop: 2 }} />}
                      <p className="text-[13px] font-semibold flex-1" style={{ color: C.text }}>{k + 1}. {qq.q}</p>
                    </div>
                    {!right && (
                      <p className="text-[12px] mb-1" style={{ color: C.bad }}>
                        Your answer: {ans[k] != null ? qq.o[ans[k]] : "(skipped)"}
                      </p>
                    )}
                    <p className="text-[12px] mb-1" style={{ color: C.good }}>Correct: {qq.o[qq.a]}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: C.mut }}>{qq.why}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: C.line }}>
          <div className="max-w-xl mx-auto w-full flex gap-3">
            <Btn full kind="soft" onClick={() => { setI(0); setAns({}); setPhase("exam"); }}>
              <RotateCcw size={16} /> Retake
            </Btn>
            <Btn full onClick={onExit}>Done <ArrowRight size={16} /></Btn>
          </div>
        </div>
      </div>
    );
  }

  /* exam in progress */
  const eq = EXAM[i];
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold tracking-wide" style={{ color: C.gold }}>
            CERTIFICATION · {i + 1}/{EXAM.length}
          </span>
          <span className="text-[12px] font-semibold" style={{ color: C.mut }}>{answeredCount} answered</span>
        </div>
        <Bar value={((i + 1) / EXAM.length) * 100} hue={C.gold} h={5} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-xl mx-auto">
          <Question data={eq} chosen={ans[i] != null ? ans[i] : null} reveal={false}
            onChoose={(idx) => setAns({ ...ans, [i]: idx })} />
        </div>
      </div>
      <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: C.line }}>
        <div className="max-w-xl mx-auto w-full flex gap-3">
          <Btn kind="ghost" onClick={() => { if (i > 0) setI(i - 1); }} disabled={i === 0}>
            <ArrowLeft size={16} /> Prev
          </Btn>
          {i < EXAM.length - 1 ? (
            <Btn full onClick={() => setI(i + 1)}>Next <ArrowRight size={16} /></Btn>
          ) : (
            <Btn full kind="gold"
              onClick={() => { onComplete(score()); setPhase("results"); }}>
              Submit exam <CheckCircle2 size={16} />
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== FIELD GUIDE ============================== */
function FieldGuide({ onExit }) {
  const [tab, setTab] = useState("stages");
  const tabs = [
    { id: "stages", label: "Stages" },
    { id: "surfaces", label: "Surfaces" },
    { id: "principles", label: "Principles" },
    { id: "stories", label: "In the wild" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: C.line }}>
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-3.5 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all"
              style={{
                background: tab === t.id ? C.accent : C.card2,
                color: tab === t.id ? "#1a120c" : C.mut,
                border: "1px solid " + (tab === t.id ? C.accent : C.line),
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-xl mx-auto space-y-4">
          {tab === "stages" && GUIDE.stages.map((s, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: C.card, border: "1px solid " + C.line, borderLeft: "3px solid " + s.hue }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: s.hue }}>{s.name} Stage</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-bold tracking-wide mb-0.5" style={{ color: C.dim }}>GOAL</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{s.goal}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wide mb-0.5" style={{ color: C.dim }}>EXIT CRITERIA</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{s.exit}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wide mb-0.5" style={{ color: C.dim }}>FAILURE MODES</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: C.mut }}>{s.traps}</p>
                </div>
              </div>
            </div>
          ))}
          {tab === "surfaces" && (
            <>
              <p className="text-[13px] leading-relaxed mb-1" style={{ color: C.mut }}>
                All three share the same Claude underneath — what changes is the workspace around it.
              </p>
              {GUIDE.surfaces.map((s, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: C.card, border: "1px solid " + C.line }}>
                  <h3 className="text-base font-bold mb-2" style={{ color: C.accent }}>{s.name}</h3>
                  <p className="text-[13px] mb-1" style={{ color: C.text }}><span style={{ color: C.dim }}>Use it when: </span>{s.use}</p>
                  <p className="text-[13px]" style={{ color: C.text }}><span style={{ color: C.dim }}>Why: </span>{s.why}</p>
                </div>
              ))}
            </>
          )}
          {tab === "principles" && GUIDE.principles.map((p, i) => (
            <div key={i} className="rounded-xl p-4 flex gap-3" style={{ background: C.card, border: "1px solid " + C.line }}>
              <Sparkles size={16} style={{ color: C.accent, flexShrink: 0, marginTop: 2 }} />
              <p className="text-[14px] leading-relaxed font-medium" style={{ color: C.text }}>{p}</p>
            </div>
          ))}
          {tab === "stories" && (
            <>
              <p className="text-[13px] leading-relaxed mb-1" style={{ color: C.mut }}>
                Real AI-native companies building on Claude across the four stages.
              </p>
              {GUIDE.stories.map((s, i) => (
                <div key={i} className="rounded-xl p-4 flex gap-3" style={{ background: C.card, border: "1px solid " + C.line }}>
                  <Rocket size={16} style={{ color: C.accent, flexShrink: 0, marginTop: 2 }} />
                  <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{s}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="px-5 py-4 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-xl mx-auto">
          <Btn full kind="soft" onClick={onExit}><ArrowLeft size={16} /> Back to home</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================== HOME ============================== */
function Home({ progress, xp, onChapter, onDrill, onExam, onGuide }) {
  const lvl = levelFor(xp);
  const nextLvl = LEVELS[lvl + 1];
  const lvlFloor = LEVELS[lvl].min;
  const lvlPct = nextLvl ? ((xp - lvlFloor) / (nextLvl.min - lvlFloor)) * 100 : 100;
  const chaptersDone = CURRICULUM.filter((c) => progress.chapters[c.id] && progress.chapters[c.id].done).length;
  const examUnlocked = chaptersDone === CURRICULUM.length;
  const isUnlocked = (i) => i === 0 || (progress.chapters[CURRICULUM[i - 1].id] && progress.chapters[CURRICULUM[i - 1].id].done);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-xl mx-auto px-5 py-6">
        {/* hero */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-widest" style={{ color: C.accent }}>INTERACTIVE MASTERCLASS</span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1.5 leading-tight" style={{ color: C.text }}>
            The Founder's Playbook
          </h1>
          <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: C.mut }}>
            Building an AI-native startup — from idea to exit. Work through all four stages and you'll think like a 2026 founder.
          </p>
        </div>

        {/* level card */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ background: "linear-gradient(135deg," + C.card + "," + C.card2 + ")", border: "1px solid " + C.line }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(223,138,95,0.16)", border: "1px solid " + C.accentDeep }}>
                <Crown size={20} style={{ color: C.gold }} />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wide" style={{ color: C.dim }}>LEVEL {lvl + 1}</p>
                <p className="text-[15px] font-bold" style={{ color: C.text }}>{LEVELS[lvl].title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: C.accent }}>{xp}</p>
              <p className="text-[10px] font-semibold" style={{ color: C.dim }}>XP / {MAX_XP}</p>
            </div>
          </div>
          <Bar value={lvlPct} hue={C.gold} h={8} />
          <p className="text-[11px] mt-2" style={{ color: C.dim }}>
            {nextLvl ? (nextLvl.min - xp) + " XP to " + nextLvl.title : "Top rank reached — true AI-native mastery."}
          </p>
        </div>

        {/* journey */}
        <p className="text-[12px] font-bold tracking-wide mb-3" style={{ color: C.mut }}>THE JOURNEY · {chaptersDone}/{CURRICULUM.length} CHAPTERS</p>
        <div className="space-y-3 mb-7">
          {CURRICULUM.map((ch, i) => {
            const cp = progress.chapters[ch.id];
            const done = cp && cp.done;
            const unlocked = isUnlocked(i);
            const hue = CH_HUE[i];
            const Icon = ch.icon;
            return (
              <button key={ch.id} disabled={!unlocked} onClick={() => onChapter(ch)}
                className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all"
                style={{
                  background: C.card,
                  border: "1px solid " + (done ? hue : C.line),
                  opacity: unlocked ? 1 : 0.5,
                  cursor: unlocked ? "pointer" : "not-allowed",
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: unlocked ? hue + "22" : C.card2, border: "1px solid " + (unlocked ? hue : C.line) }}>
                  {unlocked ? <Icon size={24} style={{ color: hue }} /> : <Lock size={20} style={{ color: C.dim }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-bold" style={{ color: C.text }}>{ch.title}</p>
                    {done && cp.check >= 70 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: hue + "26", color: hue }}>
                        BADGE
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] truncate" style={{ color: C.mut }}>{ch.sub}</p>
                  {done && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1"><Bar value={cp.check} hue={hue} h={4} /></div>
                      <span className="text-[10px] font-bold" style={{ color: C.dim }}>{cp.check}%</span>
                    </div>
                  )}
                  {!done && unlocked && (
                    <p className="text-[11px] mt-1 font-semibold" style={{ color: hue }}>Start chapter</p>
                  )}
                  {!unlocked && (
                    <p className="text-[11px] mt-1" style={{ color: C.dim }}>Finish {CURRICULUM[i - 1].title} to unlock</p>
                  )}
                </div>
                {unlocked && <ChevronRight size={20} style={{ color: C.dim }} />}
              </button>
            );
          })}
        </div>

        {/* drills */}
        <p className="text-[12px] font-bold tracking-wide mb-3" style={{ color: C.mut }}>SKILL DRILLS · ENDLESS PRACTICE</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
          {DRILLS.map((d) => {
            const best = progress.drills[d.id] || 0;
            const Icon = d.icon;
            return (
              <button key={d.id} onClick={() => onDrill(d)}
                className="text-left rounded-2xl p-4 transition-all"
                style={{ background: C.card, border: "1px solid " + C.line }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: d.hue + "22", border: "1px solid " + d.hue }}>
                    <Icon size={18} style={{ color: d.hue }} />
                  </div>
                  <p className="text-[14px] font-bold flex-1" style={{ color: C.text }}>{d.title}</p>
                </div>
                <p className="text-[12px] leading-snug mb-2" style={{ color: C.mut }}>{d.blurb}</p>
                <p className="text-[11px] font-semibold" style={{ color: best > 0 ? d.hue : C.dim }}>
                  {best > 0 ? "Best: " + best + "%" : "Not attempted"}
                </p>
              </button>
            );
          })}
        </div>

        {/* exam + guide */}
        <p className="text-[12px] font-bold tracking-wide mb-3" style={{ color: C.mut }}>CERTIFICATION & REFERENCE</p>
        <div className="space-y-3 mb-8">
          <button onClick={examUnlocked ? onExam : undefined} disabled={!examUnlocked}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all"
            style={{
              background: examUnlocked ? "linear-gradient(135deg,rgba(224,177,95,0.12),rgba(223,138,95,0.08))" : C.card,
              border: "1px solid " + (examUnlocked ? C.gold : C.line),
              opacity: examUnlocked ? 1 : 0.55,
              cursor: examUnlocked ? "pointer" : "not-allowed",
            }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: examUnlocked ? "rgba(224,177,95,0.18)" : C.card2, border: "1px solid " + (examUnlocked ? C.gold : C.line) }}>
              {examUnlocked ? <Crown size={24} style={{ color: C.gold }} /> : <Lock size={20} style={{ color: C.dim }} />}
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold" style={{ color: C.text }}>The Certification Exam</p>
              <p className="text-[12px]" style={{ color: C.mut }}>
                {examUnlocked
                  ? (progress.exam > 0 ? "Best score: " + progress.exam + "% — retake to improve" : "24 questions · 80% to certify")
                  : "Complete all four stages to unlock"}
              </p>
            </div>
            {examUnlocked && <ChevronRight size={20} style={{ color: C.dim }} />}
          </button>
          <button onClick={onGuide}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-4"
            style={{ background: C.card, border: "1px solid " + C.line, cursor: "pointer" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: C.card2, border: "1px solid " + C.line }}>
              <BookOpen size={22} style={{ color: C.accent }} />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold" style={{ color: C.text }}>The Field Guide</p>
              <p className="text-[12px]" style={{ color: C.mut }}>Quick reference — stages, surfaces, principles, founder stories</p>
            </div>
            <ChevronRight size={20} style={{ color: C.dim }} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== APP ============================== */
export default function App() {
  const [progress, setProgress] = useState(blankProgress());
  const [view, setView] = useState("home");
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeDrill, setActiveDrill] = useState(null);
  const loaded = useRef(false);

  useEffect(() => {
    (async () => {
      const p = await loadProgress();
      if (p) setProgress({ chapters: p.chapters || {}, drills: p.drills || {}, exam: p.exam || 0 });
      loaded.current = true;
    })();
  }, []);
  useEffect(() => { if (loaded.current) saveProgress(progress); }, [progress]);

  const xp = computeXP(progress);

  function completeChapter(id, score) {
    setProgress((p) => {
      const prev = p.chapters[id] || { done: false, check: 0 };
      return { ...p, chapters: { ...p.chapters, [id]: { done: true, check: Math.max(prev.check, score) } } };
    });
  }
  function completeDrill(id, score) {
    setProgress((p) => ({ ...p, drills: { ...p.drills, [id]: Math.max(p.drills[id] || 0, score) } }));
  }
  function completeExam(score) {
    setProgress((p) => ({ ...p, exam: Math.max(p.exam || 0, score) }));
  }

  const chIndex = activeChapter ? CURRICULUM.findIndex((c) => c.id === activeChapter.id) : 0;

  return (
    <div className="w-full flex flex-col" style={{ background: C.bg, height: "100vh", fontFamily: "ui-sans-serif,system-ui,-apple-system,sans-serif" }}>
      <style>{`
        *::-webkit-scrollbar{width:7px;height:7px}
        *::-webkit-scrollbar-thumb{background:${C.line};border-radius:4px}
        *::-webkit-scrollbar-track{background:transparent}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .35s ease both}
      `}</style>

      {/* top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0" style={{ borderColor: C.line }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.accent }}>
            <Compass size={16} style={{ color: "#1a120c" }} />
          </div>
          <span className="text-[14px] font-bold" style={{ color: C.text }}>Founder's Playbook</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: C.card2, border: "1px solid " + C.line }}>
          <Zap size={13} style={{ color: C.gold }} />
          <span className="text-[12px] font-bold" style={{ color: C.text }}>{xp}</span>
          <span className="text-[11px]" style={{ color: C.dim }}>· Lv {levelFor(xp) + 1}</span>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 min-h-0 fade-up" key={view + (activeChapter ? activeChapter.id : "") + (activeDrill ? activeDrill.id : "")}>
        {view === "home" && (
          <Home
            progress={progress} xp={xp}
            onChapter={(ch) => { setActiveChapter(ch); setView("chapter"); }}
            onDrill={(d) => { setActiveDrill(d); setView("drill"); }}
            onExam={() => setView("exam")}
            onGuide={() => setView("guide")}
          />
        )}
        {view === "chapter" && activeChapter && (
          <ChapterPlayer
            chapter={activeChapter} hue={CH_HUE[chIndex]}
            onExit={() => setView("home")}
            onComplete={completeChapter}
          />
        )}
        {view === "drill" && activeDrill && (
          <DrillPlayer drill={activeDrill} onExit={() => setView("home")} onComplete={completeDrill} />
        )}
        {view === "exam" && (
          <ExamPlayer onExit={() => setView("home")} onComplete={completeExam} />
        )}
        {view === "guide" && <FieldGuide onExit={() => setView("home")} />}
      </div>
    </div>
  );
}
