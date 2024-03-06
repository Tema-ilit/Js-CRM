export function validate($inputWrap) {
    const alphabetRegexp = /^[a-zA-Zа-яА-ЯёЁ']+$/;
    if ($inputWrap.$input.value.trim() == '' || !alphabetRegexp.test($inputWrap.$input.value.trim())) {
        if ($inputWrap.$input.value.trim() == '') {
            $inputWrap.$inputLabal.textContent = 'Поле не заполнено'
            $inputWrap.$inputLabal.style.color = 'red'
            return true
        } else {
            $inputWrap.$inputLabal.textContent = 'Успешно'
            $inputWrap.$inputLabal.style.color = 'green'
        }
        $inputWrap.$inputLabal.textContent = 'Некоректные символы'
        $inputWrap.$inputLabal.style.color = 'red'
        return true
    } else {
        $inputWrap.$inputLabal.textContent = 'Успешно'
        $inputWrap.$inputLabal.style.color = 'green'
    }
    return false
}

