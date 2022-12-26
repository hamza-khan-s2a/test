import { getCartItems } from "./localStroage"

export const parseRequestUrl = () => {
    const url = window.location.hash.toLowerCase()
    const request = url.split('/')

    return {
        resourse: request[1],
        id: request[2],
        action: request[3]
    }
}

export const rerender = async (component) => {
    document.querySelector('#main-container').innerHTML = await component.render();
    await component.after_render()
    console.log("rerendering");

}

export const logData = (data) => {
    console.log(data);
}

export const showLoading = () => {
    document.querySelector('#loading-overlay').classList.add('active')
}

export const hideLoading = () => {
    document.querySelector('#loading-overlay').classList.remove('active')
}

export const showMessage = (message, callback) => {
    const messageOverlay = document.querySelector('#message-overlay')
    messageOverlay.innerHTML = `
        <div>
            <div class="message-overlay-content">
                ${message}
            </div>
            <button class="message-overlay-close-button">OK</button>
        </div>
        `
    messageOverlay.classList.add('active')
    document.querySelector('.message-overlay-close-button')
        .addEventListener('click', () => {
            messageOverlay.classList.remove('active')
            if (callback) {
                callback()
            }
        })
}

export const redirectUser = () => {
    if (getCartItems().length !== 0) {
        document.location.hash = '/shipping'
    } else {
        document.location.hash = '/'

    }
}

export const currencyType = () => "Rupees"
export const brandName = () => "N H Jewellers" 