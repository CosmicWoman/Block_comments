const set_event_on_click = (selector, handler) => {
    let elements = document.querySelectorAll(selector);
    for(let element of elements) {
        element.onclick = handler;
        // console.log('Handler: ' + handler.name + ' set to selector: ' + selector);
    }
}