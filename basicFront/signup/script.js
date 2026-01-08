document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    const inputs = document.querySelectorAll('input');
    const submitBtn = document.querySelector('.submit-btn');
    
    // 입력 필드 실시간 유효성 검사
    inputs.forEach(input => {
        input.addEventListener('input', validateField);
        input.addEventListener('blur', validateField);
    });
    
    // 폼 제출 처리
    form.addEventListener('submit', handleSubmit);
    
    // 비밀번호 실시간 확인
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    confirmPassword.addEventListener('input', checkPasswordMatch);
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // 기존 에러 메시지 제거
        removeErrorMessage(field);
        
        switch(field.type) {
            case 'text':
                if (field.id === 'username') {
                    validateUsername(field, value);
                }
                break;
            case 'email':
                validateEmail(field, value);
                break;
            case 'password':
                validatePassword(field, value);
                if (field.id === 'password') {
                    checkPasswordMatch();
                }
                break;
            case 'tel':
                validatePhone(field, value);
                break;
        }
    }
    
    function validateUsername(field, value) {
        if (value.length < 3) {
            showError(field, '사용자 이름은 3자 이상이어야 합니다.');
            return false;
        }
        if (!/^[a-zA-Z0-9가-힣_]+$/.test(value)) {
            showError(field, '사용자 이름은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다.');
            return false;
        }
        showSuccess(field);
        return true;
    }
    
    function validateEmail(field, value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, '올바른 이메일 형식을 입력해주세요.');
            return false;
        }
        showSuccess(field);
        return true;
    }
    
    function validatePassword(field, value) {
        if (value.length < 8) {
            showError(field, '비밀번호는 8자 이상이어야 합니다.');
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showError(field, '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.');
            return false;
        }
        showSuccess(field);
        return true;
    }
    
    function validatePhone(field, value) {
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            showError(field, '010-0000-0000 형식으로 입력해주세요.');
            return false;
        }
        showSuccess(field);
        return true;
    }
    
    function checkPasswordMatch() {
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        
        if (confirmValue && passwordValue !== confirmValue) {
            showError(confirmPassword, '비밀번호가 일치하지 않습니다.');
            return false;
        } else if (confirmValue && passwordValue === confirmValue) {
            showSuccess(confirmPassword);
            return true;
        }
        return true;
    }
    
    function showError(field, message) {
        // 기존 에러 메시지들 모두 제거
        const existingErrors = field.parentNode.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        field.style.borderColor = '#ef4444';
        field.style.backgroundColor = '#fef2f2';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function showSuccess(field) {
        field.style.borderColor = '#10b981';
        field.style.backgroundColor = '#f0fdf4';
    }
    
    function removeErrorMessage(field) {
        // 해당 필드의 부모 요소에서 모든 에러 메시지 제거
        const existingErrors = field.parentNode.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        field.style.borderColor = '#e2e8f0';
        field.style.backgroundColor = '#ffffff';
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        // 모든 필드 유효성 검사
        let isValid = true;
        
        inputs.forEach(input => {
            const event = { target: input };
            validateField(event);
            
            if (input.parentNode.querySelector('.error-message')) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('입력 정보를 다시 확인해주세요.', 'error');
            return;
        }
        
        // 로딩 상태 표시
        showLoading();
        
        // 실제 서버 전송 시뮬레이션 (2초 후)
        setTimeout(() => {
            hideLoading();
            showNotification('회원가입이 완료되었습니다!', 'success');
            
            // 폼 초기화 (선택사항)
            // form.reset();
        }, 2000);
    }
    
    function showLoading() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                처리중...
            </span>
        `;
    }
    
    function hideLoading() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '회원가입';
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? '#10b981' : '#ef4444';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // 휴대폰 번호 자동 포맷팅
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        
        if (value.length >= 3) {
            if (value.length <= 7) {
                value = value.replace(/(\d{3})(\d+)/, '$1-$2');
            } else {
                value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    // 비밀번호 강도 표시
    password.addEventListener('input', function() {
        showPasswordStrength(this.value);
    });
    
    function showPasswordStrength(password) {
        // 비밀번호 필드의 부모 요소에서 기존 강도 표시 찾기
        const passwordField = document.getElementById('password');
        let existingMeter = passwordField.parentNode.querySelector('.password-strength');
        
        if (existingMeter) {
            existingMeter.remove();
        }
        
        if (!password) return;
        
        const strength = calculatePasswordStrength(password);
        const meter = document.createElement('div');
        meter.className = 'password-strength';
        
        const colors = ['#ef4444', '#f59e0b', '#10b981'];
        const labels = ['약함', '보통', '강함'];
        
        meter.innerHTML = `
            <div style="font-size: 12px; color: ${colors[strength]}; margin-top: 4px;">
                비밀번호 강도: ${labels[strength]}
            </div>
        `;
        
        passwordField.parentNode.appendChild(meter);
    }
    
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password) && /[!@#$%^&*]/.test(password)) score++;
        
        return Math.min(score, 2);
    }
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);