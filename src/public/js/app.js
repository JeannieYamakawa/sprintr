$(document).ready(function() {
  var ctx = $("#leaderboardTeamChart");
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["Robert", "Jeannie", "Tim", "Chris", "Taylor", "Louis"],
      datasets: [{
        label: 'Time in minutes',
        data: [20, 19, 15, 14, 12, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }]
      }
    }
  });

  var donut = $("#leaderboardDonutChart");

  var data = {
    labels: [
      "www.facebook.com",
      "www.google.com"
    ],
    datasets: [{
      data: [40, 50],
      backgroundColor: [
        "#FF6384",
        "#36A2EB"
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB"
      ]
    }]
  };

  var myDoughnutChart = new Chart(donut, {
    type: 'doughnut',
    data: data
  });

});
