/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

const ALARM_TOPIC = "lightbird:alarm-state-changed";

var gAlarms = [];

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

LightbirdAlarmService.prototype.calendarWindowFocused = function() {
  // Opening or even focusing calendar should always reset the biff state
  gAlarms = [];

  notify();
};

LightbirdAlarmService.prototype.getAlarmsCount = function() {
  return gAlarms.length;
}

var gCalStartupObserver = {
  observe: function(aSubject, aTopic, aData) {
    let alarmService = Cc['@mozilla.org/calendar/alarm-service;1'].getService(Ci.calIAlarmService);
    alarmService.startup();
    alarmService.addObserver(gAlarmObserver);
  }
};

var gAlarmObserver = {
  onAlarm: function (aItem, aAlarm) {
    if (aAlarm.action != "DISPLAY")
      // This monitor only looks for DISPLAY alarms.
      return;

    gAlarms.push([aItem, aAlarm]);

    notify();
  },

  onRemoveAlarmsByItem: function (aItem) {
    gAlarms = gAlarms.filter(itemAlarm => {
      let [thisItem, alarm] = itemAlarm;
      return (aItem.hashId != thisItem.hashId);
    });

    notify();
  },

  onRemoveAlarmsByCalendar: function (aCalendar) {
    gAlarms = gAlarms.filter(itemAlarm => {
      let [thisItem, alarm] = itemAlarm;
      return (aCalendar.id != thisItem.calendar.id);
    });

    notify();
  },

  onAlarmsLoaded: function (aCalendar) {
  }
};

function notify() {
  Services.obs.notifyObservers(null, ALARM_TOPIC, gAlarms.length);
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([ LightbirdAlarmService ]);
