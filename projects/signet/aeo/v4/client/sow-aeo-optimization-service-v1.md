**STATEMENT OF WORK XX-XXX – AEO OPTIMIZATION SERVICE**

This Statement of Work XX-XXX ("SOW") is entered into as of [DATE] ("Effective Date") by and between Accenture International Limited ("Accenture") and Signet Group Services US Inc. ("Signet" or "Client") (each, a "Party" and collectively, the "Parties"). This SOW is governed by the terms of that certain Master Services Agreement ("MSA") entered into as of February 19, 2015, as amended, and the Novation and Assignment agreement entered into as of October 1, 2019, as amended (together with the MSA, the "Agreement"). All capitalized terms used but not defined herein shall have the meanings set forth in the Agreement. In the event of conflict between the Agreement and this SOW, the Agreement shall prevail unless the SOW expressly sets forth the provision of the Agreement with which it is inconsistent.

**1. Background and Objectives**

Signet seeks to establish automated Answer Engine Optimization (AEO) capabilities to improve the discoverability and visibility of Kay.com content across Large Language Model (LLM) platforms including ChatGPT, Perplexity, Google AI Overviews, and similar AI-powered search experiences. This engagement will deliver a fully automated pipeline that ingests Profound visibility data, stores and indexes content in a vector database for semantic search, uses a Bedrock Agent with RAG capabilities to generate context-aware content optimization recommendations, and exports recommendations to Infoverity for PIM updates. ("Project").

**2. Scope of Services**

**A. In Scope Services**

Accenture shall provide to Signet the following services ("Services") to support the Project.

- Configuration of Amazon OpenSearch to serve as vector store for semantic search
- Amazon S3 Data Bucket setup for raw and processed data storage
- Creation of S3 to OpenSearch integration with Titan embeddings
- Lambda functions for data ingestion from ESI Team delivery
- Amazon Bedrock Agent implementation with Claude model
- RAG (Retrieval Augmented Generation) retrieval chain architecture
- Tool definitions for query, analyze, and recommend functions
- LLM prompt engineering and tuning for recommendation quality
- API Gateway setup for agent invocation
- Inbound API specification for ESI Team data delivery to S3
- Outbound API schema definition for Infoverity consumption
- End-to-end integration testing and validation
- Project governance and status reporting
- Knowledge transfer and documentation
- Management of Accenture resources

**B. Out of Scope**

The following services are outside of the Services provided by Accenture under this SOW:

- Frontend development or UI modifications
- Profound configuration, licensing, or prompt taxonomy design
- ESI Team integration development (Signet responsibility)
- Infoverity integration development (Signet responsibility)
- PIM/Informatica 360 customizations
- Content strategy or content creation
- AEO Strategist or Content Strategist roles (Signet internal resources)
- Configuration beyond basic Bedrock Agent setup (no custom Agentcore Gateway)
- Observability layers beyond default AWS logging; custom monitoring or advanced logging solutions
- Security and penetration testing
- Performance/load testing beyond functional validation
- ADA implications (no ADA/accessible design remediation is included in this pilot)
- Overall program management beyond this engagement
- Management of organizational change or impact due to the Project
- Coordination with any other vendors and/or third parties outside of defined integration boundaries

**3. Representatives**

In accordance with Section 1.2 of the MSA, each Party designates the following Representative:

Signet Representative: [NAME]

Accenture Representative: [NAME]

**4. Deliverables**

The following deliverables ("Deliverables") will be produced during the course of this SOW:

| # | Deliverable | Deliverable Description | Accenture | Signet | Format / Tool | Due Date |
|---|-------------|------------------------|-----------|--------|---------------|----------|
| 1 | Project Plan | Project Plan outlining schedule of Accenture owned deliverables and third-party dependencies | Primary | Assist | Excel | Week 1 |
| 2 | Status Report | Document to track Project health on a weekly basis | Primary | Assist | PowerPoint | Weekly |
| 3 | Solution Architecture | High-level design and key architectural decisions | Primary | Assist | Confluence | Week 2 |
| 4 | Data Pipeline | Automated S3 to OpenSearch ingestion with Titan embeddings | Primary | Assist | AWS/Bitbucket | Week 5 |
| 5 | Bedrock Agent | RAG-enabled recommendation engine with tuned prompts | Primary | Assist | AWS/Bitbucket | Week 9 |
| 6 | Inbound API Specification | API schema for ESI Team data delivery to S3 | Primary | Assist | OpenAPI | Week 3 |
| 7 | Outbound API Schema | Integration specification for Infoverity consumption | Primary | Assist | OpenAPI | Week 8 |

*The Party with "Primary" responsibility shall have the obligation of completing the Deliverable and directing the Party with "Assist" responsibility. The Party with "Assist" responsibility shall assist the Party with "Primary" responsibility.

The acceptance criteria for the Deliverables shall be compliance to the Deliverable description set forth in the table above based on prevailing industry standards, or such other acceptance criteria as the Parties may agree to in writing subject to a Change Request (defined below). The only basis for acceptance of Deliverables will be material compliance to such description or acceptance criteria, in accordance with the acceptance procedures in Section 1.5 of the Agreement.

