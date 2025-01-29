const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { useState } = wp.element;

const CUSTOM_CLASS_OPTIONS = [
    { label: 'Red Background', value: 'red-bg' },
    { label: 'Blue Text', value: 'blue-text' },
    { label: 'Large Padding', value: 'large-padding' },
];

const addNewClassNamesAttribute = (settings) => {
    settings.attributes = {
        ...settings.attributes,
        newClassNames: { type: 'string', default: '' },
    };
    return settings;
};
addFilter('blocks.registerBlockType', 'custom-plugin/add-new-classnames-attribute', addNewClassNamesAttribute);

const withCustomInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes } = props;
        const [selectedClasses, setSelectedClasses] = useState(attributes.newClassNames || '');

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Custom Classes">
                        <SelectControl
                            label="Choose Custom Class"
                            value={selectedClasses}
                            options={[{ label: 'None', value: '' }, ...CUSTOM_CLASS_OPTIONS]}
                            onChange={(newClass) => {
                                setSelectedClasses(newClass);
                                setAttributes({ newClassNames: newClass });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withCustomInspectorControls');
addFilter('editor.BlockEdit', 'custom-plugin/with-custom-inspector-controls', withCustomInspectorControls);

const applyCustomClassToBlock = (extraProps, blockType, attributes) => {
    if (attributes.newClassNames) {
        extraProps.className = `${extraProps.className || ''} ${attributes.newClassNames}`.trim();
    }
    return extraProps;
};
addFilter('blocks.getSaveContent.extraProps', 'custom-plugin/apply-custom-class-to-block', applyCustomClassToBlock);
