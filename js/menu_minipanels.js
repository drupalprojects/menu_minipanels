/**
 * @file
 * Custom JS for the Menu_MiniPanels module.
 */

(function($) {
  /**
   * Adds minipanel hovers to any menu items that have minipanel qTip config
   * arrays specified in the page footer.
   */
  Drupal.behaviors.menuMiniPanels = {
    attach: function(context, settings) {
      // The base DOM structure to work from.
      var dom_base = 'ul li a';

      // Add the hovers to each appropriate menu item.
      $(dom_base + '.menu-minipanel:not(.minipanel-processed)', context).each(function() {
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

        // Allowed names in qTip API.
        settings['api'] = {};
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
        jQuery.each(allowedNames, function(index, name) {
          settings['api'][name] = function(event, content) {
            return MenuMiniPanels.runCallback(name, this, event, content);
          };
        });

        // Record what DOM element launched this qTip.
        settings['activator'] = dom_base + '.' + matches[0];

        // Initialize the qTip.
        $(this).qtip(settings);
      });

      // Mark target element as selected.
      MenuMiniPanels.setCallback('beforeShow', function(qTip, event, content) {
        var $target = $(qTip.elements.target.get(0));
        if ($target !== undefined) {
          $target.addClass('qtip-hover');
        }
      });

      // Unmark target element as selected.
      MenuMiniPanels.setCallback('beforeHide', function(qTip, event, content) {
        // Forceably remove the class off all DOM elements, avoid problems
        // of it not being properly removed in certain scenarios.
        $('.qtip-hover').removeClass('qtip-hover');
      });
    }
  };
})(jQuery);

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
