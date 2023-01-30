module.exports = function (grunt) {
    // configuração
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // compilação do LESS
        less: {
            // desenvolvimento
            development: {
                files: { //arquivo destino: arquivo origem
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            // código para ambiente de produção
            production: {
                options: {
                    compress: true,
                },
                files: {
                    // arquivo destino: arquivo origem, minificado em produção - dist = distribuição
                    "dist/styles/main.min.css": "src/styles/main.less"
                }
            }
        },
        replace: {
            // desenvolvimento
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', // palavra que deve buscar
                            replacement: './styles/main.css' // substituição
                        },
                        {
                            match: 'ENDERECO_DO_JS', // palavra que deve buscar
                            replacement: '../src/scripts/main.js' // substituição
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'], // arquivo que deseja fazer a substituição
                        dest: 'dev/' // pasta para onde o arquivo substituído deverá ser enviado
                    }
                ]
            },
             // substituição para o HTML enxergar o arquivo minificado
             dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css' // arquivo minificado
                        },
                        // para que no ambiente de distribuição ele enxergue o arquivo minificado
                        {
                            match: 'ENDERECO_DO_JS', // palavra que deve buscar
                            replacement: './scripts/main.min.js' // substituição
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuid/index.html'], // pasta temporária
                        dest: 'dist/'
                    }
                ]
            }
        },
        // minificação do arq JS
        uglify: {
            target: {
                files: {
                    // arquivo destino: arquivo origem
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    });

    // carregamento do pacote do plugin
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // função default fica observando alterações
    grunt.registerTask("default", ['watch']);
    // build: termo utilizado para publicar a aplicação em ambiente de produção
    // funções que devem ser executadas quando houver alterações
    grunt.registerTask("build", ['less:production', 'replace:dist', 'uglify']);
}
