# Base-UI Guide for Contribution

## Goal

* 开箱即用
* UI：一套完整的 UI 库，可被单独使用于静态页面
* Role：根据输入输出唯一决定角色

## Dependency

* No non-vue dependency

## Code Style

* 与其他人风格一致
* 命名规范，准确表明含义
* 代码保证精简 & 可读；如果一些 method 来自于其他的库标注来源

## UI Design

* 一致性
* 与周围环境和谐
* 适应不同屏幕
* 使组件看上去可靠，稳定
* 符合预期的动画
* 通用的控件具有适应性
* 精致
* 设计原则 (https://ant.design/docs/spec/proximity-cn)
    * 亲密性
    * 对其
    * 对比
    * 重复
    * 合理使用过渡

## Component Design

* Interface Type
    * props
    * slots
    * events
* Requirement
    * 接口风格一致：例如这意味着对于各种类型的输入组件，没有意外地都有相同的 disabled 行为
    * 接口尽可能必要，简单，无任何歧义，符合用户潜意识预期
    * 不要让外部用户不得不 hack 内部实现

## Component Test Case

* 覆盖真实场景
* 覆盖更多的 Case
