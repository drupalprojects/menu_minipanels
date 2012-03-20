/**
 * @file
 * Custom JS for administering Menu_MiniPanels.
 */

/**
 * In admin menu edit, this hides and closes the qTip config depending on
 * whether a minipanel is selected.
 */
Drupal.behaviors.menuMiniPanelsAdmin = function(context) {
  // In the administration section, hide hover settings unless a minipanel is
  // selected.
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
  
  // Set appropriate on load.
  toggleHoverSettings();
};
