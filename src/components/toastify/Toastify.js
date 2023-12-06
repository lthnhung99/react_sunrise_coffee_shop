import { Flip, Zoom, toast } from "react-toastify";

export const ToastSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        theme: "light",
    });
};

export const ToastError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
        theme: "light",
    });
};

export const ToastInfo = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

export const ToastWarning = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const ToastifySuccess = (message) => {
    ToastSuccess(message);
};

export const ToastifyInfo = (message) => {
    ToastInfo(message);
};

export const ToastifyError = (message) => {
    ToastError(message);
};

export const ToastifyWarning = (message) => {
    ToastWarning(message);
};

