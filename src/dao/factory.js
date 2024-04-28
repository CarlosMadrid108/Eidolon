import config from '../config/config.js';
import MongoCartController from './db/controllers/cartController.js';
import MongoProductController from './db/controllers/productController.js';
import MongoSessionController from './db/controllers/sessionController.js';
import { MongoPolicies } from './db/config/policies.js';


export let CartConstructors
export let ProductContructors
export let SessionConstructors
export let PoliciesContructor
export let loginStrategy
export let registerStrategy

switch(config.persistence){

    case "MONGO":
    CartConstructors = MongoCartController
    ProductContructors = MongoProductController
    SessionConstructors = MongoSessionController
    PoliciesContructor = MongoPolicies
    loginStrategy = 'login'
    registerStrategy = 'register'
    break;
}