//创建元素
const div = dom.create("<div>newDiv</div>");

//在一个节点的前面和后面分别创建一个节点
const beforeDiv = dom.create("<div id='beforeDiv'>beforeDiv</div>");
const afterDiv = dom.create("<div id='afterDiv'>afterDiv</div>");
dom.before(bro, beforeDiv);
dom.after(bro, afterDiv);

//创建一个节点的父节点和子节点
const parentDiv = dom.create("<div id='parentDiv'>parentDiv</div>");
const sonDiv = dom.create("<div id='sonDiv'>sonDiv</div>");
dom.wrap(middle, parentDiv);
dom.append(middle, sonDiv);

//删除一个节点,返回被删除的节点
removeNode = dom.remove(remove);
//删除一个节点的所有子节点,返回被删除的子节点
emptyNode = dom.empty(empty);

//读写节点的属性
dom.attr(attr, "title", "hello");
const title = dom.attr(attr, "title");
console.log(`title: ${title}`);

//读写节点的文字内容
dom.text(text, "111111111111");
const textContent = dom.text(text);
console.log(textContent);

//读写节点的HTML内容
dom.html(html, "<p>hhhhh</p>");
const htmlContent = dom.html(html);
console.log(htmlContent);

//读写节点的style
dom.style(style, "color", "blue");
dom.style(style, { border: "1px solid red" });
const color = dom.style(style, "color");
console.log(color);

//增删查class
dom.class.add(brown, "brown");
dom.class.add(brown, "blueviolet");
dom.class.remove(brown, "blueviolet");
const hasClass = dom.class.has(brown, "brown");
console.log(hasClass);

//增加、删除点击事件
const fn = () => {
  console.log("clicked");
};
dom.on(click, "click", fn);
dom.off(click, "click", fn);

//获取元素
const find1 = dom.find("#find1")[0];
console.log(find1);
const find2 = dom.find("#find2", find1)[0];
console.log(find2);

//获取元素的父节点、子节点、兄弟节点、下一个兄弟节点、上一个兄弟节点
const parent1 = dom.parent(son1);
const son = dom.children(parent1);
const sib = dom.siblings(son1);
const next = dom.nextSibling(son1);
const previous = dom.previousSibling(son2);
console.log(parent1);
console.log(son);
console.log(sib);
console.log(next);
console.log(previous);

//遍历节点列表
const fn2 = n => {
  dom.style(n, "color", "red");
};

dom.each(dom.children(parent1), fn2);

//查询元素排名
const index = dom.index(son3);
console.log(index);
