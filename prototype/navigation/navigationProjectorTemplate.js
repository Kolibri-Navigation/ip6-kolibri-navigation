import { ObservableList } from "../kolibri/observable.js";
import {dom} from "../kolibri/util/dom";

export { NavigationProjector }

/**
 * @typedef NavigationProjectorType
 */

/**
 * @constructor
 * @param { !NavigationControllerType } controller
 * @param { !HTMLDivElement } pinToElement
 * @return { NavigationProjectorType }
 * @example
 * const navigationController = NavigationController();
 * NavigationProjector(navigationController, pinToNavElement);
 */
const NavigationProjector = (controller, pinToElement) => {
    const positionWrapper = pinToElement;
    const observableNavigationAnchors = ObservableList([]);
    const navigationAnchors = [];

    /**
     * Initializes a navigation anchor
     *
     * @function
     * @param hash - the hash that represents the identifier of a page
     * @return { HTMLAnchorElement }
     *
     */
    const initializeNavigationPoint = hash => {
        // Initialize your navigation anchors here...
        const navigationPointName = hash.substring(1);

        // initialize anchor
        const anchorDom = dom(`
            <a href="${hash}">${navigationPointName}</a>
        `);

        // get anchor from collection
        const anchor = anchorDom[0];

        return anchor;
    };

    /**
     * Binds the navigation anchors to the DOM.
     *
     * @function
     * @return void
     */
    const projectNavigation = () => {
        const navigationDiv = document.createElement("div");
        // insert your projector code here...

        if (positionWrapper.firstChild === null) {
            positionWrapper.appendChild(navigationDiv)
        } else {
            positionWrapper.replaceChild(navigationDiv, positionWrapper.firstChild);
        }
    };

    observableNavigationAnchors.onAdd(anchor => {
        controller.registerAnchorClickListener(anchor);
        navigationAnchors.push(anchor);
    });

    controller.onNavigationHashAdd(hash => {
        const newNavPoint = initializeNavigationPoint(hash);
        observableNavigationAnchors.add(newNavPoint);

        // CREATE BINDINGS
        // controller.getPageController(hash).onValueChanged((newValue, oldValue) => {
        //      do something with binding
        //}
        // END

        projectNavigation();
    });
};