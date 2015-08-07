/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

const ALARM_TOPIC = "lightbird:alarm-state-changed";

var lightbirdObject = {
  minical: null,

  toCalendar: function() {
    toOpenWindowByType("calendarMainWindow", "chrome://$NAME/content/sunbird/calendar.xul");
  },

  onLoad: function () {
    lightbirdObject.minical = document.getElementById("mini-cal");

    if (Components.classes["@lightbird/alarm-service;1"].getService()
        .wrappedJSObject.isAlarming())
      lightbirdObject.minical.setAttribute("BiffState", "Alarm");

    Services.obs.addObserver(lightbirdObject.obs, ALARM_TOPIC, false);
  },

  onUnload: function () {
    Services.obs.removeObserver(lightbirdObject.obs, ALARM_TOPIC, false);
  },

  obs: {
    observe: function (aSubject, aTopic, aData) {
      let alarm = aData == "true";

      if (alarm)
        lightbirdObject.minical.setAttribute("BiffState", "Alarm");
      else
        lightbirdObject.minical.removeAttribute("BiffState");
    }
  }
};

addEventListener("load", lightbirdObject.onLoad, false);
addEventListener("unload", lightbirdObject.onUnload, false);
