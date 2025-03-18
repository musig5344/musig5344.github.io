document.addEventListener('DOMContentLoaded', function() {
  const chartFills = document.querySelectorAll('.chart-fill');
  
  chartFills.forEach(fill => {
    const percentage = parseFloat(fill.dataset.percentage);
    const widthPercentage = (percentage / 10) * 100;
    fill.style.width = `${widthPercentage}%`;
  });
}); 