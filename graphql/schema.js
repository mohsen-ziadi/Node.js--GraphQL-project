// ObjectType - Query - mutation

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = require("graphql");

const courses = [
    { id: "1", title: "java script", price: 0 },
    { id: "2", title: "React.js", price: 4_800_000 },
    { id: "3", title: "Node.js", price: 5_600_000 },
    { id: "4", title: "MySql", price: 2_300_000 },
]

const teachers = [
    { id: "1", name: "Ali hossein", age: 23 },
    { id: "2", name: "Meysam", age: 22 },
    { id: "3", name: "Mohsen", age: 22 },
    { id: "4", name: "Mehdi", age: 23 },
]


const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
    })
})

const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
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
        },
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: () => {
                return teachers;
            }
        },
        teacher: {
            type: TeacherType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: (parent, args) => { // تغییر به (parent, args)
                return teachers.find((teacher) => teacher.id === args.id);
            }
        },
        course: {
            type: CourseType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: (parent, args) => { // تغییر به (parent, args)
                return courses.find((course) => course.id === args.id);
            }
        }
    }
})


const schema = new GraphQLSchema({
    query: RootQuery,
})

module.exports = schema;