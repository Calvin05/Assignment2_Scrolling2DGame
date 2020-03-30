"use strict";
var enums;
(function (enums) {
    var GameObjectType;
    (function (GameObjectType) {
        GameObjectType[GameObjectType["PLAYER"] = 0] = "PLAYER";
        GameObjectType[GameObjectType["ISLAND"] = 1] = "ISLAND";
        GameObjectType[GameObjectType["LIVE"] = 2] = "LIVE";
        GameObjectType[GameObjectType["CITY"] = 3] = "CITY";
        GameObjectType[GameObjectType["BUTTON"] = 4] = "BUTTON";
        GameObjectType[GameObjectType["ENEMY"] = 5] = "ENEMY";
        GameObjectType[GameObjectType["BULLET"] = 6] = "BULLET";
        GameObjectType[GameObjectType["UNDEFINED"] = 7] = "UNDEFINED";
        GameObjectType[GameObjectType["NUM_OF_TYPES"] = 8] = "NUM_OF_TYPES";
    })(GameObjectType = enums.GameObjectType || (enums.GameObjectType = {}));
})(enums || (enums = {}));
//# sourceMappingURL=GameObjectType.js.map