"use strict";

import {polyfills} from "./utils/polyfills";

// Modules
// ----------------------------------

import modalWindow from "./modules/modal-window"; // Скрипт открытия и закрытия модального окна;
import phoneMask from "./modules/phone-mask"; // Скрипт для маски в поле ввода телефона;
import validateAndSendForm from "./modules/validate&send-form"; // Скрипт проверки валидности полей формы и отправки данных в localstorage;
import scroll from "./modules/scroll"; // Скрипт нижнего скролла для кнопки на главной странице;
import swiper from "./vendor/swiper"; // Подключение свайпера;
import {mySwiper, tabs} from "./modules/tabs"; // Инициализация свайпера и подключение табов;

modalWindow();
phoneMask();
validateAndSendForm();
scroll();
tabs();

// Utils
// ---------------------------------

polyfills();
