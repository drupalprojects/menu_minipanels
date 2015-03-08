; Drush Make integration.
; This will automatically download the necessary library and place it in the
; sites/all/libraries directory.

api = 2
core = 6.x

; Download the qTip v1 library.
libraries[qtip][download][type] = "get"
libraries[qtip][download][url] = "https://raw.github.com/Craga89/qTip1/master/1.0.0-rc3/jquery.qtip-1.0.0-rc3.min.js"
libraries[qtip][directory_name] = "qtip"
libraries[qtip][destination] = "libraries"
