import { modal } from './components/modal.js'
import { icons } from './components/icons.js'
import { header } from './components/header.js'
import { addPage } from './components/mainPage.js'
import { getContacts } from './components/getContacts.js'
import { getInput } from './components/getInput.js'
import { validate } from './components/validation.js'
import { contactIcon } from './components/iconContact.js'
import { getSortClients } from './components/getSortClients.js'
import { serverAddClient, serverCreateClient, serverGetClient, serverDeleteClient, SERVER_URL } from './API/api.js'

// Добавим шапку
const head = header()
body.append(head)

// содадим главную страницу
const page = addPage()
body.append(page.$container)

// массив клиентов
export let clients = []

let serverData = await serverGetClient()

if (serverData !== null) {
    clients = serverData
}

// получим все th для события нажатия
const tableheadThAll = page.$table.querySelectorAll('.sort')
let columnSort = 'id',
    columnDir = true

// будем отлавливать на какой колонке произошел клик и делать сортировку
tableheadThAll.forEach(el => {
    el.addEventListener('click', function () {
        el.classList.toggle('js-active')
        columnSort = this.dataset.column
        columnDir = !columnDir
        render(clients)
    })
})

// создадим модальное окно добаления клиента по шаблону
const addClient = document.getElementById('add-client')
addClient.addEventListener('click', function () {
    const addModal = modal(
        function (wrap, box, closeBtn) {

            // создадим элементы для модального окна добавления клиента
            const $modalWrap = document.createElement('div'),
                $title = document.createElement('h2'),
                $inpWrap = document.createElement('div'),
                $wrapContacts = document.createElement('div'),
                $addContactsBtn = document.createElement('button'),
                $wrapBtn = document.createElement('div'),
                $saveBtn = document.createElement('button'),
                $deleteBtn = document.createElement('button'),
                $sup = document.createElement('sup'),
                $inputSurname = getInput('text', 'inp-Surname', 'Фамилия<sup>*</sup>', 'modal-input', true),
                $inputname = getInput('text', 'inp-Name', 'Имя<sup>*</sup>', 'modal-input', true),
                $inputLastname = getInput('text', 'inp-Lastname', 'Отчество', 'modal-input', true)

            // добавим классы элементам
            $modalWrap.classList.add('modal-wrap')
            $title.classList.add('modal-title')
            $inpWrap.classList.add('input-wrap')
            $wrapContacts.classList.add('wrap-contacts')
            $addContactsBtn.classList.add('btn', 'add-btn-contacts', 'btn-dark')
            $wrapBtn.classList.add('wrap-btn')
            $saveBtn.classList.add('btn-save', 'btn', 'btn-dark')
            $deleteBtn.classList.add('btn-del', 'btn-reset')

            // добавим текст и атрибуты
            $sup.textContent = '*'
            $title.textContent = 'Добавить клиета'
            $addContactsBtn.innerHTML = icons.addContact + 'Добавить контакт'
            $saveBtn.textContent = 'Сохранить'
            $deleteBtn.textContent = 'Отмена'
            $addContactsBtn.setAttribute('id', 'add-contact')

            // добавим событие кнопки "отмена"
            $deleteBtn.addEventListener('click', function () {
                wrap.remove()
            })

            // добавим событие на добавление поля с заполением контактов
            $addContactsBtn.addEventListener('click', function () {

                // пушим функцию котоаря создает селекст, инпут и кнопку для блока контактов
                $wrapContacts.append(getContacts(), $addContactsBtn)
            })

            // делаем валидацию полей фио
            const inputArr = [$inputSurname, $inputname, $inputLastname]
            $inpWrap.addEventListener('click', function () {
                inputArr.forEach(inputWrap => {
                    validate(inputWrap)
                });
            })

            // добавим все элементы друг в друга и в модальное окно
            $inpWrap.append($inputSurname.$inputWrap, $inputname.$inputWrap, $inputLastname.$inputWrap)
            $wrapBtn.append($saveBtn, $deleteBtn)
            $wrapContacts.append($addContactsBtn)
            $modalWrap.append($title, $inpWrap)
            box.append($modalWrap, $wrapContacts, $wrapBtn)

            // событие клика на кнопку сохранить
            $saveBtn.addEventListener('click', async function () {
                let validerror = false
                inputArr.forEach(inputWrap => {
                    validerror = validate(inputWrap)
                });

                if (validerror === true) {
                    return
                }

                // делаем проверку селекта если тип не выбран выводим ошибку
                let valueSelect = ''
                $wrapContacts.querySelectorAll('.wrap-fields').forEach(el => {
                    valueSelect = el.querySelector('select').value;
                })

                if (valueSelect === 'Выберите') {

                    const errorMessage = document.createElement('p')
                    errorMessage.classList.add('error-massage__validContact')
                    errorMessage.textContent = 'Выберите тип контакта или "Other"'

                    let result
                    $wrapContacts.querySelectorAll('.wrap-fields_all').forEach(el => {
                        result = el.querySelectorAll('.error-massage__validContact')
                    })

                    if (result.length >= 1) {
                        return
                    } else {
                        $wrapContacts.querySelectorAll('.wrap-fields_all').forEach(el => {
                            el.append(errorMessage)
                        })
                    }
                    return
                }

                // создадим массив с данными контактов где будет значение и результат
                const contactsArr = []
                $wrapContacts.querySelectorAll('.wrap-fields').forEach(contact => {
                    contactsArr.push({
                        type: contact.querySelector('select').value,
                        value: contact.querySelector('input').value
                    })
                })

                // при прохождении валидации создаем объект нового клиента
                let newClient = {
                    name: $inputname.$input.value,
                    surname: $inputSurname.$input.value,
                    lastName: $inputLastname.$input.value,
                    contacts: contactsArr
                }

                let serverDataObj = await serverAddClient(newClient)
                serverDataObj.updatedAt = new Date(serverDataObj.updatedAt)
                serverDataObj.createdAt = new Date(serverDataObj.createdAt)
                clients.push(serverDataObj)

                render(clients)
                wrap.remove()
            })
        },

        function () {

        })

    document.body.append(addModal)
})

