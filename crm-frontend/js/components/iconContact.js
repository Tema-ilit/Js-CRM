import { icons } from "./icons.js"
export function contactIcon(type) {
    if (type === 'Vk') {
        return icons.vkIcon
    } else if (type === 'Tel') {
        return icons.phoneIcon
    } else if (type === 'Fb') {
        return icons.fbIcon
    } else if (type === 'Email') {
        return icons.mailIcon
    } else if (type === 'Other') {
        return icons.contact
    } else if (type === 'Выберите') {
        return icons.contact
    }
}
