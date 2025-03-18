/**
 * investment-calculator.js - 맞춤형 투자 계산기
 * 
 * 사용자가 직접 투자금액과 기간을 입력하여 예상 수익을 실시간으로 계산
 */

document.addEventListener('DOMContentLoaded', function() {
    // 계산기 요소
    const calculatorForm = document.getElementById('investment-calculator-form');
    const amountInput = document.getElementById('investment-amount');
    const periodInput = document.getElementById('investment-period');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-calculator');
    const resultContainer = document.getElementById('calculation-result');
    const expectedReturnEl = document.getElementById('expected-return');
    const totalAmountEl = document.getElementById('total-amount');
    const monthlyIncomeEl = document.getElementById('monthly-income');
    const returnRateEl = document.getElementById('return-rate');
    
    // 초기 수익률 (10%)
    const baseReturnRate = 10;
    
    // 슬라이더 입력값 텍스트 업데이트
    function updateSliderText() {
      document.getElementById('amount-value').textContent = 
        formatCurrency(amountInput.value);
      document.getElementById('period-value').textContent = 
        `${periodInput.value}년`;
    }
    
    // 슬라이더 입력 이벤트
    amountInput.addEventListener('input', updateSliderText);
    periodInput.addEventListener('input', updateSliderText);
    
    // 계산 버튼 클릭 이벤트
    calculatorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateInvestment();
    });
    
    // 초기화 버튼 클릭 이벤트
    resetBtn.addEventListener('click', function() {
      amountInput.value = 50000000; // 5천만원 기본값
      periodInput.value = 5; // 5년 기본값
      updateSliderText();
      resultContainer.classList.add('hidden');
    });
    
    // 투자 수익 계산 함수
    function calculateInvestment() {
      const amount = parseFloat(amountInput.value);
      const years = parseInt(periodInput.value);
      const annualReturnRate = baseReturnRate / 100;
      
      // 총 수익금
      const totalReturn = amount * Math.pow(1 + annualReturnRate, years) - amount;
      
      // 투자 종료 시 총 자산
      const totalAmount = amount + totalReturn;
      
      // 월 평균 수입 (단순 계산)
      const monthlyIncome = (totalReturn / years) / 12;
      
      // 수익률 (%)
      const effectiveReturnRate = (totalReturn / amount) * 100;
      
      // 결과 표시
      expectedReturnEl.textContent = formatCurrency(totalReturn);
      totalAmountEl.textContent = formatCurrency(totalAmount);
      monthlyIncomeEl.textContent = formatCurrency(monthlyIncome);
      returnRateEl.textContent = `${effectiveReturnRate.toFixed(1)}%`;
      
      // 결과 컨테이너 표시
      resultContainer.classList.remove('hidden');
      
      // 결과로 스크롤
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 차트 업데이트 (있는 경우)
      if (typeof updateResultChart === 'function') {
        updateResultChart(amount, totalReturn, years);
      }
      
      // 투자 확정 유도 (심리학적 트리거)
      setTimeout(showInvestmentCta, 2000);
    }
    
    // 투자 확정 유도 함수
    function showInvestmentCta() {
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'investment-cta-popup';
      ctaContainer.innerHTML = `
        <div class="cta-content">
          <h4>지금 투자하면 특별 혜택!</h4>
          <p>첫 1년 간 <strong>+0.5%</strong> 추가 수익률</p>
          <a href="#contact" class="btn btn-gold">투자 신청하기</a>
          <button class="close-cta">나중에 알아보기</button>
        </div>
      `;
      
      document.body.appendChild(ctaContainer);
      
      // 애니메이션으로 표시
      setTimeout(() => {
        ctaContainer.classList.add('show');
      }, 100);
      
      // 닫기 버튼 이벤트
      ctaContainer.querySelector('.close-cta').addEventListener('click', function() {
        ctaContainer.classList.remove('show');
        setTimeout(() => {
          ctaContainer.remove();
        }, 300);
      });
    }
    
    // 금액 포맷팅 함수
    function formatCurrency(value) {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0
      }).format(value);
    }
    
    // 초기 텍스트 업데이트
    updateSliderText();
  });