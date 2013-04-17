const{ProxyConfig} = require('./proxy');

function ProxyStore() {
  this.ss = require("simple-storage");
}

ProxyStore.prototype = {
  store:function(name, data) {
    this.ss.storage[name] = JSON.stringify(data);
    console.log('stored data as '+name);
    console.log('data is '+this.ss.storage[name]);
  },
  fetch:function(name) {
    console.log('attempting to fetch '+name);
    console.log('data is '+this.ss.storage[name]);
    var data = JSON.parse(this.ss.storage[name]);
    data.__proto__ = ProxyConfig.prototype;
    return data;
  },
  remove:function(name) {
    delete this.ss.storage[name];
  }
};

exports.proxyStore = new ProxyStore();
