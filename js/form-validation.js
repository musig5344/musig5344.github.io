/**
 * form-validation.js - 연락처 폼 유효성 검사 및 제출 처리
 * 
 * 심리학적 영향:
 * 1. 단계적 폼 작성으로 심리적 부담 감소
 * 2. 즉각적 피드백으로 사용자 안내
 * 3. 유입 장벽 최소화 및 전환율 향상
 * 4. 성공 경험 강화로 긍정적 연상
 */

document.addEventListener('DOMContentLoaded', function() {
    // 폼 요소
    const contactForm = document.querySelector('.contact-form');
    const formFields = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    // 단계별 폼 요소 (있는 경우)
    const formSteps = document.querySelectorAll('.contact-form.step-1, .contact-form.step-2, .contact-form.step-3');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const stepIndicators = document.querySelectorAll('.step');
    
    // 유효성 검사 정규식
    const patterns = {
      name: /^[가-힣a-zA-Z\s]{2,30}$/,
      phone: /^(01[016789])\d{3,4}\d{4}$|^01[016789]-\d{3,4}-\d{4}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };
    
    // 각 입력 필드에 유효성 검사 이벤트 리스너 추가
    if (formFields) {
      formFields.forEach(field => {
        // 입력 필드에 포커스 시 시각적 피드백
        field.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        // 입력 필드에서 포커스 아웃 시 유효성 검사
        field.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
          
          // 필수 필드만 검사
          if (this.hasAttribute('required')) {
            validateField(this);
          }
        });
        
        // 입력 중 실시간 유효성 검사 (선택적)
        field.addEventListener('input', function() {
          if (this.hasAttribute('required') && this.value.length > 2) {
            validateField(this);
          }
        });
      });
    }
    
    // 다음 단계 버튼 클릭 처리
    if (nextButtons) {
      nextButtons.forEach(button => {
        button.addEventListener('click', function() {
          const currentStep = this.closest('.contact-form');
          const currentStepNumber = parseInt(currentStep.classList[1].replace('step-', ''));
          const nextStepNumber = currentStepNumber + 1;
          const nextStep = document.querySelector(`.contact-form.step-${nextStepNumber}`);
          
          // 현재 단계의 모든 필수 필드 유효성 검사
          const requiredFields = currentStep.querySelectorAll('[required]');
          let isValid = true;
          
          requiredFields.forEach(field => {
            if (!validateField(field)) {
              isValid = false;
            }
          });
          
          // 모든 필드가 유효하면 다음 단계로 진행
          if (isValid && nextStep) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
            
            // 단계 표시기 업데이트
            updateStepIndicator(nextStepNumber);
            
            // 부드러운 스크롤
            window.scrollTo({
              top: nextStep.offsetTop - 100,
              behavior: 'smooth'
            });
            
            // 다음 단계 페이드인 효과
            fadeIn(nextStep);
            
            // 사용자 행동 추적 (옵션)
            if (typeof gtag === 'function') {
              gtag('event', 'form_step_completed', {
                'step_number': currentStepNumber,
                'step_name': `기본 정보 입력 완료`
              });
            }
          }
        });
      });
    }
    
    // 이전 단계 버튼 클릭 처리
    if (prevButtons) {
      prevButtons.forEach(button => {
        button.addEventListener('click', function() {
          const currentStep = this.closest('.contact-form');
          const currentStepNumber = parseInt(currentStep.classList[1].replace('step-', ''));
          const prevStepNumber = currentStepNumber - 1;
          const prevStep = document.querySelector(`.contact-form.step-${prevStepNumber}`);
          
          if (prevStep) {
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            
            // 단계 표시기 업데이트
            updateStepIndicator(prevStepNumber);
            
            // 부드러운 스크롤
            window.scrollTo({
              top: prevStep.offsetTop - 100,
              behavior: 'smooth'
            });
            
            // 이전 단계 페이드인 효과
            fadeIn(prevStep);
          }
        });
      });
    }
    
    // 폼 제출 처리
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 모든 필수 필드 최종 유효성 검사
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!validateField(field)) {
            isValid = false;
          }
        });
        
        // 폼이 유효하면 제출 처리
        if (isValid) {
          // 제출 버튼 상태 업데이트
          const submitButton = this.querySelector('[type="submit"]');
          submitButton.disabled = true;
          submitButton.innerHTML = '<span class="loading-spinner"></span> 제출 중...';
          
          // 폼 데이터 수집
          const formData = new FormData(this);
          const formDataObject = {};
          
          formData.forEach((value, key) => {
            formDataObject[key] = value;
          });
          
          // 실제 환경에서는 서버로 데이터 전송
          // 여기서는 성공 시나리오 시뮬레이션
          
          // 성공 처리 (실제로는 fetch 또는 XMLHttpRequest 사용)
          setTimeout(() => {
            // 성공 메시지 표시
            showSubmissionResult(true, '투자 설명회 신청이 완료되었습니다!');
            
            // 버튼 상태 복원
            submitButton.disabled = false;
            submitButton.innerHTML = '투자 설명회 신청하기';
            
            // 폼 초기화
            this.reset();
            
            // 사용자 행동 추적 (옵션)
            if (typeof gtag === 'function') {
              gtag('event', 'form_submission', {
                'form_name': 'investment_seminar',
                'status': 'success'
              });
            }
            
            // 단계별 폼인 경우 첫 단계로 리셋
            if (formSteps.length > 0) {
              resetFormSteps();
            }
          }, 1500);
          
          // 실패 처리 시나리오 (필요시 주석 해제)
          /*
          setTimeout(() => {
            showSubmissionResult(false, '제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
            submitButton.disabled = false;
            submitButton.innerHTML = '투자 설명회 신청하기';
          }, 1500);
          */
        }
      });
    }
    
    /**
     * 개별 필드 유효성 검사 함수
     * @param {HTMLElement} field - 검사할 입력 필드
     * @returns {boolean} 유효성 여부
     */
    function validateField(field) {
      const fieldName = field.name;
      const fieldValue = field.value.trim();
      let isValid = true;
      
      // 필드 타입에 따른 유효성 검사
      if (fieldValue === '') {
        // 빈 값 검사
        showError(field, '필수 입력 항목입니다');
        isValid = false;
      } else if (patterns[fieldName] && !patterns[fieldName].test(fieldValue)) {
        // 패턴 검사 (이름, 전화번호, 이메일 등)
        switch(fieldName) {
          case 'name':
            showError(field, '이름을 올바르게 입력해주세요');
            break;
          case 'phone':
            showError(field, '유효한 전화번호 형식이 아닙니다');
            break;
          case 'email':
            showError(field, '유효한 이메일 주소가 아닙니다');
            break;
          default:
            showError(field, '입력 형식이 올바르지 않습니다');
        }
        isValid = false;
      } else {
        // 유효한 경우
        showSuccess(field);
      }
      
      return isValid;
    }
    
    /**
     * 오류 메시지 표시 함수
     * @param {HTMLElement} field - 오류가 있는 필드
     * @param {string} message - 표시할 오류 메시지
     */
    function showError(field, message) {
      const formGroup = field.parentElement;
      const feedback = formGroup.querySelector('.form-feedback') || createFeedbackElement(formGroup);
      
      // 스타일 클래스 변경
      formGroup.classList.add('has-error');
      formGroup.classList.remove('has-success');
      
      // 오류 메시지 설정
      feedback.textContent = message;
      feedback.className = 'form-feedback error';
    }
    
    /**
     * 성공 메시지 표시 함수
     * @param {HTMLElement} field - 유효한 필드
     */
    function showSuccess(field) {
      const formGroup = field.parentElement;
      const feedback = formGroup.querySelector('.form-feedback') || createFeedbackElement(formGroup);
      
      // 스타일 클래스 변경
      formGroup.classList.remove('has-error');
      formGroup.classList.add('has-success');
      
      // 성공 메시지 또는 공백
      feedback.textContent = '';
      feedback.className = 'form-feedback success';
    }
    
    /**
     * 피드백 요소 생성 함수
     * @param {HTMLElement} parent - 부모 요소
     * @returns {HTMLElement} 생성된 피드백 요소
     */
    function createFeedbackElement(parent) {
      const feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      parent.appendChild(feedback);
      return feedback;
    }
    
    /**
     * 단계 표시기 업데이트 함수
     * @param {number} stepNumber - 현재 단계 번호
     */
    function updateStepIndicator(stepNumber) {
      if (stepIndicators) {
        stepIndicators.forEach((indicator, index) => {
          if (index + 1 < stepNumber) {
            // 완료된 단계
            indicator.classList.add('completed');
            indicator.classList.remove('active');
          } else if (index + 1 === stepNumber) {
            // 현재 단계
            indicator.classList.add('active');
            indicator.classList.remove('completed');
          } else {
            // 미래 단계
            indicator.classList.remove('active', 'completed');
          }
        });
      }
    }
    
    /**
     * 폼 단계 초기화 함수
     */
    function resetFormSteps() {
      if (formSteps.length > 0) {
        formSteps.forEach(step => {
          step.classList.remove('active');
        });
        
        // 첫 단계 활성화
        formSteps[0].classList.add('active');
        
        // 단계 표시기 초기화
        updateStepIndicator(1);
      }
    }
    
    /**
     * 요소 페이드인 애니메이션 함수
     * @param {HTMLElement} element - 페이드인할 요소
     */
    function fadeIn(element) {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '1';
      }, 10);
    }
    
    /**
     * 폼 제출 결과 표시 함수
     * @param {boolean} success - 성공 여부
     * @param {string} message - 표시할 메시지
     */
    function showSubmissionResult(success, message) {
      // 기존 결과 메시지 제거
      const existingResult = document.querySelector('.submission-result');
      if (existingResult) {
        existingResult.remove();
      }
      
      // 새 결과 메시지 생성
      const resultElement = document.createElement('div');
      resultElement.className = `submission-result ${success ? 'success' : 'error'}`;
      resultElement.textContent = message;
      
      // 폼 뒤에 결과 삽입
      contactForm.after(resultElement);
      
      // 성공 시 추가 효과
      if (success) {
        // 폼 숨기기
        contactForm.style.display = 'none';
        
        // 성공 축하 이펙트 (옵션)
        createSuccessEffect();
        
        // 추가 행동 유도 (CTA)
        const ctaElement = document.createElement('div');
        ctaElement.className = 'post-submission-cta';
        ctaElement.innerHTML = `
          <p>투자 설명회 알림을 받으실 연락처로 상세 안내가 발송될 예정입니다.</p>
          <p>더 궁금하신 사항이 있으시면 02-XXX-XXXX로 문의해 주세요.</p>
          <a href="#investment" class="btn btn-primary">투자 하이라이트 다시 보기</a>
        `;
        
        resultElement.after(ctaElement);
      }
      
      // 자동 스크롤
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    /**
     * 성공 효과 생성 함수
     */
    function createSuccessEffect() {
      // 간단한 성공 효과 스타일 추가
      const style = document.createElement('style');
      style.textContent = `
        .submission-result.success {
          background-color: rgba(46, 204, 113, 0.1);
          color: #27ae60;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #27ae60;
          margin: 30px 0;
          font-size: 18px;
          text-align: center;
          animation: successPulse 2s infinite;
        }
        
        @keyframes successPulse {
          0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
        }
        
        .post-submission-cta {
          text-align: center;
          margin: 30px 0;
        }
        
        .post-submission-cta p {
          margin-bottom: 15px;
          color: #555;
        }
      `;
      
      document.head.appendChild(style);
    }
    
    // 전화번호 자동 포맷팅 (옵션)
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // 숫자만 남기기
        
        if (value.length > 3 && value.length <= 7) {
          // 010-1234
          value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length > 7) {
          // 010-1234-5678
          value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
        }
        
        e.target.value = value;
      });
    }
  });