// $Id$

/**
 * In admin menu edit, this hides and closes the qTip config
 * depending on whether a minipanel is selected.
 * 
 * On every page, it adds minipanel hovers to any menu items that have minipanel
 * qTip config arrays specified in the page footer
 */
Drupal.behaviors.menuMiniPanels = function(context) {
  // In the administration section, hide hover settings unless a minipanel is selected
  var toggleHoverSettings = function() {
    if($('#edit-menu-options-minipanel').val() == '' && $('#menu-minipanels-hover-settings').is(':visible')) {
      $('#menu-minipanels-hover-settings').slideUp(500);
    }
    else if($('#edit-menu-options-minipanel').val() != '') {
      $('#menu-minipanels-hover-settings').slideDown(500);
    }
  }
  
  $('#edit-menu-options-minipanel').change(function(e) {
    toggleHoverSettings();
  });
  
  // Set appropriate on load
  toggleHoverSettings();

  // Add the hovers to each appropriate menu item.
  $('ul li a.menu-minipanel').each(function() {
    var matches = $(this).attr('class').match('menu-minipanel-([0-9a-zA-Z\_]+)');
    var html = $('div.' + matches[1]).clone().show();
    var settings = Drupal.settings.menuMinipanels.panels[matches[1]];
    settings['hide']['fixed'] = true;
    settings['content'] = html;
    $(this).qtip(settings);
  });
};
