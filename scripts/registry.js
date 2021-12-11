
$(document).ready(function () {
    bsCustomFileInput.init()  // 파일 업로드 코드
    if ( $("#image_container").val() == "")
    {  $("#DeletePhoto").hide() }
})


let num=0;
function counter() {
    num+=1
    if (num>0) {
        $("#writer").hide();
    }
}

function clickclick() {
    $("#writer").show();
}



function checkUpload() {
    if ( ($("#product_image")[0].files[0] == undefined) || ($("#writerArticle").val().length == 0) ) {
        alert("사진 혹은 글 작성은 필수입니다 😭")
    } else {
        // 주소 입력 확인
        if ( ($("#product_image")[0].files[0] != undefined) && ($("#writerArticle").val().length != 0) && ($("#addressSearch").val().length ==0) ) {
            let addressConfirm = confirm("주소 입력 정말 안하실 건가요??🥺");
            if (addressConfirm) {
                saveArticle()
            }
        }
        if ( ($("#writerArticle").val().length != 0) && ($("#addressSearch").val().length !=0) && ($("#product_image")[0].files[0] == undefined) ) {
            alert("사진 업로드가 필요해요! 😆")
        }
        if ( ($("#addressSearch").val().length !=0) && ($("#product_image")[0].files[0] != undefined) && $("#writerArticle").val().length == 0) {
            alert("글 작성이 필요해요! 🐕")
        }
        if (($("#writerArticle").val().length != 0) && ($("#addressSearch").val().length !=0) && ($("#product_image")[0].files[0] != undefined)) { saveArticle() }
    }
}


function saveArticle() {
    let form_data = new FormData()
    if ($("#addressSearch").val().length == 0 ) {
        form_data.append("address", "댕댕이와 함께")
    } else {form_data.append("address", $("#addressSearch").val())}

    form_data.append("content", $("#writerArticle").val())
    form_data.append("puppy", $("#checkBox option:selected").val())
    form_data.append("image", $("#product_image")[0].files[0])
    form_data.append("nickname", $("#NickName").text())

    $.ajax({
        type: "POST",
        url: `http://localhost:8080/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            // sessionStorage.setItem("image_idx", response['idx']);
            location.href = "/"; // 페이지 변환
        }
    });
}



<!-- 이미지 미리보기 -->
function setThumbnail(event) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = document.createElement("img");
        img.setAttribute("id", "imageUpload");
        img.setAttribute("src", event.target.result);
        img.setAttribute("width", 300);
        img.setAttribute("height", 300)
        img.setAttribute("class", "col-lg-10");
        document.querySelector("div#image_container").appendChild(img);
    };
    reader.readAsDataURL(event.target.files[0]);


    // 이미지 파일이 업로드 되면 삭제 버튼 등장
    if ( $("#image_container").length > 0)
    { $("#DeletePhoto").show() }


}



function deleteImage() { // 휴지통을 클릭하면 생성된 이미지 삭제
    let img = document.createElement("img");
    //$("#imageUpload").val("")
    $("#image_container").empty()
    $("#product_image").val("");
    $("#DeletePhoto").hide();
}



