/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

var lightbirdObject = {
  biffElement: null,

  toCalendar: function() {
    toOpenWindowByType("calendarMainWindow", "chrome://lightbird/content/sunbird/calendar.xul");
  },

  onLoad: function () {
    let elem = document.getElementById("mini-cal");

    if (!elem)
      elem = document.getElementById("calendar-button");

    if (!elem)
      return

    lightbirdObject.biffElement = elem;

    let num = Components.classes["@lightbird/alarm-service;1"]
        .getService().wrappedJSObject.getAlarmsCount();

    lightbirdObject.setState(num);

    Services.obs.addObserver(lightbirdObject.obs, "lightbird:alarm-state-changed", false);
    addEventListener("unload", lightbirdObject.onUnload, false);
  },

  onUnload: function () {
    Services.obs.removeObserver(lightbirdObject.obs, "lightbird:alarm-state-changed", false);
  },

  obs: {
    observe: function (aSubject, aTopic, aData) {
      lightbirdObject.setState(aData);
    }
  },

  setState: function (aNum) {
    if (aNum > 0)
      lightbirdObject.biffElement.setAttribute("BiffState", "Alarm");
    else
      lightbirdObject.biffElement.removeAttribute("BiffState");
  }
};

addEventListener("load", lightbirdObject.onLoad, false);
