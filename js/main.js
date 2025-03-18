/**
 * main.js - 메인 스크립트 (전체 초기화 및 공통 함수)
 * 
 * 주요 기능:
 * 1. 페이지 초기화 및 이벤트 리스너 설정
 * 2. 모바일 메뉴 토글
 * 3. 스무스 스크롤
 * 4. FAQ 토글
 * 5. 탭 메뉴 제어
 */

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    initMobileMenu();
    
    // 스무스 스크롤 초기화
    initSmoothScroll();
    
    // FAQ 토글 기능
    initFaqToggle();
    
    // 탭 메뉴 초기화
    initTabs();
    
    // 실제 이미지 로드
    initImageLoader();
    
    // 외부 링크 설정
    setupExternalLinks();
    
    // 페이지 로드 완료 효과
    pageLoadComplete();
    
    // 이메일 폼 검증 (선택적)
    if (document.querySelector('form')) {
      validateEmailForm();
    }
    
    // 개발자 콘솔 메시지
    console.log('%c더 프레스티지 평창', 'font-size:20px; color:#D4AF37; font-weight:bold;');
    console.log('%c프리미엄 실버타운 투자 랜딩페이지', 'font-size:12px; color:#2E5076;');
    
    // 차트 바 애니메이션
    const chartFills = document.querySelectorAll('.chart-fill');
    
    chartFills.forEach(fill => {
      const percentage = parseFloat(fill.dataset.percentage);
      const widthPercentage = (percentage / 10) * 100;
      
      // 스크롤에 따라 애니메이션 시작
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fill.style.width = `${widthPercentage}%`;
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(fill);
    });
  });
  
  /**
   * 모바일 메뉴 토글 초기화
   */
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // 활성화 시 메뉴 버튼 모양 변경
      const menuBars = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        menuBars[0].style.transform = 'translateY(9px) rotate(45deg)';
        menuBars[1].style.opacity = '0';
        menuBars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
      } else {
        menuBars[0].style.transform = 'none';
        menuBars[1].style.opacity = '1';
        menuBars[2].style.transform = 'none';
      }
    });
    
    // 모바일 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(event) {
      if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('active')) {
        mobileMenuBtn.click();
      }
    });
    
    // 모바일 메뉴 링크 클릭 시 자동 닫기
    const mobileLinks = navLinks.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          mobileMenuBtn.click();
        }
      });
    });
  }
  
  /**
   * 스무스 스크롤 초기화
   */
  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // 기본 동작 방지
        e.preventDefault();
        
        // 대상 요소 가져오기
        const targetId = this.getAttribute('href');
        
        // 페이지 상단인 경우 처리
        if (targetId === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // 스크롤 위치 계산 (헤더 높이 고려)
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // 스크롤 실행
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  /**
   * FAQ 토글 기능 초기화
   */
  function initFaqToggle() {
    // 모든 FAQ 질문에 직접 이벤트 리스너 추가 (이벤트 위임 대신)
    document.querySelectorAll('.faq-question').forEach(question => {
      // 각 질문에 직접 클릭 이벤트 추가
      question.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 버블링 방지
        
        // 해당 FAQ 아이템 찾기
        const faqItem = this.closest('.faq-item');
        
        if (faqItem) {
          // 현재 아이템의 활성화 상태 확인
          const isActive = faqItem.classList.contains('active');
          
          // 동일한 아코디언 내의 다른 모든 아이템 비활성화
          const parentAccordion = faqItem.closest('.faq-accordion');
          if (parentAccordion) {
            const siblingItems = parentAccordion.querySelectorAll('.faq-item');
            siblingItems.forEach(sibling => {
              if (sibling !== faqItem) {
                sibling.classList.remove('active');
                
                // + 아이콘으로 변경
                const siblingIcon = sibling.querySelector('.question-icon i');
                if (siblingIcon) {
                  siblingIcon.className = 'fas fa-plus';
                }
              }
            });
          }
          
          // 현재 아이템 토글
          if (isActive) {
            faqItem.classList.remove('active');
            // + 아이콘으로 변경
            const icon = this.querySelector('.question-icon i');
            if (icon) {
              icon.className = 'fas fa-plus';
            }
          } else {
            faqItem.classList.add('active');
            // - 아이콘으로 변경
            const icon = this.querySelector('.question-icon i');
            if (icon) {
              icon.className = 'fas fa-minus';
            }
          }
        }
      });
      
      // 텍스트와 아이콘 모두 클릭 가능하도록 설정
      const heading = question.querySelector('h3');
      if (heading) {
        heading.style.pointerEvents = 'none'; // 부모 요소의 클릭 이벤트만 발생하도록
      }
      
      const icon = question.querySelector('.question-icon');
      if (icon) {
        icon.style.pointerEvents = 'none'; // 부모 요소의 클릭 이벤트만 발생하도록
      }
    });
    
    // 각 탭 변경 시 첫 번째 FAQ 활성화 처리
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', function() {
        setTimeout(() => {
          // 현재 활성화된 탭 찾기
          const tabId = this.getAttribute('data-tab');
          const activeTabContent = document.getElementById(tabId);
          
          if (activeTabContent) {
            // 첫 번째 FAQ 아이템 활성화
            const firstFaqItem = activeTabContent.querySelector('.faq-item');
            if (firstFaqItem) {
              // 해당 탭의 모든 FAQ 아이템 비활성화
              const allFaqItems = activeTabContent.querySelectorAll('.faq-item');
              allFaqItems.forEach(item => {
                item.classList.remove('active');
                
                // + 아이콘으로 변경
                const icon = item.querySelector('.question-icon i');
                if (icon) {
                  icon.className = 'fas fa-plus';
                }
              });
              
              // 첫 번째 FAQ 아이템 활성화
              firstFaqItem.classList.add('active');
              
              // - 아이콘으로 변경
              const icon = firstFaqItem.querySelector('.question-icon i');
              if (icon) {
                icon.className = 'fas fa-minus';
              }
            }
          }
        }, 50); // 탭 전환 효과 후 적용
      });
    });
    
    // 페이지 로드 시 첫 번째 활성 탭의 첫 번째 FAQ 아이템 활성화
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
      const firstFaqItem = activeTabContent.querySelector('.faq-item');
      if (firstFaqItem && !firstFaqItem.classList.contains('active')) {
        firstFaqItem.classList.add('active');
        
        // - 아이콘으로 변경
        const icon = firstFaqItem.querySelector('.question-icon i');
        if (icon) {
          icon.className = 'fas fa-minus';
        }
      }
    }
  }
  
  /**
   * 탭 메뉴 초기화
   */
  function initTabs() {
    const tabsContainer = document.querySelector('.faq-tabs');
    if (!tabsContainer) return;
    
    // 모든 탭 콘텐츠 비활성화
    function deactivateAllTabs() {
      const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
      const tabContents = tabsContainer.querySelectorAll('.tab-content');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
    }
    
    // 특정 탭 활성화
    function activateTab(tabId) {
      // 탭 버튼 활성화
      const tabButton = tabsContainer.querySelector(`.tab-btn[data-tab="${tabId}"]`);
      if (tabButton) {
        tabButton.classList.add('active');
      }
      
      // 탭 콘텐츠 활성화
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.add('active');
        
        // 해당 탭의 첫 번째 FAQ 아이템 자동 활성화 (별도 함수로 분리하여 공유)
        activateFirstFaqItem(tabContent);
      }
    }
    
    // 첫 번째 FAQ 아이템 활성화 (공통 함수)
    function activateFirstFaqItem(tabContent) {
      if (!tabContent) return;
      
      // 모든 FAQ 항목 비활성화
      const allFaqItems = tabContent.querySelectorAll('.faq-item');
      allFaqItems.forEach(item => {
        item.classList.remove('active');
        
        // + 아이콘으로 변경
        const icon = item.querySelector('.question-icon i');
        if (icon) {
          icon.className = 'fas fa-plus';
        }
      });
      
      // 첫 번째 FAQ 항목 활성화
      const firstFaqItem = tabContent.querySelector('.faq-item');
      if (firstFaqItem) {
        firstFaqItem.classList.add('active');
        
        // - 아이콘으로 변경
        const icon = firstFaqItem.querySelector('.question-icon i');
        if (icon) {
          icon.className = 'fas fa-minus';
        }
      }
    }
    
    // 탭 버튼 클릭 이벤트 (이벤트 위임 방식으로 구현)
    const tabButtonsContainer = tabsContainer.querySelector('.tab-buttons');
    if (tabButtonsContainer) {
      tabButtonsContainer.addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab-btn');
        if (!tabButton) return; // 탭 버튼이 아닌 경우 무시
        
        e.preventDefault();
        
        // 이미 활성화된 탭인 경우 무시
        if (tabButton.classList.contains('active')) return;
        
        // 모든 탭 비활성화
        deactivateAllTabs();
        
        // 선택한 탭 활성화
        const tabId = tabButton.getAttribute('data-tab');
        if (tabId) {
          activateTab(tabId);
          
          // URL 해시 업데이트 (선택사항)
          window.history.replaceState(null, null, `#${tabId}`);
        }
      });
    }
    
    // 페이지 로드 시 초기 탭 활성화
    function initializeTabsOnLoad() {
      // URL 해시 확인
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const tabId = hash.substring(1); // # 제거
        const tabExists = document.getElementById(tabId);
        
        if (tabExists) {
          // 해당 탭 활성화
          deactivateAllTabs();
          activateTab(tabId);
          return; // 초기화 완료
        }
      }
      
      // 해시가 없거나 유효하지 않은 경우 첫 번째 탭 활성화
      const firstTabButton = tabsContainer.querySelector('.tab-btn');
      if (firstTabButton) {
        const firstTabId = firstTabButton.getAttribute('data-tab');
        if (firstTabId) {
          deactivateAllTabs();
          activateTab(firstTabId);
        }
      }
    }
    
    // 페이지 로드 시 초기화
    initializeTabsOnLoad();
    
    // 해시 변경 시 탭 활성화 (브라우저 뒤로가기 지원)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const tabId = hash.substring(1);
        const tabExists = document.getElementById(tabId);
        
        if (tabExists) {
          deactivateAllTabs();
          activateTab(tabId);
        }
      }
    });
  }
  
  /**
   * 이미지 로더 초기화 
   * (이미지 placeholder를 실제 이미지로 교체)
   */
  function initImageLoader() {
    // 이미지 로딩 구현은 animations.js에 있어 여기서는 초기화만 진행
    console.log('이미지 로더 초기화 완료');
  }
  
  /**
   * 외부 링크 설정
   */
  function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
      // 새 탭에서 열기
      link.setAttribute('target', '_blank');
      
      // 보안 속성 추가
      link.setAttribute('rel', 'noopener noreferrer');
      
      // 외부 링크 아이콘 추가 (선택적)
      if (!link.classList.contains('no-external-icon')) {
        const icon = document.createElement('span');
        icon.innerHTML = ' ↗';
        icon.className = 'external-link-icon';
        icon.style.fontSize = '0.8em';
        icon.style.opacity = '0.7';
        link.appendChild(icon);
      }
    });
  }
  
  /**
   * 페이지 로드 완료 효과
   */
  function pageLoadComplete() {
    // 페이지 로딩 인디케이터 제거 (있는 경우)
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 500);
    }
    
    // 페이지 콘텐츠 표시
    document.body.classList.add('loaded');
    
    // 페이지 최초 로드 시 인트로 효과
    const header = document.querySelector('.main-header');
    if (header) {
      header.style.opacity = '0';
      header.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        header.style.transition = 'opacity 1s ease, transform 1s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }, 100);
    }
  }
  
  /**
   * 이메일 폼 검증 (선택적)
   */
  function validateEmailForm() {
    const emailForms = document.querySelectorAll('form[data-form-type="email"]');
    
    emailForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailField = form.querySelector('input[type="email"]');
        if (!emailField) return;
        
        const email = emailField.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailPattern.test(email)) {
          // 유효하지 않은 이메일
          showEmailError(emailField, '유효한 이메일 주소를 입력해주세요');
          return;
        }
        
        // 유효한 이메일 - 폼 제출 시뮬레이션
        showEmailSuccess(form);
      });
    });
    
    // 에러 메시지 표시 함수
    function showEmailError(field, message) {
      // 기존 에러 메시지 제거
      const existingError = field.parentElement.querySelector('.form-error');
      if (existingError) {
        existingError.remove();
      }
      
      // 새 에러 메시지 생성
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = message;
      errorElement.style.color = '#e74c3c';
      errorElement.style.fontSize = '0.85em';
      errorElement.style.marginTop = '5px';
      
      // 필드 스타일 변경
      field.style.borderColor = '#e74c3c';
      
      // 에러 메시지 삽입
      field.parentElement.appendChild(errorElement);
      
      // 필드에 포커스
      field.focus();
    }
    
    // 성공 메시지 표시 함수
    function showEmailSuccess(form) {
      // 제출 버튼 상태 변경
      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '처리 중...';
        
        // 성공 메시지 표시 및 폼 리셋 (실제로는 AJAX 요청 후)
        setTimeout(() => {
          form.reset();
          
          // 성공 메시지 요소 생성
          const successElement = document.createElement('div');
          successElement.className = 'form-success';
          successElement.textContent = '성공적으로 등록되었습니다!';
          successElement.style.color = '#2ecc71';
          successElement.style.padding = '10px';
          successElement.style.marginTop = '10px';
          successElement.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
          successElement.style.borderRadius = '4px';
          
          // 폼 숨기고 성공 메시지 표시
          form.style.opacity = '0';
          setTimeout(() => {
            form.style.display = 'none';
            form.parentElement.appendChild(successElement);
          }, 300);
        }, 1500);
      }
    }
  }
  
  /**
   * 브라우저 화면 크기 변경 감지 및 처리
   */
  window.addEventListener('resize', function() {
    // 필요한 경우 화면 크기 변경에 따른 처리
    adjustElementsOnResize();
  });
  
  /**
   * 화면 크기 변경 시 요소 조정
   */
  function adjustElementsOnResize() {
    // 예: 모바일에서 데스크톱으로 전환 시 모바일 메뉴 상태 초기화
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 992 && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
        
        // 메뉴 버튼 모양 초기화
        const menuBars = mobileMenuBtn.querySelectorAll('span');
        if (menuBars.length) {
          menuBars[0].style.transform = 'none';
          menuBars[1].style.opacity = '1';
          menuBars[2].style.transform = 'none';
        }
      }
    }
  }
  
  /**
   * 글로벌 유틸리티 함수들
   */
  
  // 해당 요소가 뷰포트에 있는지 확인
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // 숫자 형식화 (천 단위 콤마)
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // 날짜 형식화
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ko-KR', options);
  }
  
  // 디바운스 함수 (연속 호출 최적화)
  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }