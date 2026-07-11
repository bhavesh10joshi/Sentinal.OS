"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrors = exports.ClientErrorStatusCodes = exports.SuccessStatusCodes = void 0;
var SuccessStatusCodes;
(function (SuccessStatusCodes) {
    SuccessStatusCodes[SuccessStatusCodes["Success"] = 200] = "Success";
    SuccessStatusCodes[SuccessStatusCodes["ResourceCreated"] = 201] = "ResourceCreated";
    SuccessStatusCodes[SuccessStatusCodes["SuccessNoResponse"] = 202] = "SuccessNoResponse";
    SuccessStatusCodes[SuccessStatusCodes["NoContent"] = 204] = "NoContent";
})(SuccessStatusCodes || (exports.SuccessStatusCodes = SuccessStatusCodes = {}));
;
var ClientErrorStatusCodes;
(function (ClientErrorStatusCodes) {
    ClientErrorStatusCodes[ClientErrorStatusCodes["BadRequest"] = 400] = "BadRequest";
    ClientErrorStatusCodes[ClientErrorStatusCodes["Unathorized"] = 401] = "Unathorized";
    ClientErrorStatusCodes[ClientErrorStatusCodes["ResourceNotFound"] = 404] = "ResourceNotFound";
    ClientErrorStatusCodes[ClientErrorStatusCodes["Conflicts"] = 409] = "Conflicts";
    ClientErrorStatusCodes[ClientErrorStatusCodes["FailedValidation"] = 422] = "FailedValidation";
})(ClientErrorStatusCodes || (exports.ClientErrorStatusCodes = ClientErrorStatusCodes = {}));
;
var ServerErrors;
(function (ServerErrors) {
    ServerErrors[ServerErrors["InternalServerError"] = 500] = "InternalServerError";
    ServerErrors[ServerErrors["NoServerResponse"] = 504] = "NoServerResponse";
})(ServerErrors || (exports.ServerErrors = ServerErrors = {}));
;
//# sourceMappingURL=StatusCodes.js.map