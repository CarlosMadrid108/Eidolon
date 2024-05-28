import config from '../config/config.js';
import MongoCartController from './db/controllers/cartController.js';
import MongoProductController from './db/controllers/productController.js';
import MongoSessionController from './db/controllers/sessionController.js';
import MongoUserController from './db/controllers/userController.js';


export let CartConstructors
export let ProductContructors
export let SessionConstructors
export let loginStrategy
export let registerStrategy
export let UserConstructors

switch(config.persistence){

    case "MONGO":
    CartConstructors = MongoCartController
    ProductContructors = MongoProductController
    SessionConstructors = MongoSessionController
    UserConstructors = MongoUserController
    loginStrategy = 'login'
    registerStrategy = 'register'
    break;
}