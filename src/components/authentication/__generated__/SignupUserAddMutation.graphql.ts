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
        readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "newUser",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupUserAddMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupUserAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a232bfb2edbd066916ab3ad3eb13a267",
    "id": null,
    "metadata": {},
    "name": "SignupUserAddMutation",
    "operationKind": "mutation",
    "text": "mutation SignupUserAddMutation(\n  $input: UserInsertType!\n) {\n  newUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6ac6c7a5bd54bf131e42e904c9e11a10';
export default node;
