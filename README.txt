Menu MiniPanels

Menu MiniPanels provides a flexible "mega menu" solution for Drupal by
allowing a minipanel to be associated with a Drupal menu item. When that
menu item is hovered, the minipanel content will be shown using standard
CSS :hover techniques enhanced by CSS3 transition effects.


Important note:

Version 2 of Menu MiniPanels removed all JavaScript dependencies including
the qTip tooltip library, in favor of simplified CSS-based hover effects,
resulting in a much streamlined configuration UI.  If and when pure CSS
solutions become available for touch devices, they will be considered and
included.  Until then, the module integrates cleanly with Nice_Menus and
Superfish which can provide enhanced functionality for mobile and touch
devices, as well as old browser support.  Additionally, contributions of
JS + CSS recipes for customizing the look and feel of the mega menus in
your theme is welcome in the issue queue.


Installation: Drush
-------------------
 1. Download the module and its dependencies:
      drush dl menu_minipanels panels ctools
 2. Enable the modules:
      drush en -y menu_minipanels


Installation: Manual
--------------------
 1. Download the Menu MiniPanels module, along with its dependencies - Panels
    and CTools; move them to your site's sites/all/modules/contrib directory.
 2. Enable the module from the modules admin page (admin/modules).
 3. Optionally, download the Nice Menus, Superfish, or DHTML Menu module and
    any respective dependencies, and enable from the admin page (admin/modules).


Installation: Drush Make
------------------------
 1. Add menu_minipanels to a .make file (see http://drupal.org/node/1006620).
 2. Execute the Drush Make file.
 3. Enable via the installation profile or manually on the modules admin page.


Configuration
-------------
 1. Enable at least one menu in the "Menu selection" table in the module
    configuration page (admin/config/user-interface/menu_minipanels).
 2. Optionally, disable minipanels from being displayed on certain URLs in
    your website on the configuration page. By default, menu minipanels are
    disabled on admin pages.
 3. Create a minipanel (admin/structure/mini-panels). Refer to Panels
    documentation for help with minipanels: http://drupal.org/node/496278
 4. Associate a minipanel with a menu item: Edit the menu item, select a
    minipanel from the dropdown. Note: This dropdown is only visible to
    menus enabled in configuration step 1 above.
 5. Optionally, create/configure/enable a Superfish or Nice Menus block into
    a region of your theme or into a panel layout.
 6. Visit any page where the menu is not disabled, and hover the menu item.
 6. Configure the look and feel of the Menu MiniPanel:
    * If using Superfish, Nice Menus, or DHTML Menu, first configure the
      hover effect in the respective menu block edit screen or module
      configuration page, then modify the look and feel (color, background,
      borders, shadow, etc) in your theme's CSS, overriding the defaults
      provided by those modules. Please refer to the documentation
      of these respective modules for additional configuration guidance.
    * Otherwise, configure the hover effect, position, and the look and feel
      in your theme's CSS, overriding the defaults provided by the module.
      Layout examples (left, right, centered) may be found in the
      menu_minipanels.css file packaged with this module.


Updating Menu MiniPanels
------------------------
WARNING: Version 2 of Menu MiniPanels marks a brave departure from Version 1,
 and updating should not be considered lightly.

Updating from Version 1 to Version 2 requires a *manual process* of migrating
configurations from Menu Minipanels UI into a combination of helper modules
and custom CSS code.  Once you update the module, you will lose any custom
hover effects, menu positioning, and qTip styles. It is recommended to make
a copy of your site, in order to refer back to the original configurations
and visual styles as you reconfigure the helper modules and write the
changes into CSS.

 1. Update the module and remove qTip from your libraries folder.
 2. Optionally, install and configure other menu helper modules such as
    Nice Menus, Superfish or DHTML Menu, to replace the desired hover
    effect previously configured by Menu MiniPanels.
 3. Convert any remaining configurations into CSS that were previously
    defined in custom qTip javascript config files, or in the admin UI
    from Version 1 of this module. See code examples in menu_minipanels.css
    for placement and layout.
 4. Specific migration questions can be filed as support requests in the
    issue queue on drupal.org


Known Issues
------------
Due to a bug/feature in Drupal 7, no menus will be displayed on error pages,
e.g. 404 / File Not Found pages. The best way to resolve this is to use the
Navigation404 module, which will make all menus and minipanels be displayed
again.

When also using the Menu Attributes module, use at least v7.x-1.0-rc2 of that
module as earlier versions had a bug that conflicted with Menu MiniPanels.


Author
------
Maintainer: Willie Seabrook (http://drupal.org/user/373883)
Co-maintainer: Damien McKenna (http://drupal.org/user/108450)
Co-maintainer: James Wilson (https://drupal.org/user/220177)

Thanks to uk (http://drupal.org/user/1100194) for greatly contributing on the
Drupal 7 port.
