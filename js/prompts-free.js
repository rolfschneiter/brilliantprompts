const FREE_PROMPTS = [

    // =========================================================================
    // CODING & DEV (4 prompts)
    // =========================================================================

    {
        title: "Code Review Expert",
        category: "Coding & Dev",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a senior software engineer with 15+ years of experience conducting code reviews at top-tier tech companies. Your task is to perform a thorough code review of the following [language] code.

Analyze the code across these dimensions, rating each 1-5:

1. **Correctness**: Identify bugs, logic errors, off-by-one errors, null pointer risks, and race conditions.
2. **Performance**: Flag O(n^2) or worse algorithms, unnecessary allocations, N+1 queries, and memory leaks.
3. **Security**: Check for injection vulnerabilities, improper input validation, hardcoded secrets, and insecure defaults.
4. **Readability**: Evaluate naming conventions, code organization, comment quality, and adherence to [language] idioms.
5. **Maintainability**: Assess modularity, DRY violations, test coverage gaps, and coupling issues.

For each issue found:
- Classify severity as CRITICAL / WARNING / SUGGESTION
- Quote the exact line(s) of code
- Explain WHY it is a problem (not just WHAT)
- Provide a corrected code snippet

End with an overall summary table and the top 3 priority fixes.

Code to review:
\`\`\`[language]
[paste your code here]
\`\`\``,
        description: "Get a comprehensive code review that catches bugs, security vulnerabilities, and performance issues before they reach production. This prompt mimics the rigor of a senior engineer's review at a FAANG company.",
        example: "CRITICAL [Line 23]: SQL query uses string concatenation instead of parameterized queries, creating an SQL injection vulnerability. Fix: Use prepared statements with bound parameters...",
        tips: "Include the full file context, not just a snippet. Mention the framework and runtime version for more specific feedback.",
        tags: ["code-review", "debugging", "security", "best-practices", "software-engineering"]
    },

    {
        title: "API Endpoint Designer",
        category: "Coding & Dev",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a backend architect specializing in RESTful API design. Design a complete set of API endpoints for a [describe your feature or resource] in a [type of application].

Follow these design principles:
- RESTful resource naming conventions (plural nouns, no verbs in URLs)
- Proper HTTP method semantics (GET, POST, PUT, PATCH, DELETE)
- Consistent error response format with appropriate HTTP status codes
- Pagination, filtering, and sorting for list endpoints
- Versioning strategy

For each endpoint, provide:

| Field | Detail |
|-------|--------|
| Method | HTTP method |
| Path | Full URL path |
| Description | What it does |
| Auth | Required role/permission |
| Request Body | JSON schema with types and validation rules |
| Query Params | Available filters, sort, pagination |
| Success Response | Status code + example JSON |
| Error Responses | All possible error codes + messages |

After the endpoint table, provide:
1. A rate limiting strategy for these endpoints
2. Suggested middleware chain (auth, validation, logging)
3. Database indexes needed to support the query patterns
4. Example cURL commands for the 3 most common operations

Technology stack: [your stack, e.g., Node.js/Express, Python/FastAPI]`,
        description: "Design production-ready RESTful API endpoints with complete documentation, error handling, and security considerations. Perfect for planning a new feature or microservice before writing code.",
        example: "GET /api/v1/products?category=electronics&sort=-price&page=2&limit=20 -- Returns paginated product list filtered by category, sorted by price descending. Response includes Link headers for pagination...",
        tips: "Be specific about your data model and business rules. Mention any existing API patterns in your project for consistency.",
        tags: ["api-design", "rest", "backend", "documentation", "architecture"]
    },

    {
        title: "Debug Detective",
        category: "Coding & Dev",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Advanced",
        prompt: `You are a debugging specialist who uses systematic root-cause analysis to solve software issues. I need help debugging the following problem in my [language/framework] application.

**Symptom**: [describe what is happening]
**Expected behavior**: [describe what should happen]
**Environment**: [OS, runtime version, relevant dependencies]
**When it started**: [after a deploy, library update, config change, etc.]

Apply this systematic debugging methodology:

### Step 1: Reproduce & Isolate
- List the minimum steps to reproduce
- Identify which component/layer is most likely responsible
- Suggest how to isolate the failing component

### Step 2: Hypothesis Generation
- Generate 3-5 ranked hypotheses for the root cause (most likely first)
- For each hypothesis, explain the reasoning and what evidence would confirm or refute it

### Step 3: Diagnostic Plan
- For each hypothesis, provide specific diagnostic steps:
  - Exact log statements or breakpoints to add
  - Commands to run (with expected vs. actual output)
  - Configuration checks to perform

### Step 4: Fix & Verify
- Once we identify the cause, provide:
  - The minimal fix with code
  - A regression test to prevent recurrence
  - Related areas that might have the same issue

Here is the relevant code and error output:
\`\`\`
[paste code, stack traces, logs here]
\`\`\`

Start with Step 1. Ask me clarifying questions if critical information is missing.`,
        description: "Apply a systematic, scientific debugging methodology to track down elusive bugs. This prompt guides the AI through hypothesis-driven debugging rather than random trial-and-error.",
        example: "Hypothesis 1 (High Confidence): The race condition occurs because the WebSocket handler and the HTTP handler both write to the shared session map without a mutex. Evidence: The crash happens only under concurrent load...",
        tips: "Include the full stack trace and relevant log output. Mentioning what you have already tried saves time and avoids repeated suggestions.",
        tags: ["debugging", "troubleshooting", "root-cause-analysis", "systematic-thinking", "problem-solving"]
    },

    {
        title: "Git Commit Message Writer",
        category: "Coding & Dev",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are an expert at writing clear, informative Git commit messages following the Conventional Commits specification and best practices from high-quality open source projects.

Given the following code diff or description of changes, write a commit message that follows this exact format:

\`\`\`
<type>(<scope>): <subject line — imperative mood, max 72 chars>

<body — wrap at 72 chars, explain WHAT and WHY, not HOW>

<footer — breaking changes, issue references>
\`\`\`

Rules:
- **type**: feat | fix | refactor | perf | test | docs | style | chore | ci | build
- **scope**: the module, component, or area affected
- **subject**: imperative mood ("add" not "added"), lowercase, no period
- Use the body to explain the motivation and contrast with previous behavior
- Reference related issues with "Closes #123" or "Relates to #456"
- If there are BREAKING CHANGES, add a "BREAKING CHANGE:" footer

Generate 3 options:
1. **Concise** — minimal but complete (subject line only if appropriate)
2. **Standard** — subject + body
3. **Detailed** — subject + body + footer with full context

Changes to describe:
[paste your git diff or describe your changes here]`,
        description: "Generate professional, Conventional Commits-compliant Git messages from your diffs or change descriptions. Choose from concise, standard, or detailed formats depending on the significance of the change.",
        example: "feat(auth): add OAuth2 PKCE flow for mobile clients\n\nReplace implicit grant with PKCE authorization code flow to comply with OAuth 2.1 security requirements. Mobile clients now use code_verifier/code_challenge instead of exposing tokens in redirect URLs.\n\nCloses #847",
        tips: "Paste the actual git diff output for the most accurate messages. Mention the ticket or issue number if you have one.",
        tags: ["git", "commit-messages", "conventions", "version-control", "workflow"]
    },

    // =========================================================================
    // BUSINESS & STRATEGY (4 prompts)
    // =========================================================================

    {
        title: "SWOT Analysis Generator",
        category: "Business & Strategy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a strategic management consultant with expertise in competitive analysis frameworks. Conduct a comprehensive SWOT analysis for [company/product/project name] operating in the [industry/market].

Context:
- **What we do**: [brief description of the business/product]
- **Target market**: [who your customers are]
- **Stage**: [startup / growth / mature / pivot]
- **Key concern**: [the strategic question driving this analysis]

Perform the analysis as follows:

### For each SWOT quadrant, provide exactly 5-7 items:

**Strengths (Internal, Positive)**
- Focus on: core competencies, proprietary assets, team expertise, financial position, brand equity
- Rate each strength's defensibility: Easily Copied / Moderate Moat / Strong Moat

**Weaknesses (Internal, Negative)**
- Focus on: resource gaps, skill deficiencies, operational bottlenecks, financial constraints
- Rate each weakness's urgency: Monitor / Address Soon / Critical

**Opportunities (External, Positive)**
- Focus on: market trends, regulatory changes, technology shifts, unserved segments, partnership potential
- Rate each opportunity's time horizon: Immediate (<6mo) / Medium (6-18mo) / Long-term (18mo+)

**Threats (External, Negative)**
- Focus on: competitor moves, market disruption, regulatory risk, economic factors, supply chain risks
- Rate each threat's probability: Low / Medium / High

### Then provide:
1. **TOWS Matrix**: Cross-reference strengths with opportunities (SO strategies), weaknesses with threats (WT strategies), etc. — generate 2 strategies per combination
2. **Top 3 Strategic Priorities**: Based on the analysis, what should leadership focus on in the next quarter?
3. **Key Assumptions**: List assumptions that, if wrong, would invalidate this analysis`,
        description: "Generate a rigorous SWOT analysis that goes beyond surface-level bullet points. Includes defensibility ratings, urgency scores, a TOWS matrix for actionable strategies, and assumption testing.",
        example: "Strength: Proprietary NLP model trained on 5 years of industry-specific data (Strong Moat). SO Strategy: Leverage proprietary NLP + growing demand for automation to launch an API product for mid-market companies within 6 months...",
        tips: "Be brutally honest about weaknesses; the analysis is only valuable if it reflects reality. Include specific competitor names for sharper threat analysis.",
        tags: ["swot", "strategic-planning", "competitive-analysis", "business-strategy", "frameworks"]
    },

    {
        title: "Business Model Canvas",
        category: "Business & Strategy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a business strategist who has helped launch 100+ ventures using the Business Model Canvas framework by Alexander Osterwalder. Fill out a complete Business Model Canvas for [business/product idea].

Background information:
- **The idea**: [describe your product or service]
- **Target customer**: [who you plan to serve]
- **Stage**: [idea / validation / launched / scaling]
- **Revenue goal**: [target revenue or business model type]

Complete each of the 9 building blocks with specific, actionable detail (not generic platitudes):

1. **Customer Segments**: Define 2-3 distinct segments with demographics, psychographics, and jobs-to-be-done. Identify your beachhead segment.

2. **Value Propositions**: For each segment, state the specific pain relieved or gain created. Use the format: "We help [segment] to [outcome] by [mechanism], unlike [alternative] which [limitation]."

3. **Channels**: Map the full customer journey (Awareness > Evaluation > Purchase > Delivery > After-sales) with specific channel for each phase.

4. **Customer Relationships**: Define the relationship type (self-service, personal, automated, community) and the acquisition/retention/upsell strategy for each segment.

5. **Revenue Streams**: Specify pricing model, price points, payment frequency, and expected revenue per segment. Include willingness-to-pay reasoning.

6. **Key Resources**: List the must-have assets (IP, people, technology, capital) and whether you build, buy, or partner for each.

7. **Key Activities**: Identify the 3-5 critical activities that make or break the business model.

8. **Key Partnerships**: Name specific types of partners and what you get from each (supply, risk reduction, scale, knowledge).

9. **Cost Structure**: Break down fixed vs. variable costs, identify the biggest cost driver, and calculate rough unit economics.

### Finish with:
- **Riskiest Assumption**: The single hypothesis that, if wrong, kills the model
- **First Experiment**: A <2 week test to validate that assumption
- **Key Metric**: The one number that indicates product-market fit`,
        description: "Fill out a complete, actionable Business Model Canvas that goes far beyond generic templates. Includes unit economics, risk identification, and a concrete validation experiment.",
        example: "Value Proposition for Segment 1 (Freelance designers): We help freelance designers win 40% more client proposals by auto-generating tailored case study presentations, unlike Canva which requires manual layout for every pitch...",
        tips: "The more specific your background information, the more tailored the canvas. Include pricing research or customer interview insights if available.",
        tags: ["business-model", "canvas", "startup", "strategy", "lean-startup", "entrepreneurship"]
    },

    {
        title: "Competitive Analysis Brief",
        category: "Business & Strategy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Advanced",
        prompt: `You are a competitive intelligence analyst. Produce a concise but thorough competitive analysis brief for [your company/product] against [list 2-4 competitor names].

Industry: [your industry]
Your positioning: [how you currently position yourself]
Key battleground: [the main area where you compete, e.g., pricing, features, brand]

Structure the brief as follows:

### 1. Competitor Profiles (for each competitor)
- **Positioning statement** (one sentence: who they serve + how + why different)
- **Estimated size**: revenue range, employee count, funding stage
- **Core product strengths** (top 3)
- **Known weaknesses** (top 3, cite sources where possible)
- **Recent moves** (last 6 months: launches, pivots, partnerships, hires)
- **Pricing model & entry price**

### 2. Feature Comparison Matrix
Create a comparison table across these dimensions (rate: Leading / Competitive / Behind / Absent):
[list 6-8 features or capabilities that matter to your buyers]

### 3. Positioning Map
Describe a 2D positioning map with axes that matter most to your buyers:
- X-axis: [e.g., price: low to high]
- Y-axis: [e.g., ease of use vs. power/flexibility]
Place each competitor and your product on this map with a brief rationale.

### 4. Win/Loss Analysis Framework
Based on the comparison, identify:
- **Where we win**: scenarios and buyer profiles where we have an advantage
- **Where we lose**: scenarios where competitors are stronger
- **Switchable customers**: competitor customers most likely to switch to us and why

### 5. Strategic Recommendations
Provide 3 specific, actionable recommendations to improve competitive position in the next 90 days.`,
        description: "Generate a structured competitive intelligence brief that your sales and product teams can actually use. Covers positioning, feature comparison, win/loss scenarios, and actionable recommendations.",
        example: "Where we win: Mid-market SaaS companies with 50-200 employees who need quick setup. Our 15-minute onboarding vs. Competitor A's 2-week implementation gives us a decisive advantage in fast-moving evaluation cycles...",
        tips: "Provide links to competitor websites or recent press releases for more accurate analysis. Specify which features matter most to your buyers for a relevant comparison matrix.",
        tags: ["competitive-analysis", "market-intelligence", "strategy", "positioning", "sales-enablement"]
    },

    {
        title: "Elevator Pitch Creator",
        category: "Business & Strategy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a pitch coach who has prepared founders for Y Combinator, Shark Tank, and Series A fundraising rounds. Craft a compelling elevator pitch for [your product/company].

Input details:
- **What it does**: [describe the product/service in plain language]
- **Who it's for**: [target customer]
- **The problem**: [what pain point or inefficiency exists today]
- **What makes it different**: [your unique advantage or insight]
- **Traction/proof**: [any metrics, customers, or milestones — or "pre-launch"]
- **Audience for this pitch**: [investor / customer / partner / hiring candidate]

Generate 4 versions optimized for different contexts:

### Version 1: The 30-Second Pitch (spoken, ~75 words)
Use the format: Problem hook > Solution > Unique insight > Proof > Ask
Must be conversational and memorable. No jargon.

### Version 2: The One-Liner (10-15 words)
"We do [X] for [Y] by [Z]" — but make it vivid and specific.

### Version 3: The Email Intro (3 sentences)
For a warm introduction email. First sentence = hook, second = credibility, third = ask.

### Version 4: The Investor Narrative (60 seconds, ~150 words)
Include: market size insight, timing argument ("why now"), business model hint, and a clear ask.

For each version, also provide:
- **Opening hook options** (3 alternatives for the first sentence)
- **Common objection** this audience will have and a one-line rebuttal`,
        description: "Create four pitch versions optimized for different contexts: a quick spoken pitch, a one-liner, an email intro, and an investor narrative. Each includes alternative hooks and objection handling.",
        example: "30-Second Pitch: Every week, 40 million freelancers spend 5 hours chasing invoices instead of doing billable work. PayFlow auto-generates, sends, and follows up on invoices using AI trained on payment behavior data...",
        tips: "Be specific about your audience; a pitch to an investor is very different from a pitch to a customer. Include real numbers or traction metrics for maximum credibility.",
        tags: ["pitch", "elevator-pitch", "fundraising", "storytelling", "startup", "communication"]
    },

    // =========================================================================
    // MARKETING & COPY (4 prompts)
    // =========================================================================

    {
        title: "Landing Page Headline Generator",
        category: "Marketing & Copy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a conversion copywriter who has written landing pages generating $50M+ in revenue. Generate high-converting headline and subheadline combinations for a landing page.

Product/Service: [what you are selling]
Target audience: [who you are targeting, be specific]
Primary benefit: [the #1 outcome your customer gets]
Key differentiator: [what makes you different from alternatives]
Tone: [e.g., bold & confident / friendly & approachable / professional & trustworthy]
Current headline (if any): [your existing headline, or "none"]

Generate 10 headline + subheadline combinations using these proven frameworks:

1. **Benefit-First**: Lead with the outcome (e.g., "Get [result] without [pain]")
2. **Problem-Agitate**: Call out the pain (e.g., "Tired of [problem]?")
3. **Social Proof**: Lead with credibility (e.g., "Join [number] [people] who...")
4. **Curiosity Gap**: Create intrigue (e.g., "The [adjective] way to [outcome] that [surprising element]")
5. **Direct Command**: Action-oriented (e.g., "[Verb] your [noun] in [timeframe]")
6. **Question Hook**: Engage with a question they will say yes to
7. **Specificity Play**: Use precise numbers and details
8. **Before/After**: Contrast current state with desired state
9. **Fear of Missing Out**: Urgency or scarcity angle
10. **Contrarian**: Challenge a common belief in the industry

For each combination, provide:
- **Headline** (max 10 words)
- **Subheadline** (max 25 words, supports and expands on the headline)
- **Recommended CTA button text** (2-5 words)
- **Why it works** (one sentence explaining the psychology)

Then rank your top 3 for A/B testing and explain which audience segment each will resonate with most.`,
        description: "Generate 10 landing page headline and subheadline combinations using proven copywriting frameworks. Includes CTA suggestions, psychological explanations, and A/B testing recommendations.",
        example: "Specificity Play: Headline: 'Close 37% More Deals in 14 Days.' Subheadline: 'Our AI sales assistant analyzes your pipeline and writes personalized follow-ups that actually get replies.' CTA: 'Start Closing More'...",
        tips: "Include specific customer language from reviews or support tickets; the best headlines use words your customers already use. Test the top 3 recommendations with real traffic, not team opinions.",
        tags: ["copywriting", "headlines", "landing-page", "conversion", "a-b-testing", "cro"]
    },

    {
        title: "Email Subject Line Optimizer",
        category: "Marketing & Copy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are an email marketing expert who has optimized campaigns with 40%+ open rates. Generate high-performing email subject lines for the following campaign.

Campaign details:
- **Email type**: [newsletter / promotional / onboarding / re-engagement / transactional / cold outreach]
- **Audience**: [describe your subscribers or recipients]
- **Email content summary**: [what the email is about in 1-2 sentences]
- **Desired action**: [what you want the reader to do after opening]
- **Brand voice**: [casual / professional / playful / authoritative]
- **Industry**: [your industry, for context on norms]

Generate 15 subject lines organized into these categories:

**Curiosity (3 lines)**: Create an information gap the reader must close
**Benefit-Driven (3 lines)**: Lead with what the reader gains
**Urgency/Scarcity (3 lines)**: Time pressure or limited availability
**Personal/Conversational (3 lines)**: Feel like a message from a friend
**Pattern Interrupt (3 lines)**: Break expectations, stand out in the inbox

For each subject line, also provide:
- **Preview text** (the first 40-90 chars of email body that shows in inbox)
- **Character count** (aim for 30-50 chars for mobile optimization)
- **Spam risk**: Low / Medium — flag any trigger words

Then identify:
- Your **#1 pick** for highest open rate and why
- Your **#1 pick** for highest click-through rate and why
- One subject line to **avoid** and why it would underperform`,
        description: "Generate 15 email subject lines across five proven psychological frameworks, complete with preview text, character counts, and spam risk assessment. Includes specific recommendations for open rate vs. click-through optimization.",
        example: "Curiosity: 'The onboarding mistake that costs you 23% of new users' (52 chars, Low spam risk). Preview text: 'We analyzed 10,000 signups and found a pattern...'",
        tips: "Mention your current average open rate so the AI can calibrate the aggressiveness of the suggestions. Always A/B test the top 2 picks with at least 1,000 recipients per variant.",
        tags: ["email-marketing", "subject-lines", "open-rate", "copywriting", "engagement"]
    },

    {
        title: "Social Media Post Creator",
        category: "Marketing & Copy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a social media strategist who builds engaged communities for brands. Create platform-optimized social media posts for the following content.

Content to promote: [describe what you want to post about]
Brand voice: [describe your brand personality in 3 adjectives]
Target audience: [who follows you / who you want to reach]
Goal: [awareness / engagement / traffic / conversions / community building]
Key message: [the one thing readers should take away]

Create posts for each platform, respecting platform-specific best practices:

### Twitter/X (max 280 chars)
- Write 3 variations: hook-first, thread-starter, and engagement bait (question)
- Include hashtag suggestions (max 2 relevant hashtags)
- Suggest best posting time for [your audience's timezone]

### LinkedIn
- Write 1 post using the hook > story > insight > CTA framework
- First line must be a scroll-stopping hook (this is the "see more" line)
- Use line breaks for readability, keep under 1,300 characters
- Suggest 3-5 relevant hashtags

### Instagram Caption
- Write 1 caption with a strong opening line, value in the middle, CTA at the end
- Include a mix of broad and niche hashtags (suggest 15-20)
- Suggest carousel slide topics if applicable

### Facebook
- Write 1 post optimized for shares and comments
- Include a conversation-starting question
- Keep under 500 characters for optimal engagement

For ALL platforms, also suggest:
- **Visual concept**: What image or graphic would pair well with this post
- **Best day/time**: When to publish for maximum reach
- **Engagement prompt**: A follow-up comment to post immediately to boost algorithm visibility`,
        description: "Generate platform-optimized social media posts for Twitter/X, LinkedIn, Instagram, and Facebook from a single piece of content. Each post follows platform-specific best practices for maximum engagement.",
        example: "LinkedIn hook: 'I fired our top-performing salesperson last Tuesday. Here is why it was the best decision I made this year.' (continues with story about replacing high-performers who damage culture...)",
        tips: "Share your best-performing past post so the AI can match the tone and format that already works for your audience. Specify your timezone for accurate posting time recommendations.",
        tags: ["social-media", "content-creation", "linkedin", "twitter", "instagram", "engagement"]
    },

    {
        title: "SEO Meta Description Writer",
        category: "Marketing & Copy",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are an SEO specialist and copywriter who optimizes content for both search engines and human click-through. Write SEO meta titles and descriptions for the following page(s).

Page details:
- **Page URL**: [the URL or planned URL]
- **Page type**: [homepage / product page / blog post / category page / landing page]
- **Primary keyword**: [the main keyword you want to rank for]
- **Secondary keywords**: [2-3 additional keywords to include naturally]
- **Page content summary**: [2-3 sentences about what the page contains]
- **Search intent**: [informational / commercial / transactional / navigational]
- **Competitor URLs ranking for this keyword**: [list 1-3 if known, or "unknown"]

For each page, generate:

### Meta Title (3 options)
- Max 60 characters (show character count)
- Include primary keyword, preferably near the beginning
- Include a compelling reason to click (number, year, power word)
- End with brand name if space permits: "| [Brand Name]"

### Meta Description (3 options)
- Max 155 characters (show character count)
- Include primary keyword naturally (Google bolds matching terms)
- Include a clear value proposition and call-to-action
- Create urgency or curiosity without being clickbaity
- Match the search intent (don't promise what the page does not deliver)

### Also provide:
- **Recommended H1**: The on-page heading (can differ from meta title)
- **Schema markup suggestion**: Which structured data type suits this page
- **Rich snippet opportunity**: Can this page qualify for featured snippets, FAQ, or how-to results? If yes, what format should the content take?

Rate each option for:
- **Keyword optimization** (1-5)
- **Click appeal** (1-5)
- **Accuracy to content** (1-5)`,
        description: "Generate SEO-optimized meta titles and descriptions that rank well and earn clicks. Includes character counts, schema markup suggestions, and rich snippet opportunities for maximum SERP visibility.",
        example: "Meta Title Option 1: '10 Best Project Management Tools for Remote Teams (2025)' (56 chars) -- Keyword optimization: 5/5, Click appeal: 4/5. Meta Description: 'Compare the top project management tools...'",
        tips: "Search your target keyword on Google and look at what the top 3 results use in their titles and descriptions. Differentiate rather than copy. Include the current year for evergreen content.",
        tags: ["seo", "meta-descriptions", "search-optimization", "copywriting", "serp", "click-through-rate"]
    },

    // =========================================================================
    // WRITING & CREATIVE (4 prompts)
    // =========================================================================

    {
        title: "Blog Post Outliner",
        category: "Writing & Creative",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are an experienced content strategist who has grown blogs from 0 to 100K+ monthly visitors. Create a detailed blog post outline for the following topic.

Topic: [your blog post topic]
Target keyword: [primary SEO keyword, if applicable]
Target audience: [who will read this — their knowledge level and goals]
Post goal: [educate / persuade / compare / how-to / thought leadership]
Desired length: [word count, e.g., 1,500 / 2,500 / 4,000]
Tone: [conversational / professional / academic / witty]
Unique angle: [what fresh perspective or data do you bring? or "suggest one"]

Create the outline with this structure:

### Working Title (3 options)
- Include the target keyword
- Use a proven title format (how-to, listicle, guide, comparison, question)

### Hook / Introduction (3-4 sentences)
- Open with a surprising statistic, bold claim, or relatable problem
- Establish why this matters NOW
- Preview what the reader will learn or gain

### Body Sections (H2 + H3 structure)
For each major section, provide:
- **H2 heading** (keyword-aware but readable)
- **Key points** to cover (3-5 bullet points)
- **Supporting evidence needed** (stat, example, case study, quote)
- **Transition sentence** to the next section
- Suggested **H3 subheadings** where appropriate

### Conclusion
- Summarize the key takeaway in one sentence
- End with a specific, actionable next step for the reader
- Include a CTA relevant to your business

### SEO & Distribution Notes
- **Internal linking opportunities**: [suggest 2-3 related topics to link to]
- **External link targets**: [authoritative sources to cite]
- **Featured snippet opportunity**: Format one section as a definition, list, or table
- **Social media pull quotes**: Identify 2-3 shareable one-liners from the outline`,
        description: "Generate a comprehensive, SEO-aware blog post outline that a writer can immediately use to draft a high-quality article. Includes title options, section structure, evidence requirements, and distribution notes.",
        example: "H2: Why Most A/B Tests Fail (And What To Do Instead). Key points: 1) Statistical significance misconceptions 2) Sample size calculator walkthrough 3) Real example: how Company X wasted 3 months on invalid tests...",
        tips: "Provide your unique angle or original data upfront; this is what separates a top-ranking post from commodity content. Include competitor post URLs if you want to ensure you cover more ground.",
        tags: ["blog", "content-strategy", "outline", "seo", "writing", "content-marketing"]
    },

    {
        title: "Story Character Developer",
        category: "Writing & Creative",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a character development specialist who has worked with published novelists and screenwriters. Create a deep, multi-dimensional character profile for use in a [genre] story.

Starting point:
- **Character name**: [name or "suggest one"]
- **Role in story**: [protagonist / antagonist / mentor / sidekick / love interest]
- **Genre**: [fantasy / sci-fi / literary fiction / thriller / romance / etc.]
- **Setting**: [time period and world]
- **Core story conflict**: [the main conflict they are involved in]

Build the character profile across these layers:

### Layer 1: Surface (What the world sees)
- Physical description (3-4 distinctive details, not a police report)
- Speech patterns and verbal tics
- Habitual behaviors and mannerisms
- First impression they create
- How they dress and why

### Layer 2: Backstory (What shaped them)
- Defining childhood moment
- The wound that never healed
- The relationship that changed everything
- The lie they believe about themselves
- Skills and knowledge gained from their past

### Layer 3: Psychology (What drives them)
- Core desire (what they want consciously)
- Core need (what they actually need but may not realize)
- Greatest fear (what they avoid at all costs)
- Moral code (what lines will they not cross — and what would make them cross one)
- Defense mechanism under stress

### Layer 4: Relationships
- How they behave with someone they trust
- How they behave with someone they fear
- How they behave with someone they love
- Their relationship to power and authority
- The type of person who is their blind spot

### Layer 5: Arc (How they change)
- Where they start emotionally at the beginning
- The midpoint realization or reversal
- The climactic choice that defines them
- Where they end up and what it cost them

### Bonus:
- 3 scenes that would reveal this character's depth
- A signature line of dialogue that captures their essence
- The song that would play during their pivotal scene`,
        description: "Build a rich, psychologically complex character profile across five layers: surface, backstory, psychology, relationships, and character arc. Ideal for novelists, screenwriters, and game designers.",
        example: "Layer 3 - The Lie: Elena believes that showing vulnerability is what got her mother killed, so she treats emotional openness as a tactical weakness. Her core need is to learn that connection is not a liability...",
        tips: "The most compelling characters have a contradiction between their desire and their need. Give the AI a specific genre and story conflict for a character that fits your narrative.",
        tags: ["creative-writing", "character-development", "fiction", "storytelling", "screenwriting", "worldbuilding"]
    },

    {
        title: "Email Tone Adjuster",
        category: "Writing & Creative",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a professional communication coach who helps people write emails that achieve their goals while maintaining relationships. Rewrite the following email in the specified tone.

Original email:
"""
[paste your email draft here]
"""

Target tone: [choose: professional-formal / friendly-professional / empathetic / assertive / diplomatic / casual / urgent]
Relationship context: [boss / direct report / client / vendor / colleague / cold outreach]
Goal of this email: [what outcome do you want from sending this?]
Sensitivity level: [routine / somewhat delicate / highly sensitive]

Provide the following:

### Rewritten Email
- Maintain the core message and all key information
- Adjust tone through word choice, sentence structure, and framing
- Ensure the desired action is clear

### Tone Analysis (Before vs. After)
Compare the original and rewritten versions on:
| Dimension | Original | Rewritten |
|-----------|----------|-----------|
| Formality (1-5) | | |
| Warmth (1-5) | | |
| Directness (1-5) | | |
| Confidence (1-5) | | |
| Urgency (1-5) | | |

### Key Changes Made
List the 3-5 most impactful changes and explain why each adjustment helps achieve the email's goal.

### Red Flags Removed
If the original email contained phrases that could be misinterpreted, passive-aggressive, or counterproductive, flag them and explain the risk.

### Subject Line
Suggest an optimized subject line that matches the new tone and increases the chance of being opened and acted upon.`,
        description: "Rewrite any email to match your desired tone while preserving the core message. Includes a before/after tone analysis, explanation of key changes, and detection of potentially problematic phrases.",
        example: "Red Flag Removed: 'As I mentioned previously' -- This phrase can read as passive-aggressive, implying the recipient was not paying attention. Replaced with 'Building on our earlier conversation' which frames it as collaboration...",
        tips: "Include the full email thread context if replying, so the AI understands the relationship dynamics. Be honest about the goal: 'I want them to agree without feeling pressured' helps the AI calibrate tone precisely.",
        tags: ["email-writing", "communication", "tone", "professional-writing", "business-communication"]
    },

    {
        title: "Meeting Summary Writer",
        category: "Writing & Creative",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are an executive assistant known for producing clear, actionable meeting summaries that save teams hours of follow-up confusion. Transform the following meeting notes into a structured summary.

Meeting notes (raw):
"""
[paste your rough notes, transcript, or bullet points here]
"""

Meeting context:
- **Meeting type**: [standup / planning / retrospective / client call / 1:1 / all-hands / brainstorm]
- **Attendees**: [list names and roles]
- **Meeting purpose**: [what was this meeting meant to accomplish?]

Generate the summary in this format:

### Meeting Summary: [auto-generated descriptive title]
**Date**: [date] | **Duration**: [if known] | **Attendees**: [names]

### Key Decisions Made
- List every decision as: "[Decision] — Decided by [who], rationale: [why]"
- If no clear decision was made on a discussed topic, flag it as "PENDING DECISION"

### Action Items
| # | Action Item | Owner | Deadline | Priority |
|---|-------------|-------|----------|----------|
| 1 | [specific, measurable task] | [name] | [date] | High/Med/Low |

### Discussion Summary
For each major topic discussed (in order):
- **Topic**: [name]
- **Key points**: 2-3 bullet summary
- **Open questions**: Any unresolved questions raised
- **Parking lot**: Ideas mentioned but deferred

### Risks & Blockers Identified
- List any risks, dependencies, or blockers mentioned with the responsible person

### Next Steps
- When is the next meeting?
- What must happen before then?
- Who needs to be informed but was not in this meeting?

Format the entire summary so it can be pasted directly into Slack, Notion, or email.`,
        description: "Transform messy meeting notes or transcripts into a structured, actionable summary with decisions, action items, and follow-ups. Designed to be immediately shareable with attendees and stakeholders.",
        example: "Action Item #3: Create API rate limiting proposal with cost analysis -- Owner: Sarah Chen -- Deadline: Friday March 14 -- Priority: High. PENDING DECISION: Whether to use token bucket or sliding window algorithm (blocked on Sarah's proposal).",
        tips: "Even rough, incomplete notes work; the AI will infer structure from context. Include attendee names and roles so the AI can correctly assign action items.",
        tags: ["meeting-notes", "productivity", "action-items", "communication", "project-management"]
    },

    // =========================================================================
    // PRODUCTIVITY (4 prompts)
    // =========================================================================

    {
        title: "Decision Matrix Builder",
        category: "Productivity",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a decision analysis expert who helps leaders make high-quality decisions under uncertainty. Build a weighted decision matrix for the following decision.

Decision to make: [describe the decision, e.g., "which project management tool to adopt"]
Options being considered: [list 2-5 options, e.g., "Asana, Monday.com, Linear, Notion"]
Context: [why this decision matters and any constraints]
Stakeholders: [who is affected by this decision]
Timeline: [when must the decision be made]

### Step 1: Define Criteria
Based on the decision context, suggest 6-8 evaluation criteria. For each:
- **Criterion name** and brief definition
- **Why it matters** for this specific decision
- **Weight** (distribute 100 points across all criteria based on importance)

Ask me to confirm or adjust the criteria and weights before proceeding.

### Step 2: Score Each Option
Rate each option against each criterion on a 1-10 scale. For each score:
- Provide a brief justification (one sentence)
- Flag any scores based on assumptions vs. known facts

### Step 3: Calculate Results
| Criterion | Weight | [Option A] Score | [Option A] Weighted | [Option B] Score | [Option B] Weighted | ... |
|-----------|--------|-----------------|---------------------|-----------------|---------------------|-----|
| ... | ... | ... | ... | ... | ... | ... |
| **TOTAL** | **100** | | **[total]** | | **[total]** | |

### Step 4: Sensitivity Analysis
- Which criterion, if its weight changed by +/-20%, would change the winner?
- What is the minimum score change needed for the runner-up to overtake the leader?
- Are there any "knockout criteria" where a low score should disqualify an option regardless of total?

### Step 5: Recommendation
- State the recommended option and the confidence level (high/medium/low)
- Identify the biggest risk of this choice and a mitigation plan
- Suggest what would need to be true for a different option to be the right choice
- Recommend a reversibility check: how easy is it to switch if this turns out wrong?`,
        description: "Build a rigorous weighted decision matrix with sensitivity analysis to make complex decisions with confidence. Goes beyond a simple pros/cons list with quantified criteria, scoring justifications, and risk assessment.",
        example: "Sensitivity Analysis: If 'Integration with existing tools' weight increases from 20 to 30 points, Linear overtakes Asana by 12 weighted points. This is the most volatile criterion. Recommendation: validate integration capabilities with a proof-of-concept before committing.",
        tips: "Be honest about which criteria matter most; avoid giving everything equal weight as it defeats the purpose. Include at least one 'soft' criterion like team morale or learning curve.",
        tags: ["decision-making", "analysis", "frameworks", "critical-thinking", "management"]
    },

    {
        title: "Weekly Planning Assistant",
        category: "Productivity",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a productivity coach who combines time-blocking, energy management, and strategic prioritization to help high-performers plan their week. Help me plan my upcoming week.

My context:
- **Role**: [your job title and key responsibilities]
- **Top priority this week**: [the #1 thing that must get done]
- **Ongoing projects**: [list 2-4 active projects with their status]
- **Meetings already scheduled**: [list your fixed meetings with times]
- **Deadlines this week**: [list any deadlines]
- **Personal commitments**: [gym, family, appointments, etc.]
- **Energy pattern**: [when are you most focused? morning/afternoon/evening]
- **Hours available for deep work**: [realistic estimate]

Create my weekly plan:

### Weekly Intention
One sentence capturing what "a great week" looks like by Friday.

### Big 3 Outcomes
The 3 most important results to achieve this week (not tasks, outcomes).

### Daily Plans (Monday - Friday)
For each day, provide:

**[Day] — Theme: [e.g., "Deep Work Day" / "Meetings & Collaboration" / "Admin & Planning"]**

| Time Block | Activity | Type | Energy Required |
|-----------|----------|------|-----------------|
| [time] | [activity] | Deep Work / Meeting / Admin / Break | High / Med / Low |

Include:
- Deep work blocks during peak energy hours (minimum 2-hour blocks)
- Buffer time between meetings (15 min)
- One "wildcard block" per day for unexpected tasks
- Lunch and breaks (non-negotiable)
- End-of-day shutdown routine (15 min)

### Weekly Review Prompts (for Friday)
5 questions to ask yourself at the end of the week to assess and improve.

### Potential Derailers
Identify 2-3 things most likely to derail this plan and a preemptive strategy for each.`,
        description: "Create a structured weekly plan that accounts for energy levels, meeting load, deep work needs, and realistic time constraints. Includes daily themed time-blocks, potential derailers, and weekly review prompts.",
        example: "Tuesday Theme: Deep Work Day. 9:00-11:30 -- Write Q2 product roadmap draft (Deep Work, High Energy). 11:30-11:45 -- Buffer. 11:45-12:30 -- Team standup. 12:30-1:30 -- Lunch. 1:30-3:00 -- Review and respond to design feedback...",
        tips: "Be realistic about your available time; most people overestimate by 30-40%. Include commute times, lunch, and transition time between tasks. Update the plan mid-week as priorities shift.",
        tags: ["weekly-planning", "time-management", "productivity", "time-blocking", "goal-setting"]
    },

    {
        title: "Meeting Agenda Creator",
        category: "Productivity",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a meeting facilitation expert who designs agendas that keep meetings focused, inclusive, and outcome-driven. Create a structured meeting agenda.

Meeting details:
- **Meeting purpose**: [what must be accomplished by the end]
- **Type**: [decision-making / brainstorm / status update / planning / retrospective / kickoff]
- **Duration**: [total time available, e.g., 30 min / 60 min / 90 min]
- **Attendees**: [list names and roles, indicate decision-makers with *]
- **Topics to cover**: [list the main topics]
- **Pre-work needed**: [any documents or prep attendees should do before]
- **Previous context**: [relevant decisions or discussions from prior meetings]

Generate the agenda:

### Meeting: [auto-generated descriptive title]
**Date/Time**: [placeholder] | **Duration**: [X] min | **Facilitator**: [suggest or placeholder]

### Pre-Meeting
- [ ] Materials to review before the meeting (with links placeholder)
- [ ] Questions attendees should come prepared to answer
- [ ] Pre-read estimated time: [X] minutes

### Agenda

| # | Time | Duration | Topic | Type | Owner | Desired Outcome |
|---|------|----------|-------|------|-------|-----------------|
| 1 | 0:00 | 3 min | Opening & context setting | Inform | Facilitator | Everyone aligned on purpose |
| 2 | ... | ... | ... | Inform/Discuss/Decide | ... | ... |
| ... | ... | ... | ... | ... | ... | ... |
| N | [end-5] | 5 min | Action items & next steps | Decide | Facilitator | Clear owners and deadlines |

### Facilitation Notes
- **Timekeeper**: Assign someone to keep time
- **Parking lot**: How to handle off-topic items
- **Decision method**: How decisions will be made (consensus / majority / RACI owner decides)
- **Quiet voices**: Technique to ensure all perspectives are heard (e.g., round-robin, silent brainstorm)

### Post-Meeting Template
- Summary sent within: [X] hours
- Action items format: [task] — [owner] — [deadline]
- Follow-up meeting needed: Yes/No`,
        description: "Design a focused, outcome-driven meeting agenda with time allocations, ownership, facilitation notes, and a post-meeting follow-up template. Ensures meetings end with clear decisions and action items.",
        example: "Topic 3 (15 min): Q2 Budget Allocation Decision -- Type: Decide -- Owner: CFO -- Desired Outcome: Approved allocation across 3 departments. Decision method: CFO decides after hearing input from each department lead (3 min each).",
        tips: "Send the agenda 24+ hours before the meeting so attendees can prepare. If a topic is 'Inform' type and could be an email, remove it from the meeting and send it as pre-read instead.",
        tags: ["meetings", "agenda", "facilitation", "productivity", "collaboration", "time-management"]
    },

    {
        title: "Process Documentation Writer",
        category: "Productivity",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a process documentation specialist who creates SOPs (Standard Operating Procedures) that are so clear a new hire can follow them on day one. Document the following process.

Process to document:
- **Process name**: [name of the process, e.g., "Customer Refund Processing"]
- **Description**: [describe the process in your own words, rough is fine]
- **Who performs it**: [role/team responsible]
- **How often**: [daily / weekly / as-needed / triggered by event]
- **Tools used**: [software, systems, or tools involved]
- **Known pain points**: [what goes wrong or causes confusion]
- **Current documentation**: [none / outdated doc / tribal knowledge]

Generate the SOP in this format:

### SOP: [Process Name]
**Version**: 1.0 | **Last Updated**: [date] | **Owner**: [role]
**Purpose**: [one sentence: why this process exists and what it achieves]
**Scope**: [what is and is not covered by this SOP]

### Prerequisites
- [ ] Access and permissions required
- [ ] Tools and systems that must be set up
- [ ] Information needed before starting

### Process Steps

For each step:
**Step [N]: [Action verb] + [Object]**
- **Who**: [role responsible]
- **What**: Detailed instruction (specific enough to follow without asking questions)
- **Where**: Which system/screen/URL
- **Expected result**: What should happen if done correctly
- **Common mistake**: What people get wrong here and how to avoid it
- **Screenshot placeholder**: [Describe what screenshot to add here]

### Decision Points
For any step with conditional logic:
```
IF [condition A] → Go to Step X
IF [condition B] → Go to Step Y
IF [unclear / edge case] → Escalate to [person/team]
```

### Exception Handling
| Scenario | What to Do | Who to Contact |
|----------|-----------|----------------|
| [common exception] | [resolution steps] | [escalation contact] |

### Quality Checklist
- [ ] Verification step 1
- [ ] Verification step 2
- [ ] Final sign-off required: Yes/No

### Metrics & SLAs
- Expected time to complete: [X] minutes
- Quality standard: [what "done right" looks like]
- SLA/deadline: [if applicable]

### Revision History
| Date | Version | Changed By | Changes |
|------|---------|-----------|---------|`,
        description: "Create professional Standard Operating Procedure documentation with step-by-step instructions, decision trees, exception handling, and quality checklists. Clear enough for a new hire to follow on day one.",
        example: "Step 3: Verify Refund Eligibility. Who: Support Agent. What: Open the customer's order in Shopify Admin > Orders, check that the order date is within the 30-day return window... Common mistake: Agents forget to check if a partial refund was already issued...",
        tips: "Walk through the process yourself while writing the rough description; you will catch steps you do on autopilot. Include the tools and URLs used at each step for true day-one usability.",
        tags: ["sop", "process-documentation", "operations", "onboarding", "knowledge-management", "procedures"]
    },

    // =========================================================================
    // DATA & RESEARCH (4 prompts)
    // =========================================================================

    {
        title: "Data Analysis Plan",
        category: "Data & Research",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Advanced",
        prompt: `You are a senior data scientist who designs rigorous analysis plans before touching any data. Create a comprehensive data analysis plan for the following question.

Research question: [what question are you trying to answer with data?]
Dataset description: [describe your data: source, size, key variables, time range]
Business context: [why this analysis matters and who will use the results]
Available tools: [Python/R/SQL/Excel/Tableau/etc.]
Constraints: [time limit, data quality issues, privacy restrictions, etc.]

### 1. Problem Framing
- Restate the business question as a precise analytical question
- Define the outcome variable and what "success" looks like
- List the key hypotheses to test (H1, H2, H3)
- Identify potential confounding variables

### 2. Data Requirements
| Variable | Description | Type | Source | Expected Quality |
|----------|-------------|------|--------|-----------------|
| [var] | [what it measures] | Numeric/Categorical/Date/Text | [table/API] | High/Medium/Low |

Flag any critical data gaps and suggest proxies or alternative data sources.

### 3. Methodology
For each hypothesis, specify:
- **Statistical method**: [e.g., logistic regression, A/B test, time series decomposition]
- **Why this method**: Justify the choice given data type and sample size
- **Assumptions to check**: [normality, independence, homoscedasticity, etc.]
- **What to do if assumptions are violated**: Alternative methods
- **Sample size / power analysis**: Is the data sufficient to detect a meaningful effect?

### 4. Analysis Pipeline
Outline the step-by-step analysis workflow:
1. Data extraction (provide SQL query or API call skeleton)
2. Data cleaning (expected issues and handling strategy)
3. Exploratory Data Analysis (specific plots and summary statistics to generate)
4. Feature engineering (transformations, derived variables)
5. Modeling / statistical testing
6. Validation (cross-validation strategy, holdout set)
7. Interpretation and visualization of results

### 5. Deliverables
- What visualizations to produce (specify chart types and what each should show)
- How to present findings to non-technical stakeholders
- What caveats and limitations to communicate
- Recommended next analyses based on likely outcomes

### 6. Timeline Estimate
Break down the work into phases with estimated hours for each step.`,
        description: "Design a rigorous, reproducible data analysis plan before writing a single line of code. Covers problem framing, methodology selection, assumption checking, and stakeholder communication.",
        example: "Hypothesis H2: Customer churn rate is significantly higher for users who did not complete onboarding. Method: Survival analysis (Cox proportional hazards) with onboarding completion as the primary predictor, controlling for plan tier and signup source...",
        tips: "Share a sample of your actual data (with sensitive fields redacted) so the AI can suggest appropriate methods for your specific data types and distributions. Always include the business context; the same data can answer different questions depending on the stakeholder.",
        tags: ["data-analysis", "statistics", "research-design", "methodology", "data-science"]
    },

    {
        title: "Survey Question Designer",
        category: "Data & Research",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a research methodologist specializing in survey design who eliminates bias and maximizes response quality. Design a survey for the following research objective.

Research objective: [what do you want to learn from this survey?]
Target respondents: [who will take this survey and approximately how many]
Survey method: [online form / email / phone / in-person / in-app]
Maximum length: [target number of questions or completion time]
Key decisions to inform: [what business decisions will this data drive?]
Sensitive topics: [any topics that might reduce response rates if asked poorly]

### Survey Design

**Introduction text**: Write the survey introduction that sets expectations, explains purpose, and estimates completion time.

**For each question, provide:**

| # | Question Text | Type | Options (if applicable) | Rationale |
|---|--------------|------|------------------------|-----------|
| Q1 | [exact wording] | [multiple choice / Likert scale / open-ended / ranking / matrix / NPS] | [list options] | [why this question, why this format] |

**Design principles applied to each question:**
- Avoid double-barreled questions (asking two things at once)
- Avoid leading language that biases toward a particular response
- Use balanced scales (equal positive and negative options)
- Place sensitive questions later in the survey
- Use specific time references ("in the past 30 days" not "recently")
- Avoid acquiescence bias (mix positively and negatively worded items)

### Survey Flow
Map the question order and any skip logic:
```
Q1 → Q2 → IF Q2 = "Yes" → Q3a ELSE → Q3b → Q4 → ...
```

### Pilot Testing Recommendations
- Suggest 3 cognitive interview questions to test with 5 respondents before launch
- Identify the 2 questions most at risk of being misunderstood

### Analysis Plan Preview
For each question, state:
- What metric or insight it produces
- How it connects to the research objective
- Suggested visualization for the results

### Closing text and incentive recommendation`,
        description: "Design methodologically sound survey questions that eliminate common biases like leading language, double-barreled questions, and acquiescence bias. Includes skip logic, pilot testing plan, and analysis preview.",
        example: "Q4: In the past 30 days, how often have you used [product feature]? Options: Never / 1-2 times / 3-5 times / 6-10 times / More than 10 times. Rationale: Specific time anchor prevents recall bias; frequency bands avoid forcing exact count estimation...",
        tips: "Keep the survey under 5 minutes for online respondents; completion rates drop dramatically after that. Test the survey with 3-5 people who match your target audience and watch them take it to catch confusing wording.",
        tags: ["survey-design", "research", "questionnaire", "bias-reduction", "user-research", "methodology"]
    },

    {
        title: "Literature Review Helper",
        category: "Data & Research",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Advanced",
        prompt: `You are a research assistant with expertise in synthesizing academic literature. Help me analyze and synthesize the following research paper(s) or topic area.

Input (choose one):
- **Option A — Specific paper(s)**: [paste abstract(s), key findings, or describe the paper(s)]
- **Option B — Topic area**: [describe the research topic you are reviewing]

My research context:
- **My research question**: [what question your literature review is addressing]
- **My field/discipline**: [your academic or professional field]
- **Current stage**: [exploring a new topic / writing a thesis / preparing a grant / updating a review]
- **What I need**: [summary / critical analysis / gap identification / synthesis of multiple sources]

### For Option A (Specific Paper Analysis), provide:

**Structured Summary**
- **Research question**: What question did the authors address?
- **Methodology**: Study design, sample size, data collection, analysis method
- **Key findings**: 3-5 main results with effect sizes if reported
- **Limitations**: Methodological weaknesses the authors acknowledged (and any they missed)
- **Contribution**: What new knowledge this paper adds to the field

**Critical Assessment**
- Internal validity: How confident can we be in the causal claims?
- External validity: How generalizable are these findings?
- Statistical rigor: Were the methods appropriate for the research question?
- Potential biases: Sampling bias, publication bias, funding conflicts

**Integration with My Research**
- How does this paper support or challenge my research question?
- What concepts or methods could I borrow?
- What gap does this paper leave that my research could fill?

### For Option B (Topic Synthesis), provide:

**Thematic Map**
- Identify 4-6 major themes in this research area
- For each theme: key debates, dominant theories, and seminal works to find
- Current consensus vs. active controversies

**Gap Analysis**
- Understudied populations, methods, or contexts
- Contradictory findings that need resolution
- Emerging questions the field has not yet addressed

**Suggested Search Strategy**
- Recommended databases (PubMed, Scopus, Web of Science, etc.)
- Search strings with Boolean operators
- Inclusion/exclusion criteria for your review

**Citation recommendations**: Suggest 5-10 landmark papers I should read, with one-sentence descriptions of why each matters.`,
        description: "Analyze individual research papers or synthesize a topic area with structured summaries, critical assessment, gap identification, and integration with your own research question. Essential for thesis writing and grant preparation.",
        example: "Gap Analysis: While 12 studies examined the effect of microbreaks on productivity in office workers, no published study has investigated this effect in remote workers who control their own schedules. This represents a significant gap given that 40% of knowledge workers now work remotely...",
        tips: "Paste the actual abstract and key findings rather than just the paper title; the AI can provide much deeper analysis with specific details. For topic synthesis, specify your discipline to get field-appropriate methodological suggestions.",
        tags: ["literature-review", "academic-research", "synthesis", "critical-analysis", "thesis", "scholarship"]
    },

    {
        title: "SQL Query Builder",
        category: "Data & Research",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a senior database engineer who writes optimized, production-grade SQL. Generate a SQL query for the following data request.

Database context:
- **Database type**: [PostgreSQL / MySQL / SQL Server / SQLite / BigQuery / Snowflake]
- **Relevant tables** (provide schema or describe):
\`\`\`sql
[paste CREATE TABLE statements or describe tables and their columns]
\`\`\`
- **Relationships**: [describe how tables are related, e.g., "users.id = orders.user_id"]
- **Approximate data volume**: [row counts if known, for optimization context]

Data request: [describe in plain English what data you need]

Example output row: [describe what one row of the result should look like, if helpful]

### Provide:

**1. The SQL Query**
\`\`\`sql
-- Well-commented query with clear formatting
-- Each JOIN, WHERE clause, and aggregation explained
[your query here]
\`\`\`

**2. Query Explanation**
Walk through the query step by step in plain English:
- What each CTE or subquery does and why it is needed
- Why specific JOINs were chosen (INNER vs LEFT vs CROSS)
- How the WHERE clauses filter the data
- What the GROUP BY and aggregations produce

**3. Performance Considerations**
- Estimated query complexity and potential bottlenecks
- Recommended indexes to support this query
- Alternative approaches if the query is slow on large datasets
- Whether the query would benefit from materialized views or pre-aggregation

**4. Edge Cases & Data Quality**
- How NULLs are handled and whether this is correct for the use case
- Potential for duplicate rows and how they are addressed
- Date/timezone considerations
- What happens if a referenced table is empty

**5. Test Queries**
Provide 2-3 smaller queries to validate the results:
- A COUNT query to verify row counts
- A spot-check query to validate a specific known result
- A boundary test for edge cases`,
        description: "Generate production-quality SQL queries with clear comments, performance optimization suggestions, edge case handling, and validation test queries. Supports all major database platforms.",
        example: "Performance Note: The correlated subquery in the WHERE clause will execute once per row in the outer query (~500K rows). Recommend rewriting as a CTE with a window function to reduce execution time from ~45s to ~3s...",
        tips: "Always provide your actual table schemas (CREATE TABLE statements); vague descriptions lead to incorrect column references. Mention your database type, as SQL syntax varies significantly between platforms.",
        tags: ["sql", "database", "queries", "data-extraction", "performance-optimization", "analytics"]
    },

    // =========================================================================
    // EDUCATION & LEARNING (4 prompts)
    // =========================================================================

    {
        title: "Concept Explainer",
        category: "Education & Learning",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a world-class educator who can explain any concept at any level of complexity. You follow the Feynman Technique: if you cannot explain it simply, you do not understand it well enough.

Concept to explain: [topic or concept]
My current level: [no background / beginner / intermediate / advanced]
My field/context: [why I need to understand this — work, school, personal interest]
Preferred learning style: [visual analogies / step-by-step logic / real-world examples / historical narrative]

Explain this concept using the following layered approach:

### Layer 1: The One-Sentence Explanation
Explain the concept in one sentence a smart 12-year-old would understand. No jargon.

### Layer 2: The Analogy
Create a vivid, memorable analogy from everyday life. Explain where the analogy holds and where it breaks down.

### Layer 3: The Mechanism
Explain HOW it actually works, step by step:
1. [First principle or step]
2. [Second principle or step]
3. [Continue until the full mechanism is covered]
Use simple language but do not sacrifice accuracy.

### Layer 4: The Nuance
Now add the complexity:
- Common misconceptions and why they are wrong
- Edge cases or exceptions to the general rule
- How experts think about this differently than beginners
- What is still debated or unknown

### Layer 5: Connections
- How this concept connects to [my field/context]
- 3 real-world applications or examples
- What to learn next to deepen understanding
- One question I should be able to answer if I truly understand this

### Self-Test
Provide 3 questions of increasing difficulty:
1. Basic recall
2. Application to a new scenario
3. Analysis or evaluation level`,
        description: "Learn any concept through a five-layer explanation that progresses from simple to nuanced. Uses the Feynman Technique with analogies, mechanisms, misconception correction, and self-test questions.",
        example: "Layer 1: Blockchain is a shared notebook that everyone can read but no one can erase, where new entries are verified by the group before being written in permanent ink. Layer 2 Analogy: Imagine a town where every purchase is announced...",
        tips: "Be specific about your current knowledge level; saying 'I understand X but not Y' helps the AI calibrate the explanation. Mention your field so the AI can use relevant examples.",
        tags: ["learning", "explanation", "feynman-technique", "education", "concepts", "teaching"]
    },

    {
        title: "Flashcard Generator",
        category: "Education & Learning",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Beginner",
        prompt: `You are a learning science expert who designs flashcards using evidence-based principles: active recall, spaced repetition, interleaving, and elaborative interrogation. Create a flashcard set for studying the following material.

Subject: [what you are studying]
Source material: [paste notes, textbook content, or describe the topic]
Exam/goal: [what you are preparing for, e.g., "AWS certification", "biology midterm", "job interview"]
Difficulty level: [introductory / intermediate / advanced]
Number of cards: [suggest 20-30 or specify]

### Generate flashcards in these categories:

**Type 1: Core Concept Cards (40% of total)**
- Front: A clear, specific question (not "What is X?" but "How does X differ from Y?")
- Back: Concise answer (2-3 sentences max) + a mnemonic or memory hook

**Type 2: Application Cards (30% of total)**
- Front: A scenario or problem that requires applying the concept
- Back: The solution with step-by-step reasoning

**Type 3: Connection Cards (20% of total)**
- Front: "How does [Concept A] relate to [Concept B]?"
- Back: The relationship explained, with a diagram description if helpful

**Type 4: Common Mistake Cards (10% of total)**
- Front: "True or False: [common misconception]"
- Back: The correct answer with an explanation of why the misconception exists

### Format each card as:

**Card [N] — [Type]**
| Front | Back |
|-------|------|
| [question] | [answer + memory hook] |
**Difficulty**: Easy / Medium / Hard
**Tags**: [topic tags for filtering]

### Study Guide
After the cards, provide:
1. **Recommended study order**: Which cards to learn first and why
2. **Spaced repetition schedule**: Day 1, Day 3, Day 7, Day 14, Day 30 plan
3. **Active recall tips**: How to use these cards effectively (not just passive reading)
4. **Interleaving suggestion**: How to mix these cards with other topics for better retention`,
        description: "Generate evidence-based flashcards using active recall, spaced repetition, and elaborative interrogation principles. Includes four card types for comprehensive learning and a study schedule.",
        example: "Card 7 -- Application: Front: 'A client reports their EC2 instance can reach the internet but cannot receive inbound connections. Which VPC component is most likely misconfigured?' Back: 'The Security Group inbound rules. Security groups are stateful but default-deny inbound...' Memory hook: 'Security guards check IDs at the door (inbound) but let residents leave freely (outbound).'",
        tips: "Paste your actual study notes or textbook content rather than just a topic name; the AI will create cards that match exactly what you need to learn. Use the spaced repetition schedule consistently for best retention.",
        tags: ["flashcards", "study", "spaced-repetition", "active-recall", "exam-prep", "memorization"]
    },

    {
        title: "Practice Problem Creator",
        category: "Education & Learning",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are an expert educator who designs practice problems that build mastery through progressive difficulty and varied problem types. Create a practice problem set.

Subject: [what subject or skill]
Specific topic: [narrow down to the specific topic within the subject]
Current skill level: [beginner / intermediate / advanced]
Exam or assessment format: [multiple choice / free response / coding / essay / mixed]
Weak areas: [specific concepts or problem types you struggle with]
Time available for practice: [e.g., "1 hour" or "20 problems"]

### Generate a practice set with progressive difficulty:

**Warm-Up (3 problems) — Build Confidence**
- Test fundamental concepts and definitions
- Should be solvable in under 2 minutes each
- Include the complete solution and the concept being tested

**Core Practice (5-7 problems) — Build Competence**
- Apply concepts to standard problems
- Mix different techniques within the topic
- For each problem, provide:
  - The problem statement
  - Hint (hidden behind a "hint" label — the student reads only if stuck)
  - Complete worked solution with explanation of EACH step
  - Common mistake to avoid

**Challenge Problems (3 problems) — Build Mastery**
- Combine multiple concepts or add a twist
- Require deeper thinking or multi-step reasoning
- Include problems similar to what appears on exams
- Provide solutions with strategic thinking commentary: "Here is how an expert approaches this..."

**Speed Round (5 problems) — Build Fluency**
- Quick-fire problems designed to be solved in 30-60 seconds each
- Focus on pattern recognition and automatic recall
- Provide answers with brief explanations

### For each problem, tag:
- **Concept tested**: [which specific concept]
- **Difficulty**: 1-5
- **Time estimate**: how long it should take
- **Bloom's level**: Remember / Understand / Apply / Analyze / Evaluate / Create

### After the problem set:
- **Score interpretation**: What does getting X out of Y correct suggest about readiness?
- **Targeted next steps**: Based on which problems were missed, what to study next
- **Similar problem types to search for**: Keywords to find more practice`,
        description: "Generate a progressive practice problem set with warm-ups, core practice, challenge problems, and speed rounds. Includes worked solutions, hints, common mistakes, and a diagnostic interpretation of results.",
        example: "Core Problem 4: A binary search tree contains the values [3,7,1,5,9,2,8]. Draw the tree, then determine the output of an in-order traversal. Hint: Start by inserting each value left or right based on comparison with the current node. Common mistake: Students often forget that in-order traversal visits LEFT, ROOT, RIGHT...",
        tips: "Mention your specific weak areas so the AI can weight problems toward those concepts. If preparing for a specific exam, share a past exam question as an example of the format and difficulty you need.",
        tags: ["practice-problems", "exercises", "study", "assessment", "mastery-learning", "exam-prep"]
    },

    {
        title: "Learning Path Designer",
        category: "Education & Learning",
        models: ["GPT-4", "Claude", "Gemini"],
        difficulty: "Intermediate",
        prompt: `You are a curriculum designer and self-directed learning expert who creates structured learning paths that take people from zero to competent in any skill. Design a learning path for me.

What I want to learn: [skill or subject]
My current level: [complete beginner / some basics / intermediate wanting to go deeper]
My goal: [what I want to be able to DO, not just know, e.g., "build and deploy a full-stack web app"]
Time commitment: [hours per week I can dedicate]
Timeline: [when I need to reach my goal, e.g., "3 months"]
Learning preferences: [video courses / books / hands-on projects / interactive tutorials]
Budget: [free only / up to $X / no limit]

### Learning Path: [Skill Name] — [Beginner to [Goal Level]]

**Phase 1: Foundation (Weeks 1-[X])**
Goal: [what you will be able to do after this phase]

| Week | Topic | Resources (specific recommendations) | Practice Project | Time Est. |
|------|-------|--------------------------------------|-----------------|-----------|
| 1 | [topic] | [specific course, book, or tutorial with URL placeholder] | [hands-on exercise] | [hours] |
| 2 | [topic] | [resource] | [project] | [hours] |

**Phase 2: Core Skills (Weeks [X]-[Y])**
Goal: [what you will be able to do after this phase]
[Same table format]

**Phase 3: Applied Practice (Weeks [Y]-[Z])**
Goal: [what you will be able to do after this phase]
[Same table format]

**Phase 4: Advanced / Specialization (Weeks [Z]+)**
Goal: [what you will be able to do after this phase]
[Same table format]

### Milestone Checkpoints
After each phase, provide:
- **Self-assessment**: 3 questions or tasks to verify you have mastered the phase
- **Portfolio piece**: One project that demonstrates competence at this level
- **Decision point**: Should you proceed, revisit, or pivot your focus?

### Common Pitfalls
5 mistakes learners commonly make with this subject and how to avoid them.

### Community & Support
- Online communities to join (subreddits, Discord servers, forums)
- People to follow for ongoing learning
- Conferences or events worth attending

### Maintenance Plan
How to maintain and continue developing this skill after completing the learning path.`,
        description: "Get a structured, phased learning path with specific resource recommendations, weekly schedules, portfolio projects, and milestone checkpoints. Tailored to your available time, budget, and learning style.",
        example: "Phase 1, Week 2: Topic: JavaScript Fundamentals (functions, arrays, objects). Resource: javascript.info chapters 4-6 (free). Practice Project: Build a command-line to-do list that persists to a JSON file. Time: 8 hours. Milestone: You can solve 80% of Easy-level problems on LeetCode using JavaScript.",
        tips: "Be specific about your goal; 'learn Python' is too vague, but 'build a web scraper that monitors apartment prices and sends email alerts' gives the AI a clear endpoint to design toward. Include what you have already tried so the path does not repeat what you know.",
        tags: ["learning-path", "curriculum", "self-study", "skill-development", "education", "roadmap"]
    },

    // =========================================================================
    // IMAGE GENERATION (4 prompts)
    // =========================================================================

    {
        title: "Photorealistic Portrait Prompt",
        category: "Image Generation",
        models: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
        difficulty: "Intermediate",
        prompt: `You are an expert prompt engineer for AI image generation models (DALL-E 3, Midjourney, Stable Diffusion). Create a detailed prompt for a photorealistic portrait.

Subject description:
- **Who**: [describe the person: age range, ethnicity, distinguishing features — or "fictional/generic"]
- **Expression/Mood**: [e.g., contemplative, joyful, intense, serene]
- **Setting**: [environment, e.g., "urban rooftop at golden hour", "cozy library"]
- **Style reference**: [photographer or style, e.g., "Annie Leibovitz editorial", "Steve McCurry documentary"]
- **Purpose**: [social media profile / editorial / character concept / fine art print]

Generate prompts optimized for each platform:

### DALL-E 3 Prompt
[Write the prompt in natural language, 2-3 detailed sentences covering subject, lighting, composition, and mood. DALL-E 3 responds best to descriptive prose rather than keyword lists.]

### Midjourney Prompt
[Write in Midjourney's preferred format:]
\`\`\`
[subject description], [setting/environment], [lighting], [camera angle], [lens], [film stock/style] --ar [aspect ratio] --v [version] --style [raw/scenic] --s [stylize value] --q [quality]
\`\`\`

### Stable Diffusion Prompt
\`\`\`
Positive: [detailed comma-separated descriptors including subject, lighting, camera, quality tags]
Negative: [things to exclude: deformations, artifacts, unwanted elements]
Recommended settings: Steps: [X], CFG: [X], Sampler: [name], Model: [suggestion]
\`\`\`

### For all versions, specify:
- **Lighting breakdown**: Key light position, fill light, rim/hair light, ambient
- **Camera settings**: Lens focal length (e.g., 85mm f/1.4), distance, angle
- **Color palette**: Dominant colors and tonal mood
- **Composition**: Rule of thirds placement, leading lines, depth of field
- **Post-processing**: Film simulation, color grading, grain

### Variations
Provide 3 alternative mood/lighting variations:
1. Same subject, different time of day
2. Same subject, different emotional tone
3. Same subject, different artistic style (e.g., shift from editorial to fine art)`,
        description: "Generate platform-specific portrait prompts for DALL-E 3, Midjourney, and Stable Diffusion with precise lighting, camera, and composition details. Includes parameter recommendations and three creative variations.",
        example: "Midjourney: Portrait of a weathered fisherman in his 60s, deep laugh lines, salt-and-pepper beard, standing on a wooden dock at dawn, warm golden rim light from rising sun, cool blue fill from ocean, shot on Hasselblad with 100mm f/2.2, Kodak Portra 400 film emulation --ar 3:4 --v 6 --style raw --s 250",
        tips: "Reference specific photographers or film stocks for more cohesive results. For Midjourney, keep the prompt under 75 words and use --style raw for more photographic output. For DALL-E 3, write in complete sentences.",
        tags: ["image-generation", "portrait", "photography", "midjourney", "dall-e", "stable-diffusion", "ai-art"]
    },

    {
        title: "Product Photography Prompt",
        category: "Image Generation",
        models: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
        difficulty: "Intermediate",
        prompt: `You are a commercial product photographer and AI prompt engineer. Create detailed image generation prompts for e-commerce product photography.

Product details:
- **Product**: [what is the product, e.g., "matte black ceramic coffee mug"]
- **Key features to highlight**: [what makes it special, e.g., "textured grip, minimalist design"]
- **Brand aesthetic**: [luxury / minimalist / playful / rugged / organic / tech-forward]
- **Background preference**: [pure white / lifestyle scene / gradient / textured surface / outdoor]
- **Target platform**: [Amazon listing / Shopify store / Instagram ad / print catalog]
- **Competitors for reference**: [brands whose product photography you admire]

Generate prompts for 5 standard e-commerce photography angles:

### Shot 1: Hero Image (Main Listing Photo)
- Clean, well-lit product on [background]
- Camera: [angle, lens, distance]
- Lighting: [professional studio lighting setup]
- Purpose: Primary product listing image

### Shot 2: Lifestyle/Context Shot
- Product in use or in a styled environment
- Scene description: [setting, props, atmosphere]
- Tells a story about who uses this product and when
- Purpose: Emotional connection and aspiration

### Shot 3: Detail/Texture Close-Up
- Macro or close-up highlighting key feature
- Shallow depth of field, precise lighting to show texture
- Purpose: Quality and craftsmanship

### Shot 4: Scale/Size Reference
- Product next to common objects or being held/used
- Shows true size without looking like a stock photo
- Purpose: Help buyer understand dimensions

### Shot 5: Group/Collection Shot
- Product with variants, accessories, or complementary items
- Organized, aesthetic arrangement
- Purpose: Cross-sell and show range

### For each shot, provide:
- **DALL-E 3 prompt** (natural language, 2-3 sentences)
- **Midjourney prompt** (with parameters: --ar, --v, --style, --s)
- **Lighting diagram**: Describe key, fill, and accent light positions
- **Props and styling notes**: Specific items to include in the scene
- **Color palette**: Hex codes for brand consistency
- **Post-production notes**: Retouching and color grading suggestions`,
        description: "Generate five standard e-commerce product photography shots (hero, lifestyle, detail, scale, collection) with platform-specific prompts for DALL-E 3 and Midjourney, plus professional lighting and styling notes.",
        example: "Shot 2 Lifestyle -- Midjourney: Matte black ceramic coffee mug on a reclaimed wood desk, morning light streaming through linen curtains, open notebook and brass pen beside it, steam rising from the cup, warm tones, shallow depth of field, shot from 45-degree angle with 50mm lens, editorial lifestyle photography --ar 4:5 --v 6 --style raw --s 200",
        tips: "For Amazon listings, the hero image must have a pure white background (RGB 255,255,255). Specify exact aspect ratios for each platform: Instagram 1:1 or 4:5, Amazon 1:1, Shopify hero 16:9.",
        tags: ["product-photography", "e-commerce", "commercial", "image-generation", "marketing", "branding"]
    },

    {
        title: "Logo Concept Generator",
        category: "Image Generation",
        models: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
        difficulty: "Advanced",
        prompt: `You are a brand identity designer and AI prompt engineer. Generate detailed prompts for logo concept exploration using AI image generation.

Brand information:
- **Brand name**: [name]
- **Industry**: [what the company does]
- **Brand values**: [3-5 core values, e.g., "innovation, trust, simplicity"]
- **Target audience**: [who the brand serves]
- **Personality**: [if the brand were a person, how would you describe them?]
- **Color preferences**: [preferred colors or "suggest based on industry"]
- **Style preference**: [wordmark / lettermark / icon+text / abstract symbol / mascot / emblem]
- **Competitors to differentiate from**: [competitor names and why you want to look different]
- **Must avoid**: [styles, symbols, or associations to stay away from]

### Concept Direction 1: [Concept Name]
**Rationale**: [why this direction fits the brand — connect to values and audience]
**Visual description**: [detailed description of the logo concept]

**DALL-E 3 Prompt**:
[Precise, descriptive prompt. Note: AI logos are concept explorations, not final designs]

**Midjourney Prompt**:
\`\`\`
[prompt] --ar 1:1 --v 6 --style raw --s [value] --no [exclusions]
\`\`\`

### Concept Direction 2: [Concept Name]
[Same structure as above, different creative direction]

### Concept Direction 3: [Concept Name]
[Same structure as above, different creative direction]

### For each concept, also provide:
- **Symbolism breakdown**: What each visual element represents
- **Scalability notes**: Will this work at favicon size (16x16px) and billboard size?
- **Versatility check**: How it looks in single color, reversed (white on dark), and grayscale
- **Typography pairing**: Suggest 2 Google Fonts that complement this logo style
- **Color palette**: Primary, secondary, and accent colors with hex codes and usage ratios

### Industry Context
- Common logo patterns in [industry] and how to stand out
- Trends to embrace vs. trends to avoid for longevity
- 3 examples of excellent logos in adjacent industries and what makes them work

### Next Steps
- How to take AI-generated concepts to a professional designer
- What to brief the designer on based on the concepts you like
- File format requirements for different use cases (web, print, merch)`,
        description: "Explore three distinct logo concept directions with AI, complete with brand rationale, platform-specific prompts, symbolism analysis, and practical design specifications. Use as a creative springboard before working with a professional designer.",
        example: "Concept 1: 'The Keystone.' A minimalist geometric arch formed from two interlocking shapes representing trust and partnership. Uses negative space to subtly embed the letter M. Color: deep navy (#1B2A4A) with copper accent (#B87333). Typography pairing: Inter for headings, Source Serif Pro for body...",
        tips: "AI-generated logos are excellent for exploring creative directions but should not be used as final logos. Use these concepts as a visual brief for a professional designer. Always generate in --style raw on Midjourney for cleaner, more graphic output.",
        tags: ["logo-design", "branding", "identity", "image-generation", "design", "creative-direction"]
    },

    {
        title: "Fantasy Landscape Creator",
        category: "Image Generation",
        models: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
        difficulty: "Intermediate",
        prompt: `You are a concept artist and AI prompt engineer specializing in fantasy and sci-fi environments. Create detailed prompts for an epic fantasy landscape.

Scene description:
- **Setting type**: [enchanted forest / floating islands / underwater city / volcanic wasteland / crystal caverns / celestial realm / ancient ruins / other]
- **Time of day**: [dawn / midday / golden hour / twilight / night / eclipse / other]
- **Weather/atmosphere**: [clear / misty / stormy / aurora / magical particles / other]
- **Scale**: [intimate glade / vast panorama / impossibly large / miniature world]
- **Mood**: [peaceful / ominous / awe-inspiring / melancholic / mysterious / triumphant]
- **Cultural inspiration**: [Norse / Japanese / Mesoamerican / Middle Eastern / Celtic / Afrofuturist / blend of...]
- **Purpose**: [book cover / game concept art / desktop wallpaper / D&D campaign / film pre-production]

### The Scene — Detailed Visual Script

**Foreground** (closest to viewer):
- [Describe objects, textures, vegetation, and scale references in the immediate foreground]

**Midground** (the subject):
- [Describe the primary focal point: architecture, landforms, characters, creatures]
- [Include specific details: materials, condition (ancient/new/ruined), scale indicators]

**Background** (setting the world):
- [Describe the horizon, sky, distant features, and atmospheric depth]
- [How does the background reinforce the mood and scale?]

**Lighting & Color**:
- Primary light source and color temperature
- Secondary/ambient lighting (magical glow, bioluminescence, reflected light)
- Color palette: dominant, secondary, and accent colors
- Atmospheric effects: volumetric light, god rays, fog, haze

### Platform-Specific Prompts

**DALL-E 3**:
[2-4 descriptive sentences capturing the full scene in natural language]

**Midjourney**:
\`\`\`
[scene description], [artistic style reference], [lighting], [atmosphere], [medium if applicable] --ar [16:9 / 21:9 / 3:2] --v 6 --style [raw/scenic] --s [stylize value] --c [chaos value for variation]
\`\`\`

**Stable Diffusion**:
\`\`\`
Positive: [detailed comma-separated descriptors]
Negative: [artifacts, deformations, unwanted elements, modern objects]
Recommended: Model: [suggestion], Steps: [X], CFG: [X], Sampler: [name]
\`\`\`

### Variations
1. **Same scene, different season/time**: [describe the transformation]
2. **Before/After**: [the scene 1000 years earlier or later]
3. **Different perspective**: [bird's eye / ground level / underwater / from inside a structure]

### Art Direction References
- Name 3 concept artists whose style could inspire this scene
- Suggest a film or game with similar visual language
- Describe the equivalent music that would accompany this image`,
        description: "Create breathtaking fantasy landscapes with layered foreground-midground-background composition, detailed lighting scripts, and platform-specific prompts for DALL-E 3, Midjourney, and Stable Diffusion.",
        example: "Midjourney: Ancient elven observatory carved into a crystalline mountain peak, massive astronomical rings of tarnished bronze rotating around a central spire, bioluminescent vines reclaiming the structure, twin moons visible through swirling aurora, volumetric moonlight, matte painting style inspired by Craig Mullins --ar 21:9 --v 6 --style scenic --s 500 --c 15",
        tips: "Use specific art direction terms like 'volumetric lighting,' 'atmospheric perspective,' and 'matte painting' for more cinematic results. Higher --stylize values in Midjourney produce more artistic interpretations; lower values stay closer to your description.",
        tags: ["fantasy-art", "landscape", "concept-art", "worldbuilding", "image-generation", "midjourney", "environment-design"]
    }

];
