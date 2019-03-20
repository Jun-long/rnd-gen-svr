# 随机数生成器接口说明

## SocketIO

事件

"newrandom": 新随机数生成事件，数据: {random: "xxxx", index: n}

| 字段   | 说明               |
| ------ | ------------------ |
| random | 随机数             |
| index  | 当前随机数的索引值 |

## Http

### /random/getInfo

*用于获取指定随机数的计算源*

参数

| 字段  | 说明                                     |
| ----- | ---------------------------------------- |
| hash  | 指定随机数的hex字符串值                  |
| index | 指定随机数的index索引值                  |
|       | *两个字段是2选1的关系，优先使用hash字段* |

结果

| 字段       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| random     | 随机数hex字符串值                                            |
| index      | 随机数index索引值                                            |
| hashes     | 计算随机数用到的区块数据，其中item格式：{id: "blockid", height: blockHeight} |
| iter       | 迭代次数                                                     |
| sha256iter | sha256计算迭代次数                                           |

### /random/get

*用于获取随机数*

参数

| 字段   | 说明     |
| ------ | -------- |
| offset | 偏移值   |
| limit  | 最大限制 |

结果

| 字段    | 说明                                                       |
| ------- | ---------------------------------------------------------- |
| randoms | 获取的随机数数组                                           |
| count   | 当前总共有多少随机数生成                                   |
|         | *获取指定索引的随机数时，可以使用{offset: index, limit:1}* |

### /random/count

*用于获取当前生成随机数的总量*

参数 — 无

结果

| 字段  | 说明 |
| ----- | ---- |
| count | 总量 |

### /lottery/get

*用于获取随机数在对应规则排列组合中的抽奖结果*

参数 

| 字段   | 说明     |
| ------ | -------- |
| data | 一个抽奖规则的数组，其中数组每个元素是一个包含三项的对象:<br />{<br />arr:需要排列组合的数组，<br />size:排列组合的输出数量，<br />type:排列组合的类型【0：可重复，1：排列，2：组合】<br />} |
| hash  | 传入一个时间塔产生的随机数 |

结果

| 字段  | 说明 |
| ----- | ---- |
| lottery | 抽奖结果 |
