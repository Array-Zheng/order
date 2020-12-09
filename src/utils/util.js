const utils ={

    //获取两地之间的距离
    getDistance: function(lat1, lng1, lat2, lng2) {
		function Rad(d) {
			return d * Math.PI / 180.0;
		}
		if (!lat1 || !lng1) {
			return '';
		}
		// lat1用户的纬度
		// lng1用户的经度
		// lat2商家的纬度
		// lng2商家的经度
		let radLat1 = Rad(lat1);
		let radLat2 = Rad(lat2);
		let a = radLat1 - radLat2;
		let b = Rad(lng1) - Rad(lng2);
		let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
			Math.sin(b / 2), 2)));
		s = s * 6378.137;
		s = Math.round(s * 10000) / 10000;
		s = '(距您' + s.toFixed(2) + '公里)' //保留两位小数
		return s
    },
    
    
    //获取当地地理位置
    getLocation: function() {
		return new Promise(function(resolve, reject) {
			uni.getLocation({
            type:"gcj02",
              complete: (res) => {},
              fail: (res) => {},
              highAccuracyExpireTime: 0,
              isHighAccuracy: true,
              success: (result) => {},
              type: 'type',
            })
		});
	}

}