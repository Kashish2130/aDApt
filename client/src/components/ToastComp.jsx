import { toast } from "react-hot-toast";

// Show success toast
const Success = (message) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: "#B1F0F7",
      color: "#000",
      fontFamily: "'Grandstander Variable', system-ui",
    },
  });
};

// Show error toast
const Error = (message) => {
  toast.error(message, {
    duration: 3000,
    style: {
      background: "#B1F0F7",
      color: "#000",
      fontFamily: "'Grandstander Variable', system-ui",
    },
  });
};

export { Success, Error };
