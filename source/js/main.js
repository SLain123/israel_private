import {polyfills} from "./utils/polyfills";
import modalWindow from "./modules/modal-window"; // Скрипт открытия и закрытия модального окна;
import phoneMask from "./modules/phone-mask"; // Скрипт для маски в поле ввода телефона;
import validateAndSendForm from "./modules/validate&send-form"; // Скрипт проверки валидности полей формы и отправки данных в localstorage;
import scroll from "./modules/scroll"; // Скрипт нижнего скролла для кнопки на главной странице;
import {setServicesSlider, tabs} from "./modules/tabs"; // Инициализация свайпера и подключение табов;
import {setServicesSecondSlider} from "./modules/life"; // Инициализация свайпера и подключение слайдера из блока о жизни;
import accord from "./modules/accord"; // Скрипт для аккорджеона;

// Utils
// ---------------------------------

polyfills();

// Modules
// ----------------------------------

modalWindow();
phoneMask();
validateAndSendForm();
scroll();
setServicesSlider();
tabs();
setServicesSecondSlider();
accord();
