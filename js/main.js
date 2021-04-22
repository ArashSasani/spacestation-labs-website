function resizeSliderContainer() {
  var height = 0;
  var slides = $("ul.slides").children("li");
  if (slides != null && slides.length != 0) {
    $(slides).each(function () {
      if (
        $(this)
          .children("div.row")
          .children(".mainpage-project")
          .css("display") == "block"
      ) {
        height = $(this).height();
        return false;
      }
    });
    //console.log(height)
    $("ul.slides").css("height", height);
  }
}

function svgFallback() {
  if (!Modernizr.svg) {
    $('img[src$=".svg"]').each(function () {
      $(this).attr("src", $(this).attr("src").replace(".svg", ".png"));
    });
  }
}

function mobileMenuResize() {
  if ($(window).width() <= 768) {
    var menuh = $("ul.off-canvas-list").height();
    $(".inner-wrap").height(menuh);
  }
}

function appendVideo() {
  var pathname = window.location.pathname;
  var vid = "";
  if (pathname == "/" || pathname == "/index.html") {
    vid = "a";
  } else {
    vid = "b";
  }
  $("#video_bg").append(
    "<source src='video/" +
      vid +
      ".mp4' type='video/mp4' /><source src='video/" +
      vid +
      ".webm' type='video/webm' />"
  );
}

function scrollWrapper(navigationTooltips, autoScrolling, sectionColors) {
  var video = $("#video_bg").get(0);
  //scroller
  $("#fullpage").fullpage({
    //Navigation
    menu: false,
    anchors: ["1", "2", "3", "4", "5", "6"],
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: navigationTooltips,
    slidesNavigation: false,
    slidesNavPosition: "bottom",

    //Scrolling
    css3: true,
    scrollingSpeed: 500,
    autoScrolling: autoScrolling,
    scrollBar: false,
    easing: "easeInQuart",
    easingcss3: "ease",
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    normalScrollElements: "",
    scrollOverflow: true,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,

    //Design
    controlArrows: true,
    verticalCentered: true,
    resize: false,
    sectionsColor: sectionColors,
    paddingTop: "0px",
    paddingBottom: "0px",
    fixedElements: "",
    responsive: 0,

    //Custom selectors
    sectionSelector: ".section",
    slideSelector: ".slide",

    //events
    onLeave: function (index, nextIndex, direction) {
      //main page
      if (video != null && video.length != 0) {
        video.play();
      }
      //shared
      var viewportWidth = $(window).width();
      if (nextIndex != 1 && direction == "down") {
        $("#logo").slideUp();
        $("#lang").fadeOut();
        $(".stripe").slideUp();
        $("#main-menu").fadeOut();
      }
      if (nextIndex == 1 && direction == "up") {
        $(".stripe").slideDown("fast", function () {
          if (viewportWidth > 768) {
            $("#logo").slideDown();
          }
          $("#lang").fadeIn();
          $("#main-menu").fadeIn();
        });
      }
    },
    afterLoad: function (anchorLink, index) {},
    afterRender: function () {
      //main page
      if (video != null && video.length != 0) {
        video.play();
      }
      //main page projects
      resizeSliderContainer();
    },
    afterResize: function () {
      //main page
      if (video != null && video.length != 0) {
        video.play();
      }
    },
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {},
    onSlideLeave: function (anchorLink, index, slideIndex, direction) {},
  });
}

$(document).ready(function () {
  outdatedBrowser({
    bgColor: "#d41217",
    color: "#ffffff",
    lowerThan: "transform",
    languagePath: "",
  });

  var viewportWidth = $(window).width();
  if (viewportWidth > 1024) {
    appendVideo();
  }
  //contents
  $(".loader-screen .message").css("display", "block");

  //navigation for each page
  var pathname = window.location.pathname;
  if (pathname == "/" || pathname == "/index.html") {
    jsonFile = "home";
  } else {
    jsonFile = "home";
    $(".loader-screen").attr(
      "style",
      "display:block !important; opacity:1 !important;"
    );
    $(".loader-screen .message").html("404 Not Found");
    setInterval(function () {
      window.location.href = "/";
    }, 3000);
  }
  $.getJSON("js/json/" + jsonFile + ".json", function (data) {
    var jsonArray = $.map(data, function (value, index) {
      return [value];
    });

    var autoScrolling = true;

    scrollWrapper(jsonArray[0], autoScrolling, jsonArray[1]);
    $.fn.fullpage.setAllowScrolling(false);
  });

  //to top
  $(".scrollToTop").click(function () {
    $.fn.fullpage.moveTo(1);
  });
  //mobile menu
  mobileMenuResize();
  //svg fallback for img src
  svgFallback();
});

$(window).resize(function () {
  var viewportWidth = $(window).width();
  if (viewportWidth > 1024) {
    appendVideo();
  }

  if (viewportWidth > 768) {
    $("#logo").css("display", "block");
    $("#fp-nav").fadeIn(200);
  } else if (viewportWidth <= 768) {
    $("#logo").css("display", "none");
    $("#fp-nav").css("display", "none");
  }
  //main page projects
  resizeSliderContainer();
  //mobile menu height resize
  mobileMenuResize();
});

$(window).load(function () {
  var viewportWidth = $(window).width();

  $(".loader-screen")
    .delay(500)
    .fadeOut(500, function () {
      if (viewportWidth > 768) {
        $("#fp-nav").fadeIn(200);
      }
      $.fn.fullpage.setAllowScrolling(true);
    });
});
