// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hover Effect for New Service Items
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('hovered');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('hovered');
    });
});

function calculateRevenue() {
  let bookedCalls = document.getElementById('booked-calls').value || 50;
  let offerPrice = document.getElementById('offer-price').value || 5900;
  let showRate = document.getElementById('show-rate').value || 65;
  let offerRate = document.getElementById('offer-rate').value || 60;
  let closeRate = document.getElementById('close-rate').value || 20;

  let currentRevenue = (bookedCalls * (showRate / 100) * (offerRate / 100) * (closeRate / 100) * offerPrice).toFixed(2);
  let newRevenue15 = (currentRevenue * 1.15).toFixed(2);
  let newRevenue25 = (currentRevenue * 1.25).toFixed(2);

  document.getElementById('current-revenue').innerText = `$${currentRevenue}`;
  document.getElementById('new-revenue-15').innerText = `$${newRevenue15}`;
  document.getElementById('new-revenue-25').innerText = `$${newRevenue25}`;
}

document.querySelector('.youtube-button').addEventListener('click', function() {
    window.location.href = "your-youtube-link-here";
});

