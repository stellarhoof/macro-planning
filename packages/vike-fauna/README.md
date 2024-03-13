# TODO

- Create database
- Create collections

# ABAC (Attribute-based access control)

https://www.okta.com/blog/2020/09/attribute-based-access-control-abac/

Basically there are the following concepts

- Subjects (users): a subject has attributes (ex: name, occupation, and email).
- Objects (resources): an object also has attributes (ex: a file's creation date, and permissions).
- Environment: any other relevant contextual information (ex: location, timezone, and current date).
- Action: action that a user is trying to perform on a resource.
- Policies (rules): think of it as a predicate `(user, action, resource, environment) => boolean` that determines whether a user can perform an action on a resource under a certain environment.

# Security

`username` and `password` creates an organization account. This account has the `admin` role on every database for the Fauna account.

## Key with `admin` role

https://docs.fauna.com/fauna/current/cookbook/advanced/security/setup

```
> Key.create({ role: "admin", data: { name: "admin-key" } })

fnAFcKODC9AATQGJtEnfyR_M7oc7FCt4aAAJ-jTj
```

## Key with `server` role

https://docs.fauna.com/fauna/current/cookbook/advanced/security/builtin

A `server` role is equivalent to the `admin` role, except that the following resources can't be directly managed with it:

- User-defined roles
- Child databases
- Keys
- Tokens, and their associated documents

```
> Key.create({ role: "server", data: { name: "server-key" } })

fnAFcKP2pnAASXMPLHp1P_yDqbAfItLrQvsbPyWJ
```

## User-defined role

```typescript
/** For example, a collection name */
type Resource = string

/**
 * A stringified function
 * https://docs.fauna.com/fauna/current/cookbook/advanced/security/user-roles#write-an-action-predicate
 */
type Predicate = string

/**
 * A Role document defines privileges and membership associated with
 * a Collection or user-defined function (UDF).
 *
 * Roles are stored in a collection called `Role` so they can be queried
 * like any other collection. Ex: `Role.all()` and `Role.where()`
 */
interface Role {
  name: string
  /** Collection or UDF name */
  coll: string
  /**
   * Defines which identities belong to this role, therefore having the
   * privileges defined in this role
   */
  membership?: {
    resource: Resource
    /** Ex: "user => user.isAdmin" */
    predicate: Predicate
  }[]
  /**
   * Defines actions that can be executed on given resources. By default no
   * actions are permitted.
   */
  privileges?: {
    resource: Resource
    actions: {
      read: boolean | Predicate
      write: boolean | Predicate
      /** Ex: "data => data.employment == 'active'" */
      create: boolean | Predicate
    }
  }[]
  /** User-defined metadata */
  data?: Record<string, unknown>
}
```

Given the following `Role`

```typescript
Role.create({
  name: "CanReadUsers",
  privileges: [{ resource: "Users", actions: { read: true } }],
  membership: [{ resource: "Users", predicate: "user => user.isAdmin" }],
})
```

- A user logging in via a `Token` can read `Users` because:
  - `CanReadUsers.membership.predicate` evaluates as `true`, so the user is a member of the `CanReadUsers` role.
  - `CanReadUsers.privileges` allows it.
- A user with a key `Key.create({ role: "CanReadUsers" })` can also read `Users` documents because:
  - `CanReadUsers.privileges` allows it.

When a user-defined role is used through a `Key`, the `membership` array is ignored.

## Logging in
