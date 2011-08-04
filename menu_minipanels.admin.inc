<?php
/**
 * Menu Minipanels administration include file for configuration
 */

/**
 * Page callback for admin/settings/menu_minipanels
 */
function menu_minipanels_admin() {
  $form = array();
  _menu_minipanels_hover_settings_form($form, variable_get('menu_minipanels_hover', _menu_minipanels_hover_defaults()), _menu_minipanels_hover_defaults());
  return system_settings_form($form);
}

/**
 * The configuration form for the qtip. This form simply mirrors the options
 * specified at: http://craigsworks.com/projects/qtip/docs/reference/
 */
function _menu_minipanels_hover_settings_form(&$base_form, $menu_minipanels_hover, $defaults) {
  // Setting up select lists used in the config form
  // Used for both show and hide effect options.
  $effect_options = array(
    'false' => t('None'),
    'fade' => t('Fade'),
    'slide' => t('Slide'),
    'grow' => t('Grow')
  );
  // Used in many places.
  $boolean_options = array(
    'true' => t('True'),
    'false' => t('False')
  );
  // Used in many places.
  $options_tips = array(
    'topLeft' => t('Top Left'),
    'topMiddle' => t('Top Middle'),
    'topRight' => t('Top Right'),
    'rightTop' => t('Right Top'),
    'rightMiddle' => t('Right Middle'),
    'rightBottom' => t('Right Bottom'),
    'bottomRight' => t('Bottom Right'),
    'bottomMiddle' => t('Bottom Middle'),
    'bottomLeft' => t('Bottom Left'),
    'leftBottom' => t('Left Bottom'),
    'leftMiddle' => t('Left Middle'),
    'leftTop' => t('Left Top'),
  );

  // Make this a #tree structure, so that form data collapses nicely into an
  // associate array so that we can simply print it out as javascript and it
  // fits the data structure that qtip is expecting.  Also, add a surrounding
  // div that our javascript code can use to hide/show the qtip configuration
  // when a minipanel is selected.
  $base_form['menu_minipanels_hover'] = array(
    '#tree' => TRUE,
    '#prefix' => '<div id="menu-minipanels-hover-settings">',
    '#suffix' => '</div>'
  );

  // This section - tooltip position.
  $base_form['menu_minipanels_hover']['position'] = array(
  	'#type' => 'fieldset',
    '#title' => t('Hover position configuration'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $target_options = array(
    'element' => t('Element'),
    'mouse' => t('Mouse'),
    'custom' => t('Custom'),
  );
  $base_form['menu_minipanels_hover']['position']['target'] = array(
    '#type' => 'select',
    '#title' => t('Target'),
    '#description' => t('The location the hover will appear relative to.'),
    '#default_value' => isset($menu_minipanels_hover['position']['target']) ? $menu_minipanels_hover['position']['target'] : $defaults['position']['target'],
    '#options' => $target_options,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['position']['target_custom'] = array(
    '#type' => 'textfield',
    '#title' => t('Target Custom'),
    '#description' => t('If \'custom\' is selected above, specify a jQuery selector, e.g. \'#header\' without the quotes.'),
    '#default_value' => isset($menu_minipanels_hover['position']['target_custom']) ? $menu_minipanels_hover['position']['target_custom'] : $defaults['position']['target_custom'],
    '#required' => FALSE,
  );

  $type_options = array(
    'absolute' => t('Absolute'),
    'relative' => t('Fixed'),
    'static' => t('Relative'),
    'relative' => t('Static'),
  );
  $base_form['menu_minipanels_hover']['position']['type'] = array(
    '#type' => 'select',
    '#title' => t('Position type'),
    '#description' => t('Choose how the menu is positioned.'),
    '#default_value' => isset($menu_minipanels_hover['position']['type']) ? $menu_minipanels_hover['position']['type'] : $defaults['position']['type'],
    '#options' => $type_options,
    '#required' => TRUE,
  );

  $base_form['menu_minipanels_hover']['position']['corner'] = array();
  $base_form['menu_minipanels_hover']['position']['corner']['target'] = array(
    '#type' => 'select',
    '#title' => t('Target'),
    '#description' => t('Choose the tooltip target.'),
    '#default_value' => isset($menu_minipanels_hover['position']['corner']['target']) ? $menu_minipanels_hover['position']['corner']['target'] : $defaults['position']['corner']['target'],
    '#options' => $options_tips,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['position']['corner']['tooltip'] = array(
    '#type' => 'select',
    '#title' => t('Tooltip'),
    '#description' => t('Choose the tooltip position.'),
    '#default_value' => isset($menu_minipanels_hover['position']['corner']['tooltip']) ? $menu_minipanels_hover['position']['corner']['tooltip'] : $defaults['position']['corner']['tooltip'],
    '#options' => $options_tips,
    '#required' => TRUE,
  );

  // This section - showing the tooltip.
  $base_form['menu_minipanels_hover']['show'] = array(
  	'#type' => 'fieldset',
    '#title' => t('Show effect configuration'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $base_form['menu_minipanels_hover']['show']['delay'] = array(
    '#type' => 'textfield',
    '#title' => t('Delay'),
    '#description' => t('How long (in milliseconds) the tooltip should wait before showing. Leave blank to use the default of 140ms.'),
    '#default_value' => isset($menu_minipanels_hover['show']['delay']) ? $menu_minipanels_hover['show']['delay'] : $defaults['show']['delay'],
    '#required' => FALSE,
  );

  $when_options = array(
    'click' => t('Click'),
    'dblclick' => t('Double Click'),
    'mouseover' => t('Mouse Over'),
    'mouseenter' => t('Mouse Enter')
  );
  $base_form['menu_minipanels_hover']['show']['when'] = array();
  $base_form['menu_minipanels_hover']['show']['when']['event'] = array(
    '#type' => 'select',
    '#title' => t('Show Event'),
    '#description' => t('When the menu should appear.'),
    '#default_value' => isset($menu_minipanels_hover['show']['when']['event']) ? $menu_minipanels_hover['show']['when']['event'] : $defaults['show']['when']['event'],
    '#options' => $when_options,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['show']['effect'] = array();
  $base_form['menu_minipanels_hover']['show']['effect']['type'] = array(
    '#type' => 'select',
    '#title' => t('Effect Type'),
    '#description' => t('Choose an effect.'),
    '#default_value' => isset($menu_minipanels_hover['show']['effect']['type']) ? $menu_minipanels_hover['show']['effect']['type'] : $defaults['show']['effect']['type'],
    '#options' => $effect_options,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['show']['effect']['length'] = array(
    '#type' => 'textfield',
    '#title' => t('Length'),
    '#description' => t('Length of the effect (milliseconds). Leave blank to use the default of 100ms.'),
    '#default_value' => isset($menu_minipanels_hover['show']['effect']['length']) ? $menu_minipanels_hover['show']['effect']['length'] : $defaults['show']['effect']['length'],
    '#required' => FALSE,
  );

  // This section - hiding the tooltip.
  $base_form['menu_minipanels_hover']['hide'] = array(
  	'#type' => 'fieldset',
    '#title' => t('Hide effect configuration'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $base_form['menu_minipanels_hover']['hide']['fixed'] = array(
    '#type' => 'select',
    '#title' => t('Fixed'),
    '#description' => t('Should the tooltip remain or dissapear.'),
    '#default_value' => isset($menu_minipanels_hover['hide']['fixed']) ? $menu_minipanels_hover['hide']['fixed'] : $defaults['hide']['fixed'],
    '#options' => $boolean_options,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['hide']['effect'] = array();
  $base_form['menu_minipanels_hover']['hide']['effect']['type'] = array(
    '#type' => 'select',
    '#title' => t('Effect Type'),
    '#description' => t('Choose an effect.'),
    '#default_value' => isset($menu_minipanels_hover['hide']['effect']['type']) ? $menu_minipanels_hover['hide']['effect']['type'] : $defaults['hide']['effect']['type'],
    '#options' => $effect_options,
    '#required' => TRUE,
  );
  $base_form['menu_minipanels_hover']['hide']['effect']['length'] = array(
    '#type' => 'textfield',
    '#title' => t('Length'),
    '#description' => t('Length of the effect (milliseconds).'),
    '#default_value' => isset($menu_minipanels_hover['hide']['effect']['length']) ? $menu_minipanels_hover['hide']['effect']['length'] : $defaults['hide']['effect']['length'],
    '#required' => FALSE,
  );

  // This section - style configuration.
  $base_form['menu_minipanels_hover']['style'] = array(
  	'#type' => 'fieldset',
    '#title' => t('Style configuration'),
    '#description' => t('Leave these values blank to inherit the style\'s default value.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $base_form['menu_minipanels_hover']['style']['name'] = array(
    '#type' => 'select',
    '#title' => t('Style name'),
    '#description' => t('The name of the style to apply.'),
    '#default_value' => isset($menu_minipanels_hover['style']['name']) ? $menu_minipanels_hover['style']['name'] : $defaults['style']['name'],
    '#options' => _menu_minipanels_get_styles(),
    '#required' => TRUE,
  );

  $base_form['menu_minipanels_hover']['style']['width'] = array();
  $base_form['menu_minipanels_hover']['style']['width']['min'] = array(
    '#type' => 'textfield',
    '#title' => t('Min width'),
    '#description' => t('Minimum width of the tooltip in pixels (excl. px).'),
    '#default_value' => isset($menu_minipanels_hover['style']['width']['min']) ? $menu_minipanels_hover['style']['width']['min'] : $defaults['style']['width']['min'],
    '#required' => FALSE,
  );

  $base_form['menu_minipanels_hover']['style']['width']['max'] = array(
    '#type' => 'textfield',
    '#title' => t('Max width'),
    '#description' => t('Maximum width of the tooltip in pixels (excl. px).'),
    '#default_value' => isset($menu_minipanels_hover['style']['width']['max']) ? $menu_minipanels_hover['style']['width']['max'] : $defaults['style']['width']['max'],
    '#required' => FALSE,
  );

  $base_form['menu_minipanels_hover']['style']['border'] = array();
  $base_form['menu_minipanels_hover']['style']['border']['width'] = array(
    '#type' => 'textfield',
    '#title' => t('Border width'),
    '#description' => t('Width of the border in pixels (excl. px).'),
    '#default_value' => isset($menu_minipanels_hover['style']['border']['width']) ? $menu_minipanels_hover['style']['border']['width'] : $defaults['style']['border']['width'],
    '#required' => FALSE,
  );

  $base_form['menu_minipanels_hover']['style']['border']['color'] = array(
    '#type' => 'textfield',
    '#title' => t('Border color'),
    '#description' => t('Color of the border. Incl. #.'),
    '#default_value' => isset($menu_minipanels_hover['style']['border']['color']) ? $menu_minipanels_hover['style']['border']['color'] : $defaults['style']['border']['color'],
    '#required' => FALSE,
  );

  $base_form['menu_minipanels_hover']['style']['border']['radius'] = array(
    '#type' => 'textfield',
    '#title' => t('Border radius'),
    '#description' => t('Determines the roundness of the tooltip border.'),
    '#default_value' => isset($menu_minipanels_hover['style']['border']['radius']) ? $menu_minipanels_hover['style']['border']['radius'] : $defaults['style']['border']['radius'],
    '#required' => FALSE,
  );
  $base_form['menu_minipanels_hover']['style']['tip'] = array(
    '#type' => 'select',
    '#title' => t('Arrow position'),
    '#description' => t('Choose the location of the arrow tip on the popup box.'),
    '#default_value' => isset($menu_minipanels_hover['style']['tip']) ? $menu_minipanels_hover['style']['tip'] : $defaults['style']['tip'],
    '#options' => array_merge(array('none' => 'None'), $options_tips),
    '#required' => FALSE,
  );

  return $base_form;
}

/**
 * Provide sensible defaults to the qTip configuration form.
 */
function _menu_minipanels_hover_defaults() {
  $defaults = array(
    'position' => array(
      'target' =>  'element',
      'target_custom' => '',
      'type' =>  'absolute',
      'corner' => array(
        'target' => 'bottomLeft',
        'tooltip' => 'topLeft',
      ),
      'adjust' => array(
        'x' => 0,
        'y' => 0,
        'mouse' => 'true',
        'screen' => 'false',
        'scroll' => 'true',
        'resize' => 'true',
      )
    ),
    'show' => array(
      'delay' => 0,
      'when' => array(
        'event' => 'mouseover',
      ),
      'effect' => array(
        'type' => 'slide',
        'length' => 0
      )
    ),
    'hide' => array(
      'fixed' => 'true',
      'effect' => array(
        'type' => 'slide',
        'length' => 0
      )
    ),
    'style' => array(
      'name' => 'light',
      'width' => array(
        'min' => 0,
        'max' => 250
      ),
      'border' => array(
        'width' => 3,
        'radius' => 0,
        'color' => '#d3d3d3'
      ),
      'tip' => 'topLeft',
    )
  );

  // Implement hook_menu_minipanels_defaults_alter() in a module to override
  // the settings above.
  drupal_alter('menu_minipanels_defaults', $defaults);

  return $defaults;
}

/**
 * Looks for hook_menu_minipanels_styles implementation.
 */
function _menu_minipanels_get_styles() {
  $styles = module_invoke_all('menu_minipanels_styles');

  // Ensure that $styles is an array.
  if (!is_array($styles)) {
    $styles = array();
  }

  return $styles;
}

/**
 * Implements hook_menu_minipanels_styles().
 */
function menu_minipanels_menu_minipanels_styles() {
   $options_style = array(
    'cream' => t('Cream'),
    'light' => t('Light'),
    'dark' => t('Dark'),
    'green' => t('Green'),
    'red' => t('Red'),
  );
  
  return $options_style;
}
