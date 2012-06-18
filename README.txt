Menu MiniPanels

Allows an administrator to specify a minipanel to be associated with a Drupal
menu item.  When that menu item is hovered or clicked (as per config), the
minipanel content will be shown using the qTip javascript library


Installation: Drush
-------------------
 1. Download the module and its dependencies:
      drush dl menu_minipanels panels ctools
 2. Enable the modules:
      drush en -y menu_minipanels
 3. Download the qTip library:
      drush download-qtip


Installation: Manual
--------------------
 1. Download the menu_minipanels module, along with its dependencies - Panels
    and CTools; move them to your site's sites/all/modules/contrib directory.
 2. Visit http://craigsworks.com/projects/qtip/download/ and download the
    *minified* qTip version.
 3. Extract the archive and find the file named: jquery.qtip-1.0.0-rc3.min.js
 4. Place this file in the sites/all/libraries/qtip directory of your Drupal
    installation so that the file is available at:
      sites/all/libraries/qtip/jquery.qtip-1.0.0-rc3.min.js
    This path may be adjusted using the Libraries API module
    (http://drupal.org/project/libraries).
 5. Enable the module from the modules admin page (admin/modules).


Configuration
-------------
 * Visit the "Menu Minipanels" settings page
   (admin/settings/menu_minipanels) to configure several defaults; this will
   help give the site a consistent look across all menus.
 * Use the "Menu selection" table on the settings page to control which menus
   are configured to work with Menu_MiniPanels.
 * Create a minipanel for the content to be displayed - documentation on using
   Panels: http://drupal.org/node/496278
 * After selecting a minipanel the qTip configuration options will appear;
   these options mirror qTip's regular configuration:
     http://craigsworks.com/projects/qtip/docs/reference/
 * Once finished configuring the options, save the menu item as normal - this
   will cause the menu item to be instantly activated and display.


Tips
----
The module will add the class "qtip-hover" to the menu item which triggered the
minipanel to display, allowing it to be themed to match the normal :hover
state.  There is not currently a way to make it retain the :hover state while
the pointer is over the minipanel, so this is a work-around.


Known Issues
------------
Due to how the menu system works in Drupal 6 it is not currently possible to
display menu minipanels on 404 pages, even when using Blocks404.

There are compatibility problems between the qTip library and other JavaScript
-enabled widgets that cause the widgets to not trigger when placed within a
minipanel. This is noted to cause problems with Quicktabs, Commerce widgets,
maps from Google Maps and other sources, and many others.

If an error "Invalid calling object" shows on IE9's Javascript console, there
may be another script or plugin loading on the page which is conflicting. In
one case it was caused by DivX Player (http://drupal.org/node/1379542), once it
was removed the problem ended.

The qTip library takes over the tooltip display DOM events so it is not
possible to display normal link title tooltips on menu items which have
minipanels attached.


Author
------
Maintainer: Willie Seabrook (http://drupal.org/user/373883)
Co-maintainer: Damien McKenna (http://drupal.org/user/108450)
