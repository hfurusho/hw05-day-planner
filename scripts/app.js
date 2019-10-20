let today = moment().format("dddd, MMMM Do");
let tasks = getTasks();
$("#currentDay").text(today);
populateTimeBlocks();
$(".save-btn").on("click", saveTask);

// TODO: Refactor this function
function populateTimeBlocks() {
  let hourNow = 13; // CHANGE WITH THE BELOW
  // parseInt(moment().hour());

  for (let i = 9; i < 18; i++) {
    let hour = moment().hour(i);
    let hourNum = parseInt(hour.format("H"));
    let row = $("<div class='row'>");

    let timeDiv = $("<div class='col-1 px-1 py-1 text-right time-block'>");
    let timeSpan = $("<span class='hour'>");
    timeSpan.text(hour.format("h A"));
    timeDiv.append(timeSpan);

    let textDiv = $("<div class='col-10 px-0'>");
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
    textArea.val(tasks[i - 9]);
    textDiv.append(textArea);

    let saveDiv = $("<div class='col-1 px-0 py-0'>");
    let saveBtn = $(
      "<button type='button' class='save-btn w-100 h-100'><i class='far fa-save'></i></button>"
    );
    saveBtn.attr("data-textarea", i);
    saveDiv.append(saveBtn);

    row.append(timeDiv, textDiv, saveDiv);
    $(".schedule").append(row);
  }
}

function getTasks() {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = new Array(8);
  }
  return tasks;
}

function saveTask() {
  let textAreaTimeBlock = parseInt($(this).attr("data-textarea"));
  let textAreaVal = $("#text-area-" + textAreaTimeBlock).val();
  tasks[textAreaTimeBlock - 9] = textAreaVal;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
