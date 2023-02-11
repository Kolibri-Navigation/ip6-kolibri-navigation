import { Attribute, valueOf, NAME, LOGO, VISIBLE, HOMEPAGE, FAVICON, DEBUGMODE } from "../kolibri/presentationModel.js";
import { ObservableList } from "../kolibri/observable.js";

export { NavigationModel }

/**
 * NavigationModelType is the Model that contains the navigation-data from the application.
 * The model holds the page hashes of the accessible pages, the homepage, the websites name and the website logo.
 * @typedef NavigationModelType
 * @template T
 * @property { (pageHash: String) => void } addNavigationHash - a function that adds the hash of a page, calling all registered {@link observableListCallback}s.
 * @property { (pageHash: String) => void } deleteNavigationHash - a function that deletes the hash of a page, calling all registered {@link observableListCallback}s.
 * @property { (callback: observableListCallback) => Boolean } onAdd - a function that registers an {@link observableListCallback} that will be called whenever a page hash is added.
 * @property { (callback: observableListCallback) => Boolean } onDel - a function that registers an {@link observableListCallback} that will be called whenever a page hash is deleted.
 * @property { (obsType: String) => IObservable<T> } getNavObs      - a function that returns the navigation observable.
 * @property { (newHomepage: String) => void }       setHomepage    - a function that sets the homepage. the homepage is the fallback page which gets opened when no hash is provided in the request url. calling all registered {@link onValueChangeCallback}s.
 * @property { () => String }                        getHomepage    - a function that returns the hash of the homepage.
 * @property { (debugModeActive: Boolean) => void }  setDebugMode   - a function that sets the debug mode active state. calling all registered {@link onValueChangeCallback}s.
 * @property { () => Boolean }                       isDebugMode    - a function that returns the if the debug mode is active.
 * @property { (name: String) => void }              setWebsiteName - a function that sets the name for the website, calling all registered {@link onValueChangeCallback}s.
 * @property { () => String }                        getWebsiteName - a function that returns the name for the website.
 * @property { (logoSrcPath: String) => void }       setWebsiteLogo - a function that sets the path for the page logo that can be displayed in the navigation, calling all registered {@link onValueChangeCallback}s.
 * @property { () => String }                        getWebsiteLogo - a function that returns the path for the page logo that can be displayed in the navigation.
 * @property { (favIconSrcPath: String) => void }    setFavIcon     - a function that sets the favicon, calling all registered {@link onValueChangeCallback}s.
 * @property { () => String }                        getFavIcon     - a function that returns the path to the favicon.
 * @property { (callback: onValueChangeCallback<String>)  => void } onWebsiteNameChanged - a function that registers an {@link onValueChangeCallback} that will be called whenever the page name is changed.
 * @property { (callback: onValueChangeCallback<String>)  => void } onWebsiteLogoChanged - a function that registers an {@link onValueChangeCallback} that will be called whenever the page logo is changed.
 * @property { (callback: onValueChangeCallback<String>)  => void } onFavIconChanged     - a function that registers an {@link onValueChangeCallback} that will be called whenever the fav icon is changed.
 * @property { (callback: onValueChangeCallback<String>)  => void } onHomepageChanged    - a function that registers an {@link onValueChangeCallback} that will be called whenever the homepage is changed.
 * @property { (callback: onValueChangeCallback<Boolean>) => void } onDebugModeChanged   - a function that registers an {@link onValueChangeCallback} that will be called whenever the debug mode active state is changed.
 * @property { (callback: onValueChangeCallback<Boolean>) => void } onVisibleChanged     - a function that registers an {@link onValueChangeCallback} that will be called whenever a pages visibility is changed.
 */

/**
 * Constructor for a NavigationModelType.
 * @return { NavigationModelType }
 * @constructor
 * @example
 * const navigationModel = NavigationModel();
 * navigationModel.onWebsiteNameChanged(val => console.log(val));
 * navigationModel.setWebsiteName("new website name");
 */

const NavigationModel = () => {
    const navigationHashes = Attribute(ObservableList([]));

    navigationHashes.getObs(HOMEPAGE, '');
    navigationHashes.getObs(DEBUGMODE, 'false');

    return {
        addNavigationHash:    pageHash => valueOf(navigationHashes).add(pageHash),
        deleteNavigationHash: pageHash => valueOf(navigationHashes).del(pageHash),
        onAdd:                valueOf(navigationHashes).onAdd,
        onDel:                valueOf(navigationHashes).onDel,
        getNavObs:            navigationHashes.getObs,
        setWebsiteName:       navigationHashes.getObs(NAME).setValue,
        getWebsiteName:       navigationHashes.getObs(NAME).getValue,
        setWebsiteLogo:       navigationHashes.getObs(LOGO).setValue,
        getWebsiteLogo:       navigationHashes.getObs(LOGO).getValue,
        setFavIcon:           navigationHashes.getObs(FAVICON).setValue,
        getFavIcon:           navigationHashes.getObs(FAVICON).getValue,
        setHomepage:          navigationHashes.getObs(HOMEPAGE).setValue,
        getHomepage:          navigationHashes.getObs(HOMEPAGE).getValue,
        setDebugMode:         navigationHashes.getObs(DEBUGMODE).setValue,
        isDebugMode:          navigationHashes.getObs(DEBUGMODE).getValue,
        onWebsiteLogoChanged: navigationHashes.getObs(LOGO).onChange,
        onWebsiteNameChanged: navigationHashes.getObs(NAME).onChange,
        onFavIconChanged:     navigationHashes.getObs(FAVICON).onChange,
        onHomepageChanged:    navigationHashes.getObs(HOMEPAGE).onChange,
        onDebugModeChanged:   navigationHashes.getObs(DEBUGMODE).onChange,
        onVisibleChanged:     navigationHashes.getObs(VISIBLE).onChange,
    }
};
