/**
 * @typedef { Object } AnimatedNavOptions
 * @property { string } navList - CSS selector for the element that holds the nav items
 * @property { string } underline - CSS selector for the underline element
 * @property { boolean } defaultBehavior - Whether the default behavior should be used.
 * The default behavior is that when a nav item is clicked, it gets selected. If you want
 * to have custom behavior, set this to `false` and programmatically invoke the 
 * `selectNavItem()` method to select a nav item
 * @property { number } transitionLength - How long, in MS, should the transition last
 */

/**
 * @type { Required<AnimatedNavOptions> }
 * Default options
 */
const defaultOptions = {
    navList: '#nav',
    underline: '#underline',
    defaultBehavior: true,
    transitionLength: 400
}

class AnimatedNav {

    /**
     * @type { HTMLCollection }
     * List of nav items
     */
    navListItems;// = document.getElementById('nav').children;

    /**
     * @type { HTMLElement }
     * The currently selected nav item
     */
    activeElement;// = navListItems.item(0);

    /**
     * @type { number }
     * The index of the currently selected nav item
     */
    activeElementIndex = 0;

    /**
     * @type { HTMLElement }
     * The underline element
     */
    underline;

    /**
     * @type { Required<AnimatedNavOptions> }
     * Options
     */
    options;

    /**
     * 
     * @param { Partial<AnimatedNavOptions> } [options] 
     */
    constructor(options) {

        this.options = {
            ...defaultOptions,
            ...options
        }

        const navList = document.querySelector(this.options.navList);

        this.navListItems = navList.children;

        this.activeElement = /** @type { HTMLElement } */ (this.navListItems.item(0));

        this.underline = document.querySelector(this.options.underline)

        this.underline.style.left = this.activeElement.getBoundingClientRect().x + 'px';
        this.underline.style.width = this.activeElement.getBoundingClientRect().width + 'px';
        this.underline.style.transitionDuration = (this.options.transitionLength / 2) + 'ms';

        if(this.options.defaultBehavior) {
            this.addEventListeners();
        }

    }

    addEventListeners() {
        for(let i = 0; i < this.navListItems.length; i++) {
            const item = this.navListItems.item(i);
            item.addEventListener('click', () => this.selectNavItem(i))
        }
    }

    selectNavItem(index) {

        // Skip if item is already selected
        if(index == this.activeElementIndex) {
            return;
        }
    
        const lastItem = this.activeElement;
        const lastItemIndex = this.activeElementIndex
        this.activeElement = /** @type { HTMLElement } */ (this.navListItems.item(index));
        this.activeElementIndex = index;
    
        lastItem.classList.remove('selected-item');
        this.activeElement.classList.add('selected-item');
    
        const newUnderlinePosition = this.activeElement.getBoundingClientRect().x;
        const newUnderlineWidth = this.activeElement.getBoundingClientRect().width;
    
        if(index > lastItemIndex) {
            console.log('moving')
            this.moveUnderlineForward(newUnderlinePosition, newUnderlineWidth);
        } else {
            this.moveUnderlineBack(newUnderlinePosition, newUnderlineWidth);
        }
    
    }

    moveUnderlineForward(position, width) {
        const lastPosition = this.underline.getBoundingClientRect().x;
    
        const widthBeforeMove = (position + width) - lastPosition
    
        this.underline.style.width = widthBeforeMove + 'px';
        setTimeout(() => {
            this.underline.style.left = position + 'px';
            this.underline.style.width = width + 'px';
        }, this.options.transitionLength / 2)
        
    }
    
    moveUnderlineBack(position, width) {
        const lastPosition = this.underline.getBoundingClientRect().x;
        const lastWidth = parseFloat(getComputedStyle(this.underline).width)
    
        const widthBeforeMove = (lastPosition + lastWidth) - position;
    
        this.underline.style.width = widthBeforeMove + 'px';
        this.underline.style.left = position + 'px';
        setTimeout(() => {
            this.underline.style.width = width + 'px';
        }, this.options.transitionLength / 2)
    }
}