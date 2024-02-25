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

    constructor(options) {

        this.options = {
            ...defaultOptions,
            ...options
        }

        const navList = document.querySelector(this.options.navList);

        this.navListItems = navList.children;

        activeElement = navListItems.item(0);

        underline = document.querySelector(this.options.underline)

        if(this.options.defaultBehavior) {
            this.addEventListeners();
        }

    }

    addEventListeners() {
        for(let i = 0; i < navListItems.length; i++) {
            const item = navListItems.item(i);
            item.addEventListener('click', () => selectNavItem(i))
        }
    }

    selectNavItem(index) {

        // Skip if item is already selected
        if(index == activeElementIndex) {
            return;
        }
    
        const lastItem = this.activeElement;
        const lastItemIndex = this.activeElementIndex
        //this.activeElement = this.navListItems.item(index);
        this.activeElementIndex = index;
    
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
}