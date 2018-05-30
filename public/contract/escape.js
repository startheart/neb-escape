"use strict";

var Account = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.address = obj.address;
    this.level = obj.level;
  } else {
      this.address = "";
      this.level = "";
  }
};

Account.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var Escape = function () {
    LocalContractStorage.defineMapProperty(this, "accounts", {
        parse: function (text) {
            return new Account(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Escape.prototype = {
    init: function () {
        // todo
    },

    save: function (level) {
      var address = Blockchain.transaction.from;
      var account = this.accounts.get(address);

      if (!account){
          account = new Account()
          account.address = address
      }

      account.level = level

      this.accounts.put(address, account);

      return account
    },

    get: function () {
        var address = Blockchain.transaction.from;
        var account = this.accounts.get(address);

        if (!account){
            account = new Account()
            account.address = address
            account.level = '1'
        }

        return account
    }
};
module.exports = Escape;
