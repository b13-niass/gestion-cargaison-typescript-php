import { DAO } from "./Model/DAO.js";
(async () => {
    const dao = new DAO();
    const DB = await dao.getData();
    console.log(DB);
})();
