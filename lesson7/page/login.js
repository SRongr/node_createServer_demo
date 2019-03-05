window.onload = function () {
  const httpRes = new XMLHttpRequest()
  httpRes.onreadystatechange = function () {
    if (httpRes.readyState === 4) {
      if (httpRes.status === 200) {
        console.log('成功')
        console.log(httpRes.responseText)
        console.log(httpRes.responseType)
      } else {
        console.log('失败')
      }
    } else {
      console.log(httpRes.readyState)
    }
  }
  // httpRes.open('Get', '/getData')
  // httpRes.send()
}