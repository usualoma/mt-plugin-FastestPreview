(function() {
    "use strict";

    var _ = require("underscore"),
        markdown = require("markdown").markdown,
        textile = require("textile-js");

    if (window.FastestPreviewLoaded) {
        return;
    }
    window.FastestPreviewLoaded = true;

    if (
        typeof window.addEventListener === "undefined" ||
        typeof window.opener.postMessage === "undefined"
    ) {
        var messages = [
            "Your environment does not support the FastestPreview's feature."
        ];

        if (navigator.userAgent.match(/msie/i)) {
            messages.push("Please confirm compatibility settings when this result is not what you expected.");
        }

        alert(messages.join("\n"));

        return;
    }

    window.addEventListener("message", function(event) {
        if (! event.data.values || ! event.data.values.length) {
            return;
        }

        var origin = event.origin,
            values = event.data.values,
            elms   = document.querySelectorAll(".fastest-preview-wrapper"),
            cb     = _.find(values, function(v) { return v.name === "convert_breaks"; }),
            i, j, d, e, v;

        for (j = 0; j < values.length; j++) {
            d = values[j];

            for (i = 0; i < elms.length; i++) {
                e = elms[i];

                if (e.getAttribute("data-origin") !== origin) {
                    continue;
                }

                if (e.getAttribute("data-field") === d.name) {
                    v = d.value;

                    if (d.name === "text" || d.name === "text_more") {
                        if (cb.value.match(/markdown/)) {
                            v = markdown.toHTML(v);
                        }
                        else if (cb.value.match(/textile/)) {
                            v = textile(v);
                        }
                    }

                    e.innerHTML = v;
                }
            }
        }
    });

    window.opener.postMessage({action: "registerWindow"}, "*");
})();
