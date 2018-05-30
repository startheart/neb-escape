"use strict";

var Pet = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.petId = obj.petId;
    this.adopter = obj.adopter;
  } else {
      this.petId = "";
      this.adopter = "";
  }
};

Pet.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var Adoption = function () {
    LocalContractStorage.defineMapProperty(this, "pets", {
        parse: function (text) {
            return new Pet(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Adoption.prototype = {
    init: function () {
        // todo
    },

    adopt: function (petId) {
      petId = petId + '';

      if (petId === ""){
          throw new Error("empty petId");
      }
      if (petId.length > 64){
          throw new Error("petId exceed limit length")
      }

      var pet = this.pets.get(petId);
      if (pet){
          throw new Error("value has been occupied");
      }

      var from = Blockchain.transaction.from
      pet = new Pet()
      pet.adopter = from
      pet.petId = petId

      this.pets.put(petId, pet);
    },

    get: function (petId) {
        petId = petId + '';
        if ( petId === "" ) {
            throw new Error("empty petId")
        }
        return this.pets.get(petId)
    }
};
module.exports = Adoption;
