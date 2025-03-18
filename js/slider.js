document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
    });

    const form = document.getElementById('consultationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('상담 신청이 완료되었습니다.');
    });

    // 카운트다운 타이머
    const countdownElement = document.getElementById('countdown-timer');
    let timeLeft = 12 * 60 * 60 + 34 * 60; // 12시간 34분 (초 단위)
    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${hours}시간 ${minutes}분 ${seconds}초`;
        timeLeft--;
        if (timeLeft < 0) timeLeft = 12 * 60 * 60 + 34 * 60; // 리셋
    }, 1000);

    // 후기 슬라이더 (간단한 예시)
    const testimonials = document.querySelectorAll('.testimonial-card');
    let current = 0;
    setInterval(() => {
        testimonials.forEach(t => t.style.display = 'none');
        testimonials[current].style.display = 'block';
        current = (current + 1) % testimonials.length;
    }, 5000);
});