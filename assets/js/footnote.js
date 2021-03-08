$("document").ready(function () {
  $(".post-container a.footnote").each(function () {
    const href = $(this).attr("href").slice(1);
    const text = $("#" + href.replace(":", "\\:") + " p")
      .text()
      .replace("↩", "");

    $(this).attr("data-tooltip", text);
  });
});
