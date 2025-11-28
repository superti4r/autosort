const REFRESH_RATE_PREDICTION = 800;
const REFRESH_RATE_TELEMETRY = 2000;

const COLORS = {
  primary: "rgb(80, 60, 50)",
  grid: "rgba(0, 0, 0, 0.05)",
  text: "rgba(0, 0, 0, 0.5)",
  success: { bg: "rgba(101, 163, 13, 0.7)", border: "rgba(101, 163, 13, 1)" },
  warning: { bg: "rgba(234, 179, 8, 0.7)", border: "rgba(234, 179, 8, 1)" },
  danger: { bg: "rgba(220, 38, 38, 0.7)", border: "rgba(220, 38, 38, 1)" },
};

Chart.defaults.font.family = "'Geist Mono', monospace";
Chart.defaults.font.size = 10;
Chart.defaults.color = COLORS.text;

let gradeChart, activityChart;

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  setInterval(fetchPrediction, REFRESH_RATE_PREDICTION);
  setInterval(fetchTelemetry, REFRESH_RATE_TELEMETRY);
});

function initCharts() {
  const ctxGrade = document.getElementById("gradeChart").getContext("2d");
  gradeChart = new Chart(ctxGrade, {
    type: "bar",
    data: {
      labels: ["A", "B", "C"],
      datasets: [
        {
          label: "Count",
          data: [0, 0, 0],
          backgroundColor: [
            COLORS.success.bg,
            COLORS.warning.bg,
            COLORS.danger.bg,
          ],
          borderRadius: 6,
          barPercentage: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: COLORS.grid, borderDash: [4, 4] },
          border: { display: false },
        },
        x: { grid: { display: false }, border: { display: false } },
      },
    },
  });

  const ctxActivity = document.getElementById("activityChart").getContext("2d");
  activityChart = new Chart(ctxActivity, {
    type: "line",
    data: {
      labels: Array(25).fill(""),
      datasets: [
        {
          label: "Confidence",
          data: Array(25).fill(0),
          borderColor: COLORS.primary,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "rgba(80, 60, 50, 0.2)");
            gradient.addColorStop(1, "rgba(80, 60, 50, 0)");
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          grid: { color: COLORS.grid, borderDash: [4, 4] },
          border: { display: false },
          ticks: { callback: (v) => v + "%" },
        },
        x: { display: false },
      },
      animation: false,
    },
  });
}

function addDataToChart(chart, dataPoint) {
  chart.data.datasets[0].data.push(dataPoint);
  chart.data.datasets[0].data.shift();
  chart.update();
}

async function fetchPrediction() {
  try {
    const response = await fetch("/prediction/current");
    const data = await response.json();

    const ui = {
      grade: document.getElementById("grade-display"),
      conf: document.getElementById("confidence-display"),
      bar: document.getElementById("confidence-bar"),
      circle: document.getElementById("grade-circle"),
      glow: document.getElementById("glow-bg"),
      badge: document.getElementById("timestamp-badge"),
    };

    let currentConf = 0;

    if (data.label && data.label !== "None") {
      ui.grade.innerText = data.label;
      if (data.probs) currentConf = (data.probs[data.label] * 100).toFixed(1);

      ui.conf.innerText = `${currentConf}%`;
      ui.bar.style.width = `${currentConf}%`;
      ui.badge.innerText = new Date().toLocaleTimeString("id-ID", {
        hour12: false,
      });

      let color = "",
        bg = "";
      if (data.label === "A") {
        color = "var(--chart-success)";
        bg = "rgba(101, 163, 13, 0.15)";
      } else if (data.label === "B") {
        color = "var(--chart-warning)";
        bg = "rgba(234, 179, 8, 0.15)";
      } else {
        color = "var(--chart-danger)";
        bg = "rgba(220, 38, 38, 0.15)";
      }

      ui.grade.style.color = color;
      ui.bar.style.backgroundColor = color;
      ui.bar.style.boxShadow = `0 0 10px ${color}`;
      ui.circle.style.borderColor = color;
      ui.circle.style.backgroundColor = bg;
      ui.grade.style.opacity = "1";
      ui.glow.style.backgroundColor = color;
      ui.glow.style.opacity = "0.2";
    } else {
      currentConf = 0;
    }
    addDataToChart(activityChart, currentConf);
  } catch (e) {
    console.error(e);
  }
}

async function fetchTelemetry() {
  try {
    const response = await fetch("/telemetry");
    const data = await response.json();
    if (data) {
      const updateText = (id, val) => {
        if (val !== undefined) document.getElementById(id).innerText = val;
      };
      updateText("stat-total", data.number);
      updateText("stat-a", data.a_count);
      updateText("stat-b", data.b_count);
      updateText("stat-c", data.c_count);

      if (gradeChart && data.a_count !== undefined) {
        gradeChart.data.datasets[0].data = [
          data.a_count,
          data.b_count,
          data.c_count,
        ];
        gradeChart.update();
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function controlMotor(action) {
  const statusEl = document.getElementById("motor-status");
  statusEl.innerHTML = `<span class="animate-pulse text-primary font-bold">Tunggu...</span>`;
  try {
    const response = await fetch(`/control/motor/${action}`, {
      method: "POST",
    });
    const result = await response.json();
    if (result.status === "success") {
      const color = action === "start" ? "text-green-600" : "text-red-600";
      statusEl.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-current ${color} inline-block mr-1"></span> <span class="${color} font-bold">${
        action === "start" ? "Berjalan" : "Berhenti"
      }</span>`;
    } else {
      statusEl.innerHTML = `<span class="text-red-600 font-bold">Gagal</span>`;
    }
  } catch (e) {
    statusEl.innerHTML = `<span class="text-red-600 font-bold">Error</span>`;
  }
}
