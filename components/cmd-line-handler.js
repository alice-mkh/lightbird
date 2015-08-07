/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

function CalendarCmdLineHandler() {}

CalendarCmdLineHandler.prototype = {
  classID: Components.ID("{4af82fb4-8942-4644-874d-f768a149b4f3}"),
  QueryInterface: XPCOMUtils.generateQI([ Ci.nsICommandLineHandler ]),

  handle: function (aCmdLine) {
    if (aCmdLine.handleFlag("calendar", false)) {
      Services.ww.openWindow(null, "chrome://$NAME/content/sunbird/calendar.xul",
        "_blank", null, null);
      aCmdLine.preventDefault = true;
    }
  },

  helpInfo: "  -calendar            Open Calendar.\n"
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([ CalendarCmdLineHandler ]);
