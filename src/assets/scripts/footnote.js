import $ from "jquery";

$("document").ready(function () {
  $(".post-container a.footnote-ref").each(function () {
    const href = $(this).attr("href").slice(1);
    const text = $("#" + href)
      .text()
      .replace("↩", "");

    $(this).attr("data-tooltip", text);
  });
});
