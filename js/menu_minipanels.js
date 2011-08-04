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
      $('ul li a.menu-minipanel:not(.minipanel-processed)', context).each(function() {
        // Ensure that the panels are only processed once.
        $(this).addClass('minipanel-processed');

        var matches = $(this).attr('class').match('menu-minipanel-([0-9]+)');
        var html = $('div.menu-minipanel-' + matches[1]).clone().show();
        var settings = Drupal.settings.menuMinipanels.panels['panel_' + matches[1]];
        settings['hide']['fixed'] = true;
        // Specify a custom target.
        if (settings['position']['target'] == 'custom') {
          var target = $(settings['position']['target_custom']);
          if (target.length > 0) {
            settings['position']['target'] = target;
          }
          else {
            settings['position']['target'] = false; 
          }
        }
        else {
          settings['position']['target'] = false; 
        }
        settings['content'] = html;
        $(this).qtip(settings);
      });
    }
  };
})(jQuery);
