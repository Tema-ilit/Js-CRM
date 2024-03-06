export function addSelect() {
    const $wrapSelect = document.createElement('div'),
        $select = document.createElement('select'),
        $selectOptioСhoice = document.createElement('option'),
        $selectOptionVk = document.createElement('option'),
        $selectOptionFb = document.createElement('option'),
        $selectOptionTel = document.createElement('option'),
        $selectOptionMail = document.createElement('option'),
        $selectOptionOther = document.createElement('option')

    $wrapSelect.classList.add('wrap-select')
    $select.classList.add('select-menu')

    $selectOptioСhoice.textContent = 'Выберите'
    $selectOptionVk.textContent = 'Vk'
    $selectOptionFb.textContent = 'Fb'
    $selectOptionTel.textContent = 'Tel'
    $selectOptionMail.textContent = 'Email'
    $selectOptionOther.textContent = 'Other'

    $select.append($selectOptioСhoice, $selectOptionTel, $selectOptionVk, $selectOptionFb, $selectOptionMail, $selectOptionOther)

    $wrapSelect.append($select)

    const choices = new Choices($select, {
        searchEnabled: false,
        itemSelectText: '',
        renderChoiceLimit: -1,
    });

    return { $wrapSelect, $select, choices }
}