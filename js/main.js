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
          backgroundColor: "hsl(10, 79%, 64%)",
          // borderColor: "rgb(255, 99, 132)",
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
        },
      },
    };
    new Chart(document.getElementById("chart"), config);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
