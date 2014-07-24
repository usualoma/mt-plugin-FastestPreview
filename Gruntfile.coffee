module.exports = (grunt) ->
  grunt.initConfig
    browserify:
      preview:
        files:
          "mt-static/plugins/FastestPreview/js-bundle/preview.js": [
            "src/preview.js"
          ]
        options:
          transform: ["uglifyify"]
    jshint:
      options:
        jshintrc: ".jshintrc"
      preview:
        src: ["src/*.js"]
      mt:
        src: ["mt-static/plugins/FastestPreview/js/*.js"]
    esteWatch:
      options:
        dirs: [".", "src"]
        livereload:
          extensions: ["js"]
      js: (filepath) ->
        tasks = []

        grunt.config ["jshint", "app", "src"], [filepath]
        tasks.push "jshint:app"

        if filepath.match /^src/
          tasks.push "browserify"

        tasks

  require("matchdep").filterDev("grunt-*").forEach (name) ->
    grunt.loadNpmTasks name if ! /template/.test name

  grunt.registerTask 'default', ['esteWatch']
