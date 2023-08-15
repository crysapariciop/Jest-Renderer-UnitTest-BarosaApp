export interface ChatInputProps {
  userConversation?: any;
  sentBtnCb?: any;
  dealTitle?: string;
  type?: string;
  dealCount?: number;
  placeholder?: string;
  onPressAttachAction?: () => void;
  onPressSend?: () => void;
  onPressContractAction?: () => void;
  isAttach?: boolean;
  isContract?: boolean;
}