**5. Location and Timing**

**A. Location**

The Services under this SOW will be performed remotely by the Accenture resources.

**B. Timing**

Accenture shall perform the Services from 01/05/25 through 03/28/25.

Below is a high-level summary of the planned timeline:

| Phase | Duration | Dates | Key Activities |
|-------|----------|-------|----------------|
| Foundation | Weeks 1-2 | Jan 5 - Jan 17 | Architecture design, AWS setup, kickoff |
| Data Pipeline | Weeks 3-5 | Jan 20 - Feb 7 | Lambda functions, S3, OpenSearch, embeddings |
| AI Agent Development | Weeks 6-9 | Feb 10 - Mar 7 | Bedrock Agent, RAG chain, LLM tuning |
| Integration & Testing | Weeks 8-10 | Feb 24 - Mar 14 | End-to-end testing, integration validation |
| Pilot Execution | Weeks 10-12 | Mar 3 - Mar 28 | Live pilot, monitoring, readout preparation |

**6. Signet Responsibilities**

In addition to any other responsibilities of Signet expressly described in this SOW, set forth below is a list of the obligations for which Signet will be responsible (collectively "Signet's Obligations"). Accenture will promptly notify Signet in writing if Accenture believes that Signet has failed to meet any Signet Obligations or if any of the Assumptions listed in Section 7 below are materially inaccurate. The notice shall include a detailed description of the impact to the schedule and/or cost of performing the Services. Accenture shall provide any support reasonably requested by Signet. Upon Signet's request, Signet and Accenture shall negotiate in good faith a Change Request (as defined below) to the SOW to address the impact to the SOW.

- Signet shall designate a Project Lead or Program Manager ("Signet PM") responsible for coordinating Signet-provided AEO Strategist and Content Strategist resources, participating in joint governance and status reporting, and serving as primary escalation point for Signet-side delivery risks. Estimated effort: 0.5 FTE for duration of engagement.
- Signet shall provide internal AEO/Data Strategist resource (~156 hours) for Profound prompt taxonomy (400 prompts), competitor identification, SOV analysis, and data interpretation.
- Signet shall provide internal Content Strategist resource (~126 hours) for content gap prioritization, brand guidelines, recommendation review, and PIM coordination.
- Signet will provide AWS account access and permissions by Week 1.
- Signet will provide Profound API credentials and access by Week 1.
- Signet will provide PIM API documentation by Week 3.
- Signet will provide brand and content guidelines by Week 4.
- ESI Team shall deliver Profound data to AWS S3 per Accenture-provided specifications by Week 3.
- Infoverity shall provide API schema and access for integration build by Week 6; consume recommendation output via API per Accenture-provided schema during pilot (Weeks 10-12).
- Signet will provide connectivity with Signet's infrastructure as reasonably necessary for Accenture resources to interface with Signet infrastructure to perform the Services.
- Signet shall set overall direction for the Project (i.e., make choices on direction, options, and priorities).
- Signet shall be responsible for ensuring that other contractors or vendors engaged by Signet in connection with the Project reasonably cooperate with Accenture.
- Signet shall be responsible for determining whether to use or refrain from using any recommendation that may be made by Accenture. Signet will be solely responsible for determining whether any Services provided by Accenture (i) meet Signet's requirements; (ii) comply with all laws and regulations applicable to Signet; and (iii) comply with Signet's applicable internal guidelines and any other agreements it has with third parties.

**7. Assumptions**

Below is a list of assumptions for this SOW ("Assumptions").

- Signet acknowledges and agrees that Accenture personnel will be working remotely. The Parties will work together to accommodate any changes or impacts to the Services or Deliverables (or delivery thereof) that are reasonably required to mitigate any impact of, or related to, any global or local health emergency or disease outbreak, including COVID-19 or such similar disease, and shall document the same in an agreed upon Change Request or amendment to the Agreement.
- Signet provides AEO Strategist and Content Strategist resources by Week 2.
- Signet provides a PM or Project Lead (~0.5 FTE) to coordinate Signet-provided resources and interface with Accenture delivery team by Week 1.
- AWS account, OpenSearch, and S3 will be accessible and available for integration development and testing at the beginning of the Project. Any routine maintenance or planned downtime will be communicated before project start date as input to the project plan. Any delays caused by inaccessibility or unannounced downtime may cause additional fees.
- Profound API access is confirmed and stable.
- ESI Team is available to implement inbound data integration per Accenture specifications by Week 3.
- Infoverity team is available to provide API schema by Week 6 and implement outbound data consumption per Accenture specifications by Week 10.
- PIM integration scope is limited to API specifications; no custom PIM development is included.
- LLM prompt tuning is based on Signet strategist feedback; Accenture will perform up to three (3) iteration cycles during the engagement.
- Pilot execution will focus on mutually agreed product categories; scope expansion requires Change Request.

**8. Accenture Responsibilities**

