/**
 * @file
 * Custom JS for the Menu_MiniPanels module.
 */

/**
 * In admin menu edit, this hides and closes the qTip config depending on
 * whether a minipanel is selected.
 * 
 * On every page, it adds minipanel hovers to any menu items that have
 * minipanel qTip config arrays specified in the page footer.
 */
(function($) {
  Drupal.behaviors.menuMiniPanels = {
    attach: function(context, settings) {
      // Site admin.

      // In the administration section, hide hover settings unless a minipanel
      // is selected.
      var toggleHoverSettings = function() {
        if ($('#edit-menu-options-minipanel').val() == '' && $('#menu-minipanels-hover-settings').is(':visible')) {
          $('#menu-minipanels-hover-settings').slideUp(500);
        }
        else if ($('#edit-menu-options-minipanel').val() != '') {
          $('#menu-minipanels-hover-settings').slideDown(500);
        }
      }
        
      $('#edit-menu-options-minipanel').change(function(e) {
        toggleHoverSettings();
      });
        
      // Set appropriate on load
      toggleHoverSettings();


      // Normal use.

      // Add the hovers to each appropriate menu item.
      $('ul#main-menu-links li a').each(function() {
        var matches = $(this).attr('class').match('menu-minipanel-([a-zA-Z0-9\_]+)');
        var html = $('div.' + matches[1]).clone().show();
        var panel_settings = settings.menuMinipanels.panels[matches[1]];
        panel_settings['hide']['fixed'] = true;
        panel_settings['content'] = html;
        $(this).qtip(panel_settings);
      });
    }
  };
})(jQuery);
