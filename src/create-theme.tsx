import React from 'react';

export function createTheme<T>(defaultTheme: T) {
    const ThemeContext = React.createContext<T>(defaultTheme);

    function withTheme<P extends { theme?: T }>(
        Component: React.ComponentType<P>
    ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<React.Component<P>>> {
        const ForwardRef: React.RefForwardingComponent<React.Component<P>, P> = ({ ...props }, ref) => {
            return (
                <ThemeContext.Consumer>
                    { (state) => {
                        const propsWithTheme = {
                            ...props,
                            theme: props.theme || state || defaultTheme
                        };

                        return (
                            <Component { ...propsWithTheme } ref={ ref } />
                        );
                    } }
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
