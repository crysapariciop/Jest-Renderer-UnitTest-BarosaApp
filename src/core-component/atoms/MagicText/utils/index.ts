import { FontType } from '../../../../core-constant/enum';
import MagicTextStyle from '../style';

const getFontMegicStyle = (type: string) => {
  switch (type) {
    case FontType.REGULAR:
      return MagicTextStyle.regularFont;

    case FontType.MEDIUM:
      return MagicTextStyle.mediumFont;

    case FontType.SEMI_BOLD:
      return MagicTextStyle.semiBoldFont;
    case FontType.BOLD:
      return MagicTextStyle.boldFont;

    default:
      return MagicTextStyle.regularFont;
  }
};

export { getFontMegicStyle };
