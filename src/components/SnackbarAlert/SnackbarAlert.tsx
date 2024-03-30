import { Alert, Snackbar } from '@mui/material';

interface SnackbarAlertProps {
    handleClose: () => void;
    open: boolean;
    isError: boolean;
    message: string;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = (
    props: SnackbarAlertProps,
) => {
    return (
        <>
            <Snackbar
                open={props.open}
                autoHideDuration={6000}
                onClose={props.handleClose}
            >
                <Alert
                    onClose={props.handleClose}
                    severity={props.isError ? 'error' : 'success'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackbarAlert;
