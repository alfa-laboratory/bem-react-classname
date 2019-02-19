import React from 'react';

export function createTheme<T>(defaultTheme: T) {
    const ThemeContext = React.createContext<T>(defaultTheme);

    function withTheme<P extends { theme?: T }>(
        Component: React.ComponentClass<P>
    ) {
        return function ThemedComponent(props: P) {
            return (
                <ThemeContext.Consumer>
                    { state => <Component theme={ state } { ...props } /> }
                </ThemeContext.Consumer>
            );
        };
    }

    return {
        ThemeProvider: ThemeContext.Provider,
        withTheme
    };
}
