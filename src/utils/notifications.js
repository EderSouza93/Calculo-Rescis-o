export const notification = (message, backgroundColor, time) => {
    Toastify({
        text: message,
        duration: time,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: backgroundColor,
        },
    }).showToast();
};