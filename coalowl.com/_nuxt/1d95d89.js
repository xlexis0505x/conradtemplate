(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    128: function (e, t, o) {
      e.exports = o.p + "fonts/HELVETICANEUE.27ccdcb.ttf";
    },
    129: function (e, t, o) {
      e.exports = o.p + "fonts/HELVETICANEUE-MEDIUM.02cb846.ttf";
    },
    153: function (e, t, o) {
      "use strict";
      o(93), o(79);
      o(0).a.mixin({
        data: function () {
          return {};
        },
        methods: {
          proofSet: function () {
            var e = [
                "padding:4px 12px",
                "font-size: 8px",
                "border:1px solid #020202",
              ],
              t = []
                .concat(e, [
                  "background-color: #020202",
                  "color: white",
                  "border-right: none",
                ])
                .join(";"),
              o = []
                .concat(e, [
                  "text-decoration: none;",
                  "background-color: #5e5e5e",
                  "border-right: none",
                  "border-left: none",
                  "padding:4px 2px",
                ])
                .join(";"),
              n = [].concat(e, ["border-left: none"]).join(";");
            console.log("%cMADE WITH BY ITOH%c🌲%chttps://walkal.one", t, o, n);
          },
          $: function (e, t) {
            return t || (t = document), t.querySelector(e);
          },
          $$: function (e, t) {
            return t || (t = document), t.querySelectorAll(e);
          },
        },
      });
    },
    154: function (e, t, o) {
      "use strict";
      var n = o(224);
      o(0).a.prototype.$gsap = n.a;
    },
    155: function (e, t, o) {
      "use strict";
      t.a = function (e) {
        var i,
          s,
          t,
          o,
          a,
          n,
          r = e.app;
        (i = window),
          (s = document),
          (t = "script"),
          (o = "ga"),
          (i.GoogleAnalyticsObject = o),
          (i[o] =
            i[o] ||
            function () {
              (i[o].q = i[o].q || []).push(arguments);
            }),
          (i[o].l = 1 * new Date()),
          (a = s.createElement(t)),
          (n = s.getElementsByTagName(t)[0]),
          (a.async = 1),
          (a.src = "https://www.google-analytics.com/analytics.js"),
          n.parentNode.insertBefore(a, n),
          ga("create", "UA-161495720-3", "auto"),
          r.router.afterEach(function (e, t) {
            ga("set", "page", e.fullPath), ga("send", "pageview");
          });
      };
    },
    207: function (e, t, o) {
      var content = o(295);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
      (0, o(76).default)("20ac1c16", content, !0, { sourceMap: !1 });
    },
    208: function (e, t, o) {
      var content = o(297);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
      (0, o(76).default)("6493df38", content, !0, { sourceMap: !1 });
    },
    233: function (e, t, o) {
      "use strict";
      o(19), o(12), o(25);
      var n = {
          mixins: [
            {
              data: function () {
                return { style: { "--wh": "100vh" } };
              },
              mounted: function () {
                var e = this;
                this.$nextTick(function () {
                  e.getWindowSize(),
                    window.addEventListener("resize", e.getWindowSize);
                });
              },
              methods: {
                getWindowSize: function () {
                  this.style["--wh"] = "".concat(window.innerHeight, "px");
                },
              },
            },
          ],
          data: function () {
            return { menuToggle: !1 };
          },
          watch: {
            menuToggle: function (e) {
              var t = this;
              e
                ? (this.$gsap.set(".hamburger", { pointerEvents: "none" }),
                  this.$gsap.to(".hamburger__button__top", {
                    duration: 0.3,
                    rotate: "45deg",
                  }),
                  this.$gsap.to(".hamburger__button__bottom", {
                    duration: 0.3,
                    rotate: "-45deg",
                    y: -2,
                  }),
                  this.$gsap.to(".hamburger__overlay", {
                    duration: 0.5,
                    opacity: 1,
                    onStart: function () {
                      t.$gsap.set(".hamburger__overlay", { display: "block" });
                    },
                  }),
                  this.$gsap.utils
                    .toArray(".hamburger__overlay__menu__link")
                    .forEach(function (e, i) {
                      t.$gsap.to(e, {
                        y: "0%",
                        delay: 0.4,
                        duration: 0.5 + i / 10,
                      });
                    }),
                  this.$gsap.utils
                    .toArray(".hamburger__overlay__social__link")
                    .forEach(function (e, i) {
                      t.$gsap.to(e, {
                        y: "0%",
                        delay: 0.4,
                        duration: 0.5 + i / 10,
                      });
                    }),
                  this.$gsap.set(".hamburger", {
                    pointerEvents: "",
                    delay: 1.5,
                  }))
                : (this.$gsap.set(".hamburger", { pointerEvents: "none" }),
                  this.$gsap.to(".hamburger__button__top", {
                    duration: 0.3,
                    rotate: "0deg",
                  }),
                  this.$gsap.to(".hamburger__button__bottom", {
                    duration: 0.3,
                    rotate: "0deg",
                    y: 0,
                  }),
                  this.$gsap.utils
                    .toArray(".hamburger__overlay__menu__link")
                    .forEach(function (e, i) {
                      t.$gsap.to(e, { y: "140%", duration: 0.5 + i / 10 });
                    }),
                  this.$gsap.utils
                    .toArray(".hamburger__overlay__social__link")
                    .forEach(function (e, i) {
                      t.$gsap.to(e, { y: "140%", duration: 0.5 + i / 10 });
                    }),
                  this.$gsap.to(".hamburger__overlay", {
                    duration: 0.5,
                    opacity: 0,
                    delay: 0.6,
                    onComplete: function () {
                      t.$gsap.set(".hamburger__overlay", { display: "none" }),
                        t.$gsap.set(
                          ".hamburger__overlay__menu__link, .hamburger__overlay__social__link",
                          { y: "-100%" }
                        );
                    },
                  }),
                  this.$gsap.set(".hamburger", {
                    pointerEvents: "",
                    delay: 1.5,
                  }));
            },
            $route: function (e, t) {
              this.changeRoute(e);
            },
          },
          mounted: function () {
            this.proofSet(),
              this.$("html, body").classList.add("index"),
              this.scrollDownAnime(),
              this.changeRoute(this.$route);
          },
          created: function () {},
          methods: {
            changeRoute: function (e) {
              var t = this.$gsap.timeline();
              "about" === e.name
                ? (t.to(".footer__scroll-text", {
                    duration: 1,
                    ease: "expo.in",
                    y: 300,
                  }),
                  t.to(".footer__copylight", {
                    duration: 1,
                    ease: "expo.out",
                    y: 0,
                  }))
                : "works" === e.name || "index" === e.name
                ? (t.to(".footer__copylight", {
                    duration: 1,
                    ease: "expo.in",
                    y: 300,
                  }),
                  t.to(".footer__scroll-text", {
                    duration: 1,
                    ease: "expo.out",
                    y: 0,
                  }))
                : t.to(".footer__copylight, .footer__scroll-text", {
                    duration: 1,
                    ease: "expo.in",
                    y: 300,
                  });
            },
            scrollDownAnime: function () {
              var e = this.$gsap.timeline({ repeat: -1, repeatDelay: 3 });
              e.to(".scroll-text", { duration: 1, ease: "expo.in", y: -16 }),
                e.set(".scroll-text", { y: 16 }),
                e.to(".scroll-text", { duration: 1, ease: "expo.out", y: 0 });
            },
          },
        },
        r = (o(294), o(53)),
        component = Object(r.a)(
          n,
          function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              { style: e.style },
              [
                t(
                  "div",
                  { staticClass: "header" },
                  [
                    t(
                      "nuxt-link",
                      {
                        staticClass: "header__logo",
                        attrs: { to: "/" },
                        nativeOn: {
                          click: function (t) {
                            e.menuToggle = !1;
                          },
                        },
                      },
                      [
                        t("img", {
                          staticClass: "header__logo__image",
                          attrs: { src: "/logo-inline.svg" },
                        }),
                      ]
                    ),
                    t("ul", { staticClass: "header__list" }, [
                      t(
                        "li",
                        { staticClass: "header__list__item" },
                        [
                          t(
                            "n-link",
                            {
                              staticClass: "header__list__item__link",
                              attrs: { to: "/works" },
                            },
                            [e._v("WORKS")]
                          ),
                          t("span", { staticClass: "header__bar" }),
                        ],
                        1
                      ),
                      t(
                        "li",
                        { staticClass: "header__list__item" },
                        [
                          t(
                            "n-link",
                            {
                              staticClass: "header__list__item__link",
                              attrs: { to: "/about" },
                            },
                            [e._v("ABOUT")]
                          ),
                          t("span", { staticClass: "header__bar" }),
                        ],
                        1
                      ),
                      t("li", { staticClass: "header__list__item" }, [
                        t(
                          "a",
                          {
                            staticClass: "header__list__item__link",
                            attrs: {
                              href: "mailto:".concat(e.$store.state.about.mail),
                              target: "_blank",
                            },
                          },
                          [t("span", [e._v("#")]), e._v("MAIL")]
                        ),
                        t("span", { staticClass: "header__bar" }),
                      ]),
                    ]),
                  ],
                  1
                ),
                t(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: "works-num" !== e.$route.name,
                        expression: "$route.name !== 'works-num'",
                      },
                    ],
                    staticClass: "social",
                  },
                  [
                    t("ul", { staticClass: "social__list" }, [
                      t("li", { staticClass: "social__item" }, [
                        t(
                          "a",
                          {
                            staticClass: "social__item__link",
                            attrs: {
                              href: e.$store.state.about.twitter_link,
                              target: "_blank",
                            },
                          },
                          [e._v("TWITTER")]
                        ),
                      ]),
                      t("li", { staticClass: "social__item" }, [
                        t(
                          "a",
                          {
                            staticClass: "social__item__link",
                            attrs: {
                              href: e.$store.state.about.instagram_link,
                              target: "_blank",
                            },
                          },
                          [e._v("INSTAGRAM")]
                        ),
                      ]),
                      t("li", { staticClass: "social__item" }, [
                        t(
                          "a",
                          {
                            staticClass: "social__item__link",
                            attrs: {
                              href: e.$store.state.about.tiktok_link,
                              target: "_blank",
                            },
                          },
                          [e._v("TIKTOK")]
                        ),
                      ]),
                    ]),
                  ]
                ),
                e._m(0),
                t("div", { staticClass: "hamburger sp-only" }, [
                  t(
                    "button",
                    {
                      staticClass: "hamburger__button",
                      on: {
                        click: function (t) {
                          e.menuToggle = !e.menuToggle;
                        },
                      },
                    },
                    [
                      t("div", {
                        staticClass:
                          "hamburger__button__top hamburger__button__bar",
                      }),
                      t("div", {
                        staticClass:
                          "hamburger__button__bottom hamburger__button__bar",
                      }),
                    ]
                  ),
                  t("div", { staticClass: "hamburger__overlay" }, [
                    t("div", { staticClass: "hamburger__overlay__wrap" }, [
                      t("ul", { staticClass: "hamburger__overlay__menu" }, [
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__menu__item" },
                          [
                            t(
                              "n-link",
                              {
                                staticClass: "hamburger__overlay__menu__link",
                                attrs: { to: "/" },
                                nativeOn: {
                                  click: function (t) {
                                    e.menuToggle = !1;
                                  },
                                },
                              },
                              [e._v("TOP")]
                            ),
                          ],
                          1
                        ),
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__menu__item" },
                          [
                            t(
                              "n-link",
                              {
                                staticClass: "hamburger__overlay__menu__link",
                                attrs: { to: "/works" },
                                nativeOn: {
                                  click: function (t) {
                                    e.menuToggle = !1;
                                  },
                                },
                              },
                              [e._v("WORKS")]
                            ),
                          ],
                          1
                        ),
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__menu__item" },
                          [
                            t(
                              "n-link",
                              {
                                staticClass: "hamburger__overlay__menu__link",
                                attrs: { to: "/about" },
                                nativeOn: {
                                  click: function (t) {
                                    e.menuToggle = !1;
                                  },
                                },
                              },
                              [e._v("ABOUT")]
                            ),
                          ],
                          1
                        ),
                      ]),
                      t("ul", { staticClass: "hamburger__overlay__social" }, [
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__social__item" },
                          [
                            t(
                              "a",
                              {
                                staticClass: "hamburger__overlay__social__link",
                                attrs: {
                                  href: "mailto:".concat(
                                    e.$store.state.about.mail
                                  ),
                                  target: "_blank",
                                },
                              },
                              [e._v("MAIL")]
                            ),
                          ]
                        ),
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__social__item" },
                          [
                            t(
                              "a",
                              {
                                staticClass: "hamburger__overlay__social__link",
                                attrs: {
                                  href: e.$store.state.about.twitter_link,
                                  target: "_blank",
                                },
                              },
                              [e._v("TWITTER")]
                            ),
                          ]
                        ),
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__social__item" },
                          [
                            t(
                              "a",
                              {
                                staticClass: "hamburger__overlay__social__link",
                                attrs: {
                                  href: e.$store.state.about.instagram_link,
                                  target: "_blank",
                                },
                              },
                              [e._v("INSTAGRAM")]
                            ),
                          ]
                        ),
                        t(
                          "li",
                          { staticClass: "hamburger__overlay__social__item" },
                          [
                            t(
                              "a",
                              {
                                staticClass: "hamburger__overlay__social__link",
                                attrs: {
                                  href: e.$store.state.about.tiktok_link,
                                  target: "_blank",
                                },
                              },
                              [e._v("TIKTOK")]
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                ]),
                t("base-loading"),
                t("nuxt"),
              ],
              1
            );
          },
          [
            function () {
              var e = this,
                t = e._self._c;
              return t("div", { staticClass: "footer" }, [
                t("div", { staticClass: "footer__scroll-text" }, [
                  t("span", { staticClass: "footer__scroll-text__circle" }),
                  t("p", { staticClass: "scroll-text" }, [e._v("SCROLL DOWN")]),
                ]),
                t("div", { staticClass: "footer__copylight" }, [
                  t("p", [e._v("©2022COALOWL")]),
                ]),
              ]);
            },
          ],
          !1,
          null,
          null,
          null
        );
      t.a = component.exports;
      installComponents(component, { BaseLoading: o(331).default });
    },
    240: function (e, t, o) {
      o(241), (e.exports = o(242));
    },
    292: function (e, t, o) {
      var content = o(293);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
      (0, o(76).default)("05da0d82", content, !0, { sourceMap: !1 });
    },
    293: function (e, t, o) {
      var n = o(75),
        r = o(127),
        l = o(128),
        d = o(129),
        c = n(!1),
        h = r(l),
        f = r(d);
      c.push([
        e.i,
        '/*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css *//*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css */.index,.index>body,.index>body>body,.index>body>body>body,.index>body>body>body>body,.index>body>body>body>body>body,.index>body>body>body>body>body>body,.index>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body>body>body>body{overscroll-behavior:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;overflow:hidden}/*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css */*{box-sizing:border-box}:after,:before{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}address,blockquote,dl,figure,form,iframe,p,pre,table{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;line-height:inherit;font-weight:inherit;margin:0}ol,ul{margin:0;padding:0;list-style:none}dt{font-weight:700}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border:0;border-top:1px solid;margin:0;clear:both;color:inherit}pre{font-family:monospace;font-size:inherit}address{font-style:inherit}a{background-color:transparent;text-decoration:none;color:inherit}abbr[title]{border-bottom:none;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none;vertical-align:bottom}embed,iframe,object{border:0;vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;-moz-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;border:0;background:transparent;padding:0;margin:0;outline:0;border-radius:0;text-align:inherit}[type=checkbox]{-webkit-appearance:checkbox;-moz-appearance:checkbox;appearance:checkbox}[type=radio]{-webkit-appearance:radio;-moz-appearance:radio;appearance:radio}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}[type=button][disabled],[type=reset][disabled],[type=submit][disabled],button[disabled]{cursor:default}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset,option{padding:0}fieldset{margin:0;border:0;min-width:0}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}label[for]{cursor:pointer}details{display:block}summary{display:list-item}table{border-collapse:collapse;border-spacing:0}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:700}[hidden],template{display:none}html{--color-black:#222;--color-gray:#f2f2f2;--color-white:#eaeaea;--color-orange:#fd9e6e;--color-red:#ea4c41;--color-yellow:#e8c746;--color-green:#79ad58;--color-sky-blue:#5a9ea9;--color-blue:#1e4c80;--color-purple:#9d87b8;--color-pink:#ffc5c5}@font-face{font-family:"Helvetica neue";src:url(' +
          h +
          ') format("truetype");font-weight:300}@font-face{font-family:"Helvetica neue";src:url(' +
          f +
          ') format("truetype");font-weight:400}.copy p,.font-nav,body{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif}.copy p,.font-nav{font-size:14px;font-weight:300;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.copy p,.font-nav{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-works-title{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px}@media(max-width:1024px){.font-works-title{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px;font-size:40px;line-height:110%}}.font-works-category{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px}@media(max-width:1024px){.font-works-category{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;font-size:16px}}.font-underline{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.font-underline{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-about-title-one{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px}@media(max-width:1024px){.font-about-title-one{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px;font-size:28px;line-height:33.4px}}.font-about-title-second{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px}@media(max-width:1024px){.font-about-title-second{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px;font-size:20px}}.font-about-text{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px}@media(max-width:1024px){.font-about-text{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px;font-size:10px;line-height:200%}}.font-about-text-second{font-weight:400;font-size:10px;line-height:188%}.font-about-text-second,.font-menu{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;letter-spacing:1px}.font-menu{font-size:56px;font-weight:500;line-height:80%}html{font-size:4px;background:#f2f2f2;background:var(--color-gray)}body,html{min-height:100vh;min-height:var(--wh,100vh);overscroll-behavior:none}body *,html *{color:#222;color:var(--color-black)}img{-o-object-fit:cover;object-fit:cover}@media(max-width:1024px){.pc-only{display:none!important}}@media(min-width:1025px){.sp-only{display:none!important}}.scrollbar-track{background:transparent!important}.scrollbar-track .scrollbar-thumb{border-radius:0;background:#222;background:var(--color-black);transition:height .5s ease-in}.scrollbar-track-x{height:1rem!important}.scrollbar-track-y{width:1rem!important}.container{min-height:100vh;min-height:var(--wh,100vh)}.index,.index>body,.index>body>body,.index>body>body>body,.index>body>body>body>body,.index>body>body>body>body>body,.index>body>body>body>body>body>body,.index>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body>body,.index>body>body>body>body>body>body>body>body>body>body>body>body>body>body{overscroll-behavior:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;overflow:hidden}.copy{width:100%;height:auto;padding-bottom:6rem}@media(min-width:1025px){.copy{display:none}}.copy p{width:100%;text-align:center}.move-text{display:inline-block}',
        "",
      ]),
        (e.exports = c);
    },
    294: function (e, t, o) {
      "use strict";
      o(207);
    },
    295: function (e, t, o) {
      var n = o(75),
        r = o(127),
        l = o(128),
        d = o(129),
        c = n(!1),
        h = r(l),
        f = r(d);
      c.push([
        e.i,
        '/*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css *//*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css */*{box-sizing:border-box}:after,:before{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}address,blockquote,dl,figure,form,iframe,p,pre,table{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;line-height:inherit;font-weight:inherit;margin:0}ol,ul{margin:0;padding:0;list-style:none}dt{font-weight:700}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border:0;border-top:1px solid;margin:0;clear:both;color:inherit}pre{font-family:monospace;font-size:inherit}address{font-style:inherit}a{background-color:transparent;text-decoration:none;color:inherit}abbr[title]{border-bottom:none;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none;vertical-align:bottom}embed,iframe,object{border:0;vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;-moz-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;border:0;background:transparent;padding:0;margin:0;outline:0;border-radius:0;text-align:inherit}[type=checkbox]{-webkit-appearance:checkbox;-moz-appearance:checkbox;appearance:checkbox}[type=radio]{-webkit-appearance:radio;-moz-appearance:radio;appearance:radio}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}[type=button][disabled],[type=reset][disabled],[type=submit][disabled],button[disabled]{cursor:default}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset,option{padding:0}fieldset{margin:0;border:0;min-width:0}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}label[for]{cursor:pointer}details{display:block}summary{display:list-item}table{border-collapse:collapse;border-spacing:0}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:700}[hidden],template{display:none}html{--color-black:#222;--color-gray:#f2f2f2;--color-white:#eaeaea;--color-orange:#fd9e6e;--color-red:#ea4c41;--color-yellow:#e8c746;--color-green:#79ad58;--color-sky-blue:#5a9ea9;--color-blue:#1e4c80;--color-purple:#9d87b8;--color-pink:#ffc5c5}@font-face{font-family:"Helvetica neue";src:url(' +
          h +
          ') format("truetype");font-weight:300}@font-face{font-family:"Helvetica neue";src:url(' +
          f +
          ') format("truetype");font-weight:400}body{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif}.copy p,.font-nav,.footer__copylight p,.footer__scroll-text p,.hamburger__overlay__social__link,.header__list__item__link,.social__item__link{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.copy p,.font-nav,.footer__copylight p,.footer__scroll-text p,.hamburger__overlay__social__link,.header__list__item__link,.social__item__link{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-works-title{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px}@media(max-width:1024px){.font-works-title{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px;font-size:40px;line-height:110%}}.font-works-category{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px}@media(max-width:1024px){.font-works-category{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;font-size:16px}}.font-underline{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.font-underline{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-about-title-one{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px}@media(max-width:1024px){.font-about-title-one{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px;font-size:28px;line-height:33.4px}}.font-about-title-second{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px}@media(max-width:1024px){.font-about-title-second{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px;font-size:20px}}.font-about-text{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px}@media(max-width:1024px){.font-about-text{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px;font-size:10px;line-height:200%}}.font-about-text-second{font-weight:400;font-size:10px;line-height:188%}.font-about-text-second,.font-menu,.hamburger__overlay__menu__link{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;letter-spacing:1px}.font-menu,.hamburger__overlay__menu__link{font-size:56px;font-weight:500;line-height:80%}html{font-size:4px;background:#f2f2f2;background:var(--color-gray)}body,html{min-height:100vh;min-height:var(--wh,100vh);overscroll-behavior:none}body *,html *{color:#222;color:var(--color-black)}img{-o-object-fit:cover;object-fit:cover}@media(max-width:1024px){.pc-only{display:none!important}}@media(min-width:1025px){.sp-only{display:none!important}}.scrollbar-track{background:transparent!important}.scrollbar-track .scrollbar-thumb{border-radius:0;background:#222;background:var(--color-black);transition:height .5s ease-in}.scrollbar-track-x{height:1rem!important}.scrollbar-track-y{width:1rem!important}.container{min-height:100vh;min-height:var(--wh,100vh)}.index,.index>body,.index>body>body,.index>body>body>body,.index>body>body>body>body,.index>body>body>body>body>body{overscroll-behavior:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;overflow:hidden}.copy{width:100%;height:auto;padding-bottom:6rem}@media(min-width:1025px){.copy{display:none}}.copy p{width:100%;text-align:center}.move-text{display:inline-block}.header{position:fixed;width:100vw;padding:16rem 16rem 0;display:flex;justify-content:space-between;align-items:flex-start;z-index:100}@media(max-width:1024px){.header{padding:5rem 5rem 0}}.header__logo{padding-bottom:2rem}.header__logo__image{width:61rem}@media(max-width:1024px){.header__logo__image{width:31rem}}.header__list{display:flex}.header__list>*{margin:0 8rem 0 0}.header__list>:last-child{margin:0}@media(max-width:1024px){.header__list{display:none}}.header__list__item{position:relative}.header__list__item:hover>.header__bar{transform:scaleX(1);transform-origin:right;transition:all .6s cubic-bezier(.16,1,.3,1) .2s}.header__list__item__link{text-transform:uppercase}.header__list__item__link span{margin-right:1rem}.header__bar{position:absolute;height:1px;width:100%;background:#222;background:var(--color-black);bottom:-.5rem;left:0;transform:scaleX(0);transition:all .6s cubic-bezier(.7,0,.84,0) .2s;transform-origin:left}.social{position:fixed;bottom:0;right:0;padding-bottom:16rem;padding-right:16rem;z-index:100}@media(max-width:1024px){.social{display:none}}.social__list{display:flex}.social__list>*{margin:0 8rem 0 0}.social__list>:last-child{margin:0}.footer{position:fixed;bottom:15rem;left:15rem;z-index:98;height:4rem;width:40rem}@media(max-width:1024px){.footer{bottom:5rem;left:5rem}}.footer__scroll-text{display:flex;align-items:center;overflow:hidden}.footer__scroll-text p{white-space:nowrap}.footer__scroll-text__circle{margin-right:8rem;height:10px;width:10px;border-radius:100%;background:#222;background:var(--color-black);display:block}@media(max-width:1024px){.footer__scroll-text__circle{margin-right:6rem}}@media(max-width:1024px){.footer__copylight{display:none}}.footer__copylight,.footer__scroll-text{position:absolute}.footer__copylight p,.footer__scroll-text p{line-height:100%}@media(min-width:1025px){.hamburger{display:none}}.hamburger__button{position:fixed;right:0;top:0;padding:5rem;width:4rem;min-height:1rem;box-sizing:content-box;z-index:100}.hamburger__button__bar{width:4rem;height:1px;background:#222;background:var(--color-black)}.hamburger__button__top{margin-bottom:2.2px}.hamburger__overlay{display:none;height:100vh;height:var(--wh,100vh);width:100vw;position:fixed;top:0;left:0;z-index:99;background:#f2f2f2;background:var(--color-gray);opacity:0}.hamburger__overlay__wrap{display:flex;justify-content:center;align-items:center;flex-direction:column;height:100%;width:100%;padding:32rem 5rem 5rem}.hamburger__overlay__menu{width:100%}.hamburger__overlay__menu__item{height:-moz-fit-content;height:fit-content;width:-moz-fit-content;width:fit-content;overflow:hidden}.hamburger__overlay__menu__link{transform:translateY(-100%);display:block;margin-bottom:2rem}.hamburger__overlay__social{margin-top:8rem;width:100%}.hamburger__overlay__social>*{margin:0 0 2rem}.hamburger__overlay__social>:last-child{margin:0}.hamburger__overlay__social__item{height:-moz-fit-content;height:fit-content;width:-moz-fit-content;width:fit-content;overflow:hidden}.hamburger__overlay__social__link{transform:translateY(-100%);display:block}',
        "",
      ]),
        (e.exports = c);
    },
    296: function (e, t, o) {
      "use strict";
      o(208);
    },
    297: function (e, t, o) {
      var n = o(75),
        r = o(127),
        l = o(128),
        d = o(129),
        c = n(!1),
        h = r(l),
        f = r(d);
      c.push([
        e.i,
        '/*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css *//*! destyle.css v1.0.13 | MIT License | https://github.com/nicolas-cusan/destyle.css */*[data-v-24e1ce7b]{box-sizing:border-box}[data-v-24e1ce7b]:after,[data-v-24e1ce7b]:before{box-sizing:inherit}html[data-v-24e1ce7b]{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body[data-v-24e1ce7b]{margin:0}main[data-v-24e1ce7b]{display:block}address[data-v-24e1ce7b],blockquote[data-v-24e1ce7b],dl[data-v-24e1ce7b],figure[data-v-24e1ce7b],form[data-v-24e1ce7b],iframe[data-v-24e1ce7b],p[data-v-24e1ce7b],pre[data-v-24e1ce7b],table[data-v-24e1ce7b]{margin:0}h1[data-v-24e1ce7b],h2[data-v-24e1ce7b],h3[data-v-24e1ce7b],h4[data-v-24e1ce7b],h5[data-v-24e1ce7b],h6[data-v-24e1ce7b]{font-size:inherit;line-height:inherit;font-weight:inherit;margin:0}ol[data-v-24e1ce7b],ul[data-v-24e1ce7b]{margin:0;padding:0;list-style:none}dt[data-v-24e1ce7b]{font-weight:700}dd[data-v-24e1ce7b]{margin-left:0}hr[data-v-24e1ce7b]{box-sizing:content-box;height:0;overflow:visible;border:0;border-top:1px solid;margin:0;clear:both;color:inherit}pre[data-v-24e1ce7b]{font-family:monospace;font-size:inherit}address[data-v-24e1ce7b]{font-style:inherit}a[data-v-24e1ce7b]{background-color:transparent;text-decoration:none;color:inherit}abbr[title][data-v-24e1ce7b]{border-bottom:none;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b[data-v-24e1ce7b],strong[data-v-24e1ce7b]{font-weight:bolder}code[data-v-24e1ce7b],kbd[data-v-24e1ce7b],samp[data-v-24e1ce7b]{font-family:monospace;font-size:inherit}small[data-v-24e1ce7b]{font-size:80%}sub[data-v-24e1ce7b],sup[data-v-24e1ce7b]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-24e1ce7b]{bottom:-.25em}sup[data-v-24e1ce7b]{top:-.5em}img[data-v-24e1ce7b]{border-style:none;vertical-align:bottom}embed[data-v-24e1ce7b],iframe[data-v-24e1ce7b],object[data-v-24e1ce7b]{border:0;vertical-align:bottom}button[data-v-24e1ce7b],input[data-v-24e1ce7b],optgroup[data-v-24e1ce7b],select[data-v-24e1ce7b],textarea[data-v-24e1ce7b]{-webkit-appearance:none;-moz-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;border:0;background:transparent;padding:0;margin:0;outline:0;border-radius:0;text-align:inherit}[type=checkbox][data-v-24e1ce7b]{-webkit-appearance:checkbox;-moz-appearance:checkbox;appearance:checkbox}[type=radio][data-v-24e1ce7b]{-webkit-appearance:radio;-moz-appearance:radio;appearance:radio}button[data-v-24e1ce7b],input[data-v-24e1ce7b]{overflow:visible}button[data-v-24e1ce7b],select[data-v-24e1ce7b]{text-transform:none}[type=button][data-v-24e1ce7b],[type=reset][data-v-24e1ce7b],[type=submit][data-v-24e1ce7b],button[data-v-24e1ce7b]{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}[type=button][disabled][data-v-24e1ce7b],[type=reset][disabled][data-v-24e1ce7b],[type=submit][disabled][data-v-24e1ce7b],button[disabled][data-v-24e1ce7b]{cursor:default}[type=button][data-v-24e1ce7b]::-moz-focus-inner,[type=reset][data-v-24e1ce7b]::-moz-focus-inner,[type=submit][data-v-24e1ce7b]::-moz-focus-inner,button[data-v-24e1ce7b]::-moz-focus-inner{border-style:none;padding:0}[type=button][data-v-24e1ce7b]:-moz-focusring,[type=reset][data-v-24e1ce7b]:-moz-focusring,[type=submit][data-v-24e1ce7b]:-moz-focusring,button[data-v-24e1ce7b]:-moz-focusring{outline:1px dotted ButtonText}fieldset[data-v-24e1ce7b],option[data-v-24e1ce7b]{padding:0}fieldset[data-v-24e1ce7b]{margin:0;border:0;min-width:0}legend[data-v-24e1ce7b]{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress[data-v-24e1ce7b]{vertical-align:baseline}textarea[data-v-24e1ce7b]{overflow:auto}[type=checkbox][data-v-24e1ce7b],[type=radio][data-v-24e1ce7b]{padding:0}[type=number][data-v-24e1ce7b]::-webkit-inner-spin-button,[type=number][data-v-24e1ce7b]::-webkit-outer-spin-button{height:auto}[type=search][data-v-24e1ce7b]{outline-offset:-2px}[type=search][data-v-24e1ce7b]::-webkit-search-decoration{-webkit-appearance:none}[data-v-24e1ce7b]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}label[for][data-v-24e1ce7b]{cursor:pointer}details[data-v-24e1ce7b]{display:block}summary[data-v-24e1ce7b]{display:list-item}table[data-v-24e1ce7b]{border-collapse:collapse;border-spacing:0}caption[data-v-24e1ce7b]{text-align:left}td[data-v-24e1ce7b],th[data-v-24e1ce7b]{vertical-align:top;padding:0}th[data-v-24e1ce7b]{text-align:left;font-weight:700}[hidden][data-v-24e1ce7b],template[data-v-24e1ce7b]{display:none}html[data-v-24e1ce7b]{--color-black:#222;--color-gray:#f2f2f2;--color-white:#eaeaea;--color-orange:#fd9e6e;--color-red:#ea4c41;--color-yellow:#e8c746;--color-green:#79ad58;--color-sky-blue:#5a9ea9;--color-blue:#1e4c80;--color-purple:#9d87b8;--color-pink:#ffc5c5}@font-face{font-family:"Helvetica neue";src:url(' +
          h +
          ') format("truetype");font-weight:300}@font-face{font-family:"Helvetica neue";src:url(' +
          f +
          ') format("truetype");font-weight:400}.copy p[data-v-24e1ce7b],.font-nav[data-v-24e1ce7b],body[data-v-24e1ce7b]{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif}.copy p[data-v-24e1ce7b],.font-nav[data-v-24e1ce7b]{font-size:14px;font-weight:300;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.copy p[data-v-24e1ce7b],.font-nav[data-v-24e1ce7b]{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-works-title[data-v-24e1ce7b]{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px}@media(max-width:1024px){.font-works-title[data-v-24e1ce7b]{font-size:80px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:500;line-height:90px;letter-spacing:1.4px;font-size:40px;line-height:110%}}.font-works-category[data-v-24e1ce7b]{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px}@media(max-width:1024px){.font-works-category[data-v-24e1ce7b]{font-size:24px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:1.4px;font-size:16px}}.font-underline[data-v-24e1ce7b]{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px}@media(max-width:1024px){.font-underline[data-v-24e1ce7b]{font-size:14px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;text-decoration:underline;letter-spacing:1.4px;line-height:17px;font-size:12px}}.font-about-title-one[data-v-24e1ce7b]{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px}@media(max-width:1024px){.font-about-title-one[data-v-24e1ce7b]{font-size:88px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;letter-spacing:4px;line-height:105px;font-size:28px;line-height:33.4px}}.font-about-title-second[data-v-24e1ce7b]{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px}@media(max-width:1024px){.font-about-title-second[data-v-24e1ce7b]{font-size:48px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:400;line-height:70px;letter-spacing:4px;font-size:20px}}.font-about-text[data-v-24e1ce7b]{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px}@media(max-width:1024px){.font-about-text[data-v-24e1ce7b]{font-size:12px;font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-weight:300;line-height:240%;letter-spacing:1.4px;font-size:10px;line-height:200%}}.font-about-text-second[data-v-24e1ce7b]{font-weight:400;font-size:10px;line-height:188%}.font-about-text-second[data-v-24e1ce7b],.font-menu[data-v-24e1ce7b]{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;letter-spacing:1px}.font-menu[data-v-24e1ce7b]{font-size:56px;font-weight:500;line-height:80%}html[data-v-24e1ce7b]{font-size:4px;background:#f2f2f2;background:var(--color-gray)}body[data-v-24e1ce7b],html[data-v-24e1ce7b]{min-height:100vh;min-height:var(--wh,100vh);overscroll-behavior:none}body *[data-v-24e1ce7b],html *[data-v-24e1ce7b]{color:#222;color:var(--color-black)}img[data-v-24e1ce7b]{-o-object-fit:cover;object-fit:cover}@media(max-width:1024px){.pc-only[data-v-24e1ce7b]{display:none!important}}@media(min-width:1025px){.sp-only[data-v-24e1ce7b]{display:none!important}}.scrollbar-track[data-v-24e1ce7b]{background:transparent!important}.scrollbar-track .scrollbar-thumb[data-v-24e1ce7b]{border-radius:0;background:#222;background:var(--color-black);transition:height .5s ease-in}.scrollbar-track-x[data-v-24e1ce7b]{height:1rem!important}.scrollbar-track-y[data-v-24e1ce7b]{width:1rem!important}.container[data-v-24e1ce7b]{min-height:100vh;min-height:var(--wh,100vh)}.index[data-v-24e1ce7b],.index>body[data-v-24e1ce7b],.index>body>body[data-v-24e1ce7b],.index>body>body>body[data-v-24e1ce7b],.index>body>body>body>body[data-v-24e1ce7b],.index>body>body>body>body>body[data-v-24e1ce7b]{overscroll-behavior:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;overflow:hidden}.copy[data-v-24e1ce7b]{width:100%;height:auto;padding-bottom:6rem}@media(min-width:1025px){.copy[data-v-24e1ce7b]{display:none}}.copy p[data-v-24e1ce7b]{width:100%;text-align:center}.move-text[data-v-24e1ce7b]{display:inline-block}.loading[data-v-24e1ce7b]{position:fixed;z-index:1000;width:100vw;background:#f2f2f2;background:var(--color-gray);cursor:progress}.loading[data-v-24e1ce7b],.loading__wrap[data-v-24e1ce7b]{height:100vh;height:var(--wh,100vh)}.loading__wrap[data-v-24e1ce7b]{max-width:1200px;width:100%;left:0;right:0;margin:auto;box-sizing:content-box;padding-left:60px;padding-right:60px;display:flex;justify-content:center;align-items:center;justify-content:flex-start}@media(max-width:1024px){.loading__wrap[data-v-24e1ce7b]{max-width:100%;padding-left:20px;padding-right:20px;box-sizing:border-box;justify-content:center}}.loading__wrap__progress[data-v-24e1ce7b]{width:-moz-fit-content;width:fit-content;justify-content:flex-end;height:10rem;display:flex;align-items:center;overflow-y:hidden}.loading__margin[data-v-24e1ce7b]{width:60vw;height:1px;background:#222;background:var(--color-black)}@media(max-width:1024px){.loading__margin[data-v-24e1ce7b]{width:0}}.loading__logo[data-v-24e1ce7b]{margin-right:8rem;overflow-y:hidden}@media(max-width:1024px){.loading__logo[data-v-24e1ce7b]{margin-right:4rem}}.loading__logo img[data-v-24e1ce7b]{width:74rem}@media(max-width:1024px){.loading__logo img[data-v-24e1ce7b]{width:50rem}}.loading__num[data-v-24e1ce7b]{font-family:"Helvetica neue","YakuHanJP","Noto Sans JP",san-selif;font-size:16px;font-weight:400;line-height:19px;letter-spacing:1.4px;align-self:flex-start}',
        "",
      ]),
        (e.exports = c);
    },
    298: function (e, t, o) {
      "use strict";
      o.r(t),
        o.d(t, "state", function () {
          return d;
        }),
        o.d(t, "actions", function () {
          return c;
        }),
        o.d(t, "mutations", function () {
          return h;
        });
      var n = o(8),
        r = (o(38), o(30), o(163), o(31), o(46), o(37), o(95)),
        l = o.n(r),
        d = function () {
          return { enterPage: "index", works: [], latestWorks: [], about: {} };
        },
        c = {
          nuxtServerInit: function (e) {
            return Object(n.a)(
              regeneratorRuntime.mark(function t() {
                var o;
                return regeneratorRuntime.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (o = e.dispatch), (t.next = 3), o("getWorks");
                      case 3:
                        return (t.next = 5), o("getAbout");
                      case 5:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )();
          },
          getWorks: function (e) {
            var t = this;
            return Object(n.a)(
              regeneratorRuntime.mark(function o() {
                var n, r, d, data, c, h;
                return regeneratorRuntime.wrap(function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        return (
                          (n = e.commit),
                          (r = {
                            headers: {
                              "X-API-KEY":
                                "c5932c7c-3da1-4e7b-83ec-d02a24b3e8e7",
                            },
                          }),
                          (o.next = 4),
                          t.$axios.get(
                            "/data/works.json",
                            r
                          )
                        );
                      case 4:
                        (d = o.sent),
                          (data = d.data),
                          (c = {
                            ホワイト: "--color-white",
                            オレンジ: "--color-orange",
                            レッド: "--color-red",
                            イエロー: "--color-yellow",
                            グリーン: "--color-green",
                            スカイブルー: "--color-sky-blue",
                            ブルー: "--color-blue",
                            パープル: "--color-purple",
                            ピンク: "--color-pink",
                          }),
                          (h = data.contents.map(function (e, t, o) {
                            var n = o.length - t,
                              r = {};
                            (r.total = o.length),
                              (r.id = e.id),
                              (r.title = e.title),
                              (r.num = ("000" + Number(n)).slice(-3)),
                              (r.created = e.created_day),
                              (r.client = e.client ? e.client : ""),
                              (r.viewUrl = e.url ? e.url : ""),
                              (r.viewUrlSite = e.url_site ? e.url_site : ""),
                              (r.description = e.description
                                ? e.description
                                : ""),
                              (r.status = e.status),
                              (r.createdNum =
                                l()(e.created_day).format("YYYYMMDD") +
                                e.id.slice(0, 2).toUpperCase());
                            var d =
                              void 0 === e.color[0] ? "ホワイト" : e.color[0];
                            return (
                              (r.color = c[d]),
                              (r.gallery = e.works.map(function (image, e) {
                                var t = {};
                                return (
                                  (t.url = image.picture.url),
                                  (t.ratio =
                                    image.picture.width <= image.picture.height
                                      ? "horizonal"
                                      : "vertical"),
                                  (t.width = image.picture.width),
                                  (t.height = image.picture.height),
                                  t
                                );
                              })),
                              r
                            );
                          })),
                          n("setWorks", h),
                          n("setLatestWorks", h);
                      case 10:
                      case "end":
                        return o.stop();
                    }
                }, o);
              })
            )();
          },
          getAbout: function (e) {
            var t = this;
            return Object(n.a)(
              regeneratorRuntime.mark(function o() {
                var n, r, l, data;
                return regeneratorRuntime.wrap(function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        return (
                          (n = e.commit),
                          (r = {
                            headers: {
                              "X-API-KEY":
                                "c5932c7c-3da1-4e7b-83ec-d02a24b3e8e7",
                            },
                          }),
                          (o.next = 4),
                          t.$axios.get(
                            "/data/about.json",
                            r
                          )
                        );
                      case 4:
                        (l = o.sent), (data = l.data), n("setAbout", data);
                      case 7:
                      case "end":
                        return o.stop();
                    }
                }, o);
              })
            )();
          },
        },
        h = {
          setWorks: function (e, t) {
            e.works = t;
          },
          setLatestWorks: function (e, t) {
            var o = t.slice(0, 10).map(function (e, t) {
              var o = e;
              return (o.index = t + 1), o;
            });
            e.latestWorks = o;
          },
          setAbout: function (e, t) {
            e.about = t;
          },
          setEnterPage: function (e, t) {
            e.enterPage = t;
          },
        };
    },
    331: function (e, t, o) {
      "use strict";
      o.r(t);
      o(30), o(19);
      var n = {
          data: function () {
            return { progress: { num: 0 }, hideToggle: !0 };
          },
          mounted: function () {
            this.loadingAnime();
          },
          created: function () {
            this.hideToggle = "index" === this.$route.name;
          },
          methods: {
            loadingAnime: function () {
              var e = this,
                t = this.$gsap.timeline();
              t.to(
                this.progress,
                {
                  duration: 6,
                  ease: "expo.in",
                  num: 98,
                  roundProps: "num",
                  onUpdate: function () {
                    e.progress.num++;
                  },
                },
                0
              ),
                t.set(".loading", { cursor: "default" }),
                t.to(".loading__move", {
                  y: "-100%",
                  duration: 1,
                  delay: 0.4,
                  ease: "expo.out",
                }),
                t.to(".loading", { opacity: 0, duration: 1 }),
                t.set(".loading", { display: "none" });
            },
          },
        },
        r = (o(296), o(53)),
        component = Object(r.a)(
          n,
          function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.hideToggle,
                    expression: "hideToggle",
                  },
                ],
                staticClass: "loading",
              },
              [
                t("div", { staticClass: "loading__wrap" }, [
                  e._m(0),
                  t("div", { staticClass: "loading__wrap__progress" }, [
                    t("small", { staticClass: "loading__num loading__move" }, [
                      e._v(e._s(("00" + e.progress.num).slice(-2))),
                    ]),
                  ]),
                ]),
              ]
            );
          },
          [
            function () {
              var e = this._self._c;
              return e("div", { staticClass: "loading__logo" }, [
                e("img", {
                  staticClass: "loading__move",
                  attrs: { src: "/logo-inline.png" },
                }),
              ]);
            },
          ],
          !1,
          null,
          "24e1ce7b",
          null
        );
      t.default = component.exports;
    },
  },
  [[240, 8, 2, 9]],
]);
