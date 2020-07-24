import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { router } from '@/router/index'
import PropTypes from 'prop-types'
import { Up, Down, asyncMethod } from '@/store/home/index'
import '@/utils/http.js'


class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    // static propTypes = {
    //     dataInfo: PropTypes.object
    // }
    render() {
        return (
            <BrowserRouter>
                {router.map((item, index) => { return <Route key={index} path={item.path} exact={item.exact} component={item.component} /> })}
                <div>
                    <Link to="/">首页</Link>
                    <Link to="/detail">详情</Link>
                    <Link to="/table">表格</Link>
                </div>
                <button onClick={() => { this.props.asyncBtn() }}>
                    点击这个按钮
                </button>
            </BrowserRouter>
        )
    }
}
const mapStateToProps = (state) => ({
    number: state.counter.num,
    arr: state.counter.dataArr
});

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch(Up())
        },
        remove: () => {
            dispatch(Down())
        },
        asyncBtn: () => {
            dispatch(asyncMethod())
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Layout)