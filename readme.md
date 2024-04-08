# shooks hook封装
``
实用的React hook，开箱即用
``
- `useAutoRefresh` 参数唯一，参数类型是函数，函数重新定义时自动执行
- `useForceUpdate` 封装了`forceUpdate`，调用时组件重新渲染，同时提供了`key`，配合使用可以控制指定组件的卸载
- `useOpenStatus` 针对两种状态的切换，封装了`close`、`open`、`toggle`的逻辑
- `usePathSearch` 可以直接从当前路由中获取解析成对象格式的`search`数据
- `useToPage` 底层是`useHistory`，控制跳转到指定路由并携带参数
- `useAxios` 封装的axios hook形式
- `useComputeHeight` 动态获取DOM元素的高度
- `useDrag` 实现托拽
- `useWebSocket` 简单易用的webSocket连接方法

