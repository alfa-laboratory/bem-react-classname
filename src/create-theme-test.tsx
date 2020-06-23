import React, { useLayoutEffect } from 'react';
import { mount } from 'enzyme';
import { createTheme } from './create-theme';

test('should return ThemeProvider and withTheme HOC', () => {
    const { ThemeProvider, withTheme } = createTheme('any string');

    expect(typeof withTheme).toBe('function');
    expect(ThemeProvider).toBeDefined();
});

test('should pass theme prop from Context to wrapped component', () => {
    const { ThemeProvider, withTheme } = createTheme('theme');
    const FakeComponent = jest.fn().mockReturnValue(null);
    const TestComponent = withTheme(FakeComponent);

    mount(
        <ThemeProvider value='yellow'>
            <TestComponent />
        </ThemeProvider>
    );

    expect(FakeComponent).toHaveBeenCalledWith({ theme: 'yellow' }, expect.anything());
});

test('should use theme provider theme when passed theme prop with undefined value', () => {
    const { ThemeProvider, withTheme } = createTheme('theme');
    const FakeComponent = jest.fn().mockReturnValue(null);
    const TestComponent = withTheme(FakeComponent);

    mount(
        <ThemeProvider value='yellow'>
            <TestComponent theme={undefined} />
        </ThemeProvider>
    );

    expect(FakeComponent).toHaveBeenCalledWith({ theme: 'yellow' }, expect.anything());
});

test('should allow to override theme when it was passed directly as props to component', () => {
    const { ThemeProvider, withTheme } = createTheme('theme');
    const FakeComponent = jest.fn().mockReturnValue(null);
    const TestComponent = withTheme(FakeComponent);

    mount(
        <ThemeProvider value='yellow'>
            <TestComponent theme='blue' />
        </ThemeProvider>
    );

    expect(FakeComponent).toHaveBeenCalledWith({ theme: 'blue' }, expect.anything());
});

test('should forward ref to wrapped component', () => {
    class Component extends React.Component<{ theme?: string }> {
        render() {
          return <div {...this.props} />;
        }
    }

    const { ThemeProvider, withTheme } = createTheme('theme');
    const CompWithTheme = withTheme(Component);
    const ref = React.createRef<Component>();

    mount(
        <ThemeProvider value='yellow'>
            <CompWithTheme ref={ref} />
        </ThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(Component);
});

test('should access to inner methods from ref in class component', () => {
    type Props = { theme?: string }; 
    const { ThemeProvider, withTheme } = createTheme('theme');

    class ClassComponent extends React.Component<Props> {
        render() {
            return <div />;
        }

        public doNothing = jest.fn()
    }

    const ThemedClassComponent = withTheme<Props, ClassComponent>(ClassComponent)
    const classComponentRef = React.createRef<typeof ThemedClassComponent>();

    mount(
        <ThemeProvider value='yellow'>
            <ThemedClassComponent ref={classComponentRef} />
        </ThemeProvider>
    );

    classComponentRef.current?.doNothing();

    expect(classComponentRef.current).toBeInstanceOf(ClassComponent);
    expect(classComponentRef.current?.doNothing).toBeCalledTimes(1);
});

test('should access to inner methods from ref in functional components', () => {
    type Props = { theme?: string }; 
    const { ThemeProvider, withTheme } = createTheme('theme');

    const FuncComponent: React.RefForwardingComponent<HTMLInputElement, Props> = (
        React.forwardRef<HTMLInputElement, Props>((_, ref) => <input ref={ref}/>)
    )

    const ThemedFuncComponent = withTheme(FuncComponent)
    
    const OtherComponent: React.FC = () => {
        const funcComponentRef = React.useRef<HTMLInputElement>(null);

        useLayoutEffect(() => {
            funcComponentRef.current?.focus();
        }, [])

        return (
            <ThemedFuncComponent ref={funcComponentRef} />
        )
    }
    
    const wrapper = mount(
        <ThemeProvider value='yellow'>
            <OtherComponent />
        </ThemeProvider>
    );

    expect(wrapper.find('input').is(':focus'));
});
