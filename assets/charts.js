/* Chart initialization for the integral content analysis page */
/* Loaded after Chart.js (Chart.js UMD must be loaded first in the page) */

(function() {
  const data = [
    { topic: 'Geopolitical strategy (Hormuz, Accords)', tier: 4.5, label: '4.5 Strategist' },
    { topic: 'Military operations (planning, execution)', tier: 3.5, label: '3.5 Achiever' },
    { topic: 'Aid → partnership pivot',                 tier: 3.5, label: '3.5 Achiever (packaged as 4.0+)' },
    { topic: 'Jewish–Arab regional future',             tier: 3.5, label: '3.5 Achiever' },
    { topic: 'Information / media war',                 tier: 3.2, label: '3.0–3.5 Expert / Achiever' },
    { topic: 'Oct 7 accountability',                    tier: 3.0, label: '3.0 Expert (procedural)' },
    { topic: 'Civilizational narrative',                tier: 2.5, label: '2.5 Conformist' },
    { topic: 'Anti-semitism explanation',               tier: 2.5, label: '2.5 Conformist' },
    { topic: 'Christian community in Israel',           tier: 2.5, label: '2.5 Conformist' },
    { topic: 'Adversary interior (Iran, Hamas)',        tier: 1.5, label: '1.5 Egocentric (collapsed)' },
  ];

  const colors = data.map(d => {
    if (d.tier >= 4.0) return '#2c5a3e';
    if (d.tier >= 3.5) return '#4a3d6e';
    if (d.tier >= 3.0) return '#7f6f3e';
    if (d.tier >= 2.5) return '#8a6a16';
    return '#7a2a1f';
  });

  const ctx = document.getElementById('stagesChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.topic),
      datasets: [{
        label: 'STAGES tier engaged',
        data: data.map(d => d.tier),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 2,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { left: 0, right: 16, top: 8, bottom: 8 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1f1d1a',
          titleFont: { family: 'Inter, sans-serif', size: 13, weight: '500' },
          bodyFont: { family: 'Inter, sans-serif', size: 12 },
          padding: 10,
          callbacks: {
            label: (ctx) => data[ctx.dataIndex].label
          }
        }
      },
      scales: {
        x: {
          min: 1, max: 5,
          grid: { color: 'rgba(31,29,26,0.06)' },
          ticks: {
            stepSize: 0.5,
            font: { family: 'Inter, sans-serif', size: 11 },
            color: '#76726b',
            callback: (v) => {
              const labels = {
                1.0: '1.0 Impulsive',
                1.5: '1.5 Egocentric',
                2.0: '2.0 Rule Oriented',
                2.5: '2.5 Conformist',
                3.0: '3.0 Expert',
                3.5: '3.5 Achiever',
                4.0: '4.0 Pluralist',
                4.5: '4.5 Strategist',
                5.0: '5.0 Construct Aware'
              };
              return labels[v] || '';
            }
          }
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: {
            font: { family: 'Iowan Old Style, Georgia, serif', size: 13 },
            color: '#1f1d1a',
            autoSkip: false
          }
        }
      }
    }
  });
})();

