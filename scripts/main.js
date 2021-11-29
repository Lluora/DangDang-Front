$(document).ready(function () {
            getContents();
        });
function getContents(){
    $.ajax({
        type: "GET",
        url: `/content/${idx}`,
        success: function (response) {
            $("#title").html(response['title']);
            $("#content").html(response['content']);
            $("#comment-list").empty();
            for (let i = 0; i < response['comments'].length; i++) {
                makeListComment(response['comments'][i])
            }
        }
    })
}