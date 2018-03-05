## What is base-ui?

`base-ui` is UI Framework made by Sin Group for Vue development, which contains:

* **Style Layer**: css foundation & layout, make it easy to handle UI work with nearly no css code
* **Component Layer**: components that work as functions, which have clear responsibility with its input and output and easy usage to combinate
* **Essential Tools**: such as form validation, common filters, and plugins

The core of Base-UI code provides all the features above, but is designed carefully (Base-UI Core relies on zero dependence!) to be light-weighted, stable and efficient.

And now you are ready to get started!

## Installation

It's easy to install `base-ui` with `npm`

```powershell
npm i base-ui --save
```

## Usage

`base-ui` is exported as a `Vue` plugin, so you can use it directly though `Vue`:

```
// node modules dependency
import Vue from 'vue';
import BaseUI from 'base-ui';

// third party style
import 'base-ui/dist/base-ui.css';

// use dependency
Vue.use(BaseUI);
```

And that's all.
