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

      // Integrate with the core Contextual module.
      MenuMiniPanels.setCallback('onRender', function(qTip, event, content) {
        $('div.menu-minipanels div.contextual-links-wrapper', context).each(function () {
          var $wrapper = $(this);
          // Remove the popup link added from the first time the Contextual
          // module processed the links.
          $wrapper.children('a.contextual-links-trigger').detach();
          // Continue as normal.
          var $region = $wrapper.closest('.contextual-links-region');
          var $links = $wrapper.find('ul.contextual-links');
          var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
            function () {
              $links.stop(true, true).slideToggle(100);
              $wrapper.toggleClass('contextual-links-active');
              return false;
            }
          );
          // Attach hover behavior to trigger and ul.contextual-links.
          $trigger.add($links).hover(
            function () { $region.addClass('contextual-links-region-active'); },
            function () { $region.removeClass('contextual-links-region-active'); }
          );
          // Hide the contextual links when user clicks a link or rolls out of
          // the .contextual-links-region.
          $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
          // Prepend the trigger.
          $wrapper.prepend($trigger);
        });
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
