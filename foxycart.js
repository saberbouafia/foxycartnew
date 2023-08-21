!(function (t, e) {
  var n = function (t) {
    return new i(t);
  };
  n.version = "0.1.3";
  var a = t.fxSetup || { rates: {}, base: "" };
  (n.rates = a.rates),
    (n.base = a.base),
    (n.settings = { from: a.from || n.base, to: a.to || n.base });
  var r = (n.convert = function (t, e) {
      if ("object" == typeof t && t.length) {
        for (var a = 0; a < t.length; a++) t[a] = r(t[a], e);
        return t;
      }
      (e = e || {}).from || (e.from = n.settings.from),
        e.to || (e.to = n.settings.to);
      a = e.to;
      var i = e.from,
        s = n.rates;
      if (((s[n.base] = 1), !s[a] || !s[i])) throw "fx error";
      return (
        t *
        (a = i === n.base ? s[a] : a === n.base ? 1 / s[i] : s[a] * (1 / s[i]))
      );
    }),
    i = function (t) {
      "string" == typeof t
        ? ((this._v = parseFloat(t.replace(/[^0-9-.]/g, ""))),
          (this._fx = t.replace(/([^A-Za-z])/g, "")))
        : (this._v = t);
    };
  ((a = n.prototype = i.prototype).convert = function () {
    var t = Array.prototype.slice.call(arguments);
    return t.unshift(this._v), r.apply(n, t);
  }),
    (a.from = function (t) {
      return ((t = n(r(this._v, { from: t, to: n.base })))._fx = n.base), t;
    }),
    (a.to = function (t) {
      return r(this._v, { from: this._fx ? this._fx : n.settings.from, to: t });
    }),
    "undefined" != typeof exports
      ? ("undefined" != typeof module &&
          module.exports &&
          (exports = module.exports = n),
        (exports.fx = fx))
      : "function" == typeof define && define.amd
      ? define([], function () {
          return n;
        })
      : ((n.noConflict = (function (e) {
          return function () {
            return (t.fx = e), (n.noConflict = undefined), n;
          };
        })(t.fx)),
        (t.fx = n));
})(this),
  (function (t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define([], t)
      : (("undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : this
        ).numberCurrencyFormat = t());
  })(function () {
    return (function t(e, n, a) {
      function r(s, o) {
        if (!n[s]) {
          if (!e[s]) {
            var c = "function" == typeof require && require;
            if (!o && c) return c(s, !0);
            if (i) return i(s, !0);
            var u = new Error("Cannot find module '" + s + "'");
            throw ((u.code = "MODULE_NOT_FOUND"), u);
          }
          var f = (n[s] = { exports: {} });
          e[s][0].call(
            f.exports,
            function (t) {
              return r(e[s][1][t] || t);
            },
            f,
            f.exports,
            t,
            e,
            n,
            a,
          );
        }
        return n[s].exports;
      }
      for (
        var i = "function" == typeof require && require, s = 0;
        s < a.length;
        s++
      )
        r(a[s]);
      return r;
    })(
      {
        1: [
          function (t, e, n) {
            "use strict";
            const a = "LEFT",
              r = "ALWAYS",
              i = "NEVER",
              s = "IF_NEEDED",
              o = "AS_IS",
              c = {
                currency: "",
                showDecimals: r,
                thousandSeparator: ",",
                decimalSeparator: ".",
                currencyPosition: "RIGHT",
                decimalsDigits: 2,
                spacing: !0,
                arithmeticalRounding: !1,
              };
            function u(t, e) {
              return void 0 !== t ? t : e;
            }
            function f(t) {
              return t
                ? {
                    currency: t.currency || c.currency,
                    thousandSeparator: u(
                      t.thousandSeparator,
                      c.thousandSeparator,
                    ),
                    decimalSeparator: u(t.decimalSeparator, c.decimalSeparator),
                    showDecimals: t.showDecimals || c.showDecimals,
                    decimalsDigits: u(t.decimalsDigits, c.decimalsDigits),
                    currencyPosition: t.currencyPosition || c.currencyPosition,
                    spacing: u(t.spacing, c.spacing),
                    arithmeticalRounding: u(
                      t.arithmeticalRounding,
                      c.arithmeticalRounding,
                    ),
                  }
                : c;
            }
            function l(t) {
              return /^[\.,]$/.test(t);
            }
            e.exports = {
              format: function (t, e) {
                const n = f(e),
                  c =
                    n.showDecimals === o
                      ? t.toString()
                      : parseFloat(
                          (n.arithmeticalRounding
                            ? (function (t, e) {
                                return +(Math.round(t + "e+" + e) + "e-" + e);
                              })(t, n.decimalsDigits)
                            : +t
                          ).toString(),
                        ).toFixed(n.showDecimals === i ? 0 : n.decimalsDigits);
                if (isNaN(c)) return t;
                const u = c.split("."),
                  l = u[0],
                  d = u[1] || "",
                  p =
                    n.showDecimals === r ||
                    (n.showDecimals === s && +d > 0) ||
                    (n.showDecimals === o && d.length > 0)
                      ? n.decimalSeparator + d
                      : "",
                  h =
                    ((m = l),
                    (g = n.thousandSeparator),
                    m.split("").reduce(function (t, e, n) {
                      return (
                        t +
                        e +
                        (n < m.length - 1 &&
                        (m.length - n - 1) % 3 == 0 &&
                        "-" !== e
                          ? g
                          : "")
                      );
                    }, "") + p);
                var m, g;
                if (n.currency) {
                  const t = n.spacing ? " " : "";
                  return n.currencyPosition === a
                    ? n.currency + t + h
                    : h + t + n.currency;
                }
                return h;
              },
              unformat: function (t, e) {
                const n = f(e),
                  a = e && e.decimalSeparator,
                  r = t
                    .replace(/\s/g, "")
                    .match(/[0-9]+|[^0-9]+/gi)
                    .map(function (t, e) {
                      return { value: t, isNumber: /[0-9]+/.test(t), index: e };
                    }),
                  i = r.filter(function (t) {
                    return t.isNumber;
                  }),
                  s = r.filter(function (t) {
                    return !t.isNumber;
                  }),
                  o = i[0],
                  c = i[i.length - 1],
                  u =
                    o.value > 0
                      ? o
                      : i.length > 1 && i[1].value > 0
                      ? i[1]
                      : void 0;
                if (!u) return 0;
                const d = u.index > 0 ? r[u.index - 1] : void 0,
                  p = d && 1 === s.length && l(d.value),
                  h = c.index - 1,
                  m = h >= 0 && r[h],
                  g = s
                    .filter(function (t) {
                      return t.index > o.index && t.index < h;
                    })
                    .map(function (t) {
                      return t.value;
                    }),
                  _ = g.length > 0 && g.indexOf(m.value) < 0,
                  y = m && m.value === a,
                  v = c.value.length === n.decimalsDigits && m && l(m.value),
                  x = (a ? y : v || y || p || _) ? c.value.length : 0,
                  b = d && d.value,
                  j = b && "-" === b[b.length - 1],
                  w = i
                    .map(function (t) {
                      return t.value;
                    })
                    .join("");
                return parseFloat(w / Math.pow(10, x)) * (j ? -1 : 1);
              },
            };
          },
          {},
        ],
      },
      {},
      [1],
    )(1);
  });
