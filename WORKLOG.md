# WORKLOG.md — Overnight Build Log

Track what I build during overnight sessions. Yoel reviews in the morning.

---

## How This Works

Every night at 11pm, I start working on projects while Yoel sleeps. I:
1. Pick tasks from ClickUp or identify improvements
2. Build using Codex CLI (all coding goes through it)
3. Create branches/PRs — never push to main
4. Document everything here
5. Leave a summary for morning review

---

## Pending Review

*Items waiting for Yoel to test/approve*

| Date | Project | What I Built | Branch/PR | Status |
|------|---------|--------------|-----------|--------|
| 2026-01-30 | Second Brain | Full NextJS app with dark UI, sidebar, markdown viewer, search | `feature/initial-app` | Ready to test |

---

## Completed & Merged

*Items Yoel has reviewed and approved*

| Date | Project | What I Built | Notes |
|------|---------|--------------|-------|
| — | — | — | — |

---

## Ideas Backlog

*Things I want to build when I have time*

### MoJo Dashboard
- [ ] Real-time data refresh (auto-update every hour)
- [ ] ServiceMinder integration (when API key available)
- [ ] GHL/MagicFollowUp metrics integration
- [ ] Technician performance tracking
- [ ] Route optimization suggestions

### Automation
- [ ] Email auto-categorizer for mojoeagent inbox
- [ ] Auto-draft replies for common inquiries
- [ ] Calendar conflict detector
- [ ] Lead response time tracker
- [ ] Customer churn predictor

### MagicFollowUp
- [ ] Workflow testing scripts
- [ ] SOP generator from workflow specs
- [ ] Franchisee comparison dashboard
- [ ] Snapshot validator tool

### Content
- [ ] Social media post generator (MoJo brand voice)
- [ ] Review response templates
- [ ] Email newsletter templates
- [ ] Video script outlines for YouTube

### Business Intelligence
- [ ] Sales trend analyzer
- [ ] Cancel reason deep-dive reports
- [ ] Seasonal demand predictor
- [ ] ROI calculator for marketing spend

---

## Notes

- All code PRs go to repos in ~/clawd/projects/
- Use `codex` CLI for all coding
- Test locally before flagging for review
- Keep builds small and reviewable
