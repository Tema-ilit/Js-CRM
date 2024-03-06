 // функция сортировки студентов
 export function getSortClients(prop, dir, arr) {
    const copyClient = [...arr]
    for (const client of copyClient) {
        client.fio = `${client.surname} + ${client.name} + ${client.lastname}`
    }
    return copyClient.sort(function (clientA, clientB) {
        if ((!dir == false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]))
            return -1
    })

    
}