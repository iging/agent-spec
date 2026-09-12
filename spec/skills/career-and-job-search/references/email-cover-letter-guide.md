# Email Cover Letter & CV Mailing Protocol Guide

## Role & Authority

- **Role:** Email Cover Letter & Document Transmission Reference Guide for candidate outreach and job application emails.
- **Authority:** Reference tier document for `skills/career-and-job-search/`.
- **Must not define:** General resume formatting (see `01-resume-optimizer`), technical coding assessment prep (see `03-interview-prep`), or salary negotiation (see `04-offer-evaluation-and-negotiation`).
- **Normative base:** `spec/shared/writing/writing-rules.md`, `spec/docs/anti-patterns.md`.

---

## 1. Overview & Purpose

When submitting job applications via direct email or communicating directly with hiring managers and recruiters, the email message body functions as a concise email cover letter. This guide provides standards for structuring email cover letters, formatting attachments, writing subject lines, and avoiding common application email pitfalls.

---

## 2. Email Subject Line Standards

Subject lines must be clear, concise, and searchable by hiring teams and automated inbox filters.

### Standard Format Conventions

- **Direct Application:** `[Job Title] Application - [First Name] [Last Name]`
- **Requisition ID Included:** `Application: [Job Title] (Req #[ID]) - [First Name] [Last Name]`
- **Referral Application:** `Referral: [Job Title] - [First Name] [Last Name] (via [Referrer Name])`
- **Recruiter / Hiring Manager Direct:** `[Job Title] Role - [First Name] [Last Name] ([Core Skill / Specialty])`

### Subject Line Best Practices

- Keep subject lines under 60 characters for mobile display.
- Never leave the subject line blank or use vague titles such as "My Resume" or "Job Inquiry".
- Include specific role identifiers or requisition numbers when provided in the job posting.

---

## 3. Email Cover Letter Body Structure

Email cover letters must be shorter than traditional formal cover letters (150 to 200 words maximum). Hiring managers scan email applications in 15 to 30 seconds.

### Section-by-Section Breakdown

1. **Salutation:** Address the specific hiring manager or recruiter by name. Use "Dear [Hiring Manager Title / Hiring Team]" only when the name is unlisted.
2. **Opening Hook (Paragraph 1 - 2 to 3 sentences):** State the target role, reference core technical domain alignment, and present a primary achievement metric immediately.
3. **Core Evidence (Paragraph 2 - 3 to 4 sentences or bullet points):** Highlight 2 to 3 relevant technical accomplishments directly addressing the key requirements of the role.
4. **Call to Action & Attachments (Paragraph 3 - 2 sentences):** Note attached files (CV, portfolio) and offer a specific call to action for a brief interview discussion.
5. **Professional Sign-off & Contact Block:** Professional closing, full name, phone number, LinkedIn profile link, and portfolio/GitHub link.

---

## 4. Document Attachment & CV Mailing Protocol

Attaching documents incorrectly can cause emails to trigger spam filters or produce unreadable files.

### File Naming Conventions

Always use standardized, searchable file names without spaces or special characters:

- **CV / Resume:** `Firstname_Lastname_CV.pdf` or `Firstname_Lastname_Resume.pdf`
- **Cover Letter (if attached separately):** `Firstname_Lastname_CoverLetter.pdf`
- **Combined Package:** `Firstname_Lastname_Application_[JobTitle].pdf`

### Technical Attachment Rules

- **Format:** Convert all documents to standard PDF/A format before attaching. Avoid submitting `.docx` files unless explicitly requested, as formatting can shift across platforms.
- **File Size:** Ensure total attachment size remains under 5 MB to avoid inbox delivery failures.
- **Hyperlinks:** Ensure all links in the email body (LinkedIn, GitHub, personal site) use explicit HTTPS URLs and function correctly.
- **Security Check:** Never send password-protected files or compressed archives (`.zip`, `.rar`).

---

## 5. Sample Email Cover Letter Templates

### Template A: Standard Direct Application Email

```text
Subject: Senior Backend Engineer Application - Full Name

Dear Hiring Team,

Having scaled distributed telemetry services to handle 50,000 requests per second at CloudScale, I am eager to contribute to the Infrastructure Reliability team at TechCorp.

My background aligns with your requirements in three key areas:
- Designed and deployed Go microservices achieving 99.99% uptime across multi-region Kubernetes clusters.
- Reduced database query latency by 45% through PostgreSQL index optimization and Redis caching layer implementation.
- Led migration of legacy monolithic API to event-driven architecture serving 2 million daily active users.

I have attached my CV (FirstName_LastName_CV.pdf) for your review. I would welcome the opportunity to discuss how my background in high-throughput systems can support TechCorp's infrastructure growth.

Best regards,

Jane Doe
Phone: (+63) 000 000 0000
LinkedIn: linkedin.com/in/username
GitHub: github.com/username
```

### Template B: Employee Referral Email

```text
Subject: Referral: Staff Frontend Engineer - Full Name (via Full Name)

Dear Hiring Manager,

Following a conversation with Full Name on your Senior Engineering team, I am writing to express my strong interest in the Staff Frontend Engineer position at DataViz.

In my recent role at WebTech, I architected React 19 component libraries used by 40 internal product teams and reduced initial bundle load times by 35%. Sarah highlighted DataViz's current push toward real-time dashboard performance, an area where I have delivered multi-threaded WebGL visualization pipelines.

My CV is attached (FirstName_LastName_CV.pdf). I am available for an initial phone conversation at your convenience this week.

Sincerely,

Full Name
Phone: (+63) 000 000 0000
LinkedIn: linkedin.com/in/username
Portfolio: username.vercel.app
```

---

## 6. Anti-Patterns & Common Mistakes

| Mistake                                              | Consequence                                        | Correct Protocol                                                 |
| :--------------------------------------------------- | :------------------------------------------------- | :--------------------------------------------------------------- |
| Generic subject line ("Applying for job")            | Lost in recruiter inbox or filtered as spam        | Use standardized `[Job Title] Application - [Name]` format       |
| Sending `.docx` files                                | Formatting renders incorrectly on non-Word viewers | Convert all documents to PDF before attaching                    |
| Wall-of-text body (>300 words)                       | Recruiter skips reading the message                | Keep email body concise (150 to 200 words max)                   |
| Download link instead of attachment                  | High friction and security warning flags           | Attach PDF directly. Include hyperlinks only for live portfolios |
| Using generic salutations ("To Whom It May Concern") | Appears untargeted and automated                   | Address hiring manager by name or team title                     |

---

## 7. Versioning & Maintenance

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-07): Initial release of Email Cover Letter & CV Mailing Protocol Guide.
