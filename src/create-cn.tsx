type CnModifierMap = { [key: string]: boolean | string };

export function createCn(blockName: string, className?: string, theme?: string) {
    return function (
        this: { props?: Record<string, unknown> } | void,
        elementNameOrMods?: string | CnModifierMap,
        mods?: CnModifierMap
    ) {
        if (typeof elementNameOrMods === 'string') { // create an element className
            const out = `${blockName}__${elementNameOrMods}`;

            if (mods) {
                return `${out}${createModifiersString(out, mods)}`;
            }
            return out;
        }

        let out = blockName;
        if (theme) {
            elementNameOrMods = {
                ...elementNameOrMods,
                theme
            };
        }
        if (typeof className === 'string') { // external className provided as factory argument
            out += ` ${className}`;
        } else if (typeof this === 'object' && this.props) { // external className from props
            if (this.props.className && typeof this.props.className === 'string') {
                out += ` ${this.props.className}`;
            }
            if (this.props.theme && typeof this.props.theme === 'string') {
                elementNameOrMods = {
                    ...elementNameOrMods,
                    theme: this.props.theme
                };
            }
        }

        if (elementNameOrMods) {
            return `${out}${createModifiersString(blockName, elementNameOrMods)}`;
        }

        return out;
    };
}

function createModifiersString(blockName: string, elemOrMode: CnModifierMap) {
    return Object.keys(elemOrMode)
        .reduce((prev, curr) => {
            const value = elemOrMode[curr];

            if (typeof value === 'string') {
                return `${prev} ${blockName}_${curr}_${value}`;
            }
            if (value) {
                return `${prev} ${blockName}_${curr}`;
            }
            return prev;
        }, '');
}