// фунция отрисовки нового клиента
function newClient(clientObj) {
    const $client = document.createElement('tr'),
        $clientId = document.createElement('th'),
        $clientFIO = document.createElement('th'),
        $dateCreate = document.createElement('th'),
        $dateUpdate = document.createElement('th'),
        $clientContacts = document.createElement('th'),
        $action = document.createElement('th'),
        $actionBtn = document.createElement('button'),
        $deleteBtn = document.createElement('button')

    $clientFIO.textContent = clientObj.surname + ' ' + clientObj.name + ' ' + clientObj.lastName

    // масив кнопок контактов
    let arrButtonContacts = []

    // пройдемся по массиву контактов и создадим кнопку каждого контакта, и добавим в массив
    for (const contact of clientObj.contacts) {
        let btnContact = document.createElement('button')

        btnContact.classList.add('btn-reset', 'btn-contact')
        btnContact.innerHTML = contactIcon(contact.type)

        tippy(btnContact, {
            content: `${contact.type}: <a class="link-contact" href="${contact.value}">${contact.value}</a>`,
            interactive: true,
            allowHTML: true,
            theme: 'light',
            animation: 'scale',
            // trigger: 'click',
        });

        arrButtonContacts.push(btnContact)
    }

    // создадим кнопку которая будет отображать сколько контактов скрыто
    let allBtnContact = document.createElement('button')
    allBtnContact.classList.add('all-Btn-Contact', 'btn')
    allBtnContact.textContent = '+' + (arrButtonContacts.length - 3);

    tippy(allBtnContact, {
        content: `Доп контакты`,
        // interactive: true,
        allowHTML: true,
        theme: 'light',
        animation: 'scale',
        // trigger: 'click',
    });

    // добавим условие, при которых будут отображаться кнопки
    if (arrButtonContacts.length <= 3) {
        arrButtonContacts.forEach(el => {
            $clientContacts.append(el)
        })
    } else if (arrButtonContacts.length >= 4) { //если кнопок больше 3, то создаем новый массив из 3 кнопок, и отрисовываем только их, добавляем доп кнопку для отображения всех контактов
        let firstThree = arrButtonContacts.slice(0, 3)
        firstThree.forEach(el => {
            $clientContacts.append(el)
        })
        $clientContacts.append(allBtnContact)
    }

    // слушаем клик по кнопке, которая скрывает лишние контакты и запускаем функцию
    allBtnContact.addEventListener('click', function () {
        showRemainingElements()
    })

    // фунция для отображения всех контактов
    function showRemainingElements() {
        // Отображаем оставшиеся элементы массива
        let remainingElem = arrButtonContacts.slice(3);

        // делает отрисовку оставшихся контактов
        remainingElem.forEach(el => {
            $clientContacts.append(el)
        })

        // удаляем информационную кнопку
        allBtnContact.remove()
    }

    $actionBtn.innerHTML = icons.createContact + ' Изменить'
    $deleteBtn.innerHTML = 'Удалить ' + icons.deleteContact

    $clientId.textContent = clientObj.id
    $dateCreate.textContent = getBirthDateString(clientObj.createdAt)
    $dateUpdate.textContent = getBirthDateString(clientObj.updatedAt)

    $clientContacts.classList.add('th-contacts')
    $action.classList.add('tr-action')
    $actionBtn.classList.add('btn', 'btn-dark')
    $deleteBtn.classList.add('btn', 'btn-danger')
    $client.classList.add('table-body__tr')

    // событие клика на кнопку изменить
    $actionBtn.addEventListener('click', function () {
        const createModal = modal(function (wrap, box, closeBtn) {
            // создадим элементы для модального окна изменения клиента
            const $modalWrap = document.createElement('div'),
                $title = document.createElement('h2'),
                $titleIdClient = document.createElement('span'),
                $inpWrap = document.createElement('div'),
                $wrapContacts = document.createElement('div'),
                $addContactsBtn = document.createElement('button'),
                $wrapBtn = document.createElement('div'),
                $saveBtn = document.createElement('button'),
                $deleteBtn = document.createElement('button'),
                $inputSurname = getInput('text', 'inp-Surname', 'Фамилия<sup>*</sup>', 'modal-input', true),
                $inputname = getInput('text', 'inp-Name', 'Имя<sup>*</sup>', 'modal-input', true),
                $inputLastname = getInput('text', 'inp-Lastname', 'Отчество', 'modal-input', true)

            // добавим классы
            $modalWrap.classList.add('modal-wrap')
            $title.classList.add('modal-action__title')
            $titleIdClient.classList.add('modal-title__span')
            $inpWrap.classList.add('input-wrap')
            $wrapContacts.classList.add('wrap-contacts')
            $addContactsBtn.classList.add('btn', 'add-btn-contacts', 'btn-dark')
            $wrapBtn.classList.add('wrap-btn')
            $saveBtn.classList.add('btn-save', 'btn', 'btn-dark')
            $deleteBtn.classList.add('btn', 'btn-danger', 'btn-remuve')

            // добавим текст и атрибуты
            $title.textContent = 'Изменить данные'
            $titleIdClient.textContent = 'ID: ' + clientObj.id
            $addContactsBtn.innerHTML = icons.addContact + 'Добавить контакт'
            $saveBtn.textContent = 'Сохранить изменения'
            $deleteBtn.textContent = 'Удалить клиента'
            $addContactsBtn.setAttribute('id', 'add-contact')

            // получим значения инпутов для их замены
            $inputLastname.$input.value = clientObj.lastName
            $inputSurname.$input.value = clientObj.surname
            $inputname.$input.value = clientObj.name

            // получим контакты клиента 
            for (const contact of clientObj.contacts) {
                $wrapContacts.append(getContacts(contact))
            }

            // событие кнопки добавить контакт
            $addContactsBtn.addEventListener('click', function () {
                // пушим функцию котоаря создает селекст, инпут и кнопку для блока контактов
                $wrapContacts.append(getContacts(), $addContactsBtn)
            })

            // событие кнопки удалить клиента
            $deleteBtn.addEventListener('click', function () {
                const deleteClientModal = modal(function (wrap, box, closeBtn) {
                    // создадим элементы для модального окна удаления клиента
                    const $modalWrap = document.createElement('div'),
                        $title = document.createElement('h2'),
                        $text = document.createElement('p'),
                        $delleteBtn = document.createElement('button'),
                        $cancel = document.createElement('button')

                    // добавим классы
                    $modalWrap.classList.add('modal-wrap__delete')
                    $title.classList.add('modal-title__delete')
                    $text.classList.add('modal-text__delete')
                    $delleteBtn.classList.add('modal-btn__delete', 'btn', 'btn-danger')
                    $cancel.classList.add('modal-btn__delete', 'btn', 'btn-dark')

                    $title.textContent = 'Удалить клиента'
                    $text.textContent = 'Вы действительно хотите удалить данного клиента?'
                    $delleteBtn.innerHTML = 'Удалить клиента ' + icons.deleteContact
                    $cancel.textContent = 'Отмена'

                    // событие клика на кнопку удаления клиента удалим клиента и две модалки
                    $delleteBtn.addEventListener('click', async function () {
                        await serverDeleteClient(clientObj.id)
                        $client.remove()
                        wrap.remove()
                        createModal.remove()
                    })

                    // собитие клика на кнопку отмены, удалим только одну модалку
                    $cancel.addEventListener('click', function () {
                        wrap.remove()
                    })

                    $modalWrap.append($title, $text, $delleteBtn, $cancel)
                    box.append($modalWrap)
                })
                document.body.append(deleteClientModal)
            })

            // делаем валидацию полей фио на каждый  клик по инпуту
            const inputArr = [$inputSurname, $inputname, $inputLastname]
            $inpWrap.addEventListener('click', function () {
                inputArr.forEach(inputWrap => {
                    validate(inputWrap)
                });
            })

            // событие кнопки сохранить клиента
            $saveBtn.addEventListener('click', async function () {

                let newObjClient = {}

                let validerrorAction = false
                inputArr.forEach(inputWrap => {
                    validerrorAction = validate(inputWrap)
                });

                if (validerrorAction === true) {
                    return
                }


                // делаем проверку селекта если тип не выбран выводим ошибку
                let valueSelect = ''
                $wrapContacts.querySelectorAll('.wrap-fields').forEach(el => {
                    valueSelect = el.querySelector('select').value;
                })

                if (valueSelect === 'Выберите') {

                    const errorMessage = document.createElement('p')
                    errorMessage.classList.add('error-massage__validContact')
                    errorMessage.textContent = 'Выберите тип контакта или "Other"'

                    let result
                    $wrapContacts.querySelectorAll('.wrap-fields_all').forEach(el => {
                        result = el.querySelectorAll('.error-massage__validContact')
                    })

                    if (result.length >= 1) {
                        return
                    } else {
                        $wrapContacts.querySelectorAll('.wrap-fields_all').forEach(el => {
                            el.append(errorMessage)
                        })
                    }
                    return
                }

                // создадим массив с данными контактов где будет значение и результат
                const contacts = []
                $wrapContacts.querySelectorAll('.wrap-fields').forEach(contact => {
                    contacts.push({
                        type: contact.querySelector('select').value,
                        value: contact.querySelector('input').value
                    })
                })

                // при прохождении валидации создаем объект нового клиента
                newObjClient.surname = $inputSurname.$input.value
                newObjClient.name = $inputname.$input.value
                newObjClient.lastname = $inputLastname.$input.value
                newObjClient.contacts = contacts
                newObjClient.id = clientObj.id

                let servDAta = await serverCreateClient(clientObj.id, newObjClient)
                clientObj = servDAta
                
                wrap.remove()
                render(clients)
            })

            $modalWrap.append($title, $titleIdClient, $inpWrap)
            $inpWrap.append($inputSurname.$inputWrap, $inputname.$inputWrap, $inputLastname.$inputWrap)
            $wrapContacts.append($addContactsBtn)
            $wrapBtn.append($saveBtn, $deleteBtn)
            box.append($modalWrap, $wrapContacts, $wrapBtn)

        }, function () { })

        document.body.append(createModal)
    })

    // событие клика на кнопку удалить
    $deleteBtn.addEventListener('click', function () {
        const deleteClientModal = modal(function (wrap, box, closeBtn) {
            // создадим элементы для модального окна удаления клиента
            const $modalWrap = document.createElement('div'),
                $title = document.createElement('h2'),
                $text = document.createElement('p'),
                $delleteBtn = document.createElement('button'),
                $cancel = document.createElement('button')

            // добавим классы
            $modalWrap.classList.add('modal-wrap__delete')
            $title.classList.add('modal-title__delete')
            $text.classList.add('modal-text__delete')
            $delleteBtn.classList.add('modal-btn__delete', 'btn', 'btn-danger')
            $cancel.classList.add('modal-btn__delete', 'btn', 'btn-dark')

            $title.textContent = 'Удалить клиента'
            $text.textContent = 'Вы действительно хотите удалить данного клиента?'
            $delleteBtn.innerHTML = 'Удалить клиента ' + icons.deleteContact
            $cancel.textContent = 'Отмена'

            // событие клика на кнопку удаления клиента удалим клиента и две модалки
            $delleteBtn.addEventListener('click', async function () {
                await serverDeleteClient(clientObj.id)
                $client.remove()
                wrap.remove()
            })

            // собитие клика на кнопку отмены, удалим только одну модалку
            $cancel.addEventListener('click', function () {
                wrap.remove()
            })

            $modalWrap.append($title, $text, $delleteBtn, $cancel)
            box.append($modalWrap)
        })
        document.body.append(deleteClientModal)
    })


    function getBirthDateString(obj) {
        const yyyy = new Date(obj).getFullYear();
        let mm = new Date(obj).getMonth() + 1;
        let dd = new Date(obj).getDate();
        let hh = new Date(obj).getHours();
        let min = new Date(obj).getMinutes();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + min
    }

    $action.append($actionBtn, $deleteBtn)
    $client.append($clientId, $clientFIO, $dateCreate, $dateUpdate, $clientContacts, $action)
    return $client
}

// функция отрисовки студента 
function render(array) {

    // очищаем таблицу
    page.$tableBody.innerHTML = ''

    // скопируем массив
    let copyClients = [...array]

    // запускаем функцию сортировки 
    copyClients = getSortClients(columnSort, columnDir, copyClients)

    // добавляем каждого студента в таблицу 
    for (const client of copyClients) {
        const newTr = newClient(client)

        page.$tableBody.append(newTr)
    }
}

render(clients)

const searchInput = document.querySelector('.header-search')

searchInput.addEventListener('keyup', async function () {
    let inputValue = this.value

    const res = await fetch(SERVER_URL + `/api/clients?search=${inputValue}`)
    let searchClients = await res.json()

    // searchClients = getSortClients(columnSort, columnDir)

    render(searchClients)
})


