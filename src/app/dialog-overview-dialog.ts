import { Component, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data-model';

export interface Channel {
  id: string;
  name: string;
}
export interface RequestModel {
  id: string;
  email_customer: string;
}

@Component({
  //selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css'],
})
export class DialogOverviewExampleDialog {
  //let param = this.resolve();

  public dismiss: Function;
  public resolve: Function;

  // internal properties
  public comment = '';
  public channel: Channel;
  public requests: RequestModel[];
  public containerIds: string[];
  public valid: boolean;

  //public body: Omit<MailReplyDTO_V2, IgnoredProps>;

  addOnBlurCC = true;
  addOnBlurBCC = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  CCs: string[] = [];
  BCCs: string[] = [];
  selectedFiles: File[] = [];

  attachments: string[] = [];
  emailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.emailForm = this.fb.group({
      objectControl: ['', [Validators.required]],
      commentControl: ['', [Validators.required]],
    });
    this.channel = data.channel;
    this.containerIds = data.loaderContainerIds;
    this.requests = data.requests;
  }

  cancel(): void {
    this.dismiss();
  }

  // get transfer from event object
  onAnswerChange() {
    //console.log("Inside onAnswerChange() :: Typed comment :: " + this.comment);
    if (this.comment.length !== 0) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
    //console.log('after remove:: ' + JSON.stringify(this.selectedFiles));
  }

  addAddress(addressType: string, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (addressType === 'cc') {
      // Add our fruit
      if (value) {
        this.CCs.push(value);
      }
    } else {
      if (value) {
        this.BCCs.push(value);
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeAddress(addressType: string, email: string): void {
    if (addressType === 'cc') {
      const index = this.CCs.indexOf(email);
      if (index >= 0) {
        this.CCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    } else {
      const index = this.BCCs.indexOf(email);
      if (index >= 0) {
        this.BCCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    }
  }

  validate() {
    /* 
      export interface DialogData {
  CCs: string[];
  BCCs: string[];
  object: string;
  comment: string;
  selectedFiles: File[];
  channel: Channel;
  loaderContainerIds: string[];
  requests: RequestModel[];
}

    */
    //console.log('validate button clicked ...');
    this.data.CCs = this.CCs;
    this.data.BCCs = this.BCCs;
    this.data.selectedFiles = this.selectedFiles;
    this.data.object = this.emailForm.get('objectControl')?.value;
    this.data.comment = this.emailForm.get('commentControl')?.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  json(data: any) {
    return JSON.stringify(data);
  }
}
