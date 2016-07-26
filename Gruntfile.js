module.exports = function(grunt)
{
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'fzui.css' : 'fzui.scss',
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
    grunt.registerTask('default', ['sass', 'mustache_render']);
}
