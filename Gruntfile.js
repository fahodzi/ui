var js_sources = ['js/fzui.js', 'js/dropdown.js', 'js/modal.js', 'js/nav.js', 'js/main.js'];

module.exports = function(grunt)
{
    grunt.initConfig({
        concat: {
            options: {
                banner: '(function($){',
                footer: "}(typeof jQuery === 'undefined' ? null : jQuery));"
            },
            dist: {
                src: js_sources,
                dest: 'dist/fzui.js',
            },
        },
        cssmin: {
            target: {
                files:{
                    'dist/fzui.min.css': 'dist/fzui.css'
                } 
            }
        },
        uglify: {
            dist: {
                src: 'dizt/fzui.js',
                dest: 'dist/fzui.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/fzui.css' : 'sass/fzui.scss',
                }
            }
        },
        mustache_render: {
            options: {
                directory: 'examples'
            },
            default: {
                files : [
                    {
                        data: "examples/index.json",
                        template: "examples/index.mustache",
                        dest: "dist/index.html"
                    }
                ]
            },
            build: {
                files : [
                    {
                        data: "examples/index_min.json",
                        template: "examples/index.mustache",
                        dest: "dist/index.min.html"
                    }
                ]
            }
        },
        clean : ['dist', 'build']
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['sass', 'concat', 'mustache_render']);
    grunt.registerTask('build', ['sass', 'concat', 'cssmin', 'uglify', 'mustache_render'])
}
