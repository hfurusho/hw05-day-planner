let today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

populateTimeBlocks();

// TODO: Refactor this function
function populateTimeBlocks() {
  let hourNow = parseInt(moment().hour());

  for (let i = 9; i < 18; i++) {
    let hour = moment().hour(i);
    let hourNum = parseInt(hour.format("H"));
    let row = $("<div class='row'>");

    let timeColDiv = $("<div class='col-2 w-100 h-100 mx-0 my-0 px-0 py-0'>");
    let timeDiv = $("<div class='w-100 h-100 text-right'>");
    let timeSpan = $("<span class='hour'>");
    timeSpan.text(hour.format("h A"));
    timeDiv.append(timeSpan);
    timeColDiv.append(timeDiv);

    let textDiv = $("<div class='col-9 w-100 h-100 mx-0 my-0 px-0 py-0'>");
    let textArea = $("<textarea class='w-100 h-100'>");
    let textAreaId = "text-area-" + i;
    textArea.attr("id", textAreaId);
    if (hourNow == hourNum) {
      textArea.addClass("present");
    } else if (hourNow > hourNum) {
      textArea.addClass("past");
    } else {
      textArea.addClass("future");
    }
    textDiv.append(textArea);

    let saveDiv = $("<div class='col-1 w-100 h-100 mx-0 my-0 px-0 py-0'>");
    let saveBtn = $(
      "<button type='button' class='save-btn w-100 h-100 px-0 py-0'>"
    );
    saveBtn.attr("data-textarea", i);
    saveDiv.append(saveBtn);

    row.append(timeColDiv, textDiv, saveDiv);
    $(".container").append(row);
  }
}

let tasks = getTasks();

function getTasks() {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = new Array(8);
  }
  return tasks;
}

$(".save-btn").on("click", saveTask);

function saveTask() {
  let textAreaTimeBlock = parseInt($(this).attr("data-textarea"));
  let textAreaVal = $("#text-area-" + textAreaTimeBlock).val();
  tasks[textAreaTimeBlock - 9] = textAreaVal;
}
