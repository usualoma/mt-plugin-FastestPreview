# FastestPreview

This is a plugin for the Movable Type.
This plugin enables the MT to synchronize preview with editing screen.


## Demo Movie

http://screencast.com/t/wc1mChT4r

### Japanese Version

http://screencast.com/t/uBUjtBtS


## Installation

1. Download an archive file from [releases](https://github.com/usualoma/mt-plugin-FastestPreview/releases).
1. Unpack an archive file.
1. Upload unpacked files to the MT `plugins` and `mt-static/plugins` directory.

Should look like this when installed:

    $MT_HOME/
        plugins/
            FastestPreview/
        mt-static/
            plugins/
                FastestPreview/

1. Setup mt-config.cgi
    1. Confirm "CGIPath" (or "AdminCGIPath") and "StaticWebPath" is specified by the absolute URL.
    1. Assign "1" to "PreviewInNewWindow".

## Supported Tags

This plugin supports these tags without any modifier.

* mt:EntryTitle
* mt:EntryBody
    * The "markdown" and the "textile" are partly supported.
* mt:EntryMore
* mt:EntryExcerpt
    * without auto-generation
* mt:EntryKeywords
* mt:PageTitle
* mt:PageBody
* mt:PageMore
* mt:PageExcerpt
* mt:PageKeywords
* Tags added by customfields.
    * Single-Line Text
    * Multi-Line Text


## Supported Publishing Types
* Static publishing
* Dynamic publishing


## Requirements
* MT6


## External Libraries

Thanks!
Includes these external libraries in order to convert format.

* https://github.com/evilstreak/markdown-js
* https://github.com/borgar/textile-js


## LICENSE

Copyright (c) 2014 Taku AMANO

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
