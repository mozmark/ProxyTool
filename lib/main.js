/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const {Cu} = require("chrome");
const {ProxyConfig, ProxyManager} = require("./proxy");
const {proxyStore} = require("./storage");

Cu.import("resource:///modules/devtools/gcli.jsm");

// Define supporting types:
// 

/**
 * 'endpoint' a gcli type for endpoints
 */
/*function EndpointType(typeSpec) {
}

EndpointType.prototype = Object.create(Type.prototype);

EndpointType.prototype.stringify = function(value, context) {
  if (value == null) {
    return '';
  }
  return value.toString();
};

EndpointType.prototype.parse = function(arg, context) {
  if (arg.text == null || arg.text === '') {
    return Promise.resolve(new Conversion(undefined, arg, Status.INCOMPLETE, ''));
  }
  return Promise.resolve(new Conversion(arg.text, arg));
};

EndpointType.prototype.name = 'endpoint';

exports.EndpointType = EndpointType;*/

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
    proxyStore.remove(args.profile);
    return 'deleted';
  }
});

gcli.addCommand({
  name: 'proxy list',
  description: 'list the available proxy configurations',
  params: [
  ],
  returnType: 'string',
  exec: function(args, context) {
    return proxyStore.list().join(', ');
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
    return proxyStore.fetch(args.profile).toString();
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
    },
    {
      name: 'excludes',
      type: 'string',
      description: 'comma separated list of hosts not to use a proxy for',
      defaultValue: 'localhost,127.0.0.1'
    }

    ],
    returnType: 'string',
    exec: function(args, content) {
      var config = ProxyManager.sharedProxy(args.endpoint, args.excludes);
      ProxyManager.apply(config);
      return 'ok';
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
      var config = ProxyManager.autoProxy(args.URL);
      ProxyManager.apply(config);
      return 'ok';
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
      var config = proxyStore.fetch(args.profile);
      ProxyManager.apply(config);
      return 'done';
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
    },
    {
      name: 'excludes',
      type: 'string',
      description: 'comma separated list of hosts not to use a proxy for',
      defaultValue: 'localhost,127.0.0.1'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      var config = ProxyManager.sharedProxy(args.endpoint, args.excludes);
      proxyStore.store(args.name, config);
      ProxyManager.apply(config);
      return 'ok';
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
      var config = ProxyManager.autoProxy(args.URL);
      proxyStore.store(args.name,config);
      return 'ok';
    }
});

gcli.addCommand({
  name: 'proxy add current',
    description: 'add an automatic proxy configuration via (PAC)',
    params: [
    {
      name: 'name',
      type: 'string',
      description: 'the name of the profile to add'
    }
    ],
    returnType: 'string',
    exec: function(args, content) {
      var current = ProxyManager.readFromPreferences();
      proxyStore.store(args.name, current);
      return 'ok, I think';
    }
});
