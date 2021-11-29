import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";

interface PropsInterface {
  notification: {
    status: boolean;
    response: string;
  };
}

const NoteInformation = (props: PropsInterface) => {
  const { notification } = props;

  const response = notification.response;
  const status = notification.status;

  useEffect(() => {
    if (!response.length) return;
    if (typeof window !== "undefined") injectStyle();

    toast.dark(response);
  }, [status, response]);

  return <ToastContainer limit={2} />;
};

export default NoteInformation;
