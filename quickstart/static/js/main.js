document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas');

    // Function to handle image upload
    document.getElementById('upload').addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    canvas.add(img);
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to handle image rotation
    document.getElementById('rotate').addEventListener('click', function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.rotate(45);
            canvas.renderAll();
        }
    });

    // Function to handle image resizing
    document.getElementById('resize').addEventListener('click', function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.scale(1.5).setCoords();
            canvas.renderAll();
        }
    });

    // Function to handle image download
    document.getElementById('download').addEventListener('click', function () {
        var dataURL = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = 'manipulated_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