var FC = FC || {};
!(function (t, e) {
  var n = { version: 0.8 },
    r = /([{\|])p([+\-:])([\d\.]+)(?:\D{3})?([\|}])/,
    i = /^(\d+):/,
    s = !1,
    o = {
      base: "USD",
      sets: [],
      max_rate_cache: 12,
      rounding: "minimal",
      convert_display_only: !1,
      active_class: "active",
      use_openexchangerates: !1,
      adjust_price_display: null,
    };
  function c() {
    for (
      var t = e.json.shipping_address.country,
        n = "" == e.json.template_set ? "DEFAULT" : e.json.template_set,
        a = "DEFAULT",
        r = 0;
      r < settings.sets.length;
      r++
    )
      settings.sets[r].hasOwnProperty("countries") &&
        settings.sets[r].countries.indexOf(t) > -1 &&
        (a = settings.sets[r].template_set);
    F() || (O(), a == n) ? (m(), u()) : h(a);
  }
  function u(n) {
    var a = settings.sets
        .map(function (t, e) {
          return t.currency;
        })
        .filter(function (t, e, n) {
          return n.indexOf(t) === e;
        }),
      r = ((n = void 0 !== n && n), F());
    r.hasOwnProperty("rates") &&
    (Date.now() - r.rates.timestamp) / 60 <
      36e4 * parseFloat(settings.max_rate_cache) &&
    (n || r.fcsid == e.json.session_id)
      ? ((fx.rates = r.rates.rates), (fx.base = r.rates.base), d())
      : n ||
        (settings.use_openexchangerates
          ? t.getJSON(
              "https://openexchangerates.org/api/latest.json?app_id=" +
                settings.use_openexchangerates +
                "&prettyprint=false&symbols=" +
                a.join(","),
              function (t) {
                l(t.rates, t.base), d();
              },
            )
          : t.getJSON(
              "https://www.floatrates.com/daily/" + settings.base + ".json",
              function (t) {
                for (var e = {}, n = 0; n < a.length; n++)
                  (t.hasOwnProperty(a[n].toLowerCase()) ||
                    a[n] == settings.base) &&
                    (e[a[n]] =
                      a[n] == settings.base ? 1 : t[a[n].toLowerCase()].rate);
                l(e, settings.base), d();
              },
            ));
  }
  function l(t, e) {
    (fx.rates = t),
      (fx.base = e),
      O({ rates: t, base: e, timestamp: Date.now() });
  }
  function d() {
    var n = F();
    if (!n)
      return console.log("FC.currency: Unable to find locale information"), !1;
    var a = D(),
      i =
        e.json.item_count > 0
          ? e.json.locale_info.int_curr_symbol.trim()
          : n.locale.int_curr_symbol.trim(),
      s =
        e.json.item_count > 0
          ? e.json.locale_info.mon_decimal_point
          : n.locale.mon_decimal_point;
    t(".fc-currency-price").each(function () {
      var a,
        r = settings.base;
      t(this).data("fc-currency") &&
        ((r = t(this).data("fc-currency")), (a = s));
      var o = S(t(this).html(), a),
        c = o;
      r != i && (c = g((c = fx.convert(o, { from: r, to: i })))),
        t(this)
          .html(e.util.money_format(n.currency_format, _(c)).trim())
          .data("fc-currency", i)
          .show();
    }),
      t('form[action*="' + a + '"]').each(function () {
        var e = t(this).find('[name="price"], [name$=":price"]');
        if (0 == e.length) return !1;
        var n = settings.base;
        if (t(this).data("fc-currency")) n = t(this).data("fc-currency");
        else {
          var a = /([\d\.]+)([A-Z]{3})$/i,
            s = e.first().val().replace(" ", "");
          s.match(a);
          a.test(s) && (n = a.exec(s)[2].toUpperCase());
        }
        n != i &&
          (t(this)
            .find("[value*='{p'], [value*='|p']")
            .each(function () {
              var t = this.value.match(r);
              if (t) {
                var e = fx.convert(parseFloat(t[3]), { from: n, to: i });
                (e = g(e)),
                  settings.convert_display_only ||
                    (this.value = this.value.replace(
                      r,
                      "$1p$2" + e.toFixed(2) + i.toLowerCase() + "$4",
                    ));
              }
            }),
          e.each(function () {
            var t = S(this.value),
              e = fx.convert(t, { from: n, to: i });
            (e = g(e)),
              settings.convert_display_only ||
                (this.value = e.toFixed(2) + i.toLowerCase());
          }),
          t(this).data("fc-currency", i)),
          y();
      });
  }
  function h(t) {
    e.client
      .request(
        "https://" + e.json.config.store_domain + "/cart?template_set=" + t,
      )
      .done(function () {
        O(), c();
      });
  }
  function m() {
    for (
      var n = F(),
        a = !1,
        r =
          e.json.item_count > 0
            ? "" == e.json.template_set
              ? "DEFAULT"
              : e.json.template_set
            : n.template_set,
        i = 0;
      i < settings.sets.length;
      i++
    )
      settings.sets[i].template_set == r && (a = r);
    a &&
      (t("[data-fc-template-set]." + settings.active_class).removeClass(
        settings.active_class,
      ),
      t('[data-fc-template-set="' + a + '"]').addClass(settings.active_class));
  }
  function g(t) {
    var e =
      ["full", "half", "minimal", "none", !1].indexOf(settings.rounding) > -1
        ? settings.rounding
        : o.rounding;
    if ("full" == e) return Math.ceil(t);
    if ("half" == e) {
      var n = t % 1;
      return Math.floor(t) + (0 == n ? 0 : n <= 0.5 ? 0.5 : 1);
    }
    return "minimal" == e ? Math.ceil(20 * t) / 20 : t;
  }
  function _(t) {
    return "function" == typeof settings.adjust_price_display &&
      ((adjusted_price = settings.adjust_price_display(t)),
      void 0 !== adjusted_price)
      ? parseFloat(adjusted_price)
      : t;
  }
  function y() {
    (ADJUST = {}),
      t("input,select").off("change.foxy-dynamic-price"),
      t('form[action*="' + D() + '"]').each(function () {
        var e = t(this),
          n = "",
          a = { products: {} };
        t(this)
          .find(
            "[name='name'],[name^='name||'],[name$=':name'],[name*=':name||']",
          )
          .each(function () {
            var t = b(this.name),
              r = t ? t + ":" : "",
              i = S(
                e
                  .find("[name='" + r + "price'],[name^='" + r + "price||']")
                  .first()
                  .val(),
              ),
              s = {
                id: t,
                code: "",
                base_price: i || 0,
                quantity: 1,
                attributes: {},
                has_quantity: !1,
              },
              o = e.find(
                "[name='" + r + "quantity'],[name^='" + r + "quantity||']",
              ),
              c = e.find("[name='" + r + "code'],[name^='" + r + "code||']");
            if (
              (c.length > 0 &&
                ((s.code = v(c.first().val())), "" === n && (n = s.code)),
              o.length > 0)
            ) {
              var u = 0,
                f = j(o);
              ["select", "text", "hidden"].indexOf(f) > -1
                ? ((s.has_quantity = !0), (u = parseFloat(v(o.val()))))
                : ["radio", "checkbox"].indexOf(f) > -1 &&
                  ((s.has_quantity = !0),
                  1 == o.filter(":checked").length &&
                    (u = parseFloat(v(o.filter(":checked").val())))),
                isNaN(u) && (u = 0),
                (s.quantity = u);
            }
            a.products[t] = s;
          });
        e.attr("data-fc-form-code") && (n = e.attr("data-fc-form-code")),
          "" !== n &&
            (t(this)
              .find("input,select")
              .each(function () {
                var e = b(this.name),
                  i = (function (t) {
                    return x(t)[2];
                  })(this.name),
                  s = j(t(this));
                if ("quantity" != i)
                  if ("price" != i || "hidden" == s) {
                    if ("SELECT" == this.tagName) {
                      var o = !1;
                      t(this)
                        .children("option")
                        .each(function () {
                          this.value.search(r) > -1 && (o = !0);
                        }),
                        o &&
                          (t(this).data("fc-adjust-for", n),
                          (a.products[e].attributes[v(this.name)] = v(
                            this.value,
                          )),
                          t(this).on("change.foxy-dynamic-price", function () {
                            (ADJUST[t(this).data("fc-adjust-for")].products[
                              e
                            ].attributes[v(this.name)] = v(this.value)),
                              w();
                          }));
                    } else if (this.value.search(r) > -1)
                      switch (
                        (t(this).data("fc-adjust-for", n), t(this).attr("type"))
                      ) {
                        case "checkbox":
                          t(this).is(":checked")
                            ? (a.products[e].attributes[v(this.name)] = v(
                                this.value,
                              ))
                            : (a.products[e].attributes[v(this.name)] = ""),
                            t(this).on(
                              "change.foxy-dynamic-price",
                              function () {
                                t(this).is(":checked")
                                  ? (ADJUST[
                                      t(this).data("fc-adjust-for")
                                    ].products[e].attributes[v(this.name)] = v(
                                      this.value,
                                    ))
                                  : (ADJUST[
                                      t(this).data("fc-adjust-for")
                                    ].products[e].attributes[v(this.name)] =
                                      ""),
                                  w();
                              },
                            );
                          break;
                        case "radio":
                          a.products[e].attributes.hasOwnProperty(
                            v(this.name),
                          ) || (a.products[e].attributes[v(this.name)] = ""),
                            t(this).is(":checked") &&
                              (a.products[e].attributes[v(this.name)] = v(
                                this.value,
                              )),
                            t("[name='" + this.name + "']")
                              .data("fc-adjust-for", n)
                              .on("change.foxy-dynamic-price", function () {
                                (ADJUST[t(this).data("fc-adjust-for")].products[
                                  e
                                ].attributes[v(this.name)] = v(this.value)),
                                  w();
                              });
                      }
                  } else
                    t(this)
                      .data("fc-adjust-for", n)
                      .on("change.foxy-dynamic-price", function () {
                        var n = 0;
                        (["select", "text"].indexOf(s) > -1 ||
                          (["radio", "checkbox"].indexOf(s) > -1 &&
                            t(this).is(":checked"))) &&
                          (n = parseFloat(v(this.value))),
                          isNaN(n) && (n = 0),
                          (ADJUST[t(this).data("fc-adjust-for")].products[
                            e
                          ].base_price = n),
                          w();
                      });
                else
                  t(this)
                    .data("fc-adjust-for", n)
                    .on("change.foxy-dynamic-price", function () {
                      var n = 0;
                      (["select", "text"].indexOf(s) > -1 ||
                        (["radio", "checkbox"].indexOf(s) > -1 &&
                          t(this).is(":checked"))) &&
                        (n = parseFloat(v(this.value))),
                        isNaN(n) && (n = 0),
                        (ADJUST[t(this).data("fc-adjust-for")].products[
                          e
                        ].quantity = n),
                        w();
                    });
              }),
            (ADJUST[n] = a));
      }),
      (n._ADJUST = ADJUST),
      w();
  }
  function v(t) {
    return t.replace(/\|\|[\d\w]+(?:\|\|open)?$/, "");
  }
  function x(t) {
    return (t = v(t)).match(/(?:(\d+):)?(.*)/);
  }
  function b(t) {
    var e = x(t);
    return (
      i.test(this.name) && (prefix = parseInt(this.name.match(i)[0])),
      void 0 === e[1] ? 0 : parseInt(e[1])
    );
  }
  function j(t) {
    if ("SELECT" == t[0].tagName) return "select";
    if ("INPUT" == t[0].tagName)
      switch (t.attr("type").toLowerCase()) {
        case "text":
        case "number":
        case "tel":
          return "text";
        default:
          return t.attr("type").toLowerCase();
      }
  }
  function w() {
    for (f in ADJUST) {
      var n = 0,
        i = 0;
      for (p in ADJUST[f].products) {
        var s = ADJUST[f].products[p].base_price,
          o = 0;
        for (a in ADJUST[f].products[p].attributes) {
          var c = ADJUST[f].products[p].attributes[a].match(r);
          if (c)
            switch (c[2]) {
              case ":":
                s = parseFloat(c[3]);
                break;
              case "+":
                o += parseFloat(c[3]);
                break;
              case "-":
                o -= parseFloat(c[3]);
            }
        }
        (s += o),
          (n += s *= ADJUST[f].products[p].quantity),
          (i += ADJUST[f].products[p].quantity);
      }
      "function" == typeof fcFormatPrice && (n = fcFormatPrice(n, f)),
        "function" == typeof fcFormatQuantity && (i = fcFormatQuantity(i, f));
      var u = F(),
        l = e.util.money_format(u.currency_format, _(n)).trim();
      t("." + f + "_total, ." + f + "-total").html(l),
        t("." + f + "_total_quantity, ." + f + "-total-quantity").html(i);
    }
  }
  function D() {
    var t = F();
    return e.json.hasOwnProperty("config")
      ? e.json.config.store_domain
      : t
      ? t.store_domain
      : ".foxycart.com";
  }
  function S(t, e) {
    try {
      var n = {};
      return e && (n.decimalSeparator = e), numberCurrencyFormat.unformat(t, n);
    } catch (t) {
      return !1;
    }
  }
  function O(t) {
    var n = F(),
      a = Object.assign({}, n);
    (n && "" == e.json.template_set && void 0 !== t) ||
      Object.assign(a, {
        fcsid: e.json.session_id,
        store_domain: e.json.config.store_domain,
        template_set:
          "" == e.json.template_set ? "DEFAULT" : e.json.template_set,
        locale: e.json.locale_info,
        currency_format: e.json.config.currency_format,
      }),
      "object" == typeof t && Object.assign(a, { rates: t }),
      localStorage.setItem("fc_currency_config", JSON.stringify(a));
  }
  function F() {
    var t = JSON.parse(localStorage.getItem("fc_currency_config"));
    return (
      !(
        null === t ||
        (e.hasOwnProperty("json") &&
          e.json.hasOwnProperty("session_id") &&
          t.fcsid !== e.json.session_id)
      ) && t
    );
  }
  e.hasOwnProperty("util") ||
    ((e.util = {}),
    (e.util.money_format = function (t, n) {
      if ("number" != typeof n) return null;
      var a = e.json.locale_info;
      return t.replace(
        /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in%])/g,
        function (t, r, i, s, o, c, u, f, l) {
          if (((t = u = ""), "%" === l)) return "%";
          (u = r && /=./.test(r) ? r.match(/=(.)/)[1] : " "),
            (o = !r || -1 === r.indexOf("!")),
            (s = parseInt(s, 10) || 0),
            (i = 0 > n) && (n = -n),
            (f =
              "" === f || void 0 === f
                ? "i" === l
                  ? a.int_frac_digits
                  : a.frac_digits
                : parseInt(f, 10));
          var d = (n = (n = e.util.round(n, f)).toFixed(f)).indexOf(".");
          (f = -1 !== d ? n.slice(0, d) : n),
            (d = -1 !== d ? n.slice(d + 1) : "");
          var p = function (t, e, n) {
              return (t = t.split("")).splice(e, 0, n), t.join("");
            },
            h = f.length,
            m = h < (c = parseInt(c, 10));
          if (m) {
            var g = c - h;
            f = Array(g + 1).join(u) + f;
          }
          if (-1 === r.indexOf("^")) {
            if (((c = a.mon_thousands_sep), (h = a.mon_grouping)[0] < f.length))
              for (
                var _ = 0, y = f.length;
                _ < h.length && !(0 >= (y -= h[_]));
                _++
              )
                m && y < g && (c = u), (f = p(f, y, c));
            if (0 < h[_ - 1])
              for (; y > h[_ - 1]; )
                (y -= h[_ - 1]), m && y < g && (c = u), (f = p(f, y, c));
          }
          if (
            ((u = d ? f + a.mon_decimal_point + d : f),
            (g = ""),
            o && (g = "i" === l ? a.int_curr_symbol : a.currency_symbol),
            (l = i ? a.n_sign_posn : a.p_sign_posn),
            (_ = i ? a.n_sep_by_space : a.p_sep_by_space),
            (y = i ? a.n_cs_precedes : a.p_cs_precedes),
            -1 !== r.indexOf("("))
          )
            (t =
              (y ? g + (1 === _ ? " " : "") : "") +
              u +
              (y ? "" : (1 === _ ? " " : "") + g)),
              (t = i ? "(" + t + ")" : " " + t + " ");
          else
            switch (
              ((c = a.positive_sign),
              (o = a.negative_sign),
              (f = i ? o : c),
              (d = ""),
              l && (d = Array((i ? c : o).length - f.length + 1).join(" ")),
              l)
            ) {
              case 0:
                t =
                  "(" +
                  (y
                    ? g + (1 === _ ? " " : "") + u
                    : u + (1 === _ ? " " : "") + g) +
                  ")";
                break;
              case 1:
                t =
                  d +
                  f +
                  (2 === _ ? " " : "") +
                  (y
                    ? g + (1 === _ ? " " : "") + u
                    : u + (1 === _ ? " " : "") + g);
                break;
              case 2:
                t =
                  (y
                    ? g + (1 === _ ? " " : "") + u
                    : u + (1 === _ ? " " : "") + g) +
                  (2 === _ ? " " : "") +
                  f +
                  d;
                break;
              case 3:
                t = y
                  ? d + f + (2 === _ ? " " : "") + g + (1 === _ ? " " : "") + u
                  : u + (1 === _ ? " " : "") + f + d + (2 === _ ? " " : "") + g;
                break;
              case 4:
                t = y
                  ? g + (2 === _ ? " " : "") + d + f + (1 === _ ? " " : "") + u
                  : u + (1 === _ ? " " : "") + g + (2 === _ ? " " : "") + f + d;
            }
          return (
            0 < (s -= t.length) &&
              ((s = Array(s + 1).join(" ")),
              (t = -1 !== r.indexOf("-") ? t + s : s + t)),
            t
          );
        },
      );
    }),
    (e.util.round = function (t, e) {
      var n = Math.pow(10, e);
      return (
        5 <= (10 * t * n) % 10 && (t += 1 / (10 * n)), Math.round(t * n) / n
      );
    })),
    (n.update = function () {
      (settings = e.hasOwnProperty("currency_config")
        ? Object.assign({}, o, e.currency_config)
        : Object.assign({}, o)),
        (s = e.hasOwnProperty("session") && !0 === e.session.initialized);
      var t = F();
      !t ||
        (e.hasOwnProperty("json") && 0 != e.json.item_count) ||
        (e.hasOwnProperty("json") || (e.json = {}),
        (e.json.currency_format = t.currency_format),
        (e.json.locale_info = t.locale),
        (e.json.item_count = 0)),
        ((t && !s) || s) &&
          (settings.sets.length > 1
            ? s
              ? c()
              : (m(), u(!0))
            : (t || O(), y()));
    });
  var A = "function" == typeof e.onLoad ? e.onLoad : function () {};
  (e.onLoad = function () {
    e.client.on("ready.done", n.update), A();
  }),
    t(function () {
      n.update(),
        t("body").on("click", "[data-fc-template-set]", function (e) {
          var n = (function (t) {
            for (var e = !1, n = 0; n < settings.sets.length; n++)
              settings.sets[n].template_set == t && (e = settings.sets[n]);
            return e;
          })(t(this).attr("data-fc-template-set"));
          n && (e.preventDefault(), s && h(n.template_set));
        });
    }),
    (e.currency = n);
})(jQuery, FC);
