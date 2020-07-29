import {polyfills} from "./utils/polyfills";
import modalWindow from "./modules/modal-window"; // Скрипт открытия и закрытия модального окна, валидация;
import phoneMask from "./modules/phone-mask"; // Скрипт для маски в поле ввода телефона;
import scroll from "./modules/scroll"; // Скрипт нижнего скролла для кнопки на главной странице;
import {setServicesSlider, tabs} from "./modules/tabs"; // Инициализация свайпера и подключение табов;
import {setServicesSecondSlider} from "./modules/life"; // Инициализация свайпера и подключение слайдера из блока о жизни;
import accord from "./modules/accord"; // Скрипт для аккорджеона;
import enableSwiperFeedback from "./modules/feedback"; // Инициализация слайдера в разделе отзывы;

// Utils
// ---------------------------------

polyfills();

// Modules
// ----------------------------------

modalWindow();
phoneMask();
scroll();
setServicesSlider();
tabs();
setServicesSecondSlider();
accord();
enableSwiperFeedback();
