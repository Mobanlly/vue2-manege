import { baseUrl } from './env'
// async 函数返回的是一个 Promise 对象
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == "GET") {
        let dataStr = ""; //数据拼接字符串
        Object.keys(data).forEach((key) => {
            dataStr += key + "=" + data[key] + "&";
        });

        if (dataStr !== "") {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
            url = url + "?" + dataStr;
        }
    }
    //fetch提交参数
    if (window.fetch && method == "fetch") {
        //初始化init
        let requestConfig = {
            // 为了在当前域名内自动发送 cookie ， 必须提供这个选项
            credentials: "include",
            // 请求使用的方法，如 GET、POST
            method: type,
            //请求头
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            // 请求的模式,跨域请求
            mode: "cors",
            // 请求的 cache 模式
            // 浏览器在其HTTP缓存中寻找匹配的请求。
            // 如果有匹配项，不管是新匹配项还是旧匹配项，都将从缓存中返回。
            // 如果没有匹配，浏览器将发出正常请求，并使用下载的资源更新缓存。
            cache: "force-cache",
        };

        if (type == "POST") {
            Object.defineProperty(requestConfig, "body", {
                value: JSON.stringify(data),
            });
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        //原始ajax提交参数
        // Promise对象代表一个异步操作，有三种状态：
        // Pending（进行中）、
        // Resolved（已完成 ，又称Fulfilled）
        // 和 Rejected（已失败）。
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject();
            }

            let sendData = "";
            if (type == "POST") {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            // 窗体数据被编码为名称/值对。这是标准的编码格式
            requestObj.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== "object") {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj);
                    }
                }
            };
        });
    }
}