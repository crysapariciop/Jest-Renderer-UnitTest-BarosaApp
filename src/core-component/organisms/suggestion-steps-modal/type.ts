export interface ModalTypes {
  type: string;
  showModal: boolean;
  onChangeTextValue?: (val: string) => void;
  value?: string;
  participants: [];
  onChangeTextDays?: (val: string) => void;
  daysValue?: string;
  onPressCancel?: () => void;
  onPressSend?: (mssg: any, mssgType?: string) => void;
}
