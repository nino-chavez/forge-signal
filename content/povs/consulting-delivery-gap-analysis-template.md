# Consulting Delivery Gap Analysis Template

**Mode**: POV / Framework
**Template**: pov-template.md
**Version**: 1.0
**Last Updated**: November 2024

---

## Overview

This template provides a structured framework for analyzing gaps in consulting delivery plans against industry best practices. It is calibrated to Accenture Song delivery methodology but applicable to any enterprise consulting engagement.

Use this template to:
- Validate completeness of project/program delivery plans
- Identify missing roles, processes, and deliverables
- Right-size recommendations based on engagement size (POC vs. Enterprise)
- Ensure alignment with client expectations and industry standards

---

## Gap Analysis Framework

### Category 1: Program & Delivery Leadership

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Engagement Manager | Single point of accountability for delivery | Optional (0.1 FTE) | Required (0.25 FTE) | Required (0.5+ FTE) |
| Delivery Lead | Day-to-day technical delivery oversight | Combined with Tech Lead | Required (0.5 FTE) | Required (1.0 FTE) |
| Program Manager | Cross-workstream coordination | N/A | Optional | Required |
| PMO Analyst | Status tracking, RAID log, reporting | Lightweight/Combined | Required (0.25 FTE) | Required (0.5+ FTE) |
| Executive Sponsor | Strategic decisions, escalation path | Required (client-side) | Required | Required |

**Key Questions:**
- [ ] Who is accountable for overall delivery success?
- [ ] Who manages the client relationship day-to-day?
- [ ] Who handles escalations when blockers arise?
- [ ] Who tracks status and risks across the engagement?

---

### Category 2: Quality Assurance & Testing

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| QA Role | Independent validation of deliverables | Combined with Dev | Dedicated (0.5 FTE) | Dedicated Team |
| Unit Testing | Code-level automated tests | Required (70%+ coverage) | Required (80%+) | Required (90%+) |
| Integration Testing (SIT) | Component interaction validation | Required (manual OK) | Required (automated) | Required (CI/CD) |
| System Testing | End-to-end workflow validation | Required | Required | Required |
| User Acceptance Testing (UAT) | Business scenario validation | Required (lightweight) | Required (formal) | Required (formal + sign-off) |
| Performance Testing | Load/stress testing | Optional (smoke test) | Required | Required + NFR validation |
| Security Testing | Vulnerability assessment | Basic review | Required (scan) | Required (pentest) |

**Key Questions:**
- [ ] What testing phases are defined with entry/exit criteria?
- [ ] Who is responsible for test planning and execution?
- [ ] How is UAT coordinated with the client?
- [ ] Are there defined quality gates before production?

---

### Category 3: Change & Scope Management

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Change Control Process | Formal CR evaluation and approval | Lightweight (email approval) | Defined process | CCB with formal governance |
| Scope Statement | Documented in/out of scope | Required | Required + baseline | Required + formal sign-off |
| Change Request Template | Standardized CR documentation | Optional | Required | Required |
| Impact Assessment | Scope/timeline/cost analysis | Informal | Required | Required + documentation |
| Scope Creep Monitoring | Tracking unauthorized changes | Awareness | Active monitoring | Formal controls |

**Key Questions:**
- [ ] How are change requests submitted and evaluated?
- [ ] Who has authority to approve scope changes?
- [ ] How are scope changes communicated to stakeholders?
- [ ] What is the process for emergency changes?

---

### Category 4: Risk Management

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Risk Register | Documented risks with owners | Simple list | RAID log | Formal risk register |
| Risk Review Cadence | Regular risk assessment | Weekly mention | Weekly review | Weekly + escalation process |
| Mitigation Plans | Documented response strategies | Top 5 risks | All high/medium | All risks with triggers |
| Issue Management | Tracking and resolution | Combined with risks | Separate tracking | Formal issue log |
| Contingency Planning | Backup plans for key risks | Informal | Documented | Documented + budgeted |

**Key Questions:**
- [ ] Where are risks documented and tracked?
- [ ] How often are risks reviewed?
- [ ] Who owns risk mitigation actions?
- [ ] What is the escalation path for realized risks?

---

### Category 5: Knowledge Transfer & Enablement

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| User Documentation | End-user guides | README/Quick Start | User Guide | Comprehensive docs |
| Admin Documentation | System administration guides | Runbook (basic) | Runbook (detailed) | Full admin guide |
| Training Sessions | Formal training delivery | Walkthrough (1 session) | Train-the-Trainer | Training program |
| Shadowing/Mentoring | Hands-on knowledge transfer | Optional | Recommended | Required |
| Knowledge Repository | Centralized documentation | Project folder | Confluence/SharePoint | Formal KM system |

**Key Questions:**
- [ ] What documentation will be delivered?
- [ ] How will client teams be trained?
- [ ] Is the client able to operate the system independently post-engagement?
- [ ] Where will knowledge artifacts be stored?

---

### Category 6: Post-Go-Live Support

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Hypercare Period | Intensive post-launch support | 1 week (informal) | 2 weeks (defined) | 4+ weeks (SLA-based) |
| Support SLAs | Response time commitments | Best-effort | Defined (P1/P2/P3) | Contractual SLAs |
| Incident Management | Issue triage and resolution | Ad-hoc | Defined process | ITIL-aligned |
| Rollback Plan | Recovery from failed deployment | Documented steps | Tested procedure | Automated + tested |
| Warranty Period | Defect remediation commitment | 2 weeks | 30 days | 60-90 days |

