/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LoginGetEmailQueryVariables = {
    input: string;
};
export type LoginGetEmailQueryResponse = {
    readonly viewer: {
        readonly user: {
            readonly email: string;
        } | null;
    } | null;
};
export type LoginGetEmailQuery = {
    readonly response: LoginGetEmailQueryResponse;
    readonly variables: LoginGetEmailQueryVariables;
};



/*
query LoginGetEmailQuery(
  $input: String!
) {
  viewer {
    user(username: $input) {
      email
      id
    }
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
    "name": "username",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginGetEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginGetEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e6ccf1cd5ed6e7bd243ff64cf48f11e",
    "id": null,
    "metadata": {},
    "name": "LoginGetEmailQuery",
    "operationKind": "query",
    "text": "query LoginGetEmailQuery(\n  $input: String!\n) {\n  viewer {\n    user(username: $input) {\n      email\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '554d65d283cc62febbe7ea6b9debcc7a';
export default node;
