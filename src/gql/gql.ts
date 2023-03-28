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
    "\n\tmutation InsertTransaction($transaction: transactions_insert_input!) {\n\t\tinsert_transactions(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tlabel\n\t\t\t\ttype\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n": types.InsertTransactionDocument,
    "\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n": types.UpdateUserDocument,
    "\n\tquery GetTransactions {\n\t\ttransactions(order_by: { created_at: desc }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tlabel\n\t\t\ttype\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n": types.GetTransactionsDocument,
    "\n\t\tquery GetUser($id: uuid!) {\n\t\t\tuser(id: $id) {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tdisplayName\n\t\t\t\tmetadata\n\t\t\t\tavatarUrl\n\t\t\t}\n\t\t}\n\t": types.GetUserDocument,
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
export function graphql(source: "\n\tmutation InsertTransaction($transaction: transactions_insert_input!) {\n\t\tinsert_transactions(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tlabel\n\t\t\t\ttype\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertTransaction($transaction: transactions_insert_input!) {\n\t\tinsert_transactions(objects: [$transaction]) {\n\t\t\taffected_rows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tamount\n\t\t\t\tbudget_id\n\t\t\t\tlabel\n\t\t\t\ttype\n\t\t\t\tcreated_at\n\t\t\t\tupdated_at\n\t\t\t\tid\n\t\t\t\tuser_id\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {\n\t\tupdateUser(\n\t\t\tpk_columns: { id: $id }\n\t\t\t_set: { displayName: $displayName, metadata: $metadata }\n\t\t) {\n\t\t\tid\n\t\t\tdisplayName\n\t\t\tmetadata\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetTransactions {\n\t\ttransactions(order_by: { created_at: desc }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tlabel\n\t\t\ttype\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetTransactions {\n\t\ttransactions(order_by: { created_at: desc }) {\n\t\t\tamount\n\t\t\tbudget_id\n\t\t\tlabel\n\t\t\ttype\n\t\t\tcreated_at\n\t\t\tupdated_at\n\t\t\tid\n\t\t\tuser_id\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery GetUser($id: uuid!) {\n\t\t\tuser(id: $id) {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tdisplayName\n\t\t\t\tmetadata\n\t\t\t\tavatarUrl\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetUser($id: uuid!) {\n\t\t\tuser(id: $id) {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tdisplayName\n\t\t\t\tmetadata\n\t\t\t\tavatarUrl\n\t\t\t}\n\t\t}\n\t"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;