**Key Questions:**
- [ ] What support is provided after go-live?
- [ ] How are production issues triaged and resolved?
- [ ] What is the rollback procedure if deployment fails?
- [ ] How long is the warranty period for defects?

---

### Category 7: Governance & Communication

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Status Reporting | Progress communication | Weekly email | Weekly deck | Weekly + executive summary |
| Stakeholder Matrix | Who needs what information | Informal list | Documented | Formal RACI |
| Meeting Cadence | Regular touchpoints | Weekly status | Daily standup + weekly | Multiple forums |
| Escalation Path | Issue escalation process | Direct to sponsor | Defined levels | Formal escalation matrix |
| Decision Log | Tracking key decisions | Informal | Documented | Formal log with rationale |

**Key Questions:**
- [ ] How is status communicated to stakeholders?
- [ ] What is the regular meeting cadence?
- [ ] How are decisions documented?
- [ ] What is the escalation path for blockers?

---

### Category 8: Technical Operations (GenAI/ML Specific)

| Element | Description | POC/Pilot | Mid-Size | Enterprise |
|---------|-------------|:---------:|:--------:|:----------:|
| Environment Strategy | Dev/Test/Prod separation | 2 environments | 3 environments | 4 environments + governance |
| CI/CD Pipeline | Automated deployment | Manual deployment | Basic automation | Full CI/CD |
| Monitoring & Alerting | Operational visibility | CloudWatch basics | Custom dashboards | Comprehensive observability |
| LLMOps/MLOps | Model lifecycle management | Manual updates | Versioning | Full MLOps pipeline |
| Cost Management | Cloud cost tracking | Monthly review | Weekly tracking | Real-time alerts + forecasting |
| Security Controls | Access and data protection | IAM basics | Defense-in-depth | Zero-trust + compliance |

**Key Questions:**
- [ ] How many environments are provisioned?
- [ ] How is code deployed to production?
- [ ] What monitoring is in place for GenAI-specific concerns?
- [ ] How are costs tracked and managed?

---

## Engagement Size Definitions

| Attribute | POC/Pilot | Mid-Size | Enterprise |
|-----------|-----------|----------|------------|
| Duration | 4-10 weeks | 3-6 months | 6+ months |
| Team Size | 2-4 FTE | 5-10 FTE | 10+ FTE |
| Budget | <$300K | $300K-$1M | >$1M |
| Scope | Single use case/feature | Multiple features | Full platform |
| Client Involvement | Light touch | Moderate | Heavy collaboration |
| Risk Tolerance | Higher (experimental) | Moderate | Low (production-critical) |
| Documentation | Lightweight | Standard | Comprehensive |
| Governance | Informal | Defined | Formal |

---

## Gap Severity Classification

| Severity | Definition | Action Required |
|----------|------------|-----------------|
| **Critical** | Gap will likely cause engagement failure | Must address before proceeding |
| **High** | Gap creates significant risk to success | Should address in current scope |
| **Medium** | Gap reduces quality or efficiency | Address if time/budget permits |
| **Low** | Gap is a nice-to-have improvement | Consider for future phases |

---

## Gap Analysis Output Template

```markdown
## Gap Analysis: [Engagement Name]

### Engagement Profile
- **Type**: [POC/Pilot | Mid-Size | Enterprise]
- **Duration**: [X weeks/months]
- **Team Size**: [X FTE]
- **Budget**: [$XXX,XXX]

### Critical Gaps
| Gap | Category | Current State | Recommendation | Effort |
|-----|----------|---------------|----------------|--------|
| ... | ... | ... | ... | ... |

### High Priority Gaps
| Gap | Category | Current State | Recommendation | Effort |
|-----|----------|---------------|----------------|--------|
| ... | ... | ... | ... | ... |

### Medium Priority Gaps
| Gap | Category | Current State | Recommendation | Effort |
|-----|----------|---------------|----------------|--------|
| ... | ... | ... | ... | ... |

### Recommendations Summary
1. [Top recommendation]
2. [Second recommendation]
3. [Third recommendation]

### Revised Estimates
- **Team Size**: [Original] → [Revised]
- **Timeline**: [Original] → [Revised]
- **Budget**: [Original] → [Revised]
```

---

## Sources & References

- [Accenture Program, Project & Service Management](https://www.accenture.com/in-en/services/software-engineering/program-project-service-management)
- [Accenture Delivery Methods (ADM)](https://studylib.net/doc/25260207/accenture)
- [AWS MLOps Checklist](https://docs.aws.amazon.com/prescriptive-guidance/latest/mlops-checklist/introduction.html)
- [AWS GenAI Production Readiness Guide](https://repost.aws/articles/ARUO5V8swCRSOso9VwO2KxOg/building-enterprise-grade-generative-ai-applications-the-complete-production-readiness-guide)
- [PMI Change Control Best Practices](https://www.pmi.org/learning/library/scope-control-projects-you-6972)
- [UAT Testing Best Practices](https://www.altexsoft.com/blog/user-acceptance-testing/)

---

**Template Version**: 1.0
**Maintained By**: Signal Forge
**Classification**: Internal Use
