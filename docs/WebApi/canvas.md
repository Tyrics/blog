# Canvas 基础

Canvas 是 HTML5 引入的新标签，配合对应的 Canvas API，拥有强大的图形绘制能力，主要用于绘制图表，制作动画

## Canvas 标签

```html
<canvas width="300" height="300" id="canvas">您的浏览器版本过低！</canvas>
```

如果不设置 canvas 元素的宽高，默认的大小是宽 300px, 高 150px。

该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。

如果浏览器不兼容 canvas 元素，则会显示标签内的文本。目前主流浏览器都兼容 canvas。

## 渲染上下文(Rendering Context)

渲染上下文也常被称为画笔，用来绘制和处理要展示的内容。通过 `getContext()` 方法获取

```js
/* @types {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');
/* @types {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
```

## Canvas 栅格（Canvas Grid）

Canvas 栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。水平向右为 x 轴正方向，垂直向下为 y 轴正方向。

## 绘制矩形（Rect）

Canvas API 提供了绘制矩形三种方法

1. `fillRect(x, y, width, height)`
2. `strokeRect(x, y, width, height)`
3. `clearRect(x, y, width, height)`

从字面意思就很容易理解这几个方法的用处, fill(填充)、stroke(描边)、clear(清除)。其中参数 x， y 为坐标， width 和 height 代表矩形宽高。

## 绘制路径

这是 Canvas 的核心，Canvas 并未提供矩形以外图形的直接绘制方法，但我们知道：所有其他类型的图形都是通过一条或者多条路径组合而成的。

使用路径绘制图形的大致步骤：

1. 创建路径，使用 `beginPath()` 方法新建一条路径
2. 使用一系列绘图方法绘制各种路径
   - `moveTo(x, y)` 移动画笔到指定位置（x, y）
   - `lineTo(x, y)` 从画笔位置绘制一条**直线**到指定位置（x, y）
   - `rect(x, y, width, height)` 绘制一个左上角坐标为（x,y），宽高为 width 和 height 的矩形路径。
   - `arc(x, y, radius, startAngle, endAngle, anticlockwise)` 以 x, y 为圆心， radius 为半径，startAngle 和 endAngle 分别为开始和结束弧度，anticlockwise为方向控制（默认为 false, 顺时针）绘制圆弧
   - `arcTo(x1, y1, x2, y2, radius)` 在（x1, y1）和（x2, y2） 之间绘制一段半径为 radius 的圆弧
   - `quadraticCurveTo(cp1x, cp1y, x, y)` 绘制二次贝塞尔曲线，（cp1x, cp1y）为一个控制点，（x, y）为结束点
   - `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` 绘制三次贝塞尔曲线，(cp1x, cp1y) 为控制点一，(cp2x, cp2y) 为控制点二，(x, y) 为结束点。
3. 闭合路径， 使用 `closePath()` 方法闭合路径（非必需，这个方法会绘制一条从当前点到开始点的直线）
4. 为绘制好的路径描边 `stroke()` 或者填充 `fill()`。可以通过改变画笔的属性来修改描边和填充的样式
   - `strokeStyle` 描边颜色
   - `fillStyle` 填充颜色
   - `lineWidth` 描边线条的宽度

## 绘制文本

绘制

- `fillText(text, x, y [, mainWidth])` 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的
- `strokeText(text, x, y [, mainWidth])` 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的

文本样式

- `font`：当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法
- `textAlign`：文本对齐方式，预设值为： `start`(默认)、`end`、`left`、`right`、`center`
- `textBaseline`：基线对齐方式，预设值为： `alphabetic`(默认)、`top`、`hanging`、`middle`、`ideographic`、`bottom`
- `description`： 文本方向，预设值为：`inherit`(默认)、`ltr`、`rtl`

预测量文本宽度

`measureText()` 返回一个 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)对象的宽度、所在像素，这些体现文本特性的属性。

## Path2D 对象

`Path2D`对象用来缓存或记录绘画命令，可以有效简化代码，提高性能。所有的路径方法比如`moveTo`, `rect`, `arc`或`quadraticCurveTo`等，都可以在 `Path2D` 中使用

示例：

```js
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const rectAngle = new Path2D();
rectAngle.rect(10, 10, 50, 50);

const circleAngle = new Path2D();
circleAngle.arc(100, 50, 50, 0, Math.PI * 2);

ctx.stroke(rectAngle);
ctx.fill(circle);
```

## 颜色和样式

通过改变画笔的 `strokeStyle` 和 `fillStyle` 可以修改描边和填充的颜色，它们的值可以是如下几种

1. 符合 CSS3 规范的颜色值字符串
2. 渐变对象
3. 图案对象

需要注意的是，一旦设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，就需要重新设置 `fillStyle` 或 `strokeStyle` 的值。

修改 `globalAlpha` 属性可以同时设置描边和填充的画笔透明度

修改线条样式

1. `lineWidth` 线条宽度。必须为正数，默认值为 1.0

2. `lineCap` 线条末端样式。有三个预设值：`butt`(默认) 、`round` 和 `square`

3. `lineJoin` 线条与线条连接处的样式。有三个预设值：`miter`(默认)、 `round`、 `bevel`

4. `miterLimit` 斜接限定值。限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。如果交点距离大于此值，连接效果会变成了 `bevel`。

   >`miterLimit` = **max** `miterLength` / `lineWidth` = 1 / **sin** ( **min** *θ* / 2 )
   >
   >斜接限定值默认为10.0，这将会去除所有小于大约11度的斜接
   >
   >斜接限定值为√2 ≈ 1.4142136 （四舍五入）时，将去除所有锐角的斜接，仅保留钝角或直角。
   >
   >1.0是合法的斜接限定值，但这会去除所有斜接。

5. `getLineDash()` 返回一个包含当前虚线样式，长度为非负偶数的数组。

6. `setLineDash()` 设置当前虚线样式。这个方法接受一个数组，来指定线段与间隙的交替。

7. `lineDashOffset` 设置虚线样式的起始偏移量。

## 渐变（Gradients）

创建 `canvasGradients` 对象

- 线性渐变

  `createLinearGradient(x1, y1, x2, y2)` 以 (x1, y1)为渐变起点，(x2, y2)为终点。

- 径向渐变

  `createRadialGradient(x1, y1, r1, x2, y2, r2)` createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

`canvasGradients` 对象可以调用 `addColorStop(position, color)` 方法进行上色。`addColorStop` 方法接受 2 个参数，`position` 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。`color` 参数必须是一个有效的 CSS 颜色值

## 图案样式（Patterns）

创建 `Pattern`

`createPattern(image, type)`：该方法接受两个参数。Image 可以是一个 `Image` 对象的引用，或者另一个 canvas 对象。`Type` 必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y` 和 `no-repeat`。

创建出一个 pattern 之后，赋给 `fillStyle` 或 `strokeStyle` 属性即可。

要注意的是，使用 Image 对象的 `onload` handler 来确保设置图案之前图像已经下载完毕：

```js
const ctx = document.querySelector('canvas').getContext('2d');
const img = new Image();
img.src = 'demo.jpg';
img.onload = function() {
    const pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 150);
}
```
