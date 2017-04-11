# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

<commandset id="commands"/>
<commandset id="baseMenuCommandSet"/>

<keyset id="newKeys">
  <key id="key_newBlankPage"/>
<!-- Conflicts with new event -->
<!--   <key id="key_newNavigator"/> -->
  <key id="key_newPrivateWindow"/>
  <key id="key_newMessage"/>
</keyset>
<keyset id="baseMenuKeyset"/>

<commandset id="tasksCommands">
  <command id="cmd_newNavigator"/>
  <command id="cmd_newPrivateWindow"/>
  <command id="cmd_newEditor"/>
</commandset>

<stringbundleset id="stringbundleset">
  <stringbundle id="bundle_brand"
                src="chrome://branding/locale/brand.properties"/>
  <stringbundle id="bundle_viewApplyTheme"/>
</stringbundleset>
