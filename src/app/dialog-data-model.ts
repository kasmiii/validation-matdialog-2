import { Channel, RequestModel } from './dialog-overview-dialog';

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
