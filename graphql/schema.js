// ObjectType - Query - mutation

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, Source, GraphQLID } = require("graphql");
const CourseModel = require("../models/Course")
const TeacherModel = require("../models/Teacher")

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
        teacher: {
            type: TeacherType,
            resolve: (parent) => {
                return teachers.find(
                    (teacher) => teacher.id === parent.teacherId
                )
            }
        },
    })
})

const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        courses: {
            type: new GraphQLList(CourseType),
            resolve: (parent) => {
                return courses.filter(
                    (course) => course.teacherId === parent.id
                )
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        courses: {
            type: new GraphQLList(CourseType),
            resolve: async () => {
                return await CourseModel.find({});
            }
        },
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: async () => {
                return await TeacherModel.find({});
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

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTeacher: {
            type: TeacherType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                const { name, age } = args;
                return await TeacherModel.create({ name, age });
            }
        },

        addCourse: {
            type: CourseType,
            args: {
                title: { type: GraphQLString },
                price: { type: GraphQLString },
                teacher: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                const { title, price, teacher } = args;
                return await CourseModel.create({ title, price, teacher });
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = schema;