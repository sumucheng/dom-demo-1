window.dom = {
  //新建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  //在一个节点node前面创建一个节点node2
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },

  //在一个节点node后面创建一个节点node2
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  //在一个节点node下创建一个子节点newSon
  append(node, newSon) {
    node.appendChild(newSon);
  },

  //在一个节点node上创建一个父节点newParent
  wrap(node, newParent) {
    dom.before(node, newParent); //将要创建的父节点newParent先加在节点node前面
    dom.append(newParent, node); //令newParent添加node作为子节点
  },

  //删除节点node，返回node
  remove(node) {
    //node.remove();
    node.parentNode.removeChild(node);
    return node;
  },

  //删除节点node的所有子节点，返回所有删除的子节点
  empty(node) {
    //const { childNodes } = node;
    const arr = [];
    let x = node.firstChild;
    while (x) {
      arr.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return arr;
  },

  //读写节点的属性
  attr(node, name, value) {
    //如果参数数量为3,则设置属性,如果参数数量为2,则读取属性(重载)
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  //读写文本内容
  text(node, string) {
    //参数数量===2:写
    if (arguments.length === 2) {
      //适配
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //chrome firefox
      }
      //参数数量===1:读
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  //读写HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  //修改style
  style(node, name, value) {
    //dom.style(style, "color", "blue");
    if (arguments.length == 3) {
      node.style[name] = value;
    } else if (arguments.length == 2) {
      //dom.style(node, { color: "blue" })
      if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
        //dom.style(style, "color")
      } else if (typeof name === "string") {
        return node.style[name];
      }
    }
  },

  //添加和删除class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },

  //添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  //删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //查找元素
  find(selector, scope) {
    //在指定的范围scope中查找/在全局中查找
    return (scope || document).querySelectorAll(selector);
  },

  //查找元素的父节点
  parent(node) {
    return node.parentNode;
  },
  //查找元素的子节点
  children(node) {
    return Array.from(node.children);
  },
  //查找元素的兄弟节点
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node);
  },
  //查找元素的下一个节点
  nextSibling(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //查找元素的上一个节点
  previousSibling(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  //遍历
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  //查询元素排名
  index(node) {
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i;
      }
    }
  }
};
