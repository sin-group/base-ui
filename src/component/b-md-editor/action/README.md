## action 可分为 insert 和 modify 两种类型

### insert

- 提供一个签名为 selectionText => replaceText 的函数，可以为异步函数，md-editor 会使用 replaceText 替换 selectionText

### modify

- 提供一个签名为 ({text, selectionStart, selectionEnd}) => ({text, selectionStart, selectionEnd})

