$("document").ready(function() {
  let today = moment().format("dddd, MMMM Do");
  let tasks = getTasks();
  $("#currentDay").text(today);
  populateTimeBlocks();
  $(".save-btn").on("click", saveTask);

  // Populates the scheduler with hour time blocks from 9AM to 5PM
  function populateTimeBlocks() {
    let hourNow = parseInt(moment().hour());

    for (let i = 9; i < 18; i++) {
      let hour = moment().hour(i);
      let hourNum = parseInt(hour.format("H"));

      let row = $("<div class='row'>");
      let timeDiv = createTimeDiv(hour);
      let textDiv = createTextAreaDiv(i, hourNow, hourNum);
      let saveDiv = createSaveBtn(i);

      row.append(timeDiv, textDiv, saveDiv);
      $(".schedule").append(row);
    }
  }

  // Creates and returns the time div based on the hour of the day.
  function createTimeDiv(hour) {
    let timeDiv = $("<div class='col-1 px-1 py-1 text-right time-block'>");
    let timeSpan = $("<span class='hour'>");
    timeSpan.text(hour.format("h A"));
    timeDiv.append(timeSpan);
    return timeDiv;
  }

  // Creates and returns the text area to write in your task for that hour.
  function createTextAreaDiv(textAreaIdNum, hourNow, hourNum) {
    let textDiv = $("<div class='col-10 px-0'>");
    let textArea = $("<textarea class='w-100 h-100'>");
    textArea.attr("id", "textarea-" + textAreaIdNum);

    if (hourNow == hourNum) {
      textArea.addClass("present");
    } else if (hourNow > hourNum) {
      textArea.addClass("past");
    } else {
      textArea.addClass("future");
    }
    textArea.val(tasks[textAreaIdNum - 9]);
    textDiv.append(textArea);
    return textDiv;
  }

  // Creates and returns the button that saves the task for the hour block to localStorage..
  function createSaveBtn(textAreaIdNum) {
    let saveDiv = $("<div class='col-1 px-0 py-0'>");
    let saveBtn = $(
      "<button type='button' class='save-btn w-100 h-100'><i class='far fa-save'></i></button>"
    );
    saveBtn.attr("data-textarea", textAreaIdNum);
    saveDiv.append(saveBtn);
    return saveDiv;
  }

  // Returns the saved tasks for each hour block. Returns an empty array if no tasks have been saved.
  function getTasks() {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
      tasks = new Array(8);
    }
    return tasks;
  }

  // Save button functionality: saves the task for the corresponding hour block to localStorage.
  function saveTask() {
    let textAreaTimeBlock = parseInt($(this).attr("data-textarea"));
    let textAreaVal = $("#textarea-" + textAreaTimeBlock).val();
    tasks[textAreaTimeBlock - 9] = textAreaVal;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
