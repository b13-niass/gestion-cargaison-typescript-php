import { DAO } from "./Model/DAO.js";
import { LoginFormHandle } from "./Model/LoginFormHandle.js";
(async () => {
    /** Variable Declaration **/
    const dao = new DAO();
    const DB = await dao.getData();
    const formLoginGestionnaire = new LoginFormHandle("#formLoginGestionnaire");
    const closeNotification = document.getElementById('close-btn');
    const notification = document.getElementById('notification');
    /** Function Declaration **/
    const showErrorNotification = () => {
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 60000);
    };
    /** Initialisation **/
    /** Event Declaration **/
    closeNotification.addEventListener('click', () => {
        notification.classList.add('hidden');
    });
    formLoginGestionnaire.handleSubmit(async (d) => {
        const result = await dao.postDataOther({ ...d, ...{ formulaires: "login" } });
        if (result) {
            sessionStorage.setItem('ges', JSON.stringify(result));
            window.location.href = "/cargo";
        }
        else {
            showErrorNotification();
        }
    });
})();
