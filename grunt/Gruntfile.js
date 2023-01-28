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
        // para o grunt ficar observando alguma alteração nos arquivos e carregar automaticamente
        watch: {
            less: { // nome da tarefa
                files: ['src/styles/**/*.less'], // arquivos que deverão ser acompanhados
                tasks: ['less:development'] // tarefa que será executada quando houver alguma alteração nos arquivos
            },
            html: { // para observar o HTML também e executar o replace quando houver alguma alteração nele
                files: ['src/index.html'],
                tasks: ['replace:dev']
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
            // substituição do arquio HTML minificado
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
        // minificação do arquivo HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true, // remove comentários do arquivo
                    collapseWhitespace: true // remove espaços em branco
                },
                files: { // é necessário fazer a minificação + substituição
                    // destino na pasta temporária: origem
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        // exclui a pasta temporária criada para minificar o HTML
        clean: ['prebuild'],
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
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // função default fica observando alterações
    grunt.registerTask("default", ['watch']);
    // build: termo utilizado para publicar a aplicação em ambiente de produção
    // funções que devem ser executadas quando houver alterações
    grunt.registerTask("build", ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}


/*
    sass: {
            dist:{
                options:{ // para que o arquivo seja minificado
                    style: "compressed",
                },
                files:{
                    "main2.css": "main.scss"
                }
            }
        },
        concurrent:{
            target:  ['olaGrunt','less','sass', 'tarefaDemorada']
        }
        
        
            grunt.registerTask("olaGrunt", function(){
        const done = this.async();
        setTimeout(function(){
            console.log("Olá Grunt.");
            done;
        },3000);
    })

    // nome da função + a função
    grunt.registerTask("tarefaDemorada", function(){
        const done = this.async(); // para tornar a tarefa assíncrona
        setTimeout(function(){
            console.log("Olá Grunt.");
            done;
        },4000);
    })


    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-concurrent"); // para uma tarefa mais demorada não atrapalhar a execução das demais

*/