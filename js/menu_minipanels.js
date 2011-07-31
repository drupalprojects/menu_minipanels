/**
 * @file
 * Custom JS for the Menu_MiniPanels module.
 */

/**
 * Adds minipanel hovers to any menu items that have minipanel qTip config
 * arrays specified in the page footer.
 */
(function($) {
  Drupal.behaviors.menuMiniPanels = {
    attach: function(context, settings) {
      // Add the hovers to each appropriate menu item.
      $('ul#main-menu li a:not(.minipanel-processed)', context).each(function() {
        // Ensure that the panels are only processed once.
        $(this).addClass('minipanel-processed');

        var matches = $(this).attr('class').match('menu-minipanel-([a-zA-Z0-9\_]+)');
        // Only proceed if this menu item has a minipanel.
        if (matches != undefined) {
          var html = $('div.' + matches[1]).clone().show();
          var panel_settings = settings.menuMinipanels.panels[matches[1]];
          panel_settings['hide']['fixed'] = true;
          panel_settings['content'] = html;
          $(this).qtip(panel_settings);
        }
      });
    }
  };
})(jQuery);
