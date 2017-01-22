function uploadImage(inputFile, url, completeFun) {
    var $inputFile = $(inputFile);
    var filePath = $inputFile.val();

    if(filePath=='') {
        return;
    }

    // 检查图片
    var filePathSplit = filePath.split('.');
    var suffix = filePathSplit[filePathSplit.length-1];
    var suffixs = ['png', 'jpg', 'gif'];
    if(suffixs.indexOf(suffix)<0) {
        alert("请选择图片文件！");
        $inputFile.val('');
        return;
    }

    var $inputFileClone = $inputFile.clone();
    $inputFile.after($inputFileClone);

    var $uploadForm = $('<form action="'+url+'" method="post" enctype="multipart/form-data"></form>');
    $uploadForm.append($inputFile);
    $uploadForm.ajaxForm(function(data) {
        $inputFileClone.after($inputFile);
        $inputFileClone.remove();
        if(completeFun) {
            completeFun(data);
        }
    });
    $uploadForm.submit();
}
