/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

if (Services.prefs.getBoolPref("extensions.lightbird.disableLightningUI")){
    window.removeEventListener("load", ltnOnLoad, false);
    window.removeEventListener("load", checkOld, false);
    window.removeEventListener("select", LtnObserveDisplayDeckChange, true);
    window.removeEventListener("unload", ltnFinish, false);
    if (lightbirdOverlayMode == 1){
        window.removeEventListener("load", prepareCalendarUnifinder, false);
        window.removeEventListener("unload", finishCalendarUnifinder, false);
        window.removeEventListener("load", taskViewOnLoad, false);
        window.removeEventListener("load", TodayPane.onLoad, false);
        window.removeEventListener("unload", TodayPane.onUnload, false);
    }
    window.removeEventListener("resize", onCalendarViewResize, true);
}
