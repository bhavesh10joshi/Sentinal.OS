
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ScanReport
 * 
 */
export type ScanReport = $Result.DefaultSelection<Prisma.$ScanReportPayload>
/**
 * Model Vulnerability
 * 
 */
export type Vulnerability = $Result.DefaultSelection<Prisma.$VulnerabilityPayload>
/**
 * Model TelemetryLog
 * 
 */
export type TelemetryLog = $Result.DefaultSelection<Prisma.$TelemetryLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ScanReports
 * const scanReports = await prisma.scanReport.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ScanReports
   * const scanReports = await prisma.scanReport.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList | "$transaction">) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>
  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.scanReport`: Exposes CRUD operations for the **ScanReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanReports
    * const scanReports = await prisma.scanReport.findMany()
    * ```
    */
  get scanReport(): Prisma.ScanReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vulnerability`: Exposes CRUD operations for the **Vulnerability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vulnerabilities
    * const vulnerabilities = await prisma.vulnerability.findMany()
    * ```
    */
  get vulnerability(): Prisma.VulnerabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.telemetryLog`: Exposes CRUD operations for the **TelemetryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TelemetryLogs
    * const telemetryLogs = await prisma.telemetryLog.findMany()
    * ```
    */
  get telemetryLog(): Prisma.TelemetryLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ScanReport: 'ScanReport',
    Vulnerability: 'Vulnerability',
    TelemetryLog: 'TelemetryLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "scanReport" | "vulnerability" | "telemetryLog"
      txIsolationLevel: never
    }
    model: {
      ScanReport: {
        payload: Prisma.$ScanReportPayload<ExtArgs>
        fields: Prisma.ScanReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          findFirst: {
            args: Prisma.ScanReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          findMany: {
            args: Prisma.ScanReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>[]
          }
          create: {
            args: Prisma.ScanReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          createMany: {
            args: Prisma.ScanReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ScanReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          update: {
            args: Prisma.ScanReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          deleteMany: {
            args: Prisma.ScanReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScanReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanReportPayload>
          }
          aggregate: {
            args: Prisma.ScanReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanReport>
          }
          groupBy: {
            args: Prisma.ScanReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanReportGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ScanReportFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ScanReportAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ScanReportCountArgs<ExtArgs>
            result: $Utils.Optional<ScanReportCountAggregateOutputType> | number
          }
        }
      }
      Vulnerability: {
        payload: Prisma.$VulnerabilityPayload<ExtArgs>
        fields: Prisma.VulnerabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VulnerabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VulnerabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          findFirst: {
            args: Prisma.VulnerabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VulnerabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          findMany: {
            args: Prisma.VulnerabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>[]
          }
          create: {
            args: Prisma.VulnerabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          createMany: {
            args: Prisma.VulnerabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VulnerabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          update: {
            args: Prisma.VulnerabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          deleteMany: {
            args: Prisma.VulnerabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VulnerabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VulnerabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          aggregate: {
            args: Prisma.VulnerabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVulnerability>
          }
          groupBy: {
            args: Prisma.VulnerabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<VulnerabilityGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.VulnerabilityFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.VulnerabilityAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.VulnerabilityCountArgs<ExtArgs>
            result: $Utils.Optional<VulnerabilityCountAggregateOutputType> | number
          }
        }
      }
      TelemetryLog: {
        payload: Prisma.$TelemetryLogPayload<ExtArgs>
        fields: Prisma.TelemetryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TelemetryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TelemetryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          findFirst: {
            args: Prisma.TelemetryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TelemetryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          findMany: {
            args: Prisma.TelemetryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>[]
          }
          create: {
            args: Prisma.TelemetryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          createMany: {
            args: Prisma.TelemetryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TelemetryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          update: {
            args: Prisma.TelemetryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          deleteMany: {
            args: Prisma.TelemetryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TelemetryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TelemetryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelemetryLogPayload>
          }
          aggregate: {
            args: Prisma.TelemetryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTelemetryLog>
          }
          groupBy: {
            args: Prisma.TelemetryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TelemetryLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TelemetryLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TelemetryLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TelemetryLogCountArgs<ExtArgs>
            result: $Utils.Optional<TelemetryLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    scanReport?: ScanReportOmit
    vulnerability?: VulnerabilityOmit
    telemetryLog?: TelemetryLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList | '$transaction'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ScanReportCountOutputType
   */

  export type ScanReportCountOutputType = {
    findings: number
    systemLogs: number
  }

  export type ScanReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    findings?: boolean | ScanReportCountOutputTypeCountFindingsArgs
    systemLogs?: boolean | ScanReportCountOutputTypeCountSystemLogsArgs
  }

  // Custom InputTypes
  /**
   * ScanReportCountOutputType without action
   */
  export type ScanReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReportCountOutputType
     */
    select?: ScanReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScanReportCountOutputType without action
   */
  export type ScanReportCountOutputTypeCountFindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VulnerabilityWhereInput
  }

  /**
   * ScanReportCountOutputType without action
   */
  export type ScanReportCountOutputTypeCountSystemLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelemetryLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ScanReport
   */

  export type AggregateScanReport = {
    _count: ScanReportCountAggregateOutputType | null
    _avg: ScanReportAvgAggregateOutputType | null
    _sum: ScanReportSumAggregateOutputType | null
    _min: ScanReportMinAggregateOutputType | null
    _max: ScanReportMaxAggregateOutputType | null
  }

  export type ScanReportAvgAggregateOutputType = {
    totalBlocksScanned: number | null
  }

  export type ScanReportSumAggregateOutputType = {
    totalBlocksScanned: number | null
  }

  export type ScanReportMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    fileName: string | null
    totalBlocksScanned: number | null
    success: boolean | null
  }

  export type ScanReportMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    fileName: string | null
    totalBlocksScanned: number | null
    success: boolean | null
  }

  export type ScanReportCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    fileName: number
    totalBlocksScanned: number
    success: number
    _all: number
  }


  export type ScanReportAvgAggregateInputType = {
    totalBlocksScanned?: true
  }

  export type ScanReportSumAggregateInputType = {
    totalBlocksScanned?: true
  }

  export type ScanReportMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    fileName?: true
    totalBlocksScanned?: true
    success?: true
  }

  export type ScanReportMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    fileName?: true
    totalBlocksScanned?: true
    success?: true
  }

  export type ScanReportCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    fileName?: true
    totalBlocksScanned?: true
    success?: true
    _all?: true
  }

  export type ScanReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanReport to aggregate.
     */
    where?: ScanReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanReports to fetch.
     */
    orderBy?: ScanReportOrderByWithRelationInput | ScanReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanReports
    **/
    _count?: true | ScanReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScanReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScanReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanReportMaxAggregateInputType
  }

  export type GetScanReportAggregateType<T extends ScanReportAggregateArgs> = {
        [P in keyof T & keyof AggregateScanReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanReport[P]>
      : GetScalarType<T[P], AggregateScanReport[P]>
  }




  export type ScanReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanReportWhereInput
    orderBy?: ScanReportOrderByWithAggregationInput | ScanReportOrderByWithAggregationInput[]
    by: ScanReportScalarFieldEnum[] | ScanReportScalarFieldEnum
    having?: ScanReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanReportCountAggregateInputType | true
    _avg?: ScanReportAvgAggregateInputType
    _sum?: ScanReportSumAggregateInputType
    _min?: ScanReportMinAggregateInputType
    _max?: ScanReportMaxAggregateInputType
  }

  export type ScanReportGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    fileName: string | null
    totalBlocksScanned: number
    success: boolean
    _count: ScanReportCountAggregateOutputType | null
    _avg: ScanReportAvgAggregateOutputType | null
    _sum: ScanReportSumAggregateOutputType | null
    _min: ScanReportMinAggregateOutputType | null
    _max: ScanReportMaxAggregateOutputType | null
  }

  type GetScanReportGroupByPayload<T extends ScanReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanReportGroupByOutputType[P]>
            : GetScalarType<T[P], ScanReportGroupByOutputType[P]>
        }
      >
    >


  export type ScanReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    fileName?: boolean
    totalBlocksScanned?: boolean
    success?: boolean
    findings?: boolean | ScanReport$findingsArgs<ExtArgs>
    systemLogs?: boolean | ScanReport$systemLogsArgs<ExtArgs>
    _count?: boolean | ScanReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanReport"]>



  export type ScanReportSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    fileName?: boolean
    totalBlocksScanned?: boolean
    success?: boolean
  }

  export type ScanReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "fileName" | "totalBlocksScanned" | "success", ExtArgs["result"]["scanReport"]>
  export type ScanReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    findings?: boolean | ScanReport$findingsArgs<ExtArgs>
    systemLogs?: boolean | ScanReport$systemLogsArgs<ExtArgs>
    _count?: boolean | ScanReportCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ScanReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanReport"
    objects: {
      findings: Prisma.$VulnerabilityPayload<ExtArgs>[]
      systemLogs: Prisma.$TelemetryLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      fileName: string | null
      totalBlocksScanned: number
      success: boolean
    }, ExtArgs["result"]["scanReport"]>
    composites: {}
  }

  type ScanReportGetPayload<S extends boolean | null | undefined | ScanReportDefaultArgs> = $Result.GetResult<Prisma.$ScanReportPayload, S>

  type ScanReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanReportCountAggregateInputType | true
    }

  export interface ScanReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanReport'], meta: { name: 'ScanReport' } }
    /**
     * Find zero or one ScanReport that matches the filter.
     * @param {ScanReportFindUniqueArgs} args - Arguments to find a ScanReport
     * @example
     * // Get one ScanReport
     * const scanReport = await prisma.scanReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanReportFindUniqueArgs>(args: SelectSubset<T, ScanReportFindUniqueArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScanReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanReportFindUniqueOrThrowArgs} args - Arguments to find a ScanReport
     * @example
     * // Get one ScanReport
     * const scanReport = await prisma.scanReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportFindFirstArgs} args - Arguments to find a ScanReport
     * @example
     * // Get one ScanReport
     * const scanReport = await prisma.scanReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanReportFindFirstArgs>(args?: SelectSubset<T, ScanReportFindFirstArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportFindFirstOrThrowArgs} args - Arguments to find a ScanReport
     * @example
     * // Get one ScanReport
     * const scanReport = await prisma.scanReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScanReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanReports
     * const scanReports = await prisma.scanReport.findMany()
     * 
     * // Get first 10 ScanReports
     * const scanReports = await prisma.scanReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanReportWithIdOnly = await prisma.scanReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanReportFindManyArgs>(args?: SelectSubset<T, ScanReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScanReport.
     * @param {ScanReportCreateArgs} args - Arguments to create a ScanReport.
     * @example
     * // Create one ScanReport
     * const ScanReport = await prisma.scanReport.create({
     *   data: {
     *     // ... data to create a ScanReport
     *   }
     * })
     * 
     */
    create<T extends ScanReportCreateArgs>(args: SelectSubset<T, ScanReportCreateArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScanReports.
     * @param {ScanReportCreateManyArgs} args - Arguments to create many ScanReports.
     * @example
     * // Create many ScanReports
     * const scanReport = await prisma.scanReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanReportCreateManyArgs>(args?: SelectSubset<T, ScanReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ScanReport.
     * @param {ScanReportDeleteArgs} args - Arguments to delete one ScanReport.
     * @example
     * // Delete one ScanReport
     * const ScanReport = await prisma.scanReport.delete({
     *   where: {
     *     // ... filter to delete one ScanReport
     *   }
     * })
     * 
     */
    delete<T extends ScanReportDeleteArgs>(args: SelectSubset<T, ScanReportDeleteArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScanReport.
     * @param {ScanReportUpdateArgs} args - Arguments to update one ScanReport.
     * @example
     * // Update one ScanReport
     * const scanReport = await prisma.scanReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanReportUpdateArgs>(args: SelectSubset<T, ScanReportUpdateArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScanReports.
     * @param {ScanReportDeleteManyArgs} args - Arguments to filter ScanReports to delete.
     * @example
     * // Delete a few ScanReports
     * const { count } = await prisma.scanReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanReportDeleteManyArgs>(args?: SelectSubset<T, ScanReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanReports
     * const scanReport = await prisma.scanReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanReportUpdateManyArgs>(args: SelectSubset<T, ScanReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScanReport.
     * @param {ScanReportUpsertArgs} args - Arguments to update or create a ScanReport.
     * @example
     * // Update or create a ScanReport
     * const scanReport = await prisma.scanReport.upsert({
     *   create: {
     *     // ... data to create a ScanReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanReport we want to update
     *   }
     * })
     */
    upsert<T extends ScanReportUpsertArgs>(args: SelectSubset<T, ScanReportUpsertArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScanReports that matches the filter.
     * @param {ScanReportFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const scanReport = await prisma.scanReport.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ScanReportFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ScanReport.
     * @param {ScanReportAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const scanReport = await prisma.scanReport.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ScanReportAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ScanReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportCountArgs} args - Arguments to filter ScanReports to count.
     * @example
     * // Count the number of ScanReports
     * const count = await prisma.scanReport.count({
     *   where: {
     *     // ... the filter for the ScanReports we want to count
     *   }
     * })
    **/
    count<T extends ScanReportCountArgs>(
      args?: Subset<T, ScanReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanReportAggregateArgs>(args: Subset<T, ScanReportAggregateArgs>): Prisma.PrismaPromise<GetScanReportAggregateType<T>>

    /**
     * Group by ScanReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanReportGroupByArgs['orderBy'] }
        : { orderBy?: ScanReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanReport model
   */
  readonly fields: ScanReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    findings<T extends ScanReport$findingsArgs<ExtArgs> = {}>(args?: Subset<T, ScanReport$findingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    systemLogs<T extends ScanReport$systemLogsArgs<ExtArgs> = {}>(args?: Subset<T, ScanReport$systemLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanReport model
   */
  interface ScanReportFieldRefs {
    readonly id: FieldRef<"ScanReport", 'String'>
    readonly createdAt: FieldRef<"ScanReport", 'DateTime'>
    readonly userId: FieldRef<"ScanReport", 'String'>
    readonly fileName: FieldRef<"ScanReport", 'String'>
    readonly totalBlocksScanned: FieldRef<"ScanReport", 'Int'>
    readonly success: FieldRef<"ScanReport", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ScanReport findUnique
   */
  export type ScanReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter, which ScanReport to fetch.
     */
    where: ScanReportWhereUniqueInput
  }

  /**
   * ScanReport findUniqueOrThrow
   */
  export type ScanReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter, which ScanReport to fetch.
     */
    where: ScanReportWhereUniqueInput
  }

  /**
   * ScanReport findFirst
   */
  export type ScanReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter, which ScanReport to fetch.
     */
    where?: ScanReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanReports to fetch.
     */
    orderBy?: ScanReportOrderByWithRelationInput | ScanReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanReports.
     */
    cursor?: ScanReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanReports.
     */
    distinct?: ScanReportScalarFieldEnum | ScanReportScalarFieldEnum[]
  }

  /**
   * ScanReport findFirstOrThrow
   */
  export type ScanReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter, which ScanReport to fetch.
     */
    where?: ScanReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanReports to fetch.
     */
    orderBy?: ScanReportOrderByWithRelationInput | ScanReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanReports.
     */
    cursor?: ScanReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanReports.
     */
    distinct?: ScanReportScalarFieldEnum | ScanReportScalarFieldEnum[]
  }

  /**
   * ScanReport findMany
   */
  export type ScanReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter, which ScanReports to fetch.
     */
    where?: ScanReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanReports to fetch.
     */
    orderBy?: ScanReportOrderByWithRelationInput | ScanReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanReports.
     */
    cursor?: ScanReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanReports.
     */
    distinct?: ScanReportScalarFieldEnum | ScanReportScalarFieldEnum[]
  }

  /**
   * ScanReport create
   */
  export type ScanReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanReport.
     */
    data: XOR<ScanReportCreateInput, ScanReportUncheckedCreateInput>
  }

  /**
   * ScanReport createMany
   */
  export type ScanReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanReports.
     */
    data: ScanReportCreateManyInput | ScanReportCreateManyInput[]
  }

  /**
   * ScanReport update
   */
  export type ScanReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanReport.
     */
    data: XOR<ScanReportUpdateInput, ScanReportUncheckedUpdateInput>
    /**
     * Choose, which ScanReport to update.
     */
    where: ScanReportWhereUniqueInput
  }

  /**
   * ScanReport updateMany
   */
  export type ScanReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanReports.
     */
    data: XOR<ScanReportUpdateManyMutationInput, ScanReportUncheckedUpdateManyInput>
    /**
     * Filter which ScanReports to update
     */
    where?: ScanReportWhereInput
    /**
     * Limit how many ScanReports to update.
     */
    limit?: number
  }

  /**
   * ScanReport upsert
   */
  export type ScanReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanReport to update in case it exists.
     */
    where: ScanReportWhereUniqueInput
    /**
     * In case the ScanReport found by the `where` argument doesn't exist, create a new ScanReport with this data.
     */
    create: XOR<ScanReportCreateInput, ScanReportUncheckedCreateInput>
    /**
     * In case the ScanReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanReportUpdateInput, ScanReportUncheckedUpdateInput>
  }

  /**
   * ScanReport delete
   */
  export type ScanReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
    /**
     * Filter which ScanReport to delete.
     */
    where: ScanReportWhereUniqueInput
  }

  /**
   * ScanReport deleteMany
   */
  export type ScanReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanReports to delete
     */
    where?: ScanReportWhereInput
    /**
     * Limit how many ScanReports to delete.
     */
    limit?: number
  }

  /**
   * ScanReport findRaw
   */
  export type ScanReportFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ScanReport aggregateRaw
   */
  export type ScanReportAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ScanReport.findings
   */
  export type ScanReport$findingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    where?: VulnerabilityWhereInput
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    cursor?: VulnerabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * ScanReport.systemLogs
   */
  export type ScanReport$systemLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    where?: TelemetryLogWhereInput
    orderBy?: TelemetryLogOrderByWithRelationInput | TelemetryLogOrderByWithRelationInput[]
    cursor?: TelemetryLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TelemetryLogScalarFieldEnum | TelemetryLogScalarFieldEnum[]
  }

  /**
   * ScanReport without action
   */
  export type ScanReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanReport
     */
    select?: ScanReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanReport
     */
    omit?: ScanReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanReportInclude<ExtArgs> | null
  }


  /**
   * Model Vulnerability
   */

  export type AggregateVulnerability = {
    _count: VulnerabilityCountAggregateOutputType | null
    _avg: VulnerabilityAvgAggregateOutputType | null
    _sum: VulnerabilitySumAggregateOutputType | null
    _min: VulnerabilityMinAggregateOutputType | null
    _max: VulnerabilityMaxAggregateOutputType | null
  }

  export type VulnerabilityAvgAggregateOutputType = {
    startLine: number | null
    endLine: number | null
  }

  export type VulnerabilitySumAggregateOutputType = {
    startLine: number | null
    endLine: number | null
  }

  export type VulnerabilityMinAggregateOutputType = {
    id: string | null
    scanReportId: string | null
    functionName: string | null
    startLine: number | null
    endLine: number | null
    vulnerabilityFound: boolean | null
    severity: string | null
    issueSummary: string | null
    remediationCode: string | null
  }

  export type VulnerabilityMaxAggregateOutputType = {
    id: string | null
    scanReportId: string | null
    functionName: string | null
    startLine: number | null
    endLine: number | null
    vulnerabilityFound: boolean | null
    severity: string | null
    issueSummary: string | null
    remediationCode: string | null
  }

  export type VulnerabilityCountAggregateOutputType = {
    id: number
    scanReportId: number
    functionName: number
    startLine: number
    endLine: number
    vulnerabilityFound: number
    severity: number
    issueSummary: number
    remediationCode: number
    _all: number
  }


  export type VulnerabilityAvgAggregateInputType = {
    startLine?: true
    endLine?: true
  }

  export type VulnerabilitySumAggregateInputType = {
    startLine?: true
    endLine?: true
  }

  export type VulnerabilityMinAggregateInputType = {
    id?: true
    scanReportId?: true
    functionName?: true
    startLine?: true
    endLine?: true
    vulnerabilityFound?: true
    severity?: true
    issueSummary?: true
    remediationCode?: true
  }

  export type VulnerabilityMaxAggregateInputType = {
    id?: true
    scanReportId?: true
    functionName?: true
    startLine?: true
    endLine?: true
    vulnerabilityFound?: true
    severity?: true
    issueSummary?: true
    remediationCode?: true
  }

  export type VulnerabilityCountAggregateInputType = {
    id?: true
    scanReportId?: true
    functionName?: true
    startLine?: true
    endLine?: true
    vulnerabilityFound?: true
    severity?: true
    issueSummary?: true
    remediationCode?: true
    _all?: true
  }

  export type VulnerabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vulnerability to aggregate.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vulnerabilities
    **/
    _count?: true | VulnerabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VulnerabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VulnerabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VulnerabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VulnerabilityMaxAggregateInputType
  }

  export type GetVulnerabilityAggregateType<T extends VulnerabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateVulnerability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVulnerability[P]>
      : GetScalarType<T[P], AggregateVulnerability[P]>
  }




  export type VulnerabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VulnerabilityWhereInput
    orderBy?: VulnerabilityOrderByWithAggregationInput | VulnerabilityOrderByWithAggregationInput[]
    by: VulnerabilityScalarFieldEnum[] | VulnerabilityScalarFieldEnum
    having?: VulnerabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VulnerabilityCountAggregateInputType | true
    _avg?: VulnerabilityAvgAggregateInputType
    _sum?: VulnerabilitySumAggregateInputType
    _min?: VulnerabilityMinAggregateInputType
    _max?: VulnerabilityMaxAggregateInputType
  }

  export type VulnerabilityGroupByOutputType = {
    id: string
    scanReportId: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
    _count: VulnerabilityCountAggregateOutputType | null
    _avg: VulnerabilityAvgAggregateOutputType | null
    _sum: VulnerabilitySumAggregateOutputType | null
    _min: VulnerabilityMinAggregateOutputType | null
    _max: VulnerabilityMaxAggregateOutputType | null
  }

  type GetVulnerabilityGroupByPayload<T extends VulnerabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VulnerabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VulnerabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VulnerabilityGroupByOutputType[P]>
            : GetScalarType<T[P], VulnerabilityGroupByOutputType[P]>
        }
      >
    >


  export type VulnerabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scanReportId?: boolean
    functionName?: boolean
    startLine?: boolean
    endLine?: boolean
    vulnerabilityFound?: boolean
    severity?: boolean
    issueSummary?: boolean
    remediationCode?: boolean
    scanReport?: boolean | ScanReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vulnerability"]>



  export type VulnerabilitySelectScalar = {
    id?: boolean
    scanReportId?: boolean
    functionName?: boolean
    startLine?: boolean
    endLine?: boolean
    vulnerabilityFound?: boolean
    severity?: boolean
    issueSummary?: boolean
    remediationCode?: boolean
  }

  export type VulnerabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "scanReportId" | "functionName" | "startLine" | "endLine" | "vulnerabilityFound" | "severity" | "issueSummary" | "remediationCode", ExtArgs["result"]["vulnerability"]>
  export type VulnerabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scanReport?: boolean | ScanReportDefaultArgs<ExtArgs>
  }

  export type $VulnerabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vulnerability"
    objects: {
      scanReport: Prisma.$ScanReportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      scanReportId: string
      functionName: string
      startLine: number
      endLine: number
      vulnerabilityFound: boolean
      severity: string
      issueSummary: string
      remediationCode: string
    }, ExtArgs["result"]["vulnerability"]>
    composites: {}
  }

  type VulnerabilityGetPayload<S extends boolean | null | undefined | VulnerabilityDefaultArgs> = $Result.GetResult<Prisma.$VulnerabilityPayload, S>

  type VulnerabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VulnerabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VulnerabilityCountAggregateInputType | true
    }

  export interface VulnerabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vulnerability'], meta: { name: 'Vulnerability' } }
    /**
     * Find zero or one Vulnerability that matches the filter.
     * @param {VulnerabilityFindUniqueArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VulnerabilityFindUniqueArgs>(args: SelectSubset<T, VulnerabilityFindUniqueArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vulnerability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VulnerabilityFindUniqueOrThrowArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VulnerabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, VulnerabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vulnerability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindFirstArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VulnerabilityFindFirstArgs>(args?: SelectSubset<T, VulnerabilityFindFirstArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vulnerability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindFirstOrThrowArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VulnerabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, VulnerabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vulnerabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vulnerabilities
     * const vulnerabilities = await prisma.vulnerability.findMany()
     * 
     * // Get first 10 Vulnerabilities
     * const vulnerabilities = await prisma.vulnerability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vulnerabilityWithIdOnly = await prisma.vulnerability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VulnerabilityFindManyArgs>(args?: SelectSubset<T, VulnerabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vulnerability.
     * @param {VulnerabilityCreateArgs} args - Arguments to create a Vulnerability.
     * @example
     * // Create one Vulnerability
     * const Vulnerability = await prisma.vulnerability.create({
     *   data: {
     *     // ... data to create a Vulnerability
     *   }
     * })
     * 
     */
    create<T extends VulnerabilityCreateArgs>(args: SelectSubset<T, VulnerabilityCreateArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vulnerabilities.
     * @param {VulnerabilityCreateManyArgs} args - Arguments to create many Vulnerabilities.
     * @example
     * // Create many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VulnerabilityCreateManyArgs>(args?: SelectSubset<T, VulnerabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Vulnerability.
     * @param {VulnerabilityDeleteArgs} args - Arguments to delete one Vulnerability.
     * @example
     * // Delete one Vulnerability
     * const Vulnerability = await prisma.vulnerability.delete({
     *   where: {
     *     // ... filter to delete one Vulnerability
     *   }
     * })
     * 
     */
    delete<T extends VulnerabilityDeleteArgs>(args: SelectSubset<T, VulnerabilityDeleteArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vulnerability.
     * @param {VulnerabilityUpdateArgs} args - Arguments to update one Vulnerability.
     * @example
     * // Update one Vulnerability
     * const vulnerability = await prisma.vulnerability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VulnerabilityUpdateArgs>(args: SelectSubset<T, VulnerabilityUpdateArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vulnerabilities.
     * @param {VulnerabilityDeleteManyArgs} args - Arguments to filter Vulnerabilities to delete.
     * @example
     * // Delete a few Vulnerabilities
     * const { count } = await prisma.vulnerability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VulnerabilityDeleteManyArgs>(args?: SelectSubset<T, VulnerabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vulnerabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VulnerabilityUpdateManyArgs>(args: SelectSubset<T, VulnerabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vulnerability.
     * @param {VulnerabilityUpsertArgs} args - Arguments to update or create a Vulnerability.
     * @example
     * // Update or create a Vulnerability
     * const vulnerability = await prisma.vulnerability.upsert({
     *   create: {
     *     // ... data to create a Vulnerability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vulnerability we want to update
     *   }
     * })
     */
    upsert<T extends VulnerabilityUpsertArgs>(args: SelectSubset<T, VulnerabilityUpsertArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vulnerabilities that matches the filter.
     * @param {VulnerabilityFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const vulnerability = await prisma.vulnerability.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: VulnerabilityFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Vulnerability.
     * @param {VulnerabilityAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const vulnerability = await prisma.vulnerability.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: VulnerabilityAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Vulnerabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityCountArgs} args - Arguments to filter Vulnerabilities to count.
     * @example
     * // Count the number of Vulnerabilities
     * const count = await prisma.vulnerability.count({
     *   where: {
     *     // ... the filter for the Vulnerabilities we want to count
     *   }
     * })
    **/
    count<T extends VulnerabilityCountArgs>(
      args?: Subset<T, VulnerabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VulnerabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vulnerability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VulnerabilityAggregateArgs>(args: Subset<T, VulnerabilityAggregateArgs>): Prisma.PrismaPromise<GetVulnerabilityAggregateType<T>>

    /**
     * Group by Vulnerability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VulnerabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VulnerabilityGroupByArgs['orderBy'] }
        : { orderBy?: VulnerabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VulnerabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVulnerabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vulnerability model
   */
  readonly fields: VulnerabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vulnerability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VulnerabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scanReport<T extends ScanReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanReportDefaultArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vulnerability model
   */
  interface VulnerabilityFieldRefs {
    readonly id: FieldRef<"Vulnerability", 'String'>
    readonly scanReportId: FieldRef<"Vulnerability", 'String'>
    readonly functionName: FieldRef<"Vulnerability", 'String'>
    readonly startLine: FieldRef<"Vulnerability", 'Int'>
    readonly endLine: FieldRef<"Vulnerability", 'Int'>
    readonly vulnerabilityFound: FieldRef<"Vulnerability", 'Boolean'>
    readonly severity: FieldRef<"Vulnerability", 'String'>
    readonly issueSummary: FieldRef<"Vulnerability", 'String'>
    readonly remediationCode: FieldRef<"Vulnerability", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vulnerability findUnique
   */
  export type VulnerabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability findUniqueOrThrow
   */
  export type VulnerabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability findFirst
   */
  export type VulnerabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vulnerabilities.
     */
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability findFirstOrThrow
   */
  export type VulnerabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vulnerabilities.
     */
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability findMany
   */
  export type VulnerabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerabilities to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vulnerabilities.
     */
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability create
   */
  export type VulnerabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a Vulnerability.
     */
    data: XOR<VulnerabilityCreateInput, VulnerabilityUncheckedCreateInput>
  }

  /**
   * Vulnerability createMany
   */
  export type VulnerabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vulnerabilities.
     */
    data: VulnerabilityCreateManyInput | VulnerabilityCreateManyInput[]
  }

  /**
   * Vulnerability update
   */
  export type VulnerabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a Vulnerability.
     */
    data: XOR<VulnerabilityUpdateInput, VulnerabilityUncheckedUpdateInput>
    /**
     * Choose, which Vulnerability to update.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability updateMany
   */
  export type VulnerabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vulnerabilities.
     */
    data: XOR<VulnerabilityUpdateManyMutationInput, VulnerabilityUncheckedUpdateManyInput>
    /**
     * Filter which Vulnerabilities to update
     */
    where?: VulnerabilityWhereInput
    /**
     * Limit how many Vulnerabilities to update.
     */
    limit?: number
  }

  /**
   * Vulnerability upsert
   */
  export type VulnerabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the Vulnerability to update in case it exists.
     */
    where: VulnerabilityWhereUniqueInput
    /**
     * In case the Vulnerability found by the `where` argument doesn't exist, create a new Vulnerability with this data.
     */
    create: XOR<VulnerabilityCreateInput, VulnerabilityUncheckedCreateInput>
    /**
     * In case the Vulnerability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VulnerabilityUpdateInput, VulnerabilityUncheckedUpdateInput>
  }

  /**
   * Vulnerability delete
   */
  export type VulnerabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter which Vulnerability to delete.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability deleteMany
   */
  export type VulnerabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vulnerabilities to delete
     */
    where?: VulnerabilityWhereInput
    /**
     * Limit how many Vulnerabilities to delete.
     */
    limit?: number
  }

  /**
   * Vulnerability findRaw
   */
  export type VulnerabilityFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Vulnerability aggregateRaw
   */
  export type VulnerabilityAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Vulnerability without action
   */
  export type VulnerabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
  }


  /**
   * Model TelemetryLog
   */

  export type AggregateTelemetryLog = {
    _count: TelemetryLogCountAggregateOutputType | null
    _min: TelemetryLogMinAggregateOutputType | null
    _max: TelemetryLogMaxAggregateOutputType | null
  }

  export type TelemetryLogMinAggregateOutputType = {
    id: string | null
    scanReportId: string | null
    timestamp: Date | null
    message: string | null
    type: string | null
  }

  export type TelemetryLogMaxAggregateOutputType = {
    id: string | null
    scanReportId: string | null
    timestamp: Date | null
    message: string | null
    type: string | null
  }

  export type TelemetryLogCountAggregateOutputType = {
    id: number
    scanReportId: number
    timestamp: number
    message: number
    type: number
    _all: number
  }


  export type TelemetryLogMinAggregateInputType = {
    id?: true
    scanReportId?: true
    timestamp?: true
    message?: true
    type?: true
  }

  export type TelemetryLogMaxAggregateInputType = {
    id?: true
    scanReportId?: true
    timestamp?: true
    message?: true
    type?: true
  }

  export type TelemetryLogCountAggregateInputType = {
    id?: true
    scanReportId?: true
    timestamp?: true
    message?: true
    type?: true
    _all?: true
  }

  export type TelemetryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelemetryLog to aggregate.
     */
    where?: TelemetryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelemetryLogs to fetch.
     */
    orderBy?: TelemetryLogOrderByWithRelationInput | TelemetryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TelemetryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelemetryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelemetryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TelemetryLogs
    **/
    _count?: true | TelemetryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TelemetryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TelemetryLogMaxAggregateInputType
  }

  export type GetTelemetryLogAggregateType<T extends TelemetryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTelemetryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTelemetryLog[P]>
      : GetScalarType<T[P], AggregateTelemetryLog[P]>
  }




  export type TelemetryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelemetryLogWhereInput
    orderBy?: TelemetryLogOrderByWithAggregationInput | TelemetryLogOrderByWithAggregationInput[]
    by: TelemetryLogScalarFieldEnum[] | TelemetryLogScalarFieldEnum
    having?: TelemetryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TelemetryLogCountAggregateInputType | true
    _min?: TelemetryLogMinAggregateInputType
    _max?: TelemetryLogMaxAggregateInputType
  }

  export type TelemetryLogGroupByOutputType = {
    id: string
    scanReportId: string
    timestamp: Date
    message: string
    type: string
    _count: TelemetryLogCountAggregateOutputType | null
    _min: TelemetryLogMinAggregateOutputType | null
    _max: TelemetryLogMaxAggregateOutputType | null
  }

  type GetTelemetryLogGroupByPayload<T extends TelemetryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TelemetryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TelemetryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TelemetryLogGroupByOutputType[P]>
            : GetScalarType<T[P], TelemetryLogGroupByOutputType[P]>
        }
      >
    >


  export type TelemetryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scanReportId?: boolean
    timestamp?: boolean
    message?: boolean
    type?: boolean
    scanReport?: boolean | ScanReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["telemetryLog"]>



  export type TelemetryLogSelectScalar = {
    id?: boolean
    scanReportId?: boolean
    timestamp?: boolean
    message?: boolean
    type?: boolean
  }

  export type TelemetryLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "scanReportId" | "timestamp" | "message" | "type", ExtArgs["result"]["telemetryLog"]>
  export type TelemetryLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scanReport?: boolean | ScanReportDefaultArgs<ExtArgs>
  }

  export type $TelemetryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TelemetryLog"
    objects: {
      scanReport: Prisma.$ScanReportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      scanReportId: string
      timestamp: Date
      message: string
      type: string
    }, ExtArgs["result"]["telemetryLog"]>
    composites: {}
  }

  type TelemetryLogGetPayload<S extends boolean | null | undefined | TelemetryLogDefaultArgs> = $Result.GetResult<Prisma.$TelemetryLogPayload, S>

  type TelemetryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TelemetryLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TelemetryLogCountAggregateInputType | true
    }

  export interface TelemetryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TelemetryLog'], meta: { name: 'TelemetryLog' } }
    /**
     * Find zero or one TelemetryLog that matches the filter.
     * @param {TelemetryLogFindUniqueArgs} args - Arguments to find a TelemetryLog
     * @example
     * // Get one TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TelemetryLogFindUniqueArgs>(args: SelectSubset<T, TelemetryLogFindUniqueArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TelemetryLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TelemetryLogFindUniqueOrThrowArgs} args - Arguments to find a TelemetryLog
     * @example
     * // Get one TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TelemetryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TelemetryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelemetryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogFindFirstArgs} args - Arguments to find a TelemetryLog
     * @example
     * // Get one TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TelemetryLogFindFirstArgs>(args?: SelectSubset<T, TelemetryLogFindFirstArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelemetryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogFindFirstOrThrowArgs} args - Arguments to find a TelemetryLog
     * @example
     * // Get one TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TelemetryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TelemetryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TelemetryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TelemetryLogs
     * const telemetryLogs = await prisma.telemetryLog.findMany()
     * 
     * // Get first 10 TelemetryLogs
     * const telemetryLogs = await prisma.telemetryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const telemetryLogWithIdOnly = await prisma.telemetryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TelemetryLogFindManyArgs>(args?: SelectSubset<T, TelemetryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TelemetryLog.
     * @param {TelemetryLogCreateArgs} args - Arguments to create a TelemetryLog.
     * @example
     * // Create one TelemetryLog
     * const TelemetryLog = await prisma.telemetryLog.create({
     *   data: {
     *     // ... data to create a TelemetryLog
     *   }
     * })
     * 
     */
    create<T extends TelemetryLogCreateArgs>(args: SelectSubset<T, TelemetryLogCreateArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TelemetryLogs.
     * @param {TelemetryLogCreateManyArgs} args - Arguments to create many TelemetryLogs.
     * @example
     * // Create many TelemetryLogs
     * const telemetryLog = await prisma.telemetryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TelemetryLogCreateManyArgs>(args?: SelectSubset<T, TelemetryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TelemetryLog.
     * @param {TelemetryLogDeleteArgs} args - Arguments to delete one TelemetryLog.
     * @example
     * // Delete one TelemetryLog
     * const TelemetryLog = await prisma.telemetryLog.delete({
     *   where: {
     *     // ... filter to delete one TelemetryLog
     *   }
     * })
     * 
     */
    delete<T extends TelemetryLogDeleteArgs>(args: SelectSubset<T, TelemetryLogDeleteArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TelemetryLog.
     * @param {TelemetryLogUpdateArgs} args - Arguments to update one TelemetryLog.
     * @example
     * // Update one TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TelemetryLogUpdateArgs>(args: SelectSubset<T, TelemetryLogUpdateArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TelemetryLogs.
     * @param {TelemetryLogDeleteManyArgs} args - Arguments to filter TelemetryLogs to delete.
     * @example
     * // Delete a few TelemetryLogs
     * const { count } = await prisma.telemetryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TelemetryLogDeleteManyArgs>(args?: SelectSubset<T, TelemetryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TelemetryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TelemetryLogs
     * const telemetryLog = await prisma.telemetryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TelemetryLogUpdateManyArgs>(args: SelectSubset<T, TelemetryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TelemetryLog.
     * @param {TelemetryLogUpsertArgs} args - Arguments to update or create a TelemetryLog.
     * @example
     * // Update or create a TelemetryLog
     * const telemetryLog = await prisma.telemetryLog.upsert({
     *   create: {
     *     // ... data to create a TelemetryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TelemetryLog we want to update
     *   }
     * })
     */
    upsert<T extends TelemetryLogUpsertArgs>(args: SelectSubset<T, TelemetryLogUpsertArgs<ExtArgs>>): Prisma__TelemetryLogClient<$Result.GetResult<Prisma.$TelemetryLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TelemetryLogs that matches the filter.
     * @param {TelemetryLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const telemetryLog = await prisma.telemetryLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TelemetryLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a TelemetryLog.
     * @param {TelemetryLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const telemetryLog = await prisma.telemetryLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TelemetryLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of TelemetryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogCountArgs} args - Arguments to filter TelemetryLogs to count.
     * @example
     * // Count the number of TelemetryLogs
     * const count = await prisma.telemetryLog.count({
     *   where: {
     *     // ... the filter for the TelemetryLogs we want to count
     *   }
     * })
    **/
    count<T extends TelemetryLogCountArgs>(
      args?: Subset<T, TelemetryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TelemetryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TelemetryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TelemetryLogAggregateArgs>(args: Subset<T, TelemetryLogAggregateArgs>): Prisma.PrismaPromise<GetTelemetryLogAggregateType<T>>

    /**
     * Group by TelemetryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelemetryLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TelemetryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TelemetryLogGroupByArgs['orderBy'] }
        : { orderBy?: TelemetryLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TelemetryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelemetryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TelemetryLog model
   */
  readonly fields: TelemetryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TelemetryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TelemetryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scanReport<T extends ScanReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanReportDefaultArgs<ExtArgs>>): Prisma__ScanReportClient<$Result.GetResult<Prisma.$ScanReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TelemetryLog model
   */
  interface TelemetryLogFieldRefs {
    readonly id: FieldRef<"TelemetryLog", 'String'>
    readonly scanReportId: FieldRef<"TelemetryLog", 'String'>
    readonly timestamp: FieldRef<"TelemetryLog", 'DateTime'>
    readonly message: FieldRef<"TelemetryLog", 'String'>
    readonly type: FieldRef<"TelemetryLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TelemetryLog findUnique
   */
  export type TelemetryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter, which TelemetryLog to fetch.
     */
    where: TelemetryLogWhereUniqueInput
  }

  /**
   * TelemetryLog findUniqueOrThrow
   */
  export type TelemetryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter, which TelemetryLog to fetch.
     */
    where: TelemetryLogWhereUniqueInput
  }

  /**
   * TelemetryLog findFirst
   */
  export type TelemetryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter, which TelemetryLog to fetch.
     */
    where?: TelemetryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelemetryLogs to fetch.
     */
    orderBy?: TelemetryLogOrderByWithRelationInput | TelemetryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelemetryLogs.
     */
    cursor?: TelemetryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelemetryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelemetryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelemetryLogs.
     */
    distinct?: TelemetryLogScalarFieldEnum | TelemetryLogScalarFieldEnum[]
  }

  /**
   * TelemetryLog findFirstOrThrow
   */
  export type TelemetryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter, which TelemetryLog to fetch.
     */
    where?: TelemetryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelemetryLogs to fetch.
     */
    orderBy?: TelemetryLogOrderByWithRelationInput | TelemetryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelemetryLogs.
     */
    cursor?: TelemetryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelemetryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelemetryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelemetryLogs.
     */
    distinct?: TelemetryLogScalarFieldEnum | TelemetryLogScalarFieldEnum[]
  }

  /**
   * TelemetryLog findMany
   */
  export type TelemetryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter, which TelemetryLogs to fetch.
     */
    where?: TelemetryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelemetryLogs to fetch.
     */
    orderBy?: TelemetryLogOrderByWithRelationInput | TelemetryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TelemetryLogs.
     */
    cursor?: TelemetryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelemetryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelemetryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelemetryLogs.
     */
    distinct?: TelemetryLogScalarFieldEnum | TelemetryLogScalarFieldEnum[]
  }

  /**
   * TelemetryLog create
   */
  export type TelemetryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TelemetryLog.
     */
    data: XOR<TelemetryLogCreateInput, TelemetryLogUncheckedCreateInput>
  }

  /**
   * TelemetryLog createMany
   */
  export type TelemetryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TelemetryLogs.
     */
    data: TelemetryLogCreateManyInput | TelemetryLogCreateManyInput[]
  }

  /**
   * TelemetryLog update
   */
  export type TelemetryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TelemetryLog.
     */
    data: XOR<TelemetryLogUpdateInput, TelemetryLogUncheckedUpdateInput>
    /**
     * Choose, which TelemetryLog to update.
     */
    where: TelemetryLogWhereUniqueInput
  }

  /**
   * TelemetryLog updateMany
   */
  export type TelemetryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TelemetryLogs.
     */
    data: XOR<TelemetryLogUpdateManyMutationInput, TelemetryLogUncheckedUpdateManyInput>
    /**
     * Filter which TelemetryLogs to update
     */
    where?: TelemetryLogWhereInput
    /**
     * Limit how many TelemetryLogs to update.
     */
    limit?: number
  }

  /**
   * TelemetryLog upsert
   */
  export type TelemetryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TelemetryLog to update in case it exists.
     */
    where: TelemetryLogWhereUniqueInput
    /**
     * In case the TelemetryLog found by the `where` argument doesn't exist, create a new TelemetryLog with this data.
     */
    create: XOR<TelemetryLogCreateInput, TelemetryLogUncheckedCreateInput>
    /**
     * In case the TelemetryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TelemetryLogUpdateInput, TelemetryLogUncheckedUpdateInput>
  }

  /**
   * TelemetryLog delete
   */
  export type TelemetryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
    /**
     * Filter which TelemetryLog to delete.
     */
    where: TelemetryLogWhereUniqueInput
  }

  /**
   * TelemetryLog deleteMany
   */
  export type TelemetryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelemetryLogs to delete
     */
    where?: TelemetryLogWhereInput
    /**
     * Limit how many TelemetryLogs to delete.
     */
    limit?: number
  }

  /**
   * TelemetryLog findRaw
   */
  export type TelemetryLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TelemetryLog aggregateRaw
   */
  export type TelemetryLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TelemetryLog without action
   */
  export type TelemetryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelemetryLog
     */
    select?: TelemetryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelemetryLog
     */
    omit?: TelemetryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelemetryLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const ScanReportScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    fileName: 'fileName',
    totalBlocksScanned: 'totalBlocksScanned',
    success: 'success'
  };

  export type ScanReportScalarFieldEnum = (typeof ScanReportScalarFieldEnum)[keyof typeof ScanReportScalarFieldEnum]


  export const VulnerabilityScalarFieldEnum: {
    id: 'id',
    scanReportId: 'scanReportId',
    functionName: 'functionName',
    startLine: 'startLine',
    endLine: 'endLine',
    vulnerabilityFound: 'vulnerabilityFound',
    severity: 'severity',
    issueSummary: 'issueSummary',
    remediationCode: 'remediationCode'
  };

  export type VulnerabilityScalarFieldEnum = (typeof VulnerabilityScalarFieldEnum)[keyof typeof VulnerabilityScalarFieldEnum]


  export const TelemetryLogScalarFieldEnum: {
    id: 'id',
    scanReportId: 'scanReportId',
    timestamp: 'timestamp',
    message: 'message',
    type: 'type'
  };

  export type TelemetryLogScalarFieldEnum = (typeof TelemetryLogScalarFieldEnum)[keyof typeof TelemetryLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ScanReportWhereInput = {
    AND?: ScanReportWhereInput | ScanReportWhereInput[]
    OR?: ScanReportWhereInput[]
    NOT?: ScanReportWhereInput | ScanReportWhereInput[]
    id?: StringFilter<"ScanReport"> | string
    createdAt?: DateTimeFilter<"ScanReport"> | Date | string
    userId?: StringFilter<"ScanReport"> | string
    fileName?: StringNullableFilter<"ScanReport"> | string | null
    totalBlocksScanned?: IntFilter<"ScanReport"> | number
    success?: BoolFilter<"ScanReport"> | boolean
    findings?: VulnerabilityListRelationFilter
    systemLogs?: TelemetryLogListRelationFilter
  }

  export type ScanReportOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    totalBlocksScanned?: SortOrder
    success?: SortOrder
    findings?: VulnerabilityOrderByRelationAggregateInput
    systemLogs?: TelemetryLogOrderByRelationAggregateInput
  }

  export type ScanReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanReportWhereInput | ScanReportWhereInput[]
    OR?: ScanReportWhereInput[]
    NOT?: ScanReportWhereInput | ScanReportWhereInput[]
    createdAt?: DateTimeFilter<"ScanReport"> | Date | string
    userId?: StringFilter<"ScanReport"> | string
    fileName?: StringNullableFilter<"ScanReport"> | string | null
    totalBlocksScanned?: IntFilter<"ScanReport"> | number
    success?: BoolFilter<"ScanReport"> | boolean
    findings?: VulnerabilityListRelationFilter
    systemLogs?: TelemetryLogListRelationFilter
  }, "id">

  export type ScanReportOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    totalBlocksScanned?: SortOrder
    success?: SortOrder
    _count?: ScanReportCountOrderByAggregateInput
    _avg?: ScanReportAvgOrderByAggregateInput
    _max?: ScanReportMaxOrderByAggregateInput
    _min?: ScanReportMinOrderByAggregateInput
    _sum?: ScanReportSumOrderByAggregateInput
  }

  export type ScanReportScalarWhereWithAggregatesInput = {
    AND?: ScanReportScalarWhereWithAggregatesInput | ScanReportScalarWhereWithAggregatesInput[]
    OR?: ScanReportScalarWhereWithAggregatesInput[]
    NOT?: ScanReportScalarWhereWithAggregatesInput | ScanReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScanReport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ScanReport"> | Date | string
    userId?: StringWithAggregatesFilter<"ScanReport"> | string
    fileName?: StringNullableWithAggregatesFilter<"ScanReport"> | string | null
    totalBlocksScanned?: IntWithAggregatesFilter<"ScanReport"> | number
    success?: BoolWithAggregatesFilter<"ScanReport"> | boolean
  }

  export type VulnerabilityWhereInput = {
    AND?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    OR?: VulnerabilityWhereInput[]
    NOT?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    id?: StringFilter<"Vulnerability"> | string
    scanReportId?: StringFilter<"Vulnerability"> | string
    functionName?: StringFilter<"Vulnerability"> | string
    startLine?: IntFilter<"Vulnerability"> | number
    endLine?: IntFilter<"Vulnerability"> | number
    vulnerabilityFound?: BoolFilter<"Vulnerability"> | boolean
    severity?: StringFilter<"Vulnerability"> | string
    issueSummary?: StringFilter<"Vulnerability"> | string
    remediationCode?: StringFilter<"Vulnerability"> | string
    scanReport?: XOR<ScanReportScalarRelationFilter, ScanReportWhereInput>
  }

  export type VulnerabilityOrderByWithRelationInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    functionName?: SortOrder
    startLine?: SortOrder
    endLine?: SortOrder
    vulnerabilityFound?: SortOrder
    severity?: SortOrder
    issueSummary?: SortOrder
    remediationCode?: SortOrder
    scanReport?: ScanReportOrderByWithRelationInput
  }

  export type VulnerabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    OR?: VulnerabilityWhereInput[]
    NOT?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    scanReportId?: StringFilter<"Vulnerability"> | string
    functionName?: StringFilter<"Vulnerability"> | string
    startLine?: IntFilter<"Vulnerability"> | number
    endLine?: IntFilter<"Vulnerability"> | number
    vulnerabilityFound?: BoolFilter<"Vulnerability"> | boolean
    severity?: StringFilter<"Vulnerability"> | string
    issueSummary?: StringFilter<"Vulnerability"> | string
    remediationCode?: StringFilter<"Vulnerability"> | string
    scanReport?: XOR<ScanReportScalarRelationFilter, ScanReportWhereInput>
  }, "id">

  export type VulnerabilityOrderByWithAggregationInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    functionName?: SortOrder
    startLine?: SortOrder
    endLine?: SortOrder
    vulnerabilityFound?: SortOrder
    severity?: SortOrder
    issueSummary?: SortOrder
    remediationCode?: SortOrder
    _count?: VulnerabilityCountOrderByAggregateInput
    _avg?: VulnerabilityAvgOrderByAggregateInput
    _max?: VulnerabilityMaxOrderByAggregateInput
    _min?: VulnerabilityMinOrderByAggregateInput
    _sum?: VulnerabilitySumOrderByAggregateInput
  }

  export type VulnerabilityScalarWhereWithAggregatesInput = {
    AND?: VulnerabilityScalarWhereWithAggregatesInput | VulnerabilityScalarWhereWithAggregatesInput[]
    OR?: VulnerabilityScalarWhereWithAggregatesInput[]
    NOT?: VulnerabilityScalarWhereWithAggregatesInput | VulnerabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vulnerability"> | string
    scanReportId?: StringWithAggregatesFilter<"Vulnerability"> | string
    functionName?: StringWithAggregatesFilter<"Vulnerability"> | string
    startLine?: IntWithAggregatesFilter<"Vulnerability"> | number
    endLine?: IntWithAggregatesFilter<"Vulnerability"> | number
    vulnerabilityFound?: BoolWithAggregatesFilter<"Vulnerability"> | boolean
    severity?: StringWithAggregatesFilter<"Vulnerability"> | string
    issueSummary?: StringWithAggregatesFilter<"Vulnerability"> | string
    remediationCode?: StringWithAggregatesFilter<"Vulnerability"> | string
  }

  export type TelemetryLogWhereInput = {
    AND?: TelemetryLogWhereInput | TelemetryLogWhereInput[]
    OR?: TelemetryLogWhereInput[]
    NOT?: TelemetryLogWhereInput | TelemetryLogWhereInput[]
    id?: StringFilter<"TelemetryLog"> | string
    scanReportId?: StringFilter<"TelemetryLog"> | string
    timestamp?: DateTimeFilter<"TelemetryLog"> | Date | string
    message?: StringFilter<"TelemetryLog"> | string
    type?: StringFilter<"TelemetryLog"> | string
    scanReport?: XOR<ScanReportScalarRelationFilter, ScanReportWhereInput>
  }

  export type TelemetryLogOrderByWithRelationInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    timestamp?: SortOrder
    message?: SortOrder
    type?: SortOrder
    scanReport?: ScanReportOrderByWithRelationInput
  }

  export type TelemetryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TelemetryLogWhereInput | TelemetryLogWhereInput[]
    OR?: TelemetryLogWhereInput[]
    NOT?: TelemetryLogWhereInput | TelemetryLogWhereInput[]
    scanReportId?: StringFilter<"TelemetryLog"> | string
    timestamp?: DateTimeFilter<"TelemetryLog"> | Date | string
    message?: StringFilter<"TelemetryLog"> | string
    type?: StringFilter<"TelemetryLog"> | string
    scanReport?: XOR<ScanReportScalarRelationFilter, ScanReportWhereInput>
  }, "id">

  export type TelemetryLogOrderByWithAggregationInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    timestamp?: SortOrder
    message?: SortOrder
    type?: SortOrder
    _count?: TelemetryLogCountOrderByAggregateInput
    _max?: TelemetryLogMaxOrderByAggregateInput
    _min?: TelemetryLogMinOrderByAggregateInput
  }

  export type TelemetryLogScalarWhereWithAggregatesInput = {
    AND?: TelemetryLogScalarWhereWithAggregatesInput | TelemetryLogScalarWhereWithAggregatesInput[]
    OR?: TelemetryLogScalarWhereWithAggregatesInput[]
    NOT?: TelemetryLogScalarWhereWithAggregatesInput | TelemetryLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TelemetryLog"> | string
    scanReportId?: StringWithAggregatesFilter<"TelemetryLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"TelemetryLog"> | Date | string
    message?: StringWithAggregatesFilter<"TelemetryLog"> | string
    type?: StringWithAggregatesFilter<"TelemetryLog"> | string
  }

  export type ScanReportCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    findings?: VulnerabilityCreateNestedManyWithoutScanReportInput
    systemLogs?: TelemetryLogCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    findings?: VulnerabilityUncheckedCreateNestedManyWithoutScanReportInput
    systemLogs?: TelemetryLogUncheckedCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    findings?: VulnerabilityUpdateManyWithoutScanReportNestedInput
    systemLogs?: TelemetryLogUpdateManyWithoutScanReportNestedInput
  }

  export type ScanReportUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    findings?: VulnerabilityUncheckedUpdateManyWithoutScanReportNestedInput
    systemLogs?: TelemetryLogUncheckedUpdateManyWithoutScanReportNestedInput
  }

  export type ScanReportCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
  }

  export type ScanReportUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScanReportUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VulnerabilityCreateInput = {
    id?: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
    scanReport: ScanReportCreateNestedOneWithoutFindingsInput
  }

  export type VulnerabilityUncheckedCreateInput = {
    id?: string
    scanReportId: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
  }

  export type VulnerabilityUpdateInput = {
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
    scanReport?: ScanReportUpdateOneRequiredWithoutFindingsNestedInput
  }

  export type VulnerabilityUncheckedUpdateInput = {
    scanReportId?: StringFieldUpdateOperationsInput | string
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityCreateManyInput = {
    id?: string
    scanReportId: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
  }

  export type VulnerabilityUpdateManyMutationInput = {
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityUncheckedUpdateManyInput = {
    scanReportId?: StringFieldUpdateOperationsInput | string
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogCreateInput = {
    id?: string
    timestamp?: Date | string
    message: string
    type: string
    scanReport: ScanReportCreateNestedOneWithoutSystemLogsInput
  }

  export type TelemetryLogUncheckedCreateInput = {
    id?: string
    scanReportId: string
    timestamp?: Date | string
    message: string
    type: string
  }

  export type TelemetryLogUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scanReport?: ScanReportUpdateOneRequiredWithoutSystemLogsNestedInput
  }

  export type TelemetryLogUncheckedUpdateInput = {
    scanReportId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogCreateManyInput = {
    id?: string
    scanReportId: string
    timestamp?: Date | string
    message: string
    type: string
  }

  export type TelemetryLogUpdateManyMutationInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogUncheckedUpdateManyInput = {
    scanReportId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VulnerabilityListRelationFilter = {
    every?: VulnerabilityWhereInput
    some?: VulnerabilityWhereInput
    none?: VulnerabilityWhereInput
  }

  export type TelemetryLogListRelationFilter = {
    every?: TelemetryLogWhereInput
    some?: TelemetryLogWhereInput
    none?: TelemetryLogWhereInput
  }

  export type VulnerabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TelemetryLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScanReportCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    totalBlocksScanned?: SortOrder
    success?: SortOrder
  }

  export type ScanReportAvgOrderByAggregateInput = {
    totalBlocksScanned?: SortOrder
  }

  export type ScanReportMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    totalBlocksScanned?: SortOrder
    success?: SortOrder
  }

  export type ScanReportMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    totalBlocksScanned?: SortOrder
    success?: SortOrder
  }

  export type ScanReportSumOrderByAggregateInput = {
    totalBlocksScanned?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ScanReportScalarRelationFilter = {
    is?: ScanReportWhereInput
    isNot?: ScanReportWhereInput
  }

  export type VulnerabilityCountOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    functionName?: SortOrder
    startLine?: SortOrder
    endLine?: SortOrder
    vulnerabilityFound?: SortOrder
    severity?: SortOrder
    issueSummary?: SortOrder
    remediationCode?: SortOrder
  }

  export type VulnerabilityAvgOrderByAggregateInput = {
    startLine?: SortOrder
    endLine?: SortOrder
  }

  export type VulnerabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    functionName?: SortOrder
    startLine?: SortOrder
    endLine?: SortOrder
    vulnerabilityFound?: SortOrder
    severity?: SortOrder
    issueSummary?: SortOrder
    remediationCode?: SortOrder
  }

  export type VulnerabilityMinOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    functionName?: SortOrder
    startLine?: SortOrder
    endLine?: SortOrder
    vulnerabilityFound?: SortOrder
    severity?: SortOrder
    issueSummary?: SortOrder
    remediationCode?: SortOrder
  }

  export type VulnerabilitySumOrderByAggregateInput = {
    startLine?: SortOrder
    endLine?: SortOrder
  }

  export type TelemetryLogCountOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    timestamp?: SortOrder
    message?: SortOrder
    type?: SortOrder
  }

  export type TelemetryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    timestamp?: SortOrder
    message?: SortOrder
    type?: SortOrder
  }

  export type TelemetryLogMinOrderByAggregateInput = {
    id?: SortOrder
    scanReportId?: SortOrder
    timestamp?: SortOrder
    message?: SortOrder
    type?: SortOrder
  }

  export type VulnerabilityCreateNestedManyWithoutScanReportInput = {
    create?: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput> | VulnerabilityCreateWithoutScanReportInput[] | VulnerabilityUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanReportInput | VulnerabilityCreateOrConnectWithoutScanReportInput[]
    createMany?: VulnerabilityCreateManyScanReportInputEnvelope
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
  }

  export type TelemetryLogCreateNestedManyWithoutScanReportInput = {
    create?: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput> | TelemetryLogCreateWithoutScanReportInput[] | TelemetryLogUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: TelemetryLogCreateOrConnectWithoutScanReportInput | TelemetryLogCreateOrConnectWithoutScanReportInput[]
    createMany?: TelemetryLogCreateManyScanReportInputEnvelope
    connect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
  }

  export type VulnerabilityUncheckedCreateNestedManyWithoutScanReportInput = {
    create?: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput> | VulnerabilityCreateWithoutScanReportInput[] | VulnerabilityUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanReportInput | VulnerabilityCreateOrConnectWithoutScanReportInput[]
    createMany?: VulnerabilityCreateManyScanReportInputEnvelope
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
  }

  export type TelemetryLogUncheckedCreateNestedManyWithoutScanReportInput = {
    create?: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput> | TelemetryLogCreateWithoutScanReportInput[] | TelemetryLogUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: TelemetryLogCreateOrConnectWithoutScanReportInput | TelemetryLogCreateOrConnectWithoutScanReportInput[]
    createMany?: TelemetryLogCreateManyScanReportInputEnvelope
    connect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type VulnerabilityUpdateManyWithoutScanReportNestedInput = {
    create?: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput> | VulnerabilityCreateWithoutScanReportInput[] | VulnerabilityUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanReportInput | VulnerabilityCreateOrConnectWithoutScanReportInput[]
    upsert?: VulnerabilityUpsertWithWhereUniqueWithoutScanReportInput | VulnerabilityUpsertWithWhereUniqueWithoutScanReportInput[]
    createMany?: VulnerabilityCreateManyScanReportInputEnvelope
    set?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    disconnect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    delete?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    update?: VulnerabilityUpdateWithWhereUniqueWithoutScanReportInput | VulnerabilityUpdateWithWhereUniqueWithoutScanReportInput[]
    updateMany?: VulnerabilityUpdateManyWithWhereWithoutScanReportInput | VulnerabilityUpdateManyWithWhereWithoutScanReportInput[]
    deleteMany?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
  }

  export type TelemetryLogUpdateManyWithoutScanReportNestedInput = {
    create?: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput> | TelemetryLogCreateWithoutScanReportInput[] | TelemetryLogUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: TelemetryLogCreateOrConnectWithoutScanReportInput | TelemetryLogCreateOrConnectWithoutScanReportInput[]
    upsert?: TelemetryLogUpsertWithWhereUniqueWithoutScanReportInput | TelemetryLogUpsertWithWhereUniqueWithoutScanReportInput[]
    createMany?: TelemetryLogCreateManyScanReportInputEnvelope
    set?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    disconnect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    delete?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    connect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    update?: TelemetryLogUpdateWithWhereUniqueWithoutScanReportInput | TelemetryLogUpdateWithWhereUniqueWithoutScanReportInput[]
    updateMany?: TelemetryLogUpdateManyWithWhereWithoutScanReportInput | TelemetryLogUpdateManyWithWhereWithoutScanReportInput[]
    deleteMany?: TelemetryLogScalarWhereInput | TelemetryLogScalarWhereInput[]
  }

  export type VulnerabilityUncheckedUpdateManyWithoutScanReportNestedInput = {
    create?: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput> | VulnerabilityCreateWithoutScanReportInput[] | VulnerabilityUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanReportInput | VulnerabilityCreateOrConnectWithoutScanReportInput[]
    upsert?: VulnerabilityUpsertWithWhereUniqueWithoutScanReportInput | VulnerabilityUpsertWithWhereUniqueWithoutScanReportInput[]
    createMany?: VulnerabilityCreateManyScanReportInputEnvelope
    set?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    disconnect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    delete?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    update?: VulnerabilityUpdateWithWhereUniqueWithoutScanReportInput | VulnerabilityUpdateWithWhereUniqueWithoutScanReportInput[]
    updateMany?: VulnerabilityUpdateManyWithWhereWithoutScanReportInput | VulnerabilityUpdateManyWithWhereWithoutScanReportInput[]
    deleteMany?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
  }

  export type TelemetryLogUncheckedUpdateManyWithoutScanReportNestedInput = {
    create?: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput> | TelemetryLogCreateWithoutScanReportInput[] | TelemetryLogUncheckedCreateWithoutScanReportInput[]
    connectOrCreate?: TelemetryLogCreateOrConnectWithoutScanReportInput | TelemetryLogCreateOrConnectWithoutScanReportInput[]
    upsert?: TelemetryLogUpsertWithWhereUniqueWithoutScanReportInput | TelemetryLogUpsertWithWhereUniqueWithoutScanReportInput[]
    createMany?: TelemetryLogCreateManyScanReportInputEnvelope
    set?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    disconnect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    delete?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    connect?: TelemetryLogWhereUniqueInput | TelemetryLogWhereUniqueInput[]
    update?: TelemetryLogUpdateWithWhereUniqueWithoutScanReportInput | TelemetryLogUpdateWithWhereUniqueWithoutScanReportInput[]
    updateMany?: TelemetryLogUpdateManyWithWhereWithoutScanReportInput | TelemetryLogUpdateManyWithWhereWithoutScanReportInput[]
    deleteMany?: TelemetryLogScalarWhereInput | TelemetryLogScalarWhereInput[]
  }

  export type ScanReportCreateNestedOneWithoutFindingsInput = {
    create?: XOR<ScanReportCreateWithoutFindingsInput, ScanReportUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: ScanReportCreateOrConnectWithoutFindingsInput
    connect?: ScanReportWhereUniqueInput
  }

  export type ScanReportUpdateOneRequiredWithoutFindingsNestedInput = {
    create?: XOR<ScanReportCreateWithoutFindingsInput, ScanReportUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: ScanReportCreateOrConnectWithoutFindingsInput
    upsert?: ScanReportUpsertWithoutFindingsInput
    connect?: ScanReportWhereUniqueInput
    update?: XOR<XOR<ScanReportUpdateToOneWithWhereWithoutFindingsInput, ScanReportUpdateWithoutFindingsInput>, ScanReportUncheckedUpdateWithoutFindingsInput>
  }

  export type ScanReportCreateNestedOneWithoutSystemLogsInput = {
    create?: XOR<ScanReportCreateWithoutSystemLogsInput, ScanReportUncheckedCreateWithoutSystemLogsInput>
    connectOrCreate?: ScanReportCreateOrConnectWithoutSystemLogsInput
    connect?: ScanReportWhereUniqueInput
  }

  export type ScanReportUpdateOneRequiredWithoutSystemLogsNestedInput = {
    create?: XOR<ScanReportCreateWithoutSystemLogsInput, ScanReportUncheckedCreateWithoutSystemLogsInput>
    connectOrCreate?: ScanReportCreateOrConnectWithoutSystemLogsInput
    upsert?: ScanReportUpsertWithoutSystemLogsInput
    connect?: ScanReportWhereUniqueInput
    update?: XOR<XOR<ScanReportUpdateToOneWithWhereWithoutSystemLogsInput, ScanReportUpdateWithoutSystemLogsInput>, ScanReportUncheckedUpdateWithoutSystemLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type VulnerabilityCreateWithoutScanReportInput = {
    id?: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
  }

  export type VulnerabilityUncheckedCreateWithoutScanReportInput = {
    id?: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
  }

  export type VulnerabilityCreateOrConnectWithoutScanReportInput = {
    where: VulnerabilityWhereUniqueInput
    create: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput>
  }

  export type VulnerabilityCreateManyScanReportInputEnvelope = {
    data: VulnerabilityCreateManyScanReportInput | VulnerabilityCreateManyScanReportInput[]
  }

  export type TelemetryLogCreateWithoutScanReportInput = {
    id?: string
    timestamp?: Date | string
    message: string
    type: string
  }

  export type TelemetryLogUncheckedCreateWithoutScanReportInput = {
    id?: string
    timestamp?: Date | string
    message: string
    type: string
  }

  export type TelemetryLogCreateOrConnectWithoutScanReportInput = {
    where: TelemetryLogWhereUniqueInput
    create: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput>
  }

  export type TelemetryLogCreateManyScanReportInputEnvelope = {
    data: TelemetryLogCreateManyScanReportInput | TelemetryLogCreateManyScanReportInput[]
  }

  export type VulnerabilityUpsertWithWhereUniqueWithoutScanReportInput = {
    where: VulnerabilityWhereUniqueInput
    update: XOR<VulnerabilityUpdateWithoutScanReportInput, VulnerabilityUncheckedUpdateWithoutScanReportInput>
    create: XOR<VulnerabilityCreateWithoutScanReportInput, VulnerabilityUncheckedCreateWithoutScanReportInput>
  }

  export type VulnerabilityUpdateWithWhereUniqueWithoutScanReportInput = {
    where: VulnerabilityWhereUniqueInput
    data: XOR<VulnerabilityUpdateWithoutScanReportInput, VulnerabilityUncheckedUpdateWithoutScanReportInput>
  }

  export type VulnerabilityUpdateManyWithWhereWithoutScanReportInput = {
    where: VulnerabilityScalarWhereInput
    data: XOR<VulnerabilityUpdateManyMutationInput, VulnerabilityUncheckedUpdateManyWithoutScanReportInput>
  }

  export type VulnerabilityScalarWhereInput = {
    AND?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
    OR?: VulnerabilityScalarWhereInput[]
    NOT?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
    id?: StringFilter<"Vulnerability"> | string
    scanReportId?: StringFilter<"Vulnerability"> | string
    functionName?: StringFilter<"Vulnerability"> | string
    startLine?: IntFilter<"Vulnerability"> | number
    endLine?: IntFilter<"Vulnerability"> | number
    vulnerabilityFound?: BoolFilter<"Vulnerability"> | boolean
    severity?: StringFilter<"Vulnerability"> | string
    issueSummary?: StringFilter<"Vulnerability"> | string
    remediationCode?: StringFilter<"Vulnerability"> | string
  }

  export type TelemetryLogUpsertWithWhereUniqueWithoutScanReportInput = {
    where: TelemetryLogWhereUniqueInput
    update: XOR<TelemetryLogUpdateWithoutScanReportInput, TelemetryLogUncheckedUpdateWithoutScanReportInput>
    create: XOR<TelemetryLogCreateWithoutScanReportInput, TelemetryLogUncheckedCreateWithoutScanReportInput>
  }

  export type TelemetryLogUpdateWithWhereUniqueWithoutScanReportInput = {
    where: TelemetryLogWhereUniqueInput
    data: XOR<TelemetryLogUpdateWithoutScanReportInput, TelemetryLogUncheckedUpdateWithoutScanReportInput>
  }

  export type TelemetryLogUpdateManyWithWhereWithoutScanReportInput = {
    where: TelemetryLogScalarWhereInput
    data: XOR<TelemetryLogUpdateManyMutationInput, TelemetryLogUncheckedUpdateManyWithoutScanReportInput>
  }

  export type TelemetryLogScalarWhereInput = {
    AND?: TelemetryLogScalarWhereInput | TelemetryLogScalarWhereInput[]
    OR?: TelemetryLogScalarWhereInput[]
    NOT?: TelemetryLogScalarWhereInput | TelemetryLogScalarWhereInput[]
    id?: StringFilter<"TelemetryLog"> | string
    scanReportId?: StringFilter<"TelemetryLog"> | string
    timestamp?: DateTimeFilter<"TelemetryLog"> | Date | string
    message?: StringFilter<"TelemetryLog"> | string
    type?: StringFilter<"TelemetryLog"> | string
  }

  export type ScanReportCreateWithoutFindingsInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    systemLogs?: TelemetryLogCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportUncheckedCreateWithoutFindingsInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    systemLogs?: TelemetryLogUncheckedCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportCreateOrConnectWithoutFindingsInput = {
    where: ScanReportWhereUniqueInput
    create: XOR<ScanReportCreateWithoutFindingsInput, ScanReportUncheckedCreateWithoutFindingsInput>
  }

  export type ScanReportUpsertWithoutFindingsInput = {
    update: XOR<ScanReportUpdateWithoutFindingsInput, ScanReportUncheckedUpdateWithoutFindingsInput>
    create: XOR<ScanReportCreateWithoutFindingsInput, ScanReportUncheckedCreateWithoutFindingsInput>
    where?: ScanReportWhereInput
  }

  export type ScanReportUpdateToOneWithWhereWithoutFindingsInput = {
    where?: ScanReportWhereInput
    data: XOR<ScanReportUpdateWithoutFindingsInput, ScanReportUncheckedUpdateWithoutFindingsInput>
  }

  export type ScanReportUpdateWithoutFindingsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    systemLogs?: TelemetryLogUpdateManyWithoutScanReportNestedInput
  }

  export type ScanReportUncheckedUpdateWithoutFindingsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    systemLogs?: TelemetryLogUncheckedUpdateManyWithoutScanReportNestedInput
  }

  export type ScanReportCreateWithoutSystemLogsInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    findings?: VulnerabilityCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportUncheckedCreateWithoutSystemLogsInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    fileName?: string | null
    totalBlocksScanned: number
    success?: boolean
    findings?: VulnerabilityUncheckedCreateNestedManyWithoutScanReportInput
  }

  export type ScanReportCreateOrConnectWithoutSystemLogsInput = {
    where: ScanReportWhereUniqueInput
    create: XOR<ScanReportCreateWithoutSystemLogsInput, ScanReportUncheckedCreateWithoutSystemLogsInput>
  }

  export type ScanReportUpsertWithoutSystemLogsInput = {
    update: XOR<ScanReportUpdateWithoutSystemLogsInput, ScanReportUncheckedUpdateWithoutSystemLogsInput>
    create: XOR<ScanReportCreateWithoutSystemLogsInput, ScanReportUncheckedCreateWithoutSystemLogsInput>
    where?: ScanReportWhereInput
  }

  export type ScanReportUpdateToOneWithWhereWithoutSystemLogsInput = {
    where?: ScanReportWhereInput
    data: XOR<ScanReportUpdateWithoutSystemLogsInput, ScanReportUncheckedUpdateWithoutSystemLogsInput>
  }

  export type ScanReportUpdateWithoutSystemLogsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    findings?: VulnerabilityUpdateManyWithoutScanReportNestedInput
  }

  export type ScanReportUncheckedUpdateWithoutSystemLogsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    totalBlocksScanned?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    findings?: VulnerabilityUncheckedUpdateManyWithoutScanReportNestedInput
  }

  export type VulnerabilityCreateManyScanReportInput = {
    id?: string
    functionName: string
    startLine: number
    endLine: number
    vulnerabilityFound: boolean
    severity: string
    issueSummary: string
    remediationCode: string
  }

  export type TelemetryLogCreateManyScanReportInput = {
    id?: string
    timestamp?: Date | string
    message: string
    type: string
  }

  export type VulnerabilityUpdateWithoutScanReportInput = {
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityUncheckedUpdateWithoutScanReportInput = {
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityUncheckedUpdateManyWithoutScanReportInput = {
    functionName?: StringFieldUpdateOperationsInput | string
    startLine?: IntFieldUpdateOperationsInput | number
    endLine?: IntFieldUpdateOperationsInput | number
    vulnerabilityFound?: BoolFieldUpdateOperationsInput | boolean
    severity?: StringFieldUpdateOperationsInput | string
    issueSummary?: StringFieldUpdateOperationsInput | string
    remediationCode?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogUpdateWithoutScanReportInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogUncheckedUpdateWithoutScanReportInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TelemetryLogUncheckedUpdateManyWithoutScanReportInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}