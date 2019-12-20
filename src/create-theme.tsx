import React from 'react';

export function createTheme<T>(defaultTheme: T) {
    const ThemeContext = React.createContext<T>(defaultTheme);

    function withTheme<P extends { theme?: T }>(
        Component: React.ComponentType<P>
    ): React.ComponentType<P & React.RefAttributes<any>> {
        const ForwardRef: React.RefForwardingComponent<React.Component<P>, P> = (props, ref) => {
            return (
                <ThemeContext.Consumer>
                    { state => <Component theme={ state || defaultTheme } { ...props } ref={ ref }  /> }
                </ThemeContext.Consumer>
            );
        };
        ForwardRef.displayName =`ThemedComponent(${Component.displayName || Component.name})`;

        return React.forwardRef(ForwardRef) as any;
    }

    return {
        ThemeProvider: ThemeContext.Provider,
        withTheme
    };
}
