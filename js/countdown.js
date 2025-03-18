/**
 * countdown.js - 투자자 긴급성 유발 카운트다운 타이머
 * 
 * 심리학적 영향:
 * 1. 희소성 효과 - 제한된 시간 내 결정을 유도
 * 2. FOMO(Fear Of Missing Out) - 기회 상실에 대한 두려움 활용
 * 3. 행동 유도 - 타이머가 완료되기 전 행동하도록 압박
 */

document.addEventListener('DOMContentLoaded', function() {
    // 카운트다운 타이머 요소
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const timerSection = document.querySelector('.countdown-timer');
    
    // 타이머가 존재하는지 확인
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
      return;
    }
    
    // 현재 날짜에서 14일 후를 마감일로 설정 (동적 마감일)
    const now = new Date();
    const deadline = new Date(now);
    deadline.setDate(now.getDate() + 14);
    
    // 쿠키에서 이전에 저장된 마감일 확인 (방문자별 일관성 유지)
    const savedDeadline = getCookie('investmentDeadline');
    if (savedDeadline) {
      deadline.setTime(parseInt(savedDeadline));
    } else {
      // 첫 방문 시 마감일 쿠키 저장 (30일간 유효)
      setCookie('investmentDeadline', deadline.getTime(), 30);
    }
    
    // 사용자가 이미 초기화면을 넘어갔는지 확인
    const hasScrolled = sessionStorage.getItem('hasScrolled');
    
    // 카운트다운 업데이트 함수
    function updateCountdown() {
      const now = new Date().getTime();
      const timeLeft = deadline.getTime() - now;
      
      // 마감일이 지났으면 타이머 재설정 (긴급성 유지)
      if (timeLeft < 0) {
        // 마감일 재설정 (7일 추가)
        const newDeadline = new Date();
        newDeadline.setDate(new Date().getDate() + 7);
        deadline.setTime(newDeadline.getTime());
        setCookie('investmentDeadline', newDeadline.getTime(), 30);
        return updateCountdown();
      }
      
      // 남은 시간 계산
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      // 타이머 표시 업데이트
      daysElement.textContent = formatNumber(days);
      hoursElement.textContent = formatNumber(hours);
      minutesElement.textContent = formatNumber(minutes);
      secondsElement.textContent = formatNumber(seconds);
      
      // 남은 시간이 적을 때 긴급성 강조 (3일 이하)
      if (days <= 3) {
        timerSection.classList.add('urgent');
        
        // 24시간 이하일 때 추가 강조
        if (days === 0 && hours <= 24) {
          timerSection.classList.add('very-urgent');
          
          // 스크롤 이벤트가 없었으면 자동 스크롤 유도 (첫 방문자에게만)
          if (!hasScrolled && document.documentElement.scrollTop < 100) {
            setTimeout(() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                sessionStorage.setItem('hasScrolled', 'true');
              }
            }, 5000); // 5초 후 CTA 섹션으로 자동 스크롤
          }
        }
      }
    }
    
    // 숫자 형식화 (10 미만이면 앞에 0 추가)
    function formatNumber(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    // 쿠키 설정 함수
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    }
    
    // 쿠키 가져오기 함수
    function getCookie(name) {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    }
    
    // 초기 업데이트 실행
    updateCountdown();
    
    // 1초마다 타이머 업데이트
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // 페이지를 떠날 때 인터벌 정리
    window.addEventListener('beforeunload', function() {
      clearInterval(countdownInterval);
    });
    
    // 방문자 행동 유도 - 사용자가 타이머를 본 후 일정 시간이 지나면 CTA 강조
    setTimeout(() => {
      const ctaButton = document.querySelector('.form-submit');
      if (ctaButton) {
        ctaButton.classList.add('highlight-cta');
        
        // 눈에 띄는 애니메이션 추가
        ctaButton.style.animation = 'pulse 1.5s infinite';
      }
    }, 30000); // 30초 후 CTA 버튼 강조
  });
  
  // 타이머 섹션 CSS 클래스를 위한 스타일 동적 추가
  const style = document.createElement('style');
  style.textContent = `
    .countdown-timer.urgent .time-unit {
      color: #FF6B6B;
      animation: pulse 1s infinite;
    }
    
    .countdown-timer.very-urgent .time-unit {
      color: #FF3333;
      animation: pulse 0.8s infinite;
    }
    
    .highlight-cta {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(212,175,55,0.5) !important;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);