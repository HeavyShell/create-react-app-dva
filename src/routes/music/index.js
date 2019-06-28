import React, {Component} from 'react';
import {connect} from 'dva'
import {Link} from 'dva/router'
import {injectIntl,FormattedMessage} from 'react-intl'
import {Row, Col, Form, Table, Button, Tooltip, Icon, Input, Avatar} from 'antd'
import moment from 'moment'
import classnames from 'classnames';
import pathToRegexp from 'path-to-regexp'
import styles from './index.less';

const Search = Input.Search;

class Index extends Component{

    deleteMusic=(id)=>{
        const {dispatch} = this.props;
        dispatch({
            type: 'music/deleteMusic',
            payload: {id}
        })
    }

    pageChange=(page, pageSize)=>{
        const {dispatch} = this.props;
        dispatch({
            type: 'music/queryMusic',
            payload: {
                current:page,
                pageSize,
            }
        })
    }

    searchKeyword=(keyword)=>{
        const {dispatch} = this.props;
        dispatch({
            type: 'music/queryMusic',
            payload: {
                keyword
            }
        })
    }

    render(){
        const {music,menu,intl:{formatMessage}} = this.props;
        const musicEdit=menu.getIn(['music-edit','path']);
        const musicCopy=menu.getIn(['music-copy','path']);

        const dataSource = music.get('list').map(item=>music.getIn(['byId',item])).toJS();
          
        const columns = [
            {
                title: <span>ID <Tooltip title={formatMessage({id:'App.tip01'})}><Icon type="info-circle-o" style={{color:'orange'}} /></Tooltip></span>,
                dataIndex: 'id',
                key: 'id',
            }, 
            {
                title: formatMessage({id:'Music.mName'}),
                dataIndex: 'name',
                key: 'name',
            }, 
            {
                title: formatMessage({id:'Music.mAuthor'}),
                dataIndex: 'author',
                key: 'author',
            }, 
            {
                title: formatMessage({id:'App.avatar'}),
                dataIndex: 'avatar',
                key: 'avatar',
                render: (text, record) => (
                    <div>
                        <Avatar shape="square" size="large" icon="user" src={text} />
                    </div>
                )
            }, 
            {
                title: formatMessage({id:'App.gender'}),
                dataIndex: 'gender',
                key: 'gender',
                render: (text, record) => (
                    <div>
                        {text?formatMessage({id:'App.'+text}):'-'}
                    </div>
                )
            }, 
            {
                title: formatMessage({id:'App.publishTime'}),
                dataIndex: 'publish_time',
                key: 'publish_time',
                render: (text, record) => (
                    <div>
                      {text?moment(text).format('YYYY-MM-DD HH:mm:ss'):'-'}
                    </div>
                  ),
            },
            {
                title: formatMessage({id:'App.action'}),
                key: 'action',
                width:310,
                render: (text, record) => (
                  <div>
                    <Link to={`${pathToRegexp.compile(musicEdit)({id:text.id})}`}>
                        <Button type={'primary'} icon={'edit'}>
                            <FormattedMessage id={'App.edit'} />
                        </Button>
                    </Link>
                    <Link to={`${pathToRegexp.compile(musicCopy)({id:text.id})}`}>
                        <Button type={'primary'} style={{marginLeft:'10px'}} icon={'copy'}>
                            <FormattedMessage id={'App.copy'} />
                        </Button>
                    </Link>
                    <Button type={'primary'} icon={'delete'} onClick={()=>this.deleteMusic(record.id)} style={{marginLeft:'10px'}}>
                        <FormattedMessage id={'App.delete'} />
                    </Button>
                  </div>    
                ),
            }
        ];

        return(
            <Row>
                <Col className={classnames(styles.Page)}>
                    <Row style={{marginBottom:'20px'}}>
                        <Col span={2}>
                            <Link to={`${pathToRegexp.compile(musicEdit)()}`}>
                                <Button type={'primary'} icon={'plus-circle-o'}>
                                    <FormattedMessage id={'App.add'} />
                                </Button>
                            </Link>
                        </Col>
                        <Col span={6} offset={16} style={{textAlign:'right'}}>
                            <Search
                                placeholder={formatMessage({id:'App.enter'})}
                                onSearch={this.searchKeyword}
                                enterButton
                            />
                        </Col>
                        
                    </Row>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns}
                        pagination={{
                            showSizeChanger:true,
                            showQuickJumper:true,
                            pageSizeOptions:['5','10','15','20'],
                            total:music.get('total'),
                            current:music.get('current'),
                            pageSize:music.get('pageSize'),
                            onChange:this.pageChange,
                            onShowSizeChange:this.pageChange
                        }}
                    />
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