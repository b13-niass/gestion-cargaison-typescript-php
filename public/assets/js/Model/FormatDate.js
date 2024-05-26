export class FormatDate {
    formatDate1(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formattedDay = (day < 10 ? "0" : "") + day;
        let formattedMonth = (month < 10 ? "0" : "") + month;
        return formattedDay + "/" + formattedMonth + "/" + year;
    }
    // YYYY/MM/DD format to 2022-02-01T16:45:30
    formatDate2(originalDate) {
        // Split the original date string by "/"
        let parts = originalDate.split("/");
        // Extract day, month, and year
        let day = parseInt(parts[0]);
        let month = parseInt(parts[1]);
        let year = parseInt(parts[2]);
        // Create a new date object
        let dateObj = new Date(year, month - 1, day); // Note: Month is zero-based in JavaScript
        // Extract hours, minutes, and seconds (assuming they are 16:45:30)
        let hours = "16";
        let minutes = "45";
        let seconds = "30";
        // Format the date object into desired format
        let formattedDate = dateObj.getFullYear() +
            "-" +
            ("0" + (dateObj.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateObj.getDate()).slice(-2) +
            "T" +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
        return formattedDate;
    }
    // 2024-05-02 to 02/05/2024
    formatDate3(originalDate) {
        let dateObj = new Date(originalDate);
        let day = ("0" + dateObj.getDate()).slice(-2);
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Month is zero-based
        let year = dateObj.getFullYear();
        let formattedDate = day + "/" + month + "/" + year;
        return formattedDate;
    }
    // 02/05/2024 to 2024-05-02
    formatDate4(originalDate) {
        // Split the original date string by "/"
        let parts = originalDate.split("/");
        // Extract day, month, and year
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];
        // Format the date components into the desired format
        let formattedDate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
        return formattedDate;
    }
    // 2022-02-01T16:45:30 to 2024-05-02
    formatDate5(originalDate) {
        let dateObj = new Date(originalDate);
        let year = dateObj.getFullYear();
        let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        let day = ("0" + dateObj.getDate()).slice(-2);
        let formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    }
    // YYYY-MM-DD format to 2022-02-01T16:45:30
    formatDate6(originalDate, heureChoisit) {
        let parts = originalDate.split("-");
        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]);
        let day = parseInt(parts[2]);
        let dateObj = new Date(year, month - 1, day);
        let hours = heureChoisit[0];
        let minutes = heureChoisit[1];
        let seconds = "00";
        let formattedDate = dateObj.getFullYear() +
            "-" +
            ("0" + (dateObj.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateObj.getDate()).slice(-2) +
            "T" +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
        return formattedDate;
    }
}
