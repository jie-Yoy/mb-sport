export const getLocaltion = () => {
  return new Promise((resolve, reject) => {
    var geolocation = new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        resolve({
          lng: r.point.lng,
          lat: r.point.lat,
        });
      } else {
        reject(this.getStatus());
      }
    });
  });
};

export const gpsGeolocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      function showPosition(position) {
        resolve({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      }
      function showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("用户拒绝对获取地理位置的请求");
            reject("用户拒绝对获取地理位置的请求");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("位置信息是不可用的");
            reject("位置信息是不可用的");
            break;
          case error.TIMEOUT:
            alert("请求用户地理位置超时");
            reject("请求用户地理位置超时");
            break;
          case error.UNKNOWN_ERROR:
            alert("发生未知错误");
            reject("发生未知错误");
            break;
        }
      }
    } else {
      // 定位功能不支持
      alert("该浏览器定位功能不支持");
      reject("该浏览器定位功能不支持");
    }
  });
};
