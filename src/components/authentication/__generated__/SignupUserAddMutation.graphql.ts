/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserInsertType = {
    username: string;
    description?: string | null;
    name: string;
    email: string;
};
export type SignupUserAddMutationVariables = {
    input: UserInsertType;
};
export type SignupUserAddMutationResponse = {
    readonly newUser: {
        readonly username: string;
    } | null;
};
export type SignupUserAddMutation = {
    readonly response: SignupUserAddMutationResponse;
    readonly variables: SignupUserAddMutationVariables;
};



/*
mutation SignupUserAddMutation(
  $input: UserInsertType!
) {
  newUser(input: $input) {
    username
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupUserAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "newUser",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupUserAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "newUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0c08b2515d56abcb80bbe28658e1fcdf",
    "id": null,
    "metadata": {},
    "name": "SignupUserAddMutation",
    "operationKind": "mutation",
    "text": "mutation SignupUserAddMutation(\n  $input: UserInsertType!\n) {\n  newUser(input: $input) {\n    username\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '64fcc0d9694da0a1b96ac56d5e0ff0a2';
export default node;
