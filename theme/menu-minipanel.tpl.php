<?php
/**
 * @file
 *   Default theme implementation for Menu MiniPanel containers.
 *
 * Various menu helper modules in the contrib space expect sub-menus to be
 * wrapped inside an unordered list, so we do this by default. You may over-
 * ride this funtionality in your theme.
 *
 * Variables:
 * - minipanel: the rendered minipanel.
 * - minipanel_name:  the machine name of the minipanel.
 * - mlid: the menu item id associated with the the minipanel.
 */
?>
<ul class="<?php echo $classes ?>">
  <li class="first odd last">
    <?php echo $minipanel; ?>
  </li>
</ul>
