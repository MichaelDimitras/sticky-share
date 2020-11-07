const spawnArea = document.getElementById('spawn-area');

const noteTemplate = `<div class="box-header">
                        <a href="#" class="right remove hidden">&times;</a>
                      </div>
                      <textarea class="note-text">
                      </textarea>`

const dragElement = (elmnt) => {
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        startX = e.clientX;
        startY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    const elementDrag = (e) => {
        
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        offsetX = startX - e.clientX;
        offsetY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;
        
        elmnt.style.top = (elmnt.offsetTop - offsetY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - offsetX) + "px";
    }

    const closeDragElement = (e) => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    const header = elmnt.querySelectorAll('.box-header')[0];
    header.onmousedown = dragMouseDown;
}

const spawn = (color = 'pink') => {
    const note = document.createElement('div');
    note.classList.add('box', 'note', color);
    note.innerHTML = noteTemplate;
    attachHandlers(note);
    spawnArea.insertAdjacentElement('afterend', note);
};

document.getElementById('spawner').onclick = (e) => spawn();

const enterText = (e, elem) => {
    elem.querySelectorAll('textarea')[0].focus();
}

const deleteElement = (e, elem) => {
    elem.remove();
}

const attachHandlers = (element) => {    
    const textarea = element.querySelectorAll('textarea')[0];
    textarea.addEventListener('click', (e) => { enterText(e, element) });

    dragElement(element)

    const removeButton = element.querySelectorAll('.remove')[0];
    removeButton.addEventListener('click', (e) => {deleteElement(e, element)});
}