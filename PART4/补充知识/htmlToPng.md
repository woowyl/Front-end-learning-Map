# html to png

## 市面上已有的解决方案

- 收费
   [htmlcsstoimage](https://htmlcsstoimage.com/);

## 总的步骤

- html to canvas
  - [html2canvas](http://html2canvas.hertzen.com/)

- canvas to png
  - [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)

- png to server
  - [Common-interface-for-upload](http://wiki.office.51fanli.com/wiki/Common-interface-for-upload#form.E8.A1.A8.E5.8D.95)

## 1. html to canvas

    [github-html2canvas](https://github.com/niklasvh/html2canvas)

## 2. canvas to png

## 3. png to server

- 创建一个form表单、

- 将png base64格式转化为 file格式

```js
  // base64 to blob
        function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;
        
                var byteCharacters = atob(b64Data);
                var byteArrays = [];
        
                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
        
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
        
                    var byteArray = new Uint8Array(byteNumbers);
        
                    byteArrays.push(byteArray);
                }
        
            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

```

```js
// dataURL to file
        function dataURLtoFile(dataurl, filename) {
    
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], filename, {type:mime});
        }

```

```js
 
            const dT = new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
            dT.items.add(fileImage);
            document.querySelector('.image-url').files = dT.files;
```

- 将file通过js 赋值到input文件框中
  
  - DataTransfer()
  - File()
  - files

- 模拟form提交

  - 创建一个FormData对象 然后append (经测试此法无效)

``` javascript

   submitData = new FormData();
   submitData.append('mediafile[]', fileImage,document.querySelector('.image-url').files[0]);
   submitData.append('owner', '9k9');

```

- 通过fileList将文件放入fileList中 (仅仅支持chrome)

```js
            const dT =new DataTransfer(); 
            dT.items.add(fileImage);
            document.querySelector('.image-url').files = dT.files;
            var form = document.getElementById("fileForm");
            submitData = new FormData(form);
```

[FormData对象的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
