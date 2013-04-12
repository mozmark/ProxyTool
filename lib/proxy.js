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
   * Read a proxy config from firefox preferences
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
    return config;
  },
};

exports.ProxyConfig = ProxyConfig;
exports.ProxyManager = ProxyManager;
