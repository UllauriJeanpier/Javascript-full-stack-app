
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');       // para que lea un archivo html donde ejecutar el bundel.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');        // Este plugin extrae CSS en archivos separados. Crea un archivo CSS por archivo JS que contiene CSS


const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
    entry: './frontend/app.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },

    module: { 
        rules: [
            {
                test: /\.css/,
                use: [
                    {loader: devMode ? 'style-loader': MiniCssExtractPlugin.loader},
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin ({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,   // quita todos los espacios en blanco que haiga en el html
                removeComments: true,  // quita los comentarios 
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,  // remueve los tipos de los atributos 
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin ({
            filename: 'css/bundle.css' 
        })
    ],
    devtool: 'source-map'       // ayuda a la hora 

}