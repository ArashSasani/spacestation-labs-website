function tempResizeSliderContainer() {
  var slide = $("ul.slides").children("li:first-child");
  if (slide != null && slide.length != 0) {
    $("ul.slides").css("height", $(slide).height());
  }
}

function retIndex(elem, dir) {
  var index = $(elem).attr("index");
  if (index != null && index != "") {
    var currentIndex = parseInt(index);
    if (dir == "left") {
      $(elem).fadeIn(500);
      $(elem)
        .children(".mainpage-project-img")
        .removeClass("slide-right")
        .addClass("slide-left");
    } else if (dir == "right") {
      $(elem).fadeIn(500);
      $(elem)
        .children(".mainpage-project-img")
        .removeClass("slide-left")
        .addClass("slide-right");
    }
    $(".mainpage-project-links[index='" + currentIndex + "']").fadeIn(500);
    return currentIndex;
  }
  console.log("no index");
}

$(document).ready(function () {
  //video
  var vid = $("#video_bg").get(0);
  //load on error
  vid.addEventListener("error", function () {
    vid.load();
  });
  //resize
  vid.addEventListener(
    "loadeddata",
    function () {
      $("#video_bg").maximage("maxcover");
    },
    false
  );

  //projects
  //prevents projects section to collapse just temprory
  tempResizeSliderContainer();
  //slider
  var currentIndex;
  $(".mainpage-project-arrow").click(function () {
    var imgs = $(".mainpage-project");
    var contents = $(".mainpage-project-links");
    $(imgs).fadeOut(200);
    $(contents).fadeOut(200);
    //slider items count
    var imgsCount = $(imgs).length;

    if (currentIndex == null) {
      currentIndex = 1;
    }
    var controllerId = $(this).attr("id");
    if (controllerId == "project-arrow-left") {
      $(imgs).each(function () {
        if (currentIndex != 1) {
          if ($(this).attr("index") == currentIndex - 1) {
            currentIndex = retIndex($(this), "left");
            return false;
          }
        } else {
          if ($(this).attr("index") == imgsCount) {
            currentIndex = retIndex($(this), "left");
            return false;
          }
        }
      });
    } else if (controllerId == "project-arrow-right") {
      $(imgs).each(function () {
        if (currentIndex != imgsCount) {
          if ($(this).attr("index") == currentIndex + 1) {
            currentIndex = retIndex($(this), "right");
            return false;
          }
        } else {
          if ($(this).attr("index") == 1) {
            currentIndex = retIndex($(this), "right");
            return false;
          }
        }
      });
    }
  });

  //services
  var serviceOpened = false;
  $("#main-services .service").click(function () {
    $(".service").removeClass("active");
    $(".service").addClass("small");
    $(this).removeClass("small").addClass("active");
    serviceOpened = true;
  });

  $("#main-services .service").hover(
    function () {
      var viewportWidth = $(window).width();
      if (viewportWidth > 1024) {
        var el = $(this);
        if (!serviceOpened) {
          setTimeout(function () {
            $(el).siblings().addClass("mid");
            $(el).addClass("hover");
          }, 500);
        }
      }
    },
    function () {
      var el = $(this);
      if (!serviceOpened) {
        setTimeout(function () {
          $(el).siblings().removeClass("mid");
          $(el).removeClass("hover");
        }, 500);
      }
    }
  );
});

//main blog
$("#tiles").imagesLoaded(function () {
  // Prepare layout options.
  var options = {
    autoResize: true, // This will auto-update the layout when the browser window is resized.
    container: $("#main-blog-container"), // Optional, used for some extra CSS styling
    offset: 5, // Optional, the distance between grid items
    itemWidth: 210, // Optional, the width of a grid item
  };

  // Get a reference to your grid items.
  var handler = $("#tiles li");

  // Call the layout function.
  handler.wookmark(options);

  // Capture clicks on grid items.
  //handler.click(function () {
  //    // Randomize the height of the clicked item.
  //    var newHeight = $('img', this).height() + Math.round(Math.random() * 300 + 30);
  //    $(this).css('height', newHeight + 'px');

  //    // Update the layout.
  //    handler.wookmark();
  //});
});
