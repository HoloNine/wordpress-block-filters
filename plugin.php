function gutenberg_custom_classes_enqueue() {
    wp_enqueue_script(
        'gutenberg-custom-classes',
        plugin_dir_url(__FILE__) . 'plugin.js',
        array('wp-blocks', 'wp-edit-post', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-element'),
        false,
        true
    );
}
add_action('enqueue_block_editor_assets', 'gutenberg_custom_classes_enqueue');
