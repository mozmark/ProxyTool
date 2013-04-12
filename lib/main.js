/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const {Cu} = require("chrome");
const {ProxyConfig, ProxyManager} = require("./proxy");

Cu.import("resource:///modules/devtools/gcli.jsm");

// TODO actually write the command
gcli.addCommand({
  name: 'proxy',
  description: 'do stuff with proxy configuration',
  params: [
    {
      name: 'operation',
      type: 'string',
      description: 'The operation to peform'
    }
  ],
  returnType: 'string',
  exec: function(args, context) {
    if(args.operation && args.operation == 'show') {
      return ProxyManager.readFromPreferences().toString();
    }
    return 'unknown command';
  }
});
