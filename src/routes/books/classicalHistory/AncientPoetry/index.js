import React, {Component} from 'react';
import {connect} from 'dva'
import {Link} from 'dva/router'
import {injectIntl,FormattedMessage} from 'react-intl'
import {Row, Col, Form} from 'antd'
import classnames from 'classnames';
import styles from './index.less';

class Index extends Component{

    render(){

        return(
            <Row>
                <Col className={classnames(styles.Page)}>
                    哦，来了！
                </Col>
               
            </Row>
        )
    }
}

export default connect(({
    app
})=>({
    app
}))(injectIntl(Form.create()(Index)))