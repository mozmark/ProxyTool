const{ProxyConfig} = require('./proxy');

function ProxyStore() {
  this.ss = require("simple-storage");
  if(!this.ss.storage.profiles) {
    this.ss.storage.profiles = [];
  }
}

ProxyStore.prototype = {
  store:function(name, data) {
    this.ss.storage.profiles[name] = JSON.stringify(data);
    console.log('stored data as '+name);
    console.log('data is '+this.ss.storage.profiles[name]);
  },
  fetch:function(name) {
    console.log('attempting to fetch '+name);
    console.log('data is '+this.ss.storage.profiles[name]);
    var data = JSON.parse(this.ss.storage.profiles[name]);
    data.__proto__ = ProxyConfig.prototype;
    return data;
  },
  remove:function(name) {
    delete this.ss.storage.profiles[name];
  },
  list:function() {
    var profiles = [];
    for(profile in this.ss.storage.profiles) {
      profiles[profiles.length] = profile;
    }
    return profiles;
  }
};

exports.proxyStore = new ProxyStore();
