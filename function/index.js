const btnRegister = document.getElementById('Đăng kí');
btnRegister.addEventListener('click', function () {
    let isValid = checkValidate();
    if (isValid) {
        alert('Gửi đăng ký thành công');
    }
});
// Truy cập vào các ô input
const usernameEle = document.getElementById('Tên đăng nhập');
const emailEle = document.getElementById('Email');
// Validate dữ liệu trong các ô input và highlight
function checkValidate() {
    let usernameValue = usernameEle.value;
    let emailValue = emailEle.value;
    let isCheck = true;
    // Kiểm tra trường username
    if (usernameValue == '') {
        setError(usernameEle, 'Tên không được để trống');
        isCheck = false;
    } else {
        setSuccess(usernameEle);
    }

    // Kiểm tra trường email
    if (emailValue == '') {
        setError(emailEle, 'Email không được để trống');
        isCheck = false;
    } else if (!isEmail(emailValue)) {
        setError(emailEle, 'Email không đúng định dạng');
        isCheck = false;
    } else {
        setSuccess(emailEle);
    }
    return isCheck;
}