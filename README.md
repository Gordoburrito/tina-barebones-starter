# An Agentic CMS for RoosterGrin

## The Vision

What if agents could update website content the same way developers push code? No WordPress logins, no manual ACF edits, no bottlenecks. Just a prompt, a file write, and a Git commit.

TinaCMS running locally with Git as the backend is the closest thing to that today.

## Why Git-Local is the Only Way

For agents to work reliably on content, they need direct file access. Git-native storage makes that possible:

- Content is just JSON/Markdown files — any agent with file access can read and write them
- Changes are commits — every update is auditable and reversible
- Runs locally in Node.js — no PHP, no remote database, no credentials to manage
- The admin UI auto-generates from schema — add a component in code, it's immediately editable in the UI

## What This Looks Like in Practice

An agent receives a request, finds the right content file, makes the update, and commits it. The same workflow that takes a human several minutes in WordPress takes an agent seconds — and scales across hundreds of sites.

A Codex or Claude Code agent could build a new component from a Figma design or a screenshot, wire up the TinaCMS schema, and make it content-editable in one shot.

<img width="2552" height="1353" alt="image" src="https://github.com/user-attachments/assets/d5c7f1cd-f93b-4516-a8a6-fb2c753bb67a" />
<img width="2560" height="1205" alt="image" src="https://github.com/user-attachments/assets/ab8f654c-c349-4643-8799-62751e17b5b7" />

## The Bigger Opportunity

Beyond internal agent workflows, TinaCMS could replace WordPress as the client-facing CMS entirely. Clients get a clean, purpose-built editing UI instead of navigating WordPress. We control the schema, the components, and the experience. No plugin bloat, no security surface, no ACF workarounds — just a content editor backed by Git that both humans and agents can use.

## The Honest Tradeoff

WordPress isn't going anywhere for legacy sites due to client familiarity. This isn't a rip-and-replace strategy — it's a starting point for new builds where we own the full stack and agent access matters most.

---

This is a [Tina CMS](https://tina.io/) project.

## Local Development

Install the project's dependencies:

> [!NOTE]  
> [Do you know the best package manager for Node.js?](https://www.ssw.com.au/rules/best-package-manager-for-node/) Using the right package manager can greatly enhance your development workflow. We recommend using pnpm for its speed and efficient handling of dependencies. Learn more about why pnpm might be the best choice for your projects by checking out this rule from SSW.

```
pnpm install
```

Run the project locally:

```
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the Starter Locally (Using the hosted content API)

Replace the `.env.example`, with `.env`

```
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
pnpm build
```

## Learn More

To learn more about Tina, take a look at the following resources:

- [Tina Docs](https://tina.io/docs)
- [Getting started](https://tina.io/docs/setup-overview/)

You can check out [Tina Github repository](https://github.com/tinacms/tinacms) - your feedback and contributions are welcome!

## [Deploy on Vercel](https://tina.io/guides/tina-cloud/add-tinacms-to-existing-site/deployment/)