- Accenture will not perform any legal, fiscal, finance, or accounting considerations and/or recommendations. The Services do not constitute any risk identification, drawing, documentation, control tests and analysis of compliance related to Sarbanes-Oxley or any other similar national or international regulatory act/law.
- Accenture will adhere to Signet's site and other policies provided in advance to Accenture while accessing Signet's networks. If Signet revises any of the foregoing policies after the SOW Effective Date, Signet shall notify Accenture of the revisions that apply to Accenture. If such revisions have a material impact to the time or resources required by Accenture to complete the Services or the Total Fee (as defined below), Accenture will promptly object by notifying Signet in writing (and providing any support reasonably requested by Signet). Upon Signet's request, Signet and Accenture shall negotiate in good faith a Change Request to the SOW. Accenture will not be in breach of this SOW or the Agreement for its failure to comply with an objected to policy revision unless such policy revision was accepted by Accenture in a Change Request.
- If Signet inadvertently provides Accenture with access to Signet Personal Data, Accenture will comply with the terms of the Agreement including, without limitation, the requirements of Amendment 1 to the Agreement dated October 26, 2018, Processing of PII.
- The Accenture resources will remain engaged or employed by Accenture or its affiliated entities, as the case might be, and all employment-related decisions and legal obligations related to the Accenture resources will remain with Accenture or its affiliated entities, as the case might be.
- Accenture confirms that Accenture resources shall possess the relevant qualifications, skills and experience to be reasonably expected of any person providing the Service for which they shall be responsible in their designated role.
- If an Accenture resource is unable to complete their intended period of engagement, then Accenture will provide a suitable replacement for the Accenture resource in a reasonable timeframe, which replacement shall be subject to Signet's approval.
- On at least a weekly basis, Accenture shall update Signet on its progress in completing the Services and the Deliverables within the terms of this SOW.

**9. Financial Agreements**

Accenture will provide the Services and Deliverables described herein on a time and materials basis in accordance with the rate card set out in Appendix A for a total estimated fee of $237,716 ("Total Fee"). Any actual fees in excess of the Total Fee must be pre-approved by Signet via a Change Request. Signet shall have no obligation to pay actual fees in excess of the Total Fee that were not pre-approved by Signet via a Change Request. All fees set forth herein are in United States Dollars.

The Total Fee is Accenture's good faith approximation based on discussions and on the information provided to Accenture as of the date of this SOW. Accenture acknowledges it has had the opportunity to perform diligence to the scope and size of the Services contemplated herein. Accenture will work with Signet to help manage the scope of Accenture's Services within the Total Fee. Notwithstanding the foregoing, Accenture will promptly notify Signet in writing (and provide any support reasonably requested by Signet), if it believes Accenture will be unable to complete all Services and Deliverables in this SOW on time and/or within the Total Fee due to a material inaccuracy in the information provided to Accenture or other causes outside of Accenture's control. Upon Signet's request, Signet and Accenture shall negotiate in good faith a Change Request to the SOW. If following such negotiations, a Change Request is not executed by the Parties, Accenture will not be required to complete any remaining Services hereunder, without penalty.

Accenture shall invoice Signet based on actual hours worked by each of the Accenture resources. For the purposes of this SOW, a standard work day for Accenture resources working within the United States will consist of eight (8) hours of work per day, Monday through Friday, during Accenture's normal business hours within the United States.

**10. Change Requests**

The Parties may change the scope of the Services and Deliverables and other matters specified in a SOW only by a written amendment executed by an authorized representative of each Party (a "Change Request", also referred to as a "Change Order" in the MSA).

*     *     *     *     *

Agreed and accepted:                                          Agreed and accepted:

**ACCENTURE INTERNATIONAL LIMITED**          **SIGNET GROUP SERVICES US INC.**

By ________________________________          By ________________________________

Name ______________________________          Name ______________________________

Title _______________________________          Title _______________________________

Date _______________________________          Date _______________________________

---

**Appendix A: Rate Card and Resource Summary**

**Rate Card**

| Role | Rate Card Tier | Location | Rate | Hours | Fees |
|------|---------------|----------|------|-------|------|
| Lead Architect | Senior Manager | US | $382 | 284 | $108,488 |
| AI Engineer | Manager | US | $382 | 184 | $70,288 |
| Delivery Lead / PM | Senior Manager | US | $421 | 140 | $58,940 |
| **Total** | | | | **608** | **$237,716** |

**Resource Summary by Phase**

| Phase | Weeks | Lead Architect | AI Engineer | DL/PM | Total |
|-------|-------|----------------|-------------|-------|-------|
| Foundation | 1-2 | 64 | - | 24 | 88 |
| Data Pipeline | 3-5 | 72 | 64 | 28 | 164 |
| AI Agent | 6-9 | 72 | 96 | 36 | 204 |
| Integration & Testing | 8-10 | 44 | 16 | 12 | 72 |
| Pilot | 10-12 | 32 | 8 | 40 | 80 |
| **Total** | | **284** | **184** | **140** | **608** |
