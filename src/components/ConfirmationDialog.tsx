import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog(props: any) {
  const handleCloseYes = () => {
    props.takeAction();
    props.handleClose(false);
  };

  const handleCloseNo = () => {
    props.handleClose(false);
  };

  return (
    <div>
      <Dialog
        open={props.isConfirmationDialogOpen}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Confirmation ? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.confirmationMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseYes} variant="contained" color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseNo} variant="contained" color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
