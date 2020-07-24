import axios from 'axios'
import { data } from 'autoprefixer'
import AllList from '@/network/GetList'
//action-types
const Increase = 'increase'
const Decline = 'decline'
const List = 'list'


//initState
const bState = {
    num: 0,
    dataArr: []
}

//action
export const Up = () => {
    return {
        type: Increase
    }
}


export const Down = () => {
    return {
        type: Decline
    }
}

export const queryData = (data) => {
    return {
        type: List,
        data
    }
}


//reducer
export const counter = (state = bState, action) => {
    switch (action.type) {
        case Increase: {
            return Object.assign({}, state, { num: state.num + 1 })
        }
        case Decline: {
            return Object.assign({}, state, { num: state.num - 1 });
        }
        case List: {
            return Object.assign({}, state, { dataArr: action.data })
        }
        default: {
            return Object.assign({}, state, { num: 0 });
        }
    }
}

export const asyncMethod = () => {
    return dispatch => {
        let pList = new AllList();
        pList.getList({}).then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch(queryData(res.data.message))
            }
        }).catch(err => {
            console.log(err)
        })
    }
} 
