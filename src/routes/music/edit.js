import React, {Component} from 'react';
import {connect} from 'dva'
import {Link} from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { Map } from 'immutable'
import {injectIntl,FormattedMessage} from 'react-intl'
import {Row, Col, Form, Table, Button, Input, DatePicker, Radio, Upload, Icon, message} from 'antd'
import moment from 'moment'
import classnames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;


class Index extends Component{

    state={
        avatar:''
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const {match,form,dispatch,menu,music} = this.props;
        const musicCopy=menu.getIn(['music-copy','path']);
        const isCopyPage=pathToRegexp(musicCopy).exec(match.path)?true:false;
        const id=match.params.id;
        const info=music.getIn(['byId',id])||Map();
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            values.publish_time=values.publish_time.valueOf();
            if(id && !isCopyPage){
                values.id=id;
            }
            values.avatar=this.state.avatar||info.get('avatar')||'';
            
            dispatch({
                type: 'music/modifyMusic',
                payload: values
            })
          }
        });
    }

    render(){
        const {music,match,form,intl:{formatMessage}} = this.props;
        const {getFieldDecorator} = form;
        const id=match.params.id;
        const info=music.getIn(['byId',id])||Map();

        const formItemLayout={
            labelCol: { span: 6, offset:0 },
            wrapperCol: { span: 12 }
        }

        const formItemLayoutSubmit={
            wrapperCol: { span: 12, offset:6 }
        }

        const props = {
            name: 'avatar',
            fileList:[],
            beforeUpload:(file)=> {
                if(
                    file.name.substring(file.name.lastIndexOf('.'))=='.jpg'||
                    file.name.substring(file.name.lastIndexOf('.'))=='.jpeg'||
                    file.name.substring(file.name.lastIndexOf('.'))=='.png'
                ){
                    if(file.size<=1*1024*1024){
                        var fr = new FileReader();
                        fr.onloadend = e=> {
                            this.setState({
                                avatar:e.target.result
                            })
                        };
                        fr.readAsDataURL(file);
                    }else{
                        message.destroy();
                        message.warning(formatMessage({id:'App.tip05'}))
                    }                    
                }else{
                    message.destroy();
                    message.warning(formatMessage({id:'App.tip04'}))
                }
                return false;
            },
        };

        return(
            <Row>
                <Col className={classnames(styles.Page)}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id:'Music.mName'})}
                            >
                            {getFieldDecorator('name', {
                                initialValue: info.get('name'),
                                rules: [
                                    {
                                        required: true, 
                                        message: formatMessage({id:'App.enter'})+formatMessage({id:'Music.mName'}),
                                    }
                                ],
                            })(
                                <Input placeholder={formatMessage({id:'App.enter'})+formatMessage({id:'Music.mName'})} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id:'Music.mAuthor'})}
                            >
                            {getFieldDecorator('author', {
                                initialValue: info.get('author'),
                                rules: [
                                    {
                                        required: true, 
                                        message: formatMessage({id:'App.enter'})+formatMessage({id:'Music.mAuthor'}),
                                    }
                                ],
                            })(
                                <Input placeholder={formatMessage({id:'App.enter'})+formatMessage({id:'Music.mAuthor'})} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id:'App.avatar'})}
                            >
                            {getFieldDecorator('avatar', {
                                initialValue: info.get('avatar'),
                                rules: [
                                    {
                                        required: true, 
                                        message: formatMessage({id:'App.enter'})+formatMessage({id:'Music.mAuthor'}),
                                    }
                                ],
                            })(
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                    {this.state.avatar||info.get('avatar')?
                                        <img width="48" height="48" src={this.state.avatar||info.get('avatar')} />
                                        :
                                        <Icon type="inbox" />
                                    }
                                    </p>
                                    <p className="ant-upload-text"><FormattedMessage id={'App.tip02'} /></p>
                                    <p className="ant-upload-hint"><FormattedMessage id={'App.tip03'} /></p>                               
                                </Dragger>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id:'App.gender'})}
                            >
                            {getFieldDecorator('gender', {
                                initialValue: info.get('gender')||'female',
                                rules: [
                                    {
                                        required: true, 
                                        message: formatMessage({id:'App.select'})+formatMessage({id:'App.gender'}),
                                    }
                                ],
                            })(
                                <RadioGroup>
                                    <Radio value={'female'}><FormattedMessage id={'App.female'} /></Radio>
                                    <Radio value={'male'}><FormattedMessage id={'App.male'} /></Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id:'App.publishTime'})}
                            >
                            {getFieldDecorator('publish_time', {
                                initialValue: moment(info.get('publish_time')),
                                rules: [
                                    {
                                        required: true, 
                                        message: formatMessage({id:'App.enter'})+formatMessage({id:'App.publishTime'}),
                                    }
                                ],
                            })(
                                <DatePicker style={{width:'100%'}} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayoutSubmit}
                            >
                            <Button type={'primary'} htmlType={'submit'} icon={'save'}>
                                <FormattedMessage id={'App.save'} />
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default connect(({
    app,
    music
})=>({
    app,
    music,
    menu:app.getIn(['menu','byId']),
}))(injectIntl(Form.create()(Index)))