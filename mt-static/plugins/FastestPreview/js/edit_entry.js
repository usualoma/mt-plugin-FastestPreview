jQuery(function($) {
    "use strict";

    var childWindows = [],
        tinyMCEConfig = MT.Editor.TinyMCE.config,
        initInstanceCallback = tinyMCEConfig.init_instance_callback;

    function postMessage(values) {
        $.each(childWindows, function(i, child) {
            try {
                child.postMessage({
                    values: values
                }, '*');
            }
            catch (e) {
                childWindows[i] = null;
            }
        });
        childWindows = $.grep(childWindows, function(w){ return !!w });
    }

    function updateAll() {
        postMessage($('#entry_form').serializeArray());
    }

    function update(name, value) {
        postMessage([{name: name, value: value}]);
    }

    $('#entry_form :input').on('input', function() {
        update(this.name, $(this).val());
    });

    tinyMCEConfig.init_instance_callback = function(ed) {
        initInstanceCallback.apply(this, arguments);

        $([
            'onSetContent', 'onKeyUp', 'onReset', 'onPaste',
            'onUndo', 'onRedo'
        ]).each(function() {
            var ev = this;
            ed[ev].add(function() {
                update($('#' + ed.id).prop('name'), ed.getContent());
            });
        });
    };

    $(window).bind('pre_autosave dialogDisposed', function() {
        // Text / More
        try {
            app.saveHTML();
            app.editor.currentEditor.save();
        }
        catch (e) {
            // Ignore errors
        }

        updateAll();
    });

    window.addEventListener('message', function(event) {
        if (
            event.data.action === 'registerWindow'
            && (
                event.origin === FastestPreviewBlogOrigin
                || event.origin === FastestPreviewAdminOrigin
            )
        ) {
            childWindows.push(event.source);
        }
        childWindows = $.unique(childWindows);
    });
});
