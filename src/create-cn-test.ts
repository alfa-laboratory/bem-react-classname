import { createCn } from './create-cn';

test('should create function', () => {
    const cn = createCn('block');

    expect(typeof cn).toBe('function');
});

test('created function should return block name', () => {
    const cn = createCn('block');

    expect(cn()).toBe('block');
});

test('should add className from props of parent object', () => {
    const pseudoComponent = {
        props: { className: 'external' },
        cn: createCn('block')
    };

    expect(pseudoComponent.cn()).toBe('block external');
});

test('should not fail if props getter doesn\'t has className props', () => {
    const pseudoComponent = {
        props: {},
        cn: createCn('block')
    };

    expect(pseudoComponent.cn()).toBe('block');
});

test('should add themed className when "theme" prop is present', () => {
    const pseudoComponent = {
        props: {
            className: 'external',
            theme: 'white'
        },
        cn: createCn('block')
    };

    expect(pseudoComponent.cn()).toBe('block external block_theme_white');
});

test('should add className if it was passed as a string', () => {
    const cn = createCn('block', 'external');

    expect(cn()).toBe('block external');
});

test('should add theme if it was passed as a string', () => {
    const cn = createCn('block', undefined, 'white');

    expect(cn()).toBe('block block_theme_white');
});

test('should add theme and external className if it was passed as a string', () => {
    const cn = createCn('block', 'external', 'white');

    expect(cn()).toBe('block external block_theme_white');
});

test('should add element to block name', () => {
    const cn = createCn('block');

    expect(cn('element')).toBe('block__element');
});

test('should not add external className to element className', () => {
    const cn = createCn('block', 'external');

    expect(cn('element')).toBe('block__element');
});

test('should not add external className to element className when created in component context', () => {
    const pseudoComponent = {
        props: { className: 'external' },
        cn: createCn('block')
    };

    expect(pseudoComponent.cn('element')).toBe('block__element');
});

test('should add boolean modifiers to block className', () => {
    const cn = createCn('block');

    expect(cn({ mod1: true, mod2: false })).toBe('block block_mod1');
});

test('should add string modifier to block className', () => {
    const cn = createCn('block');

    expect(cn({ mod1: 'value' })).toBe('block block_mod1_value');
});

test('should add modifier to element className', () => {
    const cn = createCn('block');

    const className = cn('element', { mod1: true, mod2: false, mod3: 'value', mod4: 4 });
    expect(className).toBe('block__element block__element_mod1 block__element_mod3_value block__element_mod4_4');
});
