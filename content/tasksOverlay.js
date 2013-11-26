/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

function toCalendar() {
    toOpenWindowByType("calendarMainWindow", "chrome://$NAME/content/sunbird/calendar.xul");
}

const calendarAlertObserver = {
    observe: function(subject, topic, data) {
        if (topic != "nsPref:changed" || data != "tempNotification"){
            return;
        }
        var minical = document.getElementById("mini-cal");
        if (!minical){
            return;
        }
        let b = Services.prefs.getBoolPref("extensions.lightbird."+data);
        if (b){
            minical.setAttribute("BiffState", "Alarm");
        }else{
            minical.removeAttribute("BiffState");
        }
    },

    onAlarmsLoaded: function onAlarmdLoaded() {},

    onAlarm: function onAlarm(aAlarmItem) {
        Services.prefs.setBoolPref("extensions.lightbird.tempNotification", true);
    },

    onRemoveAlarmsByItem: function onRemoveAlarmsByItem() {
        Services.prefs.setBoolPref("extensions.lightbird.tempNotification", false);
    },

    onRemoveAlarmsByCalendar: function onRemoveAlarmsByCalendar() {
        Services.prefs.setBoolPref("extensions.lightbird.tempNotification", false);
    }
};

function lightbirdOnLoad() {
    let prefs = Services.prefs.getBranch("extensions.lightbird.");
    let alarmService = Components.classes['@mozilla.org/calendar/alarm-service;1']
                       .getService(Components.interfaces.calIAlarmService);
    alarmService.addObserver(calendarAlertObserver);

    prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    prefs.addObserver("", calendarAlertObserver, false);
    calendarAlertObserver.observe("", "nsPref:changed", "tempNotification");

    addEventListener("unload", lightbirdOnUnload, false);
}

function lightbirdOnUnload() {
    let prefs = Services.prefs.getBranch("extensions.lightbird.");
    let alarmService = Components.classes['@mozilla.org/calendar/alarm-service;1']
                       .getService(Components.interfaces.calIAlarmService);
    alarmService.removeObserver(calendarAlertObserver);
    prefs.removeObserver("", calendarAlertObserver);
}

addEventListener("load", lightbirdOnLoad, false);
