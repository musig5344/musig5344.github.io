document.addEventListener('DOMContentLoaded', function() {
  // FAQ 아코디언 기능
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // 현재 아이템의 활성화 상태 토글
      item.classList.toggle('active');
      
      // 아이콘 변경
      const icon = item.querySelector('.question-icon i');
      if(item.classList.contains('active')) {
        icon.className = 'fas fa-minus';
      } else {
        icon.className = 'fas fa-plus';
      }
    });
  });
  
  // 탭 기능
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 모든 탭 버튼 비활성화
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 모든 탭 콘텐츠 숨기기
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 클릭한 버튼 활성화
      button.classList.add('active');
      
      // 해당 탭 콘텐츠 표시
      const targetId = button.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if(targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // 첫 번째 탭을 기본으로 활성화
  if(tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');
  }
});
