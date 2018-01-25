---
layout: post
title:  React Router
category: ['React', 'React Router'] 
---



# React Router 

翻译于[文档](http://redux.js.org/docs/advanced/UsageWithReactRouter.html)

现在你想在你的 Redux 应用中使用路由功能，可以搭配使用 React Router 来实现。 Redux 和 React Router 将分别成为你数据和 URL 的真实来源（the source of truth）。 在大多数情况下， 最好将他们分开。

## Installing React Router

可以使用 npm 来安装 React Router。本教程基于 react-router@^2.7.0 。

> npm install --save react-router


使用时从 React Router 中导入 Router 和 Route

> import { Router, Route, browserHistory } from 'react-router';

## <Router /\> 和 <Route /\>

在 React 应用中，通常你会用 <Router /\> 包裹 <Route /\>。 如此，当 URL 变化的时候，<Router /\> 将会匹配到指定的路由，然后渲染路由绑定的组件。 <Route /\> 用来显式地把路由映射到应用的组件结构上。 用 path 指定 URL，用 component 指定路由跳转到 URL 后需要渲染的那个组件。

```
const Root = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>  
);
```

上面的代码，用户访问根路由 "/" 比如(www.babytree.com/)，组件 App 就会加载。

## <Provider /\>

另外，在 Redux 应用中，仍将使用 <Provider /\>。 <Provider /\> 是由 React Redux 提供的高阶组件，用来让你将 Redux 绑定到 React （详见 搭配 [React](http://cn.redux.js.org/docs/basics/UsageWithReact.html)）。

从 React Redux 导入 <Provider /\>：

> import { Provider } from 'react-redux';

用 <Provider /\> 包裹 <Router /\>，以便于路由处理器可以访问 [store](https://hulufei.gitbooks.io/react-tutorial/content/usage-with-react.html)

```
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```


## :filter 参数

此外，我们将在 '/' 后面增加参数 (:filter), 当我们尝试从 URL 中读取参数 (:filter)，需要以下代码：

> <Route path="/(:filter)" component={App} />

举个例子

```
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
```

当用户访问/inbox/messages/:id时，会加载下面的组件。

```
<Inbox>
  <Message/>
</Inbox>
```


## browserHistory

如果想将 '#' 从 URL 中移除（例如：http://localhost:3000/#/?_k=4sbb0i）。 你需要从 React Router 导入 browserHistory 来实现：

> import { Router, Route, browserHistory } from 'react-router';

然后将它传给 <Router /> 来移除 URL 中的 '#'：

```
<Router history={browserHistory}>
  <Route path="/(:filter)" component={App} />
</Router>
```

只要你不需要兼容古老的浏览器，比如IE9，你都可以使用 browserHistory


```
components/Root.js


import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
```

 我们同样需要去重构 index.js 去渲染<Root /\> 组件。

```
index.js



import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import todoApp from './reducers'
import Root from './components/Root'

let store = createStore(todoApp)

render(
    <Root store={store} />,
    document.getElementById('root')
)

```

## <Link /\> 

React Router 提供了 <Link /\> 来实现导航功能。 

下面将举例演示。现在，修改我们的容器组件 <FilterLink /> ，这样我们就可以使用 <FilterLink /> 来改变 URL。你可以通过 activeStyle 属性来指定激活状态的样式。

```
containers/FilterLink.js


import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
  >
    {children}
  </Link>
);

export default FilterLink;

===================================================

components/Footer.js


import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </p>
);

export default Footer
```

这时，如果你点击 <FilterLink /\>，你将看到你的 URL 在 '/complete'，'/active'，'/' 间切换。 甚至还支持浏览的回退功能，可以从历史记录中找到之前的 URL 并回退。


如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的**activeStyle** 或**activeClassName**属性。


## 从 URL 中读取数据 

params 是一个包含 url 中所有指定参数的对象。 


```
<Route path="/(:filter)" component={App} />
```

如上面的代码，由路由渲染的组件都会自动的往组件中传递一个参数，这个参数包含了路由信息，这使得可以在 App 中获取 params 的属性。

例如：如果访问 localhost:3000/completed，那么 params 将等价于 { filter: 'completed' }。 现在，我们可以在 <App /> 中读取 URL 参数了。

```
components/App.js

const App = ({ params }) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList
        filter={params.filter || 'all'}
      />
      <Footer />
    </div>
  );
};
```



