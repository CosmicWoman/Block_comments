const set_event_on_click = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onclick = handler;
    }
}

const set_event_on_keydown = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onkeydown  = handler;
    }
}

const set_event_on_keyup = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onkeyup  = handler;
    }
}

const set_event_on_submit = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onsubmit = handler;
    }
}

const set_event_on_change = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onchange = handler;
    }
}