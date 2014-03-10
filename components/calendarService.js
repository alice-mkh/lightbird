/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* components defined in this file */
const CLINE_SERVICE_CONTRACTID =
    "@mozilla.org/commandlinehandler/general-startup;1?type=calendar";
const CLINE_SERVICE_CID =
    Components.ID("{4af82fb4-8942-4644-874d-f768a149b4f3}");

/* components used in this file */
const MEDIATOR_CONTRACTID =
    "@mozilla.org/appshell/window-mediator;1";
const STANDARDURL_CONTRACTID =
    "@mozilla.org/network/standard-url;1";
const ASS_CONTRACTID =
    "@mozilla.org/appshell/appShellService;1";

/* interfaces used in this file */
const nsIWindowMediator  = Components.interfaces.nsIWindowMediator;
const nsICommandLineHandler = Components.interfaces.nsICommandLineHandler;
const nsICmdLineHandler  = Components.interfaces.nsICmdLineHandler;
const nsICategoryManager = Components.interfaces.nsICategoryManager;
const nsIContentHandler  = Components.interfaces.nsIContentHandler;
const nsIProtocolHandler = Components.interfaces.nsIProtocolHandler;
const nsIURI             = Components.interfaces.nsIURI;
const nsIStandardURL     = Components.interfaces.nsIStandardURL;
const nsIChannel         = Components.interfaces.nsIChannel;
const nsIRequest         = Components.interfaces.nsIRequest;
const nsIAppShellService = Components.interfaces.nsIAppShellService;
const nsISupports        = Components.interfaces.nsISupports;

/* Command Line handler service */
function CLineService()
{}

/* nsISupports */
CLineService.prototype.QueryInterface =
function handler_QI(iid)
{
    if (iid.equals(nsISupports))
        return this;

    if (nsICmdLineHandler && iid.equals(nsICmdLineHandler))
        return this;

    if (nsICommandLineHandler && iid.equals(nsICommandLineHandler))
        return this;

    throw Components.results.NS_ERROR_NO_INTERFACE;
}

CLineService.prototype.commandLineArgument = "-calendar";
CLineService.prototype.prefNameForStartup = "$PREF_STARTUP";
CLineService.prototype.chromeUrlForTask = "chrome://$NAME/content/sunbird/calendar.xul";
CLineService.prototype.helpText = "Start with calendar";
CLineService.prototype.handlesArgs = true;
CLineService.prototype.defaultArgs = "";
CLineService.prototype.openWindowWithArgs = true;

/* nsICommandLineHandler */
CLineService.prototype.handle =
function handler_handle(cmdLine)
{
    if (cmdLine.handleFlag("calendar", false))
    {
        openWindow("chrome://$NAME/content/sunbird/calendar.xul");
        cmdLine.preventDefault = true;
    }
}

function openWindow(uri, features )
{
  var wmClass = Components.classes[MEDIATOR_CONTRACTID];
  var windowManager = wmClass.getService(nsIWindowMediator);

  var assClass = Components.classes[ASS_CONTRACTID];
  var ass = assClass.getService(nsIAppShellService);
  hiddenWin = ass.hiddenDOMWindow;

  var window = hiddenWin;
  // open the requested window, but block it until it's fully loaded
  function newWindowLoaded(event)
  {
    // make sure that this handler is called only once
    window.removeEventListener("unload", newWindowLoaded, false);
    window[uri].removeEventListener("load", newWindowLoaded, false);
    delete window[uri];
  }
  // remember the newly loading window until it's fully loaded
  // or until the current window passes away
  window[uri] = window.openDialog(uri, "", features || "non-private,all,dialog=no");
  window[uri].addEventListener("load", newWindowLoaded, false);
  window.addEventListener("unload", newWindowLoaded, false);
}

CLineService.prototype.helpInfo =
 "  -calendar  Start with calendar\n"

/* factory for command line handler service (CLineService) */
var CLineFactory = new Object();

CLineFactory.createInstance =
function (outer, iid) {
    if (outer != null)
        throw Components.results.NS_ERROR_NO_AGGREGATION;

    return new CLineService().QueryInterface(iid);
}

var CalendarModule = new Object();

CalendarModule.registerSelf =
function (compMgr, fileSpec, location, type)
{
//    dump("*** Registering -calendar handler.\n");

    compMgr = compMgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);

    compMgr.registerFactoryLocation(CLINE_SERVICE_CID,
                                    "Calendar CommandLine Service",
                                    CLINE_SERVICE_CONTRACTID,
                                    fileSpec,
                                    location,
                                    type);

    catman = Components.classes["@mozilla.org/categorymanager;1"]
                       .getService(nsICategoryManager);
    catman.addCategoryEntry("command-line-argument-handlers",
                            "calendar command line handler",
                            CLINE_SERVICE_CONTRACTID, true, true);
    catman.addCategoryEntry("command-line-handler",
                            "m-calendar",
                            CLINE_SERVICE_CONTRACTID, true, true);
}

CalendarModule.unregisterSelf =
function(compMgr, fileSpec, location)
{
    compMgr = compMgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);

    compMgr.unregisterFactoryLocation(CLINE_SERVICE_CID,
                                      fileSpec);
    var catman = Components.classes["@mozilla.org/categorymanager;1"]
                       .getService(nsICategoryManager);
    catman = Components.classes["@mozilla.org/categorymanager;1"]
                       .getService(nsICategoryManager);
    catman.deleteCategoryEntry("command-line-argument-handlers",
                               CLINE_SERVICE_CONTRACTID, true);
    catman.deleteCategoryEntry("m-calendar",
                               CLINE_SERVICE_CONTRACTID, true);
}

CalendarModule.getClassObject =
function (compMgr, cid, iid) {
    if (cid.equals(CLINE_SERVICE_CID))
        return CLineFactory;

    if (!iid.equals(Components.interfaces.nsIFactory))
        throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

    throw Components.results.NS_ERROR_NO_INTERFACE;

}

CalendarModule.canUnload =
function(compMgr)
{
    return true;
}

/* entrypoint */
function NSGetModule(compMgr, fileSpec) {
    return CalendarModule;
}

function NSGetFactory(cid)
{
    return CalendarModule.getClassObject(null, cid, null);
}
