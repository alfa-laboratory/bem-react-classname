import React from 'react';
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
