(function() {
    "use strict";

    if (window.FastestPreviewLoaded) {
        return;
    }
    window.FastestPreviewLoaded = true;

    window.addEventListener('message', function(event) {
        if (! event.data.values.length) {
            return;
        }

        var origin = event.origin,
            values = event.data.values,
            elms = document.querySelectorAll('.fastest-preview-wrapper'),
            i, j, d, e, m, assetElms;

        for (j = 0; j < values.length; j++) {
            d = values[j];

            for (i = 0; i < elms.length; i++) {
                e = elms[i];

                if (e.getAttribute('data-origin') !== origin) {
                    continue;
                }

                if (e.getAttribute('data-field') === d.name) {
                    e.innerHTML = d.value;
                }
            }
        }
    });

    window.opener.postMessage({action: 'registerWindow'}, '*');
})();
