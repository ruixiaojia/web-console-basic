import Axios from 'axios';
import _ from 'lodash'

const axios = Axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:7001',
});

async function request(method, url, data, options) {
  try {
    const resp = await axios({
      method,
      url,
      ...(method === "get" ? { params: data } : { data }),
      ..._.pick(options, ["timeout", "headers", "dataType"]),
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

export function get(url, data, options) {
  if (!url || url === "") {
    throw Error("url必填");
  }

  return request('get', url, data, options);
}

export function post(url, data, options) {
  if (!url || url === "") {
    throw Error("url必填");
  }

  return request('post', url, data, options);
}