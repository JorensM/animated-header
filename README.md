# animated-header
 Just a small header component with a neat transition. Written with vanilla JS

## Setup

1. download the `AnimatedNav` file and include it in your page via
`<script/>` tag. 
2. Create an navigation element with items. This element should have an id of `nav` if using default options.
3. Create an underline element. It can have any style you want, but it should have
`position: absolute`. This element should have an id of `underline` if using default options.
4. Intanstiate the `AnimatedNav` class and optionally pass a single options object
as an argument

## Options

 * `navList` - CSS selector for the element that holds the nav items. Default `#nav`
 * `underline` - CSS selector for the underline element. Default `#underline`
 * `defaultBehavior` - Whether the default behavior should be used.
 * The default behavior is that when a nav item is clicked, it gets selected. If you want
 * to have custom behavior, set this to `false` and programmatically invoke the 
 * `selectNavItem()` method to select a nav item. Default `true`
 * `transitionLength` - How long, in MS, should the transition last
