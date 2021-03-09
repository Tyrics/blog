# 浏览器操作剪切板（Clipboard API）

浏览器操作剪切板有三种方式：

1. document.execCommand() （已废弃）
2. Clipboard API
3. copy、cut 和 paste 事件

### 一、document.execCommand()

该方法允许运行命令来操纵可编辑内容区域的元素。该方法返回一个布尔值 ，如果是 `false` 则表示操作不被支持或未被启用。

1. 复制

   选中文本，然后调用`document.execCommand('copy')`，选中的文本就会复制进入剪贴板

   ```js
   const text = document.querySelector('#text');
   text.select();
   document.execCommand('copy');
   ```

2. 剪切

   选中文本，然后调用`document.execCommand('cut')`, 选中的文本就会被剪切进入剪贴板

3. 粘贴

   调用`document.execCommand('paste')`，就会将剪贴板里面的内容，输出到当前的焦点元素中

   ```js
   const output = document.querySelector('#output');
   output.focus();
   document.execCommand('paste');
   ```

**PS: 注意！此功能已过时。 尽管它可能在某些浏览器中仍然可以使用，但不建议使用它，因为可以随时将其删除。 尽量避免使用它。**

### 二、Clipboard API

传统的 document.execCommand() 存在一些缺陷：

1. 只能将选中的内容复制到剪贴板，无法向剪贴板写入其它内容
2. 它是同步操作，在数据量大的时候页面可能会出现卡顿

Clipboard API 是浏览器厂商为了解决上述问题提出了异步解决方案。它的所有操作都是异步的，返回 Promise 对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板

系统剪贴板暴露于全局属性 `navigator.clipboard` 之中, 如果 `navigator.clipboard` 属性返回 `undefined` ，就说明当前浏览器不支持这个 API

出于安全考虑，这个 API 有如下安全限制：

1. Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API（localhost除外）
2. 如果用户没有适时使用 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 授予相应权限和`"clipboard-read"` 或 `"clipboard-write"` 权限，调用 `Clipboard` 对象的方法不会成功

方法：

**read()**

读取剪贴板里面的数据，可以是文本数据，也可以是二进制数据（比如图片）。该方法需要用户明确给予许可。

该方法返回一个 Promise 对象。一旦该对象的状态变为 resolved，就可以获得一个数组，每个数组成员都是 ClipboardItem 对象的实例。

**readText()**

读取剪贴板里面的文本数据。该方法需要用户明确给予许可。

该方法返回一个 Promise 对象。一旦该对象的状态变为 resolved，就可以获得剪贴板里面的文本数据。

**write()**

用于将任意数据写入剪贴板，可以是文本数据，也可以是二进制数据。

该方法接受一个 ClipboardItem 实例作为参数，表示写入剪贴板的数据。

**writeText()**

用于将文本内容写入剪贴板。

该方法接受一个字符串作为参数，表示写入剪贴板的数据。

示例：使用 writeText() 和 readText() 对文本数据进行复制粘贴:

```html
<p>hello world</p>
<button id="btn-copy">copy text</button>
<button id="btn-paste">copy text</button>
<script>
  const copyBtn = document.querySelector('#btn-copy');
  copyBtn.addEventListener(
    'click',
    async function () {
      try {
        // 将 p 标签内的文本编辑后写入剪切板
        await navigator.clipboard.writeText(
          `${document.querySelector('p').textContent}!`
        );
      } catch (e) {
        console.error('Failed to copy: ', e);
      }
    },
    false
  );

  const pasteBtn = document.querySelector('#btn-paste');
  pasteBtn.addEventListener(
    'click',
    async function () {
      try {
        // 读取剪切板中的文本
        const text = await navigator.clipboard.readText();
        console.log(text);
      } catch (e) {
        console.error('Failed to read clipboard content: ', e);
      }
    },
    false
  );
</script>
```

### 三、copy、cut 和 paste 事件

1. **copy 事件**

   用户向剪贴板放入数据时，将触发`copy`事件

   ```js
   <p id="text">谁见幽人独往来，飘渺孤鸿影</p>
   <script>
     const text = document.querySelector('#text');
     text.addEventListener(
       'copy',
       function (e) {
         // 获取用户复制的文本
         const selectText = document.getSelection().toString();
         console.log(selectText)
         // 修改用户复制的文本
         e.clipboardData.setData('text/plain', '拣尽寒枝不肯栖，寂寞沙洲冷');
         e.preventDefault();
       },
       false
     );
   </script>
   ```

   上面示例中的事件对象中有一个 `clipboardData` 属性，它是一个对象，有如下属性和方法：

   - `Event.clipboardData.setData(type, data)`：修改剪贴板数据，需要指定数据类型。
   - `Event.clipboardData.getData(type)`：获取剪贴板数据，需要指定数据类型。
   - `Event.clipboardData.clearData([type])`：清除剪贴板数据，可以指定数据类型。如果不指定类型，将清除所有类型的数据。
   - `Event.clipboardData.items`：一个类似数组的对象，包含了所有剪贴项，不过通常只有一个剪贴项。

2. **cut 事件**

   用户剪切数据时，将触发`cut` 事件

3. **paste 事件**

   用户使用剪贴板数据，进行粘贴操作时，会触发`paste`事件

   ```js
   document.addEventListener('paste', async (e) => {
     // 拦截粘贴操作 由 Clipboard API 打印剪切板内容
     e.preventDefault();
     const text = await navigator.clipboard.readText();
     console.log('Pasted text: ', text);
   });
   ```
