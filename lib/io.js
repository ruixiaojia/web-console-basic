import Axios from 'axios';

const axios = Axios.create({
  timeout: 1000,
  baseURL: '',
});

async function request(method, url, params, headers) {
  try {
    const resp = await axios({
      method,
      url,
      params,
      headers,
    });

    return formattingResponse(true, resp);
  } catch (err) {
    return formattingResponse(false, err);
  }
}

function formattingResponse(success, respOrErr) {
  if (success) {
    let resData = respOrErr.data;

    if (!respOrErr) {
      resData = createErrorResponse();
    }
    // 字段缺失时补充字段
    if (!("errCode" in resData)) {
      resData.errCode = "";
    }
    if (!("errMsg" in resData)) {
      resData.errMsg = "";
    }
    if (!("data" in resData)) {
      resData.data = null;
    }
    if (!("sysTime" in resData)) {
      resData.sysTime = undefined;
    }

    return resData;
  } else {
    // 将http异常转义，视为特定形式的业务异常，抹平前后端的通信或约定差异

  }
}

function createErrorResponse(code, message, rawResponseData) {
  return {
    success: false,
    errCode: `${code}`,
    errMsg: `${message}`,
    _rawErrMsg: `${message}`,
    data: undefined,
    sysTime: 0,
  };
}

export function get(url, params = {}, headers = {}) {
  return request('get', url, params, headers);
}

export function post(url, params = {}, headers = {}) {
  return request('post', url, params, headers);
}