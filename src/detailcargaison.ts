import {DAO} from "./Model/DAO.js";
import {DBStructure} from "./Interface/DataBinding.js";

(async () => {
    const dao = new DAO();
    const DB: DBStructure = await dao.getData();
    console.log(DB);
})()