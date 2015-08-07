/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

const ALARM_TOPIC = "lightbird:alarm-state-changed";

function LightbirdAlarmService() {
  this.wrappedJSObject = this;
}

LightbirdAlarmService.prototype = {
  classID: Components.ID("{31ac7753-5616-43c2-a770-bd8379374360}"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsISupports, Ci.nsIObserver])
};

LightbirdAlarmService.prototype.observe = function(aSubject, aTopic, aData) {
  let alarmService = Cc['@mozilla.org/calendar/alarm-service;1'].getService(Ci.calIAlarmService)
  alarmService.addObserver(gAlarmObserver);
};

LightbirdAlarmService.prototype.calendarWindowOpened = function() {
  Services.obs.notifyObservers(null, ALARM_TOPIC, "false");
  dump("calendarWindowOpened\n");
};

var gAlarmObserver = {
  onAlarm: function (aAlarmItem) {
    Services.obs.notifyObservers(null, ALARM_TOPIC, "true");
    dump("onAlarm\n");
  },

  onRemoveAlarmsByItem: function () {
    Services.obs.notifyObservers(null, ALARM_TOPIC, "false");
    dump("onRemoveAlarmsByItem\n");
  },

  onRemoveAlarmsByCalendar: function () {
    Services.obs.notifyObservers(null, ALARM_TOPIC, "false");
    dump("onRemoveAlarmsByCalendar\n");
  }
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([ LightbirdAlarmService ]);
