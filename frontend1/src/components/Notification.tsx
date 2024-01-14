import { Alert, Slide, SlideProps, Snackbar, SnackbarCloseReason } from "@mui/material";

import { useNotification } from "../hooks/useNotification";
const Notification = () => {
  const { notification, showNotification } = useNotification();

  const closeNotification = (reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    showNotification(null, notification.severity, 3000);
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }
  return (
    <Snackbar
      id="notification"
      sx={{ zIndex: 9999999 }}
      TransitionComponent={SlideTransition}
      open={notification.message !== null && notification.message !== ""}
      autoHideDuration={notification.timeout}
      onClose={(_, reason) => closeNotification(reason)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() => closeNotification("escapeKeyDown")}
        id="notification-alert"
        severity={notification.severity}
        sx={{ width: "100%", zIndex: 9999 }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
