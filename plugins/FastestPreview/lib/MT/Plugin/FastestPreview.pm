package MT::Plugin::FastestPreview;

use strict;
use warnings;
use utf8;

use MT::Util;

sub plugin {
    MT->component('FastestPreview');
}

sub _wrap {
    my ( $ctx, $field, $content ) = @_;

    my $origin = $ctx->invoke_handler('AdminCGIPath');
    $origin =~ s{(?<=\w)/.*}{};

    qq{<script type="text/javascript" src="}
        . $ctx->invoke_handler('StaticWebPath')
        . qq{plugins/FastestPreview/js/preview.js"></script><span class="fastest-preview-wrapper" data-field="$field" data-origin="$origin">$content</span>};
}

sub init_app {
    my ($app) = @_;

    eval { require CustomFields::Template::ContextHandlers }
        or return 1;

    no warnings 'redefine';

    my $get_value
        = \&CustomFields::Template::ContextHandlers::_hdlr_customfield_value;

    *CustomFields::Template::ContextHandlers::_hdlr_customfield_value = sub {
        my ( $ctx, $args ) = @_;

        my $content = $get_value->(@_);

        return $content
            unless ( caller(1) )[3] eq
            'CustomFields::Template::ContextHandlers::_hdlr_customfield_value_by_tag';

        return $content
            unless ( !@{ $args->{'@'} } && $ctx->var('preview_template') );

        my $field = 'customfield_' . $ctx->{__stash}{field}->basename;
        _wrap( $ctx, $field, $content );
    };
}

sub param_edit_entry {
    my ( $cb, $app, $param, $tmpl ) = @_;
    my $blog = $app->blog;

    return 1 if !$blog;

    my $header = $tmpl->getElementById('header_include');
    foreach my $t ( @{ plugin()->load_tmpl('edit_entry.tmpl')->tokens } ) {
        $tmpl->insertBefore( $t, $header );
    }
}

our %field_map = (
    entrybody => 'text',
    entrymore => 'text_more',
    pagebody  => 'text',
    pagemore  => 'text_more',
);

sub wrap_tag {
    my ( $ctx, $args ) = @_;
    my $content = $ctx->super_handler;

    return $content
        unless ( !@{ $args->{'@'} } && $ctx->var('preview_template') );

    my $tag = lc $ctx->stash('tag');
    my $field
        = $field_map{$tag} || do { ( my $s = $tag ) =~ s/^entry//; $s; };
    _wrap( $ctx, $field, $content );
}

1;
