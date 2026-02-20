---
title: "Predoc Placement"
date: 2026-02-16
plotly: true
---

<div class="tldr">
<strong>TL;DR</strong> System to analyze CVs from 15 top economics PhD programs. ~67% had predoc experience; Fed, NBER, and top business schools are the most common predoc institutions.
</div>


## Key Findings

<div class="data-summary">
<div class="summary-row"><span class="summary-label">Total Students Analyzed</span><span class="summary-value">100</span></div>
<div class="summary-row"><span class="summary-label">Universities Covered</span><span class="summary-value">15</span></div>
<div class="summary-row"><span class="summary-label">Students with Predoc Experience</span><span class="summary-value">67%</span></div>
<div class="summary-row"><span class="summary-label">Year Range</span><span class="summary-value">2018 - 2024</span></div>
</div>

### Predoc Experience is Common

Approximately two-thirds of students had predoc research experience before entering their PhD program.

<div class="viz-container">
<div class="viz-title">Predoc Distribution</div>
<div id="predoc-chart" class="viz-chart"></div>
</div>

### Top Predoc Institutions

Which predoc institutions place the most students into top PhD programs.

<div class="viz-container">
<div class="viz-title">Top 10 Predoc Institutions</div>
<div id="predoc-institutions-chart" class="viz-chart"></div>
</div>

### Distribution Across Programs

Students by current PhD program.

<div class="viz-container">
<div class="viz-title">Students by PhD Program</div>
<div id="programs-chart" class="viz-chart"></div>
</div>

### Admissions by Year

PhD start year distribution.

<div class="viz-container">
<div class="viz-title">Admissions by Year</div>
<div id="years-chart" class="viz-chart"></div>
</div>

## Code

[github.com/mwballif/phd-cv-analyzer](https://github.com/mwballif/phd-cv-analyzer) — scrapers, database, Streamlit dashboard, export/analysis tools.
