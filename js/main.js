const currentDate = new Date().getDay();
const dateIndex = currentDate !== 0 ? currentDate - 1 : 6;

const fetchData = async () => {
  try {
    const res = await fetch("./js/data.json");
    const data = await res.json();
    const chartData = {
      labels: data.map((item) => item.day),
      datasets: [
        {
          backgroundColor: data.map((_, idx) =>
            idx === dateIndex ? "hsl(186, 35%, 60%)" : "hsl(10, 79%, 64%)"
          ),
          hoverBackgroundColor: data.map((_, idx) =>
            idx === dateIndex ? "hsl(186, 49%, 80%)" : "hsl(10, 100%, 76%)"
          ),
          borderRadius: window.innerWidth < 476 ? 3 : 5,
          borderSkipped: "",
          data: data.map((item) => item.amount),
        },
      ],
    };
    const config = {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            position: "middle",
            yAlign: null,
            xAlign: "center",
            backgroundColor: "hsl(25, 47%, 15%)",
            bodyColor: "hsla(30, 100%, 98%)",
            bodyFont: {
              size: 18,
              family: "'DM Sans', sans-serif",
              weight: "bold",
            },
            cornerRadius: 5,
            displayColors: false,
            caretSize: 0,
            padding: { top: 9, right: 8, bottom: 7, left: 9 },
            bodyAlign: "left",
            callbacks: {
              title: () => null,
              label: (tooltipItem, data) => "$" + tooltipItem.raw,
            },
          },
        },
        scales: {
          x: {
            grid: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              color: "hsl(27, 10%, 52%)",
              font: { size: 12, family: "'DM Sans', sans-serif" },
            },
          },
          y: {
            display: false,
          },
        },
      },
    };
    new Chart(document.getElementById("chart"), config);
    Chart.Tooltip.positioners.middle = (elements) => {
      let x;
      let y;
      if (elements[0]) {
        let model = elements[0].element;
        x = model.x;
        y = model.y - 30;
      }
      return {
        x,
        y,
      };
    };
  } catch (err) {
    console.log(err);
  }
};

fetchData();
