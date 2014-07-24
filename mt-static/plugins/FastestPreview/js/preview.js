(function() {
    "use strict";

    if (window.FastestPreviewLoaded) {
        return;
    }
    window.FastestPreviewLoaded = true;

    if (
        typeof window.addEventListener === 'undefined'
        || typeof window.opener.postMessage === 'undefined'
    ) {
        var messages = [
            'Your environment does not support the FastestPreview\'s feature.'
        ];

        if (navigator.userAgent.match(/msie/i)) {
            messages.push('Please confirm compatibility settings when this result is not what you expected.');
        }

        alert(messages.join('\n'));

        return;
    }

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
