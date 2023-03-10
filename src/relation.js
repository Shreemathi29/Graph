import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]
const relation = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    start: 2
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
    start:1
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    start: 2
}]
// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]! 
        relation:[Union!]!
        me: User!
        post: Post!
        set: Union!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts:[Post!]!
        uses:[Union!]!
    }

    type Union {
        id: ID!
        name: String!
        email: String!
        relation: [User!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '983098',
                name: 'shree',
                email: 'mike@example.com'
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false,
                author:1
            }
        },

        set() {
            return {
                id: '1',
                name: 'shreemathi',
                email: 'shree@example.com',
              
            }
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    },
   
        relation(parent, args, ctx, info) {
            return relation.filter((post) => {
                return post.start === parent.id
            })
        
    }

    

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})