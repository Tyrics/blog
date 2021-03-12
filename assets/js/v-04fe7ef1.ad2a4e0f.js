(self.webpackChunk=self.webpackChunk||[]).push([[335],{992:(n,a,s)=>{"use strict";s.r(a),s.d(a,{data:()=>e});const e={key:"v-04fe7ef1",path:"/WebApi/canvas.html",title:"Canvas 基础",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"Canvas 标签",slug:"canvas-标签",children:[]},{level:2,title:"渲染上下文(Rendering Context)",slug:"渲染上下文-rendering-context",children:[]},{level:2,title:"Canvas 栅格（Canvas Grid）",slug:"canvas-栅格-canvas-grid",children:[]},{level:2,title:"绘制矩形（Rect）",slug:"绘制矩形-rect",children:[]},{level:2,title:"绘制路径",slug:"绘制路径",children:[]},{level:2,title:"绘制文本",slug:"绘制文本",children:[]},{level:2,title:"Path2D 对象",slug:"path2d-对象",children:[]},{level:2,title:"颜色和样式",slug:"颜色和样式",children:[]},{level:2,title:"渐变（Gradients）",slug:"渐变-gradients",children:[]},{level:2,title:"图案样式（Patterns）",slug:"图案样式-patterns",children:[]}],filePathRelative:"WebApi/canvas.md",git:{updatedTime:1615537375e3,contributors:[]}}},288:(n,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>d});var e=s(133);const t=(0,e.uE)('<h1 id="canvas-基础"><a class="header-anchor" href="#canvas-基础">#</a> Canvas 基础</h1><p>Canvas 是 HTML5 引入的新标签，配合对应的 Canvas API，拥有强大的图形绘制能力，主要用于绘制图表，制作动画</p><h2 id="canvas-标签"><a class="header-anchor" href="#canvas-标签">#</a> Canvas 标签</h2><div class="language-markup ext-html line-numbers-mode"><pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>300<span class="token punctuation">&quot;</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>300<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvas<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>您的浏览器版本过低！<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果不设置 canvas 元素的宽高，默认的大小是宽 300px, 高 150px。</p><p>该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。</p><p>如果浏览器不兼容 canvas 元素，则会显示标签内的文本。目前主流浏览器都兼容 canvas。</p><h2 id="渲染上下文-rendering-context"><a class="header-anchor" href="#渲染上下文-rendering-context">#</a> 渲染上下文(Rendering Context)</h2><p>渲染上下文也常被称为画笔，用来绘制和处理要展示的内容。通过 <code>getContext()</code> 方法获取</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/* @types {HTMLCanvasElement} */</span>\n<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">/* @types {CanvasRenderingContext2D} */</span>\n<span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="canvas-栅格-canvas-grid"><a class="header-anchor" href="#canvas-栅格-canvas-grid">#</a> Canvas 栅格（Canvas Grid）</h2><p>Canvas 栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。水平向右为 x 轴正方向，垂直向下为 y 轴正方向。</p><h2 id="绘制矩形-rect"><a class="header-anchor" href="#绘制矩形-rect">#</a> 绘制矩形（Rect）</h2><p>Canvas API 提供了绘制矩形三种方法</p><ol><li><code>fillRect(x, y, width, height)</code></li><li><code>strokeRect(x, y, width, height)</code></li><li><code>clearRect(x, y, width, height)</code></li></ol><p>从字面意思就很容易理解这几个方法的用处, fill(填充)、stroke(描边)、clear(清除)。其中参数 x， y 为坐标， width 和 height 代表矩形宽高。</p><h2 id="绘制路径"><a class="header-anchor" href="#绘制路径">#</a> 绘制路径</h2><p>这是 Canvas 的核心，Canvas 并未提供矩形以外图形的直接绘制方法，但我们知道：所有其他类型的图形都是通过一条或者多条路径组合而成的。</p><p>使用路径绘制图形的大致步骤：</p><ol><li>创建路径，使用 <code>beginPath()</code> 方法新建一条路径</li><li>使用一系列绘图方法绘制各种路径 <ul><li><code>moveTo(x, y)</code> 移动画笔到指定位置（x, y）</li><li><code>lineTo(x, y)</code> 从画笔位置绘制一条<strong>直线</strong>到指定位置（x, y）</li><li><code>rect(x, y, width, height)</code> 绘制一个左上角坐标为（x,y），宽高为 width 和 height 的矩形路径。</li><li><code>arc(x, y, radius, startAngle, endAngle, anticlockwise)</code> 以 x, y 为圆心， radius 为半径，startAngle 和 endAngle 分别为开始和结束弧度，anticlockwise为方向控制（默认为 false, 顺时针）绘制圆弧</li><li><code>arcTo(x1, y1, x2, y2, radius)</code> 在（x1, y1）和（x2, y2） 之间绘制一段半径为 radius 的圆弧</li><li><code>quadraticCurveTo(cp1x, cp1y, x, y)</code> 绘制二次贝塞尔曲线，（cp1x, cp1y）为一个控制点，（x, y）为结束点</li><li><code>bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)</code> 绘制三次贝塞尔曲线，(cp1x, cp1y) 为控制点一，(cp2x, cp2y) 为控制点二，(x, y) 为结束点。</li></ul></li><li>闭合路径， 使用 <code>closePath()</code> 方法闭合路径（非必需，这个方法会绘制一条从当前点到开始点的直线）</li><li>为绘制好的路径描边 <code>stroke()</code> 或者填充 <code>fill()</code>。可以通过改变画笔的属性来修改描边和填充的样式 <ul><li><code>strokeStyle</code> 描边颜色</li><li><code>fillStyle</code> 填充颜色</li><li><code>lineWidth</code> 描边线条的宽度</li></ul></li></ol><h2 id="绘制文本"><a class="header-anchor" href="#绘制文本">#</a> 绘制文本</h2><p>绘制</p><ul><li><code>fillText(text, x, y [, mainWidth])</code> 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的</li><li><code>strokeText(text, x, y [, mainWidth])</code> 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的</li></ul><p>文本样式</p><ul><li><code>font</code>：当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法</li><li><code>textAlign</code>：文本对齐方式，预设值为： <code>start</code>(默认)、<code>end</code>、<code>left</code>、<code>right</code>、<code>center</code></li><li><code>textBaseline</code>：基线对齐方式，预设值为： <code>alphabetic</code>(默认)、<code>top</code>、<code>hanging</code>、<code>middle</code>、<code>ideographic</code>、<code>bottom</code></li><li><code>description</code>： 文本方向，预设值为：<code>inherit</code>(默认)、<code>ltr</code>、<code>rtl</code></li></ul><p>预测量文本宽度</p>',26),c=(0,e.Wm)("code",null,"measureText()",-1),p=(0,e.Uk)(" 返回一个 "),o={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics",target:"_blank",rel:"noopener noreferrer"},l=(0,e.Wm)("code",null,"TextMetrics",-1),i=(0,e.Uk)("对象的宽度、所在像素，这些体现文本特性的属性。"),r=(0,e.uE)('<h2 id="path2d-对象"><a class="header-anchor" href="#path2d-对象">#</a> Path2D 对象</h2><p><code>Path2D</code>对象用来缓存或记录绘画命令，可以有效简化代码，提高性能。所有的路径方法比如<code>moveTo</code>, <code>rect</code>, <code>arc</code>或<code>quadraticCurveTo</code>等，都可以在 <code>Path2D</code> 中使用</p><p>示例：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> rectAngle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Path2D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nrectAngle<span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> circleAngle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Path2D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncircleAngle<span class="token punctuation">.</span><span class="token function">arc</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nctx<span class="token punctuation">.</span><span class="token function">stroke</span><span class="token punctuation">(</span>rectAngle<span class="token punctuation">)</span><span class="token punctuation">;</span>\nctx<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>circle<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="颜色和样式"><a class="header-anchor" href="#颜色和样式">#</a> 颜色和样式</h2><p>通过改变画笔的 <code>strokeStyle</code> 和 <code>fillStyle</code> 可以修改描边和填充的颜色，它们的值可以是如下几种</p><ol><li>符合 CSS3 规范的颜色值字符串</li><li>渐变对象</li><li>图案对象</li></ol><p>需要注意的是，一旦设置了 <code>strokeStyle</code> 或者 <code>fillStyle</code> 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，就需要重新设置 <code>fillStyle</code> 或 <code>strokeStyle</code> 的值。</p><p>修改 <code>globalAlpha</code> 属性可以同时设置描边和填充的画笔透明度</p><p>修改线条样式</p><ol><li><p><code>lineWidth</code> 线条宽度。必须为正数，默认值为 1.0</p></li><li><p><code>lineCap</code> 线条末端样式。有三个预设值：<code>butt</code>(默认) 、<code>round</code> 和 <code>square</code></p></li><li><p><code>lineJoin</code> 线条与线条连接处的样式。有三个预设值：<code>miter</code>(默认)、 <code>round</code>、 <code>bevel</code></p></li><li><p><code>miterLimit</code> 斜接限定值。限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。如果交点距离大于此值，连接效果会变成了 <code>bevel</code>。</p><blockquote><p><code>miterLimit</code> = <strong>max</strong> <code>miterLength</code> / <code>lineWidth</code> = 1 / <strong>sin</strong> ( <strong>min</strong> <em>θ</em> / 2 )</p><p>斜接限定值默认为10.0，这将会去除所有小于大约11度的斜接</p><p>斜接限定值为√2 ≈ 1.4142136 （四舍五入）时，将去除所有锐角的斜接，仅保留钝角或直角。</p><p>1.0是合法的斜接限定值，但这会去除所有斜接。</p></blockquote></li><li><p><code>getLineDash()</code> 返回一个包含当前虚线样式，长度为非负偶数的数组。</p></li><li><p><code>setLineDash()</code> 设置当前虚线样式。这个方法接受一个数组，来指定线段与间隙的交替。</p></li><li><p><code>lineDashOffset</code> 设置虚线样式的起始偏移量。</p></li></ol><h2 id="渐变-gradients"><a class="header-anchor" href="#渐变-gradients">#</a> 渐变（Gradients）</h2><p>创建 <code>canvasGradients</code> 对象</p><ul><li><p>线性渐变</p><p><code>createLinearGradient(x1, y1, x2, y2)</code> 以 (x1, y1)为渐变起点，(x2, y2)为终点。</p></li><li><p>径向渐变</p><p><code>createRadialGradient(x1, y1, r1, x2, y2, r2)</code> createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。</p></li></ul><p><code>canvasGradients</code> 对象可以调用 <code>addColorStop(position, color)</code> 方法进行上色。<code>addColorStop</code> 方法接受 2 个参数，<code>position</code> 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。<code>color</code> 参数必须是一个有效的 CSS 颜色值</p><h2 id="图案样式-patterns"><a class="header-anchor" href="#图案样式-patterns">#</a> 图案样式（Patterns）</h2><p>创建 <code>Pattern</code></p><p><code>createPattern(image, type)</code>：该方法接受两个参数。Image 可以是一个 <code>Image</code> 对象的引用，或者另一个 canvas 对象。<code>Type</code> 必须是下面的字符串值之一：<code>repeat</code>，<code>repeat-x</code>，<code>repeat-y</code> 和 <code>no-repeat</code>。</p><p>创建出一个 pattern 之后，赋给 <code>fillStyle</code> 或 <code>strokeStyle</code> 属性即可。</p><p>要注意的是，使用 Image 对象的 <code>onload</code> handler 来确保设置图案之前图像已经下载完毕：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> ctx <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nimg<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;demo.jpg&#39;</span><span class="token punctuation">;</span>\nimg<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> pattern <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">createPattern</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token string">&#39;repeat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> pattern<span class="token punctuation">;</span>\n    ctx<span class="token punctuation">.</span><span class="token function">fillRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>',21),d={render:function(n,a){const s=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.j4)(e.HY,null,[t,(0,e.Wm)("p",null,[c,p,(0,e.Wm)("a",o,[l,(0,e.Wm)(s)]),i]),r],64)}}}}]);