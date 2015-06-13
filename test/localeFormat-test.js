var tape = require("tape"),
    format = require("../");

tape("localeFormat({decimal: decimal}) observes the specified decimal point", function(test) {
  test.equal(format.localeFormat({decimal: "|"})("06.2f")(2), "002|00");
  test.equal(format.localeFormat({decimal: "/"})("06.2f")(2), "002/00");
  test.end();
});

tape("localeFormat({currency: [prefix, suffix]}) observes the specified currency prefix and suffix", function(test) {
  test.equal(format.localeFormat({decimal: ".", currency: ["฿", ""]})("$06.2f")(2), "฿02.00");
  test.equal(format.localeFormat({decimal: ".", currency: ["", "฿"]})("$06.2f")(2), "02.00฿");
  test.end();
});

tape("localeFormat({grouping: null}) does not perform any grouping", function(test) {
  test.equal(format.localeFormat({decimal: ".", grouping: null})("012,.2f")(2), "000000002.00");
  test.end();
});

tape("localeFormat({grouping: [sizes…]}) observes the specified group sizes", function(test) {
  test.equal(format.localeFormat({decimal: ".", grouping: [3], thousands: ","})("012,.2f")(2), "0,000,002.00");
  test.equal(format.localeFormat({decimal: ".", grouping: [2], thousands: ","})("012,.2f")(2), "0,00,00,02.00");
  test.equal(format.localeFormat({decimal: ".", grouping: [2, 3], thousands: ","})("012,.2f")(2), "00,000,02.00");
  test.end();
});

tape("localeFormat({thousands: separator}) observes the specified group separator", function(test) {
  test.equal(format.localeFormat({decimal: ".", grouping: [3], thousands: " "})("012,.2f")(2), "0 000 002.00");
  test.equal(format.localeFormat({decimal: ".", grouping: [3], thousands: "/"})("012,.2f")(2), "0/000/002.00");
  test.end();
});