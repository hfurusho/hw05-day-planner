let today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

populateTimeBlocks();

function populateTimeBlocks() {
  let hourNow = parseInt(
    moment()
      .hour(13)
      .format("H")
  );

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
    if (hourNow == hourNum) {
      textArea.addClass("present");
    } else if (hourNow > hourNum) {
      textArea.addClass("past");
    } else {
      textArea.addClass("future");
    }
    textDiv.append(textArea);

    let saveBtn = $(
      "<div class='col-1 w-100 h-100 mx-0 my-0 px-0 py-0'><button class='save-btn w-100 h-100 px-0 py-0'></button></div>"
    );

    row.append(timeColDiv, textDiv, saveBtn);
    $(".container").append(row);
  }
}
