# htmlwebpackplugin

## option: 

- title
- filename //打包后的名字，可以定义路径
- template  
- templateParameters
- inject    //
- favicon
- meta
- minify
- hash
- cache
- showErrors
- chunks
- chunksSortMode
- excludeChunks
- xhtml


### templateParameters

定义：
```javascript
    new HtmlWebpackPlugin({
                title: ele.pageTitle,
                templateParameters: {
                    title: ele.pageTitle,
                    remwidth: ele.remwidth,
                    remswitch: ele.remswitch
                },
                chunks: ...,
                template: ...,
                inject: true
            })
```

使用：
```html
    <script id="J_script_attrsniffer" data-remwidth='<%= remwidth %>' data-remswitch= '<%= remswitch %>'></script>
```