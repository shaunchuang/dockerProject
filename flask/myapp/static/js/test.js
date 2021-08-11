!(function (e) {
  var t = {};
  function a(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
  }
  (a.m = e),
    (a.c = t),
    (a.d = function (e, t, n) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (a.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (a.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          a.d(
            n,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return a.d(t, "a", t), t;
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = "/"),
    a((a.s = 1));
})({
  "01cc": function (e, t) {
    function a() {
      var e = $("footer"),
        t = e.find(".compare-basket"),
        a = t.find("li.last");
      0 == a.index()
        ? e.addClass("disabled")
        : (e.removeClass("disabled"),
          a.index() > 1 || -1 == a.index()
            ? t.find("button").removeClass("disabled")
            : t.find("button").addClass("disabled"));
    }
    function n() {
      !0 !== $("footer").hasClass("disabled")
        ? ($("body").css("margin-bottom", "+=130"),
          $(".right-holder .right").css("margin-bottom", "+=130"))
        : ($("body").css("margin-bottom", "0"),
          $(".right-holder .right").css("margin-bottom", "0"));
    }
    $(".add-to-basket").on("click", function () {
      var e = $(this).parent("form"),
        t = e.find("input[name='type']").val(),
        r = e.find("input[name='trim_id']").val(),
        o = $("footer").find(".compare-basket"),
        i = o.find("input[name='now-compare-type']"),
        s = o.find("li.last"),
        c = e.attr("action"),
        l = e.serialize();
      return (
        "" != i.val() && i.val() != t
          ? alert("汽車與機車無法比較")
          : s.length < 1
          ? alert("已選滿4輛")
          : o.find("li .img-wrapper input[value='" + r + "']").length > 0
          ? alert("此車款已加入")
          : $.ajax({
              url: c,
              data: l,
              type: "POST",
              dataType: "json",
              success: function (e) {
                o.html(null),
                  o.append(e.html),
                  a(),
                  $("input[value='" + r + "'] ~ .add-to-basket").addClass(
                    "disabled"
                  ),
                  n();
              },
              error: function (e) {
                console.error(e.status);
              },
            }),
        !1
      );
    }),
      $("footer").on(
        "click",
        ".compare-basket .delete-compare-item",
        function () {
          var e = $(this),
            t = e.parent("form"),
            r = $("footer .compare-basket"),
            o = t.find("input[name='trim_id']").val(),
            i = e.attr("data-href"),
            s = t.serialize();
          $.ajax({
            url: i,
            data: s,
            type: "POST",
            dataType: "json",
            success: function (e) {
              r.html(null),
                r.append(e.html),
                $(
                  "input[value='" + o + "'] ~ .add-to-basket.disabled"
                ).removeClass("disabled"),
                a(),
                n();
            },
            error: function (e) {
              console.error(e.status);
            },
          });
        }
      ),
      $("footer .cancel-compare").on("click", function () {
        var e = $(this),
          t = $("footer").find(".compare-basket"),
          r = e.parent("form"),
          o = r.attr("action"),
          i = r.serialize();
        $.ajax({
          url: o,
          data: i,
          type: "POST",
          dataType: "json",
          success: function (e) {
            t.html(null),
              t.append(e.html),
              $(".add-to-basket.disabled").removeClass("disabled"),
              a(),
              n();
          },
          error: function (e) {
            console.error(e.status);
          },
        });
      }),
      $("footer")
        .on("mouseenter", function () {
          $(".compare-basket").removeClass("mouseleave");
        })
        .on("mouseleave", function () {
          $(".compare-basket").addClass("mouseleave");
        }),
      $("footer").on("click", ".compare-basket button", function () {
        var e = $(this),
          t = e.closest(".compare-basket").find("li.last");
        (t.index() > 1 || -1 == t.index()) &&
          (window.location.href = e.data("href"));
      }),
      n();
  },
  1: function (e, t, a) {
    e.exports = a("miOe");
  },
  "1XNa": function (e, t) {
    if ($(".main-news-list .news-wrapper").length) {
      var a = $(".main-news-list .news-wrapper"),
        n = !0;
      $(window).scroll(function e() {
        if (!n) return !1;
        if (
          $(window).scrollTop() + $(window).height() >=
          $(document).height() - 100
        ) {
          (n = !1), $(window).unbind("scroll", e);
          var t = a.attr("data-href"),
            r = a.attr("data-pageinfo"),
            o = a.attr("data-token");
          "false" != t &&
            $.ajax({
              url: t,
              type: "POST",
              data: { pagination: r, _token: o },
              dataType: "json",
              success: function (e) {
                a.append(e.html),
                  a.attr("data-href", e.href),
                  a.attr("data-pageinfo", e.pagination);
              },
              error: function (e) {
                console.error(e.status);
              },
              complete: function () {
                $(window).scroll(e), (n = !0);
              },
            });
        }
      });
    }
  },
  "7Wix": function (e, t) {
    if ($(".common-nav-holder").length) {
      var a = $(".common-nav-holder"),
        n = $(".common-nav-holder > .common-nav"),
        r = a.offset().top - a.outerHeight() + n.outerHeight();
      $(window).on("scroll", function () {
        $(this).scrollTop() >= r
          ? (n.addClass("fixed"),
            $(".body-wrapper").css("padding-top", n.height() + "px"))
          : (n.removeClass("fixed"),
            $(".body-wrapper").css("padding-top", "0"));
      });
    }
  },
  U9VH: function (e, t) {
    if ($(".main-ranking .rank-content").length) {
      var a = $(".main-ranking .rank-content"),
        n = !0;
      $(".main-ranking input[name=rank-tab]").on("change", function () {
        if (n) {
          n = !1;
          var e = $(this),
            t = $(".main-ranking label"),
            r = e.attr("data-href");
          t.toggleClass("disabled"),
            $.ajax({
              url: r,
              type: "GET",
              dataType: "json",
              success: function (e) {
                a.html(e.html);
              },
              error: function (e) {
                console.error(e.status);
              },
              complete: function () {
                (n = !0), t.toggleClass("disabled");
              },
            });
        }
      });
    }
  },
  fSGk: function (e, t) {
    $(".body-wrapper > .right-holder").length &&
      $(window).on("scroll", function () {
        var e = $(".body-wrapper > .right-holder"),
          t = $(".body-wrapper > .main"),
          a = $(".body-wrapper > .right-holder > .right");
        a.outerHeight() < t.outerHeight() &&
          ($(this).scrollTop() + $(this).height() >=
          e.offset().top + a.outerHeight()
            ? $(".body-wrapper > .right-holder > .right").addClass("fixed")
            : $(".body-wrapper > .right-holder > .right").removeClass("fixed"));
      });
  },
  hdrV: function (e, t) {
    function a() {
      $(".main-search .search-car .price-range input[type='checkbox']").is(
        ":checked"
      ) || "" != $(".main-search select#car_bodystyle").val()
        ? $(".main-search .search-car .warning")
            .hide()
            .closest("form.search-form")
            .find("button[type='submit']")
            .removeClass("disabled")
        : $(".main-search .search-car .warning")
            .show()
            .closest("form.search-form")
            .find("button[type='submit']")
            .addClass("disabled"),
        $(".main-search .search-bike .price-range input[type='checkbox']").is(
          ":checked"
        ) || "" != $(".main-search select#bike_bodystyle").val()
          ? $(".main-search .search-bike .warning")
              .hide()
              .closest("form.search-form")
              .find("button[type='submit']")
              .removeClass("disabled")
          : $(".main-search .search-bike .warning")
              .show()
              .closest("form.search-form")
              .find("button[type='submit']")
              .addClass("disabled");
    }
    $(".main-search .price-range input[type='checkbox']").on(
      "change",
      function () {
        $(this).siblings("input[type='checkbox']").prop("checked", !1), a();
        var e = $(this).prev().find("span:last");
        $(".main-search .price-range input[type='checkbox']").is(":checked")
          ? ("car_range-0" == $(this).attr("id") &&
              $("#car_range-0")
                .next()
                .find("span:first")
                .addClass("check-toggle")
                .parent()
                .siblings()
                .find("span")
                .removeClass("check-toggle"),
            "bike_range-0" == $(this).attr("id") &&
              $("#bike_range-0")
                .next()
                .find("span:first")
                .addClass("check-toggle")
                .parent()
                .siblings()
                .find("span")
                .removeClass("check-toggle"),
            e
              .addClass("check-toggle")
              .parent()
              .siblings()
              .find("span:last")
              .removeClass("check-toggle"))
          : e.removeClass("check-toggle");
      }
    ),
      $(".main-search select[name='body_type'] + .event-holder").on(
        "click",
        function () {
          var e = $(this).prev("select[name='body_type']"),
            t = $(this).next(".bodystyle-option");
          if (
            ($(this).toggleClass("toggle"),
            $(this).hasClass("toggle") ? t.show() : t.hide(),
            "all" != e.val())
          ) {
            var a = e.val();
            t.find("input[type='checkbox']:checked").prop("checked", !1),
              t
                .find("input[type='checkbox'][value='" + a + "']")
                .prop("checked", !0);
          } else t.find("input[type='checkbox']:checked").prop("checked", !1);
        }
      ),
      $(".main-search .bodystyle-option input[type=checkbox]").on(
        "change",
        function () {
          var e;
          $(this).siblings("input[type=checkbox]").prop("checked", !1),
            (e = $(this).is(":checked") ? $(this).val() : ""),
            $("#search-car:radio:checked").length > 0 &&
              ga(
                "send",
                "event",
                "完整搜尋",
                "完整搜尋_找新車",
                "完整搜尋_找新車_車身_" + e
              ),
            $("#search-bike:radio:checked").length > 0 &&
              ga(
                "send",
                "event",
                "完整搜尋",
                "完整搜尋_找機車",
                "完整搜尋_找機車_車身_" + e
              ),
            $(this).parent().siblings("select[name='body_type']").val(e),
            a();
        }
      ),
      $(".main-search .bodystyle-label.confirm").on("click", function () {
        var e,
          t = $(this).siblings("input[type=checkbox]:checked");
        (e = t.length >= 1 ? t.val() : ""),
          $("#search-car:radio:checked").length > 0 &&
            ga(
              "send",
              "event",
              "完整搜尋",
              "完整搜尋_找新車",
              "完整搜尋_找新車_車身_" + e
            ),
          $("#search-bike:radio:checked").length > 0 &&
            ga(
              "send",
              "event",
              "完整搜尋",
              "完整搜尋_找機車",
              "完整搜尋_找機車_車身_" + e
            ),
          $(this).closest("li").find("select[name='body_type']").val(e),
          $(this).closest(".bodystyle-option").hide(),
          a();
      }),
      $(document).mouseup(function (e) {
        var t = $(".main-search .bodystyle-option");
        t.is(e.target) || 0 !== t.has(e.target).length || t.hide();
      }),
      $(".main-search .bodystyle-option .close-btn").on("click", function () {
        $(this).closest(".bodystyle-option").hide();
      }),
      $("#usedcar_min_year, #usedcar_max_year").on("change", function () {
        var e = parseInt($("#usedcar_max_year").val(), 10),
          t = parseInt($("#usedcar_min_year").val(), 10);
        console.log(t + " - " + e),
          NaN != e && NaN != t && e < t
            ? $(".main-search .search-usedcar .warning")
                .show()
                .closest("form.search-form")
                .find("button[type='submit']")
                .addClass("disabled")
            : $(".main-search .search-usedcar .warning")
                .hide()
                .closest("form.search-form")
                .find("button[type='submit']")
                .removeClass("disabled");
      }),
      $(".main-search select#car_make_id").on("change", function () {
        $("#car_model_id, #car_trim_id").prop("disabled", !0).val("");
        var e = $(this),
          t = e.data("href") + "/" + e.val(),
          a = e.find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_車廠_" + a
        ),
          $.ajax({
            url: t,
            type: "GET",
            dataType: "json",
            success: function (t) {
              if (null != t.error)
                return (
                  e
                    .closest("form.search-form")
                    .find("button[type='submit']")
                    .addClass("disabled"),
                  console.error(t.error),
                  !1
                );
              for (
                var a = '<option value="">不限車系</option>',
                  n = t.autos.result[0].modellist,
                  r = n.length,
                  o = 0;
                o < r;
                o++
              ) {
                var i = n[o].model_year + " " + n[o].model_name;
                a += '<option value="' + n[o].model_id + '">' + i + "</option>";
              }
              $("#car_model_id").html(a).prop("disabled", !1);
            },
            error: function (t) {
              return (
                e
                  .closest("form.search-form")
                  .find("button[type='submit']")
                  .addClass("disabled"),
                console.error(t.status),
                !1
              );
            },
          }),
          e
            .closest("form.search-form")
            .find("button[type='submit']")
            .removeClass("disabled");
      }),
      $(".main-search select#car_model_id").on("change", function () {
        $("#car_trim_id").prop("disabled", !0).val("");
        var e = $(this),
          t = e.data("href") + "/" + e.val(),
          a = e.find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_車系_" + a
        ),
          "" != e.val() &&
            $.ajax({
              url: t,
              type: "GET",
              dataType: "json",
              success: function (t) {
                if (null != t.error)
                  return (
                    e
                      .closest("form.search-form")
                      .find("button[type='submit']")
                      .addClass("disabled"),
                    console.error(t.error),
                    !1
                  );
                for (
                  var a = '<option value="">不限車款</option>', n = 0;
                  n < t.autos.result[0].trimlist.length;
                  n++
                )
                  a +=
                    '<option value="' +
                    t.autos.result[0].trimlist[n].trim_id +
                    '">' +
                    t.autos.result[0].trimlist[n].trim_name +
                    "</option>";
                $("#car_trim_id").html(a).prop("disabled", !1);
              },
              error: function (t) {
                return (
                  e
                    .closest("form.search-form")
                    .find("button[type='submit']")
                    .addClass("disabled"),
                  console.error(t.status),
                  !1
                );
              },
            }),
          e
            .closest("form.search-form")
            .find("button[type='submit']")
            .removeClass("disabled");
      }),
      $(".main-search select#car_trim_id").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_車款_" + e
        );
      }),
      $(".main-search select#car_fuel").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_動力_" + e
        );
      }),
      $(".main-search select#car_drive").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_驅動_" + e
        );
      }),
      $(".main-search select#car_seat").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找新車",
          "完整搜尋_找新車_座位_" + e
        );
      }),
      $(".main-search select#bike_make_id").on("change", function () {
        $("#bike_trim_id").prop("disabled", !0).val("");
        var e = $(this),
          t = e.data("href") + "/" + e.val(),
          a = e.find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找機車",
          "完整搜尋_找機車_車廠_" + a
        ),
          $.ajax({
            url: t,
            type: "GET",
            dataType: "json",
            success: function (t) {
              if (null != t.error)
                return (
                  e
                    .closest("form.search-form")
                    .find("button[type='submit']")
                    .addClass("disabled"),
                  console.error(t.error),
                  !1
                );
              for (
                var a = '<option value="">不限車款</option>',
                  n = t.autos.result[0].trimlist,
                  r = n.length,
                  o = 0;
                o < r;
                o++
              )
                a +=
                  '<option value="' +
                  n[o].trim_id +
                  '">' +
                  n[o].model_year +
                  " " +
                  n[o].model_name +
                  " " +
                  n[o].trim_name +
                  "</option>";
              $("#bike_trim_id").html(a).prop("disabled", !1);
            },
            error: function (t) {
              return (
                e
                  .closest("form.search-form")
                  .find("button[type='submit']")
                  .addClass("disabled"),
                console.error(t.status),
                !1
              );
            },
          }),
          e
            .closest("form.search-form")
            .find("button[type='submit']")
            .removeClass("disabled");
      }),
      $(".main-search select#bike_trim_id").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找機車",
          "完整搜尋_找機車_車款_" + e
        );
      }),
      $(".main-search select#fuel").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找機車",
          "完整搜尋_找機車_動力_" + e
        );
      }),
      $(".main-search select#usedcar_make_id").on("change", function () {
        $("#usedcar_model_id").prop("disabled", !0).val("");
        var e = $(this),
          t = e.data("href"),
          a = "make_name=" + e.val(),
          n = e.find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_車廠_" + n
        ),
          $.ajax({
            url: t,
            type: "GET",
            data: a,
            dataType: "json",
            success: function (e) {
              if (null != e.error) return console.error(e.error), !1;
              for (
                var t = '<option value="">所有車系</option>', a = 0;
                a < e.autos.result[0].list.length;
                a++
              )
                t +=
                  '<option value="' +
                  e.autos.result[0].list[a].model +
                  '">' +
                  e.autos.result[0].list[a].model +
                  "</option>";
              $("#usedcar_model_id").html(t).prop("disabled", !1);
            },
            error: function (e) {
              return console.error(e.status), !1;
            },
          });
      }),
      $(".main-search select#usedcar_model_id").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_車系_" + e
        );
      }),
      $(".main-search select#usedcar_price_range").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_價格_" + e
        );
      }),
      $(".main-search select#usedcar_area").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_地區_" + e
        );
      }),
      $(".main-search select#usedcar_min_year").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_年份起_" + e
        );
      }),
      $(".main-search select#usedcar_max_year").on("change", function () {
        var e = $(this).find("option:selected").text();
        ga(
          "send",
          "event",
          "完整搜尋",
          "完整搜尋_找中古車",
          "完整搜尋_找中古車_年份迄_" + e
        );
      }),
      $(".main-search form.search-form").on("submit", function (e) {
        var t = $(this),
          a = t.data("href"),
          n = t.serializeArray();
        return (
          (n = n.filter(function (e) {
            return "" !== e.value;
          })),
          (n = (n = $.map(n, function (e) {
            return e.name + "=" + e.value;
          })).join("&")),
          (window.location.href = a + "?" + n),
          !1
        );
      });
  },
  hhJ0: function (e, t) {
    var a = $(".ad-LDRB-728x90"),
      n =
        ($(".ad-LREC3-300x250"), $(".ad-NP1-300x100"), $(".brand-img-banner"));
    $(".ad-MAST-970x250").data("space-id");
    function r(e) {
      0 !== e.height() && e.css("margin-top", "25px");
    }
    window.onload = function () {
      r(a), r(n);
    };
  },
  miOe: function (e, t, a) {
    a("7Wix"),
      a("uLFh"),
      a("fSGk"),
      a("oYg9"),
      a("hdrV"),
      a("U9VH"),
      a("1XNa"),
      a("01cc"),
      a("hhJ0"),
      a("zEJ6");
  },
  oYg9: function (e, t) {
    $(".main-carousel .slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: !1,
      fade: !0,
      autoplay: !0,
      autoplaySpeed: 3e3,
      waitForAnimate: !1,
    }),
      $(".main-carousel .slider-nav").slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: !1,
        focusOnSelect: !1,
      }),
      $(".main-carousel .slider-nav .slick-slide").on("mouseover", function () {
        var e = $(this).data("slick-index");
        $(".main-carousel .slider-for").slick("getSlick").slickGoTo(e);
      }),
      $(".main-carousel .slider-nav").on("mouseenter", function () {
        $(".main-carousel .slider-for").slick("slickPause");
      }),
      $(".main-carousel .slider-nav").on("mouseleave", function () {
        $(".main-carousel .slider-for").slick("slickPlay");
      }),
      $(".main-carousel .slider-for").on("afterChange", function (e, t, a, n) {
        var r = $(".main-carousel .slider-nav .slick-active").eq(0);
        0 == a || 5 == a
          ? r.find(".nav-wrapper").addClass("picked")
          : r.find(".nav-wrapper").removeClass("picked");
      }),
      $(".main-carousel .slider-for").on("beforeChange", function (e, t, a, n) {
        $(".main-carousel .picked").removeClass("picked"),
          $(".main-carousel .slider-nav .slick-active")
            .eq(n % 5)
            .find(".nav-wrapper")
            .addClass("picked"),
          $(".main-carousel .slider-nav").slick("getSlick").slickGoTo(n);
      }),
      $(".main-carousel .slick-arrow").on("click", function () {
        var e = $(".main-carousel .slider-nav .slick-current").data(
          "slick-index"
        );
        $(".main-carousel .slider-for").slick("getSlick").slickGoTo(e);
      }),
      $(".main-carousel .slick-prev").on("click", function () {
        var e = $(".main-carousel").data("gatitle");
        ga("send", "event", e + "大看板", e + "大看板_箭頭", e + "大看板_左");
      }),
      $(".main-carousel .slick-next").on("click", function () {
        var e = $(".main-carousel").data("gatitle");
        ga("send", "event", e + "大看板", e + "大看板_箭頭", e + "大看板_右");
      }),
      $(".main-certified-carousel .slider-nav").slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: !1,
        focusOnSelect: !1,
      }),
      $(".main-certified-carousel .slider-nav").on(
        "afterChange",
        function (e, t, a) {
          $(this)
            .parent()
            .siblings(".read-more")
            .find(".slide-count")
            .html(
              t.currentSlide +
                1 +
                " - " +
                (t.currentSlide + 5) +
                " of " +
                t.slideCount
            );
        }
      );
  },
  uLFh: function (e, t) {
    if ($(".nav-holder").length) {
      var a = $(".nav-holder"),
        n = $(".nav-holder > .fixed-nav");
      $(window).on("scroll", function () {
        $(this).scrollTop() >= a.offset().top
          ? (n.addClass("fixed"),
            a.next().css("padding-top", n.height() + "px"))
          : (n.removeClass("fixed"), a.next().css("padding-top", "0"));
      });
    }
  },
  zEJ6: function (e, t, a) {
    "use strict";
    function n(e, t) {
      return (function (a, n, r, o, i) {
        (a[i] = a[i] || []),
          a[i].push({
            projectId: "10000",
            properties: {
              pixelId: e,
              qstrings: { country: "tw", property: "auto", ea: t },
            },
          });
        var s = n.createElement(r);
        (s.src = "https://s.yimg.com/wi/ytc.js"),
          (s.async = !0),
          (s.onload = s.onreadystatechange =
            function () {
              var e,
                t = this.readyState,
                n = a[i];
              if (!t || "complete" == t || "loaded" == t)
                try {
                  (e = YAHOO.ywa.I13N.fireBeacon),
                    (a[i] = []),
                    (a[i].push = function (t) {
                      e([t]);
                    }),
                    e(n);
                } catch (e) {}
            });
        var c = n.getElementsByTagName(r)[0];
        c.parentNode.insertBefore(s, c);
      })(window, document, "script", 0, "dotq");
    }
    function r() {
      return n("428726", "useddetail");
    }
    function o(e) {
      switch (e) {
        case 1:
          return n("10021404", "hotdetail");
        case 3:
          return n("10021402", "sumdetail");
        case 11:
          return n("10021403", "audidetail");
        case 14:
          return n("417252", "bcdetail");
        case 18:
          return n("10057008", "savedetail");
        case 23:
          return n("10072933", "easycardetail");
        default:
          return !1;
      }
    }
    a.r(t),
      a.d(t, "trackingDotClick", function () {
        return o;
      }),
      a.d(t, "trackingDotClickAll", function () {
        return r;
      }),
      $(".jq-tracking-dot-click").on("click", function () {
        var e = $(this).data("custid");
        r(), o(parseFloat(e));
      });
  },
});
