function ajax(obj) {
    const ajaxData = {
        type: (obj.type || 'GET').toUpperCase(),
        url: obj.url || '',
        async: obj.async || 'true',
        data: obj.data || null,
        dataType: obj.dataType || 'json',
        // contentType: obj.contentType || "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend: obj.beforeSend || (() => {}),
        success: obj.success || (() => {}),
        error: obj.error || (() => {}),
        onprogress: obj.onprogress || (() => {})
    };

    ajaxData.beforeSend();
    const xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

    xhr.upload.onprogress = ajaxData.onprogress;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    // xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.responseType = ajaxData.dataType;

    xhr.send(ajaxData.data);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                ajaxData.success(xhr.response);
            } else {
                ajaxData.error(xhr.response);
            }
        }
    };
}

export default ajax;
