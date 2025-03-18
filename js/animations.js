/**
 * animations.js - 스크롤 기반 애니메이션 및 시각 효과
 * 
 * 심리학적 영향:
 * 1. 시각적 주목도 향상으로 핵심 정보 강조
 * 2. 순차적 정보 공개로 관심 유지
 * 3. 보상 체계 유발로 스크롤 동기 부여
 * 4. 몰입감 향상으로 이탈률 감소
 */

document.addEventListener('DOMContentLoaded', function() {
    // 애니메이션 대상 요소
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    const scaleElements = document.querySelectorAll('.scale-in');
    const numberCounters = document.querySelectorAll('.number-counter');
    
    // 섹션별 요소 애니메이션
    const investmentCards = document.querySelectorAll('.investment-card');
    const locationFeatures = document.querySelectorAll('.feature-card');
    const safetyItems = document.querySelectorAll('.safety-item');
    const facilityCards = document.querySelectorAll('.facility-card');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // 네비게이션 스크롤 효과
    const mainNav = document.querySelector('.main-nav');
    
    // 헤더 패럴랙스 효과
    const header = document.querySelector('.main-header');
    const headerContent = document.querySelector('.header-content');
    
    // Intersection Observer 설정
    const observerOptions = {
      root: null, // 뷰포트 기준
      rootMargin: '0px',
      threshold: 0.15 // 15% 이상 보일 때 트리거
    };
    
    // 기본 페이드인 애니메이션 처리
    if (fadeElements.length > 0) {
      const fadeObserver = new IntersectionObserver(handleFadeIntersection, observerOptions);
      
      fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transform = 'translateY(20px)';
        fadeObserver.observe(element);
      });
    }
    
    // 슬라이드인 애니메이션 처리
    if (slideElements.length > 0) {
      const slideObserver = new IntersectionObserver(handleSlideIntersection, observerOptions);
      
      slideElements.forEach(element => {
        const direction = element.dataset.direction || 'left';
        
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        switch(direction) {
          case 'left':
            element.style.transform = 'translateX(-50px)';
            break;
          case 'right':
            element.style.transform = 'translateX(50px)';
            break;
          case 'up':
            element.style.transform = 'translateY(50px)';
            break;
          case 'down':
            element.style.transform = 'translateY(-50px)';
            break;
        }
        
        slideObserver.observe(element);
      });
    }
    
    // 스케일인 애니메이션 처리
    if (scaleElements.length > 0) {
      const scaleObserver = new IntersectionObserver(handleScaleIntersection, observerOptions);
      
      scaleElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transform = 'scale(0.8)';
        scaleObserver.observe(element);
      });
    }
    
    // 숫자 카운터 애니메이션 처리
    if (numberCounters.length > 0) {
      const counterObserver = new IntersectionObserver(handleCounterIntersection, observerOptions);
      
      numberCounters.forEach(counter => {
        counter.textContent = '0';
        counterObserver.observe(counter);
      });
    }
    
    // 투자 카드 애니메이션
    if (investmentCards.length > 0) {
      const cardsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // 순차적으로 나타나는 애니메이션
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, index * 200); // 각 카드마다 200ms 딜레이
            
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      investmentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        cardsObserver.observe(card);
      });
    }
    
    // 아이템 애니메이션을 위한 일반 함수
    function setupSectionAnimation(elements, delay = 150) {
      if (elements.length === 0) return;
      
      const itemsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, index * delay);
            
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      elements.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        itemsObserver.observe(item);
      });
    }
    
    // 각 섹션 요소에 애니메이션 적용
    setupSectionAnimation(locationFeatures, 200);
    setupSectionAnimation(safetyItems, 150);
    setupSectionAnimation(facilityCards, 200);
    setupSectionAnimation(testimonialItems, 300);
    setupSectionAnimation(faqItems, 100);
    
    // 네비게이션 스크롤 효과
    if (mainNav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          mainNav.classList.add('scrolled');
        } else {
          mainNav.classList.remove('scrolled');
        }
      });
    }
    
    // 헤더 패럴랙스 효과
    if (header && headerContent) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < window.innerHeight) {
          const translateY = scrollPosition * 0.4;
          headerContent.style.transform = `translateY(${translateY}px)`;
          
          // 배경 이미지 패럴랙스 (스크롤에 따라 위로 이동)
          header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
      });
    }
    
    // 실제 이미지 로드 처리
    loadRealImages();
    
    /**
     * 페이드인 인터섹션 핸들러
     */
    function handleFadeIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 들어왔을 때
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          // 한 번 애니메이션이 실행된 후 관찰 중단
          observer.unobserve(entry.target);
        }
      });
    }
    
    /**
     * 슬라이드인 인터섹션 핸들러
     */
    function handleSlideIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 들어왔을 때
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate(0, 0)';
          }, 100);
          
          // 한 번 애니메이션이 실행된 후 관찰 중단
          observer.unobserve(entry.target);
        }
      });
    }
    
    /**
     * 스케일인 인터섹션 핸들러
     */
    function handleScaleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 들어왔을 때
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
          }, 100);
          
          // 한 번 애니메이션이 실행된 후 관찰 중단
          observer.unobserve(entry.target);
        }
      });
    }
    
    /**
     * 숫자 카운터 인터섹션 핸들러
     */
    function handleCounterIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = parseInt(counter.getAttribute('data-duration') || '2000', 10);
          
          // 역동적인 카운터 애니메이션
          animateCounter(counter, 0, target, duration);
          
          // 한 번 애니메이션이 실행된 후 관찰 중단
          observer.unobserve(counter);
        }
      });
    }
    
    /**
     * 숫자 카운터 애니메이션 함수
     */
    function animateCounter(element, start, end, duration) {
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        element.textContent = current.toLocaleString();
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          element.textContent = end.toLocaleString();
          clearInterval(timer);
        }
      }, stepTime);
    }
    
    /**
     * 실제 이미지 로드 함수
     */
    function loadRealImages() {
      const placeholders = document.querySelectorAll('.image-placeholder[data-img-src]');
      
      placeholders.forEach(placeholder => {
        const imgSrc = placeholder.getAttribute('data-img-src');
        
        if (!imgSrc) return;
        
        // 이미지 객체 생성 및 로드
        const img = new Image();
        img.src = imgSrc;
        
        img.onload = function() {
          // 플레이스홀더를 실제 이미지로 교체
          if (placeholder.parentElement.classList.contains('header-image-container')) {
            // 헤더 배경 이미지인 경우
            img.classList.add('header-bg-image');
            placeholder.parentElement.appendChild(img);
            
            // 페이드인 효과
            setTimeout(() => {
              img.classList.add('loaded');
              placeholder.style.display = 'none';
            }, 100);
          } else {
            // 일반 이미지인 경우
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            
            // 이미지에 애니메이션 적용
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-out';
            
            placeholder.parentElement.appendChild(img);
            
            // 페이드인 효과
            setTimeout(() => {
              img.style.opacity = '1';
              placeholder.style.display = 'none';
            }, 100);
          }
        };
        
        img.onerror = function() {
          // 이미지 로드 실패 시 플레이스홀더 유지
          console.error('Failed to load image:', imgSrc);
        };
      });
    }
  });
  
  // CSS 스타일 주입 (애니메이션 클래스)
  const style = document.createElement('style');
  style.textContent = `
    .animated {
      opacity: 1 !important;
      transform: translate(0, 0) !important;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .staggered-animation > * {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
  `;
  
  document.head.appendChild(style);