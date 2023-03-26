/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation InsertTransaction($transaction: transactions_insert_input!) {\n    insert_transactions(objects: [$transaction]) {\n        affected_rows\n        returning {\n            id\n            amount\n            budget_id\n            label\n            type\n            created_at\n            updated_at\n            id\n            user_id\n        }\n    }\n  }\n": types.InsertTransactionDocument,
    "\n  mutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {\n      id\n      displayName\n      metadata\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query GetTransactions {\n    transactions(order_by: { created_at: desc }) {\n        amount\n        budget_id\n        label\n        type\n        created_at\n        updated_at\n        id\n        user_id\n    }\n  }\n": types.GetTransactionsDocument,
    "\n    query GetUser($id: uuid!) {\n      user(id: $id) {\n        id\n        email\n        displayName\n        metadata\n        avatarUrl\n      }\n    }\n  ": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertTransaction($transaction: transactions_insert_input!) {\n    insert_transactions(objects: [$transaction]) {\n        affected_rows\n        returning {\n            id\n            amount\n            budget_id\n            label\n            type\n            created_at\n            updated_at\n            id\n            user_id\n        }\n    }\n  }\n"): (typeof documents)["\n  mutation InsertTransaction($transaction: transactions_insert_input!) {\n    insert_transactions(objects: [$transaction]) {\n        affected_rows\n        returning {\n            id\n            amount\n            budget_id\n            label\n            type\n            created_at\n            updated_at\n            id\n            user_id\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {\n      id\n      displayName\n      metadata\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {\n      id\n      displayName\n      metadata\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTransactions {\n    transactions(order_by: { created_at: desc }) {\n        amount\n        budget_id\n        label\n        type\n        created_at\n        updated_at\n        id\n        user_id\n    }\n  }\n"): (typeof documents)["\n  query GetTransactions {\n    transactions(order_by: { created_at: desc }) {\n        amount\n        budget_id\n        label\n        type\n        created_at\n        updated_at\n        id\n        user_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUser($id: uuid!) {\n      user(id: $id) {\n        id\n        email\n        displayName\n        metadata\n        avatarUrl\n      }\n    }\n  "): (typeof documents)["\n    query GetUser($id: uuid!) {\n      user(id: $id) {\n        id\n        email\n        displayName\n        metadata\n        avatarUrl\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;