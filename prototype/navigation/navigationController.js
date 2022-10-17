import { Attribute, VALUE, valueOf } from "../kolibri/presentationModel.js";
import { NavigationModel } from "./navigationModel.js";

export { NavigationController }

/**
 * Controller that coordinates communication between model and projector
 *
 * @typedef NavigationControllerType
 * @property { (pageController: PageControllerType) => Boolean } addPageController
 * @property { (pageHash: String) => PageControllerType } getPageController
 * @property { (pageHash: String) => Boolean } deletePageController
 * @property { (callback: observableListCallback) => Boolean } onNavigationHashAdd
 * @property { (callback: observableListCallback) => Boolean } onNavigationHashDel
 * @property { (callback: onValueChangeCallback<PageControllerType>) => void } onLocationChanged
 * @property { (callback: onValueChangeCallback<String>) => void } onWebsiteLogoChanged
 * @property { (callback: onValueChangeCallback<Boolean>) => void } onVisibleChanged
 * @property { (anchor: HTMLAnchorElement) => void } registerAnchorClickListener
 */

/**
 * @constructor
 * @return  { NavigationControllerType }
 * @example
 */
const NavigationController = () => {
    const navigationModel = NavigationModel();
    const currentLocation = Attribute(null);
    const pageControllers = {};

    const navigate = hash => {
        if (window.location.hash !== hash) {
            window.location.hash = hash;
            const newLocation = pageControllers[hash];
            newLocation.activate();
            // on initialization the currentLocation can be null and therefore not passivated
            if (valueOf(currentLocation) !== null) {
                valueOf(currentLocation).passivate();
            }
            currentLocation.getObs(VALUE).setValue(newLocation);
        }

    };

    window.onhashchange = () => {
        const hash = window.location.hash;
        navigate(hash);
    };

    return {
        addPageController: pageController => {
            const hash = pageController.getHash();
            if(pageControllers[hash] === undefined) {
                pageControllers[hash] = pageController;
                navigationModel.addPageController(hash);
                return true;
            } else {
                return false;
            }
        },
        getPageController: pageHash => pageControllers[pageHash],
        deletePageController: pageHash => {
            navigationModel.deletePageController(pageHash);
            return delete pageControllers[pageHash];
        },
        onNavigationHashAdd: navigationModel.onAdd,
        onNavigationHashDel: navigationModel.onDel,
        onLocationChanged: currentLocation.getObs(VALUE).onChange,
        onWebsiteLogoChanged: navigationModel.onWebsiteLogoChanged,
        onVisibleChanged: navigationModel.onVisibleChanged,
        registerAnchorClickListener: anchor => {
            anchor.onclick = e => {
                e.preventDefault();
                const hash = e.currentTarget.getAttribute('href');
                navigate(hash);
            };
        }
    }
};