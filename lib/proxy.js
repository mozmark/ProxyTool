/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var {Cc,Ci} = require("chrome");

var prefManager = Cc["@mozilla.org/preferences-service;1"]
  .getService(Ci.nsIPrefBranch);

var PROXY_NONE=0;
var PROXY_MANUAL=1;
var PROXY_AUTO=2;
var PROXY_DETECT=4;
var PROXY_SYSTEM=5;

/*
 * Representation of a host and port; used in ProxyConfig for the proxies
 * configured for each protocol.
 */
function HostPort(host, port) {
  this.host = host;
  this.port = parseInt(port,10);
  this.toString = function() {
    return this.host+':'+this.port;
  };
}

HostPort.fromPrefs = function(hostpref, portpref) {
  var host = prefManager.getCharPref(hostpref);
  var port = prefManager.getIntPref(portpref);
  if(host && port) {
    if(host.length > 0 && parseInt(port) > 0) {
      return new HostPort(host,port);
    }
  }
  return null;
}

/*
 * A proxy configuration. Stores the type of proxy configuration (automatic,
 * manual, configured from PAC file, etc. as well as the configuration
 * information.
 */
function ProxyConfig() {
}

ProxyConfig.prototype= {
  type:PROXY_NONE,
};

ProxyConfig.prototype.toString = function() {
  return JSON.stringify(this);
}

var ProxyManager = {
  /*
   * Read a proxy config from firefox preferences.
   */
  readFromPreferences:function() {
    var config = new ProxyConfig();
    config.type = prefManager.getIntPref('network.proxy.type');
    var http = HostPort.fromPrefs('network.proxy.http','network.proxy.http_port');
    if (http) {
      config.http = http;
    }
    var ssl = HostPort.fromPrefs('network.proxy.ssl','network.proxy.ssl_port');
    if (ssl) {
      config.ssl = ssl;
    }
    var ftp = HostPort.fromPrefs('network.proxy.ftp','network.proxy.ftp_port');
    if (ftp) {
      config.ftp = ftp;
    }
    var socks = HostPort.fromPrefs('network.proxy.socks','network.proxy.socks_port');
    if (socks) {
      config.socks = socks;
    }
    var shareSettings = prefManager.getBoolPref('network.proxy.share_proxy_settings');
    if (shareSettings) {
      config.shareSettings = shareSettings;
    }
    var socksVersion = prefManager.getIntPref('network.proxy.socks_version');
    if (socksVersion) {
      config.socksVersion = socksVersion;
    }
    var proxyExcludes = prefManager.getCharPref('network.proxy.no_proxies_on');
    if (proxyExcludes) {
      config.proxyExcludes = proxyExcludes;
    }
    var autoConfigURL = prefManager.getCharPref('network.proxy.autoconfig_url');
    if (autoConfigURL) {
      config.autoConfigURL = autoConfigURL;
    }
    return config;
  },

  /*
   * Create a shared proxy configuration (e.g. localhost:8080 for all protocols.
   */
  sharedProxy:function(endpointString, excludes) {
    var strings = endpointString.split(':');
    var host = strings[0];
    var port = parseInt(strings[1]);
    var config = new ProxyConfig();
    config.type = PROXY_MANUAL;
    config.shareSetting = true;
    config.http = new HostPort(host,port);
    config.proxyExcludes = excludes;
    return config;
  },

  /*
   * Create a proxy config for a PAC configuration.
   */
  autoProxy:function(pacURL) {
    var config = new ProxyConfig();
    config.type = PROXY_AUTO;
    config.autoConfigURL = pacURL;
    return config;
  },

  /**
   * Apply a supplied config to the firefox preferences.
   */
  apply:function(config) {
    if(!config) {
      return;
    }
    // TODO: Do we need to back up the existing prefs to the
    // network.proxy.backup prefs at all? Check FX source for when this happens
    // and if we need to imitate this at all.
    if (config.type) {
      prefManager.setIntPref('network.proxy.type',config.type);
    }
    if (config.http) {
      prefManager.setCharPref('network.proxy.http',config.http.host);
      prefManager.setIntPref('network.proxy.http_port',config.http.port);
    }
    if (config.ftp) {
      prefManager.setCharPref('network.proxy.ftp',config.ftp.host);
      prefManager.setIntPref('network.proxy.ftp_port',config.ftp.port);
    }
    if (config.ssl) {
      prefManager.setCharPref('network.proxy.ssl',config.ssl.host);
      prefManager.setIntPref('network.proxy.ssl_port',config.ssl.port);
    }
    if (config.socks) {
      prefManager.setCharPref('network.proxy.socks',config.socks.host);
      prefManager.setIntPref('network.proxy.socks_port',config.socks.port);
    }
    if (config.shareSettings) {
      prefManager.setBoolPref('network.proxy.share_proxy_settings',
          config.shareSettings);
    }
    if (config.socksVersion) {
      prefManager.setIntPref('network.proxy.socks_version',
          config.socksVersion);
    }
    if (config.proxyExcludes) {
      prefManager.setCharPref('network.proxy.no_proxies_on',
          config.proxyExcludes);
    }
  }
};

exports.ProxyConfig = ProxyConfig;
exports.ProxyManager = ProxyManager;
