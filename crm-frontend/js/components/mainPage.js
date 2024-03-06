import { icons } from "./icons.js"

export function addPage() {
    // создадим элементы для таблицы
    const $container = document.createElement('div'),
        $title = document.createElement('h1'),
        $table = document.createElement('table'),
        $tableHead = document.createElement('thead'),
        $tableHeadTr = document.createElement('tr'),
        $tableHeadIDTh = document.createElement('th'),
        $tableHeadFIOTh = document.createElement('th'),
        $tableHeadCreateDateTh = document.createElement('th'),
        $tableHeadUpdateDateTh = document.createElement('th'),
        $tableHeadContactsTh = document.createElement('th'),
        $tableHeadActionTh = document.createElement('th'),
        $tableBody = document.createElement('tbody'),
        $addClientBtnWrap = document.createElement('div'),
        $addClientBtn = document.createElement('button')

    // добавим классы и id и дата атрибуты для сортировки
    $container.classList.add('container')
    $title.classList.add('title')
    $table.classList.add('table', 'table-dark', 'table-hover')
    $tableHead.classList.add('teble-head')
    $tableHeadTr.classList.add('table-light')
    $tableHeadIDTh.classList.add('table-head__th', 'sort', 'js-active')
    $tableHeadIDTh.setAttribute('data-column', 'id')
    $tableHeadFIOTh.classList.add('table-head__th', 'sort')
    $tableHeadFIOTh.setAttribute('data-column', 'fio')
    $tableHeadCreateDateTh.classList.add('table-head__th', 'sort')
    $tableHeadCreateDateTh.setAttribute('data-column', 'createdAt')
    $tableHeadUpdateDateTh.classList.add('table-head__th', 'sort')
    $tableHeadUpdateDateTh.setAttribute('data-column', 'updatedAt')
    $tableHeadContactsTh.classList.add('table-head__th')
    $tableHeadActionTh.classList.add('table-head__th')
    $tableBody.classList.add('table-body', 'align-middle')
    $addClientBtnWrap.classList.add('wrap-btn-add__client')
    $addClientBtn.classList.add('btn', 'btn-add__client', 'btn-dark')
    $addClientBtn.setAttribute('id', 'add-client')

    // укажем названия столбиков таблицы и кнопоки
    $title.textContent = 'Клиенты'
    $tableHeadIDTh.innerHTML = 'ID' + icons.arrow
    $tableHeadFIOTh.innerHTML = 'Фамилия Имя Отчесво' + icons.arrow + 'А-Я'
    $tableHeadCreateDateTh.innerHTML = 'Дата и время создания' + icons.arrow
    $tableHeadUpdateDateTh.innerHTML = 'Последние изменения' + icons.arrow
    $tableHeadContactsTh.textContent = 'Контакты'
    $tableHeadActionTh.textContent = 'Действия'
    $addClientBtn.innerHTML = icons.addClient + 'Добавить клиента'

    // добавим все th в tr шапки таблицы
    $tableHeadTr.append($tableHeadIDTh, $tableHeadFIOTh, $tableHeadCreateDateTh, $tableHeadUpdateDateTh, $tableHeadContactsTh, $tableHeadActionTh)

    // добавим tr в шапку таблицы
    $tableHead.append($tableHeadTr)

    // добавим шапку и тело в таблицу
    $table.append($tableHead, $tableBody)

    // добавим кнопку в обертку для центрирования
    $addClientBtnWrap.append($addClientBtn)

    // добавим таблицу и кнопку в контейнер
    $container.append($title, $table, $addClientBtnWrap)
    return {$container, $table, $tableBody}
}