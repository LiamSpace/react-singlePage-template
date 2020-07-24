import Http from '@/utils/http.js'

class AllList extends Http {
    getList(data) {
        return new Promise((resolve, reject) => {
            this.axiosGet({
                url: '/getlunbo',
                success: function (data) {
                    resolve(data)
                },
                error: function (err) {
                    reject(err)
                }
            })
        })
    }
}

export default AllList