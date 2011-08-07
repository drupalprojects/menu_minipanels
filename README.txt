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


Author
------
Maintainer: Willie Seabrook (http://drupal.org/user/373883)
Co-maintainer: Damien McKenna (http://drupal.org/user/108450)

Thanks to uk (http://drupal.org/user/1100194) for greatly contributing on the
Drupal 7 port.
