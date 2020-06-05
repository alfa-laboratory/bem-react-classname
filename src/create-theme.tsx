import React from 'react';

export function createTheme<T>(defaultTheme: T) {
    const ThemeContext = React.createContext<T>(defaultTheme);

    function withTheme<P extends { theme?: T }, U extends React.ReactNode>(
        Component: React.ComponentType<P>,
    ) {
        const ThemedComponent: React.RefForwardingComponent<U, P> = ({ ...props }, ref) => (
            <ThemeContext.Consumer>
                { (state) => {
                    const propsWithTheme = {
                        ...props,
                        theme: props.theme || state || defaultTheme,
                    };

                    return (
                        <Component { ...propsWithTheme } ref={ ref } />
                    );
                } }
            </ThemeContext.Consumer>
        );
        
        ThemedComponent.displayName =`ThemedComponent(${Component.displayName || Component.name})`;
        const ForwardRef = React.forwardRef<U, P>(ThemedComponent);

        return ForwardRef as typeof ForwardRef & U;
    }

    return {
        ThemeProvider: ThemeContext.Provider,
        withTheme,
    };
}