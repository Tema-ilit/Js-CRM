import { addSelect } from './getSelect.js'
import { getInputContacts } from './getInputContacts.js'
import { allBtnContacts } from '../main.js'
export function getContacts(obj = false) {
    const $wrapAll = document.createElement('div'),
        $wrapFields = document.createElement('div'),
        $wrapInputObj = getInputContacts('text', '', 'Укажите контакты', 'contacts-input', 'true'),
        $deleteInputBtn = document.createElement('button')

    $wrapAll.classList.add('wrap-fields_all')
    $wrapFields.classList.add('wrap-fields')
    $deleteInputBtn.classList.add('btn-input-del', 'btn-reset')
    $deleteInputBtn.textContent = 'x'

    $deleteInputBtn.addEventListener('click', function () {
        allBtnContacts.shift()
        if (allBtnContacts.length <= 9) {
            document.getElementById('add-contact').disabled = false
        }
        $wrapAll.remove()
    })

    const selectObj = addSelect()

    if (obj) {
        selectObj.choices.setValue([obj.type])
        $wrapInputObj.$input.value = obj.value
    }

    // сделаем функцию которая будет добавлять маски на инпуты
    function acceptInputType(input, type) {
        type = selectObj.$select.value
        input = $wrapInputObj.$input

        switch (type) {
            case 'Tel':
                input.disabled = false
                input.value = ''
                Inputmask({ mask: "+7 (999) 999 - 99 - 99" }).mask(input)
                break;
            case 'Vk':
                input.disabled = false
                input.value = ''
                Inputmask({ mask: "https://vk.com/*{1,20}[-]*{1,20}[.*{1,20}]", greedy: false, }).mask(input)
                break;
            case 'Fb':
                input.disabled = false
                input.value = ''
                Inputmask({ mask: "https://facebook.com/*{1,20}[*/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/]*{1,20}[.*{1,20}]", greedy: false, }).mask(input)
                break;
            case 'Email':
                input.disabled = false
                input.value = ''
                break;
            case 'Other':
                input.disabled = false
                input.value = ''
                Inputmask().mask(input).remove()
                break;
            case 'Выберите':
                input.disabled = true
                input.value = ''
                Inputmask().mask(input).remove()
                break;
            default:
                Inputmask().mask(input).remove()
                break;
        }
    }

    selectObj.$select.addEventListener('change', function () {
        acceptInputType()
    })


    $wrapFields.append(selectObj.$wrapSelect, $wrapInputObj.$inputWrap, $deleteInputBtn)
    $wrapAll.append($wrapFields)
    return $wrapAll
}
