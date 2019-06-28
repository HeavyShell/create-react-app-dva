import {connect} from 'dva';
import React from 'react';
import { LocaleProvider } from 'antd' //antd国际化组件
import {IntlProvider} from 'react-intl' //业务文案的国际化组件
import {ANT_LANGPACKAGE, LANGPACKAGE} from '../locales';


const Locale=({ children,i18n,store })=>{
  return (
    <LocaleProvider locale={ANT_LANGPACKAGE[i18n]}>
      <IntlProvider
        locale={i18n}
        messages={LANGPACKAGE[i18n]}
      >
        {children}
      </IntlProvider>
    </LocaleProvider>
  );
}

export default connect(({
  app
})=>({
  i18n:app.get('i18n')
}))(Locale)
