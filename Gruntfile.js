module.exports = function(grunt)
{
    grunt.initConfig({
        concat: {
                options: {
                separator: ';',
            },
            dist: {
                src: ['js/dropdown.js'],
                dest: 'dist/fzui.js',
            },
        },
        sass: {
            dist: {
                files: {
                    'dist/fzui.css' : 'sass/fzui.scss',
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
        clean : ['fzui.css']
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['sass', 'concat', 'mustache_render']);
}
