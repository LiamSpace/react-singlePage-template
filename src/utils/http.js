import axios from 'axios';
const env = process.env; //环境变量

let baseUrl = '';

if (env.NODE_ENV === 'development') {
    baseUrl = "api"
} else if (env.NODE_ENV === 'production') {
    baseUrl = 'http://localhost:9887'
}


const service = axios.create({
    baseURL: baseUrl,
    timeout: 26000
})

//请求拦截器
service.interceptors.request.use(config => {
    return config
}, err => {
    console.log(err);
    return Promise.reject(err)
})


//响应拦截器
service.interceptors.response.use(response => {
    return response;
}, err => {
    console.log(err);
    return Promise.reject(err);
})


class Http {
    //get请求
    axiosGet(options) {
        service.get(options.url, {
            params: options.data
        }).then(res => {
            options.success(res)
        }).catch(err => {
            options.error(err)
        })
    }
    //post请求
    axiosPost(options) {
        service.post(options.url,
            options.data, { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            options.success(res)
        }).catch(err => {
            options.error(err)
        })
    }
    //put请求
    axiosPut(options) {
        service.put(options.url,
            options.data
        ).then(res => {
            options.success(res)
        }).catch(err => {
            options.error(err)
        })
    }
    //form-data
    axiosPostUpload(options) {
        service.post(options.url, options.data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            options.success(res)
        }).catch(err => {
            options.error(err)
        })
    }
    //delete请求
    axiosDelete(options) {
        service.delete(options.url, {
            data: options.data
        }).then(res => {
            options.success(res)
        }).catch(err => {
            options.error(err)
        })
    }
}
export default Http;