import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";

(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();

    /** Function Declaration **/

    /** Initialisation **/


    /** Event Declaration **/

})()