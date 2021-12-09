const img_id = [];

function getImageId() {
    img_id.push($(this).attr('id'));
    $('#imageSelect').removeClass('d-inherit').addClass('d-none');
}

$(".img").on('click', getImageId)