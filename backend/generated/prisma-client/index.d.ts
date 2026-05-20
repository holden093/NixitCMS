
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model SiteSettings
 * 
 */
export type SiteSettings = $Result.DefaultSelection<Prisma.$SiteSettingsPayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model Content
 * 
 */
export type Content = $Result.DefaultSelection<Prisma.$ContentPayload>
/**
 * Model PointOfInterest
 * 
 */
export type PointOfInterest = $Result.DefaultSelection<Prisma.$PointOfInterestPayload>
/**
 * Model MediaFile
 * 
 */
export type MediaFile = $Result.DefaultSelection<Prisma.$MediaFilePayload>
/**
 * Model PhotoCategory
 * 
 */
export type PhotoCategory = $Result.DefaultSelection<Prisma.$PhotoCategoryPayload>
/**
 * Model MediaFileCategory
 * 
 */
export type MediaFileCategory = $Result.DefaultSelection<Prisma.$MediaFileCategoryPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model BookingProvider
 * 
 */
export type BookingProvider = $Result.DefaultSelection<Prisma.$BookingProviderPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.siteSettings`: Exposes CRUD operations for the **SiteSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteSettings
    * const siteSettings = await prisma.siteSettings.findMany()
    * ```
    */
  get siteSettings(): Prisma.SiteSettingsDelegate<ExtArgs>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs>;

  /**
   * `prisma.content`: Exposes CRUD operations for the **Content** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contents
    * const contents = await prisma.content.findMany()
    * ```
    */
  get content(): Prisma.ContentDelegate<ExtArgs>;

  /**
   * `prisma.pointOfInterest`: Exposes CRUD operations for the **PointOfInterest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointOfInterests
    * const pointOfInterests = await prisma.pointOfInterest.findMany()
    * ```
    */
  get pointOfInterest(): Prisma.PointOfInterestDelegate<ExtArgs>;

  /**
   * `prisma.mediaFile`: Exposes CRUD operations for the **MediaFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaFiles
    * const mediaFiles = await prisma.mediaFile.findMany()
    * ```
    */
  get mediaFile(): Prisma.MediaFileDelegate<ExtArgs>;

  /**
   * `prisma.photoCategory`: Exposes CRUD operations for the **PhotoCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhotoCategories
    * const photoCategories = await prisma.photoCategory.findMany()
    * ```
    */
  get photoCategory(): Prisma.PhotoCategoryDelegate<ExtArgs>;

  /**
   * `prisma.mediaFileCategory`: Exposes CRUD operations for the **MediaFileCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaFileCategories
    * const mediaFileCategories = await prisma.mediaFileCategory.findMany()
    * ```
    */
  get mediaFileCategory(): Prisma.MediaFileCategoryDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.bookingProvider`: Exposes CRUD operations for the **BookingProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingProviders
    * const bookingProviders = await prisma.bookingProvider.findMany()
    * ```
    */
  get bookingProvider(): Prisma.BookingProviderDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    SiteSettings: 'SiteSettings',
    Page: 'Page',
    Content: 'Content',
    PointOfInterest: 'PointOfInterest',
    MediaFile: 'MediaFile',
    PhotoCategory: 'PhotoCategory',
    MediaFileCategory: 'MediaFileCategory',
    Service: 'Service',
    BookingProvider: 'BookingProvider'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "siteSettings" | "page" | "content" | "pointOfInterest" | "mediaFile" | "photoCategory" | "mediaFileCategory" | "service" | "bookingProvider"
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
      SiteSettings: {
        payload: Prisma.$SiteSettingsPayload<ExtArgs>
        fields: Prisma.SiteSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          findFirst: {
            args: Prisma.SiteSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          findMany: {
            args: Prisma.SiteSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[]
          }
          create: {
            args: Prisma.SiteSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          createMany: {
            args: Prisma.SiteSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[]
          }
          delete: {
            args: Prisma.SiteSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          update: {
            args: Prisma.SiteSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          deleteMany: {
            args: Prisma.SiteSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SiteSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          aggregate: {
            args: Prisma.SiteSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteSettings>
          }
          groupBy: {
            args: Prisma.SiteSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingsCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Content: {
        payload: Prisma.$ContentPayload<ExtArgs>
        fields: Prisma.ContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findFirst: {
            args: Prisma.ContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findMany: {
            args: Prisma.ContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          create: {
            args: Prisma.ContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          createMany: {
            args: Prisma.ContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          delete: {
            args: Prisma.ContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          update: {
            args: Prisma.ContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          deleteMany: {
            args: Prisma.ContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          aggregate: {
            args: Prisma.ContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContent>
          }
          groupBy: {
            args: Prisma.ContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentCountArgs<ExtArgs>
            result: $Utils.Optional<ContentCountAggregateOutputType> | number
          }
        }
      }
      PointOfInterest: {
        payload: Prisma.$PointOfInterestPayload<ExtArgs>
        fields: Prisma.PointOfInterestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointOfInterestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointOfInterestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          findFirst: {
            args: Prisma.PointOfInterestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointOfInterestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          findMany: {
            args: Prisma.PointOfInterestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>[]
          }
          create: {
            args: Prisma.PointOfInterestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          createMany: {
            args: Prisma.PointOfInterestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointOfInterestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>[]
          }
          delete: {
            args: Prisma.PointOfInterestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          update: {
            args: Prisma.PointOfInterestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          deleteMany: {
            args: Prisma.PointOfInterestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointOfInterestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointOfInterestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointOfInterestPayload>
          }
          aggregate: {
            args: Prisma.PointOfInterestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointOfInterest>
          }
          groupBy: {
            args: Prisma.PointOfInterestGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointOfInterestGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointOfInterestCountArgs<ExtArgs>
            result: $Utils.Optional<PointOfInterestCountAggregateOutputType> | number
          }
        }
      }
      MediaFile: {
        payload: Prisma.$MediaFilePayload<ExtArgs>
        fields: Prisma.MediaFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          findFirst: {
            args: Prisma.MediaFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          findMany: {
            args: Prisma.MediaFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>[]
          }
          create: {
            args: Prisma.MediaFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          createMany: {
            args: Prisma.MediaFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>[]
          }
          delete: {
            args: Prisma.MediaFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          update: {
            args: Prisma.MediaFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          deleteMany: {
            args: Prisma.MediaFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFilePayload>
          }
          aggregate: {
            args: Prisma.MediaFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaFile>
          }
          groupBy: {
            args: Prisma.MediaFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaFileCountArgs<ExtArgs>
            result: $Utils.Optional<MediaFileCountAggregateOutputType> | number
          }
        }
      }
      PhotoCategory: {
        payload: Prisma.$PhotoCategoryPayload<ExtArgs>
        fields: Prisma.PhotoCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          findFirst: {
            args: Prisma.PhotoCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          findMany: {
            args: Prisma.PhotoCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>[]
          }
          create: {
            args: Prisma.PhotoCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          createMany: {
            args: Prisma.PhotoCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>[]
          }
          delete: {
            args: Prisma.PhotoCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          update: {
            args: Prisma.PhotoCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          deleteMany: {
            args: Prisma.PhotoCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PhotoCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoCategoryPayload>
          }
          aggregate: {
            args: Prisma.PhotoCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhotoCategory>
          }
          groupBy: {
            args: Prisma.PhotoCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoCategoryCountAggregateOutputType> | number
          }
        }
      }
      MediaFileCategory: {
        payload: Prisma.$MediaFileCategoryPayload<ExtArgs>
        fields: Prisma.MediaFileCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFileCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFileCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          findFirst: {
            args: Prisma.MediaFileCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFileCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          findMany: {
            args: Prisma.MediaFileCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>[]
          }
          create: {
            args: Prisma.MediaFileCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          createMany: {
            args: Prisma.MediaFileCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaFileCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>[]
          }
          delete: {
            args: Prisma.MediaFileCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          update: {
            args: Prisma.MediaFileCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          deleteMany: {
            args: Prisma.MediaFileCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaFileCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaFileCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaFileCategoryPayload>
          }
          aggregate: {
            args: Prisma.MediaFileCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaFileCategory>
          }
          groupBy: {
            args: Prisma.MediaFileCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaFileCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaFileCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<MediaFileCategoryCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      BookingProvider: {
        payload: Prisma.$BookingProviderPayload<ExtArgs>
        fields: Prisma.BookingProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          findFirst: {
            args: Prisma.BookingProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          findMany: {
            args: Prisma.BookingProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>[]
          }
          create: {
            args: Prisma.BookingProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          createMany: {
            args: Prisma.BookingProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>[]
          }
          delete: {
            args: Prisma.BookingProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          update: {
            args: Prisma.BookingProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          deleteMany: {
            args: Prisma.BookingProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingProviderPayload>
          }
          aggregate: {
            args: Prisma.BookingProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookingProvider>
          }
          groupBy: {
            args: Prisma.BookingProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingProviderCountArgs<ExtArgs>
            result: $Utils.Optional<BookingProviderCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type MediaFileCountOutputType
   */

  export type MediaFileCountOutputType = {
    categories: number
    servicesUsingAsPreview: number
  }

  export type MediaFileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | MediaFileCountOutputTypeCountCategoriesArgs
    servicesUsingAsPreview?: boolean | MediaFileCountOutputTypeCountServicesUsingAsPreviewArgs
  }

  // Custom InputTypes
  /**
   * MediaFileCountOutputType without action
   */
  export type MediaFileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCountOutputType
     */
    select?: MediaFileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaFileCountOutputType without action
   */
  export type MediaFileCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaFileCategoryWhereInput
  }

  /**
   * MediaFileCountOutputType without action
   */
  export type MediaFileCountOutputTypeCountServicesUsingAsPreviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type PhotoCategoryCountOutputType
   */

  export type PhotoCategoryCountOutputType = {
    media: number
    services: number
  }

  export type PhotoCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | PhotoCategoryCountOutputTypeCountMediaArgs
    services?: boolean | PhotoCategoryCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * PhotoCategoryCountOutputType without action
   */
  export type PhotoCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategoryCountOutputType
     */
    select?: PhotoCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PhotoCategoryCountOutputType without action
   */
  export type PhotoCategoryCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaFileCategoryWhereInput
  }

  /**
   * PhotoCategoryCountOutputType without action
   */
  export type PhotoCategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
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
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model SiteSettings
   */

  export type AggregateSiteSettings = {
    _count: SiteSettingsCountAggregateOutputType | null
    _avg: SiteSettingsAvgAggregateOutputType | null
    _sum: SiteSettingsSumAggregateOutputType | null
    _min: SiteSettingsMinAggregateOutputType | null
    _max: SiteSettingsMaxAggregateOutputType | null
  }

  export type SiteSettingsAvgAggregateOutputType = {
    id: number | null
    mapLat: number | null
    mapLng: number | null
    mapZoom: number | null
  }

  export type SiteSettingsSumAggregateOutputType = {
    id: number | null
    mapLat: number | null
    mapLng: number | null
    mapZoom: number | null
  }

  export type SiteSettingsMinAggregateOutputType = {
    id: number | null
    hotelName: string | null
    logoKey: string | null
    heroImageKey: string | null
    legalName: string | null
    registeredAddress: string | null
    city: string | null
    region: string | null
    postalCode: string | null
    country: string | null
    vatNumber: string | null
    taxCode: string | null
    phone: string | null
    email: string | null
    mapLat: number | null
    mapLng: number | null
    mapZoom: number | null
    defaultLocale: string | null
    octorateKey: string | null
  }

  export type SiteSettingsMaxAggregateOutputType = {
    id: number | null
    hotelName: string | null
    logoKey: string | null
    heroImageKey: string | null
    legalName: string | null
    registeredAddress: string | null
    city: string | null
    region: string | null
    postalCode: string | null
    country: string | null
    vatNumber: string | null
    taxCode: string | null
    phone: string | null
    email: string | null
    mapLat: number | null
    mapLng: number | null
    mapZoom: number | null
    defaultLocale: string | null
    octorateKey: string | null
  }

  export type SiteSettingsCountAggregateOutputType = {
    id: number
    hotelName: number
    logoKey: number
    heroImageKey: number
    legalName: number
    registeredAddress: number
    city: number
    region: number
    postalCode: number
    country: number
    vatNumber: number
    taxCode: number
    phone: number
    email: number
    mapLat: number
    mapLng: number
    mapZoom: number
    defaultLocale: number
    octorateKey: number
    _all: number
  }


  export type SiteSettingsAvgAggregateInputType = {
    id?: true
    mapLat?: true
    mapLng?: true
    mapZoom?: true
  }

  export type SiteSettingsSumAggregateInputType = {
    id?: true
    mapLat?: true
    mapLng?: true
    mapZoom?: true
  }

  export type SiteSettingsMinAggregateInputType = {
    id?: true
    hotelName?: true
    logoKey?: true
    heroImageKey?: true
    legalName?: true
    registeredAddress?: true
    city?: true
    region?: true
    postalCode?: true
    country?: true
    vatNumber?: true
    taxCode?: true
    phone?: true
    email?: true
    mapLat?: true
    mapLng?: true
    mapZoom?: true
    defaultLocale?: true
    octorateKey?: true
  }

  export type SiteSettingsMaxAggregateInputType = {
    id?: true
    hotelName?: true
    logoKey?: true
    heroImageKey?: true
    legalName?: true
    registeredAddress?: true
    city?: true
    region?: true
    postalCode?: true
    country?: true
    vatNumber?: true
    taxCode?: true
    phone?: true
    email?: true
    mapLat?: true
    mapLng?: true
    mapZoom?: true
    defaultLocale?: true
    octorateKey?: true
  }

  export type SiteSettingsCountAggregateInputType = {
    id?: true
    hotelName?: true
    logoKey?: true
    heroImageKey?: true
    legalName?: true
    registeredAddress?: true
    city?: true
    region?: true
    postalCode?: true
    country?: true
    vatNumber?: true
    taxCode?: true
    phone?: true
    email?: true
    mapLat?: true
    mapLng?: true
    mapZoom?: true
    defaultLocale?: true
    octorateKey?: true
    _all?: true
  }

  export type SiteSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to aggregate.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteSettings
    **/
    _count?: true | SiteSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteSettingsMaxAggregateInputType
  }

  export type GetSiteSettingsAggregateType<T extends SiteSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteSettings[P]>
      : GetScalarType<T[P], AggregateSiteSettings[P]>
  }




  export type SiteSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingsWhereInput
    orderBy?: SiteSettingsOrderByWithAggregationInput | SiteSettingsOrderByWithAggregationInput[]
    by: SiteSettingsScalarFieldEnum[] | SiteSettingsScalarFieldEnum
    having?: SiteSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteSettingsCountAggregateInputType | true
    _avg?: SiteSettingsAvgAggregateInputType
    _sum?: SiteSettingsSumAggregateInputType
    _min?: SiteSettingsMinAggregateInputType
    _max?: SiteSettingsMaxAggregateInputType
  }

  export type SiteSettingsGroupByOutputType = {
    id: number
    hotelName: string
    logoKey: string
    heroImageKey: string
    legalName: string
    registeredAddress: string
    city: string
    region: string
    postalCode: string
    country: string
    vatNumber: string
    taxCode: string
    phone: string
    email: string
    mapLat: number
    mapLng: number
    mapZoom: number
    defaultLocale: string
    octorateKey: string
    _count: SiteSettingsCountAggregateOutputType | null
    _avg: SiteSettingsAvgAggregateOutputType | null
    _sum: SiteSettingsSumAggregateOutputType | null
    _min: SiteSettingsMinAggregateOutputType | null
    _max: SiteSettingsMaxAggregateOutputType | null
  }

  type GetSiteSettingsGroupByPayload<T extends SiteSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SiteSettingsGroupByOutputType[P]>
        }
      >
    >


  export type SiteSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hotelName?: boolean
    logoKey?: boolean
    heroImageKey?: boolean
    legalName?: boolean
    registeredAddress?: boolean
    city?: boolean
    region?: boolean
    postalCode?: boolean
    country?: boolean
    vatNumber?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    mapLat?: boolean
    mapLng?: boolean
    mapZoom?: boolean
    defaultLocale?: boolean
    octorateKey?: boolean
  }, ExtArgs["result"]["siteSettings"]>

  export type SiteSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hotelName?: boolean
    logoKey?: boolean
    heroImageKey?: boolean
    legalName?: boolean
    registeredAddress?: boolean
    city?: boolean
    region?: boolean
    postalCode?: boolean
    country?: boolean
    vatNumber?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    mapLat?: boolean
    mapLng?: boolean
    mapZoom?: boolean
    defaultLocale?: boolean
    octorateKey?: boolean
  }, ExtArgs["result"]["siteSettings"]>

  export type SiteSettingsSelectScalar = {
    id?: boolean
    hotelName?: boolean
    logoKey?: boolean
    heroImageKey?: boolean
    legalName?: boolean
    registeredAddress?: boolean
    city?: boolean
    region?: boolean
    postalCode?: boolean
    country?: boolean
    vatNumber?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    mapLat?: boolean
    mapLng?: boolean
    mapZoom?: boolean
    defaultLocale?: boolean
    octorateKey?: boolean
  }


  export type $SiteSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hotelName: string
      logoKey: string
      heroImageKey: string
      legalName: string
      registeredAddress: string
      city: string
      region: string
      postalCode: string
      country: string
      vatNumber: string
      taxCode: string
      phone: string
      email: string
      mapLat: number
      mapLng: number
      mapZoom: number
      defaultLocale: string
      octorateKey: string
    }, ExtArgs["result"]["siteSettings"]>
    composites: {}
  }

  type SiteSettingsGetPayload<S extends boolean | null | undefined | SiteSettingsDefaultArgs> = $Result.GetResult<Prisma.$SiteSettingsPayload, S>

  type SiteSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SiteSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SiteSettingsCountAggregateInputType | true
    }

  export interface SiteSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteSettings'], meta: { name: 'SiteSettings' } }
    /**
     * Find zero or one SiteSettings that matches the filter.
     * @param {SiteSettingsFindUniqueArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteSettingsFindUniqueArgs>(args: SelectSubset<T, SiteSettingsFindUniqueArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SiteSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SiteSettingsFindUniqueOrThrowArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindFirstArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteSettingsFindFirstArgs>(args?: SelectSubset<T, SiteSettingsFindFirstArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SiteSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindFirstOrThrowArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteSettings
     * const siteSettings = await prisma.siteSettings.findMany()
     * 
     * // Get first 10 SiteSettings
     * const siteSettings = await prisma.siteSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteSettingsWithIdOnly = await prisma.siteSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteSettingsFindManyArgs>(args?: SelectSubset<T, SiteSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SiteSettings.
     * @param {SiteSettingsCreateArgs} args - Arguments to create a SiteSettings.
     * @example
     * // Create one SiteSettings
     * const SiteSettings = await prisma.siteSettings.create({
     *   data: {
     *     // ... data to create a SiteSettings
     *   }
     * })
     * 
     */
    create<T extends SiteSettingsCreateArgs>(args: SelectSubset<T, SiteSettingsCreateArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SiteSettings.
     * @param {SiteSettingsCreateManyArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSettings = await prisma.siteSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteSettingsCreateManyArgs>(args?: SelectSubset<T, SiteSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteSettings and returns the data saved in the database.
     * @param {SiteSettingsCreateManyAndReturnArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSettings = await prisma.siteSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteSettings and only return the `id`
     * const siteSettingsWithIdOnly = await prisma.siteSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SiteSettings.
     * @param {SiteSettingsDeleteArgs} args - Arguments to delete one SiteSettings.
     * @example
     * // Delete one SiteSettings
     * const SiteSettings = await prisma.siteSettings.delete({
     *   where: {
     *     // ... filter to delete one SiteSettings
     *   }
     * })
     * 
     */
    delete<T extends SiteSettingsDeleteArgs>(args: SelectSubset<T, SiteSettingsDeleteArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SiteSettings.
     * @param {SiteSettingsUpdateArgs} args - Arguments to update one SiteSettings.
     * @example
     * // Update one SiteSettings
     * const siteSettings = await prisma.siteSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteSettingsUpdateArgs>(args: SelectSubset<T, SiteSettingsUpdateArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SiteSettings.
     * @param {SiteSettingsDeleteManyArgs} args - Arguments to filter SiteSettings to delete.
     * @example
     * // Delete a few SiteSettings
     * const { count } = await prisma.siteSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteSettingsDeleteManyArgs>(args?: SelectSubset<T, SiteSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteSettings
     * const siteSettings = await prisma.siteSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteSettingsUpdateManyArgs>(args: SelectSubset<T, SiteSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SiteSettings.
     * @param {SiteSettingsUpsertArgs} args - Arguments to update or create a SiteSettings.
     * @example
     * // Update or create a SiteSettings
     * const siteSettings = await prisma.siteSettings.upsert({
     *   create: {
     *     // ... data to create a SiteSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteSettings we want to update
     *   }
     * })
     */
    upsert<T extends SiteSettingsUpsertArgs>(args: SelectSubset<T, SiteSettingsUpsertArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsCountArgs} args - Arguments to filter SiteSettings to count.
     * @example
     * // Count the number of SiteSettings
     * const count = await prisma.siteSettings.count({
     *   where: {
     *     // ... the filter for the SiteSettings we want to count
     *   }
     * })
    **/
    count<T extends SiteSettingsCountArgs>(
      args?: Subset<T, SiteSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SiteSettingsAggregateArgs>(args: Subset<T, SiteSettingsAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingsAggregateType<T>>

    /**
     * Group by SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsGroupByArgs} args - Group by arguments.
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
      T extends SiteSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteSettingsGroupByArgs['orderBy'] }
        : { orderBy?: SiteSettingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SiteSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteSettings model
   */
  readonly fields: SiteSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the SiteSettings model
   */ 
  interface SiteSettingsFieldRefs {
    readonly id: FieldRef<"SiteSettings", 'Int'>
    readonly hotelName: FieldRef<"SiteSettings", 'String'>
    readonly logoKey: FieldRef<"SiteSettings", 'String'>
    readonly heroImageKey: FieldRef<"SiteSettings", 'String'>
    readonly legalName: FieldRef<"SiteSettings", 'String'>
    readonly registeredAddress: FieldRef<"SiteSettings", 'String'>
    readonly city: FieldRef<"SiteSettings", 'String'>
    readonly region: FieldRef<"SiteSettings", 'String'>
    readonly postalCode: FieldRef<"SiteSettings", 'String'>
    readonly country: FieldRef<"SiteSettings", 'String'>
    readonly vatNumber: FieldRef<"SiteSettings", 'String'>
    readonly taxCode: FieldRef<"SiteSettings", 'String'>
    readonly phone: FieldRef<"SiteSettings", 'String'>
    readonly email: FieldRef<"SiteSettings", 'String'>
    readonly mapLat: FieldRef<"SiteSettings", 'Float'>
    readonly mapLng: FieldRef<"SiteSettings", 'Float'>
    readonly mapZoom: FieldRef<"SiteSettings", 'Int'>
    readonly defaultLocale: FieldRef<"SiteSettings", 'String'>
    readonly octorateKey: FieldRef<"SiteSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SiteSettings findUnique
   */
  export type SiteSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings findUniqueOrThrow
   */
  export type SiteSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings findFirst
   */
  export type SiteSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings findFirstOrThrow
   */
  export type SiteSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings findMany
   */
  export type SiteSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings create
   */
  export type SiteSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a SiteSettings.
     */
    data: XOR<SiteSettingsCreateInput, SiteSettingsUncheckedCreateInput>
  }

  /**
   * SiteSettings createMany
   */
  export type SiteSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingsCreateManyInput | SiteSettingsCreateManyInput[]
  }

  /**
   * SiteSettings createManyAndReturn
   */
  export type SiteSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingsCreateManyInput | SiteSettingsCreateManyInput[]
  }

  /**
   * SiteSettings update
   */
  export type SiteSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a SiteSettings.
     */
    data: XOR<SiteSettingsUpdateInput, SiteSettingsUncheckedUpdateInput>
    /**
     * Choose, which SiteSettings to update.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings updateMany
   */
  export type SiteSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingsUpdateManyMutationInput, SiteSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingsWhereInput
  }

  /**
   * SiteSettings upsert
   */
  export type SiteSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the SiteSettings to update in case it exists.
     */
    where: SiteSettingsWhereUniqueInput
    /**
     * In case the SiteSettings found by the `where` argument doesn't exist, create a new SiteSettings with this data.
     */
    create: XOR<SiteSettingsCreateInput, SiteSettingsUncheckedCreateInput>
    /**
     * In case the SiteSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteSettingsUpdateInput, SiteSettingsUncheckedUpdateInput>
  }

  /**
   * SiteSettings delete
   */
  export type SiteSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Filter which SiteSettings to delete.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings deleteMany
   */
  export type SiteSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to delete
     */
    where?: SiteSettingsWhereInput
  }

  /**
   * SiteSettings without action
   */
  export type SiteSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageAvgAggregateOutputType = {
    id: number | null
  }

  export type PageSumAggregateOutputType = {
    id: number | null
  }

  export type PageMinAggregateOutputType = {
    id: number | null
    slug: string | null
    isVisible: boolean | null
    updatedAt: Date | null
  }

  export type PageMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    isVisible: boolean | null
    updatedAt: Date | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    slug: number
    isVisible: number
    updatedAt: number
    _all: number
  }


  export type PageAvgAggregateInputType = {
    id?: true
  }

  export type PageSumAggregateInputType = {
    id?: true
  }

  export type PageMinAggregateInputType = {
    id?: true
    slug?: true
    isVisible?: true
    updatedAt?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    slug?: true
    isVisible?: true
    updatedAt?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    slug?: true
    isVisible?: true
    updatedAt?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _avg?: PageAvgAggregateInputType
    _sum?: PageSumAggregateInputType
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: number
    slug: string
    isVisible: boolean
    updatedAt: Date
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    isVisible?: boolean
    updatedAt?: boolean
    content?: boolean | Page$contentArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    isVisible?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    slug?: boolean
    isVisible?: boolean
    updatedAt?: boolean
  }

  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    content?: boolean | Page$contentArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      content: Prisma.$ContentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      isVisible: boolean
      updatedAt: Date
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
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
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    content<T extends Page$contentArgs<ExtArgs> = {}>(args?: Subset<T, Page$contentArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Page model
   */ 
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'Int'>
    readonly slug: FieldRef<"Page", 'String'>
    readonly isVisible: FieldRef<"Page", 'Boolean'>
    readonly updatedAt: FieldRef<"Page", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
  }

  /**
   * Page.content
   */
  export type Page$contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model Content
   */

  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  export type ContentAvgAggregateOutputType = {
    id: number | null
  }

  export type ContentSumAggregateOutputType = {
    id: number | null
  }

  export type ContentMinAggregateOutputType = {
    id: number | null
    pageSlug: string | null
    title_it: string | null
    title_en: string | null
    subtitle_it: string | null
    subtitle_en: string | null
    body_it: string | null
    body_en: string | null
    sections_it: string | null
    sections_en: string | null
    updatedAt: Date | null
  }

  export type ContentMaxAggregateOutputType = {
    id: number | null
    pageSlug: string | null
    title_it: string | null
    title_en: string | null
    subtitle_it: string | null
    subtitle_en: string | null
    body_it: string | null
    body_en: string | null
    sections_it: string | null
    sections_en: string | null
    updatedAt: Date | null
  }

  export type ContentCountAggregateOutputType = {
    id: number
    pageSlug: number
    title_it: number
    title_en: number
    subtitle_it: number
    subtitle_en: number
    body_it: number
    body_en: number
    sections_it: number
    sections_en: number
    updatedAt: number
    _all: number
  }


  export type ContentAvgAggregateInputType = {
    id?: true
  }

  export type ContentSumAggregateInputType = {
    id?: true
  }

  export type ContentMinAggregateInputType = {
    id?: true
    pageSlug?: true
    title_it?: true
    title_en?: true
    subtitle_it?: true
    subtitle_en?: true
    body_it?: true
    body_en?: true
    sections_it?: true
    sections_en?: true
    updatedAt?: true
  }

  export type ContentMaxAggregateInputType = {
    id?: true
    pageSlug?: true
    title_it?: true
    title_en?: true
    subtitle_it?: true
    subtitle_en?: true
    body_it?: true
    body_en?: true
    sections_it?: true
    sections_en?: true
    updatedAt?: true
  }

  export type ContentCountAggregateInputType = {
    id?: true
    pageSlug?: true
    title_it?: true
    title_en?: true
    subtitle_it?: true
    subtitle_en?: true
    body_it?: true
    body_en?: true
    sections_it?: true
    sections_en?: true
    updatedAt?: true
    _all?: true
  }

  export type ContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Content to aggregate.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contents
    **/
    _count?: true | ContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentMaxAggregateInputType
  }

  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
        [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContent[P]>
      : GetScalarType<T[P], AggregateContent[P]>
  }




  export type ContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithAggregationInput | ContentOrderByWithAggregationInput[]
    by: ContentScalarFieldEnum[] | ContentScalarFieldEnum
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _avg?: ContentAvgAggregateInputType
    _sum?: ContentSumAggregateInputType
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  }

  export type ContentGroupByOutputType = {
    id: number
    pageSlug: string
    title_it: string
    title_en: string
    subtitle_it: string
    subtitle_en: string
    body_it: string
    body_en: string
    sections_it: string
    sections_en: string
    updatedAt: Date
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentGroupByOutputType[P]>
            : GetScalarType<T[P], ContentGroupByOutputType[P]>
        }
      >
    >


  export type ContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageSlug?: boolean
    title_it?: boolean
    title_en?: boolean
    subtitle_it?: boolean
    subtitle_en?: boolean
    body_it?: boolean
    body_en?: boolean
    sections_it?: boolean
    sections_en?: boolean
    updatedAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>

  export type ContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageSlug?: boolean
    title_it?: boolean
    title_en?: boolean
    subtitle_it?: boolean
    subtitle_en?: boolean
    body_it?: boolean
    body_en?: boolean
    sections_it?: boolean
    sections_en?: boolean
    updatedAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>

  export type ContentSelectScalar = {
    id?: boolean
    pageSlug?: boolean
    title_it?: boolean
    title_en?: boolean
    subtitle_it?: boolean
    subtitle_en?: boolean
    body_it?: boolean
    body_en?: boolean
    sections_it?: boolean
    sections_en?: boolean
    updatedAt?: boolean
  }

  export type ContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type ContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }

  export type $ContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Content"
    objects: {
      page: Prisma.$PagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pageSlug: string
      title_it: string
      title_en: string
      subtitle_it: string
      subtitle_en: string
      body_it: string
      body_en: string
      sections_it: string
      sections_en: string
      updatedAt: Date
    }, ExtArgs["result"]["content"]>
    composites: {}
  }

  type ContentGetPayload<S extends boolean | null | undefined | ContentDefaultArgs> = $Result.GetResult<Prisma.$ContentPayload, S>

  type ContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContentCountAggregateInputType | true
    }

  export interface ContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Content'], meta: { name: 'Content' } }
    /**
     * Find zero or one Content that matches the filter.
     * @param {ContentFindUniqueArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentFindUniqueArgs>(args: SelectSubset<T, ContentFindUniqueArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Content that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContentFindUniqueOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Content that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentFindFirstArgs>(args?: SelectSubset<T, ContentFindFirstArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Content that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contents
     * const contents = await prisma.content.findMany()
     * 
     * // Get first 10 Contents
     * const contents = await prisma.content.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentWithIdOnly = await prisma.content.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentFindManyArgs>(args?: SelectSubset<T, ContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Content.
     * @param {ContentCreateArgs} args - Arguments to create a Content.
     * @example
     * // Create one Content
     * const Content = await prisma.content.create({
     *   data: {
     *     // ... data to create a Content
     *   }
     * })
     * 
     */
    create<T extends ContentCreateArgs>(args: SelectSubset<T, ContentCreateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contents.
     * @param {ContentCreateManyArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentCreateManyArgs>(args?: SelectSubset<T, ContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contents and returns the data saved in the database.
     * @param {ContentCreateManyAndReturnArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contents and only return the `id`
     * const contentWithIdOnly = await prisma.content.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContentCreateManyAndReturnArgs>(args?: SelectSubset<T, ContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Content.
     * @param {ContentDeleteArgs} args - Arguments to delete one Content.
     * @example
     * // Delete one Content
     * const Content = await prisma.content.delete({
     *   where: {
     *     // ... filter to delete one Content
     *   }
     * })
     * 
     */
    delete<T extends ContentDeleteArgs>(args: SelectSubset<T, ContentDeleteArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Content.
     * @param {ContentUpdateArgs} args - Arguments to update one Content.
     * @example
     * // Update one Content
     * const content = await prisma.content.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentUpdateArgs>(args: SelectSubset<T, ContentUpdateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contents.
     * @param {ContentDeleteManyArgs} args - Arguments to filter Contents to delete.
     * @example
     * // Delete a few Contents
     * const { count } = await prisma.content.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentDeleteManyArgs>(args?: SelectSubset<T, ContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contents
     * const content = await prisma.content.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentUpdateManyArgs>(args: SelectSubset<T, ContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Content.
     * @param {ContentUpsertArgs} args - Arguments to update or create a Content.
     * @example
     * // Update or create a Content
     * const content = await prisma.content.upsert({
     *   create: {
     *     // ... data to create a Content
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Content we want to update
     *   }
     * })
     */
    upsert<T extends ContentUpsertArgs>(args: SelectSubset<T, ContentUpsertArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentCountArgs} args - Arguments to filter Contents to count.
     * @example
     * // Count the number of Contents
     * const count = await prisma.content.count({
     *   where: {
     *     // ... the filter for the Contents we want to count
     *   }
     * })
    **/
    count<T extends ContentCountArgs>(
      args?: Subset<T, ContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>

    /**
     * Group by Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentGroupByArgs} args - Group by arguments.
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
      T extends ContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentGroupByArgs['orderBy'] }
        : { orderBy?: ContentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Content model
   */
  readonly fields: ContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    page<T extends PageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PageDefaultArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Content model
   */ 
  interface ContentFieldRefs {
    readonly id: FieldRef<"Content", 'Int'>
    readonly pageSlug: FieldRef<"Content", 'String'>
    readonly title_it: FieldRef<"Content", 'String'>
    readonly title_en: FieldRef<"Content", 'String'>
    readonly subtitle_it: FieldRef<"Content", 'String'>
    readonly subtitle_en: FieldRef<"Content", 'String'>
    readonly body_it: FieldRef<"Content", 'String'>
    readonly body_en: FieldRef<"Content", 'String'>
    readonly sections_it: FieldRef<"Content", 'String'>
    readonly sections_en: FieldRef<"Content", 'String'>
    readonly updatedAt: FieldRef<"Content", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Content findUnique
   */
  export type ContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findFirst
   */
  export type ContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findMany
   */
  export type ContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Contents to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content create
   */
  export type ContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to create a Content.
     */
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }

  /**
   * Content createMany
   */
  export type ContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
  }

  /**
   * Content createManyAndReturn
   */
  export type ContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Content update
   */
  export type ContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to update a Content.
     */
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contents.
     */
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     */
    where?: ContentWhereInput
  }

  /**
   * Content upsert
   */
  export type ContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The filter to search for the Content to update in case it exists.
     */
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     */
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }

  /**
   * Content delete
   */
  export type ContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter which Content to delete.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contents to delete
     */
    where?: ContentWhereInput
  }

  /**
   * Content without action
   */
  export type ContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
  }


  /**
   * Model PointOfInterest
   */

  export type AggregatePointOfInterest = {
    _count: PointOfInterestCountAggregateOutputType | null
    _avg: PointOfInterestAvgAggregateOutputType | null
    _sum: PointOfInterestSumAggregateOutputType | null
    _min: PointOfInterestMinAggregateOutputType | null
    _max: PointOfInterestMaxAggregateOutputType | null
  }

  export type PointOfInterestAvgAggregateOutputType = {
    id: number | null
    lat: number | null
    lng: number | null
  }

  export type PointOfInterestSumAggregateOutputType = {
    id: number | null
    lat: number | null
    lng: number | null
  }

  export type PointOfInterestMinAggregateOutputType = {
    id: number | null
    name_it: string | null
    name_en: string | null
    lat: number | null
    lng: number | null
    category: string | null
    createdAt: Date | null
  }

  export type PointOfInterestMaxAggregateOutputType = {
    id: number | null
    name_it: string | null
    name_en: string | null
    lat: number | null
    lng: number | null
    category: string | null
    createdAt: Date | null
  }

  export type PointOfInterestCountAggregateOutputType = {
    id: number
    name_it: number
    name_en: number
    lat: number
    lng: number
    category: number
    createdAt: number
    _all: number
  }


  export type PointOfInterestAvgAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PointOfInterestSumAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PointOfInterestMinAggregateInputType = {
    id?: true
    name_it?: true
    name_en?: true
    lat?: true
    lng?: true
    category?: true
    createdAt?: true
  }

  export type PointOfInterestMaxAggregateInputType = {
    id?: true
    name_it?: true
    name_en?: true
    lat?: true
    lng?: true
    category?: true
    createdAt?: true
  }

  export type PointOfInterestCountAggregateInputType = {
    id?: true
    name_it?: true
    name_en?: true
    lat?: true
    lng?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type PointOfInterestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointOfInterest to aggregate.
     */
    where?: PointOfInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointOfInterests to fetch.
     */
    orderBy?: PointOfInterestOrderByWithRelationInput | PointOfInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointOfInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointOfInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointOfInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointOfInterests
    **/
    _count?: true | PointOfInterestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointOfInterestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointOfInterestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointOfInterestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointOfInterestMaxAggregateInputType
  }

  export type GetPointOfInterestAggregateType<T extends PointOfInterestAggregateArgs> = {
        [P in keyof T & keyof AggregatePointOfInterest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointOfInterest[P]>
      : GetScalarType<T[P], AggregatePointOfInterest[P]>
  }




  export type PointOfInterestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointOfInterestWhereInput
    orderBy?: PointOfInterestOrderByWithAggregationInput | PointOfInterestOrderByWithAggregationInput[]
    by: PointOfInterestScalarFieldEnum[] | PointOfInterestScalarFieldEnum
    having?: PointOfInterestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointOfInterestCountAggregateInputType | true
    _avg?: PointOfInterestAvgAggregateInputType
    _sum?: PointOfInterestSumAggregateInputType
    _min?: PointOfInterestMinAggregateInputType
    _max?: PointOfInterestMaxAggregateInputType
  }

  export type PointOfInterestGroupByOutputType = {
    id: number
    name_it: string
    name_en: string
    lat: number
    lng: number
    category: string
    createdAt: Date
    _count: PointOfInterestCountAggregateOutputType | null
    _avg: PointOfInterestAvgAggregateOutputType | null
    _sum: PointOfInterestSumAggregateOutputType | null
    _min: PointOfInterestMinAggregateOutputType | null
    _max: PointOfInterestMaxAggregateOutputType | null
  }

  type GetPointOfInterestGroupByPayload<T extends PointOfInterestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointOfInterestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointOfInterestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointOfInterestGroupByOutputType[P]>
            : GetScalarType<T[P], PointOfInterestGroupByOutputType[P]>
        }
      >
    >


  export type PointOfInterestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_it?: boolean
    name_en?: boolean
    lat?: boolean
    lng?: boolean
    category?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pointOfInterest"]>

  export type PointOfInterestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_it?: boolean
    name_en?: boolean
    lat?: boolean
    lng?: boolean
    category?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pointOfInterest"]>

  export type PointOfInterestSelectScalar = {
    id?: boolean
    name_it?: boolean
    name_en?: boolean
    lat?: boolean
    lng?: boolean
    category?: boolean
    createdAt?: boolean
  }


  export type $PointOfInterestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointOfInterest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name_it: string
      name_en: string
      lat: number
      lng: number
      category: string
      createdAt: Date
    }, ExtArgs["result"]["pointOfInterest"]>
    composites: {}
  }

  type PointOfInterestGetPayload<S extends boolean | null | undefined | PointOfInterestDefaultArgs> = $Result.GetResult<Prisma.$PointOfInterestPayload, S>

  type PointOfInterestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointOfInterestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointOfInterestCountAggregateInputType | true
    }

  export interface PointOfInterestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointOfInterest'], meta: { name: 'PointOfInterest' } }
    /**
     * Find zero or one PointOfInterest that matches the filter.
     * @param {PointOfInterestFindUniqueArgs} args - Arguments to find a PointOfInterest
     * @example
     * // Get one PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointOfInterestFindUniqueArgs>(args: SelectSubset<T, PointOfInterestFindUniqueArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointOfInterest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointOfInterestFindUniqueOrThrowArgs} args - Arguments to find a PointOfInterest
     * @example
     * // Get one PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointOfInterestFindUniqueOrThrowArgs>(args: SelectSubset<T, PointOfInterestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointOfInterest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestFindFirstArgs} args - Arguments to find a PointOfInterest
     * @example
     * // Get one PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointOfInterestFindFirstArgs>(args?: SelectSubset<T, PointOfInterestFindFirstArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointOfInterest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestFindFirstOrThrowArgs} args - Arguments to find a PointOfInterest
     * @example
     * // Get one PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointOfInterestFindFirstOrThrowArgs>(args?: SelectSubset<T, PointOfInterestFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointOfInterests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointOfInterests
     * const pointOfInterests = await prisma.pointOfInterest.findMany()
     * 
     * // Get first 10 PointOfInterests
     * const pointOfInterests = await prisma.pointOfInterest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointOfInterestWithIdOnly = await prisma.pointOfInterest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointOfInterestFindManyArgs>(args?: SelectSubset<T, PointOfInterestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointOfInterest.
     * @param {PointOfInterestCreateArgs} args - Arguments to create a PointOfInterest.
     * @example
     * // Create one PointOfInterest
     * const PointOfInterest = await prisma.pointOfInterest.create({
     *   data: {
     *     // ... data to create a PointOfInterest
     *   }
     * })
     * 
     */
    create<T extends PointOfInterestCreateArgs>(args: SelectSubset<T, PointOfInterestCreateArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointOfInterests.
     * @param {PointOfInterestCreateManyArgs} args - Arguments to create many PointOfInterests.
     * @example
     * // Create many PointOfInterests
     * const pointOfInterest = await prisma.pointOfInterest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointOfInterestCreateManyArgs>(args?: SelectSubset<T, PointOfInterestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointOfInterests and returns the data saved in the database.
     * @param {PointOfInterestCreateManyAndReturnArgs} args - Arguments to create many PointOfInterests.
     * @example
     * // Create many PointOfInterests
     * const pointOfInterest = await prisma.pointOfInterest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointOfInterests and only return the `id`
     * const pointOfInterestWithIdOnly = await prisma.pointOfInterest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointOfInterestCreateManyAndReturnArgs>(args?: SelectSubset<T, PointOfInterestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointOfInterest.
     * @param {PointOfInterestDeleteArgs} args - Arguments to delete one PointOfInterest.
     * @example
     * // Delete one PointOfInterest
     * const PointOfInterest = await prisma.pointOfInterest.delete({
     *   where: {
     *     // ... filter to delete one PointOfInterest
     *   }
     * })
     * 
     */
    delete<T extends PointOfInterestDeleteArgs>(args: SelectSubset<T, PointOfInterestDeleteArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointOfInterest.
     * @param {PointOfInterestUpdateArgs} args - Arguments to update one PointOfInterest.
     * @example
     * // Update one PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointOfInterestUpdateArgs>(args: SelectSubset<T, PointOfInterestUpdateArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointOfInterests.
     * @param {PointOfInterestDeleteManyArgs} args - Arguments to filter PointOfInterests to delete.
     * @example
     * // Delete a few PointOfInterests
     * const { count } = await prisma.pointOfInterest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointOfInterestDeleteManyArgs>(args?: SelectSubset<T, PointOfInterestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointOfInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointOfInterests
     * const pointOfInterest = await prisma.pointOfInterest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointOfInterestUpdateManyArgs>(args: SelectSubset<T, PointOfInterestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointOfInterest.
     * @param {PointOfInterestUpsertArgs} args - Arguments to update or create a PointOfInterest.
     * @example
     * // Update or create a PointOfInterest
     * const pointOfInterest = await prisma.pointOfInterest.upsert({
     *   create: {
     *     // ... data to create a PointOfInterest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointOfInterest we want to update
     *   }
     * })
     */
    upsert<T extends PointOfInterestUpsertArgs>(args: SelectSubset<T, PointOfInterestUpsertArgs<ExtArgs>>): Prisma__PointOfInterestClient<$Result.GetResult<Prisma.$PointOfInterestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointOfInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestCountArgs} args - Arguments to filter PointOfInterests to count.
     * @example
     * // Count the number of PointOfInterests
     * const count = await prisma.pointOfInterest.count({
     *   where: {
     *     // ... the filter for the PointOfInterests we want to count
     *   }
     * })
    **/
    count<T extends PointOfInterestCountArgs>(
      args?: Subset<T, PointOfInterestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointOfInterestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointOfInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointOfInterestAggregateArgs>(args: Subset<T, PointOfInterestAggregateArgs>): Prisma.PrismaPromise<GetPointOfInterestAggregateType<T>>

    /**
     * Group by PointOfInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointOfInterestGroupByArgs} args - Group by arguments.
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
      T extends PointOfInterestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointOfInterestGroupByArgs['orderBy'] }
        : { orderBy?: PointOfInterestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointOfInterestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointOfInterestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointOfInterest model
   */
  readonly fields: PointOfInterestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointOfInterest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointOfInterestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PointOfInterest model
   */ 
  interface PointOfInterestFieldRefs {
    readonly id: FieldRef<"PointOfInterest", 'Int'>
    readonly name_it: FieldRef<"PointOfInterest", 'String'>
    readonly name_en: FieldRef<"PointOfInterest", 'String'>
    readonly lat: FieldRef<"PointOfInterest", 'Float'>
    readonly lng: FieldRef<"PointOfInterest", 'Float'>
    readonly category: FieldRef<"PointOfInterest", 'String'>
    readonly createdAt: FieldRef<"PointOfInterest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointOfInterest findUnique
   */
  export type PointOfInterestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter, which PointOfInterest to fetch.
     */
    where: PointOfInterestWhereUniqueInput
  }

  /**
   * PointOfInterest findUniqueOrThrow
   */
  export type PointOfInterestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter, which PointOfInterest to fetch.
     */
    where: PointOfInterestWhereUniqueInput
  }

  /**
   * PointOfInterest findFirst
   */
  export type PointOfInterestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter, which PointOfInterest to fetch.
     */
    where?: PointOfInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointOfInterests to fetch.
     */
    orderBy?: PointOfInterestOrderByWithRelationInput | PointOfInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointOfInterests.
     */
    cursor?: PointOfInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointOfInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointOfInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointOfInterests.
     */
    distinct?: PointOfInterestScalarFieldEnum | PointOfInterestScalarFieldEnum[]
  }

  /**
   * PointOfInterest findFirstOrThrow
   */
  export type PointOfInterestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter, which PointOfInterest to fetch.
     */
    where?: PointOfInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointOfInterests to fetch.
     */
    orderBy?: PointOfInterestOrderByWithRelationInput | PointOfInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointOfInterests.
     */
    cursor?: PointOfInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointOfInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointOfInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointOfInterests.
     */
    distinct?: PointOfInterestScalarFieldEnum | PointOfInterestScalarFieldEnum[]
  }

  /**
   * PointOfInterest findMany
   */
  export type PointOfInterestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter, which PointOfInterests to fetch.
     */
    where?: PointOfInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointOfInterests to fetch.
     */
    orderBy?: PointOfInterestOrderByWithRelationInput | PointOfInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointOfInterests.
     */
    cursor?: PointOfInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointOfInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointOfInterests.
     */
    skip?: number
    distinct?: PointOfInterestScalarFieldEnum | PointOfInterestScalarFieldEnum[]
  }

  /**
   * PointOfInterest create
   */
  export type PointOfInterestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * The data needed to create a PointOfInterest.
     */
    data: XOR<PointOfInterestCreateInput, PointOfInterestUncheckedCreateInput>
  }

  /**
   * PointOfInterest createMany
   */
  export type PointOfInterestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointOfInterests.
     */
    data: PointOfInterestCreateManyInput | PointOfInterestCreateManyInput[]
  }

  /**
   * PointOfInterest createManyAndReturn
   */
  export type PointOfInterestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointOfInterests.
     */
    data: PointOfInterestCreateManyInput | PointOfInterestCreateManyInput[]
  }

  /**
   * PointOfInterest update
   */
  export type PointOfInterestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * The data needed to update a PointOfInterest.
     */
    data: XOR<PointOfInterestUpdateInput, PointOfInterestUncheckedUpdateInput>
    /**
     * Choose, which PointOfInterest to update.
     */
    where: PointOfInterestWhereUniqueInput
  }

  /**
   * PointOfInterest updateMany
   */
  export type PointOfInterestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointOfInterests.
     */
    data: XOR<PointOfInterestUpdateManyMutationInput, PointOfInterestUncheckedUpdateManyInput>
    /**
     * Filter which PointOfInterests to update
     */
    where?: PointOfInterestWhereInput
  }

  /**
   * PointOfInterest upsert
   */
  export type PointOfInterestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * The filter to search for the PointOfInterest to update in case it exists.
     */
    where: PointOfInterestWhereUniqueInput
    /**
     * In case the PointOfInterest found by the `where` argument doesn't exist, create a new PointOfInterest with this data.
     */
    create: XOR<PointOfInterestCreateInput, PointOfInterestUncheckedCreateInput>
    /**
     * In case the PointOfInterest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointOfInterestUpdateInput, PointOfInterestUncheckedUpdateInput>
  }

  /**
   * PointOfInterest delete
   */
  export type PointOfInterestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
    /**
     * Filter which PointOfInterest to delete.
     */
    where: PointOfInterestWhereUniqueInput
  }

  /**
   * PointOfInterest deleteMany
   */
  export type PointOfInterestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointOfInterests to delete
     */
    where?: PointOfInterestWhereInput
  }

  /**
   * PointOfInterest without action
   */
  export type PointOfInterestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointOfInterest
     */
    select?: PointOfInterestSelect<ExtArgs> | null
  }


  /**
   * Model MediaFile
   */

  export type AggregateMediaFile = {
    _count: MediaFileCountAggregateOutputType | null
    _avg: MediaFileAvgAggregateOutputType | null
    _sum: MediaFileSumAggregateOutputType | null
    _min: MediaFileMinAggregateOutputType | null
    _max: MediaFileMaxAggregateOutputType | null
  }

  export type MediaFileAvgAggregateOutputType = {
    id: number | null
    size: number | null
  }

  export type MediaFileSumAggregateOutputType = {
    id: number | null
    size: number | null
  }

  export type MediaFileMinAggregateOutputType = {
    id: number | null
    key: string | null
    thumbnailKey: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    isPublic: boolean | null
    uploadedAt: Date | null
  }

  export type MediaFileMaxAggregateOutputType = {
    id: number | null
    key: string | null
    thumbnailKey: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    isPublic: boolean | null
    uploadedAt: Date | null
  }

  export type MediaFileCountAggregateOutputType = {
    id: number
    key: number
    thumbnailKey: number
    filename: number
    mimeType: number
    size: number
    isPublic: number
    uploadedAt: number
    _all: number
  }


  export type MediaFileAvgAggregateInputType = {
    id?: true
    size?: true
  }

  export type MediaFileSumAggregateInputType = {
    id?: true
    size?: true
  }

  export type MediaFileMinAggregateInputType = {
    id?: true
    key?: true
    thumbnailKey?: true
    filename?: true
    mimeType?: true
    size?: true
    isPublic?: true
    uploadedAt?: true
  }

  export type MediaFileMaxAggregateInputType = {
    id?: true
    key?: true
    thumbnailKey?: true
    filename?: true
    mimeType?: true
    size?: true
    isPublic?: true
    uploadedAt?: true
  }

  export type MediaFileCountAggregateInputType = {
    id?: true
    key?: true
    thumbnailKey?: true
    filename?: true
    mimeType?: true
    size?: true
    isPublic?: true
    uploadedAt?: true
    _all?: true
  }

  export type MediaFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaFile to aggregate.
     */
    where?: MediaFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFiles to fetch.
     */
    orderBy?: MediaFileOrderByWithRelationInput | MediaFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaFiles
    **/
    _count?: true | MediaFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaFileMaxAggregateInputType
  }

  export type GetMediaFileAggregateType<T extends MediaFileAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaFile[P]>
      : GetScalarType<T[P], AggregateMediaFile[P]>
  }




  export type MediaFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaFileWhereInput
    orderBy?: MediaFileOrderByWithAggregationInput | MediaFileOrderByWithAggregationInput[]
    by: MediaFileScalarFieldEnum[] | MediaFileScalarFieldEnum
    having?: MediaFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaFileCountAggregateInputType | true
    _avg?: MediaFileAvgAggregateInputType
    _sum?: MediaFileSumAggregateInputType
    _min?: MediaFileMinAggregateInputType
    _max?: MediaFileMaxAggregateInputType
  }

  export type MediaFileGroupByOutputType = {
    id: number
    key: string
    thumbnailKey: string | null
    filename: string
    mimeType: string
    size: number
    isPublic: boolean
    uploadedAt: Date
    _count: MediaFileCountAggregateOutputType | null
    _avg: MediaFileAvgAggregateOutputType | null
    _sum: MediaFileSumAggregateOutputType | null
    _min: MediaFileMinAggregateOutputType | null
    _max: MediaFileMaxAggregateOutputType | null
  }

  type GetMediaFileGroupByPayload<T extends MediaFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaFileGroupByOutputType[P]>
            : GetScalarType<T[P], MediaFileGroupByOutputType[P]>
        }
      >
    >


  export type MediaFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    thumbnailKey?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    isPublic?: boolean
    uploadedAt?: boolean
    categories?: boolean | MediaFile$categoriesArgs<ExtArgs>
    servicesUsingAsPreview?: boolean | MediaFile$servicesUsingAsPreviewArgs<ExtArgs>
    _count?: boolean | MediaFileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaFile"]>

  export type MediaFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    thumbnailKey?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    isPublic?: boolean
    uploadedAt?: boolean
  }, ExtArgs["result"]["mediaFile"]>

  export type MediaFileSelectScalar = {
    id?: boolean
    key?: boolean
    thumbnailKey?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    isPublic?: boolean
    uploadedAt?: boolean
  }

  export type MediaFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | MediaFile$categoriesArgs<ExtArgs>
    servicesUsingAsPreview?: boolean | MediaFile$servicesUsingAsPreviewArgs<ExtArgs>
    _count?: boolean | MediaFileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MediaFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MediaFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaFile"
    objects: {
      categories: Prisma.$MediaFileCategoryPayload<ExtArgs>[]
      servicesUsingAsPreview: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      thumbnailKey: string | null
      filename: string
      mimeType: string
      size: number
      isPublic: boolean
      uploadedAt: Date
    }, ExtArgs["result"]["mediaFile"]>
    composites: {}
  }

  type MediaFileGetPayload<S extends boolean | null | undefined | MediaFileDefaultArgs> = $Result.GetResult<Prisma.$MediaFilePayload, S>

  type MediaFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MediaFileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MediaFileCountAggregateInputType | true
    }

  export interface MediaFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaFile'], meta: { name: 'MediaFile' } }
    /**
     * Find zero or one MediaFile that matches the filter.
     * @param {MediaFileFindUniqueArgs} args - Arguments to find a MediaFile
     * @example
     * // Get one MediaFile
     * const mediaFile = await prisma.mediaFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFileFindUniqueArgs>(args: SelectSubset<T, MediaFileFindUniqueArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MediaFile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MediaFileFindUniqueOrThrowArgs} args - Arguments to find a MediaFile
     * @example
     * // Get one MediaFile
     * const mediaFile = await prisma.mediaFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFileFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MediaFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileFindFirstArgs} args - Arguments to find a MediaFile
     * @example
     * // Get one MediaFile
     * const mediaFile = await prisma.mediaFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFileFindFirstArgs>(args?: SelectSubset<T, MediaFileFindFirstArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MediaFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileFindFirstOrThrowArgs} args - Arguments to find a MediaFile
     * @example
     * // Get one MediaFile
     * const mediaFile = await prisma.mediaFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFileFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MediaFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaFiles
     * const mediaFiles = await prisma.mediaFile.findMany()
     * 
     * // Get first 10 MediaFiles
     * const mediaFiles = await prisma.mediaFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaFileWithIdOnly = await prisma.mediaFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFileFindManyArgs>(args?: SelectSubset<T, MediaFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MediaFile.
     * @param {MediaFileCreateArgs} args - Arguments to create a MediaFile.
     * @example
     * // Create one MediaFile
     * const MediaFile = await prisma.mediaFile.create({
     *   data: {
     *     // ... data to create a MediaFile
     *   }
     * })
     * 
     */
    create<T extends MediaFileCreateArgs>(args: SelectSubset<T, MediaFileCreateArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MediaFiles.
     * @param {MediaFileCreateManyArgs} args - Arguments to create many MediaFiles.
     * @example
     * // Create many MediaFiles
     * const mediaFile = await prisma.mediaFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaFileCreateManyArgs>(args?: SelectSubset<T, MediaFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaFiles and returns the data saved in the database.
     * @param {MediaFileCreateManyAndReturnArgs} args - Arguments to create many MediaFiles.
     * @example
     * // Create many MediaFiles
     * const mediaFile = await prisma.mediaFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaFiles and only return the `id`
     * const mediaFileWithIdOnly = await prisma.mediaFile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaFileCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MediaFile.
     * @param {MediaFileDeleteArgs} args - Arguments to delete one MediaFile.
     * @example
     * // Delete one MediaFile
     * const MediaFile = await prisma.mediaFile.delete({
     *   where: {
     *     // ... filter to delete one MediaFile
     *   }
     * })
     * 
     */
    delete<T extends MediaFileDeleteArgs>(args: SelectSubset<T, MediaFileDeleteArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MediaFile.
     * @param {MediaFileUpdateArgs} args - Arguments to update one MediaFile.
     * @example
     * // Update one MediaFile
     * const mediaFile = await prisma.mediaFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaFileUpdateArgs>(args: SelectSubset<T, MediaFileUpdateArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MediaFiles.
     * @param {MediaFileDeleteManyArgs} args - Arguments to filter MediaFiles to delete.
     * @example
     * // Delete a few MediaFiles
     * const { count } = await prisma.mediaFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaFileDeleteManyArgs>(args?: SelectSubset<T, MediaFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaFiles
     * const mediaFile = await prisma.mediaFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaFileUpdateManyArgs>(args: SelectSubset<T, MediaFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MediaFile.
     * @param {MediaFileUpsertArgs} args - Arguments to update or create a MediaFile.
     * @example
     * // Update or create a MediaFile
     * const mediaFile = await prisma.mediaFile.upsert({
     *   create: {
     *     // ... data to create a MediaFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaFile we want to update
     *   }
     * })
     */
    upsert<T extends MediaFileUpsertArgs>(args: SelectSubset<T, MediaFileUpsertArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MediaFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCountArgs} args - Arguments to filter MediaFiles to count.
     * @example
     * // Count the number of MediaFiles
     * const count = await prisma.mediaFile.count({
     *   where: {
     *     // ... the filter for the MediaFiles we want to count
     *   }
     * })
    **/
    count<T extends MediaFileCountArgs>(
      args?: Subset<T, MediaFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MediaFileAggregateArgs>(args: Subset<T, MediaFileAggregateArgs>): Prisma.PrismaPromise<GetMediaFileAggregateType<T>>

    /**
     * Group by MediaFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileGroupByArgs} args - Group by arguments.
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
      T extends MediaFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaFileGroupByArgs['orderBy'] }
        : { orderBy?: MediaFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MediaFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaFile model
   */
  readonly fields: MediaFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends MediaFile$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, MediaFile$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findMany"> | Null>
    servicesUsingAsPreview<T extends MediaFile$servicesUsingAsPreviewArgs<ExtArgs> = {}>(args?: Subset<T, MediaFile$servicesUsingAsPreviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the MediaFile model
   */ 
  interface MediaFileFieldRefs {
    readonly id: FieldRef<"MediaFile", 'Int'>
    readonly key: FieldRef<"MediaFile", 'String'>
    readonly thumbnailKey: FieldRef<"MediaFile", 'String'>
    readonly filename: FieldRef<"MediaFile", 'String'>
    readonly mimeType: FieldRef<"MediaFile", 'String'>
    readonly size: FieldRef<"MediaFile", 'Int'>
    readonly isPublic: FieldRef<"MediaFile", 'Boolean'>
    readonly uploadedAt: FieldRef<"MediaFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaFile findUnique
   */
  export type MediaFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter, which MediaFile to fetch.
     */
    where: MediaFileWhereUniqueInput
  }

  /**
   * MediaFile findUniqueOrThrow
   */
  export type MediaFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter, which MediaFile to fetch.
     */
    where: MediaFileWhereUniqueInput
  }

  /**
   * MediaFile findFirst
   */
  export type MediaFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter, which MediaFile to fetch.
     */
    where?: MediaFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFiles to fetch.
     */
    orderBy?: MediaFileOrderByWithRelationInput | MediaFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaFiles.
     */
    cursor?: MediaFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaFiles.
     */
    distinct?: MediaFileScalarFieldEnum | MediaFileScalarFieldEnum[]
  }

  /**
   * MediaFile findFirstOrThrow
   */
  export type MediaFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter, which MediaFile to fetch.
     */
    where?: MediaFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFiles to fetch.
     */
    orderBy?: MediaFileOrderByWithRelationInput | MediaFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaFiles.
     */
    cursor?: MediaFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaFiles.
     */
    distinct?: MediaFileScalarFieldEnum | MediaFileScalarFieldEnum[]
  }

  /**
   * MediaFile findMany
   */
  export type MediaFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter, which MediaFiles to fetch.
     */
    where?: MediaFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFiles to fetch.
     */
    orderBy?: MediaFileOrderByWithRelationInput | MediaFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaFiles.
     */
    cursor?: MediaFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFiles.
     */
    skip?: number
    distinct?: MediaFileScalarFieldEnum | MediaFileScalarFieldEnum[]
  }

  /**
   * MediaFile create
   */
  export type MediaFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaFile.
     */
    data: XOR<MediaFileCreateInput, MediaFileUncheckedCreateInput>
  }

  /**
   * MediaFile createMany
   */
  export type MediaFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaFiles.
     */
    data: MediaFileCreateManyInput | MediaFileCreateManyInput[]
  }

  /**
   * MediaFile createManyAndReturn
   */
  export type MediaFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MediaFiles.
     */
    data: MediaFileCreateManyInput | MediaFileCreateManyInput[]
  }

  /**
   * MediaFile update
   */
  export type MediaFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaFile.
     */
    data: XOR<MediaFileUpdateInput, MediaFileUncheckedUpdateInput>
    /**
     * Choose, which MediaFile to update.
     */
    where: MediaFileWhereUniqueInput
  }

  /**
   * MediaFile updateMany
   */
  export type MediaFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaFiles.
     */
    data: XOR<MediaFileUpdateManyMutationInput, MediaFileUncheckedUpdateManyInput>
    /**
     * Filter which MediaFiles to update
     */
    where?: MediaFileWhereInput
  }

  /**
   * MediaFile upsert
   */
  export type MediaFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaFile to update in case it exists.
     */
    where: MediaFileWhereUniqueInput
    /**
     * In case the MediaFile found by the `where` argument doesn't exist, create a new MediaFile with this data.
     */
    create: XOR<MediaFileCreateInput, MediaFileUncheckedCreateInput>
    /**
     * In case the MediaFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaFileUpdateInput, MediaFileUncheckedUpdateInput>
  }

  /**
   * MediaFile delete
   */
  export type MediaFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    /**
     * Filter which MediaFile to delete.
     */
    where: MediaFileWhereUniqueInput
  }

  /**
   * MediaFile deleteMany
   */
  export type MediaFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaFiles to delete
     */
    where?: MediaFileWhereInput
  }

  /**
   * MediaFile.categories
   */
  export type MediaFile$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    where?: MediaFileCategoryWhereInput
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    cursor?: MediaFileCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaFileCategoryScalarFieldEnum | MediaFileCategoryScalarFieldEnum[]
  }

  /**
   * MediaFile.servicesUsingAsPreview
   */
  export type MediaFile$servicesUsingAsPreviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * MediaFile without action
   */
  export type MediaFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
  }


  /**
   * Model PhotoCategory
   */

  export type AggregatePhotoCategory = {
    _count: PhotoCategoryCountAggregateOutputType | null
    _avg: PhotoCategoryAvgAggregateOutputType | null
    _sum: PhotoCategorySumAggregateOutputType | null
    _min: PhotoCategoryMinAggregateOutputType | null
    _max: PhotoCategoryMaxAggregateOutputType | null
  }

  export type PhotoCategoryAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type PhotoCategorySumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type PhotoCategoryMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name_it: string | null
    name_en: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhotoCategoryMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name_it: string | null
    name_en: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhotoCategoryCountAggregateOutputType = {
    id: number
    slug: number
    name_it: number
    name_en: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PhotoCategoryAvgAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type PhotoCategorySumAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type PhotoCategoryMinAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhotoCategoryMaxAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhotoCategoryCountAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PhotoCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoCategory to aggregate.
     */
    where?: PhotoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoCategories to fetch.
     */
    orderBy?: PhotoCategoryOrderByWithRelationInput | PhotoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhotoCategories
    **/
    _count?: true | PhotoCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhotoCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhotoCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoCategoryMaxAggregateInputType
  }

  export type GetPhotoCategoryAggregateType<T extends PhotoCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePhotoCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhotoCategory[P]>
      : GetScalarType<T[P], AggregatePhotoCategory[P]>
  }




  export type PhotoCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoCategoryWhereInput
    orderBy?: PhotoCategoryOrderByWithAggregationInput | PhotoCategoryOrderByWithAggregationInput[]
    by: PhotoCategoryScalarFieldEnum[] | PhotoCategoryScalarFieldEnum
    having?: PhotoCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoCategoryCountAggregateInputType | true
    _avg?: PhotoCategoryAvgAggregateInputType
    _sum?: PhotoCategorySumAggregateInputType
    _min?: PhotoCategoryMinAggregateInputType
    _max?: PhotoCategoryMaxAggregateInputType
  }

  export type PhotoCategoryGroupByOutputType = {
    id: number
    slug: string
    name_it: string
    name_en: string
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: PhotoCategoryCountAggregateOutputType | null
    _avg: PhotoCategoryAvgAggregateOutputType | null
    _sum: PhotoCategorySumAggregateOutputType | null
    _min: PhotoCategoryMinAggregateOutputType | null
    _max: PhotoCategoryMaxAggregateOutputType | null
  }

  type GetPhotoCategoryGroupByPayload<T extends PhotoCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoCategoryGroupByOutputType[P]>
        }
      >
    >


  export type PhotoCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    media?: boolean | PhotoCategory$mediaArgs<ExtArgs>
    services?: boolean | PhotoCategory$servicesArgs<ExtArgs>
    _count?: boolean | PhotoCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photoCategory"]>

  export type PhotoCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["photoCategory"]>

  export type PhotoCategorySelectScalar = {
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PhotoCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | PhotoCategory$mediaArgs<ExtArgs>
    services?: boolean | PhotoCategory$servicesArgs<ExtArgs>
    _count?: boolean | PhotoCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PhotoCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PhotoCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhotoCategory"
    objects: {
      media: Prisma.$MediaFileCategoryPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name_it: string
      name_en: string
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["photoCategory"]>
    composites: {}
  }

  type PhotoCategoryGetPayload<S extends boolean | null | undefined | PhotoCategoryDefaultArgs> = $Result.GetResult<Prisma.$PhotoCategoryPayload, S>

  type PhotoCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PhotoCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PhotoCategoryCountAggregateInputType | true
    }

  export interface PhotoCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhotoCategory'], meta: { name: 'PhotoCategory' } }
    /**
     * Find zero or one PhotoCategory that matches the filter.
     * @param {PhotoCategoryFindUniqueArgs} args - Arguments to find a PhotoCategory
     * @example
     * // Get one PhotoCategory
     * const photoCategory = await prisma.photoCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoCategoryFindUniqueArgs>(args: SelectSubset<T, PhotoCategoryFindUniqueArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PhotoCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PhotoCategoryFindUniqueOrThrowArgs} args - Arguments to find a PhotoCategory
     * @example
     * // Get one PhotoCategory
     * const photoCategory = await prisma.photoCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PhotoCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryFindFirstArgs} args - Arguments to find a PhotoCategory
     * @example
     * // Get one PhotoCategory
     * const photoCategory = await prisma.photoCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoCategoryFindFirstArgs>(args?: SelectSubset<T, PhotoCategoryFindFirstArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PhotoCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryFindFirstOrThrowArgs} args - Arguments to find a PhotoCategory
     * @example
     * // Get one PhotoCategory
     * const photoCategory = await prisma.photoCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PhotoCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhotoCategories
     * const photoCategories = await prisma.photoCategory.findMany()
     * 
     * // Get first 10 PhotoCategories
     * const photoCategories = await prisma.photoCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const photoCategoryWithIdOnly = await prisma.photoCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhotoCategoryFindManyArgs>(args?: SelectSubset<T, PhotoCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PhotoCategory.
     * @param {PhotoCategoryCreateArgs} args - Arguments to create a PhotoCategory.
     * @example
     * // Create one PhotoCategory
     * const PhotoCategory = await prisma.photoCategory.create({
     *   data: {
     *     // ... data to create a PhotoCategory
     *   }
     * })
     * 
     */
    create<T extends PhotoCategoryCreateArgs>(args: SelectSubset<T, PhotoCategoryCreateArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PhotoCategories.
     * @param {PhotoCategoryCreateManyArgs} args - Arguments to create many PhotoCategories.
     * @example
     * // Create many PhotoCategories
     * const photoCategory = await prisma.photoCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoCategoryCreateManyArgs>(args?: SelectSubset<T, PhotoCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhotoCategories and returns the data saved in the database.
     * @param {PhotoCategoryCreateManyAndReturnArgs} args - Arguments to create many PhotoCategories.
     * @example
     * // Create many PhotoCategories
     * const photoCategory = await prisma.photoCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhotoCategories and only return the `id`
     * const photoCategoryWithIdOnly = await prisma.photoCategory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PhotoCategory.
     * @param {PhotoCategoryDeleteArgs} args - Arguments to delete one PhotoCategory.
     * @example
     * // Delete one PhotoCategory
     * const PhotoCategory = await prisma.photoCategory.delete({
     *   where: {
     *     // ... filter to delete one PhotoCategory
     *   }
     * })
     * 
     */
    delete<T extends PhotoCategoryDeleteArgs>(args: SelectSubset<T, PhotoCategoryDeleteArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PhotoCategory.
     * @param {PhotoCategoryUpdateArgs} args - Arguments to update one PhotoCategory.
     * @example
     * // Update one PhotoCategory
     * const photoCategory = await prisma.photoCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoCategoryUpdateArgs>(args: SelectSubset<T, PhotoCategoryUpdateArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PhotoCategories.
     * @param {PhotoCategoryDeleteManyArgs} args - Arguments to filter PhotoCategories to delete.
     * @example
     * // Delete a few PhotoCategories
     * const { count } = await prisma.photoCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoCategoryDeleteManyArgs>(args?: SelectSubset<T, PhotoCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhotoCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhotoCategories
     * const photoCategory = await prisma.photoCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoCategoryUpdateManyArgs>(args: SelectSubset<T, PhotoCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PhotoCategory.
     * @param {PhotoCategoryUpsertArgs} args - Arguments to update or create a PhotoCategory.
     * @example
     * // Update or create a PhotoCategory
     * const photoCategory = await prisma.photoCategory.upsert({
     *   create: {
     *     // ... data to create a PhotoCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhotoCategory we want to update
     *   }
     * })
     */
    upsert<T extends PhotoCategoryUpsertArgs>(args: SelectSubset<T, PhotoCategoryUpsertArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PhotoCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryCountArgs} args - Arguments to filter PhotoCategories to count.
     * @example
     * // Count the number of PhotoCategories
     * const count = await prisma.photoCategory.count({
     *   where: {
     *     // ... the filter for the PhotoCategories we want to count
     *   }
     * })
    **/
    count<T extends PhotoCategoryCountArgs>(
      args?: Subset<T, PhotoCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhotoCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhotoCategoryAggregateArgs>(args: Subset<T, PhotoCategoryAggregateArgs>): Prisma.PrismaPromise<GetPhotoCategoryAggregateType<T>>

    /**
     * Group by PhotoCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCategoryGroupByArgs} args - Group by arguments.
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
      T extends PhotoCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoCategoryGroupByArgs['orderBy'] }
        : { orderBy?: PhotoCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhotoCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhotoCategory model
   */
  readonly fields: PhotoCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhotoCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends PhotoCategory$mediaArgs<ExtArgs> = {}>(args?: Subset<T, PhotoCategory$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findMany"> | Null>
    services<T extends PhotoCategory$servicesArgs<ExtArgs> = {}>(args?: Subset<T, PhotoCategory$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PhotoCategory model
   */ 
  interface PhotoCategoryFieldRefs {
    readonly id: FieldRef<"PhotoCategory", 'Int'>
    readonly slug: FieldRef<"PhotoCategory", 'String'>
    readonly name_it: FieldRef<"PhotoCategory", 'String'>
    readonly name_en: FieldRef<"PhotoCategory", 'String'>
    readonly sortOrder: FieldRef<"PhotoCategory", 'Int'>
    readonly createdAt: FieldRef<"PhotoCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"PhotoCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PhotoCategory findUnique
   */
  export type PhotoCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoCategory to fetch.
     */
    where: PhotoCategoryWhereUniqueInput
  }

  /**
   * PhotoCategory findUniqueOrThrow
   */
  export type PhotoCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoCategory to fetch.
     */
    where: PhotoCategoryWhereUniqueInput
  }

  /**
   * PhotoCategory findFirst
   */
  export type PhotoCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoCategory to fetch.
     */
    where?: PhotoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoCategories to fetch.
     */
    orderBy?: PhotoCategoryOrderByWithRelationInput | PhotoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoCategories.
     */
    cursor?: PhotoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoCategories.
     */
    distinct?: PhotoCategoryScalarFieldEnum | PhotoCategoryScalarFieldEnum[]
  }

  /**
   * PhotoCategory findFirstOrThrow
   */
  export type PhotoCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoCategory to fetch.
     */
    where?: PhotoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoCategories to fetch.
     */
    orderBy?: PhotoCategoryOrderByWithRelationInput | PhotoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoCategories.
     */
    cursor?: PhotoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoCategories.
     */
    distinct?: PhotoCategoryScalarFieldEnum | PhotoCategoryScalarFieldEnum[]
  }

  /**
   * PhotoCategory findMany
   */
  export type PhotoCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoCategories to fetch.
     */
    where?: PhotoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoCategories to fetch.
     */
    orderBy?: PhotoCategoryOrderByWithRelationInput | PhotoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhotoCategories.
     */
    cursor?: PhotoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoCategories.
     */
    skip?: number
    distinct?: PhotoCategoryScalarFieldEnum | PhotoCategoryScalarFieldEnum[]
  }

  /**
   * PhotoCategory create
   */
  export type PhotoCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PhotoCategory.
     */
    data: XOR<PhotoCategoryCreateInput, PhotoCategoryUncheckedCreateInput>
  }

  /**
   * PhotoCategory createMany
   */
  export type PhotoCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhotoCategories.
     */
    data: PhotoCategoryCreateManyInput | PhotoCategoryCreateManyInput[]
  }

  /**
   * PhotoCategory createManyAndReturn
   */
  export type PhotoCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PhotoCategories.
     */
    data: PhotoCategoryCreateManyInput | PhotoCategoryCreateManyInput[]
  }

  /**
   * PhotoCategory update
   */
  export type PhotoCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PhotoCategory.
     */
    data: XOR<PhotoCategoryUpdateInput, PhotoCategoryUncheckedUpdateInput>
    /**
     * Choose, which PhotoCategory to update.
     */
    where: PhotoCategoryWhereUniqueInput
  }

  /**
   * PhotoCategory updateMany
   */
  export type PhotoCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhotoCategories.
     */
    data: XOR<PhotoCategoryUpdateManyMutationInput, PhotoCategoryUncheckedUpdateManyInput>
    /**
     * Filter which PhotoCategories to update
     */
    where?: PhotoCategoryWhereInput
  }

  /**
   * PhotoCategory upsert
   */
  export type PhotoCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PhotoCategory to update in case it exists.
     */
    where: PhotoCategoryWhereUniqueInput
    /**
     * In case the PhotoCategory found by the `where` argument doesn't exist, create a new PhotoCategory with this data.
     */
    create: XOR<PhotoCategoryCreateInput, PhotoCategoryUncheckedCreateInput>
    /**
     * In case the PhotoCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoCategoryUpdateInput, PhotoCategoryUncheckedUpdateInput>
  }

  /**
   * PhotoCategory delete
   */
  export type PhotoCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    /**
     * Filter which PhotoCategory to delete.
     */
    where: PhotoCategoryWhereUniqueInput
  }

  /**
   * PhotoCategory deleteMany
   */
  export type PhotoCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoCategories to delete
     */
    where?: PhotoCategoryWhereInput
  }

  /**
   * PhotoCategory.media
   */
  export type PhotoCategory$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    where?: MediaFileCategoryWhereInput
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    cursor?: MediaFileCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaFileCategoryScalarFieldEnum | MediaFileCategoryScalarFieldEnum[]
  }

  /**
   * PhotoCategory.services
   */
  export type PhotoCategory$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * PhotoCategory without action
   */
  export type PhotoCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
  }


  /**
   * Model MediaFileCategory
   */

  export type AggregateMediaFileCategory = {
    _count: MediaFileCategoryCountAggregateOutputType | null
    _avg: MediaFileCategoryAvgAggregateOutputType | null
    _sum: MediaFileCategorySumAggregateOutputType | null
    _min: MediaFileCategoryMinAggregateOutputType | null
    _max: MediaFileCategoryMaxAggregateOutputType | null
  }

  export type MediaFileCategoryAvgAggregateOutputType = {
    id: number | null
    mediaFileId: number | null
    photoCategoryId: number | null
  }

  export type MediaFileCategorySumAggregateOutputType = {
    id: number | null
    mediaFileId: number | null
    photoCategoryId: number | null
  }

  export type MediaFileCategoryMinAggregateOutputType = {
    id: number | null
    mediaFileId: number | null
    photoCategoryId: number | null
  }

  export type MediaFileCategoryMaxAggregateOutputType = {
    id: number | null
    mediaFileId: number | null
    photoCategoryId: number | null
  }

  export type MediaFileCategoryCountAggregateOutputType = {
    id: number
    mediaFileId: number
    photoCategoryId: number
    _all: number
  }


  export type MediaFileCategoryAvgAggregateInputType = {
    id?: true
    mediaFileId?: true
    photoCategoryId?: true
  }

  export type MediaFileCategorySumAggregateInputType = {
    id?: true
    mediaFileId?: true
    photoCategoryId?: true
  }

  export type MediaFileCategoryMinAggregateInputType = {
    id?: true
    mediaFileId?: true
    photoCategoryId?: true
  }

  export type MediaFileCategoryMaxAggregateInputType = {
    id?: true
    mediaFileId?: true
    photoCategoryId?: true
  }

  export type MediaFileCategoryCountAggregateInputType = {
    id?: true
    mediaFileId?: true
    photoCategoryId?: true
    _all?: true
  }

  export type MediaFileCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaFileCategory to aggregate.
     */
    where?: MediaFileCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFileCategories to fetch.
     */
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaFileCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFileCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFileCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaFileCategories
    **/
    _count?: true | MediaFileCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaFileCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaFileCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaFileCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaFileCategoryMaxAggregateInputType
  }

  export type GetMediaFileCategoryAggregateType<T extends MediaFileCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaFileCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaFileCategory[P]>
      : GetScalarType<T[P], AggregateMediaFileCategory[P]>
  }




  export type MediaFileCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaFileCategoryWhereInput
    orderBy?: MediaFileCategoryOrderByWithAggregationInput | MediaFileCategoryOrderByWithAggregationInput[]
    by: MediaFileCategoryScalarFieldEnum[] | MediaFileCategoryScalarFieldEnum
    having?: MediaFileCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaFileCategoryCountAggregateInputType | true
    _avg?: MediaFileCategoryAvgAggregateInputType
    _sum?: MediaFileCategorySumAggregateInputType
    _min?: MediaFileCategoryMinAggregateInputType
    _max?: MediaFileCategoryMaxAggregateInputType
  }

  export type MediaFileCategoryGroupByOutputType = {
    id: number
    mediaFileId: number
    photoCategoryId: number
    _count: MediaFileCategoryCountAggregateOutputType | null
    _avg: MediaFileCategoryAvgAggregateOutputType | null
    _sum: MediaFileCategorySumAggregateOutputType | null
    _min: MediaFileCategoryMinAggregateOutputType | null
    _max: MediaFileCategoryMaxAggregateOutputType | null
  }

  type GetMediaFileCategoryGroupByPayload<T extends MediaFileCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaFileCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaFileCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaFileCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], MediaFileCategoryGroupByOutputType[P]>
        }
      >
    >


  export type MediaFileCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaFileId?: boolean
    photoCategoryId?: boolean
    mediaFile?: boolean | MediaFileDefaultArgs<ExtArgs>
    photoCategory?: boolean | PhotoCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaFileCategory"]>

  export type MediaFileCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaFileId?: boolean
    photoCategoryId?: boolean
    mediaFile?: boolean | MediaFileDefaultArgs<ExtArgs>
    photoCategory?: boolean | PhotoCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaFileCategory"]>

  export type MediaFileCategorySelectScalar = {
    id?: boolean
    mediaFileId?: boolean
    photoCategoryId?: boolean
  }

  export type MediaFileCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaFile?: boolean | MediaFileDefaultArgs<ExtArgs>
    photoCategory?: boolean | PhotoCategoryDefaultArgs<ExtArgs>
  }
  export type MediaFileCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediaFile?: boolean | MediaFileDefaultArgs<ExtArgs>
    photoCategory?: boolean | PhotoCategoryDefaultArgs<ExtArgs>
  }

  export type $MediaFileCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaFileCategory"
    objects: {
      mediaFile: Prisma.$MediaFilePayload<ExtArgs>
      photoCategory: Prisma.$PhotoCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mediaFileId: number
      photoCategoryId: number
    }, ExtArgs["result"]["mediaFileCategory"]>
    composites: {}
  }

  type MediaFileCategoryGetPayload<S extends boolean | null | undefined | MediaFileCategoryDefaultArgs> = $Result.GetResult<Prisma.$MediaFileCategoryPayload, S>

  type MediaFileCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MediaFileCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MediaFileCategoryCountAggregateInputType | true
    }

  export interface MediaFileCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaFileCategory'], meta: { name: 'MediaFileCategory' } }
    /**
     * Find zero or one MediaFileCategory that matches the filter.
     * @param {MediaFileCategoryFindUniqueArgs} args - Arguments to find a MediaFileCategory
     * @example
     * // Get one MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFileCategoryFindUniqueArgs>(args: SelectSubset<T, MediaFileCategoryFindUniqueArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MediaFileCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MediaFileCategoryFindUniqueOrThrowArgs} args - Arguments to find a MediaFileCategory
     * @example
     * // Get one MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFileCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFileCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MediaFileCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryFindFirstArgs} args - Arguments to find a MediaFileCategory
     * @example
     * // Get one MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFileCategoryFindFirstArgs>(args?: SelectSubset<T, MediaFileCategoryFindFirstArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MediaFileCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryFindFirstOrThrowArgs} args - Arguments to find a MediaFileCategory
     * @example
     * // Get one MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFileCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFileCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MediaFileCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaFileCategories
     * const mediaFileCategories = await prisma.mediaFileCategory.findMany()
     * 
     * // Get first 10 MediaFileCategories
     * const mediaFileCategories = await prisma.mediaFileCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaFileCategoryWithIdOnly = await prisma.mediaFileCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFileCategoryFindManyArgs>(args?: SelectSubset<T, MediaFileCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MediaFileCategory.
     * @param {MediaFileCategoryCreateArgs} args - Arguments to create a MediaFileCategory.
     * @example
     * // Create one MediaFileCategory
     * const MediaFileCategory = await prisma.mediaFileCategory.create({
     *   data: {
     *     // ... data to create a MediaFileCategory
     *   }
     * })
     * 
     */
    create<T extends MediaFileCategoryCreateArgs>(args: SelectSubset<T, MediaFileCategoryCreateArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MediaFileCategories.
     * @param {MediaFileCategoryCreateManyArgs} args - Arguments to create many MediaFileCategories.
     * @example
     * // Create many MediaFileCategories
     * const mediaFileCategory = await prisma.mediaFileCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaFileCategoryCreateManyArgs>(args?: SelectSubset<T, MediaFileCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaFileCategories and returns the data saved in the database.
     * @param {MediaFileCategoryCreateManyAndReturnArgs} args - Arguments to create many MediaFileCategories.
     * @example
     * // Create many MediaFileCategories
     * const mediaFileCategory = await prisma.mediaFileCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaFileCategories and only return the `id`
     * const mediaFileCategoryWithIdOnly = await prisma.mediaFileCategory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaFileCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaFileCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MediaFileCategory.
     * @param {MediaFileCategoryDeleteArgs} args - Arguments to delete one MediaFileCategory.
     * @example
     * // Delete one MediaFileCategory
     * const MediaFileCategory = await prisma.mediaFileCategory.delete({
     *   where: {
     *     // ... filter to delete one MediaFileCategory
     *   }
     * })
     * 
     */
    delete<T extends MediaFileCategoryDeleteArgs>(args: SelectSubset<T, MediaFileCategoryDeleteArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MediaFileCategory.
     * @param {MediaFileCategoryUpdateArgs} args - Arguments to update one MediaFileCategory.
     * @example
     * // Update one MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaFileCategoryUpdateArgs>(args: SelectSubset<T, MediaFileCategoryUpdateArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MediaFileCategories.
     * @param {MediaFileCategoryDeleteManyArgs} args - Arguments to filter MediaFileCategories to delete.
     * @example
     * // Delete a few MediaFileCategories
     * const { count } = await prisma.mediaFileCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaFileCategoryDeleteManyArgs>(args?: SelectSubset<T, MediaFileCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaFileCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaFileCategories
     * const mediaFileCategory = await prisma.mediaFileCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaFileCategoryUpdateManyArgs>(args: SelectSubset<T, MediaFileCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MediaFileCategory.
     * @param {MediaFileCategoryUpsertArgs} args - Arguments to update or create a MediaFileCategory.
     * @example
     * // Update or create a MediaFileCategory
     * const mediaFileCategory = await prisma.mediaFileCategory.upsert({
     *   create: {
     *     // ... data to create a MediaFileCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaFileCategory we want to update
     *   }
     * })
     */
    upsert<T extends MediaFileCategoryUpsertArgs>(args: SelectSubset<T, MediaFileCategoryUpsertArgs<ExtArgs>>): Prisma__MediaFileCategoryClient<$Result.GetResult<Prisma.$MediaFileCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MediaFileCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryCountArgs} args - Arguments to filter MediaFileCategories to count.
     * @example
     * // Count the number of MediaFileCategories
     * const count = await prisma.mediaFileCategory.count({
     *   where: {
     *     // ... the filter for the MediaFileCategories we want to count
     *   }
     * })
    **/
    count<T extends MediaFileCategoryCountArgs>(
      args?: Subset<T, MediaFileCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaFileCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaFileCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MediaFileCategoryAggregateArgs>(args: Subset<T, MediaFileCategoryAggregateArgs>): Prisma.PrismaPromise<GetMediaFileCategoryAggregateType<T>>

    /**
     * Group by MediaFileCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFileCategoryGroupByArgs} args - Group by arguments.
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
      T extends MediaFileCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaFileCategoryGroupByArgs['orderBy'] }
        : { orderBy?: MediaFileCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MediaFileCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaFileCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaFileCategory model
   */
  readonly fields: MediaFileCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaFileCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaFileCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mediaFile<T extends MediaFileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaFileDefaultArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    photoCategory<T extends PhotoCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PhotoCategoryDefaultArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the MediaFileCategory model
   */ 
  interface MediaFileCategoryFieldRefs {
    readonly id: FieldRef<"MediaFileCategory", 'Int'>
    readonly mediaFileId: FieldRef<"MediaFileCategory", 'Int'>
    readonly photoCategoryId: FieldRef<"MediaFileCategory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MediaFileCategory findUnique
   */
  export type MediaFileCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MediaFileCategory to fetch.
     */
    where: MediaFileCategoryWhereUniqueInput
  }

  /**
   * MediaFileCategory findUniqueOrThrow
   */
  export type MediaFileCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MediaFileCategory to fetch.
     */
    where: MediaFileCategoryWhereUniqueInput
  }

  /**
   * MediaFileCategory findFirst
   */
  export type MediaFileCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MediaFileCategory to fetch.
     */
    where?: MediaFileCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFileCategories to fetch.
     */
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaFileCategories.
     */
    cursor?: MediaFileCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFileCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFileCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaFileCategories.
     */
    distinct?: MediaFileCategoryScalarFieldEnum | MediaFileCategoryScalarFieldEnum[]
  }

  /**
   * MediaFileCategory findFirstOrThrow
   */
  export type MediaFileCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MediaFileCategory to fetch.
     */
    where?: MediaFileCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFileCategories to fetch.
     */
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaFileCategories.
     */
    cursor?: MediaFileCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFileCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFileCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaFileCategories.
     */
    distinct?: MediaFileCategoryScalarFieldEnum | MediaFileCategoryScalarFieldEnum[]
  }

  /**
   * MediaFileCategory findMany
   */
  export type MediaFileCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MediaFileCategories to fetch.
     */
    where?: MediaFileCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaFileCategories to fetch.
     */
    orderBy?: MediaFileCategoryOrderByWithRelationInput | MediaFileCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaFileCategories.
     */
    cursor?: MediaFileCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaFileCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaFileCategories.
     */
    skip?: number
    distinct?: MediaFileCategoryScalarFieldEnum | MediaFileCategoryScalarFieldEnum[]
  }

  /**
   * MediaFileCategory create
   */
  export type MediaFileCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaFileCategory.
     */
    data: XOR<MediaFileCategoryCreateInput, MediaFileCategoryUncheckedCreateInput>
  }

  /**
   * MediaFileCategory createMany
   */
  export type MediaFileCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaFileCategories.
     */
    data: MediaFileCategoryCreateManyInput | MediaFileCategoryCreateManyInput[]
  }

  /**
   * MediaFileCategory createManyAndReturn
   */
  export type MediaFileCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MediaFileCategories.
     */
    data: MediaFileCategoryCreateManyInput | MediaFileCategoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaFileCategory update
   */
  export type MediaFileCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaFileCategory.
     */
    data: XOR<MediaFileCategoryUpdateInput, MediaFileCategoryUncheckedUpdateInput>
    /**
     * Choose, which MediaFileCategory to update.
     */
    where: MediaFileCategoryWhereUniqueInput
  }

  /**
   * MediaFileCategory updateMany
   */
  export type MediaFileCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaFileCategories.
     */
    data: XOR<MediaFileCategoryUpdateManyMutationInput, MediaFileCategoryUncheckedUpdateManyInput>
    /**
     * Filter which MediaFileCategories to update
     */
    where?: MediaFileCategoryWhereInput
  }

  /**
   * MediaFileCategory upsert
   */
  export type MediaFileCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaFileCategory to update in case it exists.
     */
    where: MediaFileCategoryWhereUniqueInput
    /**
     * In case the MediaFileCategory found by the `where` argument doesn't exist, create a new MediaFileCategory with this data.
     */
    create: XOR<MediaFileCategoryCreateInput, MediaFileCategoryUncheckedCreateInput>
    /**
     * In case the MediaFileCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaFileCategoryUpdateInput, MediaFileCategoryUncheckedUpdateInput>
  }

  /**
   * MediaFileCategory delete
   */
  export type MediaFileCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
    /**
     * Filter which MediaFileCategory to delete.
     */
    where: MediaFileCategoryWhereUniqueInput
  }

  /**
   * MediaFileCategory deleteMany
   */
  export type MediaFileCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaFileCategories to delete
     */
    where?: MediaFileCategoryWhereInput
  }

  /**
   * MediaFileCategory without action
   */
  export type MediaFileCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFileCategory
     */
    select?: MediaFileCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    photoCategoryId: number | null
    previewMediaId: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    photoCategoryId: number | null
    previewMediaId: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name_it: string | null
    name_en: string | null
    description_it: string | null
    description_en: string | null
    isPublic: boolean | null
    sortOrder: number | null
    photoCategoryId: number | null
    previewMediaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name_it: string | null
    name_en: string | null
    description_it: string | null
    description_en: string | null
    isPublic: boolean | null
    sortOrder: number | null
    photoCategoryId: number | null
    previewMediaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    slug: number
    name_it: number
    name_en: number
    description_it: number
    description_en: number
    isPublic: number
    sortOrder: number
    photoCategoryId: number
    previewMediaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
    sortOrder?: true
    photoCategoryId?: true
    previewMediaId?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
    sortOrder?: true
    photoCategoryId?: true
    previewMediaId?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    description_it?: true
    description_en?: true
    isPublic?: true
    sortOrder?: true
    photoCategoryId?: true
    previewMediaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    description_it?: true
    description_en?: true
    isPublic?: true
    sortOrder?: true
    photoCategoryId?: true
    previewMediaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    slug?: true
    name_it?: true
    name_en?: true
    description_it?: true
    description_en?: true
    isPublic?: true
    sortOrder?: true
    photoCategoryId?: true
    previewMediaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: number
    slug: string
    name_it: string
    name_en: string
    description_it: string
    description_en: string
    isPublic: boolean
    sortOrder: number
    photoCategoryId: number | null
    previewMediaId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    description_it?: boolean
    description_en?: boolean
    isPublic?: boolean
    sortOrder?: boolean
    photoCategoryId?: boolean
    previewMediaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    photoCategory?: boolean | Service$photoCategoryArgs<ExtArgs>
    previewMedia?: boolean | Service$previewMediaArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    description_it?: boolean
    description_en?: boolean
    isPublic?: boolean
    sortOrder?: boolean
    photoCategoryId?: boolean
    previewMediaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    photoCategory?: boolean | Service$photoCategoryArgs<ExtArgs>
    previewMedia?: boolean | Service$previewMediaArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    slug?: boolean
    name_it?: boolean
    name_en?: boolean
    description_it?: boolean
    description_en?: boolean
    isPublic?: boolean
    sortOrder?: boolean
    photoCategoryId?: boolean
    previewMediaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photoCategory?: boolean | Service$photoCategoryArgs<ExtArgs>
    previewMedia?: boolean | Service$previewMediaArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photoCategory?: boolean | Service$photoCategoryArgs<ExtArgs>
    previewMedia?: boolean | Service$previewMediaArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      photoCategory: Prisma.$PhotoCategoryPayload<ExtArgs> | null
      previewMedia: Prisma.$MediaFilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name_it: string
      name_en: string
      description_it: string
      description_en: string
      isPublic: boolean
      sortOrder: number
      photoCategoryId: number | null
      previewMediaId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    photoCategory<T extends Service$photoCategoryArgs<ExtArgs> = {}>(args?: Subset<T, Service$photoCategoryArgs<ExtArgs>>): Prisma__PhotoCategoryClient<$Result.GetResult<Prisma.$PhotoCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    previewMedia<T extends Service$previewMediaArgs<ExtArgs> = {}>(args?: Subset<T, Service$previewMediaArgs<ExtArgs>>): Prisma__MediaFileClient<$Result.GetResult<Prisma.$MediaFilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'Int'>
    readonly slug: FieldRef<"Service", 'String'>
    readonly name_it: FieldRef<"Service", 'String'>
    readonly name_en: FieldRef<"Service", 'String'>
    readonly description_it: FieldRef<"Service", 'String'>
    readonly description_en: FieldRef<"Service", 'String'>
    readonly isPublic: FieldRef<"Service", 'Boolean'>
    readonly sortOrder: FieldRef<"Service", 'Int'>
    readonly photoCategoryId: FieldRef<"Service", 'Int'>
    readonly previewMediaId: FieldRef<"Service", 'Int'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }

  /**
   * Service.photoCategory
   */
  export type Service$photoCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCategory
     */
    select?: PhotoCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoCategoryInclude<ExtArgs> | null
    where?: PhotoCategoryWhereInput
  }

  /**
   * Service.previewMedia
   */
  export type Service$previewMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaFile
     */
    select?: MediaFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaFileInclude<ExtArgs> | null
    where?: MediaFileWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model BookingProvider
   */

  export type AggregateBookingProvider = {
    _count: BookingProviderCountAggregateOutputType | null
    _avg: BookingProviderAvgAggregateOutputType | null
    _sum: BookingProviderSumAggregateOutputType | null
    _min: BookingProviderMinAggregateOutputType | null
    _max: BookingProviderMaxAggregateOutputType | null
  }

  export type BookingProviderAvgAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type BookingProviderSumAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type BookingProviderMinAggregateOutputType = {
    id: number | null
    type: string | null
    label: string | null
    config: string | null
    isEnabled: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingProviderMaxAggregateOutputType = {
    id: number | null
    type: string | null
    label: string | null
    config: string | null
    isEnabled: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingProviderCountAggregateOutputType = {
    id: number
    type: number
    label: number
    config: number
    isEnabled: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingProviderAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type BookingProviderSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type BookingProviderMinAggregateInputType = {
    id?: true
    type?: true
    label?: true
    config?: true
    isEnabled?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingProviderMaxAggregateInputType = {
    id?: true
    type?: true
    label?: true
    config?: true
    isEnabled?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingProviderCountAggregateInputType = {
    id?: true
    type?: true
    label?: true
    config?: true
    isEnabled?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingProvider to aggregate.
     */
    where?: BookingProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingProviders to fetch.
     */
    orderBy?: BookingProviderOrderByWithRelationInput | BookingProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingProviders
    **/
    _count?: true | BookingProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingProviderMaxAggregateInputType
  }

  export type GetBookingProviderAggregateType<T extends BookingProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingProvider[P]>
      : GetScalarType<T[P], AggregateBookingProvider[P]>
  }




  export type BookingProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingProviderWhereInput
    orderBy?: BookingProviderOrderByWithAggregationInput | BookingProviderOrderByWithAggregationInput[]
    by: BookingProviderScalarFieldEnum[] | BookingProviderScalarFieldEnum
    having?: BookingProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingProviderCountAggregateInputType | true
    _avg?: BookingProviderAvgAggregateInputType
    _sum?: BookingProviderSumAggregateInputType
    _min?: BookingProviderMinAggregateInputType
    _max?: BookingProviderMaxAggregateInputType
  }

  export type BookingProviderGroupByOutputType = {
    id: number
    type: string
    label: string
    config: string
    isEnabled: boolean
    order: number
    createdAt: Date
    updatedAt: Date
    _count: BookingProviderCountAggregateOutputType | null
    _avg: BookingProviderAvgAggregateOutputType | null
    _sum: BookingProviderSumAggregateOutputType | null
    _min: BookingProviderMinAggregateOutputType | null
    _max: BookingProviderMaxAggregateOutputType | null
  }

  type GetBookingProviderGroupByPayload<T extends BookingProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingProviderGroupByOutputType[P]>
            : GetScalarType<T[P], BookingProviderGroupByOutputType[P]>
        }
      >
    >


  export type BookingProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    label?: boolean
    config?: boolean
    isEnabled?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bookingProvider"]>

  export type BookingProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    label?: boolean
    config?: boolean
    isEnabled?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bookingProvider"]>

  export type BookingProviderSelectScalar = {
    id?: boolean
    type?: boolean
    label?: boolean
    config?: boolean
    isEnabled?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BookingProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookingProvider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      label: string
      config: string
      isEnabled: boolean
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bookingProvider"]>
    composites: {}
  }

  type BookingProviderGetPayload<S extends boolean | null | undefined | BookingProviderDefaultArgs> = $Result.GetResult<Prisma.$BookingProviderPayload, S>

  type BookingProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookingProviderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookingProviderCountAggregateInputType | true
    }

  export interface BookingProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingProvider'], meta: { name: 'BookingProvider' } }
    /**
     * Find zero or one BookingProvider that matches the filter.
     * @param {BookingProviderFindUniqueArgs} args - Arguments to find a BookingProvider
     * @example
     * // Get one BookingProvider
     * const bookingProvider = await prisma.bookingProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingProviderFindUniqueArgs>(args: SelectSubset<T, BookingProviderFindUniqueArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BookingProvider that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookingProviderFindUniqueOrThrowArgs} args - Arguments to find a BookingProvider
     * @example
     * // Get one BookingProvider
     * const bookingProvider = await prisma.bookingProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BookingProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderFindFirstArgs} args - Arguments to find a BookingProvider
     * @example
     * // Get one BookingProvider
     * const bookingProvider = await prisma.bookingProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingProviderFindFirstArgs>(args?: SelectSubset<T, BookingProviderFindFirstArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BookingProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderFindFirstOrThrowArgs} args - Arguments to find a BookingProvider
     * @example
     * // Get one BookingProvider
     * const bookingProvider = await prisma.bookingProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BookingProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingProviders
     * const bookingProviders = await prisma.bookingProvider.findMany()
     * 
     * // Get first 10 BookingProviders
     * const bookingProviders = await prisma.bookingProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingProviderWithIdOnly = await prisma.bookingProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingProviderFindManyArgs>(args?: SelectSubset<T, BookingProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BookingProvider.
     * @param {BookingProviderCreateArgs} args - Arguments to create a BookingProvider.
     * @example
     * // Create one BookingProvider
     * const BookingProvider = await prisma.bookingProvider.create({
     *   data: {
     *     // ... data to create a BookingProvider
     *   }
     * })
     * 
     */
    create<T extends BookingProviderCreateArgs>(args: SelectSubset<T, BookingProviderCreateArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BookingProviders.
     * @param {BookingProviderCreateManyArgs} args - Arguments to create many BookingProviders.
     * @example
     * // Create many BookingProviders
     * const bookingProvider = await prisma.bookingProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingProviderCreateManyArgs>(args?: SelectSubset<T, BookingProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookingProviders and returns the data saved in the database.
     * @param {BookingProviderCreateManyAndReturnArgs} args - Arguments to create many BookingProviders.
     * @example
     * // Create many BookingProviders
     * const bookingProvider = await prisma.bookingProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookingProviders and only return the `id`
     * const bookingProviderWithIdOnly = await prisma.bookingProvider.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BookingProvider.
     * @param {BookingProviderDeleteArgs} args - Arguments to delete one BookingProvider.
     * @example
     * // Delete one BookingProvider
     * const BookingProvider = await prisma.bookingProvider.delete({
     *   where: {
     *     // ... filter to delete one BookingProvider
     *   }
     * })
     * 
     */
    delete<T extends BookingProviderDeleteArgs>(args: SelectSubset<T, BookingProviderDeleteArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BookingProvider.
     * @param {BookingProviderUpdateArgs} args - Arguments to update one BookingProvider.
     * @example
     * // Update one BookingProvider
     * const bookingProvider = await prisma.bookingProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingProviderUpdateArgs>(args: SelectSubset<T, BookingProviderUpdateArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BookingProviders.
     * @param {BookingProviderDeleteManyArgs} args - Arguments to filter BookingProviders to delete.
     * @example
     * // Delete a few BookingProviders
     * const { count } = await prisma.bookingProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingProviderDeleteManyArgs>(args?: SelectSubset<T, BookingProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingProviders
     * const bookingProvider = await prisma.bookingProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingProviderUpdateManyArgs>(args: SelectSubset<T, BookingProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BookingProvider.
     * @param {BookingProviderUpsertArgs} args - Arguments to update or create a BookingProvider.
     * @example
     * // Update or create a BookingProvider
     * const bookingProvider = await prisma.bookingProvider.upsert({
     *   create: {
     *     // ... data to create a BookingProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingProvider we want to update
     *   }
     * })
     */
    upsert<T extends BookingProviderUpsertArgs>(args: SelectSubset<T, BookingProviderUpsertArgs<ExtArgs>>): Prisma__BookingProviderClient<$Result.GetResult<Prisma.$BookingProviderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BookingProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderCountArgs} args - Arguments to filter BookingProviders to count.
     * @example
     * // Count the number of BookingProviders
     * const count = await prisma.bookingProvider.count({
     *   where: {
     *     // ... the filter for the BookingProviders we want to count
     *   }
     * })
    **/
    count<T extends BookingProviderCountArgs>(
      args?: Subset<T, BookingProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingProviderAggregateArgs>(args: Subset<T, BookingProviderAggregateArgs>): Prisma.PrismaPromise<GetBookingProviderAggregateType<T>>

    /**
     * Group by BookingProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingProviderGroupByArgs} args - Group by arguments.
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
      T extends BookingProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingProviderGroupByArgs['orderBy'] }
        : { orderBy?: BookingProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BookingProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookingProvider model
   */
  readonly fields: BookingProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the BookingProvider model
   */ 
  interface BookingProviderFieldRefs {
    readonly id: FieldRef<"BookingProvider", 'Int'>
    readonly type: FieldRef<"BookingProvider", 'String'>
    readonly label: FieldRef<"BookingProvider", 'String'>
    readonly config: FieldRef<"BookingProvider", 'String'>
    readonly isEnabled: FieldRef<"BookingProvider", 'Boolean'>
    readonly order: FieldRef<"BookingProvider", 'Int'>
    readonly createdAt: FieldRef<"BookingProvider", 'DateTime'>
    readonly updatedAt: FieldRef<"BookingProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookingProvider findUnique
   */
  export type BookingProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter, which BookingProvider to fetch.
     */
    where: BookingProviderWhereUniqueInput
  }

  /**
   * BookingProvider findUniqueOrThrow
   */
  export type BookingProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter, which BookingProvider to fetch.
     */
    where: BookingProviderWhereUniqueInput
  }

  /**
   * BookingProvider findFirst
   */
  export type BookingProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter, which BookingProvider to fetch.
     */
    where?: BookingProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingProviders to fetch.
     */
    orderBy?: BookingProviderOrderByWithRelationInput | BookingProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingProviders.
     */
    cursor?: BookingProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingProviders.
     */
    distinct?: BookingProviderScalarFieldEnum | BookingProviderScalarFieldEnum[]
  }

  /**
   * BookingProvider findFirstOrThrow
   */
  export type BookingProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter, which BookingProvider to fetch.
     */
    where?: BookingProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingProviders to fetch.
     */
    orderBy?: BookingProviderOrderByWithRelationInput | BookingProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingProviders.
     */
    cursor?: BookingProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingProviders.
     */
    distinct?: BookingProviderScalarFieldEnum | BookingProviderScalarFieldEnum[]
  }

  /**
   * BookingProvider findMany
   */
  export type BookingProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter, which BookingProviders to fetch.
     */
    where?: BookingProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingProviders to fetch.
     */
    orderBy?: BookingProviderOrderByWithRelationInput | BookingProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingProviders.
     */
    cursor?: BookingProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingProviders.
     */
    skip?: number
    distinct?: BookingProviderScalarFieldEnum | BookingProviderScalarFieldEnum[]
  }

  /**
   * BookingProvider create
   */
  export type BookingProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * The data needed to create a BookingProvider.
     */
    data: XOR<BookingProviderCreateInput, BookingProviderUncheckedCreateInput>
  }

  /**
   * BookingProvider createMany
   */
  export type BookingProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingProviders.
     */
    data: BookingProviderCreateManyInput | BookingProviderCreateManyInput[]
  }

  /**
   * BookingProvider createManyAndReturn
   */
  export type BookingProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BookingProviders.
     */
    data: BookingProviderCreateManyInput | BookingProviderCreateManyInput[]
  }

  /**
   * BookingProvider update
   */
  export type BookingProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * The data needed to update a BookingProvider.
     */
    data: XOR<BookingProviderUpdateInput, BookingProviderUncheckedUpdateInput>
    /**
     * Choose, which BookingProvider to update.
     */
    where: BookingProviderWhereUniqueInput
  }

  /**
   * BookingProvider updateMany
   */
  export type BookingProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingProviders.
     */
    data: XOR<BookingProviderUpdateManyMutationInput, BookingProviderUncheckedUpdateManyInput>
    /**
     * Filter which BookingProviders to update
     */
    where?: BookingProviderWhereInput
  }

  /**
   * BookingProvider upsert
   */
  export type BookingProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * The filter to search for the BookingProvider to update in case it exists.
     */
    where: BookingProviderWhereUniqueInput
    /**
     * In case the BookingProvider found by the `where` argument doesn't exist, create a new BookingProvider with this data.
     */
    create: XOR<BookingProviderCreateInput, BookingProviderUncheckedCreateInput>
    /**
     * In case the BookingProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingProviderUpdateInput, BookingProviderUncheckedUpdateInput>
  }

  /**
   * BookingProvider delete
   */
  export type BookingProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
    /**
     * Filter which BookingProvider to delete.
     */
    where: BookingProviderWhereUniqueInput
  }

  /**
   * BookingProvider deleteMany
   */
  export type BookingProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingProviders to delete
     */
    where?: BookingProviderWhereInput
  }

  /**
   * BookingProvider without action
   */
  export type BookingProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingProvider
     */
    select?: BookingProviderSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SiteSettingsScalarFieldEnum: {
    id: 'id',
    hotelName: 'hotelName',
    logoKey: 'logoKey',
    heroImageKey: 'heroImageKey',
    legalName: 'legalName',
    registeredAddress: 'registeredAddress',
    city: 'city',
    region: 'region',
    postalCode: 'postalCode',
    country: 'country',
    vatNumber: 'vatNumber',
    taxCode: 'taxCode',
    phone: 'phone',
    email: 'email',
    mapLat: 'mapLat',
    mapLng: 'mapLng',
    mapZoom: 'mapZoom',
    defaultLocale: 'defaultLocale',
    octorateKey: 'octorateKey'
  };

  export type SiteSettingsScalarFieldEnum = (typeof SiteSettingsScalarFieldEnum)[keyof typeof SiteSettingsScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    isVisible: 'isVisible',
    updatedAt: 'updatedAt'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const ContentScalarFieldEnum: {
    id: 'id',
    pageSlug: 'pageSlug',
    title_it: 'title_it',
    title_en: 'title_en',
    subtitle_it: 'subtitle_it',
    subtitle_en: 'subtitle_en',
    body_it: 'body_it',
    body_en: 'body_en',
    sections_it: 'sections_it',
    sections_en: 'sections_en',
    updatedAt: 'updatedAt'
  };

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const PointOfInterestScalarFieldEnum: {
    id: 'id',
    name_it: 'name_it',
    name_en: 'name_en',
    lat: 'lat',
    lng: 'lng',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type PointOfInterestScalarFieldEnum = (typeof PointOfInterestScalarFieldEnum)[keyof typeof PointOfInterestScalarFieldEnum]


  export const MediaFileScalarFieldEnum: {
    id: 'id',
    key: 'key',
    thumbnailKey: 'thumbnailKey',
    filename: 'filename',
    mimeType: 'mimeType',
    size: 'size',
    isPublic: 'isPublic',
    uploadedAt: 'uploadedAt'
  };

  export type MediaFileScalarFieldEnum = (typeof MediaFileScalarFieldEnum)[keyof typeof MediaFileScalarFieldEnum]


  export const PhotoCategoryScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name_it: 'name_it',
    name_en: 'name_en',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PhotoCategoryScalarFieldEnum = (typeof PhotoCategoryScalarFieldEnum)[keyof typeof PhotoCategoryScalarFieldEnum]


  export const MediaFileCategoryScalarFieldEnum: {
    id: 'id',
    mediaFileId: 'mediaFileId',
    photoCategoryId: 'photoCategoryId'
  };

  export type MediaFileCategoryScalarFieldEnum = (typeof MediaFileCategoryScalarFieldEnum)[keyof typeof MediaFileCategoryScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name_it: 'name_it',
    name_en: 'name_en',
    description_it: 'description_it',
    description_en: 'description_en',
    isPublic: 'isPublic',
    sortOrder: 'sortOrder',
    photoCategoryId: 'photoCategoryId',
    previewMediaId: 'previewMediaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const BookingProviderScalarFieldEnum: {
    id: 'id',
    type: 'type',
    label: 'label',
    config: 'config',
    isEnabled: 'isEnabled',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingProviderScalarFieldEnum = (typeof BookingProviderScalarFieldEnum)[keyof typeof BookingProviderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SiteSettingsWhereInput = {
    AND?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    OR?: SiteSettingsWhereInput[]
    NOT?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    id?: IntFilter<"SiteSettings"> | number
    hotelName?: StringFilter<"SiteSettings"> | string
    logoKey?: StringFilter<"SiteSettings"> | string
    heroImageKey?: StringFilter<"SiteSettings"> | string
    legalName?: StringFilter<"SiteSettings"> | string
    registeredAddress?: StringFilter<"SiteSettings"> | string
    city?: StringFilter<"SiteSettings"> | string
    region?: StringFilter<"SiteSettings"> | string
    postalCode?: StringFilter<"SiteSettings"> | string
    country?: StringFilter<"SiteSettings"> | string
    vatNumber?: StringFilter<"SiteSettings"> | string
    taxCode?: StringFilter<"SiteSettings"> | string
    phone?: StringFilter<"SiteSettings"> | string
    email?: StringFilter<"SiteSettings"> | string
    mapLat?: FloatFilter<"SiteSettings"> | number
    mapLng?: FloatFilter<"SiteSettings"> | number
    mapZoom?: IntFilter<"SiteSettings"> | number
    defaultLocale?: StringFilter<"SiteSettings"> | string
    octorateKey?: StringFilter<"SiteSettings"> | string
  }

  export type SiteSettingsOrderByWithRelationInput = {
    id?: SortOrder
    hotelName?: SortOrder
    logoKey?: SortOrder
    heroImageKey?: SortOrder
    legalName?: SortOrder
    registeredAddress?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    vatNumber?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
    defaultLocale?: SortOrder
    octorateKey?: SortOrder
  }

  export type SiteSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    OR?: SiteSettingsWhereInput[]
    NOT?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    hotelName?: StringFilter<"SiteSettings"> | string
    logoKey?: StringFilter<"SiteSettings"> | string
    heroImageKey?: StringFilter<"SiteSettings"> | string
    legalName?: StringFilter<"SiteSettings"> | string
    registeredAddress?: StringFilter<"SiteSettings"> | string
    city?: StringFilter<"SiteSettings"> | string
    region?: StringFilter<"SiteSettings"> | string
    postalCode?: StringFilter<"SiteSettings"> | string
    country?: StringFilter<"SiteSettings"> | string
    vatNumber?: StringFilter<"SiteSettings"> | string
    taxCode?: StringFilter<"SiteSettings"> | string
    phone?: StringFilter<"SiteSettings"> | string
    email?: StringFilter<"SiteSettings"> | string
    mapLat?: FloatFilter<"SiteSettings"> | number
    mapLng?: FloatFilter<"SiteSettings"> | number
    mapZoom?: IntFilter<"SiteSettings"> | number
    defaultLocale?: StringFilter<"SiteSettings"> | string
    octorateKey?: StringFilter<"SiteSettings"> | string
  }, "id">

  export type SiteSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    hotelName?: SortOrder
    logoKey?: SortOrder
    heroImageKey?: SortOrder
    legalName?: SortOrder
    registeredAddress?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    vatNumber?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
    defaultLocale?: SortOrder
    octorateKey?: SortOrder
    _count?: SiteSettingsCountOrderByAggregateInput
    _avg?: SiteSettingsAvgOrderByAggregateInput
    _max?: SiteSettingsMaxOrderByAggregateInput
    _min?: SiteSettingsMinOrderByAggregateInput
    _sum?: SiteSettingsSumOrderByAggregateInput
  }

  export type SiteSettingsScalarWhereWithAggregatesInput = {
    AND?: SiteSettingsScalarWhereWithAggregatesInput | SiteSettingsScalarWhereWithAggregatesInput[]
    OR?: SiteSettingsScalarWhereWithAggregatesInput[]
    NOT?: SiteSettingsScalarWhereWithAggregatesInput | SiteSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SiteSettings"> | number
    hotelName?: StringWithAggregatesFilter<"SiteSettings"> | string
    logoKey?: StringWithAggregatesFilter<"SiteSettings"> | string
    heroImageKey?: StringWithAggregatesFilter<"SiteSettings"> | string
    legalName?: StringWithAggregatesFilter<"SiteSettings"> | string
    registeredAddress?: StringWithAggregatesFilter<"SiteSettings"> | string
    city?: StringWithAggregatesFilter<"SiteSettings"> | string
    region?: StringWithAggregatesFilter<"SiteSettings"> | string
    postalCode?: StringWithAggregatesFilter<"SiteSettings"> | string
    country?: StringWithAggregatesFilter<"SiteSettings"> | string
    vatNumber?: StringWithAggregatesFilter<"SiteSettings"> | string
    taxCode?: StringWithAggregatesFilter<"SiteSettings"> | string
    phone?: StringWithAggregatesFilter<"SiteSettings"> | string
    email?: StringWithAggregatesFilter<"SiteSettings"> | string
    mapLat?: FloatWithAggregatesFilter<"SiteSettings"> | number
    mapLng?: FloatWithAggregatesFilter<"SiteSettings"> | number
    mapZoom?: IntWithAggregatesFilter<"SiteSettings"> | number
    defaultLocale?: StringWithAggregatesFilter<"SiteSettings"> | string
    octorateKey?: StringWithAggregatesFilter<"SiteSettings"> | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: IntFilter<"Page"> | number
    slug?: StringFilter<"Page"> | string
    isVisible?: BoolFilter<"Page"> | boolean
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    content?: XOR<ContentNullableRelationFilter, ContentWhereInput> | null
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    isVisible?: SortOrder
    updatedAt?: SortOrder
    content?: ContentOrderByWithRelationInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    isVisible?: BoolFilter<"Page"> | boolean
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    content?: XOR<ContentNullableRelationFilter, ContentWhereInput> | null
  }, "id" | "slug">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    isVisible?: SortOrder
    updatedAt?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _avg?: PageAvgOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
    _sum?: PageSumOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Page"> | number
    slug?: StringWithAggregatesFilter<"Page"> | string
    isVisible?: BoolWithAggregatesFilter<"Page"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
  }

  export type ContentWhereInput = {
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    id?: IntFilter<"Content"> | number
    pageSlug?: StringFilter<"Content"> | string
    title_it?: StringFilter<"Content"> | string
    title_en?: StringFilter<"Content"> | string
    subtitle_it?: StringFilter<"Content"> | string
    subtitle_en?: StringFilter<"Content"> | string
    body_it?: StringFilter<"Content"> | string
    body_en?: StringFilter<"Content"> | string
    sections_it?: StringFilter<"Content"> | string
    sections_en?: StringFilter<"Content"> | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    page?: XOR<PageRelationFilter, PageWhereInput>
  }

  export type ContentOrderByWithRelationInput = {
    id?: SortOrder
    pageSlug?: SortOrder
    title_it?: SortOrder
    title_en?: SortOrder
    subtitle_it?: SortOrder
    subtitle_en?: SortOrder
    body_it?: SortOrder
    body_en?: SortOrder
    sections_it?: SortOrder
    sections_en?: SortOrder
    updatedAt?: SortOrder
    page?: PageOrderByWithRelationInput
  }

  export type ContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pageSlug?: string
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    title_it?: StringFilter<"Content"> | string
    title_en?: StringFilter<"Content"> | string
    subtitle_it?: StringFilter<"Content"> | string
    subtitle_en?: StringFilter<"Content"> | string
    body_it?: StringFilter<"Content"> | string
    body_en?: StringFilter<"Content"> | string
    sections_it?: StringFilter<"Content"> | string
    sections_en?: StringFilter<"Content"> | string
    updatedAt?: DateTimeFilter<"Content"> | Date | string
    page?: XOR<PageRelationFilter, PageWhereInput>
  }, "id" | "pageSlug">

  export type ContentOrderByWithAggregationInput = {
    id?: SortOrder
    pageSlug?: SortOrder
    title_it?: SortOrder
    title_en?: SortOrder
    subtitle_it?: SortOrder
    subtitle_en?: SortOrder
    body_it?: SortOrder
    body_en?: SortOrder
    sections_it?: SortOrder
    sections_en?: SortOrder
    updatedAt?: SortOrder
    _count?: ContentCountOrderByAggregateInput
    _avg?: ContentAvgOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
    _sum?: ContentSumOrderByAggregateInput
  }

  export type ContentScalarWhereWithAggregatesInput = {
    AND?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    OR?: ContentScalarWhereWithAggregatesInput[]
    NOT?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Content"> | number
    pageSlug?: StringWithAggregatesFilter<"Content"> | string
    title_it?: StringWithAggregatesFilter<"Content"> | string
    title_en?: StringWithAggregatesFilter<"Content"> | string
    subtitle_it?: StringWithAggregatesFilter<"Content"> | string
    subtitle_en?: StringWithAggregatesFilter<"Content"> | string
    body_it?: StringWithAggregatesFilter<"Content"> | string
    body_en?: StringWithAggregatesFilter<"Content"> | string
    sections_it?: StringWithAggregatesFilter<"Content"> | string
    sections_en?: StringWithAggregatesFilter<"Content"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Content"> | Date | string
  }

  export type PointOfInterestWhereInput = {
    AND?: PointOfInterestWhereInput | PointOfInterestWhereInput[]
    OR?: PointOfInterestWhereInput[]
    NOT?: PointOfInterestWhereInput | PointOfInterestWhereInput[]
    id?: IntFilter<"PointOfInterest"> | number
    name_it?: StringFilter<"PointOfInterest"> | string
    name_en?: StringFilter<"PointOfInterest"> | string
    lat?: FloatFilter<"PointOfInterest"> | number
    lng?: FloatFilter<"PointOfInterest"> | number
    category?: StringFilter<"PointOfInterest"> | string
    createdAt?: DateTimeFilter<"PointOfInterest"> | Date | string
  }

  export type PointOfInterestOrderByWithRelationInput = {
    id?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PointOfInterestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PointOfInterestWhereInput | PointOfInterestWhereInput[]
    OR?: PointOfInterestWhereInput[]
    NOT?: PointOfInterestWhereInput | PointOfInterestWhereInput[]
    name_it?: StringFilter<"PointOfInterest"> | string
    name_en?: StringFilter<"PointOfInterest"> | string
    lat?: FloatFilter<"PointOfInterest"> | number
    lng?: FloatFilter<"PointOfInterest"> | number
    category?: StringFilter<"PointOfInterest"> | string
    createdAt?: DateTimeFilter<"PointOfInterest"> | Date | string
  }, "id">

  export type PointOfInterestOrderByWithAggregationInput = {
    id?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    _count?: PointOfInterestCountOrderByAggregateInput
    _avg?: PointOfInterestAvgOrderByAggregateInput
    _max?: PointOfInterestMaxOrderByAggregateInput
    _min?: PointOfInterestMinOrderByAggregateInput
    _sum?: PointOfInterestSumOrderByAggregateInput
  }

  export type PointOfInterestScalarWhereWithAggregatesInput = {
    AND?: PointOfInterestScalarWhereWithAggregatesInput | PointOfInterestScalarWhereWithAggregatesInput[]
    OR?: PointOfInterestScalarWhereWithAggregatesInput[]
    NOT?: PointOfInterestScalarWhereWithAggregatesInput | PointOfInterestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PointOfInterest"> | number
    name_it?: StringWithAggregatesFilter<"PointOfInterest"> | string
    name_en?: StringWithAggregatesFilter<"PointOfInterest"> | string
    lat?: FloatWithAggregatesFilter<"PointOfInterest"> | number
    lng?: FloatWithAggregatesFilter<"PointOfInterest"> | number
    category?: StringWithAggregatesFilter<"PointOfInterest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PointOfInterest"> | Date | string
  }

  export type MediaFileWhereInput = {
    AND?: MediaFileWhereInput | MediaFileWhereInput[]
    OR?: MediaFileWhereInput[]
    NOT?: MediaFileWhereInput | MediaFileWhereInput[]
    id?: IntFilter<"MediaFile"> | number
    key?: StringFilter<"MediaFile"> | string
    thumbnailKey?: StringNullableFilter<"MediaFile"> | string | null
    filename?: StringFilter<"MediaFile"> | string
    mimeType?: StringFilter<"MediaFile"> | string
    size?: IntFilter<"MediaFile"> | number
    isPublic?: BoolFilter<"MediaFile"> | boolean
    uploadedAt?: DateTimeFilter<"MediaFile"> | Date | string
    categories?: MediaFileCategoryListRelationFilter
    servicesUsingAsPreview?: ServiceListRelationFilter
  }

  export type MediaFileOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    thumbnailKey?: SortOrderInput | SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    isPublic?: SortOrder
    uploadedAt?: SortOrder
    categories?: MediaFileCategoryOrderByRelationAggregateInput
    servicesUsingAsPreview?: ServiceOrderByRelationAggregateInput
  }

  export type MediaFileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: MediaFileWhereInput | MediaFileWhereInput[]
    OR?: MediaFileWhereInput[]
    NOT?: MediaFileWhereInput | MediaFileWhereInput[]
    thumbnailKey?: StringNullableFilter<"MediaFile"> | string | null
    filename?: StringFilter<"MediaFile"> | string
    mimeType?: StringFilter<"MediaFile"> | string
    size?: IntFilter<"MediaFile"> | number
    isPublic?: BoolFilter<"MediaFile"> | boolean
    uploadedAt?: DateTimeFilter<"MediaFile"> | Date | string
    categories?: MediaFileCategoryListRelationFilter
    servicesUsingAsPreview?: ServiceListRelationFilter
  }, "id" | "key">

  export type MediaFileOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    thumbnailKey?: SortOrderInput | SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    isPublic?: SortOrder
    uploadedAt?: SortOrder
    _count?: MediaFileCountOrderByAggregateInput
    _avg?: MediaFileAvgOrderByAggregateInput
    _max?: MediaFileMaxOrderByAggregateInput
    _min?: MediaFileMinOrderByAggregateInput
    _sum?: MediaFileSumOrderByAggregateInput
  }

  export type MediaFileScalarWhereWithAggregatesInput = {
    AND?: MediaFileScalarWhereWithAggregatesInput | MediaFileScalarWhereWithAggregatesInput[]
    OR?: MediaFileScalarWhereWithAggregatesInput[]
    NOT?: MediaFileScalarWhereWithAggregatesInput | MediaFileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MediaFile"> | number
    key?: StringWithAggregatesFilter<"MediaFile"> | string
    thumbnailKey?: StringNullableWithAggregatesFilter<"MediaFile"> | string | null
    filename?: StringWithAggregatesFilter<"MediaFile"> | string
    mimeType?: StringWithAggregatesFilter<"MediaFile"> | string
    size?: IntWithAggregatesFilter<"MediaFile"> | number
    isPublic?: BoolWithAggregatesFilter<"MediaFile"> | boolean
    uploadedAt?: DateTimeWithAggregatesFilter<"MediaFile"> | Date | string
  }

  export type PhotoCategoryWhereInput = {
    AND?: PhotoCategoryWhereInput | PhotoCategoryWhereInput[]
    OR?: PhotoCategoryWhereInput[]
    NOT?: PhotoCategoryWhereInput | PhotoCategoryWhereInput[]
    id?: IntFilter<"PhotoCategory"> | number
    slug?: StringFilter<"PhotoCategory"> | string
    name_it?: StringFilter<"PhotoCategory"> | string
    name_en?: StringFilter<"PhotoCategory"> | string
    sortOrder?: IntFilter<"PhotoCategory"> | number
    createdAt?: DateTimeFilter<"PhotoCategory"> | Date | string
    updatedAt?: DateTimeFilter<"PhotoCategory"> | Date | string
    media?: MediaFileCategoryListRelationFilter
    services?: ServiceListRelationFilter
  }

  export type PhotoCategoryOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    media?: MediaFileCategoryOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
  }

  export type PhotoCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PhotoCategoryWhereInput | PhotoCategoryWhereInput[]
    OR?: PhotoCategoryWhereInput[]
    NOT?: PhotoCategoryWhereInput | PhotoCategoryWhereInput[]
    name_it?: StringFilter<"PhotoCategory"> | string
    name_en?: StringFilter<"PhotoCategory"> | string
    sortOrder?: IntFilter<"PhotoCategory"> | number
    createdAt?: DateTimeFilter<"PhotoCategory"> | Date | string
    updatedAt?: DateTimeFilter<"PhotoCategory"> | Date | string
    media?: MediaFileCategoryListRelationFilter
    services?: ServiceListRelationFilter
  }, "id" | "slug">

  export type PhotoCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PhotoCategoryCountOrderByAggregateInput
    _avg?: PhotoCategoryAvgOrderByAggregateInput
    _max?: PhotoCategoryMaxOrderByAggregateInput
    _min?: PhotoCategoryMinOrderByAggregateInput
    _sum?: PhotoCategorySumOrderByAggregateInput
  }

  export type PhotoCategoryScalarWhereWithAggregatesInput = {
    AND?: PhotoCategoryScalarWhereWithAggregatesInput | PhotoCategoryScalarWhereWithAggregatesInput[]
    OR?: PhotoCategoryScalarWhereWithAggregatesInput[]
    NOT?: PhotoCategoryScalarWhereWithAggregatesInput | PhotoCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PhotoCategory"> | number
    slug?: StringWithAggregatesFilter<"PhotoCategory"> | string
    name_it?: StringWithAggregatesFilter<"PhotoCategory"> | string
    name_en?: StringWithAggregatesFilter<"PhotoCategory"> | string
    sortOrder?: IntWithAggregatesFilter<"PhotoCategory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PhotoCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PhotoCategory"> | Date | string
  }

  export type MediaFileCategoryWhereInput = {
    AND?: MediaFileCategoryWhereInput | MediaFileCategoryWhereInput[]
    OR?: MediaFileCategoryWhereInput[]
    NOT?: MediaFileCategoryWhereInput | MediaFileCategoryWhereInput[]
    id?: IntFilter<"MediaFileCategory"> | number
    mediaFileId?: IntFilter<"MediaFileCategory"> | number
    photoCategoryId?: IntFilter<"MediaFileCategory"> | number
    mediaFile?: XOR<MediaFileRelationFilter, MediaFileWhereInput>
    photoCategory?: XOR<PhotoCategoryRelationFilter, PhotoCategoryWhereInput>
  }

  export type MediaFileCategoryOrderByWithRelationInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
    mediaFile?: MediaFileOrderByWithRelationInput
    photoCategory?: PhotoCategoryOrderByWithRelationInput
  }

  export type MediaFileCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    mediaFileId_photoCategoryId?: MediaFileCategoryMediaFileIdPhotoCategoryIdCompoundUniqueInput
    AND?: MediaFileCategoryWhereInput | MediaFileCategoryWhereInput[]
    OR?: MediaFileCategoryWhereInput[]
    NOT?: MediaFileCategoryWhereInput | MediaFileCategoryWhereInput[]
    mediaFileId?: IntFilter<"MediaFileCategory"> | number
    photoCategoryId?: IntFilter<"MediaFileCategory"> | number
    mediaFile?: XOR<MediaFileRelationFilter, MediaFileWhereInput>
    photoCategory?: XOR<PhotoCategoryRelationFilter, PhotoCategoryWhereInput>
  }, "id" | "mediaFileId_photoCategoryId">

  export type MediaFileCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
    _count?: MediaFileCategoryCountOrderByAggregateInput
    _avg?: MediaFileCategoryAvgOrderByAggregateInput
    _max?: MediaFileCategoryMaxOrderByAggregateInput
    _min?: MediaFileCategoryMinOrderByAggregateInput
    _sum?: MediaFileCategorySumOrderByAggregateInput
  }

  export type MediaFileCategoryScalarWhereWithAggregatesInput = {
    AND?: MediaFileCategoryScalarWhereWithAggregatesInput | MediaFileCategoryScalarWhereWithAggregatesInput[]
    OR?: MediaFileCategoryScalarWhereWithAggregatesInput[]
    NOT?: MediaFileCategoryScalarWhereWithAggregatesInput | MediaFileCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MediaFileCategory"> | number
    mediaFileId?: IntWithAggregatesFilter<"MediaFileCategory"> | number
    photoCategoryId?: IntWithAggregatesFilter<"MediaFileCategory"> | number
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: IntFilter<"Service"> | number
    slug?: StringFilter<"Service"> | string
    name_it?: StringFilter<"Service"> | string
    name_en?: StringFilter<"Service"> | string
    description_it?: StringFilter<"Service"> | string
    description_en?: StringFilter<"Service"> | string
    isPublic?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
    photoCategoryId?: IntNullableFilter<"Service"> | number | null
    previewMediaId?: IntNullableFilter<"Service"> | number | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    photoCategory?: XOR<PhotoCategoryNullableRelationFilter, PhotoCategoryWhereInput> | null
    previewMedia?: XOR<MediaFileNullableRelationFilter, MediaFileWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    description_it?: SortOrder
    description_en?: SortOrder
    isPublic?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrderInput | SortOrder
    previewMediaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    photoCategory?: PhotoCategoryOrderByWithRelationInput
    previewMedia?: MediaFileOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name_it?: StringFilter<"Service"> | string
    name_en?: StringFilter<"Service"> | string
    description_it?: StringFilter<"Service"> | string
    description_en?: StringFilter<"Service"> | string
    isPublic?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
    photoCategoryId?: IntNullableFilter<"Service"> | number | null
    previewMediaId?: IntNullableFilter<"Service"> | number | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    photoCategory?: XOR<PhotoCategoryNullableRelationFilter, PhotoCategoryWhereInput> | null
    previewMedia?: XOR<MediaFileNullableRelationFilter, MediaFileWhereInput> | null
  }, "id" | "slug">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    description_it?: SortOrder
    description_en?: SortOrder
    isPublic?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrderInput | SortOrder
    previewMediaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Service"> | number
    slug?: StringWithAggregatesFilter<"Service"> | string
    name_it?: StringWithAggregatesFilter<"Service"> | string
    name_en?: StringWithAggregatesFilter<"Service"> | string
    description_it?: StringWithAggregatesFilter<"Service"> | string
    description_en?: StringWithAggregatesFilter<"Service"> | string
    isPublic?: BoolWithAggregatesFilter<"Service"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Service"> | number
    photoCategoryId?: IntNullableWithAggregatesFilter<"Service"> | number | null
    previewMediaId?: IntNullableWithAggregatesFilter<"Service"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type BookingProviderWhereInput = {
    AND?: BookingProviderWhereInput | BookingProviderWhereInput[]
    OR?: BookingProviderWhereInput[]
    NOT?: BookingProviderWhereInput | BookingProviderWhereInput[]
    id?: IntFilter<"BookingProvider"> | number
    type?: StringFilter<"BookingProvider"> | string
    label?: StringFilter<"BookingProvider"> | string
    config?: StringFilter<"BookingProvider"> | string
    isEnabled?: BoolFilter<"BookingProvider"> | boolean
    order?: IntFilter<"BookingProvider"> | number
    createdAt?: DateTimeFilter<"BookingProvider"> | Date | string
    updatedAt?: DateTimeFilter<"BookingProvider"> | Date | string
  }

  export type BookingProviderOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    label?: SortOrder
    config?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookingProviderWhereInput | BookingProviderWhereInput[]
    OR?: BookingProviderWhereInput[]
    NOT?: BookingProviderWhereInput | BookingProviderWhereInput[]
    type?: StringFilter<"BookingProvider"> | string
    label?: StringFilter<"BookingProvider"> | string
    config?: StringFilter<"BookingProvider"> | string
    isEnabled?: BoolFilter<"BookingProvider"> | boolean
    order?: IntFilter<"BookingProvider"> | number
    createdAt?: DateTimeFilter<"BookingProvider"> | Date | string
    updatedAt?: DateTimeFilter<"BookingProvider"> | Date | string
  }, "id">

  export type BookingProviderOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    label?: SortOrder
    config?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingProviderCountOrderByAggregateInput
    _avg?: BookingProviderAvgOrderByAggregateInput
    _max?: BookingProviderMaxOrderByAggregateInput
    _min?: BookingProviderMinOrderByAggregateInput
    _sum?: BookingProviderSumOrderByAggregateInput
  }

  export type BookingProviderScalarWhereWithAggregatesInput = {
    AND?: BookingProviderScalarWhereWithAggregatesInput | BookingProviderScalarWhereWithAggregatesInput[]
    OR?: BookingProviderScalarWhereWithAggregatesInput[]
    NOT?: BookingProviderScalarWhereWithAggregatesInput | BookingProviderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookingProvider"> | number
    type?: StringWithAggregatesFilter<"BookingProvider"> | string
    label?: StringWithAggregatesFilter<"BookingProvider"> | string
    config?: StringWithAggregatesFilter<"BookingProvider"> | string
    isEnabled?: BoolWithAggregatesFilter<"BookingProvider"> | boolean
    order?: IntWithAggregatesFilter<"BookingProvider"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BookingProvider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BookingProvider"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingsCreateInput = {
    id: number
    hotelName?: string
    logoKey?: string
    heroImageKey?: string
    legalName?: string
    registeredAddress?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    vatNumber?: string
    taxCode?: string
    phone?: string
    email?: string
    mapLat?: number
    mapLng?: number
    mapZoom?: number
    defaultLocale?: string
    octorateKey?: string
  }

  export type SiteSettingsUncheckedCreateInput = {
    id: number
    hotelName?: string
    logoKey?: string
    heroImageKey?: string
    legalName?: string
    registeredAddress?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    vatNumber?: string
    taxCode?: string
    phone?: string
    email?: string
    mapLat?: number
    mapLng?: number
    mapZoom?: number
    defaultLocale?: string
    octorateKey?: string
  }

  export type SiteSettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: StringFieldUpdateOperationsInput | string
    logoKey?: StringFieldUpdateOperationsInput | string
    heroImageKey?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    registeredAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    taxCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mapLat?: FloatFieldUpdateOperationsInput | number
    mapLng?: FloatFieldUpdateOperationsInput | number
    mapZoom?: IntFieldUpdateOperationsInput | number
    defaultLocale?: StringFieldUpdateOperationsInput | string
    octorateKey?: StringFieldUpdateOperationsInput | string
  }

  export type SiteSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: StringFieldUpdateOperationsInput | string
    logoKey?: StringFieldUpdateOperationsInput | string
    heroImageKey?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    registeredAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    taxCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mapLat?: FloatFieldUpdateOperationsInput | number
    mapLng?: FloatFieldUpdateOperationsInput | number
    mapZoom?: IntFieldUpdateOperationsInput | number
    defaultLocale?: StringFieldUpdateOperationsInput | string
    octorateKey?: StringFieldUpdateOperationsInput | string
  }

  export type SiteSettingsCreateManyInput = {
    id: number
    hotelName?: string
    logoKey?: string
    heroImageKey?: string
    legalName?: string
    registeredAddress?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    vatNumber?: string
    taxCode?: string
    phone?: string
    email?: string
    mapLat?: number
    mapLng?: number
    mapZoom?: number
    defaultLocale?: string
    octorateKey?: string
  }

  export type SiteSettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: StringFieldUpdateOperationsInput | string
    logoKey?: StringFieldUpdateOperationsInput | string
    heroImageKey?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    registeredAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    taxCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mapLat?: FloatFieldUpdateOperationsInput | number
    mapLng?: FloatFieldUpdateOperationsInput | number
    mapZoom?: IntFieldUpdateOperationsInput | number
    defaultLocale?: StringFieldUpdateOperationsInput | string
    octorateKey?: StringFieldUpdateOperationsInput | string
  }

  export type SiteSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: StringFieldUpdateOperationsInput | string
    logoKey?: StringFieldUpdateOperationsInput | string
    heroImageKey?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    registeredAddress?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    vatNumber?: StringFieldUpdateOperationsInput | string
    taxCode?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mapLat?: FloatFieldUpdateOperationsInput | number
    mapLng?: FloatFieldUpdateOperationsInput | number
    mapZoom?: IntFieldUpdateOperationsInput | number
    defaultLocale?: StringFieldUpdateOperationsInput | string
    octorateKey?: StringFieldUpdateOperationsInput | string
  }

  export type PageCreateInput = {
    slug: string
    isVisible?: boolean
    updatedAt?: Date | string
    content?: ContentCreateNestedOneWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: number
    slug: string
    isVisible?: boolean
    updatedAt?: Date | string
    content?: ContentUncheckedCreateNestedOneWithoutPageInput
  }

  export type PageUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: ContentUpdateOneWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: ContentUncheckedUpdateOneWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: number
    slug: string
    isVisible?: boolean
    updatedAt?: Date | string
  }

  export type PageUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentCreateInput = {
    title_it?: string
    title_en?: string
    subtitle_it?: string
    subtitle_en?: string
    body_it?: string
    body_en?: string
    sections_it?: string
    sections_en?: string
    updatedAt?: Date | string
    page: PageCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateInput = {
    id?: number
    pageSlug: string
    title_it?: string
    title_en?: string
    subtitle_it?: string
    subtitle_en?: string
    body_it?: string
    body_en?: string
    sections_it?: string
    sections_en?: string
    updatedAt?: Date | string
  }

  export type ContentUpdateInput = {
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: PageUpdateOneRequiredWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pageSlug?: StringFieldUpdateOperationsInput | string
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentCreateManyInput = {
    id?: number
    pageSlug: string
    title_it?: string
    title_en?: string
    subtitle_it?: string
    subtitle_en?: string
    body_it?: string
    body_en?: string
    sections_it?: string
    sections_en?: string
    updatedAt?: Date | string
  }

  export type ContentUpdateManyMutationInput = {
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pageSlug?: StringFieldUpdateOperationsInput | string
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointOfInterestCreateInput = {
    name_it: string
    name_en: string
    lat: number
    lng: number
    category?: string
    createdAt?: Date | string
  }

  export type PointOfInterestUncheckedCreateInput = {
    id?: number
    name_it: string
    name_en: string
    lat: number
    lng: number
    category?: string
    createdAt?: Date | string
  }

  export type PointOfInterestUpdateInput = {
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointOfInterestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointOfInterestCreateManyInput = {
    id?: number
    name_it: string
    name_en: string
    lat: number
    lng: number
    category?: string
    createdAt?: Date | string
  }

  export type PointOfInterestUpdateManyMutationInput = {
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointOfInterestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaFileCreateInput = {
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    categories?: MediaFileCategoryCreateNestedManyWithoutMediaFileInput
    servicesUsingAsPreview?: ServiceCreateNestedManyWithoutPreviewMediaInput
  }

  export type MediaFileUncheckedCreateInput = {
    id?: number
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    categories?: MediaFileCategoryUncheckedCreateNestedManyWithoutMediaFileInput
    servicesUsingAsPreview?: ServiceUncheckedCreateNestedManyWithoutPreviewMediaInput
  }

  export type MediaFileUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: MediaFileCategoryUpdateManyWithoutMediaFileNestedInput
    servicesUsingAsPreview?: ServiceUpdateManyWithoutPreviewMediaNestedInput
  }

  export type MediaFileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: MediaFileCategoryUncheckedUpdateManyWithoutMediaFileNestedInput
    servicesUsingAsPreview?: ServiceUncheckedUpdateManyWithoutPreviewMediaNestedInput
  }

  export type MediaFileCreateManyInput = {
    id?: number
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
  }

  export type MediaFileUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaFileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoCategoryCreateInput = {
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaFileCategoryCreateNestedManyWithoutPhotoCategoryInput
    services?: ServiceCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryUncheckedCreateInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaFileCategoryUncheckedCreateNestedManyWithoutPhotoCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaFileCategoryUpdateManyWithoutPhotoCategoryNestedInput
    services?: ServiceUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type PhotoCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaFileCategoryUncheckedUpdateManyWithoutPhotoCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type PhotoCategoryCreateManyInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhotoCategoryUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaFileCategoryCreateInput = {
    mediaFile: MediaFileCreateNestedOneWithoutCategoriesInput
    photoCategory: PhotoCategoryCreateNestedOneWithoutMediaInput
  }

  export type MediaFileCategoryUncheckedCreateInput = {
    id?: number
    mediaFileId: number
    photoCategoryId: number
  }

  export type MediaFileCategoryUpdateInput = {
    mediaFile?: MediaFileUpdateOneRequiredWithoutCategoriesNestedInput
    photoCategory?: PhotoCategoryUpdateOneRequiredWithoutMediaNestedInput
  }

  export type MediaFileCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaFileId?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type MediaFileCategoryCreateManyInput = {
    id?: number
    mediaFileId: number
    photoCategoryId: number
  }

  export type MediaFileCategoryUpdateManyMutationInput = {

  }

  export type MediaFileCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaFileId?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateInput = {
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    photoCategory?: PhotoCategoryCreateNestedOneWithoutServicesInput
    previewMedia?: MediaFileCreateNestedOneWithoutServicesUsingAsPreviewInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    previewMediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photoCategory?: PhotoCategoryUpdateOneWithoutServicesNestedInput
    previewMedia?: MediaFileUpdateOneWithoutServicesUsingAsPreviewNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    previewMediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    previewMediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    previewMediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingProviderCreateInput = {
    type: string
    label: string
    config: string
    isEnabled?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingProviderUncheckedCreateInput = {
    id?: number
    type: string
    label: string
    config: string
    isEnabled?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingProviderUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingProviderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingProviderCreateManyInput = {
    id?: number
    type: string
    label: string
    config: string
    isEnabled?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingProviderUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingProviderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SiteSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    logoKey?: SortOrder
    heroImageKey?: SortOrder
    legalName?: SortOrder
    registeredAddress?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    vatNumber?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
    defaultLocale?: SortOrder
    octorateKey?: SortOrder
  }

  export type SiteSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
  }

  export type SiteSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    logoKey?: SortOrder
    heroImageKey?: SortOrder
    legalName?: SortOrder
    registeredAddress?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    vatNumber?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
    defaultLocale?: SortOrder
    octorateKey?: SortOrder
  }

  export type SiteSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    logoKey?: SortOrder
    heroImageKey?: SortOrder
    legalName?: SortOrder
    registeredAddress?: SortOrder
    city?: SortOrder
    region?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    vatNumber?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
    defaultLocale?: SortOrder
    octorateKey?: SortOrder
  }

  export type SiteSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    mapLat?: SortOrder
    mapLng?: SortOrder
    mapZoom?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ContentNullableRelationFilter = {
    is?: ContentWhereInput | null
    isNot?: ContentWhereInput | null
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    isVisible?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    isVisible?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    isVisible?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PageRelationFilter = {
    is?: PageWhereInput
    isNot?: PageWhereInput
  }

  export type ContentCountOrderByAggregateInput = {
    id?: SortOrder
    pageSlug?: SortOrder
    title_it?: SortOrder
    title_en?: SortOrder
    subtitle_it?: SortOrder
    subtitle_en?: SortOrder
    body_it?: SortOrder
    body_en?: SortOrder
    sections_it?: SortOrder
    sections_en?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    id?: SortOrder
    pageSlug?: SortOrder
    title_it?: SortOrder
    title_en?: SortOrder
    subtitle_it?: SortOrder
    subtitle_en?: SortOrder
    body_it?: SortOrder
    body_en?: SortOrder
    sections_it?: SortOrder
    sections_en?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    id?: SortOrder
    pageSlug?: SortOrder
    title_it?: SortOrder
    title_en?: SortOrder
    subtitle_it?: SortOrder
    subtitle_en?: SortOrder
    body_it?: SortOrder
    body_en?: SortOrder
    sections_it?: SortOrder
    sections_en?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PointOfInterestCountOrderByAggregateInput = {
    id?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PointOfInterestAvgOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PointOfInterestMaxOrderByAggregateInput = {
    id?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PointOfInterestMinOrderByAggregateInput = {
    id?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type PointOfInterestSumOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MediaFileCategoryListRelationFilter = {
    every?: MediaFileCategoryWhereInput
    some?: MediaFileCategoryWhereInput
    none?: MediaFileCategoryWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaFileCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaFileCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    thumbnailKey?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    isPublic?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MediaFileAvgOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
  }

  export type MediaFileMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    thumbnailKey?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    isPublic?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MediaFileMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    thumbnailKey?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    isPublic?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MediaFileSumOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type PhotoCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type PhotoCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoCategorySumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type MediaFileRelationFilter = {
    is?: MediaFileWhereInput
    isNot?: MediaFileWhereInput
  }

  export type PhotoCategoryRelationFilter = {
    is?: PhotoCategoryWhereInput
    isNot?: PhotoCategoryWhereInput
  }

  export type MediaFileCategoryMediaFileIdPhotoCategoryIdCompoundUniqueInput = {
    mediaFileId: number
    photoCategoryId: number
  }

  export type MediaFileCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
  }

  export type MediaFileCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
  }

  export type MediaFileCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
  }

  export type MediaFileCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
  }

  export type MediaFileCategorySumOrderByAggregateInput = {
    id?: SortOrder
    mediaFileId?: SortOrder
    photoCategoryId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PhotoCategoryNullableRelationFilter = {
    is?: PhotoCategoryWhereInput | null
    isNot?: PhotoCategoryWhereInput | null
  }

  export type MediaFileNullableRelationFilter = {
    is?: MediaFileWhereInput | null
    isNot?: MediaFileWhereInput | null
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    description_it?: SortOrder
    description_en?: SortOrder
    isPublic?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrder
    previewMediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrder
    previewMediaId?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    description_it?: SortOrder
    description_en?: SortOrder
    isPublic?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrder
    previewMediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name_it?: SortOrder
    name_en?: SortOrder
    description_it?: SortOrder
    description_en?: SortOrder
    isPublic?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrder
    previewMediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    photoCategoryId?: SortOrder
    previewMediaId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BookingProviderCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    label?: SortOrder
    config?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingProviderAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type BookingProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    label?: SortOrder
    config?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingProviderMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    label?: SortOrder
    config?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingProviderSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContentCreateNestedOneWithoutPageInput = {
    create?: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPageInput
    connect?: ContentWhereUniqueInput
  }

  export type ContentUncheckedCreateNestedOneWithoutPageInput = {
    create?: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPageInput
    connect?: ContentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ContentUpdateOneWithoutPageNestedInput = {
    create?: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPageInput
    upsert?: ContentUpsertWithoutPageInput
    disconnect?: ContentWhereInput | boolean
    delete?: ContentWhereInput | boolean
    connect?: ContentWhereUniqueInput
    update?: XOR<XOR<ContentUpdateToOneWithWhereWithoutPageInput, ContentUpdateWithoutPageInput>, ContentUncheckedUpdateWithoutPageInput>
  }

  export type ContentUncheckedUpdateOneWithoutPageNestedInput = {
    create?: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPageInput
    upsert?: ContentUpsertWithoutPageInput
    disconnect?: ContentWhereInput | boolean
    delete?: ContentWhereInput | boolean
    connect?: ContentWhereUniqueInput
    update?: XOR<XOR<ContentUpdateToOneWithWhereWithoutPageInput, ContentUpdateWithoutPageInput>, ContentUncheckedUpdateWithoutPageInput>
  }

  export type PageCreateNestedOneWithoutContentInput = {
    create?: XOR<PageCreateWithoutContentInput, PageUncheckedCreateWithoutContentInput>
    connectOrCreate?: PageCreateOrConnectWithoutContentInput
    connect?: PageWhereUniqueInput
  }

  export type PageUpdateOneRequiredWithoutContentNestedInput = {
    create?: XOR<PageCreateWithoutContentInput, PageUncheckedCreateWithoutContentInput>
    connectOrCreate?: PageCreateOrConnectWithoutContentInput
    upsert?: PageUpsertWithoutContentInput
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutContentInput, PageUpdateWithoutContentInput>, PageUncheckedUpdateWithoutContentInput>
  }

  export type MediaFileCategoryCreateNestedManyWithoutMediaFileInput = {
    create?: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput> | MediaFileCategoryCreateWithoutMediaFileInput[] | MediaFileCategoryUncheckedCreateWithoutMediaFileInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutMediaFileInput | MediaFileCategoryCreateOrConnectWithoutMediaFileInput[]
    createMany?: MediaFileCategoryCreateManyMediaFileInputEnvelope
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutPreviewMediaInput = {
    create?: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput> | ServiceCreateWithoutPreviewMediaInput[] | ServiceUncheckedCreateWithoutPreviewMediaInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPreviewMediaInput | ServiceCreateOrConnectWithoutPreviewMediaInput[]
    createMany?: ServiceCreateManyPreviewMediaInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type MediaFileCategoryUncheckedCreateNestedManyWithoutMediaFileInput = {
    create?: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput> | MediaFileCategoryCreateWithoutMediaFileInput[] | MediaFileCategoryUncheckedCreateWithoutMediaFileInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutMediaFileInput | MediaFileCategoryCreateOrConnectWithoutMediaFileInput[]
    createMany?: MediaFileCategoryCreateManyMediaFileInputEnvelope
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutPreviewMediaInput = {
    create?: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput> | ServiceCreateWithoutPreviewMediaInput[] | ServiceUncheckedCreateWithoutPreviewMediaInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPreviewMediaInput | ServiceCreateOrConnectWithoutPreviewMediaInput[]
    createMany?: ServiceCreateManyPreviewMediaInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MediaFileCategoryUpdateManyWithoutMediaFileNestedInput = {
    create?: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput> | MediaFileCategoryCreateWithoutMediaFileInput[] | MediaFileCategoryUncheckedCreateWithoutMediaFileInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutMediaFileInput | MediaFileCategoryCreateOrConnectWithoutMediaFileInput[]
    upsert?: MediaFileCategoryUpsertWithWhereUniqueWithoutMediaFileInput | MediaFileCategoryUpsertWithWhereUniqueWithoutMediaFileInput[]
    createMany?: MediaFileCategoryCreateManyMediaFileInputEnvelope
    set?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    disconnect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    delete?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    update?: MediaFileCategoryUpdateWithWhereUniqueWithoutMediaFileInput | MediaFileCategoryUpdateWithWhereUniqueWithoutMediaFileInput[]
    updateMany?: MediaFileCategoryUpdateManyWithWhereWithoutMediaFileInput | MediaFileCategoryUpdateManyWithWhereWithoutMediaFileInput[]
    deleteMany?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutPreviewMediaNestedInput = {
    create?: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput> | ServiceCreateWithoutPreviewMediaInput[] | ServiceUncheckedCreateWithoutPreviewMediaInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPreviewMediaInput | ServiceCreateOrConnectWithoutPreviewMediaInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPreviewMediaInput | ServiceUpsertWithWhereUniqueWithoutPreviewMediaInput[]
    createMany?: ServiceCreateManyPreviewMediaInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPreviewMediaInput | ServiceUpdateWithWhereUniqueWithoutPreviewMediaInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPreviewMediaInput | ServiceUpdateManyWithWhereWithoutPreviewMediaInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type MediaFileCategoryUncheckedUpdateManyWithoutMediaFileNestedInput = {
    create?: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput> | MediaFileCategoryCreateWithoutMediaFileInput[] | MediaFileCategoryUncheckedCreateWithoutMediaFileInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutMediaFileInput | MediaFileCategoryCreateOrConnectWithoutMediaFileInput[]
    upsert?: MediaFileCategoryUpsertWithWhereUniqueWithoutMediaFileInput | MediaFileCategoryUpsertWithWhereUniqueWithoutMediaFileInput[]
    createMany?: MediaFileCategoryCreateManyMediaFileInputEnvelope
    set?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    disconnect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    delete?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    update?: MediaFileCategoryUpdateWithWhereUniqueWithoutMediaFileInput | MediaFileCategoryUpdateWithWhereUniqueWithoutMediaFileInput[]
    updateMany?: MediaFileCategoryUpdateManyWithWhereWithoutMediaFileInput | MediaFileCategoryUpdateManyWithWhereWithoutMediaFileInput[]
    deleteMany?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutPreviewMediaNestedInput = {
    create?: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput> | ServiceCreateWithoutPreviewMediaInput[] | ServiceUncheckedCreateWithoutPreviewMediaInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPreviewMediaInput | ServiceCreateOrConnectWithoutPreviewMediaInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPreviewMediaInput | ServiceUpsertWithWhereUniqueWithoutPreviewMediaInput[]
    createMany?: ServiceCreateManyPreviewMediaInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPreviewMediaInput | ServiceUpdateWithWhereUniqueWithoutPreviewMediaInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPreviewMediaInput | ServiceUpdateManyWithWhereWithoutPreviewMediaInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type MediaFileCategoryCreateNestedManyWithoutPhotoCategoryInput = {
    create?: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput> | MediaFileCategoryCreateWithoutPhotoCategoryInput[] | MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput | MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput[]
    createMany?: MediaFileCategoryCreateManyPhotoCategoryInputEnvelope
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutPhotoCategoryInput = {
    create?: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput> | ServiceCreateWithoutPhotoCategoryInput[] | ServiceUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPhotoCategoryInput | ServiceCreateOrConnectWithoutPhotoCategoryInput[]
    createMany?: ServiceCreateManyPhotoCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type MediaFileCategoryUncheckedCreateNestedManyWithoutPhotoCategoryInput = {
    create?: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput> | MediaFileCategoryCreateWithoutPhotoCategoryInput[] | MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput | MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput[]
    createMany?: MediaFileCategoryCreateManyPhotoCategoryInputEnvelope
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutPhotoCategoryInput = {
    create?: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput> | ServiceCreateWithoutPhotoCategoryInput[] | ServiceUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPhotoCategoryInput | ServiceCreateOrConnectWithoutPhotoCategoryInput[]
    createMany?: ServiceCreateManyPhotoCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type MediaFileCategoryUpdateManyWithoutPhotoCategoryNestedInput = {
    create?: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput> | MediaFileCategoryCreateWithoutPhotoCategoryInput[] | MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput | MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput[]
    upsert?: MediaFileCategoryUpsertWithWhereUniqueWithoutPhotoCategoryInput | MediaFileCategoryUpsertWithWhereUniqueWithoutPhotoCategoryInput[]
    createMany?: MediaFileCategoryCreateManyPhotoCategoryInputEnvelope
    set?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    disconnect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    delete?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    update?: MediaFileCategoryUpdateWithWhereUniqueWithoutPhotoCategoryInput | MediaFileCategoryUpdateWithWhereUniqueWithoutPhotoCategoryInput[]
    updateMany?: MediaFileCategoryUpdateManyWithWhereWithoutPhotoCategoryInput | MediaFileCategoryUpdateManyWithWhereWithoutPhotoCategoryInput[]
    deleteMany?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutPhotoCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput> | ServiceCreateWithoutPhotoCategoryInput[] | ServiceUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPhotoCategoryInput | ServiceCreateOrConnectWithoutPhotoCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPhotoCategoryInput | ServiceUpsertWithWhereUniqueWithoutPhotoCategoryInput[]
    createMany?: ServiceCreateManyPhotoCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPhotoCategoryInput | ServiceUpdateWithWhereUniqueWithoutPhotoCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPhotoCategoryInput | ServiceUpdateManyWithWhereWithoutPhotoCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type MediaFileCategoryUncheckedUpdateManyWithoutPhotoCategoryNestedInput = {
    create?: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput> | MediaFileCategoryCreateWithoutPhotoCategoryInput[] | MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput | MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput[]
    upsert?: MediaFileCategoryUpsertWithWhereUniqueWithoutPhotoCategoryInput | MediaFileCategoryUpsertWithWhereUniqueWithoutPhotoCategoryInput[]
    createMany?: MediaFileCategoryCreateManyPhotoCategoryInputEnvelope
    set?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    disconnect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    delete?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    connect?: MediaFileCategoryWhereUniqueInput | MediaFileCategoryWhereUniqueInput[]
    update?: MediaFileCategoryUpdateWithWhereUniqueWithoutPhotoCategoryInput | MediaFileCategoryUpdateWithWhereUniqueWithoutPhotoCategoryInput[]
    updateMany?: MediaFileCategoryUpdateManyWithWhereWithoutPhotoCategoryInput | MediaFileCategoryUpdateManyWithWhereWithoutPhotoCategoryInput[]
    deleteMany?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutPhotoCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput> | ServiceCreateWithoutPhotoCategoryInput[] | ServiceUncheckedCreateWithoutPhotoCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutPhotoCategoryInput | ServiceCreateOrConnectWithoutPhotoCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutPhotoCategoryInput | ServiceUpsertWithWhereUniqueWithoutPhotoCategoryInput[]
    createMany?: ServiceCreateManyPhotoCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutPhotoCategoryInput | ServiceUpdateWithWhereUniqueWithoutPhotoCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutPhotoCategoryInput | ServiceUpdateManyWithWhereWithoutPhotoCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type MediaFileCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<MediaFileCreateWithoutCategoriesInput, MediaFileUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: MediaFileCreateOrConnectWithoutCategoriesInput
    connect?: MediaFileWhereUniqueInput
  }

  export type PhotoCategoryCreateNestedOneWithoutMediaInput = {
    create?: XOR<PhotoCategoryCreateWithoutMediaInput, PhotoCategoryUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PhotoCategoryCreateOrConnectWithoutMediaInput
    connect?: PhotoCategoryWhereUniqueInput
  }

  export type MediaFileUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<MediaFileCreateWithoutCategoriesInput, MediaFileUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: MediaFileCreateOrConnectWithoutCategoriesInput
    upsert?: MediaFileUpsertWithoutCategoriesInput
    connect?: MediaFileWhereUniqueInput
    update?: XOR<XOR<MediaFileUpdateToOneWithWhereWithoutCategoriesInput, MediaFileUpdateWithoutCategoriesInput>, MediaFileUncheckedUpdateWithoutCategoriesInput>
  }

  export type PhotoCategoryUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<PhotoCategoryCreateWithoutMediaInput, PhotoCategoryUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PhotoCategoryCreateOrConnectWithoutMediaInput
    upsert?: PhotoCategoryUpsertWithoutMediaInput
    connect?: PhotoCategoryWhereUniqueInput
    update?: XOR<XOR<PhotoCategoryUpdateToOneWithWhereWithoutMediaInput, PhotoCategoryUpdateWithoutMediaInput>, PhotoCategoryUncheckedUpdateWithoutMediaInput>
  }

  export type PhotoCategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<PhotoCategoryCreateWithoutServicesInput, PhotoCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PhotoCategoryCreateOrConnectWithoutServicesInput
    connect?: PhotoCategoryWhereUniqueInput
  }

  export type MediaFileCreateNestedOneWithoutServicesUsingAsPreviewInput = {
    create?: XOR<MediaFileCreateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedCreateWithoutServicesUsingAsPreviewInput>
    connectOrCreate?: MediaFileCreateOrConnectWithoutServicesUsingAsPreviewInput
    connect?: MediaFileWhereUniqueInput
  }

  export type PhotoCategoryUpdateOneWithoutServicesNestedInput = {
    create?: XOR<PhotoCategoryCreateWithoutServicesInput, PhotoCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PhotoCategoryCreateOrConnectWithoutServicesInput
    upsert?: PhotoCategoryUpsertWithoutServicesInput
    disconnect?: PhotoCategoryWhereInput | boolean
    delete?: PhotoCategoryWhereInput | boolean
    connect?: PhotoCategoryWhereUniqueInput
    update?: XOR<XOR<PhotoCategoryUpdateToOneWithWhereWithoutServicesInput, PhotoCategoryUpdateWithoutServicesInput>, PhotoCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type MediaFileUpdateOneWithoutServicesUsingAsPreviewNestedInput = {
    create?: XOR<MediaFileCreateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedCreateWithoutServicesUsingAsPreviewInput>
    connectOrCreate?: MediaFileCreateOrConnectWithoutServicesUsingAsPreviewInput
    upsert?: MediaFileUpsertWithoutServicesUsingAsPreviewInput
    disconnect?: MediaFileWhereInput | boolean
    delete?: MediaFileWhereInput | boolean
    connect?: MediaFileWhereUniqueInput
    update?: XOR<XOR<MediaFileUpdateToOneWithWhereWithoutServicesUsingAsPreviewInput, MediaFileUpdateWithoutServicesUsingAsPreviewInput>, MediaFileUncheckedUpdateWithoutServicesUsingAsPreviewInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ContentCreateWithoutPageInput = {
    title_it?: string
    title_en?: string
    subtitle_it?: string
    subtitle_en?: string
    body_it?: string
    body_en?: string
    sections_it?: string
    sections_en?: string
    updatedAt?: Date | string
  }

  export type ContentUncheckedCreateWithoutPageInput = {
    id?: number
    title_it?: string
    title_en?: string
    subtitle_it?: string
    subtitle_en?: string
    body_it?: string
    body_en?: string
    sections_it?: string
    sections_en?: string
    updatedAt?: Date | string
  }

  export type ContentCreateOrConnectWithoutPageInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
  }

  export type ContentUpsertWithoutPageInput = {
    update: XOR<ContentUpdateWithoutPageInput, ContentUncheckedUpdateWithoutPageInput>
    create: XOR<ContentCreateWithoutPageInput, ContentUncheckedCreateWithoutPageInput>
    where?: ContentWhereInput
  }

  export type ContentUpdateToOneWithWhereWithoutPageInput = {
    where?: ContentWhereInput
    data: XOR<ContentUpdateWithoutPageInput, ContentUncheckedUpdateWithoutPageInput>
  }

  export type ContentUpdateWithoutPageInput = {
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentUncheckedUpdateWithoutPageInput = {
    id?: IntFieldUpdateOperationsInput | number
    title_it?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    subtitle_it?: StringFieldUpdateOperationsInput | string
    subtitle_en?: StringFieldUpdateOperationsInput | string
    body_it?: StringFieldUpdateOperationsInput | string
    body_en?: StringFieldUpdateOperationsInput | string
    sections_it?: StringFieldUpdateOperationsInput | string
    sections_en?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateWithoutContentInput = {
    slug: string
    isVisible?: boolean
    updatedAt?: Date | string
  }

  export type PageUncheckedCreateWithoutContentInput = {
    id?: number
    slug: string
    isVisible?: boolean
    updatedAt?: Date | string
  }

  export type PageCreateOrConnectWithoutContentInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutContentInput, PageUncheckedCreateWithoutContentInput>
  }

  export type PageUpsertWithoutContentInput = {
    update: XOR<PageUpdateWithoutContentInput, PageUncheckedUpdateWithoutContentInput>
    create: XOR<PageCreateWithoutContentInput, PageUncheckedCreateWithoutContentInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutContentInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutContentInput, PageUncheckedUpdateWithoutContentInput>
  }

  export type PageUpdateWithoutContentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateWithoutContentInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaFileCategoryCreateWithoutMediaFileInput = {
    photoCategory: PhotoCategoryCreateNestedOneWithoutMediaInput
  }

  export type MediaFileCategoryUncheckedCreateWithoutMediaFileInput = {
    id?: number
    photoCategoryId: number
  }

  export type MediaFileCategoryCreateOrConnectWithoutMediaFileInput = {
    where: MediaFileCategoryWhereUniqueInput
    create: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput>
  }

  export type MediaFileCategoryCreateManyMediaFileInputEnvelope = {
    data: MediaFileCategoryCreateManyMediaFileInput | MediaFileCategoryCreateManyMediaFileInput[]
  }

  export type ServiceCreateWithoutPreviewMediaInput = {
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    photoCategory?: PhotoCategoryCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutPreviewMediaInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutPreviewMediaInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput>
  }

  export type ServiceCreateManyPreviewMediaInputEnvelope = {
    data: ServiceCreateManyPreviewMediaInput | ServiceCreateManyPreviewMediaInput[]
  }

  export type MediaFileCategoryUpsertWithWhereUniqueWithoutMediaFileInput = {
    where: MediaFileCategoryWhereUniqueInput
    update: XOR<MediaFileCategoryUpdateWithoutMediaFileInput, MediaFileCategoryUncheckedUpdateWithoutMediaFileInput>
    create: XOR<MediaFileCategoryCreateWithoutMediaFileInput, MediaFileCategoryUncheckedCreateWithoutMediaFileInput>
  }

  export type MediaFileCategoryUpdateWithWhereUniqueWithoutMediaFileInput = {
    where: MediaFileCategoryWhereUniqueInput
    data: XOR<MediaFileCategoryUpdateWithoutMediaFileInput, MediaFileCategoryUncheckedUpdateWithoutMediaFileInput>
  }

  export type MediaFileCategoryUpdateManyWithWhereWithoutMediaFileInput = {
    where: MediaFileCategoryScalarWhereInput
    data: XOR<MediaFileCategoryUpdateManyMutationInput, MediaFileCategoryUncheckedUpdateManyWithoutMediaFileInput>
  }

  export type MediaFileCategoryScalarWhereInput = {
    AND?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
    OR?: MediaFileCategoryScalarWhereInput[]
    NOT?: MediaFileCategoryScalarWhereInput | MediaFileCategoryScalarWhereInput[]
    id?: IntFilter<"MediaFileCategory"> | number
    mediaFileId?: IntFilter<"MediaFileCategory"> | number
    photoCategoryId?: IntFilter<"MediaFileCategory"> | number
  }

  export type ServiceUpsertWithWhereUniqueWithoutPreviewMediaInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutPreviewMediaInput, ServiceUncheckedUpdateWithoutPreviewMediaInput>
    create: XOR<ServiceCreateWithoutPreviewMediaInput, ServiceUncheckedCreateWithoutPreviewMediaInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutPreviewMediaInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutPreviewMediaInput, ServiceUncheckedUpdateWithoutPreviewMediaInput>
  }

  export type ServiceUpdateManyWithWhereWithoutPreviewMediaInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutPreviewMediaInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: IntFilter<"Service"> | number
    slug?: StringFilter<"Service"> | string
    name_it?: StringFilter<"Service"> | string
    name_en?: StringFilter<"Service"> | string
    description_it?: StringFilter<"Service"> | string
    description_en?: StringFilter<"Service"> | string
    isPublic?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
    photoCategoryId?: IntNullableFilter<"Service"> | number | null
    previewMediaId?: IntNullableFilter<"Service"> | number | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type MediaFileCategoryCreateWithoutPhotoCategoryInput = {
    mediaFile: MediaFileCreateNestedOneWithoutCategoriesInput
  }

  export type MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput = {
    id?: number
    mediaFileId: number
  }

  export type MediaFileCategoryCreateOrConnectWithoutPhotoCategoryInput = {
    where: MediaFileCategoryWhereUniqueInput
    create: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput>
  }

  export type MediaFileCategoryCreateManyPhotoCategoryInputEnvelope = {
    data: MediaFileCategoryCreateManyPhotoCategoryInput | MediaFileCategoryCreateManyPhotoCategoryInput[]
  }

  export type ServiceCreateWithoutPhotoCategoryInput = {
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    previewMedia?: MediaFileCreateNestedOneWithoutServicesUsingAsPreviewInput
  }

  export type ServiceUncheckedCreateWithoutPhotoCategoryInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    previewMediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutPhotoCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput>
  }

  export type ServiceCreateManyPhotoCategoryInputEnvelope = {
    data: ServiceCreateManyPhotoCategoryInput | ServiceCreateManyPhotoCategoryInput[]
  }

  export type MediaFileCategoryUpsertWithWhereUniqueWithoutPhotoCategoryInput = {
    where: MediaFileCategoryWhereUniqueInput
    update: XOR<MediaFileCategoryUpdateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedUpdateWithoutPhotoCategoryInput>
    create: XOR<MediaFileCategoryCreateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedCreateWithoutPhotoCategoryInput>
  }

  export type MediaFileCategoryUpdateWithWhereUniqueWithoutPhotoCategoryInput = {
    where: MediaFileCategoryWhereUniqueInput
    data: XOR<MediaFileCategoryUpdateWithoutPhotoCategoryInput, MediaFileCategoryUncheckedUpdateWithoutPhotoCategoryInput>
  }

  export type MediaFileCategoryUpdateManyWithWhereWithoutPhotoCategoryInput = {
    where: MediaFileCategoryScalarWhereInput
    data: XOR<MediaFileCategoryUpdateManyMutationInput, MediaFileCategoryUncheckedUpdateManyWithoutPhotoCategoryInput>
  }

  export type ServiceUpsertWithWhereUniqueWithoutPhotoCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutPhotoCategoryInput, ServiceUncheckedUpdateWithoutPhotoCategoryInput>
    create: XOR<ServiceCreateWithoutPhotoCategoryInput, ServiceUncheckedCreateWithoutPhotoCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutPhotoCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutPhotoCategoryInput, ServiceUncheckedUpdateWithoutPhotoCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutPhotoCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutPhotoCategoryInput>
  }

  export type MediaFileCreateWithoutCategoriesInput = {
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    servicesUsingAsPreview?: ServiceCreateNestedManyWithoutPreviewMediaInput
  }

  export type MediaFileUncheckedCreateWithoutCategoriesInput = {
    id?: number
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    servicesUsingAsPreview?: ServiceUncheckedCreateNestedManyWithoutPreviewMediaInput
  }

  export type MediaFileCreateOrConnectWithoutCategoriesInput = {
    where: MediaFileWhereUniqueInput
    create: XOR<MediaFileCreateWithoutCategoriesInput, MediaFileUncheckedCreateWithoutCategoriesInput>
  }

  export type PhotoCategoryCreateWithoutMediaInput = {
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryUncheckedCreateWithoutMediaInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryCreateOrConnectWithoutMediaInput = {
    where: PhotoCategoryWhereUniqueInput
    create: XOR<PhotoCategoryCreateWithoutMediaInput, PhotoCategoryUncheckedCreateWithoutMediaInput>
  }

  export type MediaFileUpsertWithoutCategoriesInput = {
    update: XOR<MediaFileUpdateWithoutCategoriesInput, MediaFileUncheckedUpdateWithoutCategoriesInput>
    create: XOR<MediaFileCreateWithoutCategoriesInput, MediaFileUncheckedCreateWithoutCategoriesInput>
    where?: MediaFileWhereInput
  }

  export type MediaFileUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: MediaFileWhereInput
    data: XOR<MediaFileUpdateWithoutCategoriesInput, MediaFileUncheckedUpdateWithoutCategoriesInput>
  }

  export type MediaFileUpdateWithoutCategoriesInput = {
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesUsingAsPreview?: ServiceUpdateManyWithoutPreviewMediaNestedInput
  }

  export type MediaFileUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servicesUsingAsPreview?: ServiceUncheckedUpdateManyWithoutPreviewMediaNestedInput
  }

  export type PhotoCategoryUpsertWithoutMediaInput = {
    update: XOR<PhotoCategoryUpdateWithoutMediaInput, PhotoCategoryUncheckedUpdateWithoutMediaInput>
    create: XOR<PhotoCategoryCreateWithoutMediaInput, PhotoCategoryUncheckedCreateWithoutMediaInput>
    where?: PhotoCategoryWhereInput
  }

  export type PhotoCategoryUpdateToOneWithWhereWithoutMediaInput = {
    where?: PhotoCategoryWhereInput
    data: XOR<PhotoCategoryUpdateWithoutMediaInput, PhotoCategoryUncheckedUpdateWithoutMediaInput>
  }

  export type PhotoCategoryUpdateWithoutMediaInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type PhotoCategoryUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type PhotoCategoryCreateWithoutServicesInput = {
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaFileCategoryCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryUncheckedCreateWithoutServicesInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaFileCategoryUncheckedCreateNestedManyWithoutPhotoCategoryInput
  }

  export type PhotoCategoryCreateOrConnectWithoutServicesInput = {
    where: PhotoCategoryWhereUniqueInput
    create: XOR<PhotoCategoryCreateWithoutServicesInput, PhotoCategoryUncheckedCreateWithoutServicesInput>
  }

  export type MediaFileCreateWithoutServicesUsingAsPreviewInput = {
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    categories?: MediaFileCategoryCreateNestedManyWithoutMediaFileInput
  }

  export type MediaFileUncheckedCreateWithoutServicesUsingAsPreviewInput = {
    id?: number
    key: string
    thumbnailKey?: string | null
    filename: string
    mimeType: string
    size: number
    isPublic?: boolean
    uploadedAt?: Date | string
    categories?: MediaFileCategoryUncheckedCreateNestedManyWithoutMediaFileInput
  }

  export type MediaFileCreateOrConnectWithoutServicesUsingAsPreviewInput = {
    where: MediaFileWhereUniqueInput
    create: XOR<MediaFileCreateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedCreateWithoutServicesUsingAsPreviewInput>
  }

  export type PhotoCategoryUpsertWithoutServicesInput = {
    update: XOR<PhotoCategoryUpdateWithoutServicesInput, PhotoCategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<PhotoCategoryCreateWithoutServicesInput, PhotoCategoryUncheckedCreateWithoutServicesInput>
    where?: PhotoCategoryWhereInput
  }

  export type PhotoCategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: PhotoCategoryWhereInput
    data: XOR<PhotoCategoryUpdateWithoutServicesInput, PhotoCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type PhotoCategoryUpdateWithoutServicesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaFileCategoryUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type PhotoCategoryUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaFileCategoryUncheckedUpdateManyWithoutPhotoCategoryNestedInput
  }

  export type MediaFileUpsertWithoutServicesUsingAsPreviewInput = {
    update: XOR<MediaFileUpdateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedUpdateWithoutServicesUsingAsPreviewInput>
    create: XOR<MediaFileCreateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedCreateWithoutServicesUsingAsPreviewInput>
    where?: MediaFileWhereInput
  }

  export type MediaFileUpdateToOneWithWhereWithoutServicesUsingAsPreviewInput = {
    where?: MediaFileWhereInput
    data: XOR<MediaFileUpdateWithoutServicesUsingAsPreviewInput, MediaFileUncheckedUpdateWithoutServicesUsingAsPreviewInput>
  }

  export type MediaFileUpdateWithoutServicesUsingAsPreviewInput = {
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: MediaFileCategoryUpdateManyWithoutMediaFileNestedInput
  }

  export type MediaFileUncheckedUpdateWithoutServicesUsingAsPreviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: MediaFileCategoryUncheckedUpdateManyWithoutMediaFileNestedInput
  }

  export type MediaFileCategoryCreateManyMediaFileInput = {
    id?: number
    photoCategoryId: number
  }

  export type ServiceCreateManyPreviewMediaInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    photoCategoryId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaFileCategoryUpdateWithoutMediaFileInput = {
    photoCategory?: PhotoCategoryUpdateOneRequiredWithoutMediaNestedInput
  }

  export type MediaFileCategoryUncheckedUpdateWithoutMediaFileInput = {
    id?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type MediaFileCategoryUncheckedUpdateManyWithoutMediaFileInput = {
    id?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUpdateWithoutPreviewMediaInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photoCategory?: PhotoCategoryUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPreviewMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyWithoutPreviewMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    photoCategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaFileCategoryCreateManyPhotoCategoryInput = {
    id?: number
    mediaFileId: number
  }

  export type ServiceCreateManyPhotoCategoryInput = {
    id?: number
    slug: string
    name_it: string
    name_en: string
    description_it?: string
    description_en?: string
    isPublic?: boolean
    sortOrder?: number
    previewMediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaFileCategoryUpdateWithoutPhotoCategoryInput = {
    mediaFile?: MediaFileUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type MediaFileCategoryUncheckedUpdateWithoutPhotoCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaFileId?: IntFieldUpdateOperationsInput | number
  }

  export type MediaFileCategoryUncheckedUpdateManyWithoutPhotoCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaFileId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUpdateWithoutPhotoCategoryInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    previewMedia?: MediaFileUpdateOneWithoutServicesUsingAsPreviewNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPhotoCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    previewMediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyWithoutPhotoCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name_it?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    description_it?: StringFieldUpdateOperationsInput | string
    description_en?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    previewMediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MediaFileCountOutputTypeDefaultArgs instead
     */
    export type MediaFileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MediaFileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PhotoCategoryCountOutputTypeDefaultArgs instead
     */
    export type PhotoCategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PhotoCategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiteSettingsDefaultArgs instead
     */
    export type SiteSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiteSettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PageDefaultArgs instead
     */
    export type PageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContentDefaultArgs instead
     */
    export type ContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointOfInterestDefaultArgs instead
     */
    export type PointOfInterestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointOfInterestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MediaFileDefaultArgs instead
     */
    export type MediaFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MediaFileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PhotoCategoryDefaultArgs instead
     */
    export type PhotoCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PhotoCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MediaFileCategoryDefaultArgs instead
     */
    export type MediaFileCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MediaFileCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingProviderDefaultArgs instead
     */
    export type BookingProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingProviderDefaultArgs<ExtArgs>

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