/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

const ALARM_TOPIC = "lightbird:alarm-state-changed";

var lightbirdObject = {
  toCalendar: function() {
    toOpenWindowByType("calendarMainWindow", "chrome://$NAME/content/sunbird/calendar.xul");
  },

  onLoad: function () {
    Services.obs.addObserver(lightbirdObject.obs, ALARM_TOPIC, false);
  },

  onUnload: function () {
    Services.obs.removeObserver(lightbirdObject.obs, ALARM_TOPIC, false);
  },

  obs: {
    observe: function (aSubject, aTopic, aData) {
      let alarm = aData == "true";
      let minical = document.getElementById("mini-cal");

      if (alarm)
        minical.setAttribute("BiffState", "Alarm");
      else
        minical.removeAttribute("BiffState");
    }
  }
};

addEventListener("load", lightbirdObject.onLoad, false);
addEventListener("unload", lightbirdObject.onUnload, false);
