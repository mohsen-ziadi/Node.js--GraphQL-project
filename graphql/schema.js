// ObjectType - Query - mutation

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

const courses = [
    { id: 1, title: "java script", price: 0 },
    { id: 2, title: "React.js", price: 4_800_000 },
    { id: 3, title: "Node.js", price: 5_600_000 },
    { id: 4, title: "MySql", price: 2_300_000 },
]

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        courses: {
            type: new GraphQLList(CourseType),
            resolve: () => {
                return courses;
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
})

module.exports = schema;