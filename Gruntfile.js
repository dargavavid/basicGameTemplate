module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["ts/*.ts"],
                out: "js/main.js",
                watch: "./ts"
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
};