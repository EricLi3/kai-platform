import { Alert, Button, Snackbar } from '@mui/material';

const Notification = ({ message, open, onClose, severity = 'success' }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert severity={severity} sx={{ width: '100%' }}>
      {message}
      {severity === 'error' && (
        <Button color="secondary" size="small" onClick={onClose} sx={{ ml: 1 }}>
          Dismiss
        </Button>
      )}
    </Alert>
  </Snackbar>
);

const SuccessNotification = (props) => (
  <Notification {...props} severity="success" />
);

const ErrorNotification = (props) => (
  <Notification {...props} severity="error" />
);

export { SuccessNotification, ErrorNotification };
