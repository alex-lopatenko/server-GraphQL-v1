const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');


//Массив с данными
const directorsJson = [
  { "name": "Colin Ferguson", "age": 47 },
  { "name": "Jonathan Frakes", "age": 67 },
  { "name": "Madchen Amick", "age": 49 },
  { "name": "Jack Kenny", "age": 62 },
  { "name": "Joel Murray", "age": 57 },
  { "name": "James Wan", "age": 43 },
];

const moviesJson = [
  { "name": "Eureka", "genre": "Fantasy", "directorId": "01" },
  { "name": "Castle", "genre": "Detective", "directorId": "02" },
  { "name": "Riverdale", "genre": "Detective", "directorId": "03" },
  { "name": "Star Trek: Discovery", "genre": "Fantasy", "directorId": "04" },
  { "name": "Warehouse 13", "genre": "Fantasy", "directorId": "05" },
  { "name": "The Big Bang Theory", "genre": "Comedy", "directorId": "06" },
  { "name": "Saw", "genre": "Thriller", "directorId": "07" },
  { "name": "Aquaman", "genre": "Fantasy", "directorId": "08" },
];

const movies = [
  { id: '1', name: "Eureka", genre: "Fantasy", directorId: "1" },
  { id: '2', name: "Castle", genre: "Detective", directorId: "2" },
  { id: '3', name: "Riverdale", genre: "Detective", directorId: "3" },
  { id: '4', name: "Star Trek: Discovery", genre: "Fantasy", directorId: "2" },
  { id: '5', name: "Warehouse 13", genre: "Fantasy", directorId: "5" },
  { id: '6', name: "The Big Bang Theory", genre: "Comedy", directorId: "6" },
  { id: '7', name: "Saw", genre: "Thriller", directorId: "7" },
  { id: '8', name: "Aquaman", genre: "Fantasy", directorId: "7" },
];
const directors = [
	{ id: '1', name: "Colin Ferguson", age: 47 },
  { id: '2', name: "Jonathan Frakes", age: 67 },
  { id: '3', name: "Madchen Amick", age: 49 },
  { id: '4', name: "Jack Kenny", age: 62 },
  { id: '5', name: "Joel Murray", age: 57 },
  { id: '6', name: "James Wan", age: 43 },
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id === parent.id);
                return Directors.findById(parent.directorId);
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({ directorId: parent.id });
            },
        },
    }),
});

// Создаем корневой запрос:
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id);
                return Movies.findById(args.id);
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id);
                return Directors.findById(args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies;
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                // return directors;
                return Directors.find({});
            }
        }
    }
});


// Экспорт корневого запроса
module.exports = new GraphQLSchema({
    query: Query,
});