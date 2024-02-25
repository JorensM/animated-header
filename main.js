// Convert NodeList to array so we can use functions like indexOf
const navListItems = document.getElementById('nav').children;
let activeElement = navListItems.item(0);
let activeElementIndex = 0;
const underline = document.getElementById('underline');
// const underlineContainer = document.getElementById('underline-container');
const underlineTransitionLength = 200;

const addEventListeners = () => {
    for(let i = 0; i < navListItems.length; i++) {
        const item = navListItems.item(i);
        item.addEventListener('click', () => selectNavItem(i))
    }
}

addEventListeners();
underline.style.left = activeElement.getBoundingClientRect().x + 'px';
underline.style.width = activeElement.getBoundingClientRect().width + 'px';

const selectNavItem = (index) => {

    // Skip if item is already selected
    if(index == activeElementIndex) {
        return;
    }

    const lastItem = activeElement;
    const lastItemIndex = activeElementIndex
    activeElement = navListItems.item(index);
    activeElementIndex = index;

    lastItem.classList.remove('selected-item');
    activeElement.classList.add('selected-item');

    const newUnderlinePosition = activeElement.getBoundingClientRect().x;
    const newUnderlineWidth = activeElement.getBoundingClientRect().width;

    if(index > lastItemIndex) {
        console.log('moving')
        moveUnderlineForward(newUnderlinePosition, newUnderlineWidth);
    } else {
        moveUnderlineBack(newUnderlinePosition, newUnderlineWidth);
    }

}

const moveUnderlineForward = (position, width) => {
    const lastPosition = underline.getBoundingClientRect().x;
    const lastWidth = underline.getBoundingClientRect().width;

    const widthBeforeMove = (position + width) - lastPosition

    // underline.style.left = position + 'px';
    underline.style.width = widthBeforeMove + 'px';
    setTimeout(() => {
        // underline.style.direction = 'rtl';
        underline.style.left = position + 'px';
        underline.style.width = width + 'px';
        // underline.style.width = width
    }, underlineTransitionLength)
    
}

const moveUnderlineBack = (position, width) => {
    const lastPosition = underline.getBoundingClientRect().x;
    const lastWidth = underline.getBoundingClientRect().width;

    const widthBeforeMove = (lastPosition + lastWidth) - position

    // underline.style.left = position + 'px';
    underline.style.left = position + 'px';
    underline.style.width = widthBeforeMove + 'px';
    // underline.style.width = widthBeforeMove + 'px';
    setTimeout(() => {
        // underline.style.direction = 'rtl';
        underline.style.width = width + 'px';
        // underline.style.width = width
    }, underlineTransitionLength)
}