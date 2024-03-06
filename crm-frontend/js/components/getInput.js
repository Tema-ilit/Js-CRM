export function getInput(type, id, placeholder, classList, required) {
    const $inputWrap = document.createElement('div'),
        $input = document.createElement('input'),
        $inputLabal = document.createElement('label')

    $inputWrap.classList.add('text-field')
    $inputLabal.classList.add('text-field__placeholder')
    $inputLabal.innerHTML = placeholder
    $input.type = type
    $input.id = id
    $input.className = classList + ' inp-reset'
    $input.required = required

    $inputWrap.append($input, $inputLabal)
    return {$inputWrap, $input, $inputLabal}
}
