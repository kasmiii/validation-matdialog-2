import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from './dialog-data-model';
import { DialogOverviewExampleDialog } from './dialog-overview-dialog';

/*export interface DialogData {
  animal: string;
  name: string;
}*/

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
})
export class DialogOverviewExample {
  //animal: string;
  //name: string;
  cpData: DialogData;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.cpData = {
      CCs: [],
      BCCs: [],
      object: '',
      comment: '',
      selectedFiles: [],
      channel: {
        id: 'some_id',
        name: 'channel_name',
      },
      loaderContainerIds: [],
      requests: [
        {
          id: 'string',
          email_customer: 'string',
        },
      ],
    };
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { ...this.cpData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.cpData = result;
    });
  }
}
