import React from 'react';

export function createTheme<T>(defaultTheme: T) {
    const ThemeContext = React.createContext<T>(defaultTheme);

    function withTheme<P extends { theme?: T }>(
        Component: React.ComponentClass<P>
    ) {
        const ForwardRef: React.RefForwardingComponent<React.Component<P>, P> = (props, ref) => {
            return (
                <ThemeContext.Consumer>
                    { state => <Component theme={ state || defaultTheme } ref={ ref } { ...props } /> }
                </ThemeContext.Consumer>
            );
        };
        ForwardRef.displayName =`ThemedComponent(${Component.displayName || Component.name})`;

        return React.forwardRef(ForwardRef);
    }

    return {
        ThemeProvider: ThemeContext.Provider,
        withTheme
    };
}
