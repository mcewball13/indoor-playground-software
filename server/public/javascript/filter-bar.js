const img_id = [];
let tags = [];
let type_id;
async function filterBarHandler(event) {
    event.preventDefault();
    let difficulty = $("#exerciseDifficultyFilter option:selected").val();
    let type = $("#exerciseTypeFilter option:selected").val();

    if (difficulty === "Filter by difficulty") {
        difficulty = "";
    }
    if (type === "Filter by Exercise Type") {
        type = "";
    }

    document.location.replace(`/filtered-exercises?tags=[${tags}]&difficulty=${difficulty}&type=${type}`);
    console.log(difficulty, type);
}

$("input:checkbox").click(function () {
    if ($(this).prop("checked")) {
        tags.push($(this).attr("id"));
    } else if ($(this).prop("checked", false)) {
        tags = tags.filter((tag) => {
            return $(this).attr("id") != tag;
        });
    }
});

$("#filterBtn").on("click", filterBarHandler);
