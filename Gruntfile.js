module.exports = function(grunt)
{
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'fzui.css': [
                        'styles/colors.scss',
                    ]
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
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.registerTask('default', ['sass', 'mustache_render']);
}
