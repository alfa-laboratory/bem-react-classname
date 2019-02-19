bem-react-classname
===

BEM class names generator designed to use with React.

`bem-react-classname` is a small and simple library, created to simplify usage of
BEM class names methodology with react.

```tsx
import { createCn } from 'bem-react-classname';
import React from 'react';

class Button extends React.Component {
    cn = createCn('button');
    
    render() {
        return (
            <button className={ this.cn({ primary: true }) }>
                <span className={ this.cn('icon', { size: 's' }) } />
                { this.props.children }
            </button>
        );
    }
}

ReactDOM.render(<Button className="myName">Click me!</Button>);

/*
<button class="button button_primary myName">
    <span class="button__icon button__icon_size_s"></span>
    Click me!
</button>
*/

```

It also works with functional components
```tsx
import { createCn } from 'bem-react-classname';
import React from 'react';

const Button = ({ size, className, children }) => {
    const cn = createCn('button', className);
    
    return (
        <button className={ cn({ size }) }>
            <span className={ cn('icon', { size }) } />
            { children }
        </button>
    );
};

ReactDOM.render(<Button className="myName" size="s">Click me!</Button>);

/*
<button class="button button_size_s myName">
    <span class="button__icon button__icon_size_s"></span>
    Click me!
</button>
*/
```

If you don't need to add external class name to functional component you can simplify it:

```tsx
import { createCn } from 'bem-react-classname';
import React from 'react';

const cn = createCn('button');
const Button = ({ size, children }) => (
  <button className={ cn({ size }) }>
      <span className={ cn('icon', { size }) } />
      { children }
  </button>
);

ReactDOM.render(<Button size="s">Click me!</Button>);

/*
<button class="button button_size_s">
    <span class="button__icon button__icon_size_s"></span>
    Click me!
</button>
*/
```

You can also use it with themes:

```tsx
import { createCn, createTheme } from 'bem-react-classname';

enum Themes {
    dark = 'dark',
    light = 'light'
}

const { ThemeProvider, withTheme } = createTheme(Themes.dark);

class Button extends React.Component {
    const cn = createCn('button');
    
    render() {
        return (
            <button className={ this.cn() }>
                { this.props.children }
            </button>
        );
    }
}

const ThemedButton = withTheme(Button);

ReactDOM.render(
    <ThemeProvider value={ Themes.light }>
        <ThemedButton>
            Click me!
        </ThemedButton>
    </ThemeProvider>
);

/*
<button class="button button_theme_light">
    Click me!
</button>
*/

```

Themes will also work with functional components:

```tsx
import { createCn, createTheme } from 'bem-react-classname';

enum Themes {
    dark = 'dark',
    light = 'light'
}

const { ThemeProvider, withTheme } = createTheme(Themes.dark);
const Button = withTheme(({ children, className, theme }) => {
    const cn = createCn('button', className, theme);
    
    return (
        <button className={ cn() }>
            { children }
        </button>
    );
});

ReactDOM.render(
    <ThemeProvider value={ Themes.light }>
        <Button>
            Click me!
        </Button>
    </ThemeProvider>
);

/*
<button class="button button_theme_light">
    Click me!
</button>
*/
```

For more examples check out [tests](src/create-cn-test.ts).

License
---

```
The MIT License (MIT)

Copyright (c) 2019 Alfa-Bank

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
