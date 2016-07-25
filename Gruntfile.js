module.exports = function(grunt)
{
    grunt.initConfig({
        concat:{
            dist: {
                src : [
                    'styles/colors.scss',
                    'styles/buttons.scss',
                ],
                dest : 'build.scss'
            }
        },
        sass: {
            dist: {
                files: {
                    'fzui.css' : 'build.scss',
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
        clean : ['build.scss']
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'sass', 'mustache_render']);
}
