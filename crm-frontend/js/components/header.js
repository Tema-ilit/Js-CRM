import { icons } from "./icons.js"
import { clients } from "../main.js"

export function header() {
    // создаем элементы шапки
    const $header = document.createElement('header'),
        $headerContainer = document.createElement('div'),
        $headerLink = document.createElement('a'),
        $headerSearch = document.createElement('input')

    // добавляем классы и плейсхолдер
    $header.classList.add('header')
    $headerContainer.classList.add('header-container')
    $headerLink.classList.add('header-link')
    $headerSearch.classList.add('header-search', 'inp-reset')

    $headerLink.innerHTML = icons.headerLogo
    $headerSearch.placeholder = 'Введите запрос'

    // добавим элементы друг в друга и добаввим в боди
    $headerContainer.append($headerLink, $headerSearch)
    $header.append($headerContainer)

    return $header
}