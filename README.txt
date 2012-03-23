Menu MiniPanels

Allows an administrator to specify a minipanel to be associated with a Drupal
menu item.  When that menu item is hovered or clicked (as per config), the
minipanel content will be shown using the qTip javascript library


Installation
------------
1. Add the module to your modules directory.
2. Visit http://craigsworks.com/projects/qtip/download/ and download the
   *minified* qTip version. The name of the file you need from the archive is
   jquery.qtip-1.0.0-rc3.min.js
3. Place this file in the sites/all/libraries/qtip directory of your Drupal
   installation so that the file is available at:
     sites/all/libraries/qtip/jquery.qtip-1.0.0-rc3.min.js
   This path may be adjusted using the Libraries API module
   (http://drupal.org/project/libraries).
4. Enable the module.
5. Visit "Menu Minipanels Settings" to configure default settings for qTip.
6. Visit the "Edit menu" page for each menu (not menu item) to ensure the
   correct menus are enabled for use with Menu MiniPanels.


Tips
----
The module will add the class "qtip-hover" to the menu item which triggered the
minipanel to display, allowing it to be themed to match the normal :hover
state.  There is not currently a way to make it retain the :hover state while
the pointer is over the minipanel, so this is a work-around.


Known Issues
------------
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

Thanks to uk (http://drupal.org/user/1100194) for greatly contributing on the
Drupal 7 port.
