import API from "../config";


export const createAuction = async (data, callback) => {
    API.post(`/api/create-auction`, data)
    .then((res) => {
        if (res) {
            var { data } = res;
            var result = data.result;
            return callback(result);
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}



export const getAuctions = async (callback) => {
    API.get(`/api/get-auction`)
        .then((res) => {
            if (res) {
                var { data } = res;
                var result = data.result;
                // console.log(data.result.data)
                return callback(result);
            }

        })
        .catch(function (error) {
            return callback(error);
        });
}

export default { createAuction, getAuctions }