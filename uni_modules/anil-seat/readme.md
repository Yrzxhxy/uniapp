# anil-seat

#### 使用方法:
在 **script** 中引用组件
```javascript
import anilSeat from '@/uni_modules/anil-seat/components/anil-seat/anil-seat.vue'
export default {
    components: {anilSeat}
}
```
在 **template** 中引用组件
```javascript
<anil-seat 
  title="皮皮鲁与鲁西西之罐头小人" 
  info="2021年01月22日 国语 奇幻 喜剧 儿童"
  room-name="5号厅">
</anil-seat>
```
#### 属性说明

|  属性名 | 类型  | 	默认值  |  	说明 |
| ------------ | ------------ | ------------ | ------------ |
| title  | String  |  | 电影标题  |
| info  | String  |   | 电影信息  |
| roomName  | String  |   | 房间名称  |
| seatData  | Array<Object>  |  | 座位数据-格式如下 |
| max  | Number  | 4  | 最大一次选择位置  |

```javascript
// 电影座位格式
[{
	"YCoord": "3", // -Y坐标
	"XCoord": "11", // -X坐标
	"SeatCode": "4413141101#01#14", // 座位code
	"Status": 0, // 座位状态
	"RowNum": "1", // 排
	"ColumnNum": "14", // 列
  "Price": "23.6" // 当前座位票价
}]
```

#### 事件说明
|  事件名称 | 说明  | 返回值  |
| ------------ | ------------ | ------------ |
| confirm | 确认座位回调事件 | 选择的座位数据 |

PS: 
原插件作者地址：[markrgba](https://ext.dcloud.net.cn/plugin?id=1156)
选座算法来自：[houzisbw](https://github.com/houzisbw/MeiTuanCinemaSmartChoose)
---
### End