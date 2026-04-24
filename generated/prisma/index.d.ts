
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model Transport
 * 
 */
export type Transport = $Result.DefaultSelection<Prisma.$TransportPayload>
/**
 * Model TransportJoin
 * 
 */
export type TransportJoin = $Result.DefaultSelection<Prisma.$TransportJoinPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ListingType: {
  LOOKING_FOR: 'LOOKING_FOR',
  HAS_APARTMENT: 'HAS_APARTMENT'
};

export type ListingType = (typeof ListingType)[keyof typeof ListingType]

}

export type ListingType = $Enums.ListingType

export const ListingType: typeof $Enums.ListingType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transport`: Exposes CRUD operations for the **Transport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transports
    * const transports = await prisma.transport.findMany()
    * ```
    */
  get transport(): Prisma.TransportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transportJoin`: Exposes CRUD operations for the **TransportJoin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransportJoins
    * const transportJoins = await prisma.transportJoin.findMany()
    * ```
    */
  get transportJoin(): Prisma.TransportJoinDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
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
    User: 'User',
    Listing: 'Listing',
    Transport: 'Transport',
    TransportJoin: 'TransportJoin'
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
      modelProps: "user" | "listing" | "transport" | "transportJoin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      Transport: {
        payload: Prisma.$TransportPayload<ExtArgs>
        fields: Prisma.TransportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          findFirst: {
            args: Prisma.TransportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          findMany: {
            args: Prisma.TransportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>[]
          }
          create: {
            args: Prisma.TransportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          createMany: {
            args: Prisma.TransportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>[]
          }
          delete: {
            args: Prisma.TransportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          update: {
            args: Prisma.TransportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          deleteMany: {
            args: Prisma.TransportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>[]
          }
          upsert: {
            args: Prisma.TransportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportPayload>
          }
          aggregate: {
            args: Prisma.TransportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransport>
          }
          groupBy: {
            args: Prisma.TransportGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransportGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransportCountArgs<ExtArgs>
            result: $Utils.Optional<TransportCountAggregateOutputType> | number
          }
        }
      }
      TransportJoin: {
        payload: Prisma.$TransportJoinPayload<ExtArgs>
        fields: Prisma.TransportJoinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransportJoinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransportJoinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          findFirst: {
            args: Prisma.TransportJoinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransportJoinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          findMany: {
            args: Prisma.TransportJoinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>[]
          }
          create: {
            args: Prisma.TransportJoinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          createMany: {
            args: Prisma.TransportJoinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransportJoinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>[]
          }
          delete: {
            args: Prisma.TransportJoinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          update: {
            args: Prisma.TransportJoinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          deleteMany: {
            args: Prisma.TransportJoinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransportJoinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransportJoinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>[]
          }
          upsert: {
            args: Prisma.TransportJoinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportJoinPayload>
          }
          aggregate: {
            args: Prisma.TransportJoinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransportJoin>
          }
          groupBy: {
            args: Prisma.TransportJoinGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransportJoinGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransportJoinCountArgs<ExtArgs>
            result: $Utils.Optional<TransportJoinCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
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
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    listing?: ListingOmit
    transport?: TransportOmit
    transportJoin?: TransportJoinOmit
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
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    listings: number
    transports: number
    transportJoins: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | UserCountOutputTypeCountListingsArgs
    transports?: boolean | UserCountOutputTypeCountTransportsArgs
    transportJoins?: boolean | UserCountOutputTypeCountTransportJoinsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransportJoinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportJoinWhereInput
  }


  /**
   * Count Type TransportCountOutputType
   */

  export type TransportCountOutputType = {
    joins: number
  }

  export type TransportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    joins?: boolean | TransportCountOutputTypeCountJoinsArgs
  }

  // Custom InputTypes
  /**
   * TransportCountOutputType without action
   */
  export type TransportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportCountOutputType
     */
    select?: TransportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransportCountOutputType without action
   */
  export type TransportCountOutputTypeCountJoinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportJoinWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    bio: string | null
    instagram: string | null
    phone: string | null
    isPremium: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    bio: string | null
    instagram: string | null
    phone: string | null
    isPremium: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    bio: number
    instagram: number
    phone: number
    isPremium: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    bio?: true
    instagram?: true
    phone?: true
    isPremium?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    bio?: true
    instagram?: true
    phone?: true
    isPremium?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    bio?: true
    instagram?: true
    phone?: true
    isPremium?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    bio: string | null
    instagram: string | null
    phone: string | null
    isPremium: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    bio?: boolean
    instagram?: boolean
    phone?: boolean
    isPremium?: boolean
    listings?: boolean | User$listingsArgs<ExtArgs>
    transports?: boolean | User$transportsArgs<ExtArgs>
    transportJoins?: boolean | User$transportJoinsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    bio?: boolean
    instagram?: boolean
    phone?: boolean
    isPremium?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    bio?: boolean
    instagram?: boolean
    phone?: boolean
    isPremium?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    bio?: boolean
    instagram?: boolean
    phone?: boolean
    isPremium?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "bio" | "instagram" | "phone" | "isPremium", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | User$listingsArgs<ExtArgs>
    transports?: boolean | User$transportsArgs<ExtArgs>
    transportJoins?: boolean | User$transportJoinsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      listings: Prisma.$ListingPayload<ExtArgs>[]
      transports: Prisma.$TransportPayload<ExtArgs>[]
      transportJoins: Prisma.$TransportJoinPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      bio: string | null
      instagram: string | null
      phone: string | null
      isPremium: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends User$listingsArgs<ExtArgs> = {}>(args?: Subset<T, User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transports<T extends User$transportsArgs<ExtArgs> = {}>(args?: Subset<T, User$transportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transportJoins<T extends User$transportJoinsArgs<ExtArgs> = {}>(args?: Subset<T, User$transportJoinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly instagram: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly isPremium: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.listings
   */
  export type User$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * User.transports
   */
  export type User$transportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    where?: TransportWhereInput
    orderBy?: TransportOrderByWithRelationInput | TransportOrderByWithRelationInput[]
    cursor?: TransportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransportScalarFieldEnum | TransportScalarFieldEnum[]
  }

  /**
   * User.transportJoins
   */
  export type User$transportJoinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    where?: TransportJoinWhereInput
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    cursor?: TransportJoinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransportJoinScalarFieldEnum | TransportJoinScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    price: number | null
    roommatesNeeded: number | null
  }

  export type ListingSumAggregateOutputType = {
    price: number | null
    roommatesNeeded: number | null
  }

  export type ListingMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    description: string | null
    location: string | null
    type: $Enums.ListingType | null
    price: number | null
    startDate: Date | null
    endDate: Date | null
    whatsappNumber: string | null
    roommatesNeeded: number | null
    userId: string | null
  }

  export type ListingMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    description: string | null
    location: string | null
    type: $Enums.ListingType | null
    price: number | null
    startDate: Date | null
    endDate: Date | null
    whatsappNumber: string | null
    roommatesNeeded: number | null
    userId: string | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    createdAt: number
    title: number
    description: number
    location: number
    type: number
    price: number
    startDate: number
    endDate: number
    whatsappNumber: number
    roommatesNeeded: number
    images: number
    userId: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    price?: true
    roommatesNeeded?: true
  }

  export type ListingSumAggregateInputType = {
    price?: true
    roommatesNeeded?: true
  }

  export type ListingMinAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    location?: true
    type?: true
    price?: true
    startDate?: true
    endDate?: true
    whatsappNumber?: true
    roommatesNeeded?: true
    userId?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    location?: true
    type?: true
    price?: true
    startDate?: true
    endDate?: true
    whatsappNumber?: true
    roommatesNeeded?: true
    userId?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    location?: true
    type?: true
    price?: true
    startDate?: true
    endDate?: true
    whatsappNumber?: true
    roommatesNeeded?: true
    images?: true
    userId?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: string
    createdAt: Date
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date
    endDate: Date
    whatsappNumber: string
    roommatesNeeded: number
    images: string[]
    userId: string
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    type?: boolean
    price?: boolean
    startDate?: boolean
    endDate?: boolean
    whatsappNumber?: boolean
    roommatesNeeded?: boolean
    images?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    type?: boolean
    price?: boolean
    startDate?: boolean
    endDate?: boolean
    whatsappNumber?: boolean
    roommatesNeeded?: boolean
    images?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    type?: boolean
    price?: boolean
    startDate?: boolean
    endDate?: boolean
    whatsappNumber?: boolean
    roommatesNeeded?: boolean
    images?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    type?: boolean
    price?: boolean
    startDate?: boolean
    endDate?: boolean
    whatsappNumber?: boolean
    roommatesNeeded?: boolean
    images?: boolean
    userId?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "title" | "description" | "location" | "type" | "price" | "startDate" | "endDate" | "whatsappNumber" | "roommatesNeeded" | "images" | "userId", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      title: string
      description: string
      location: string
      type: $Enums.ListingType
      price: number
      startDate: Date
      endDate: Date
      whatsappNumber: string
      roommatesNeeded: number
      images: string[]
      userId: string
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings and returns the data updated in the database.
     * @param {ListingUpdateManyAndReturnArgs} args - Arguments to update many Listings.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
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
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'String'>
    readonly createdAt: FieldRef<"Listing", 'DateTime'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly description: FieldRef<"Listing", 'String'>
    readonly location: FieldRef<"Listing", 'String'>
    readonly type: FieldRef<"Listing", 'ListingType'>
    readonly price: FieldRef<"Listing", 'Float'>
    readonly startDate: FieldRef<"Listing", 'DateTime'>
    readonly endDate: FieldRef<"Listing", 'DateTime'>
    readonly whatsappNumber: FieldRef<"Listing", 'String'>
    readonly roommatesNeeded: FieldRef<"Listing", 'Int'>
    readonly images: FieldRef<"Listing", 'String[]'>
    readonly userId: FieldRef<"Listing", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing updateManyAndReturn
   */
  export type ListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model Transport
   */

  export type AggregateTransport = {
    _count: TransportCountAggregateOutputType | null
    _avg: TransportAvgAggregateOutputType | null
    _sum: TransportSumAggregateOutputType | null
    _min: TransportMinAggregateOutputType | null
    _max: TransportMaxAggregateOutputType | null
  }

  export type TransportAvgAggregateOutputType = {
    totalSeats: number | null
    availableSeats: number | null
    pricePerPerson: number | null
  }

  export type TransportSumAggregateOutputType = {
    totalSeats: number | null
    availableSeats: number | null
    pricePerPerson: number | null
  }

  export type TransportMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    creatorId: string | null
    origin: string | null
    destination: string | null
    date: Date | null
    totalSeats: number | null
    availableSeats: number | null
    pricePerPerson: number | null
    description: string | null
  }

  export type TransportMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    creatorId: string | null
    origin: string | null
    destination: string | null
    date: Date | null
    totalSeats: number | null
    availableSeats: number | null
    pricePerPerson: number | null
    description: string | null
  }

  export type TransportCountAggregateOutputType = {
    id: number
    createdAt: number
    creatorId: number
    origin: number
    destination: number
    date: number
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: number
    _all: number
  }


  export type TransportAvgAggregateInputType = {
    totalSeats?: true
    availableSeats?: true
    pricePerPerson?: true
  }

  export type TransportSumAggregateInputType = {
    totalSeats?: true
    availableSeats?: true
    pricePerPerson?: true
  }

  export type TransportMinAggregateInputType = {
    id?: true
    createdAt?: true
    creatorId?: true
    origin?: true
    destination?: true
    date?: true
    totalSeats?: true
    availableSeats?: true
    pricePerPerson?: true
    description?: true
  }

  export type TransportMaxAggregateInputType = {
    id?: true
    createdAt?: true
    creatorId?: true
    origin?: true
    destination?: true
    date?: true
    totalSeats?: true
    availableSeats?: true
    pricePerPerson?: true
    description?: true
  }

  export type TransportCountAggregateInputType = {
    id?: true
    createdAt?: true
    creatorId?: true
    origin?: true
    destination?: true
    date?: true
    totalSeats?: true
    availableSeats?: true
    pricePerPerson?: true
    description?: true
    _all?: true
  }

  export type TransportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transport to aggregate.
     */
    where?: TransportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transports to fetch.
     */
    orderBy?: TransportOrderByWithRelationInput | TransportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transports
    **/
    _count?: true | TransportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransportMaxAggregateInputType
  }

  export type GetTransportAggregateType<T extends TransportAggregateArgs> = {
        [P in keyof T & keyof AggregateTransport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransport[P]>
      : GetScalarType<T[P], AggregateTransport[P]>
  }




  export type TransportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportWhereInput
    orderBy?: TransportOrderByWithAggregationInput | TransportOrderByWithAggregationInput[]
    by: TransportScalarFieldEnum[] | TransportScalarFieldEnum
    having?: TransportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransportCountAggregateInputType | true
    _avg?: TransportAvgAggregateInputType
    _sum?: TransportSumAggregateInputType
    _min?: TransportMinAggregateInputType
    _max?: TransportMaxAggregateInputType
  }

  export type TransportGroupByOutputType = {
    id: string
    createdAt: Date
    creatorId: string
    origin: string
    destination: string
    date: Date
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    _count: TransportCountAggregateOutputType | null
    _avg: TransportAvgAggregateOutputType | null
    _sum: TransportSumAggregateOutputType | null
    _min: TransportMinAggregateOutputType | null
    _max: TransportMaxAggregateOutputType | null
  }

  type GetTransportGroupByPayload<T extends TransportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransportGroupByOutputType[P]>
            : GetScalarType<T[P], TransportGroupByOutputType[P]>
        }
      >
    >


  export type TransportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    creatorId?: boolean
    origin?: boolean
    destination?: boolean
    date?: boolean
    totalSeats?: boolean
    availableSeats?: boolean
    pricePerPerson?: boolean
    description?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    joins?: boolean | Transport$joinsArgs<ExtArgs>
    _count?: boolean | TransportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transport"]>

  export type TransportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    creatorId?: boolean
    origin?: boolean
    destination?: boolean
    date?: boolean
    totalSeats?: boolean
    availableSeats?: boolean
    pricePerPerson?: boolean
    description?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transport"]>

  export type TransportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    creatorId?: boolean
    origin?: boolean
    destination?: boolean
    date?: boolean
    totalSeats?: boolean
    availableSeats?: boolean
    pricePerPerson?: boolean
    description?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transport"]>

  export type TransportSelectScalar = {
    id?: boolean
    createdAt?: boolean
    creatorId?: boolean
    origin?: boolean
    destination?: boolean
    date?: boolean
    totalSeats?: boolean
    availableSeats?: boolean
    pricePerPerson?: boolean
    description?: boolean
  }

  export type TransportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "creatorId" | "origin" | "destination" | "date" | "totalSeats" | "availableSeats" | "pricePerPerson" | "description", ExtArgs["result"]["transport"]>
  export type TransportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    joins?: boolean | Transport$joinsArgs<ExtArgs>
    _count?: boolean | TransportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transport"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      joins: Prisma.$TransportJoinPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      creatorId: string
      origin: string
      destination: string
      date: Date
      totalSeats: number
      availableSeats: number
      pricePerPerson: number
      description: string
    }, ExtArgs["result"]["transport"]>
    composites: {}
  }

  type TransportGetPayload<S extends boolean | null | undefined | TransportDefaultArgs> = $Result.GetResult<Prisma.$TransportPayload, S>

  type TransportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransportCountAggregateInputType | true
    }

  export interface TransportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transport'], meta: { name: 'Transport' } }
    /**
     * Find zero or one Transport that matches the filter.
     * @param {TransportFindUniqueArgs} args - Arguments to find a Transport
     * @example
     * // Get one Transport
     * const transport = await prisma.transport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransportFindUniqueArgs>(args: SelectSubset<T, TransportFindUniqueArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransportFindUniqueOrThrowArgs} args - Arguments to find a Transport
     * @example
     * // Get one Transport
     * const transport = await prisma.transport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransportFindUniqueOrThrowArgs>(args: SelectSubset<T, TransportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportFindFirstArgs} args - Arguments to find a Transport
     * @example
     * // Get one Transport
     * const transport = await prisma.transport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransportFindFirstArgs>(args?: SelectSubset<T, TransportFindFirstArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportFindFirstOrThrowArgs} args - Arguments to find a Transport
     * @example
     * // Get one Transport
     * const transport = await prisma.transport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransportFindFirstOrThrowArgs>(args?: SelectSubset<T, TransportFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transports
     * const transports = await prisma.transport.findMany()
     * 
     * // Get first 10 Transports
     * const transports = await prisma.transport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transportWithIdOnly = await prisma.transport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransportFindManyArgs>(args?: SelectSubset<T, TransportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transport.
     * @param {TransportCreateArgs} args - Arguments to create a Transport.
     * @example
     * // Create one Transport
     * const Transport = await prisma.transport.create({
     *   data: {
     *     // ... data to create a Transport
     *   }
     * })
     * 
     */
    create<T extends TransportCreateArgs>(args: SelectSubset<T, TransportCreateArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transports.
     * @param {TransportCreateManyArgs} args - Arguments to create many Transports.
     * @example
     * // Create many Transports
     * const transport = await prisma.transport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransportCreateManyArgs>(args?: SelectSubset<T, TransportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transports and returns the data saved in the database.
     * @param {TransportCreateManyAndReturnArgs} args - Arguments to create many Transports.
     * @example
     * // Create many Transports
     * const transport = await prisma.transport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transports and only return the `id`
     * const transportWithIdOnly = await prisma.transport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransportCreateManyAndReturnArgs>(args?: SelectSubset<T, TransportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transport.
     * @param {TransportDeleteArgs} args - Arguments to delete one Transport.
     * @example
     * // Delete one Transport
     * const Transport = await prisma.transport.delete({
     *   where: {
     *     // ... filter to delete one Transport
     *   }
     * })
     * 
     */
    delete<T extends TransportDeleteArgs>(args: SelectSubset<T, TransportDeleteArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transport.
     * @param {TransportUpdateArgs} args - Arguments to update one Transport.
     * @example
     * // Update one Transport
     * const transport = await prisma.transport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransportUpdateArgs>(args: SelectSubset<T, TransportUpdateArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transports.
     * @param {TransportDeleteManyArgs} args - Arguments to filter Transports to delete.
     * @example
     * // Delete a few Transports
     * const { count } = await prisma.transport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransportDeleteManyArgs>(args?: SelectSubset<T, TransportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transports
     * const transport = await prisma.transport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransportUpdateManyArgs>(args: SelectSubset<T, TransportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transports and returns the data updated in the database.
     * @param {TransportUpdateManyAndReturnArgs} args - Arguments to update many Transports.
     * @example
     * // Update many Transports
     * const transport = await prisma.transport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transports and only return the `id`
     * const transportWithIdOnly = await prisma.transport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransportUpdateManyAndReturnArgs>(args: SelectSubset<T, TransportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transport.
     * @param {TransportUpsertArgs} args - Arguments to update or create a Transport.
     * @example
     * // Update or create a Transport
     * const transport = await prisma.transport.upsert({
     *   create: {
     *     // ... data to create a Transport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transport we want to update
     *   }
     * })
     */
    upsert<T extends TransportUpsertArgs>(args: SelectSubset<T, TransportUpsertArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportCountArgs} args - Arguments to filter Transports to count.
     * @example
     * // Count the number of Transports
     * const count = await prisma.transport.count({
     *   where: {
     *     // ... the filter for the Transports we want to count
     *   }
     * })
    **/
    count<T extends TransportCountArgs>(
      args?: Subset<T, TransportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransportAggregateArgs>(args: Subset<T, TransportAggregateArgs>): Prisma.PrismaPromise<GetTransportAggregateType<T>>

    /**
     * Group by Transport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportGroupByArgs} args - Group by arguments.
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
      T extends TransportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransportGroupByArgs['orderBy'] }
        : { orderBy?: TransportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transport model
   */
  readonly fields: TransportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    joins<T extends Transport$joinsArgs<ExtArgs> = {}>(args?: Subset<T, Transport$joinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Transport model
   */
  interface TransportFieldRefs {
    readonly id: FieldRef<"Transport", 'String'>
    readonly createdAt: FieldRef<"Transport", 'DateTime'>
    readonly creatorId: FieldRef<"Transport", 'String'>
    readonly origin: FieldRef<"Transport", 'String'>
    readonly destination: FieldRef<"Transport", 'String'>
    readonly date: FieldRef<"Transport", 'DateTime'>
    readonly totalSeats: FieldRef<"Transport", 'Int'>
    readonly availableSeats: FieldRef<"Transport", 'Int'>
    readonly pricePerPerson: FieldRef<"Transport", 'Float'>
    readonly description: FieldRef<"Transport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transport findUnique
   */
  export type TransportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter, which Transport to fetch.
     */
    where: TransportWhereUniqueInput
  }

  /**
   * Transport findUniqueOrThrow
   */
  export type TransportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter, which Transport to fetch.
     */
    where: TransportWhereUniqueInput
  }

  /**
   * Transport findFirst
   */
  export type TransportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter, which Transport to fetch.
     */
    where?: TransportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transports to fetch.
     */
    orderBy?: TransportOrderByWithRelationInput | TransportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transports.
     */
    cursor?: TransportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transports.
     */
    distinct?: TransportScalarFieldEnum | TransportScalarFieldEnum[]
  }

  /**
   * Transport findFirstOrThrow
   */
  export type TransportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter, which Transport to fetch.
     */
    where?: TransportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transports to fetch.
     */
    orderBy?: TransportOrderByWithRelationInput | TransportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transports.
     */
    cursor?: TransportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transports.
     */
    distinct?: TransportScalarFieldEnum | TransportScalarFieldEnum[]
  }

  /**
   * Transport findMany
   */
  export type TransportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter, which Transports to fetch.
     */
    where?: TransportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transports to fetch.
     */
    orderBy?: TransportOrderByWithRelationInput | TransportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transports.
     */
    cursor?: TransportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transports.
     */
    distinct?: TransportScalarFieldEnum | TransportScalarFieldEnum[]
  }

  /**
   * Transport create
   */
  export type TransportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * The data needed to create a Transport.
     */
    data: XOR<TransportCreateInput, TransportUncheckedCreateInput>
  }

  /**
   * Transport createMany
   */
  export type TransportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transports.
     */
    data: TransportCreateManyInput | TransportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transport createManyAndReturn
   */
  export type TransportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * The data used to create many Transports.
     */
    data: TransportCreateManyInput | TransportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transport update
   */
  export type TransportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * The data needed to update a Transport.
     */
    data: XOR<TransportUpdateInput, TransportUncheckedUpdateInput>
    /**
     * Choose, which Transport to update.
     */
    where: TransportWhereUniqueInput
  }

  /**
   * Transport updateMany
   */
  export type TransportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transports.
     */
    data: XOR<TransportUpdateManyMutationInput, TransportUncheckedUpdateManyInput>
    /**
     * Filter which Transports to update
     */
    where?: TransportWhereInput
    /**
     * Limit how many Transports to update.
     */
    limit?: number
  }

  /**
   * Transport updateManyAndReturn
   */
  export type TransportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * The data used to update Transports.
     */
    data: XOR<TransportUpdateManyMutationInput, TransportUncheckedUpdateManyInput>
    /**
     * Filter which Transports to update
     */
    where?: TransportWhereInput
    /**
     * Limit how many Transports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transport upsert
   */
  export type TransportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * The filter to search for the Transport to update in case it exists.
     */
    where: TransportWhereUniqueInput
    /**
     * In case the Transport found by the `where` argument doesn't exist, create a new Transport with this data.
     */
    create: XOR<TransportCreateInput, TransportUncheckedCreateInput>
    /**
     * In case the Transport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransportUpdateInput, TransportUncheckedUpdateInput>
  }

  /**
   * Transport delete
   */
  export type TransportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
    /**
     * Filter which Transport to delete.
     */
    where: TransportWhereUniqueInput
  }

  /**
   * Transport deleteMany
   */
  export type TransportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transports to delete
     */
    where?: TransportWhereInput
    /**
     * Limit how many Transports to delete.
     */
    limit?: number
  }

  /**
   * Transport.joins
   */
  export type Transport$joinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    where?: TransportJoinWhereInput
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    cursor?: TransportJoinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransportJoinScalarFieldEnum | TransportJoinScalarFieldEnum[]
  }

  /**
   * Transport without action
   */
  export type TransportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transport
     */
    select?: TransportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transport
     */
    omit?: TransportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportInclude<ExtArgs> | null
  }


  /**
   * Model TransportJoin
   */

  export type AggregateTransportJoin = {
    _count: TransportJoinCountAggregateOutputType | null
    _min: TransportJoinMinAggregateOutputType | null
    _max: TransportJoinMaxAggregateOutputType | null
  }

  export type TransportJoinMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    transportId: string | null
    userId: string | null
  }

  export type TransportJoinMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    transportId: string | null
    userId: string | null
  }

  export type TransportJoinCountAggregateOutputType = {
    id: number
    createdAt: number
    transportId: number
    userId: number
    _all: number
  }


  export type TransportJoinMinAggregateInputType = {
    id?: true
    createdAt?: true
    transportId?: true
    userId?: true
  }

  export type TransportJoinMaxAggregateInputType = {
    id?: true
    createdAt?: true
    transportId?: true
    userId?: true
  }

  export type TransportJoinCountAggregateInputType = {
    id?: true
    createdAt?: true
    transportId?: true
    userId?: true
    _all?: true
  }

  export type TransportJoinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransportJoin to aggregate.
     */
    where?: TransportJoinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransportJoins to fetch.
     */
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransportJoinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransportJoins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransportJoins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransportJoins
    **/
    _count?: true | TransportJoinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransportJoinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransportJoinMaxAggregateInputType
  }

  export type GetTransportJoinAggregateType<T extends TransportJoinAggregateArgs> = {
        [P in keyof T & keyof AggregateTransportJoin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransportJoin[P]>
      : GetScalarType<T[P], AggregateTransportJoin[P]>
  }




  export type TransportJoinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportJoinWhereInput
    orderBy?: TransportJoinOrderByWithAggregationInput | TransportJoinOrderByWithAggregationInput[]
    by: TransportJoinScalarFieldEnum[] | TransportJoinScalarFieldEnum
    having?: TransportJoinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransportJoinCountAggregateInputType | true
    _min?: TransportJoinMinAggregateInputType
    _max?: TransportJoinMaxAggregateInputType
  }

  export type TransportJoinGroupByOutputType = {
    id: string
    createdAt: Date
    transportId: string
    userId: string
    _count: TransportJoinCountAggregateOutputType | null
    _min: TransportJoinMinAggregateOutputType | null
    _max: TransportJoinMaxAggregateOutputType | null
  }

  type GetTransportJoinGroupByPayload<T extends TransportJoinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransportJoinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransportJoinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransportJoinGroupByOutputType[P]>
            : GetScalarType<T[P], TransportJoinGroupByOutputType[P]>
        }
      >
    >


  export type TransportJoinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    transportId?: boolean
    userId?: boolean
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportJoin"]>

  export type TransportJoinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    transportId?: boolean
    userId?: boolean
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportJoin"]>

  export type TransportJoinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    transportId?: boolean
    userId?: boolean
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportJoin"]>

  export type TransportJoinSelectScalar = {
    id?: boolean
    createdAt?: boolean
    transportId?: boolean
    userId?: boolean
  }

  export type TransportJoinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "transportId" | "userId", ExtArgs["result"]["transportJoin"]>
  export type TransportJoinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransportJoinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransportJoinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transport?: boolean | TransportDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransportJoinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransportJoin"
    objects: {
      transport: Prisma.$TransportPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      transportId: string
      userId: string
    }, ExtArgs["result"]["transportJoin"]>
    composites: {}
  }

  type TransportJoinGetPayload<S extends boolean | null | undefined | TransportJoinDefaultArgs> = $Result.GetResult<Prisma.$TransportJoinPayload, S>

  type TransportJoinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransportJoinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransportJoinCountAggregateInputType | true
    }

  export interface TransportJoinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransportJoin'], meta: { name: 'TransportJoin' } }
    /**
     * Find zero or one TransportJoin that matches the filter.
     * @param {TransportJoinFindUniqueArgs} args - Arguments to find a TransportJoin
     * @example
     * // Get one TransportJoin
     * const transportJoin = await prisma.transportJoin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransportJoinFindUniqueArgs>(args: SelectSubset<T, TransportJoinFindUniqueArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TransportJoin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransportJoinFindUniqueOrThrowArgs} args - Arguments to find a TransportJoin
     * @example
     * // Get one TransportJoin
     * const transportJoin = await prisma.transportJoin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransportJoinFindUniqueOrThrowArgs>(args: SelectSubset<T, TransportJoinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransportJoin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinFindFirstArgs} args - Arguments to find a TransportJoin
     * @example
     * // Get one TransportJoin
     * const transportJoin = await prisma.transportJoin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransportJoinFindFirstArgs>(args?: SelectSubset<T, TransportJoinFindFirstArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransportJoin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinFindFirstOrThrowArgs} args - Arguments to find a TransportJoin
     * @example
     * // Get one TransportJoin
     * const transportJoin = await prisma.transportJoin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransportJoinFindFirstOrThrowArgs>(args?: SelectSubset<T, TransportJoinFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TransportJoins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransportJoins
     * const transportJoins = await prisma.transportJoin.findMany()
     * 
     * // Get first 10 TransportJoins
     * const transportJoins = await prisma.transportJoin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transportJoinWithIdOnly = await prisma.transportJoin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransportJoinFindManyArgs>(args?: SelectSubset<T, TransportJoinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TransportJoin.
     * @param {TransportJoinCreateArgs} args - Arguments to create a TransportJoin.
     * @example
     * // Create one TransportJoin
     * const TransportJoin = await prisma.transportJoin.create({
     *   data: {
     *     // ... data to create a TransportJoin
     *   }
     * })
     * 
     */
    create<T extends TransportJoinCreateArgs>(args: SelectSubset<T, TransportJoinCreateArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TransportJoins.
     * @param {TransportJoinCreateManyArgs} args - Arguments to create many TransportJoins.
     * @example
     * // Create many TransportJoins
     * const transportJoin = await prisma.transportJoin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransportJoinCreateManyArgs>(args?: SelectSubset<T, TransportJoinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TransportJoins and returns the data saved in the database.
     * @param {TransportJoinCreateManyAndReturnArgs} args - Arguments to create many TransportJoins.
     * @example
     * // Create many TransportJoins
     * const transportJoin = await prisma.transportJoin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TransportJoins and only return the `id`
     * const transportJoinWithIdOnly = await prisma.transportJoin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransportJoinCreateManyAndReturnArgs>(args?: SelectSubset<T, TransportJoinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TransportJoin.
     * @param {TransportJoinDeleteArgs} args - Arguments to delete one TransportJoin.
     * @example
     * // Delete one TransportJoin
     * const TransportJoin = await prisma.transportJoin.delete({
     *   where: {
     *     // ... filter to delete one TransportJoin
     *   }
     * })
     * 
     */
    delete<T extends TransportJoinDeleteArgs>(args: SelectSubset<T, TransportJoinDeleteArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TransportJoin.
     * @param {TransportJoinUpdateArgs} args - Arguments to update one TransportJoin.
     * @example
     * // Update one TransportJoin
     * const transportJoin = await prisma.transportJoin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransportJoinUpdateArgs>(args: SelectSubset<T, TransportJoinUpdateArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TransportJoins.
     * @param {TransportJoinDeleteManyArgs} args - Arguments to filter TransportJoins to delete.
     * @example
     * // Delete a few TransportJoins
     * const { count } = await prisma.transportJoin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransportJoinDeleteManyArgs>(args?: SelectSubset<T, TransportJoinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransportJoins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransportJoins
     * const transportJoin = await prisma.transportJoin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransportJoinUpdateManyArgs>(args: SelectSubset<T, TransportJoinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransportJoins and returns the data updated in the database.
     * @param {TransportJoinUpdateManyAndReturnArgs} args - Arguments to update many TransportJoins.
     * @example
     * // Update many TransportJoins
     * const transportJoin = await prisma.transportJoin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TransportJoins and only return the `id`
     * const transportJoinWithIdOnly = await prisma.transportJoin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransportJoinUpdateManyAndReturnArgs>(args: SelectSubset<T, TransportJoinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TransportJoin.
     * @param {TransportJoinUpsertArgs} args - Arguments to update or create a TransportJoin.
     * @example
     * // Update or create a TransportJoin
     * const transportJoin = await prisma.transportJoin.upsert({
     *   create: {
     *     // ... data to create a TransportJoin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransportJoin we want to update
     *   }
     * })
     */
    upsert<T extends TransportJoinUpsertArgs>(args: SelectSubset<T, TransportJoinUpsertArgs<ExtArgs>>): Prisma__TransportJoinClient<$Result.GetResult<Prisma.$TransportJoinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TransportJoins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinCountArgs} args - Arguments to filter TransportJoins to count.
     * @example
     * // Count the number of TransportJoins
     * const count = await prisma.transportJoin.count({
     *   where: {
     *     // ... the filter for the TransportJoins we want to count
     *   }
     * })
    **/
    count<T extends TransportJoinCountArgs>(
      args?: Subset<T, TransportJoinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransportJoinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransportJoin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransportJoinAggregateArgs>(args: Subset<T, TransportJoinAggregateArgs>): Prisma.PrismaPromise<GetTransportJoinAggregateType<T>>

    /**
     * Group by TransportJoin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportJoinGroupByArgs} args - Group by arguments.
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
      T extends TransportJoinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransportJoinGroupByArgs['orderBy'] }
        : { orderBy?: TransportJoinGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransportJoinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransportJoinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransportJoin model
   */
  readonly fields: TransportJoinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransportJoin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransportJoinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transport<T extends TransportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransportDefaultArgs<ExtArgs>>): Prisma__TransportClient<$Result.GetResult<Prisma.$TransportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TransportJoin model
   */
  interface TransportJoinFieldRefs {
    readonly id: FieldRef<"TransportJoin", 'String'>
    readonly createdAt: FieldRef<"TransportJoin", 'DateTime'>
    readonly transportId: FieldRef<"TransportJoin", 'String'>
    readonly userId: FieldRef<"TransportJoin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TransportJoin findUnique
   */
  export type TransportJoinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter, which TransportJoin to fetch.
     */
    where: TransportJoinWhereUniqueInput
  }

  /**
   * TransportJoin findUniqueOrThrow
   */
  export type TransportJoinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter, which TransportJoin to fetch.
     */
    where: TransportJoinWhereUniqueInput
  }

  /**
   * TransportJoin findFirst
   */
  export type TransportJoinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter, which TransportJoin to fetch.
     */
    where?: TransportJoinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransportJoins to fetch.
     */
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransportJoins.
     */
    cursor?: TransportJoinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransportJoins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransportJoins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransportJoins.
     */
    distinct?: TransportJoinScalarFieldEnum | TransportJoinScalarFieldEnum[]
  }

  /**
   * TransportJoin findFirstOrThrow
   */
  export type TransportJoinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter, which TransportJoin to fetch.
     */
    where?: TransportJoinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransportJoins to fetch.
     */
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransportJoins.
     */
    cursor?: TransportJoinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransportJoins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransportJoins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransportJoins.
     */
    distinct?: TransportJoinScalarFieldEnum | TransportJoinScalarFieldEnum[]
  }

  /**
   * TransportJoin findMany
   */
  export type TransportJoinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter, which TransportJoins to fetch.
     */
    where?: TransportJoinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransportJoins to fetch.
     */
    orderBy?: TransportJoinOrderByWithRelationInput | TransportJoinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransportJoins.
     */
    cursor?: TransportJoinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransportJoins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransportJoins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransportJoins.
     */
    distinct?: TransportJoinScalarFieldEnum | TransportJoinScalarFieldEnum[]
  }

  /**
   * TransportJoin create
   */
  export type TransportJoinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * The data needed to create a TransportJoin.
     */
    data: XOR<TransportJoinCreateInput, TransportJoinUncheckedCreateInput>
  }

  /**
   * TransportJoin createMany
   */
  export type TransportJoinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransportJoins.
     */
    data: TransportJoinCreateManyInput | TransportJoinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransportJoin createManyAndReturn
   */
  export type TransportJoinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * The data used to create many TransportJoins.
     */
    data: TransportJoinCreateManyInput | TransportJoinCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransportJoin update
   */
  export type TransportJoinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * The data needed to update a TransportJoin.
     */
    data: XOR<TransportJoinUpdateInput, TransportJoinUncheckedUpdateInput>
    /**
     * Choose, which TransportJoin to update.
     */
    where: TransportJoinWhereUniqueInput
  }

  /**
   * TransportJoin updateMany
   */
  export type TransportJoinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransportJoins.
     */
    data: XOR<TransportJoinUpdateManyMutationInput, TransportJoinUncheckedUpdateManyInput>
    /**
     * Filter which TransportJoins to update
     */
    where?: TransportJoinWhereInput
    /**
     * Limit how many TransportJoins to update.
     */
    limit?: number
  }

  /**
   * TransportJoin updateManyAndReturn
   */
  export type TransportJoinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * The data used to update TransportJoins.
     */
    data: XOR<TransportJoinUpdateManyMutationInput, TransportJoinUncheckedUpdateManyInput>
    /**
     * Filter which TransportJoins to update
     */
    where?: TransportJoinWhereInput
    /**
     * Limit how many TransportJoins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransportJoin upsert
   */
  export type TransportJoinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * The filter to search for the TransportJoin to update in case it exists.
     */
    where: TransportJoinWhereUniqueInput
    /**
     * In case the TransportJoin found by the `where` argument doesn't exist, create a new TransportJoin with this data.
     */
    create: XOR<TransportJoinCreateInput, TransportJoinUncheckedCreateInput>
    /**
     * In case the TransportJoin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransportJoinUpdateInput, TransportJoinUncheckedUpdateInput>
  }

  /**
   * TransportJoin delete
   */
  export type TransportJoinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
    /**
     * Filter which TransportJoin to delete.
     */
    where: TransportJoinWhereUniqueInput
  }

  /**
   * TransportJoin deleteMany
   */
  export type TransportJoinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransportJoins to delete
     */
    where?: TransportJoinWhereInput
    /**
     * Limit how many TransportJoins to delete.
     */
    limit?: number
  }

  /**
   * TransportJoin without action
   */
  export type TransportJoinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransportJoin
     */
    select?: TransportJoinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransportJoin
     */
    omit?: TransportJoinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportJoinInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    bio: 'bio',
    instagram: 'instagram',
    phone: 'phone',
    isPremium: 'isPremium'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    title: 'title',
    description: 'description',
    location: 'location',
    type: 'type',
    price: 'price',
    startDate: 'startDate',
    endDate: 'endDate',
    whatsappNumber: 'whatsappNumber',
    roommatesNeeded: 'roommatesNeeded',
    images: 'images',
    userId: 'userId'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const TransportScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    creatorId: 'creatorId',
    origin: 'origin',
    destination: 'destination',
    date: 'date',
    totalSeats: 'totalSeats',
    availableSeats: 'availableSeats',
    pricePerPerson: 'pricePerPerson',
    description: 'description'
  };

  export type TransportScalarFieldEnum = (typeof TransportScalarFieldEnum)[keyof typeof TransportScalarFieldEnum]


  export const TransportJoinScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    transportId: 'transportId',
    userId: 'userId'
  };

  export type TransportJoinScalarFieldEnum = (typeof TransportJoinScalarFieldEnum)[keyof typeof TransportJoinScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ListingType'
   */
  export type EnumListingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingType'>
    


  /**
   * Reference to a field of type 'ListingType[]'
   */
  export type ListEnumListingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    instagram?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    listings?: ListingListRelationFilter
    transports?: TransportListRelationFilter
    transportJoins?: TransportJoinListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    listings?: ListingOrderByRelationAggregateInput
    transports?: TransportOrderByRelationAggregateInput
    transportJoins?: TransportJoinOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    instagram?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    listings?: ListingListRelationFilter
    transports?: TransportListRelationFilter
    transportJoins?: TransportJoinListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    isPremium?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: StringFilter<"Listing"> | string
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    location?: StringFilter<"Listing"> | string
    type?: EnumListingTypeFilter<"Listing"> | $Enums.ListingType
    price?: FloatFilter<"Listing"> | number
    startDate?: DateTimeFilter<"Listing"> | Date | string
    endDate?: DateTimeFilter<"Listing"> | Date | string
    whatsappNumber?: StringFilter<"Listing"> | string
    roommatesNeeded?: IntFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    userId?: StringFilter<"Listing"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    type?: SortOrder
    price?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    whatsappNumber?: SortOrder
    roommatesNeeded?: SortOrder
    images?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    location?: StringFilter<"Listing"> | string
    type?: EnumListingTypeFilter<"Listing"> | $Enums.ListingType
    price?: FloatFilter<"Listing"> | number
    startDate?: DateTimeFilter<"Listing"> | Date | string
    endDate?: DateTimeFilter<"Listing"> | Date | string
    whatsappNumber?: StringFilter<"Listing"> | string
    roommatesNeeded?: IntFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    userId?: StringFilter<"Listing"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    type?: SortOrder
    price?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    whatsappNumber?: SortOrder
    roommatesNeeded?: SortOrder
    images?: SortOrder
    userId?: SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Listing"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    title?: StringWithAggregatesFilter<"Listing"> | string
    description?: StringWithAggregatesFilter<"Listing"> | string
    location?: StringWithAggregatesFilter<"Listing"> | string
    type?: EnumListingTypeWithAggregatesFilter<"Listing"> | $Enums.ListingType
    price?: FloatWithAggregatesFilter<"Listing"> | number
    startDate?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    whatsappNumber?: StringWithAggregatesFilter<"Listing"> | string
    roommatesNeeded?: IntWithAggregatesFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    userId?: StringWithAggregatesFilter<"Listing"> | string
  }

  export type TransportWhereInput = {
    AND?: TransportWhereInput | TransportWhereInput[]
    OR?: TransportWhereInput[]
    NOT?: TransportWhereInput | TransportWhereInput[]
    id?: StringFilter<"Transport"> | string
    createdAt?: DateTimeFilter<"Transport"> | Date | string
    creatorId?: StringFilter<"Transport"> | string
    origin?: StringFilter<"Transport"> | string
    destination?: StringFilter<"Transport"> | string
    date?: DateTimeFilter<"Transport"> | Date | string
    totalSeats?: IntFilter<"Transport"> | number
    availableSeats?: IntFilter<"Transport"> | number
    pricePerPerson?: FloatFilter<"Transport"> | number
    description?: StringFilter<"Transport"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    joins?: TransportJoinListRelationFilter
  }

  export type TransportOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    creatorId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    date?: SortOrder
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
    description?: SortOrder
    creator?: UserOrderByWithRelationInput
    joins?: TransportJoinOrderByRelationAggregateInput
  }

  export type TransportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransportWhereInput | TransportWhereInput[]
    OR?: TransportWhereInput[]
    NOT?: TransportWhereInput | TransportWhereInput[]
    createdAt?: DateTimeFilter<"Transport"> | Date | string
    creatorId?: StringFilter<"Transport"> | string
    origin?: StringFilter<"Transport"> | string
    destination?: StringFilter<"Transport"> | string
    date?: DateTimeFilter<"Transport"> | Date | string
    totalSeats?: IntFilter<"Transport"> | number
    availableSeats?: IntFilter<"Transport"> | number
    pricePerPerson?: FloatFilter<"Transport"> | number
    description?: StringFilter<"Transport"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    joins?: TransportJoinListRelationFilter
  }, "id">

  export type TransportOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    creatorId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    date?: SortOrder
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
    description?: SortOrder
    _count?: TransportCountOrderByAggregateInput
    _avg?: TransportAvgOrderByAggregateInput
    _max?: TransportMaxOrderByAggregateInput
    _min?: TransportMinOrderByAggregateInput
    _sum?: TransportSumOrderByAggregateInput
  }

  export type TransportScalarWhereWithAggregatesInput = {
    AND?: TransportScalarWhereWithAggregatesInput | TransportScalarWhereWithAggregatesInput[]
    OR?: TransportScalarWhereWithAggregatesInput[]
    NOT?: TransportScalarWhereWithAggregatesInput | TransportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transport"> | Date | string
    creatorId?: StringWithAggregatesFilter<"Transport"> | string
    origin?: StringWithAggregatesFilter<"Transport"> | string
    destination?: StringWithAggregatesFilter<"Transport"> | string
    date?: DateTimeWithAggregatesFilter<"Transport"> | Date | string
    totalSeats?: IntWithAggregatesFilter<"Transport"> | number
    availableSeats?: IntWithAggregatesFilter<"Transport"> | number
    pricePerPerson?: FloatWithAggregatesFilter<"Transport"> | number
    description?: StringWithAggregatesFilter<"Transport"> | string
  }

  export type TransportJoinWhereInput = {
    AND?: TransportJoinWhereInput | TransportJoinWhereInput[]
    OR?: TransportJoinWhereInput[]
    NOT?: TransportJoinWhereInput | TransportJoinWhereInput[]
    id?: StringFilter<"TransportJoin"> | string
    createdAt?: DateTimeFilter<"TransportJoin"> | Date | string
    transportId?: StringFilter<"TransportJoin"> | string
    userId?: StringFilter<"TransportJoin"> | string
    transport?: XOR<TransportScalarRelationFilter, TransportWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransportJoinOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    transportId?: SortOrder
    userId?: SortOrder
    transport?: TransportOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TransportJoinWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transportId_userId?: TransportJoinTransportIdUserIdCompoundUniqueInput
    AND?: TransportJoinWhereInput | TransportJoinWhereInput[]
    OR?: TransportJoinWhereInput[]
    NOT?: TransportJoinWhereInput | TransportJoinWhereInput[]
    createdAt?: DateTimeFilter<"TransportJoin"> | Date | string
    transportId?: StringFilter<"TransportJoin"> | string
    userId?: StringFilter<"TransportJoin"> | string
    transport?: XOR<TransportScalarRelationFilter, TransportWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "transportId_userId">

  export type TransportJoinOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    transportId?: SortOrder
    userId?: SortOrder
    _count?: TransportJoinCountOrderByAggregateInput
    _max?: TransportJoinMaxOrderByAggregateInput
    _min?: TransportJoinMinOrderByAggregateInput
  }

  export type TransportJoinScalarWhereWithAggregatesInput = {
    AND?: TransportJoinScalarWhereWithAggregatesInput | TransportJoinScalarWhereWithAggregatesInput[]
    OR?: TransportJoinScalarWhereWithAggregatesInput[]
    NOT?: TransportJoinScalarWhereWithAggregatesInput | TransportJoinScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TransportJoin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TransportJoin"> | Date | string
    transportId?: StringWithAggregatesFilter<"TransportJoin"> | string
    userId?: StringWithAggregatesFilter<"TransportJoin"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingCreateNestedManyWithoutUserInput
    transports?: TransportCreateNestedManyWithoutCreatorInput
    transportJoins?: TransportJoinCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    transports?: TransportUncheckedCreateNestedManyWithoutCreatorInput
    transportJoins?: TransportJoinUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutUserNestedInput
    transports?: TransportUpdateManyWithoutCreatorNestedInput
    transportJoins?: TransportJoinUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    transports?: TransportUncheckedUpdateManyWithoutCreatorNestedInput
    transportJoins?: TransportJoinUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
    user: UserCreateNestedOneWithoutListingsInput
  }

  export type ListingUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
    userId: string
  }

  export type ListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ListingCreateManyInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
    userId: string
  }

  export type ListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransportCreateInput = {
    id?: string
    createdAt?: Date | string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    creator: UserCreateNestedOneWithoutTransportsInput
    joins?: TransportJoinCreateNestedManyWithoutTransportInput
  }

  export type TransportUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    creatorId: string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    joins?: TransportJoinUncheckedCreateNestedManyWithoutTransportInput
  }

  export type TransportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    creator?: UserUpdateOneRequiredWithoutTransportsNestedInput
    joins?: TransportJoinUpdateManyWithoutTransportNestedInput
  }

  export type TransportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    joins?: TransportJoinUncheckedUpdateManyWithoutTransportNestedInput
  }

  export type TransportCreateManyInput = {
    id?: string
    createdAt?: Date | string
    creatorId: string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
  }

  export type TransportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TransportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinCreateInput = {
    id?: string
    createdAt?: Date | string
    transport: TransportCreateNestedOneWithoutJoinsInput
    user: UserCreateNestedOneWithoutTransportJoinsInput
  }

  export type TransportJoinUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    transportId: string
    userId: string
  }

  export type TransportJoinUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transport?: TransportUpdateOneRequiredWithoutJoinsNestedInput
    user?: UserUpdateOneRequiredWithoutTransportJoinsNestedInput
  }

  export type TransportJoinUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transportId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinCreateManyInput = {
    id?: string
    createdAt?: Date | string
    transportId: string
    userId: string
  }

  export type TransportJoinUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransportJoinUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transportId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
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
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type TransportListRelationFilter = {
    every?: TransportWhereInput
    some?: TransportWhereInput
    none?: TransportWhereInput
  }

  export type TransportJoinListRelationFilter = {
    every?: TransportJoinWhereInput
    some?: TransportJoinWhereInput
    none?: TransportJoinWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransportJoinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    instagram?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    instagram?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bio?: SortOrder
    instagram?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
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
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumListingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingType | EnumListingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListingTypeFilter<$PrismaModel> | $Enums.ListingType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    type?: SortOrder
    price?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    whatsappNumber?: SortOrder
    roommatesNeeded?: SortOrder
    images?: SortOrder
    userId?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    price?: SortOrder
    roommatesNeeded?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    type?: SortOrder
    price?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    whatsappNumber?: SortOrder
    roommatesNeeded?: SortOrder
    userId?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    type?: SortOrder
    price?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    whatsappNumber?: SortOrder
    roommatesNeeded?: SortOrder
    userId?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    price?: SortOrder
    roommatesNeeded?: SortOrder
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

  export type EnumListingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingType | EnumListingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListingTypeWithAggregatesFilter<$PrismaModel> | $Enums.ListingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingTypeFilter<$PrismaModel>
    _max?: NestedEnumListingTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type TransportCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    creatorId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    date?: SortOrder
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
    description?: SortOrder
  }

  export type TransportAvgOrderByAggregateInput = {
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
  }

  export type TransportMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    creatorId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    date?: SortOrder
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
    description?: SortOrder
  }

  export type TransportMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    creatorId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    date?: SortOrder
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
    description?: SortOrder
  }

  export type TransportSumOrderByAggregateInput = {
    totalSeats?: SortOrder
    availableSeats?: SortOrder
    pricePerPerson?: SortOrder
  }

  export type TransportScalarRelationFilter = {
    is?: TransportWhereInput
    isNot?: TransportWhereInput
  }

  export type TransportJoinTransportIdUserIdCompoundUniqueInput = {
    transportId: string
    userId: string
  }

  export type TransportJoinCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    transportId?: SortOrder
    userId?: SortOrder
  }

  export type TransportJoinMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    transportId?: SortOrder
    userId?: SortOrder
  }

  export type TransportJoinMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    transportId?: SortOrder
    userId?: SortOrder
  }

  export type ListingCreateNestedManyWithoutUserInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type TransportCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput> | TransportCreateWithoutCreatorInput[] | TransportUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransportCreateOrConnectWithoutCreatorInput | TransportCreateOrConnectWithoutCreatorInput[]
    createMany?: TransportCreateManyCreatorInputEnvelope
    connect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
  }

  export type TransportJoinCreateNestedManyWithoutUserInput = {
    create?: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput> | TransportJoinCreateWithoutUserInput[] | TransportJoinUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutUserInput | TransportJoinCreateOrConnectWithoutUserInput[]
    createMany?: TransportJoinCreateManyUserInputEnvelope
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type TransportUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput> | TransportCreateWithoutCreatorInput[] | TransportUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransportCreateOrConnectWithoutCreatorInput | TransportCreateOrConnectWithoutCreatorInput[]
    createMany?: TransportCreateManyCreatorInputEnvelope
    connect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
  }

  export type TransportJoinUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput> | TransportJoinCreateWithoutUserInput[] | TransportJoinUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutUserInput | TransportJoinCreateOrConnectWithoutUserInput[]
    createMany?: TransportJoinCreateManyUserInputEnvelope
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ListingUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutUserInput | ListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutUserInput | ListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutUserInput | ListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type TransportUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput> | TransportCreateWithoutCreatorInput[] | TransportUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransportCreateOrConnectWithoutCreatorInput | TransportCreateOrConnectWithoutCreatorInput[]
    upsert?: TransportUpsertWithWhereUniqueWithoutCreatorInput | TransportUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TransportCreateManyCreatorInputEnvelope
    set?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    disconnect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    delete?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    connect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    update?: TransportUpdateWithWhereUniqueWithoutCreatorInput | TransportUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TransportUpdateManyWithWhereWithoutCreatorInput | TransportUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TransportScalarWhereInput | TransportScalarWhereInput[]
  }

  export type TransportJoinUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput> | TransportJoinCreateWithoutUserInput[] | TransportJoinUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutUserInput | TransportJoinCreateOrConnectWithoutUserInput[]
    upsert?: TransportJoinUpsertWithWhereUniqueWithoutUserInput | TransportJoinUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransportJoinCreateManyUserInputEnvelope
    set?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    disconnect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    delete?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    update?: TransportJoinUpdateWithWhereUniqueWithoutUserInput | TransportJoinUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransportJoinUpdateManyWithWhereWithoutUserInput | TransportJoinUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput> | ListingCreateWithoutUserInput[] | ListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutUserInput | ListingCreateOrConnectWithoutUserInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutUserInput | ListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListingCreateManyUserInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutUserInput | ListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutUserInput | ListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type TransportUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput> | TransportCreateWithoutCreatorInput[] | TransportUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransportCreateOrConnectWithoutCreatorInput | TransportCreateOrConnectWithoutCreatorInput[]
    upsert?: TransportUpsertWithWhereUniqueWithoutCreatorInput | TransportUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TransportCreateManyCreatorInputEnvelope
    set?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    disconnect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    delete?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    connect?: TransportWhereUniqueInput | TransportWhereUniqueInput[]
    update?: TransportUpdateWithWhereUniqueWithoutCreatorInput | TransportUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TransportUpdateManyWithWhereWithoutCreatorInput | TransportUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TransportScalarWhereInput | TransportScalarWhereInput[]
  }

  export type TransportJoinUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput> | TransportJoinCreateWithoutUserInput[] | TransportJoinUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutUserInput | TransportJoinCreateOrConnectWithoutUserInput[]
    upsert?: TransportJoinUpsertWithWhereUniqueWithoutUserInput | TransportJoinUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransportJoinCreateManyUserInputEnvelope
    set?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    disconnect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    delete?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    update?: TransportJoinUpdateWithWhereUniqueWithoutUserInput | TransportJoinUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransportJoinUpdateManyWithWhereWithoutUserInput | TransportJoinUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
  }

  export type ListingCreateimagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutListingsInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumListingTypeFieldUpdateOperationsInput = {
    set?: $Enums.ListingType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ListingUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    upsert?: UserUpsertWithoutListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListingsInput, UserUpdateWithoutListingsInput>, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserCreateNestedOneWithoutTransportsInput = {
    create?: XOR<UserCreateWithoutTransportsInput, UserUncheckedCreateWithoutTransportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransportsInput
    connect?: UserWhereUniqueInput
  }

  export type TransportJoinCreateNestedManyWithoutTransportInput = {
    create?: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput> | TransportJoinCreateWithoutTransportInput[] | TransportJoinUncheckedCreateWithoutTransportInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutTransportInput | TransportJoinCreateOrConnectWithoutTransportInput[]
    createMany?: TransportJoinCreateManyTransportInputEnvelope
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
  }

  export type TransportJoinUncheckedCreateNestedManyWithoutTransportInput = {
    create?: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput> | TransportJoinCreateWithoutTransportInput[] | TransportJoinUncheckedCreateWithoutTransportInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutTransportInput | TransportJoinCreateOrConnectWithoutTransportInput[]
    createMany?: TransportJoinCreateManyTransportInputEnvelope
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTransportsNestedInput = {
    create?: XOR<UserCreateWithoutTransportsInput, UserUncheckedCreateWithoutTransportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransportsInput
    upsert?: UserUpsertWithoutTransportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransportsInput, UserUpdateWithoutTransportsInput>, UserUncheckedUpdateWithoutTransportsInput>
  }

  export type TransportJoinUpdateManyWithoutTransportNestedInput = {
    create?: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput> | TransportJoinCreateWithoutTransportInput[] | TransportJoinUncheckedCreateWithoutTransportInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutTransportInput | TransportJoinCreateOrConnectWithoutTransportInput[]
    upsert?: TransportJoinUpsertWithWhereUniqueWithoutTransportInput | TransportJoinUpsertWithWhereUniqueWithoutTransportInput[]
    createMany?: TransportJoinCreateManyTransportInputEnvelope
    set?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    disconnect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    delete?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    update?: TransportJoinUpdateWithWhereUniqueWithoutTransportInput | TransportJoinUpdateWithWhereUniqueWithoutTransportInput[]
    updateMany?: TransportJoinUpdateManyWithWhereWithoutTransportInput | TransportJoinUpdateManyWithWhereWithoutTransportInput[]
    deleteMany?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
  }

  export type TransportJoinUncheckedUpdateManyWithoutTransportNestedInput = {
    create?: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput> | TransportJoinCreateWithoutTransportInput[] | TransportJoinUncheckedCreateWithoutTransportInput[]
    connectOrCreate?: TransportJoinCreateOrConnectWithoutTransportInput | TransportJoinCreateOrConnectWithoutTransportInput[]
    upsert?: TransportJoinUpsertWithWhereUniqueWithoutTransportInput | TransportJoinUpsertWithWhereUniqueWithoutTransportInput[]
    createMany?: TransportJoinCreateManyTransportInputEnvelope
    set?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    disconnect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    delete?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    connect?: TransportJoinWhereUniqueInput | TransportJoinWhereUniqueInput[]
    update?: TransportJoinUpdateWithWhereUniqueWithoutTransportInput | TransportJoinUpdateWithWhereUniqueWithoutTransportInput[]
    updateMany?: TransportJoinUpdateManyWithWhereWithoutTransportInput | TransportJoinUpdateManyWithWhereWithoutTransportInput[]
    deleteMany?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
  }

  export type TransportCreateNestedOneWithoutJoinsInput = {
    create?: XOR<TransportCreateWithoutJoinsInput, TransportUncheckedCreateWithoutJoinsInput>
    connectOrCreate?: TransportCreateOrConnectWithoutJoinsInput
    connect?: TransportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransportJoinsInput = {
    create?: XOR<UserCreateWithoutTransportJoinsInput, UserUncheckedCreateWithoutTransportJoinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransportJoinsInput
    connect?: UserWhereUniqueInput
  }

  export type TransportUpdateOneRequiredWithoutJoinsNestedInput = {
    create?: XOR<TransportCreateWithoutJoinsInput, TransportUncheckedCreateWithoutJoinsInput>
    connectOrCreate?: TransportCreateOrConnectWithoutJoinsInput
    upsert?: TransportUpsertWithoutJoinsInput
    connect?: TransportWhereUniqueInput
    update?: XOR<XOR<TransportUpdateToOneWithWhereWithoutJoinsInput, TransportUpdateWithoutJoinsInput>, TransportUncheckedUpdateWithoutJoinsInput>
  }

  export type UserUpdateOneRequiredWithoutTransportJoinsNestedInput = {
    create?: XOR<UserCreateWithoutTransportJoinsInput, UserUncheckedCreateWithoutTransportJoinsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransportJoinsInput
    upsert?: UserUpsertWithoutTransportJoinsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransportJoinsInput, UserUpdateWithoutTransportJoinsInput>, UserUncheckedUpdateWithoutTransportJoinsInput>
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
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumListingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingType | EnumListingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListingTypeFilter<$PrismaModel> | $Enums.ListingType
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

  export type NestedEnumListingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingType | EnumListingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingType[] | ListEnumListingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListingTypeWithAggregatesFilter<$PrismaModel> | $Enums.ListingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingTypeFilter<$PrismaModel>
    _max?: NestedEnumListingTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type ListingCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
  }

  export type ListingUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
  }

  export type ListingCreateOrConnectWithoutUserInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput>
  }

  export type ListingCreateManyUserInputEnvelope = {
    data: ListingCreateManyUserInput | ListingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransportCreateWithoutCreatorInput = {
    id?: string
    createdAt?: Date | string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    joins?: TransportJoinCreateNestedManyWithoutTransportInput
  }

  export type TransportUncheckedCreateWithoutCreatorInput = {
    id?: string
    createdAt?: Date | string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    joins?: TransportJoinUncheckedCreateNestedManyWithoutTransportInput
  }

  export type TransportCreateOrConnectWithoutCreatorInput = {
    where: TransportWhereUniqueInput
    create: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput>
  }

  export type TransportCreateManyCreatorInputEnvelope = {
    data: TransportCreateManyCreatorInput | TransportCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type TransportJoinCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    transport: TransportCreateNestedOneWithoutJoinsInput
  }

  export type TransportJoinUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    transportId: string
  }

  export type TransportJoinCreateOrConnectWithoutUserInput = {
    where: TransportJoinWhereUniqueInput
    create: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput>
  }

  export type TransportJoinCreateManyUserInputEnvelope = {
    data: TransportJoinCreateManyUserInput | TransportJoinCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithWhereUniqueWithoutUserInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutUserInput, ListingUncheckedUpdateWithoutUserInput>
    create: XOR<ListingCreateWithoutUserInput, ListingUncheckedCreateWithoutUserInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutUserInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutUserInput, ListingUncheckedUpdateWithoutUserInput>
  }

  export type ListingUpdateManyWithWhereWithoutUserInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutUserInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: StringFilter<"Listing"> | string
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    title?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    location?: StringFilter<"Listing"> | string
    type?: EnumListingTypeFilter<"Listing"> | $Enums.ListingType
    price?: FloatFilter<"Listing"> | number
    startDate?: DateTimeFilter<"Listing"> | Date | string
    endDate?: DateTimeFilter<"Listing"> | Date | string
    whatsappNumber?: StringFilter<"Listing"> | string
    roommatesNeeded?: IntFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    userId?: StringFilter<"Listing"> | string
  }

  export type TransportUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TransportWhereUniqueInput
    update: XOR<TransportUpdateWithoutCreatorInput, TransportUncheckedUpdateWithoutCreatorInput>
    create: XOR<TransportCreateWithoutCreatorInput, TransportUncheckedCreateWithoutCreatorInput>
  }

  export type TransportUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TransportWhereUniqueInput
    data: XOR<TransportUpdateWithoutCreatorInput, TransportUncheckedUpdateWithoutCreatorInput>
  }

  export type TransportUpdateManyWithWhereWithoutCreatorInput = {
    where: TransportScalarWhereInput
    data: XOR<TransportUpdateManyMutationInput, TransportUncheckedUpdateManyWithoutCreatorInput>
  }

  export type TransportScalarWhereInput = {
    AND?: TransportScalarWhereInput | TransportScalarWhereInput[]
    OR?: TransportScalarWhereInput[]
    NOT?: TransportScalarWhereInput | TransportScalarWhereInput[]
    id?: StringFilter<"Transport"> | string
    createdAt?: DateTimeFilter<"Transport"> | Date | string
    creatorId?: StringFilter<"Transport"> | string
    origin?: StringFilter<"Transport"> | string
    destination?: StringFilter<"Transport"> | string
    date?: DateTimeFilter<"Transport"> | Date | string
    totalSeats?: IntFilter<"Transport"> | number
    availableSeats?: IntFilter<"Transport"> | number
    pricePerPerson?: FloatFilter<"Transport"> | number
    description?: StringFilter<"Transport"> | string
  }

  export type TransportJoinUpsertWithWhereUniqueWithoutUserInput = {
    where: TransportJoinWhereUniqueInput
    update: XOR<TransportJoinUpdateWithoutUserInput, TransportJoinUncheckedUpdateWithoutUserInput>
    create: XOR<TransportJoinCreateWithoutUserInput, TransportJoinUncheckedCreateWithoutUserInput>
  }

  export type TransportJoinUpdateWithWhereUniqueWithoutUserInput = {
    where: TransportJoinWhereUniqueInput
    data: XOR<TransportJoinUpdateWithoutUserInput, TransportJoinUncheckedUpdateWithoutUserInput>
  }

  export type TransportJoinUpdateManyWithWhereWithoutUserInput = {
    where: TransportJoinScalarWhereInput
    data: XOR<TransportJoinUpdateManyMutationInput, TransportJoinUncheckedUpdateManyWithoutUserInput>
  }

  export type TransportJoinScalarWhereInput = {
    AND?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
    OR?: TransportJoinScalarWhereInput[]
    NOT?: TransportJoinScalarWhereInput | TransportJoinScalarWhereInput[]
    id?: StringFilter<"TransportJoin"> | string
    createdAt?: DateTimeFilter<"TransportJoin"> | Date | string
    transportId?: StringFilter<"TransportJoin"> | string
    userId?: StringFilter<"TransportJoin"> | string
  }

  export type UserCreateWithoutListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    transports?: TransportCreateNestedManyWithoutCreatorInput
    transportJoins?: TransportJoinCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    transports?: TransportUncheckedCreateNestedManyWithoutCreatorInput
    transportJoins?: TransportJoinUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
  }

  export type UserUpsertWithoutListingsInput = {
    update: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    transports?: TransportUpdateManyWithoutCreatorNestedInput
    transportJoins?: TransportJoinUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    transports?: TransportUncheckedUpdateManyWithoutCreatorNestedInput
    transportJoins?: TransportJoinUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTransportsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingCreateNestedManyWithoutUserInput
    transportJoins?: TransportJoinCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransportsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    transportJoins?: TransportJoinUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransportsInput, UserUncheckedCreateWithoutTransportsInput>
  }

  export type TransportJoinCreateWithoutTransportInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransportJoinsInput
  }

  export type TransportJoinUncheckedCreateWithoutTransportInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type TransportJoinCreateOrConnectWithoutTransportInput = {
    where: TransportJoinWhereUniqueInput
    create: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput>
  }

  export type TransportJoinCreateManyTransportInputEnvelope = {
    data: TransportJoinCreateManyTransportInput | TransportJoinCreateManyTransportInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTransportsInput = {
    update: XOR<UserUpdateWithoutTransportsInput, UserUncheckedUpdateWithoutTransportsInput>
    create: XOR<UserCreateWithoutTransportsInput, UserUncheckedCreateWithoutTransportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransportsInput, UserUncheckedUpdateWithoutTransportsInput>
  }

  export type UserUpdateWithoutTransportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutUserNestedInput
    transportJoins?: TransportJoinUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    transportJoins?: TransportJoinUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransportJoinUpsertWithWhereUniqueWithoutTransportInput = {
    where: TransportJoinWhereUniqueInput
    update: XOR<TransportJoinUpdateWithoutTransportInput, TransportJoinUncheckedUpdateWithoutTransportInput>
    create: XOR<TransportJoinCreateWithoutTransportInput, TransportJoinUncheckedCreateWithoutTransportInput>
  }

  export type TransportJoinUpdateWithWhereUniqueWithoutTransportInput = {
    where: TransportJoinWhereUniqueInput
    data: XOR<TransportJoinUpdateWithoutTransportInput, TransportJoinUncheckedUpdateWithoutTransportInput>
  }

  export type TransportJoinUpdateManyWithWhereWithoutTransportInput = {
    where: TransportJoinScalarWhereInput
    data: XOR<TransportJoinUpdateManyMutationInput, TransportJoinUncheckedUpdateManyWithoutTransportInput>
  }

  export type TransportCreateWithoutJoinsInput = {
    id?: string
    createdAt?: Date | string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
    creator: UserCreateNestedOneWithoutTransportsInput
  }

  export type TransportUncheckedCreateWithoutJoinsInput = {
    id?: string
    createdAt?: Date | string
    creatorId: string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
  }

  export type TransportCreateOrConnectWithoutJoinsInput = {
    where: TransportWhereUniqueInput
    create: XOR<TransportCreateWithoutJoinsInput, TransportUncheckedCreateWithoutJoinsInput>
  }

  export type UserCreateWithoutTransportJoinsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingCreateNestedManyWithoutUserInput
    transports?: TransportCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutTransportJoinsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    bio?: string | null
    instagram?: string | null
    phone?: string | null
    isPremium?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutUserInput
    transports?: TransportUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutTransportJoinsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransportJoinsInput, UserUncheckedCreateWithoutTransportJoinsInput>
  }

  export type TransportUpsertWithoutJoinsInput = {
    update: XOR<TransportUpdateWithoutJoinsInput, TransportUncheckedUpdateWithoutJoinsInput>
    create: XOR<TransportCreateWithoutJoinsInput, TransportUncheckedCreateWithoutJoinsInput>
    where?: TransportWhereInput
  }

  export type TransportUpdateToOneWithWhereWithoutJoinsInput = {
    where?: TransportWhereInput
    data: XOR<TransportUpdateWithoutJoinsInput, TransportUncheckedUpdateWithoutJoinsInput>
  }

  export type TransportUpdateWithoutJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    creator?: UserUpdateOneRequiredWithoutTransportsNestedInput
  }

  export type TransportUncheckedUpdateWithoutJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutTransportJoinsInput = {
    update: XOR<UserUpdateWithoutTransportJoinsInput, UserUncheckedUpdateWithoutTransportJoinsInput>
    create: XOR<UserCreateWithoutTransportJoinsInput, UserUncheckedCreateWithoutTransportJoinsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransportJoinsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransportJoinsInput, UserUncheckedUpdateWithoutTransportJoinsInput>
  }

  export type UserUpdateWithoutTransportJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutUserNestedInput
    transports?: TransportUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutTransportJoinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutUserNestedInput
    transports?: TransportUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ListingCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description: string
    location: string
    type: $Enums.ListingType
    price: number
    startDate: Date | string
    endDate: Date | string
    whatsappNumber: string
    roommatesNeeded: number
    images?: ListingCreateimagesInput | string[]
  }

  export type TransportCreateManyCreatorInput = {
    id?: string
    createdAt?: Date | string
    origin: string
    destination: string
    date: Date | string
    totalSeats: number
    availableSeats: number
    pricePerPerson: number
    description: string
  }

  export type TransportJoinCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    transportId: string
  }

  export type ListingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
  }

  export type ListingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
  }

  export type ListingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumListingTypeFieldUpdateOperationsInput | $Enums.ListingType
    price?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    whatsappNumber?: StringFieldUpdateOperationsInput | string
    roommatesNeeded?: IntFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
  }

  export type TransportUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    joins?: TransportJoinUpdateManyWithoutTransportNestedInput
  }

  export type TransportUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    joins?: TransportJoinUncheckedUpdateManyWithoutTransportNestedInput
  }

  export type TransportUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    availableSeats?: IntFieldUpdateOperationsInput | number
    pricePerPerson?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transport?: TransportUpdateOneRequiredWithoutJoinsNestedInput
  }

  export type TransportJoinUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transportId?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transportId?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinCreateManyTransportInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type TransportJoinUpdateWithoutTransportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransportJoinsNestedInput
  }

  export type TransportJoinUncheckedUpdateWithoutTransportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransportJoinUncheckedUpdateManyWithoutTransportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
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