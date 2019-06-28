import React, {Component} from 'react';
import {connect} from 'dva'
import {injectIntl} from 'react-intl'
import {Row, Col, Form, Icon, Input, Button} from 'antd'
import classnames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item

class Login extends Component{

    loginSubmit=(e)=>{
        e.preventDefault();
        const {form,dispatch} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
              dispatch({
                  type:'login/login',
                  payload:{
                      values
                  }
              })
            }
        });
    }

    render(){
        const {form,intl:{formatMessage}} = this.props;
        const {getFieldDecorator} = form;
        return(
            <Row>
                <Col className={classnames(styles.loginFormCol)}>
                    <Form onSubmit={this.loginSubmit} className={classnames(styles.loginForm)}>
                        <h3>{formatMessage({id: 'App.login'})}</h3>
                        <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ 
                                required: true, 
                                message: formatMessage({id: 'App.enter'})+formatMessage({id: 'App.username'}) 
                            }],
                        })(
                            <Input autoComplete={'off'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={formatMessage({id: 'App.username'})+'(admin)'} />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ 
                                required: true, 
                                message: formatMessage({id: 'App.enter'})+formatMessage({id: 'App.password'}) 
                            }],
                        })(
                            <Input autoComplete={'off'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({id: 'App.password'})+'123456'} />
                        )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className={classnames(styles.loginBtn)}>
                                {formatMessage({id: 'App.login'})}
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default connect(({

})=>({

}))(injectIntl(Form.create()(Login)))