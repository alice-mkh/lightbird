/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is Netscape
 * Communications Corporation.  Portions created by Netscape are
 * Copyright (C) 1999 Netscape Communications Corporation.  All
 * Rights Reserved.
 *
 * Contributor(s):
 * Seth Spitzer <sspitzer@netscape.com>
 * Robert Ginda <rginda@netscape.com>
 */

/*
 * This file contains the following calendar related components:
 * 1. Command line handler service, for responding to the -calendar command line
 *    option. (CLineHandler)
 */

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

/* interafces used in this file */
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
CLineService.prototype.prefNameForStartup = "general.startup.calendar";
CLineService.prototype.chromeUrlForTask = "chrome://sunbird/content/calendar.xul";
CLineService.prototype.helpText = "Start with calendar";
CLineService.prototype.handlesArgs = false;
CLineService.prototype.defaultArgs = "";
CLineService.prototype.openWindowWithArgs = true;

/* nsICommandLineHandler */
CLineService.prototype.handle =
function handler_handle(cmdLine)
{
    if (cmdLine.handleFlag("calendar", false))
    {
        openWindow("chrome://sunbird/content/calendar.xul");
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
    dump("*** Registering -calendar handler.\n");

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
}

CalendarModule.unregisterSelf =
function(compMgr, fileSpec, location)
{
    compMgr = compMgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);

    compMgr.unregisterFactoryLocation(CLINE_SERVICE_CID,
                                      fileSpec);
    catman = Components.classes["@mozilla.org/categorymanager;1"]
                       .getService(nsICategoryManager);
    catman.deleteCategoryEntry("command-line-argument-handlers",
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
