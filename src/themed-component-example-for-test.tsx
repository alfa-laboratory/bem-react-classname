import React from 'react';
import { createTheme } from  './create-theme';


const { withTheme } = createTheme('alfa-on-white');

type MyComponentProps = {
    theme?: 'alfa-on-white' | 'alfa-on-color';
}

class MyComponent extends React.PureComponent<MyComponentProps> {
    render() {
        return (
            <div></div>
        )
    }
}

export default withTheme(MyComponent);
