import React from 'react';
import { mount } from 'enzyme';
import { createTheme } from './create-theme';
import ThemedComponent from './themed-component-example-for-test';

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
    const ref = React.createRef();

    mount(
        <ThemeProvider value='yellow'>
            <CompWithTheme ref={ref} />
        </ThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(Component);
});

test('should allow use wrapped component as type', () => {
    // TODO: fix
    let component: ThemedComponent;

    expect(true).toBeTruthy();
});
