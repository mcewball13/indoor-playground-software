function postPageHandler (e) {
    e.preventDefault();
    const postId = $(this).attr("id").split("-")[1];
    document.location.replace(`/post/${postId}`)
}

$(".card").on("click", postPageHandler);
