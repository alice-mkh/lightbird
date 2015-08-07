/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

const ALARM_TOPIC = "lightbird:alarm-state-changed";

var gAlarming = false;

function LightbirdAlarmService() {
  this.wrappedJSObject = this;
}

LightbirdAlarmService.prototype = {
  classID: Components.ID("{31ac7753-5616-43c2-a770-bd8379374360}"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsISupports, Ci.nsIObserver])
};

LightbirdAlarmService.prototype.observe = function(aSubject, aTopic, aData) {
  Services.obs.addObserver(gCalStartupObserver, "calendar-startup-done", false);
};

LightbirdAlarmService.prototype.calendarWindowOpened = function() {
  notify(false);
};

LightbirdAlarmService.prototype.isAlarming = function() {
  return gAlarming;
}

var gCalStartupObserver = {
  observe: function(aSubject, aTopic, aData) {
    let alarmService = Cc['@mozilla.org/calendar/alarm-service;1'].getService(Ci.calIAlarmService);
    alarmService.startup();
    alarmService.addObserver(gAlarmObserver);
  }
};

var gAlarmObserver = {
  onAlarm: function (aAlarmItem) {
    notify(true);
  },

  onRemoveAlarmsByItem: function () {
    notify(false);
  },

  onRemoveAlarmsByCalendar: function () {
    notify(false);
  }
};

function notify(aAlarming) {
  gAlarming = aAlarming;
  Services.obs.notifyObservers(null, ALARM_TOPIC, aAlarming);
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([ LightbirdAlarmService ]);
