/**
 * @file
 * Custom JS for the Menu_MiniPanels module.
 */

/**
 * Add minipanel hovers to any menu items that have minipanel qTip config
 * arrays specified in the page footer.
 */
Drupal.behaviors.menuMiniPanels = function(context) {
  $.each(Drupal.settings.menuMinipanels.panels, function () {
    var setting = this;
    $('a.menu-minipanel-' + setting.mlid + ':not(.minipanel-processed)')
      .filter(function () {
        // Prevent links in qTips from generating qTips themselves, prevents
        // recursion.
        return $(this).parents('.menu-minipanels').length < 1;
      })
      .each(function () {
        $(this).addClass('minipanel-processed');
        setting.content = $('div.menu-minipanel-' + setting.mlid).clone().show();
        setting.hide.fixed = true;

        // Specify a custom target.
        if (setting.position.target == 'custom') {
          var target = $(setting.position.target_custom);
          if (target.length > 0) {
            setting.position.target = target;
          }
          else {
            setting.position.target = false;
          }
        }
        else {
          setting.position.target = false;
        }

        // Allowed names in qTip API.
        setting.api = {};
        var allowedNames = [
          'beforeRender',
          'onRender',
          'beforePositionUpdate',
          'onPositionUpdate',
          'beforeShow',
          'onShow',
          'beforeHide',
          'onHide',
          'beforeContentUpdate',
          'onContentUpdate',
          'beforeContentLoad',
          'onContentLoad',
          'beforeTitleUpdate',
          'onTitleUpdate',
          'beforeDestroy',
          'onDestroy',
          'beforeFocus',
          'onFocus'
        ];

        // Set function for each allowed callback.
        $.each(allowedNames, function() {
          var name = this;
          setting.api[name] = function(event, content) {
            return MenuMiniPanels.runCallback(name, this, event, content);
          };
        });

        // Record what DOM element launched this qTip.
        setting.activator = 'a.menu-minipanel-' + setting.mlid;

        // Initialize the qTip.
        $(this).qtip(setting);
      });
  });

  // Mark target element as selected.
  MenuMiniPanels.setCallback('beforeShow', function(qTip, event, content) {
    // Forceably remove the class off all DOM elements, avoid problems
    // of it not being properly removed in certain scenarios.
    $('.qtip-hover').removeClass('qtip-hover');

    // Add the hover class to the current item.
    var target = $(qTip.elements.target.get(0));
    if (target !== undefined) {
      target.addClass('qtip-hover');
    }
  });

  // Unmark target element as selected.
  MenuMiniPanels.setCallback('beforeHide', function(qTip, event, content) {
    // Remove the class off all DOM elements.
    $('.qtip-hover').removeClass('qtip-hover');
  });
};


// Parent object for storing the callbacks.
var MenuMiniPanels = MenuMiniPanels || {callback: {}};

/**
 * This is executed automatically by jQuery.
 */
MenuMiniPanels.init = function() {
  // 'beforeShow' callback allows attaching Drupal behaviors to qTip content.
  MenuMiniPanels.setCallback('beforeShow', function(qTip, event, content){
    Drupal.attachBehaviors(qTip.elements.content.get(0));
  });
}

/**
 * Function registers callback function.
 * It allows assign own callback functions with qTip events.
 *
 * Callback function should have three parameters:
 * - qTip - qtip object
 * - event - event object
 * - content - content
 *
 *  All available qTip callback names are listed on the page
 *  http://craigsworks.com/projects/qtip/docs/api/#callbacks
 */
MenuMiniPanels.setCallback = function(name, callback) {
  this.callback[name] = callback;
};

/**
 * Internal function - runs a given callback.
 */
MenuMiniPanels.runCallback = function(name, qTip, event, content) {
  if (name in this.callback) {
    var event = event || {};
    var content = content || {};
    return this.callback[name](qTip, event, content);
  }
};
