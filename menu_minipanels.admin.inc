<?php
/**
 * @file
 * Menu Minipanels administration include file for configuration.
 */

/**
 * Page callback for admin/settings/menu_minipanels.
 */
function menu_minipanels_admin() {
  $form = array();

  // Show the current status of the qTip library.
  include_once 'includes/install.inc';
  module_load_include('install', 'menu_minipanels');

  // Give shortcuts to the menu-edit pages.
  $result = db_query("SELECT * FROM {menu_custom} ORDER BY title", array(), array('fetch' => PDO::FETCH_ASSOC));
  $header = array(t('Title'), array('data' => t('Can be used?')));
  $rows = array();
  foreach ($result as $menu) {
    $row = array();
    $row[] = array(
      'data' => l($menu['title'], 'admin/structure/menu/manage/' . $menu['menu_name'] . '/edit', array(
        'query' => array('destination' => 'admin/config/content/menu_minipanels'),
        'attributes' => array('title' => t('Edit this menu')),
      )),
    );
    if (variable_get('menu_minipanels_' . $menu['menu_name'] . '_enabled', FALSE)) {
      $label = 'Yes';
    }
    else {
      $label = 'No';
    }
    $row[] = array(
      'data' => l(t($label), 'admin/config/user-interface/menu_minipanels/toggle/' . $menu['menu_name'], array(
        'attributes' => array('title' => t('Toggle this menu')),
      )),
    );
    $rows[] = $row;
  }
  $form['menus'] = array(
    '#markup' => theme('table', array(
      'caption' => t('Menu selection'),
      'header' => $header,
      'rows' => $rows,
    )),
  );

  // Additional global settings.

  // Control which pages are excluded from having megamenus.
  $form['menu_minipanels_exclude_paths'] = array(
    '#type' => 'textarea',
    '#title' => t("Don't show Menu_Minipanels on specific pages"),
    '#default_value' => variable_get('menu_minipanels_exclude_paths', "admin\nadmin/*"),
    '#description' => t("Specify pages by using their paths. Enter one path per line. The '*' character is a wildcard. Example paths are %blog for the blog page and %blog-wildcard for every personal blog. %front is the front page.", array(
        '%blog' => 'blog',
        '%blog-wildcard' => 'blog/*',
        '%front' => '<front>',
      )),
  );

  return system_settings_form($form);
}

/**
 * Toggle the status of a menu.
 */
function menu_minipanels_menu_toggle($menu) {
  // Some security precations.
  $menu = check_plain($menu);

  // First ensure the menu item actually exists.
  $result = db_query("SELECT menu_name FROM {menu_custom} WHERE menu_name = :name", array(':name' => $menu), array('fetch' => PDO::FETCH_ASSOC));
  if (!empty($result)) {
    if (variable_get('menu_minipanels_' . $menu . '_enabled', FALSE)) {
      variable_set('menu_minipanels_' . $menu . '_enabled', FALSE);
    }
    else {
      variable_set('menu_minipanels_' . $menu . '_enabled', TRUE);
    }

    drupal_set_message(t('Menu :menu has been toggled.', array(':menu' => $menu)));
  }

  drupal_goto('admin/config/user-interface/menu_minipanels');
}
