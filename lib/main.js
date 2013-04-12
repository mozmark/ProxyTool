/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const {Cu} = require("chrome");
const {ProxyConfig, ProxyManager} = require("./proxy");

Cu.import("resource:///modules/devtools/gcli.jsm");

// TODO actually write the command
/**
 * 'proxy' command.
 */
gcli.addCommand({
  name: "proxy",
  description: 'Configure proxy settings'
});

gcli.addCommand({
  name: 'proxy delete',
  description: 'delete a proxy configuration',
  params: [
    {
      name: 'profile',
      type: 'string',
      description: 'The name of the profile to delete',
    }
  ],
  returnType: 'string',
  exec: function(args, context) {
    if(args.profile && args.profile == 'default') {
      // TODO learn what to do with errors in gcli
      return 'you cannot delete the default profile';
    }
    return 'this will delete something at some point';
  }
});


gcli.addCommand({
  name: 'proxy show',
  description: 'show a proxy configuration',
  params: [
    {
      name: 'profile',
      type: 'string',
      description: 'The name of the profile to show',
      defaultValue: 'default'
    }
  ],
  returnType: 'string',
  exec: function(args, context) {
    if(args.profile && args.profile == 'default') {
      return ProxyManager.readFromPreferences().toString();
    }
    return 'This bit has not been written yet';
  }
});

gcli.addCommand({
  name: "proxy use",
  description: 'Use a proxy configuration'
});

gcli.addCommand({
  name: 'proxy use manual',
    description: 'use a proxy manual proxy configuration',
    params: [
    {
      name: 'http endpoint',
      type: 'string',
      description: 'the host and port of the http proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'ssl endpoint',
      type: 'string',
      description: 'the host and port of the ssl proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'ftp endpoint',
      type: 'string',
      description: 'the host and port of the ftp proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'socks endpoint',
      type: 'string',
      description: 'the host and port of the socks proxy endpoint (e.g. localhost:8080)'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: 'proxy use shared',
    description: 'use a proxy configuration for a single endpoint shared for all protocols',
    params: [
    {
      name: 'endpoint',
      type: 'string',
      description: 'the host and port of the endpoint (e.g. localhost:8080)'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: 'proxy use auto',
    description: 'use an automatic proxy configuration via (PAC)',
    params: [
    {
      name: 'URL',
      type: 'string',
      description: 'the URL of the PAC'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: 'proxy use config',
    description: 'use an automatic proxy configuration via (PAC)',
    params: [
    {
      name: 'profile',
      type: 'string',
      description: 'the profile to use'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: "proxy add",
  description: 'Add a proxy configuration'
});

gcli.addCommand({
  name: 'proxy add manual',
    description: 'add a proxy manual proxy configuration',
    params: [
    {
      name: 'name',
      type: 'string',
      description: 'the name of the profile to add'
    },
    {
      name: 'http endpoint',
      type: 'string',
      description: 'the host and port of the http proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'ssl endpoint',
      type: 'string',
      description: 'the host and port of the ssl proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'ftp endpoint',
      type: 'string',
      description: 'the host and port of the ftp proxy endpoint (e.g. localhost:8080)'
    },
    {
      name: 'socks endpoint',
      type: 'string',
      description: 'the host and port of the socks proxy endpoint (e.g. localhost:8080)'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: 'proxy add shared',
    description: 'add a proxy configuration for a single endpoint shared for all protocols',
    params: [
    {
      name: 'name',
      type: 'string',
      description: 'the name of the profile to add'
    },
    {
      name: 'endpoint',
      type: 'string',
      description: 'the host and port of the endpoint (e.g. localhost:8080)'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});

gcli.addCommand({
  name: 'proxy add auto',
    description: 'add an automatic proxy configuration via (PAC)',
    params: [
    {
      name: 'name',
      type: 'string',
      description: 'the name of the profile to add'
    },
    {
      name: 'URL',
      type: 'string',
      description: 'the URL of the PAC'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      return 'This bit has not been written yet';
    }
});
