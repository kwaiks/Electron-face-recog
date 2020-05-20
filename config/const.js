const status = {
    NOTFOUND: {
        code: 404,
        message: 'Data not found'
    },
    SUCCESS: {
        code: 200,
        message: 'Success'
    },
    ERROR: {
        code: 400,
        message: 'Error Ocurred'
    }
}

const createResponse = (sts,response)=>{
    let obj = 
    {
        timestamp: Date(Date.now()),
        statusCode: sts.code,
        message: sts.message,
        data: response
    }
    return obj;
}

module.exports = {
    createResponse,
    status
}