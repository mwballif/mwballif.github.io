---
title: "Predoc Placement (LaTeX)"
date: 2026-07-15
draft: False
latex: true
---

<div class="latex-body">
<!--l. 10--><p class="noindent" ><span 
class="ec-lmri-10x-x-109">TL;DR</span> <span 
class="ec-lmri-10x-x-109">A practice conversion of the</span>
<span 
class="ec-lmri-10x-x-109">predoc-placement post into LaTeX. System to</span>
<span 
class="ec-lmri-10x-x-109">analyze CVs from 15 top economics PhD</span>
<span 
class="ec-lmri-10x-x-109">programs: about two-thirds of students had</span>
<span 
class="ec-lmri-10x-x-109">predoc experience, and the Fed, NBER, and</span>
<span 
class="ec-lmri-10x-x-109">top business schools are the most common</span>
<span 
class="ec-lmri-10x-x-109">predoc institutions.</span>
<h3 class="sectionHead"><span class="titlemark">1   </span>   <a 
 id="x1-10001"></a>Key findings</h3>
<!--l. 14--><p class="noindent" >A CV-analysis pipeline covering 100
students across 15 economics PhD programs
(2018&#8211;2024) shows predoc experience is now
the norm rather than the exception.
<div class="table">
<!--l. 16--><p class="noindent" ><hr class="float"><div class="float" 
>
<div class="tabular">
 <table id="TBL-1" class="tabular" 
><colgroup id="TBL-1-1g"><col 
id="TBL-1-1"><col 
id="TBL-1-2"></colgroup><tr  
 style="vertical-align:baseline;" id="TBL-1-1-"><td  style="white-space:normal; text-align:left;" id="TBL-1-1-1"  
class="td01">Metric                                   </td><td  style="white-space:normal; text-align:right;" id="TBL-1-1-2"  
class="td10">     Value</td>
</tr><tr  
 style="vertical-align:baseline;" id="TBL-1-2-"><td  style="white-space:normal; text-align:left;" id="TBL-1-2-1"  
class="td01">Total students analyzed             </td><td  style="white-space:normal; text-align:right;" id="TBL-1-2-2"  
class="td10">       100</td>
</tr><tr  
 style="vertical-align:baseline;" id="TBL-1-3-"><td  style="white-space:normal; text-align:left;" id="TBL-1-3-1"  
class="td01">Universities covered                  </td><td  style="white-space:normal; text-align:right;" id="TBL-1-3-2"  
class="td10">        15</td>
</tr><tr  
 style="vertical-align:baseline;" id="TBL-1-4-"><td  style="white-space:normal; text-align:left;" id="TBL-1-4-1"  
class="td01">Students with predoc experience  </td><td  style="white-space:normal; text-align:right;" id="TBL-1-4-2"  
class="td10">      67%</td>
</tr><tr  
 style="vertical-align:baseline;" id="TBL-1-5-"><td  style="white-space:normal; text-align:left;" id="TBL-1-5-1"  
class="td01">Year range                              </td><td  style="white-space:normal; text-align:right;" id="TBL-1-5-2"  
class="td10"> 2018&#8211;2024</td>
</tr><tr  
 style="vertical-align:baseline;" id="TBL-1-6-"><td  style="white-space:normal; text-align:left;" id="TBL-1-6-1"  
class="td01">                            </td></tr></table>             </div>
<a 
 id="x1-1001r1"></a>
<br />                                      <div class="caption" 
><span class="id">
<span 
class="ec-lmbx-10">Table</span><span 
class="ec-lmbx-10">&#x00A0;1: </span></span><span  
class="content"><span 
class="ec-lmri-10">Summary statistics.</span>
</span></div><!--tex4ht:label?: x1-1001r1 -->
</div><hr class="endfloat" />
</div>
<h3 class="sectionHead"><span class="titlemark">2   </span>   <a 
 id="x1-20002"></a>Top predoc institutions</h3>
<!--l. 33--><p class="noindent" >The Federal Reserve Board and NBER are
the most common predoc placements,
followed closely by top business-school
research programs.
<!--l. 35--><p class="noindent" ><hr class="figure"><div class="figure" 
>
<!--l. 37--><p class="noindent" ><img 
src="/blog/predoc-placement-latex/0x.svg" alt="[Picture]" >
<a 
 id="x1-2001r1"></a>
<br />                                      <div class="caption" 
><span class="id">
<span 
class="ec-lmbx-10">Figure</span><span 
class="ec-lmbx-10">&#x00A0;1: </span></span><span  
class="content"><span 
class="ec-lmri-10">Number of admitted students who</span>
<span 
class="ec-lmri-10">completed a predoc at each institution.</span>
</span></div><!--tex4ht:label?: x1-2001r1 -->
<!--l. 63--><p class="noindent" ></div><hr class="endfigure">
<div class="marginpar">
<!--l. 65--><p class="noindent" ><span 
class="ec-lmr-9">Counts are admitted students who completed a</span>
<span 
class="ec-lmr-9">predoc at that institution before starting their PhD,</span>
<span 
class="ec-lmr-9">not total predoc positions offered.</span></div>
<h3 class="sectionHead"><span class="titlemark">3   </span>   <a 
 id="x1-30003"></a>Code</h3>
<!--l. 69--><p class="noindent" ><a 
href="https://github.com/mwballif/phd-cv-analyzer" >github.com/mwballif/phd-cv-analyzer</a> &#8212;
scrapers, database, Streamlit dashboard,
export/analysis tools.
</div>