(function() {
  // Shared options helpers
  const sansFont = '-apple-system, BlinkMacSystemFont, Inter, sans-serif';
  const serifFont = 'Iowan Old Style, Georgia, serif';
  const tooltipBase = {
    backgroundColor: '#1f1d1a',
    titleFont: { family: sansFont, size: 13, weight: '500' },
    bodyFont: { family: sansFont, size: 12 },
    padding: 10
  };

  // ============================================================
  // 1. US public opinion on Israel — line chart (Pass 2)
  // ============================================================
  const opinionEl = document.getElementById('opinionChart');
  if (opinionEl) {
    new Chart(opinionEl, {
      type: 'line',
      data: {
        labels: ['2013', '2017', '2019', '2022 (pre-Oct 7)', '2024', '2025'],
        datasets: [{
          label: '% unfavorable view of Israel (US adults)',
          data: [37, 38, 41, 42, 53, 60],
          borderColor: '#7a2a1f',
          backgroundColor: 'rgba(122, 42, 31, 0.08)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#7a2a1f',
          tension: 0.25,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 16, right: 20, bottom: 8, left: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: { label: (ctx) => ctx.parsed.y + '% unfavorable' }
          })
        },
        scales: {
          x: {
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: { font: { family: sansFont, size: 11 }, color: '#76726b' }
          },
          y: {
            min: 30, max: 70,
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: {
              font: { family: sansFont, size: 11 },
              color: '#76726b',
              callback: (v) => v + '%'
            }
          }
        }
      }
    });
  }

  // ============================================================
  // 2. Fact-check verdict distribution — stacked horizontal bar
  // ============================================================
  const verdictEl = document.getElementById('verdictChart');
  if (verdictEl) {
    const verdictData = [
      { label: 'Plausible (1)',                color: '#2c5a3e', count: 1 },
      { label: 'Partly true (2)',              color: '#7f6f3e', count: 2 },
      { label: 'Contested (1)',                color: '#8a6a16', count: 1 },
      { label: 'Misleading (2)',               color: '#a3401f', count: 2 },
      { label: 'Contradicts US intelligence (1)', color: '#7a2a1f', count: 1 },
      { label: 'Unverifiable (2)',             color: '#76726b', count: 2 },
    ];
    new Chart(verdictEl, {
      type: 'bar',
      data: {
        labels: ['Nine fact-checked claims'],
        datasets: verdictData.map(d => ({
          label: d.label,
          data: [d.count],
          backgroundColor: d.color,
          borderWidth: 0,
          barThickness: 36
        }))
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 8, right: 16, bottom: 8, left: 0 } },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: sansFont, size: 12 },
              color: '#4a4742',
              boxWidth: 12, boxHeight: 12, padding: 12,
              usePointStyle: false
            }
          },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: { label: (ctx) => ctx.dataset.label }
          })
        },
        scales: {
          x: {
            stacked: true, min: 0, max: 9,
            grid: { display: false },
            ticks: {
              font: { family: sansFont, size: 11 },
              color: '#76726b',
              stepSize: 1
            }
          },
          y: { stacked: true, grid: { display: false }, ticks: { display: false } }
        }
      }
    });
  }

  // ============================================================
  // 3. Iran nuclear timeline — bar chart (Fact-check #1)
  // ============================================================
  const nuclearEl = document.getElementById('nuclearChart');
  if (nuclearEl) {
    new Chart(nuclearEl, {
      type: 'bar',
      data: {
        labels: [
          'Trump administration: "two weeks"',
          'Netanyahu: "a month or two"',
          'US IC pre-strike (Reuters, IC assessment)',
          'FDD post-strike estimate',
          'DNI Gabbard, March 2026 testimony'
        ],
        datasets: [{
          label: 'Months until potential nuclear weapon',
          data: [0.5, 1.5, 10, 30, 0],
          backgroundColor: ['#7a2a1f', '#7a2a1f', '#8a6a16', '#2c5a3e', '#2c5a3e'],
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 8, right: 80, bottom: 8, left: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: {
              label: (ctx) => {
                if (ctx.dataIndex === 4) return 'No active program — not building a weapon';
                return ctx.parsed.x + ' month' + (ctx.parsed.x === 1 ? '' : 's');
              }
            }
          })
        },
        scales: {
          x: {
            min: 0, max: 36,
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: {
              font: { family: sansFont, size: 11 },
              color: '#76726b',
              callback: (v) => v + ' mo'
            },
            title: {
              display: true, text: 'Months until potential nuclear weapon',
              font: { family: sansFont, size: 11 }, color: '#76726b'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: serifFont, size: 12 },
              color: '#1f1d1a',
              autoSkip: false
            }
          }
        }
      },
      plugins: [{
        id: 'gabbardLabel',
        afterDatasetsDraw(chart) {
          const meta = chart.getDatasetMeta(0);
          const bar = meta.data[4];
          if (!bar) return;
          const ctx = chart.ctx;
          ctx.save();
          ctx.font = '11px ' + sansFont;
          ctx.fillStyle = '#2c5a3e';
          ctx.textBaseline = 'middle';
          ctx.fillText('  No active program', bar.x, bar.y);
          ctx.restore();
        }
      }]
    });
  }

  // ============================================================
  // 4. Gaza civilian-to-combatant ratio comparison
  // ============================================================
  const gazaEl = document.getElementById('gazaChart');
  if (gazaEl) {
    const gazaData = [
      { label: 'Gaza — IDF public claim',          value: 58, isGaza: true },
      { label: 'Mosul 2016–17 (est.)',             value: 75, isGaza: false },
      { label: 'Aleppo 2012–16 (est.)',            value: 75, isGaza: false },
      { label: 'Iraq War overall, 2003–13',        value: 77, isGaza: false },
      { label: 'Second Chechen War (Grozny)',       value: 81, isGaza: false },
      { label: 'Gaza — Israeli internal (Aug 2025)', value: 83, isGaza: true },
      { label: 'Gaza — AOAV independent (Jan 2026)', value: 89, isGaza: true },
      { label: 'First Chechen War (Grozny)',        value: 90, isGaza: false }
    ];
    new Chart(gazaEl, {
      type: 'bar',
      data: {
        labels: gazaData.map(d => d.label),
        datasets: [{
          label: 'Civilian percentage of total deaths',
          data: gazaData.map(d => d.value),
          backgroundColor: gazaData.map(d => d.isGaza ? '#7a2a1f' : '#b4b2a9'),
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 8, right: 24, bottom: 8, left: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: { label: (ctx) => ctx.parsed.x + '% civilian' }
          })
        },
        scales: {
          x: {
            min: 0, max: 100,
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: {
              font: { family: sansFont, size: 11 },
              color: '#76726b',
              callback: (v) => v + '%'
            },
            title: {
              display: true, text: 'Civilian % of total deaths',
              font: { family: sansFont, size: 11 }, color: '#76726b'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: serifFont, size: 12 },
              color: '#1f1d1a',
              autoSkip: false
            }
          }
        }
      }
    });
  }

  // ============================================================
  // 5. Bethlehem Christian population over time
  // ============================================================
  const bethlehemEl = document.getElementById('bethlehemChart');
  if (bethlehemEl) {
    new Chart(bethlehemEl, {
      type: 'line',
      data: {
        labels: ['1947', '1967', '1990', '1998', '2007', '2017', '2025'],
        datasets: [{
          label: 'Christian % of Bethlehem population',
          data: [85, 75, 60, 40, 30, 12, 10],
          borderColor: '#7a2a1f',
          backgroundColor: 'rgba(122, 42, 31, 0.08)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#7a2a1f',
          tension: 0.25,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 24, right: 24, bottom: 8, left: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: { label: (ctx) => ctx.parsed.y + '% Christian' }
          })
        },
        scales: {
          x: {
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: { font: { family: sansFont, size: 11 }, color: '#76726b' }
          },
          y: {
            min: 0, max: 100,
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: {
              font: { family: sansFont, size: 11 },
              color: '#76726b',
              callback: (v) => v + '%'
            }
          }
        }
      },
      plugins: [{
        id: 'regimeLines',
        afterDatasetsDraw(chart) {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          const annotations = [
            { x: '1967', label: '1967  Israeli administration begins' },
            { x: '1990', label: '1995  Oslo handover to PA' }
          ];
          annotations.forEach(a => {
            const xPos = xAxis.getPixelForValue(a.x);
            ctx.save();
            ctx.strokeStyle = 'rgba(31,29,26,0.25)';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(xPos, yAxis.top);
            ctx.lineTo(xPos, yAxis.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '10px ' + sansFont;
            ctx.fillStyle = '#4a4742';
            ctx.textAlign = 'left';
            ctx.fillText(a.label, xPos + 4, yAxis.top + 10);
            ctx.restore();
          });
        }
      }]
    });
  }

  // ============================================================
  // 6. Cross-tier rhetorical positioning — paired bars (Pass 7)
  // ============================================================
  const crossEl = document.getElementById('crossTierChart');
  if (crossEl) {
    new Chart(crossEl, {
      type: 'bar',
      data: {
        labels: [
          'The war itself',
          'Aid → partnership pivot',
          'Oct 7 accountability',
          'Civilizational frame',
          'Adversary characterization'
        ],
        datasets: [
          {
            label: 'Substantive operation (actual STAGES tier)',
            data: [4.5, 3.5, 3.0, 2.5, 1.5],
            backgroundColor: '#7a2a1f',
            borderWidth: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.85
          },
          {
            label: 'Rhetorical packaging (presented as)',
            data: [4.5, 4.5, 4.0, 3.5, 3.0],
            backgroundColor: '#d4b8a0',
            borderWidth: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.85
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 8, right: 24, bottom: 8, left: 0 } },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              font: { family: sansFont, size: 12 },
              color: '#4a4742',
              boxWidth: 12, boxHeight: 12, padding: 14,
              usePointStyle: false
            }
          },
          tooltip: Object.assign({}, tooltipBase, {
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed.x;
                const labels = {
                  1.5: '1.5 Egocentric',
                  2.0: '2.0 Rule Oriented',
                  2.5: '2.5 Conformist',
                  3.0: '3.0 Expert',
                  3.5: '3.5 Achiever',
                  4.0: '4.0 Pluralist',
                  4.5: '4.5 Strategist'
                };
                return (labels[v] || v) + ' — ' + ctx.dataset.label;
              }
            }
          })
        },
        scales: {
          x: {
            min: 1, max: 5,
            grid: { color: 'rgba(31,29,26,0.06)' },
            ticks: {
              stepSize: 0.5,
              font: { family: sansFont, size: 10 },
              color: '#76726b',
              callback: (v) => {
                const labels = {
                  1.5: '1.5',
                  2.0: '2.0',
                  2.5: '2.5',
                  3.0: '3.0',
                  3.5: '3.5',
                  4.0: '4.0',
                  4.5: '4.5'
                };
                return labels[v] || '';
              }
            },
            title: {
              display: true, text: 'STAGES tier',
              font: { family: sansFont, size: 11 }, color: '#76726b'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: serifFont, size: 13 },
              color: '#1f1d1a',
              autoSkip: false
            }
          }
        }
      }
    });
  }
})();
