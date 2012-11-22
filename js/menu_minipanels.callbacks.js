/**
 * @file
 * Default JS callbacks for the Menu_MiniPanels module.
 */

/**
 * If either of these callbacks need to be customized then the following must
 * be done:
 *  1. Disable the "Load default JS callbacks" option on the main settings
 *     page.
 *  2. Copy this file to a new location and set it to load as necessary, e.g.
 *     by adding it to the site's theme directory and listing it on the theme's
 *     .info file.
 *  3. Customize as necessary, see API.txt for further details of the callbacks
 *     that are available for use.
 */
Drupal.behaviors.menuMiniPanelsCallbacks = function(context) {
  // Mark target element as selected.
  MenuMiniPanels.setCallback('beforeShow', function(qTip, event, content) {
    // Forceably remove the class off all DOM elements, avoid problems
    // of it not being properly removed in certain scenarios.
    $('.qtip-hover').removeClass('qtip-hover');

    // Add the hover class to the current item.
    var $target = $(qTip.elements.target.get(0));
    if ($target !== undefined) {
      $target.addClass('qtip-hover');
    }
  });

  // Unmark target element as selected.
  MenuMiniPanels.setCallback('beforeHide', function(qTip, event, content) {
    // Remove the class off all DOM elements.
    $('.qtip-hover').removeClass('qtip-hover');
  });
};
