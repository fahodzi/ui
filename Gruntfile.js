var js_sources = ['js/fzui.js', 'js/dropdown.js', 'js/modal.js', 'js/nav.js'];

module.exports = function(grunt)
{
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: js_sources,
                dest: 'build/fzui.js',
            },
        },
        cssmin: {
            target: {
                files:{
                    'dist/fzui.css.min': 'dist/fzui.css'
                } 
            }
        },
        uglify: {
            dist: {
                src: js_sources,
                dest: 'dist/fzui.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'build/fzui.css' : 'sass/fzui.scss',
                }
            }
        },
        mustache_render: {
            dist: {
                files : [
                    {
                        data: "index.json",
                        template: "index.mustache",
                        dest: "index.html"
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
    grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'mustache_render'])
}
