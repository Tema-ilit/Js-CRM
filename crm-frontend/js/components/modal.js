import { icons } from "./icons.js"

// шаблон модального окна для добавления клиента
export function modal(open, close) {
    let $modalWrap = document.createElement('div'),
        $modalBox = document.createElement('div'),
        $modalCloseBtn = document.createElement('button')

    $modalWrap.classList.add('madal-wrap')
    $modalBox.classList.add('madal-box')
    $modalCloseBtn.classList.add('madal-close__btn', 'btn-reset')
    $modalCloseBtn.innerHTML = icons.closeBtn

    $modalBox.append($modalCloseBtn)
    $modalWrap.append($modalBox)

    open($modalWrap, $modalBox, $modalCloseBtn)

    $modalCloseBtn.addEventListener('click', function () {
        $modalWrap.remove()
        close()
    })
    return $modalWrap
}