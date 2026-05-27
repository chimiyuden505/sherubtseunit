$(document).ready(function () {

  $("#upcomingBtn").click(function () {

    $("#upcomingBtn").addClass("active");
    $("#pastBtn").removeClass("active");

    $(".event-card").each(function () {
      if ($(this).data("status") === "upcoming") {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

  });

  $("#pastBtn").click(function () {

    $("#pastBtn").addClass("active");
    $("#upcomingBtn").removeClass("active");

    $(".event-card").each(function () {
      if ($(this).data("status") === "past") {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

  });

});