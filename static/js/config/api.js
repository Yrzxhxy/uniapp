// api接口封装
const http=uni.$u.http
// http://124.93.196.45:10091/
// 广告轮播
export const getswiper = (data) => http.get('prod-api/api/movie/rotation/list', data)
// 热映
export const getHotview= (data)=>http.get('prod-api/api/movie/film/list',data)
// 获取热映信息
export const getHotviewInfo= (id)=>http.get('/prod-api/api/movie/film/detail/'+id)
// 待映
export const getNoticeview= (data)=>http.get('/prod-api/api/movie/film/preview/list',data)
// 获取待映详细
export const getTeaserViewInfo= (id)=>http.get('/prod-api/api/movie/film/preview/'+id)
//查询影片场次列表/prod-api/api/movie/theatre/times/list
export const gettheatre= ()=>http.get(`/prod-api/api/movie/theatre/times/list?movieId=${uni.getStorageSync("movieId")}`)
// 登录
export const postLogin = (params, config = {
	header:{
		'content-type':'application/x-www-form-urlencoded'
	}
}) => http.post('prod-api/api/login', params, config)
// 查询个人信息/prod-api/api/common/user/getInfo

export const getInfo = (params, config = {
	header:{
		'content-type':'application/x-www-form-urlencoded',
	}
}) => http.get('/prod-api/api/common/user/getInfo', params, config)
// 获取新闻分类/prod-api/api/movie/press/category/list
export const getNews= (data)=>http.get('/prod-api/api/movie/press/category/list',data)
// 依据影院id查所属影厅信息列表/prod-api/api/movie/theatre/room/list
export const getroom= ()=>http.get(`/prod-api/api/movie/theatre/room/list?theaterId=${uni.getStorageSync("roomId")}`)
// 获取影院信息详细信息/prod-api/api/movie/theatre/{id}
export const gettheatreInfo= (id)=>http.get('/prod-api/api/movie/theatre/'+id)
// 查询场次座位信息列表 /prod-api/api/movie/theatre/seat/list
export const getSeat= ()=>http.get(`/prod-api/api/movie/theatre/seat/list?roomId=${uni.getStorageSync("cinemaHall")}`)
// 查询影厅详情/prod-api/api/movie/theatre/room/{id}
export const getRoomInfo= (id)=>http.get('/prod-api/api/movie/theatre/room/'+id)
//查询影片场次列表/prod-api/api/movie/theatre/times/list
export const getTimesList= ()=>http.get(`/prod-api/api/movie/theatre/times/list?theaterId=${uni.getStorageSync("roomId")}&movieId=${uni.getStorageSync("movieId")}`)
//提交订单 /prod-api/api/movie/ticket
// export const PostTicket= (params)=>http.post('/prod-api/api/movie/ticket',params)
export const PostTicket = (params, config = {
	header:{
		'content-type':'application/json',
	}
}) => http.post('/prod-api/api/movie/ticket', params, config)
// 查询订单信息列表 /prod-api/api/movie/ticket/order/list
export const getorderlist= ()=>http.get('/prod-api/api/movie/ticket/order/list')
// 删除订单信息/prod-api/api/movie/ticket/order/{id}
export const deleOrder= (id)=>http.delete('/prod-api/api/movie/ticket/order/'+id)
// 买票
export const getTobuy= ()=>http.get(`/prod-api/api/movie/theatre/times/list?theaterId=${uni.getStorageSync("roomId")}&movieId=${uni.getStorageSync("movieId")}&roomId=${uni.getStorageSync("cinemaHall")}`)
// 获取订单信息详细信息 /prod-api/api/movie/ticket/order/{id}
export const getOrderInfo= (id)=>http.get('/prod-api/api/movie/ticket/order/'+id)
// 订单支付/prod-api/api/movie/ticket/order/pay/{id}
export const pay= (id)=>http.get('/prod-api/api/movie/ticket/order/pay/'+id)
// 调用新闻列表   /prod-api/api/movie/press/press/list
export const getpress = (data) => http.get('/prod-api/api/movie/press/press/list',data)
//获取新闻详情列表   /prod-api/api/movie/press/press/{id}
export const getnewsDetail= (id) => http.get('/prod-api/api/movie/press/press/'+id)