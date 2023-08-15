import ButtonStyle from '../style';
import { ButtonType } from '../../../../core-constant/enum';

const getButtonStyle = (type: string) => {
  let style = {};
  let labelStyle = {};

  switch (type) {
    case ButtonType.PRIMARY: {
      style = ButtonStyle.primaryContainerStyle;
      labelStyle = ButtonStyle.primaryLabelStyle;
      break;
    }
    case ButtonType.SECONDARY: {
      style = ButtonStyle.secondaryConatinerStyle;
      labelStyle = ButtonStyle.secondaryLabelStyle;
      break;
    }

    case ButtonType.OUTLINE: {
      style = ButtonStyle.outlineConatinerStyle;
      labelStyle = ButtonStyle.outlineLabelStyle;
      break;
    }

    case ButtonType.TEXT: {
      style = ButtonStyle.textContainerStyle;
      labelStyle = ButtonStyle.textLabelStyle;
      break;
    }
    case ButtonType.ICON: {
      style = ButtonStyle.iconContainerStyle;
      labelStyle = ButtonStyle.iconStyle;
      break;
    }

    default: {
      style = ButtonStyle.containerStyle;
      labelStyle = ButtonStyle.primaryLabelStyle;
    }
  }

  return [style, labelStyle];
};

export { getButtonStyle };
