
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zgh from 'react-intl/locale-data/zgh';
import en_US_ant from 'antd/lib/locale-provider/en_US';
import zh_CN_ant from 'antd/lib/locale-provider/zh_CN';
import zh_HK_ant from 'antd/lib/locale-provider/zh_TW';
import zh_CN from './zh_CN';
import en_US from './en_US';
import zh_HK from './zh_HK';

addLocaleData([
  ...en, 
  ...zh, 
  ...zgh,
  {locale: "en_US", parentLocale: "en"},
  {locale: "zh_CN", parentLocale: "zh"},
  {locale: "zh_HK", parentLocale: "zgh"},
]);


export const ANT_LANGPACKAGE = {
  en_US: en_US_ant,
  zh_CN: zh_CN_ant,
  zh_HK: zh_HK_ant
}

export const LANGPACKAGE = {
  en_US,
  zh_CN,
  zh_HK
}


