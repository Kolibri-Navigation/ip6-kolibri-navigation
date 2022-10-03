import { PageProjector } from "./pages/pageProjector.js";
import { PageModel } from "./pages/pageModel.js";
import { homePage } from "./pages/homePage.js";
import { NavigationModel } from "./navigation/navigationModel.js";
import { NavigationController } from "./navigation/navigationController.js";
import { PageController } from "./pages/pageController.js";
import { NavigationProjector } from "./navigation/navigationProjector.js";

const homePageModel = PageModel('home', homePage);
const homePageController = PageController(homePageModel);
const homePageProjector = PageProjector(homePageController);

const subPageModel = PageModel('sub', homePage);
const subPageController = PageController(subPageModel);
const subPageProjector = PageProjector(subPageController);

const navigationModel = NavigationModel();
const navigationController = NavigationController(navigationModel);
const navigationProjector = NavigationProjector(navigationController);


/*
const homePageProj = PageProjector(homePage);
const homePageController =

const homePagePage = PageModel('home', homePageProj);
const testPage = PageModel('test', homePageProj);

const model = NavigationModel(homePagePage);
const controller = NavigationController(model);

controller.addNavigationPoint(testPage);
*/
